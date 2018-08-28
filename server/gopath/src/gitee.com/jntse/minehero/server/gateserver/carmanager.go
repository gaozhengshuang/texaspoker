package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	"math"
	"strconv"
	"time"
)

const (
	CarIdSetKey     = "cars_idset"
	ParkingIdSetKey = "parking_idset"
)

//车辆信息
type CarData struct {
	id            uint64 //车辆id
	tid           uint32 //车的配置id
	ownerid       uint64 //拥有者id
	createtime    uint64 //创建时间
	parkingid     uint64 //车位id
	ownername     string //拥有者名字
	parkingreward uint32 // 停车收益(自动回收)
	level		  uint32 //等级
	modified      bool   //是否需要保存

	template *table.TCarDefine
}

func (this *CarData) LoadBin(rbuf []byte) error {
	bin := &msg.CarData{}
	if err := pb.Unmarshal(rbuf, bin); err != nil {
		return fmt.Errorf("pb反序列化失败")
	}

	this.id = bin.GetId()
	this.tid = bin.GetTid()
	this.ownerid = bin.GetOwnerid()
	this.createtime = bin.GetCreatetime()
	this.parkingid = bin.GetParkingid()
	this.ownername = bin.GetOwnername()
	this.parkingreward = bin.GetParkingreward()
	this.level = bin.GetLevel()
	this.modified = false
	template, find := tbl.TCarBase.TCarById[this.tid]
	if find == false {
		log.Error("玩家[%d] 找不到车辆配置[%d]", this.ownerid, this.tid)
	} else {
		this.template = template
	}
	return nil
}

func (this *CarData) SetParking(id uint64) {
	this.parkingid = id
}

func (this *CarData) SetParkingReward(reward uint32) {
	this.parkingreward = reward
	this.modified = true
}

func (this *CarData) PackBin() *msg.CarData {
	bin := &msg.CarData{}
	bin.Id = pb.Uint64(this.id)
	bin.Tid = pb.Uint32(this.tid)
	bin.Ownerid = pb.Uint64(this.ownerid)
	bin.Createtime = pb.Uint64(this.createtime)
	bin.Parkingid = pb.Uint64(this.parkingid)
	bin.Ownername = pb.String(this.ownername)
	bin.Parkingreward = pb.Uint32(this.parkingreward)
	bin.Level = pb.Uint32(this.level)
	return bin
}

func (this *CarData) SaveBin(pipe redis.Pipeliner) {
	key := fmt.Sprintf("cars_%d", this.id)
	if pipe != nil {
		if this.modified {
			if err := utredis.SetProtoBinPipeline(pipe, key, this.PackBin()); err != nil {
				log.Error("打包车辆[%d]数据失败", this.id)
				return
			}
			this.modified = false
		}
	} else {
		if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
			log.Error("保存车辆[%d]数据失败", this.id)
			return
		}
	}
}

//车位信息
type ParkingData struct {
	id                  uint64 //车位id
	tid                 uint32 //配置id
	ownerid             uint64 //拥有者id 公共车位为0
	ownername           string //拥有者名字
	parkingcar          uint64 //停的车辆id
	parkingcarownerid   uint64 //停的车主人id
	parkingcarownername string //停的车主人名字
	parkingtime         uint64 //开始停车时间戳
	parkingreward       uint32 //停车获得收益
	parkingcartid       uint32 //停的车的配置id
	houseid             uint64 //所属房屋id
	modified            bool   //是否需要保存

	template *table.TParkingDefine
}

func (this *ParkingData) LoadBin(rbuf []byte) error {
	bin := &msg.ParkingData{}
	if err := pb.Unmarshal(rbuf, bin); err != nil {
		return fmt.Errorf("pb反序列化失败")
	}

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
	this.houseid = bin.GetHouseid()
	this.modified = false

	template, find := tbl.TParkingBase.TParkingById[this.tid]
	if find == false {
		log.Error("玩家[%d] 找不到车位配置[%d]", this.ownerid, this.tid)
	} else {
		this.template = template
	}
	return nil
}

func (this *ParkingData) PackBin() *msg.ParkingData {
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

func (this *ParkingData) SaveBin(pipe redis.Pipeliner) {
	key := fmt.Sprintf("parkings_%d", this.id)
	if pipe != nil {
		if this.modified {
			if err := utredis.SetProtoBinPipeline(pipe, key, this.PackBin()); err != nil {
				log.Error("打包车位[%d]数据失败", this.id)
				return
			}
			this.modified = false
		}
	} else {
		if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
			log.Error("保存车位[%d]数据失败", this.id)
			return
		}
	}
}

func (this *ParkingData) UpdateReward(car *CarData, now uint64) bool {
	//计算经过了几个小时了
	//passedMinute := uint32(math.Floor(time.Duration((now - this.parkingtime) * 1000000).Minutes()))
	passedMinute := uint32((now - this.parkingtime) / 1000 / 60)		// benchmark 效率更好(10倍)
	// reward := (passedMinute * car.template.RewardPerH * this.template.RewardPercent) / 100
	// reward = uint32(math.Min(float64(reward), float64(car.template.Capacity)))
	// if this.parkingreward != reward {
	// 	this.parkingreward = reward
	// 	return true
	// }
	return false
}
func (this *ParkingData) TakeBack() uint32 {
	this.parkingcar = 0
	this.parkingcarownerid = 0
	this.parkingcarownername = ""
	this.parkingtime = 0
	this.parkingcartid = 0
	reward := this.parkingreward
	this.parkingreward = 0
	return reward
}

func (this *ParkingData) Parking(car *CarData, username string) {
	car.SetParking(this.id)
	this.parkingcar = car.id
	this.parkingcarownerid = car.ownerid
	this.parkingcarownername = username
	this.parkingtime = uint64(util.CURTIMEMS())
	this.parkingreward = 0
	this.parkingcartid = car.tid
}

// 是否公共车位
func (this *ParkingData) IsPublic() bool {
	return this.template.Type == uint32(msg.ParkingType_Public)
}

// 是否私有车位
func (this *ParkingData) IsPrivate() bool {
	return this.template.Type == uint32(msg.ParkingType_Private)
}

func (this *ParkingData) IsRewardFull(car *CarData) bool {
	// if car != nil && car.template != nil {
	// 	return this.parkingreward >= car.template.Capacity
	// }
	return false
}

//车辆管理器
type CarManager struct {
	cars     map[uint64]*CarData //已加载的所有车辆的map
	usercars map[uint64][]uint64 //玩家id 关联的车辆id

	parkings       map[uint64]*ParkingData //已加载的所有车位map
	userparkings   map[uint64][]uint64     //玩家id 关联的车位id
	publicparkings uint32                  // 公共车位数

	ticker1Minite *util.GameTicker
	ticker1Second *util.GameTicker
}

func (this *CarManager) Init() {
	this.cars = make(map[uint64]*CarData)
	this.usercars = make(map[uint64][]uint64)
	this.parkings = make(map[uint64]*ParkingData)
	this.userparkings = make(map[uint64][]uint64)

	this.ticker1Minite = util.NewGameTicker(time.Minute, this.Handler1MiniteTick)
	this.ticker1Minite.Start()

	this.ticker1Second = util.NewGameTicker(time.Second, this.Handler1SecondTick)
	this.ticker1Second.Start()

	this.LoadCarFromDB()
	this.LoadParkingFromDB()

	//创建公共车位
	for _, v := range this.parkings {
		if v.IsPublic() {
			this.publicparkings += 1
		}
	}
	for i := this.publicparkings; i < uint32(tbl.Car.PulicParkingNum); i++ {
		this.CreateNewParking(0, 1001, "公共车位", 0)
	}
	this.publicparkings = uint32(tbl.Car.PulicParkingNum)
}

// 从DB加载所有车辆数据
func (this *CarManager) LoadCarFromDB() {
	carsIds, err := Redis().SMembers(CarIdSetKey).Result()
	if err != nil {
		log.Error("启动加载车辆数据失败 err: %s", err)
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range carsIds {
		carid, _ := strconv.Atoi(v)
		pipe.Get(fmt.Sprintf("cars_%d", carid))
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("加载车辆信息失败 RedisError: %s", err)
		return
	}

	for _, v := range cmds {
		if v.Err() == redis.Nil {
			continue
		}
		rbuf, _ := v.(*redis.StringCmd).Bytes()
		car := &CarData{}
		if car.LoadBin(rbuf) == nil {
			this.AddCar(car)
		}
	}
	log.Info("加载所有车辆DB数据 size=%d", len(this.cars))
}

// 从DB加载所有车位数据
func (this *CarManager) LoadParkingFromDB() {
	parkingIds, err := Redis().SMembers(ParkingIdSetKey).Result()
	if err != nil {
		log.Error("启动加载车位数据失败 err: %s", err)
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range parkingIds {
		parkingid, _ := strconv.Atoi(v)
		pipe.Get(fmt.Sprintf("parkings_%d", parkingid))
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("加载车辆信息失败 RedisError: %s", err)
		return
	}

	for _, v := range cmds {
		if v.Err() == redis.Nil {
			continue
		}
		rbuf, _ := v.(*redis.StringCmd).Bytes()
		parking := &ParkingData{}
		if parking.LoadBin(rbuf) == nil {
			this.AddParking(parking)
		}
	}
	log.Info("加载所有车位DB数据 size=%d", len(this.parkings))
}

func (this *CarManager) GetCar(id uint64) *CarData {
	if _, ok := this.cars[id]; ok {
		return this.cars[id]
	}
	return nil
}

// 获得车辆对应house(目前没有一一绑定关系，车主house第一个house)
func (this *CarManager) GetCarHouseId(carid uint64) uint64 {
	car := this.GetCar(carid)
	if car == nil {
		return 0
	}

	houses := HouseSvrMgr().GetHousesByUser(car.ownerid)
	if len(houses) != 0 {
		return houses[0].id
	}

	return 0
}


func (this *CarManager) CreateNewCar(ownerid uint64, tid uint32, name string) *CarData {
	carid, errcode := def.GenerateCarId(Redis())
	if errcode != "" {
		log.Error("创建新的车辆生成新的车辆id出错，error:%s", errcode)
		return nil
	}

	template, find := tbl.TCarBase.TCarById[tid]
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
	car.parkingreward = 0
	car.modified = false

	car.SaveBin(nil)
	Redis().SAdd(CarIdSetKey, carid)
	this.AddCar(car)
	return car
}

func (this *CarManager) AddCar(car *CarData) {
	this.cars[car.id] = car
	if _, ok := this.usercars[car.ownerid]; !ok {
		this.usercars[car.ownerid] = make([]uint64, 0)
	}
	this.usercars[car.ownerid] = append(this.usercars[car.ownerid], car.id)
}

func (this *CarManager) GetCarByUser(uid uint64) []*CarData {
	data := make([]*CarData, 0)
	if _, ok := this.usercars[uid]; !ok {
		return data
	}
	ids := this.usercars[uid]
	for _, v := range ids {
		carInfo := this.GetCar(v)
		data = append(data, carInfo)
	}
	return data
}

func (this *CarManager) GetParking(id uint64) *ParkingData {
	if _, ok := this.parkings[id]; ok {
		return this.parkings[id]
	}
	return nil
}

func (this *CarManager) GetRecordByUser(id uint64) []string {
	//尝试从内存加载 如果没有返回nil
	str := make([]string, 0)
	key := fmt.Sprintf("parkingrecord_%d", id)
	rlist, err := Redis().LRange(key, 0, 10).Result()
	if err != nil {
		log.Error("加载车位操作记录失败 id %d ，err: %s", id, err)
		return str
	}
	return rlist
}

func (this *CarManager) CreateNewRecord(handleid uint64, ownerid uint64, car *CarData, parking *ParkingData, opttype uint32, param uint32) string {
	prefix, data := "", ""
	switch opttype {
	case uint32(msg.CarOperatorType_Park):
		//停车
		prefix = fmt.Sprintf("%d_%d_%d_%s  ", handleid, opttype, parking.houseid, time.Now().Format("15:04"))
		data = prefix + car.ownername + "将他的" + car.template.Brand + car.template.Model + "停在了你的车位"
		break
	case uint32(msg.CarOperatorType_TakeBack):
		//收车
		prefix = fmt.Sprintf("%d_%d_%d_%s  ", handleid, opttype, this.GetCarHouseId(car.id), time.Now().Format("15:04"))
		data = prefix + car.ownername + "开走了他的" + car.template.Brand + car.template.Model
		break
	case uint32(msg.CarOperatorType_Ticket):
		prefix = fmt.Sprintf("%d_%d_%d_%s  ", handleid, opttype, parking.houseid, time.Now().Format("15:04"))
		data = prefix + parking.ownername + "对你的" + car.template.Brand + car.template.Model + "贴条"
		break
	case uint32(msg.CarOperatorType_AutoBack):
		prefix = fmt.Sprintf("%d_%d_%d_%s  ", handleid, opttype, 0, time.Now().Format("15:04"))
		data = prefix + "公共车位收益满自动回收你的" + car.template.Brand + car.template.Model
		break
	}
	// 保存数据
	key := fmt.Sprintf("parkingrecord_%d", ownerid)
	err := Redis().RPush(key, data).Err()
	if err != nil {
		log.Error("创建车位操作记录失败 id%d ，err: %s", ownerid, err)
		return ""
	}
	if Redis().LLen(key).Val() > 5 {
		//删除最老的记录
		err := Redis().BLPop(0, key).Err()
		if err != nil {
			log.Error("删除多余车位操作记录失败 id%d", ownerid)
		}
	}
	return data
}

func (this *CarManager) GetParkingByUser(id uint64) []*ParkingData {
	data := make([]*ParkingData, 0)
	if _, ok := this.userparkings[id]; !ok {
		return data
	}
	ids := this.userparkings[id]
	for _, v := range ids {
		parkingInfo := this.GetParking(v)
		data = append(data, parkingInfo)
	}
	return data
}

func (this* CarManager) GetParkingByHouse(uid uint64,hid uint64) []*ParkingData {
	data := make([]*ParkingData, 0)
	if _, ok := this.userparkings[uid]; !ok {
		return data
	}
	ids := this.userparkings[uid]
	for _, v := range ids {
		parkingInfo := this.GetParking(v)
		if(parkingInfo.houseid != hid){
			continue
		}
		data = append(data, parkingInfo)
	}
	return data
}

func (this *CarManager) GetParkingById(ids []uint64) []*ParkingData {
	data := make([]*ParkingData, 0)
	for _, v := range ids {
		parkingInfo := this.GetParking(v)
		if parkingInfo != nil {
			data = append(data, parkingInfo)
		}
	}
	return data
}

func (this *CarManager) GetParkingByCondition(parkingtype uint32, playerid uint64, houseids []uint64) []*ParkingData {
	data := make([]*ParkingData, 0)
	for _, v := range this.parkings {
		if parkingtype != 0 && v.template.Type != parkingtype {
			continue
		}
		if playerid != 0 && v.ownerid != playerid {
			continue
		}

		findHouse := func(houseid uint64) bool {
			for _, w := range houseids {
				if houseid == w { return true }
			}
			return false
		}
		if len(houseids) > 0 && findHouse(v.houseid) == false {
			continue
		}

		data = append(data, v)
	}
	return data
}

func (this *CarManager) CreateNewParking(ownerid uint64, tid uint32, name string, hid uint64) *ParkingData {
	parkingid, errcode := def.GenerateParkingId(Redis())
	if errcode != "" {
		log.Error("创建新的车位生成新的车位id出错，error:%s", errcode)
		return nil
	}

	template, find := tbl.TParkingBase.TParkingById[tid]
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
	parking.parkingtime = 0
	parking.parkingreward = 0
	parking.parkingcartid = 0
	parking.houseid = hid
	parking.modified = false
	parking.SaveBin(nil)
	Redis().SAdd(ParkingIdSetKey, parkingid)
	this.AddParking(parking)
	return parking
}

func (this *CarManager) AddParking(parking *ParkingData) {
	this.parkings[parking.id] = parking
	if _, ok := this.userparkings[parking.ownerid]; !ok {
		this.userparkings[parking.ownerid] = make([]uint64, 0)
	}
	this.userparkings[parking.ownerid] = append(this.userparkings[parking.ownerid], parking.id)
}

// 停车到车位
func (this *CarManager) ParkingCar(carid uint64, parkingid uint64, username string) (result int32) {
	car := this.GetCar(carid)
	parking := this.GetParking(parkingid)
	if car == nil || parking == nil {
		return 1
	}
	if car.parkingid != 0 {
		return 2
	}
	if parking.parkingcar != 0 {
		return 3
	}
	//可以了
	parking.Parking(car, username)
	record := this.CreateNewRecord(car.ownerid, parking.ownerid, car, parking, uint32(msg.CarOperatorType_Park), 0)
	car.modified = true
	parking.modified = true

	//发送操作记录
	sendOwner := UserMgr().FindById(parking.ownerid)
	if sendOwner != nil {
		sendRecord := &msg.GW2C_SynParkingRecord{}
		sendRecord.Records = append(sendRecord.Records, *pb.String(record))
		sendOwner.SendMsg(sendRecord)
	}
	return 0
}

//func (this *CarManager) TakeBackCar(carid uint64) (result uint32, reward uint32) {
//	car := this.GetCar(carid)
//	if car == nil {
//		return 1, 0
//	}
//	if car.parkingid == 0 {
//		return 2, 0
//	}
//	parking := this.GetParking(car.parkingid)
//	if parking == nil {
//		return 3, 0
//	}
//	//可以收回
//	reward = parking.TakeBack()
//	record := this.CreateNewRecord(car.ownerid,parking.ownerid, car, parking, uint32(msg.CarOperatorType_TakeBack), reward)
//	car.SetParking(0)
//	car.modified = true
//	parking.modified = true
//	//发送操作记录
//	sendOwner := UserMgr().FindById(parking.ownerid)
//	if sendOwner != nil {
//		sendRecord := &msg.GW2C_SynParkingRecord{}
//		sendRecord.Records = append(sendRecord.Records,*pb.String(record))
//		sendOwner.SendMsg(sendRecord)
//	}
//	return 0, reward
//}

func (this *CarManager) TakeBackFromParking(user *GateUser, parkingid uint64, optype uint32) (result uint32, reward uint32) {
	parking := this.GetParking(parkingid)
	if parking == nil {
		return 1, 0
	}
	if parking.parkingcar == 0 {
		return 2, 0
	}
	car := this.GetCar(parking.parkingcar)
	if car == nil {
		return 3, 0
	}
	//可以收回
	reward = parking.TakeBack()
	record, notifyuser := "", uint64(0)
	switch optype {
	case uint32(msg.CarOperatorType_TakeBack):
		record = this.CreateNewRecord(car.ownerid, parking.ownerid, car, parking, uint32(msg.CarOperatorType_TakeBack), reward)
		notifyuser = parking.ownerid
		user.AddGold(reward, "收回车辆收益", true)
		break
	case uint32(msg.CarOperatorType_Ticket):
		record = this.CreateNewRecord(parking.ownerid, car.ownerid, car, parking, uint32(msg.CarOperatorType_Ticket), reward)
		notifyuser = car.ownerid
		user.AddGold(reward, "贴条车辆收益", true)
		reaper := UserMgr().FindById(parking.ownerid)
		if reaper != nil {
			reaper.AddGold(reward, "贴条车辆收益", true)
		}
		break
	case uint32(msg.CarOperatorType_AutoBack):
		record = this.CreateNewRecord(parking.id, car.ownerid, car, parking, uint32(msg.CarOperatorType_AutoBack), reward)
		notifyuser = car.ownerid
		car.SetParkingReward(reward)
		log.Info("玩家[%s %d] 公共车位自动回收车辆[%d]", car.ownername, car.ownerid, car.id)
		break
	}
	car.SetParking(0)
	car.modified = true
	parking.modified = true

	//发送操作记录
	sendOwner := UserMgr().FindById(notifyuser)
	if sendOwner != nil {
		sendRecord := &msg.GW2C_SynParkingRecord{}
		sendRecord.Records = append(sendRecord.Records, *pb.String(record))
		sendOwner.SendMsg(sendRecord)
	}
	return 0, reward
}

func (this *CarManager) TakeCarAutoBackReward(user *GateUser, carid uint64) (result uint32, reward uint32) {
	car := CarMgr().GetCar(carid)
	if user == nil || car == nil {
		return 0, 0
	}

	if user.Id() != car.ownerid {
		user.SendNotify("这不是您的车辆")
		return 0, 0
	}

	if car.parkingreward == 0 {
		user.SendNotify("车辆没有可领取收益")
		return 0, 0
	}

	reward = car.parkingreward
	user.AddGold(reward, "领取自动回收收益", true)
	car.SetParkingReward(0)
	user.SendNotify("领取成功")
	return 0, reward
}

// 自动从公共车位回收汽车
func (this *CarManager) AutoTakeBackCar(car *CarData, parking *ParkingData) {
	if !parking.IsPublic() || car == nil || parking.IsRewardFull(car) == false {
		return
	}

	user := UserMgr().FindById(car.ownerid)
	this.TakeBackFromParking(user, car.parkingid, uint32(msg.CarOperatorType_AutoBack))

	if user != nil {
		automsg := &msg.GW2C_CarAutoBack{Carid:pb.Uint64(car.id)}
		user.SendMsg(automsg)
	}
}

func (this *CarManager) SaveAllData() {
	pipe := Redis().Pipeline()

	for _, v := range this.cars {
		v.SaveBin(pipe)
	}
	for _, v := range this.parkings {
		v.SaveBin(pipe)
	}
	_, err := pipe.Exec()
	if err != nil {
		log.Error("保存数据失败 redis pipe操作失败")
	}
	pipe.Close()
}

func (this *CarManager) AppendHouseData(houses []*msg.HouseData) {
	for _, v := range houses {
		parkings := this.GetParkingByHouse(v.GetOwnerid(),v.GetId())
		for _, p := range parkings {
			v.Parkings = append(v.Parkings, p.PackBin())
		}
	}
}

func (this *CarManager) GetParkingHouseList(uid uint64) []uint64 {
	retIds := make([]uint64, 0)
	cars := this.GetCarByUser(uid)
	for _, c := range cars {
		if c.parkingid != 0 {
			parking := this.GetParking(c.parkingid)
			retIds = append(retIds, parking.houseid)
		}
	}
	return retIds
}

//循环
func (this *CarManager) Tick(now int64) {
	this.ticker1Minite.Run(now)
	this.ticker1Second.Run(now)
}

func (this *CarManager) Handler1MiniteTick(now int64) {
	this.SaveAllData()
}

func (this *CarManager) Handler1SecondTick(now int64) {
	for _, v := range this.parkings {
		if v.parkingcar == 0 {
			continue
		}
		car := this.GetCar(v.parkingcar)
		v.UpdateReward(car, uint64(now))
		this.AutoTakeBackCar(car, v)
	}
}
