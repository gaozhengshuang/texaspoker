package main

import (
	"fmt"
	"time"
	"math"
	"strconv"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl/excel"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/gotoolkit/log" 
	pb "github.com/gogo/protobuf/proto"
)

const (
	CarIdSetKey = "cars_idset"
	ParkingIdSetKey = "parking_idset"
)

//车辆信息
type CarData struct {
	id			uint64	//车辆id
	tid       	uint32 	//车的配置id
	ownerid     uint64 	//拥有者id
	createtime  uint64 	//创建时间
	parkingid 	uint64  //车位id
	ownername 	string 	//拥有者名字

	template	*table.TCarDefine
}

func (this *CarData) LoadBin(bin *msg.CarData) {
	this.id = bin.GetId()
	this.tid = bin.GetTid()
	this.ownerid = bin.GetOwnerid()
	this.createtime = bin.GetCreatetime()
	this.parkingid = bin.GetParkingid()
	this.ownername = bin.GetOwnername()
	template,find := tbl.TCarBase.TCarById[this.tid]
	if find == false {
		log.Error("玩家[%d] 找不到车辆配置[%d]", this.ownerid, this.tid)
	}else{
		this.template = template
	}
}

func (this *CarData) SetParking(id uint64){
	this.parkingid = id
}

func (this *CarData) PackBin() *msg.CarData {
	bin := &msg.CarData{}
	bin.Id = pb.Uint64(this.id)
	bin.Tid = pb.Uint32(this.tid)
	bin.Ownerid = pb.Uint64(this.ownerid)
	bin.Createtime = pb.Uint64(this.createtime)
	bin.Parkingid = pb.Uint64(this.parkingid)
	bin.Ownername = pb.String(this.ownername)
	return bin
}

func (this *CarData) SaveBin() {
	key := fmt.Sprintf("cars_%d", this.id)
	if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
		log.Error("保存车辆[%d]数据失败", this.id)
		return
	}
	log.Info("保存车辆[%d]数据成功", this.id)
}

//车位信息
type ParkingData struct {
	id 			uint64  			//车位id
    tid 		uint32				//配置id
	ownerid 	uint64  			//拥有者id 公共车位为0
	ownername 	string				//拥有者名字
    parkingcar 	uint64  			//停的车辆id
	parkingcarownerid uint64  		//停的车主人id
    parkingcarownername string		//停的车主人名字
    parkingtime	uint64        		//开始停车时间戳
	parkingreward uint32     		//停车获得收益
	parkingcartid uint32			//停的车的配置id
	houseid uint64					//所属房屋id
	
	template *table.TParkingDefine
}

func (this *ParkingData) LoadBin(bin *msg.ParkingData){
	this.id = bin.GetId()
	this.tid = bin.GetTid()
	this.ownerid = bin.GetOwnerid()
	this.parkingcar = bin.GetParkingcar()
	this.parkingcarownerid = bin.GetParkingcarownerid()
	this.parkingcarownername = bin.GetParkingcarownername()
	this.parkingtime = bin.GetParkingtime()
	this.parkingreward = bin.GetParkingreward()
	this.ownername = bin.GetOwnername()
	this.parkingcartid = bin.GetParkingcartid()
	this.houseid = bin.GetHouseid();

	template,find := tbl.TParkingBase.TParkingById[this.tid]
	if find == false {
		log.Error("玩家[%d] 找不到车位配置[%d]", this.ownerid, this.tid)
	}else{
		this.template = template
	}
}

func (this* ParkingData) PackBin() *msg.ParkingData {
	bin := &msg.ParkingData{}
	bin.Id = pb.Uint64(this.id)
	bin.Tid = pb.Uint32(this.tid)
	bin.Ownerid = pb.Uint64(this.ownerid)
	bin.Parkingcar = pb.Uint64(this.parkingcar)
	bin.Parkingcarownerid = pb.Uint64(this.parkingcarownerid)
	bin.Parkingcarownername = pb.String(this.parkingcarownername)
	bin.Parkingtime = pb.Uint64(this.parkingtime)
	bin.Parkingreward = pb.Uint32(this.parkingreward)
	bin.Ownername = pb.String(this.ownername)
	bin.Parkingcartid = pb.Uint32(this.parkingcartid)
	bin.Houseid = pb.Uint64(this.houseid)
	return bin
}

func (this *ParkingData) SaveBin() {
	key := fmt.Sprintf("parkings_%d", this.id)
	if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
		log.Error("保存车位[%d]数据失败", this.id)
		return
	}
	log.Info("保存车位[%d]数据成功", this.id)
}

func (this* ParkingData) UpdateReward(car *CarData,now uint64) bool{
	//计算经过了几个小时了
	passedHour := uint32(math.Floor(time.Duration((now - this.parkingtime) * 1000000).Hours()))
	reward := (passedHour * car.template.RewardPerH * this.template.RewardPercent) / 100
	reward = uint32(math.Min(float64(reward),float64(car.template.Capacity)))
	if this.parkingreward != reward {
		this.parkingreward = reward
		return true
	}
	return false
}
func (this* ParkingData) TakeBackCar() uint32{
	this.parkingcar = 0
	this.parkingcarownerid = 0
	this.parkingcarownername = ""
	this.parkingtime = 0
	this.parkingcartid = 0
	reward := this.parkingreward
	this.parkingreward = 0
	return reward 
}

func (this* ParkingData) ParkingCar(car *CarData,username string){
	car.SetParking(this.id)
	this.parkingcar = car.id
	this.parkingcarownerid = car.ownerid
	this.parkingcarownername = username
	this.parkingtime = uint64(util.CURTIMEMS())
	this.parkingreward = 0
	this.parkingcartid = car.tid
}


//车辆管理器
type CarManager struct {
	cars map[uint64]*CarData //已加载的所有车辆的map
	usercars map[uint64][]uint64 //玩家id 关联的车辆id

	parkings map[uint64]*ParkingData //已加载的所有车位map
	userparkings map[uint64][]uint64 //玩家id 关联的车位id

	ticker1Minite *util.GameTicker
	ticker1Second *util.GameTicker
}

func (this* CarManager) Init(){
	this.cars = make(map[uint64]*CarData)
	this.usercars = make(map[uint64][]uint64)
	this.parkings = make(map[uint64]*ParkingData)
	this.userparkings = make(map[uint64][]uint64)

	this.ticker1Minite = util.NewGameTicker(time.Minute, this.Handler1MiniteTick)
	this.ticker1Minite.Start()

	this.ticker1Second = util.NewGameTicker(time.Second,this.Handler1SecondTick)
	this.ticker1Second.Start()

	carsIds, err := Redis().SMembers(CarIdSetKey).Result()
	if err != nil {
		log.Error("启动加载车辆数据失败 err: %s", err)
	} else {
		for _, v := range carsIds {
			carid, _ := strconv.Atoi(v)
			this.GetCar(uint64(carid))
		}
	}

	parkingIds,err := Redis().SMembers(ParkingIdSetKey).Result()
	if err != nil {
		log.Error("启动加载车位数据失败 err: %s", err)
	} else {
		for _, v := range parkingIds {
			parkingid, _ := strconv.Atoi(v)
			this.GetParking(uint64(parkingid))
		}
	}

	if len(this.parkings) == 0 {
		//创建公共车位
		for i := 0; i < 20; i++{
			this.CreateNewParking(0,1001,"公共车位",0)
		}
	}
}

func (this* CarManager) GetCar(id uint64) *CarData{
	if _, ok := this.cars[id]; ok {
		return this.cars[id]
	} else {
		//尝试从内存加载 如果没有返回nil
		key, bin := fmt.Sprintf("cars_%d", id), &msg.CarData{}
		if err := utredis.GetProtoBin(Redis(), key, bin); err != nil {
			log.Error("加载车辆信息失败无此车辆数据 id%d ，err: %s", id, err)
			return nil
		}
		car := &CarData{}
		car.LoadBin(bin)
		this.AddCar(car)
		return car
	}
}

func (this* CarManager) CreateNewCar(ownerid uint64, tid uint32,name string ) *CarData{
	carid, errcode := def.GenerateCarId(Redis())
	if errcode != "" {
		log.Error("创建新的车辆生成新的车辆id出错，error:%s", errcode)
		return nil
	}

	template,find := tbl.TCarBase.TCarById[tid]
	if find == false {
		log.Error("无效的车辆tid[%d]", tid)
		return nil
	}
	//查表去获取房屋的配置信息创建
	car := &CarData{}
	car.id = carid
	car.ownerid = ownerid
	car.tid = tid
	car.template = template
	car.parkingid = 0
	car.createtime = uint64(util.CURTIMEMS())
	car.ownername = name

	car.SaveBin()
	Redis().SAdd(CarIdSetKey, carid)
	this.AddCar(car)
	return car
}

func (this* CarManager) AddCar(car *CarData){
	this.cars[car.id] = car
	if _, ok := this.usercars[car.ownerid]; !ok {
		this.usercars[car.ownerid] = make([]uint64, 0)
	}
	this.usercars[car.ownerid] = append(this.usercars[car.ownerid], car.id)
}

func (this* CarManager) GetCarByUser(uid uint64) []*CarData{
	data := make([]*CarData, 0)
	if _, ok := this.usercars[uid]; !ok {
		return data
	}
	ids := this.usercars[uid]
	for _, v := range ids {
		carInfo := this.GetCar(v)
		data = append(data,carInfo)
	}
	return data
}

func (this* CarManager) GetParking(id uint64) *ParkingData{
	if _, ok := this.parkings[id]; ok {
		return this.parkings[id]
	} else {
		//尝试从内存加载 如果没有返回nil
		key, bin := fmt.Sprintf("parkings_%d", id), &msg.ParkingData{}
		if err := utredis.GetProtoBin(Redis(), key, bin); err != nil {
			log.Error("加载车位信息失败无此车位数据 id%d ，err: %s", id, err)
			return nil
		}
		parking := &ParkingData{}
		parking.LoadBin(bin)
		this.AddParking(parking)
		return parking
	}
}

func (this* CarManager) GetRecordByUser(id uint64) []string{
	//尝试从内存加载 如果没有返回nil
	str := make([]string,0)
	key := fmt.Sprintf("parkingrecord_%d", id)
	rlist, err := Redis().LRange(key,0,10).Result()
	if err != nil {
		log.Error("加载车位操作记录失败 id %d ，err: %s", id, err)
		return str
	}
	return rlist
}

func (this* CarManager) CreateNewRecord(ownerid uint64,car* CarData, parking* ParkingData,opttype uint32,param uint32) string{
	str := make([]byte,0,256)
	str = strconv.AppendInt(str,int64(ownerid),10)
	str = strconv.AppendQuote(str,"_")
	str = strconv.AppendQuote(str,time.Now().Format("15:04"))
	str = strconv.AppendQuote(str,"  ")
	switch (opttype){
		case 1:
			//停车
			str = strconv.AppendQuote(str,car.ownername)
			str = strconv.AppendQuote(str,"将他的")
			str = strconv.AppendQuote(str,car.template.Brand)
			str = strconv.AppendQuote(str,car.template.Model)
			str = strconv.AppendQuote(str,"停在了你的车位")
			break
		case 2:
			//收车
			str = strconv.AppendQuote(str,car.ownername)
			str = strconv.AppendQuote(str,"开走了他的")
			str = strconv.AppendQuote(str,car.template.Brand)
			str = strconv.AppendQuote(str,car.template.Model)
			break
		case 3:
			str = strconv.AppendQuote(str,parking.ownername)
			str = strconv.AppendQuote(str,"对你的")
			str = strconv.AppendQuote(str,car.template.Brand)
			str = strconv.AppendQuote(str,car.template.Model)
			str = strconv.AppendQuote(str,"贴条")
			break
	}
	data := string(str)
	// 保存数据
	key := fmt.Sprintf("parkingrecord_%d", ownerid)
	err := Redis().RPush(key, data).Err()
	if err != nil { 
		log.Error("创建车位操作记录失败 id%d ，err: %s", ownerid, err)
		return ""
	}
	if Redis().LLen(key).Val() > 5 {
		//删除最老的记录
		err := Redis().BLPop(0,key).Err()
		if err != nil{ 
			log.Error("删除多余车位操作记录失败 id%d", ownerid)
		}
	}
	return data
}


func (this* CarManager) GetParkingByUser(id uint64) []*ParkingData{
	data := make([]*ParkingData, 0)
	if _, ok := this.userparkings[id]; !ok {
		return data
	}
	ids := this.userparkings[id]
	for _, v := range ids {
		parkingInfo := this.GetParking(v)
		data = append(data,parkingInfo)
	}
	return data
}

func (this* CarManager) GetParkingById(ids []uint64) []*ParkingData{
	data := make([]*ParkingData,0)
	for _,v := range ids {
		parkingInfo := this.GetParking(v);
		if parkingInfo != nil {
			data = append(data,parkingInfo)
		}
	}
	return data
}

func (this* CarManager) GetParkingByCondition(parkingtype uint32,playerid uint64,houseids []uint64) []*ParkingData{
	data := make([]*ParkingData,0)
	for _,v := range this.parkings {
		if parkingtype != 0 && v.template.Type != parkingtype {
			continue;
		}
		if playerid != 0 && v.ownerid != playerid {
			continue;
		}
		if len(houseids) > 0 && !def.IsContainObj(v.houseid,houseids) {
			continue;
		}
		data = append(data,v)
	}
	return data
}

func (this* CarManager) CreateNewParking(ownerid uint64, tid uint32,name string,hid  uint64) *ParkingData{
	parkingid, errcode := def.GenerateParkingId(Redis())
	if errcode != "" {
		log.Error("创建新的车位生成新的车位id出错，error:%s", errcode)
		return nil
	}

	template,find := tbl.TParkingBase.TParkingById[tid]
	if find == false {
		log.Error("无效的车位tid[%d]", tid)
		return nil
	}
	//查表去获取房屋的配置信息创建
	parking := &ParkingData{}
	parking.id = parkingid
	parking.ownerid = ownerid
	parking.ownername = name
	parking.tid = tid
	parking.template = template
	parking.parkingcar = 0
	parking.parkingcarownerid = 0
    parking.parkingcarownername = ""
    parking.parkingtime	= 0
	parking.parkingreward = 0
	parking.parkingcartid = 0
	parking.houseid = hid
	parking.SaveBin()
	Redis().SAdd(ParkingIdSetKey, parkingid)
	this.AddParking(parking)
	return parking
}

func (this* CarManager) AddParking(parking *ParkingData){
	this.parkings[parking.id] = parking
	if _,ok := this.userparkings[parking.ownerid]; !ok {
		this.userparkings[parking.ownerid] = make([]uint64,0)
	}
	this.userparkings[parking.ownerid] = append(this.userparkings[parking.ownerid],parking.id)
}

func (this* CarManager) ParkingCar(carid uint64,parkingid uint64,username string) (result int32,record string){
	car := this.GetCar(carid)
	parking := this.GetParking(parkingid)
	if car == nil || parking == nil {
		return 1,""
	}
	if car.parkingid != 0 {
		return 2,""
	}
	if parking.parkingcar != 0	{
		return 3,""
	}
	//可以了
	parking.ParkingCar(car,username)
	record = this.CreateNewRecord(parking.ownerid,car,parking,uint32(msg.CarOperatorType_Park),0)
	car.SaveBin()
	parking.SaveBin()
	return 0,record
}

func (this* CarManager) TakeBackCar(carid uint64) (result uint32,reward uint32,record string){
	car := this.GetCar(carid)
	if car == nil {
		return 1,0,""
	}
	if car.parkingid == 0 {
		return 2,0,""
	}
	parking := this.GetParking(car.parkingid)
	if parking == nil {
		return 3,0,""
	}
	//可以收回
	reward = parking.TakeBackCar()
	record = this.CreateNewRecord(parking.ownerid, car,parking,uint32(msg.CarOperatorType_TakeBack),reward)
	car.SetParking(0)
	car.SaveBin()
	parking.SaveBin()
	return 0,reward,record
}

func (this* CarManager) TakeBackFromParking(parkingid uint64) (result uint32,reward uint32,record string){
	parking := this.GetParking(parkingid)
	if parking == nil {
		return 1,0,""
	}
	if parking.parkingcar  == 0 {
		return 2,0,""
	}
	car := this.GetCar(parking.parkingcar)
	if car == nil {
		return 3,0,""
	}
	//可以收回
	reward = parking.TakeBackCar()
	record = this.CreateNewRecord(car.ownerid, car,parking,uint32(msg.CarOperatorType_Ticket),reward)
	car.SetParking(0)
	car.SaveBin()
	parking.SaveBin()
	return 0,reward,record
}

func (this* CarManager) SaveAllData(){
	for _, v := range this.cars {
		v.SaveBin()
	}
	for _, v := range this.parkings {
		v.SaveBin()
	}
}

func (this* CarManager) AppendHouseData(houses []*msg.HouseData){
	for _,v := range houses {
		parkings := this.GetParkingByUser(v.GetOwnerid())
		for _,p := range parkings {
			v.Parkings = append(v.Parkings,p.PackBin())
		}
	}
}

//循环
func (this *CarManager) Tick(now int64) {
	this.ticker1Minite.Run(now)
	this.ticker1Second.Run(now)
}

func (this *CarManager) Handler1MiniteTick(now int64) {
}

func (this *CarManager) Handler1SecondTick(now int64){
	for _, v := range this.parkings {
		if v.parkingcar == 0 {
			continue
		}
		car := this.GetCar(v.parkingcar)
		v.UpdateReward(car,uint64(now))
	}
}


