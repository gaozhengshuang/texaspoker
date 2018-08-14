package main

import (
	"time"
	"math"
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
	ownerid     uint32 	//拥有者id
	createtime  uint64 	//创建时间
	parkingid 	uint64  //车位id

	template	table.TCarDefine
}

func (this *CarData) LoadBin(bin *msg.CarData) {
	this.id = bin.GetId()
	this.tid = bin.GetTid()
	this.ownerid = bin.GetOwnerid()
	this.createtime = bin.GetCreatetime()
	this.parkingid = bin.GetParkingid()
	template,find := tbl.TCarBaseTable.TCarById[this.tid]
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
	bin.Tid = pb.Uint64(this.tid)
	bin.Ownerid = pb.Uint64(this.ownerid)
	bin.Createtime = pb.Uint64(this.createtime)
	bin.Parkingid = pb.Uint64(this.parkingid)
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
    parkingcar 	uint64  			//停的车辆id
	parkingcarownerid uint64  		//停的车主人id
    parkingcarownername uint64		//停的车主人名字
    parkingtime	uint64        		//开始停车时间戳
	parkingreward uint32     		//停车获得收益
	
	template table.TParkingDefine
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

	template,find := tbl.TParkingBaseTable.TParkingById[this.tid]
	if find == false {
		log.Error("玩家[%d] 找不到车位配置[%d]", this.ownerid, this.tid)
	}else{
		this.template = template
	}
}

func (this* ParkingData) PackBin() *msg.ParkingData {
	bin := &msg.ParkingData{}
	bin.Id = this.id
	bin.Tid = this.tid
	bin.Ownerid = this.ownerid
	bin.Parkingcar = this.parkingcar
	bin.Parkingcarownerid = this.parkingcarownerid
	bin.Parkingcarownername = this.parkingcarownername
	bin.Parkingtime = this.parkingtime
	bin.Parkingreward = this.parkingreward
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

func (this* ParkingData) UpdateReward(car *CarData,now int64) bool{
	//计算经过了几个小时了
	passedHour := uint32(math.Floor(time.Duration((now - this.parkingtime) * 1000000).Hours()))
	reward := (passedHour * car.template.RewardPerH * this.template.RewardPercent) / 100
	reward = math.Min(reward,car.template.Capacity)
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
	reward := this.parkingreward
	this.parkingreward = 0
	return reward 
}

func (this* ParkingData) ParkingCar(car *CarData,username string){
	car.SetParking(this.id)
	this.parkingcar = car.id
	this.parkingcarownerid = car.ownerid
	this.parkingcarownername = username
	this.parkingtime = util.CURTIMEMS()
	this.parkingreward = 0
}

//车辆管理器
type CarManager struct {
	cars map[uint64]*CarData //已加载的所有车辆的map
	usercars map[uint64][]uint64 //玩家id 关联的车辆id

	parkings map[uint64]*ParkingData //已加载的所有车位map
	userparkings map[uint64][]uint64 //玩家id 关联的车位id

	ticker1Minite *util.GameTicker
}

func (this* CarManager) Init(){
	this.cars = make(map[uint64]*CarData)
	this.usercars = make(map[uint64][]uint64)
	this.parkings = make(map[uint64]*ParkingData)
	this.userparkings = make(map[uint64][]uint64)

	this.ticker1Minite = util.NewGameTicker(time.Minute, this.Handler1MiniteTick)
	this.ticker1Minite.Start()

	carsIds, err := Redis().SMembers(CarIdSetKey).Result()
	if err != nil {
		log.Error("启动加载车辆数据失败 err: %s", err)
	} else {
		for _, v := range carsIds {
			carid, _ := strconv.Atoi(v)
			this.GetCar(uint64(carid))
		}
	}

	parkingIds,err = Redis().SMembers(ParkingIdSetKey).Result()
	if err != nil {
		log.Error("启动加载车位数据失败 err: %s", err)
	} else {
		for _, v := range parkingIds {
			parkingid, _ := strconv.Atoi(v)
			this.GetParking(uint64(parkingid))
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

func (this* CarManager) CreateNewCar(ownerid uint64, tid uint32) *CarData{
	carid, errcode := def.GenerateCarId(Redis())
	if errcode != "" {
		log.Error("创建新的车辆生成新的车辆id出错，error:%s", errcode)
		return nil
	}

	template,find := tbl.TCarBaseTable.TCarById[tid]
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
	car.createtime = util.CURTIMEMS()

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

func (this* CarManager) CreateNewParking(ownerid uint64, tid uint32) *CarData{
	parkingid, errcode := def.GenerateParkingId(Redis())
	if errcode != "" {
		log.Error("创建新的车位生成新的车位id出错，error:%s", errcode)
		return nil
	}

	template,find := tbl.TParkingBaseTable.TParkingById[tid]
	if find == false {
		log.Error("无效的车位tid[%d]", tid)
		return nil
	}
	//查表去获取房屋的配置信息创建
	parking := &ParkingData{}
	parking.id = parking
	parking.ownerid = ownerid
	parking.tid = tid
	parking.template = template
	parking.parkingcar = 0
	parking.parkingcarownerid = 0
    parking.parkingcarownername = 0
    parking.parkingtime	= 0
	parking.parkingreward = 0

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

func (this* CarManager) ParkingCar(carid uint64,parkingid uint64,username string) int32{
	car := this.GetCar(carid)
	parking := this.GetParking(parkingid)
	if car == nil || parking == nil {
		return 1
	}
	if car.parkingid != 0 {
		return 2
	}
	if parking.parkingcar != 0	{
		return 3
	}
	//可以了
	parking.ParkingCar(car,username)
	return 0
}

func (this* CarManager) TakeBackCar(carid uint64) (result uint32,reward uint32){
	car := this.GetCar(carid)
	if car == nil {
		return 1,0
	}
	if car.parkingid == 0 {
		return 2,0
	}
	parking := this.GetParking(car.parkingid)
	if parking == nil {
		return 3,0
	}
	//可以收回
	reward = parking.TakeBackCar()
	car.SetParking(0)
	return 0,reward
}

func (this* CarManager) SaveAllData(){
	for _, v := range this.cars {
		v.SaveBin()
	}
	for _, v := range this.parkings {
		v.SaveBin()
	}
}

//循环
func (this *CarManager) Tick(now int64) {
	this.ticker1Minite.Run(now)
}

func (this *CarManager) Handler1MiniteTick(now int64) {
	for _, v := range this.parkings {
		if v.parkingcar == 0 {
			continue
		}
		car := this.GetCar(v.parkingcar)
		v.UpdateReward(car,now)
	}
}
