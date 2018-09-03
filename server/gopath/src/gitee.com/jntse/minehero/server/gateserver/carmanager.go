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
	"strconv"
	"time"
	"math"
	"strings"
)

const (
	CarIdSetKey     = "cars_idset"
	ParkingIdSetKey = "parking_idset"
)

//车辆信息
type CarData struct {
	data 		  *msg.CarData
	modified      bool   //是否需要保存
	template *table.TCarDefine
}

func (this *CarData) ChangeOwner(user *GateUser) {
	CarMgr().DelCar(this)
	exowner := UserMgr().FindById(this.data.GetOwnerid())
	if exowner != nil {
		CarMgr().UpdateCarByID(exowner, this.data.GetId(), true)
	}
	this.data.Ownerid = pb.Uint64(user.Id())
	this.data.Ownername = pb.String(user.Name())
	CarMgr().AddCar(this)
	CarMgr().UpdateCarByID(user, this.data.GetId(), false)
}

func (this *CarData) ClearTrade() {
	this.data.Tradeendtime = pb.Uint32(0)
	this.data.Tradeuid = pb.Uint64(0)
}

func (this *CarData) GetCarName() string {
	carb, bfind := tbl.TCarBrandBase.TCarBrandById[this.GetCarBrand()]
	if bfind == false {
		return "汽车"
	}
	carm, mfind := tbl.TCarModelBase.TCarModelById[this.GetCarModel()]
	if mfind == false {
		return "汽车"
	}
	name := carb.Brand + carm.Model
	return name
}

func (this *CarData) LoadBin(rbuf []byte) error {
	bin := &msg.CarData{}
	if err := pb.Unmarshal(rbuf, bin); err != nil {
		return fmt.Errorf("pb反序列化失败")
	}

	this.data = bin
	this.modified = false
	return nil
}

func (this *CarData) ParkingCar(id uint64,poid uint64) {
	this.data.Parkingid = pb.Uint64(id)
	if poid == this.data.GetOwnerid() {
		//停在自己的停车位上 可以出征咯
		this.data.State = pb.Uint32(uint32(msg.CarState_Ready))
	}else {
		//停在公共车位上 获得奖励的
		this.data.State = pb.Uint32(uint32(msg.CarState_Parking))
		this.data.Starttime = pb.Uint64(uint64(util.CURTIMEMS()))
	}
	this.modified = true
}

func (this *CarData) TakeBack(parking *ParkingData) {
	if parking != nil {
		//从公共车位回到我自己的车位上
		this.data.Parkingid = pb.Uint64(parking.data.GetId())
		this.data.State = pb.Uint32(uint32(msg.CarState_Ready))
	} else {
		//下阵了
		this.data.Parkingid = pb.Uint64(0)
		this.data.State = pb.Uint32(uint32(msg.CarState_Idle))
	}
	this.modified = true
}

func (this *CarData) SetRewardMoney(money uint32){
	reawrdData := this.data.Reward
	reawrdData.Money = pb.Uint32(money)
	this.modified = true
}

func (this *CarData) IsRewardFull() bool{
	return this.data.Reward.GetMoney() >= this.GetAttribut().GetMoneylimit()
}

func (this *CarData) AddRewardItem(id uint32, num uint32) {
	item := &msg.CarPartPiece{}
	item.Id = pb.Uint32(id)
	item.Num = pb.Uint32(num)
	rewardData := this.data.Reward
	rewardData.Items = append(rewardData.Items,item)
	this.modified = true
}

func (this *CarData) ClearReward() {
	rewardData := this.data.Reward
	rewardData.Money = pb.Uint32(0)
	rewardData.Items = make([]*msg.CarPartPiece,0)
	this.modified = true
}

func (this *CarData) GetPartByType(parttype uint32) *msg.CarPartData{
	for _, v := range this.data.Parts {
		if v.GetParttype() == parttype {
			return v
		}
	}
	return nil
}

func (this *CarData) SetPartLevelExp(partid uint32,level uint32,exp uint32) {
	for _, v := range this.data.Parts {
		if v.GetPartid() == partid {
			v.Level = pb.Uint32(level)
			v.Exp = pb.Uint32(exp)
		}
	}
}

func (this *CarData) GetAttribut() *msg.CarAttribute {
	return this.data.GetAttr()
}

func (this *CarData) SetAttribute(attr *msg.CarAttribute){
	this.data.Attr.Reward = pb.Uint32(attr.GetReward())
	this.data.Attr.Range = pb.Float32(attr.GetRange())
	this.data.Attr.Itemlimit = pb.Uint32(attr.GetItemlimit())
	this.data.Attr.Moneylimit = pb.Uint32(attr.GetMoneylimit())
	this.data.Attr.Speed = pb.Float32(attr.GetSpeed())
	this.data.Attr.Stoptime = pb.Float32(attr.GetStoptime())
}

func (this *CarData) UpdateReward(now uint64) {
	if this.data.GetState() == uint32(msg.CarState_Parking) {
		//计算停靠公共车位的奖励
		passedMinute := uint32((now - this.data.GetStarttime()) / 1000 / 60)      // benchmark 效率更好(10倍)
		reward := (passedMinute * this.GetAttribut().GetReward())
		reward = uint32(math.Min(float64(reward), float64(this.GetAttribut().GetMoneylimit())))
		if this.data.Reward.GetMoney() != reward {
			this.SetRewardMoney(reward)
			this.modified = true
		}
	}
}

func (this *CarData) GetMinPartsLevel() uint32 {
	ret := uint32(100)
	for _, v := range this.data.GetParts() {
		ret = uint32(math.Min(float64(ret), float64(v.GetLevel())))
	}
	return ret
}

func (this *CarData) PackBin() *msg.CarData {
	return this.data
}

func (this *CarData) SaveBin(pipe redis.Pipeliner,force bool) {
	key := fmt.Sprintf("cars_%d", this.data.GetId())
	if pipe != nil {
		if this.modified || force {
			if err := utredis.SetProtoBinPipeline(pipe, key, this.PackBin()); err != nil {
				log.Error("打包车辆[%d]数据失败", this.data.GetId())
				return
			}
			this.modified = false
		}
	} else {
		if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
			log.Error("保存车辆[%d]数据失败", this.data.GetId())
			return
		}
	}
}
//获得星级
func (this *CarData) GetStar() uint32{
	//TODO
	return this.data.GetStar()
}
//获得每分钟收益数量
func (this *CarData) GetRewardPerM() uint32{
	//TODO 
	return this.data.Attr.GetReward()
}
func (this *CarData) GetId() uint64 {
	return this.data.GetId()
}
func (this *CarData) GetTid() uint32 {
	return this.data.GetTid()
}
func (this *CarData) GetOwnerId() uint64 {
	return this.data.GetOwnerid()
}
func (this *CarData) GetTradeuid() uint64 {
	return this.data.GetTradeuid()
}
//获得车辆品牌
func (this *CarData) GetCarBrand() uint32 {
	template, find := tbl.TCarBase.TCarById[this.data.GetTid()]
	if find == false {
		log.Error("无效的车辆tid[%d]", this.data.GetTid())
		return 0
	}
	return template.Brand
}
//获得车辆型号
func (this *CarData) GetCarModel() uint32 {
	template, find := tbl.TCarBase.TCarById[this.data.GetTid()]
	if find == false {
		log.Error("无效的车辆tid[%d]", this.data.GetTid())
		return 0
	}
	return template.Model
}

func (this *CarData) CanOperate() bool {
	if this.data.GetTradeuid() != 0 {
		if user := UserMgr().FindById(this.data.GetOwnerid()); user != nil {
			user.SendNotify("汽车出售中，不能操作")
		}
		return false
	}
	return true
}

func (this *CarData) CanTrade() bool {
	if this.data.GetTradeuid() != 0 {
		return false
	}
	if this.data.GetState() != 1 {
		return false
	}
	return true
}

//车位信息
type ParkingData struct {
	data				*msg.ParkingData
	modified            bool   //是否需要保存
}

func (this *ParkingData) LoadBin(rbuf []byte) error {
	bin := &msg.ParkingData{}
	if err := pb.Unmarshal(rbuf, bin); err != nil {
		return fmt.Errorf("pb反序列化失败")
	}

	this.data = bin
	this.modified = false

	return nil
}

func (this *ParkingData) PackBin() *msg.ParkingData {
	return this.data
}

func (this *ParkingData) SaveBin(pipe redis.Pipeliner,force bool) {
	key := fmt.Sprintf("parkings_%d", this.data.GetId())
	if pipe != nil {
		if this.modified || force {
			if err := utredis.SetProtoBinPipeline(pipe, key, this.PackBin()); err != nil {
				log.Error("打包车位[%d]数据失败", this.data.GetId())
				return
			}
			this.modified = false
		}
	} else {
		if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
			log.Error("保存车位[%d]数据失败", this.data.GetId())
			return
		}
	}
}

func (this *ParkingData) TakeBack() {
	this.data.Parkingcar = pb.Uint64(0)
	this.data.Parkingcarownerid = pb.Uint64(0)
	this.data.Parkingcarownername = pb.String("")
	this.data.Parkingcartid = pb.Uint32(0)
	this.modified = true
}

func (this *ParkingData) Parking(car *CarData, username string) {
	this.data.Parkingcar = pb.Uint64(car.data.GetId())
	this.data.Parkingcarownerid = pb.Uint64(car.data.GetOwnerid())
	this.data.Parkingcarownername = pb.String(username)
	this.data.Parkingcartid = pb.Uint32(car.data.GetTid())
	this.modified = true
}

// 是否公共车位
func (this *ParkingData) IsPublic() bool {
	return this.data.GetParkingtype() == uint32(msg.ParkingType_Public)
}

// 是否私有车位
func (this *ParkingData) IsPrivate() bool {
	return this.data.GetParkingtype() == uint32(msg.ParkingType_Private)
}

//车辆管理器
type CarManager struct {
	cars     map[uint64]*CarData //已加载的所有车辆的map
	usercars map[uint64]map[uint64]uint64 //玩家id 关联的车辆id

	parkings       map[uint64]*ParkingData //已加载的所有车位map
	userparkings   map[uint64][]uint64     //玩家id 关联的车位id
	publicparkings uint32                  // 公共车位数

	//配置
	partlevelupconfs map[uint32]map[uint32]*table.TCarPartLevelupDefine

	ticker1Minite *util.GameTicker
	ticker1Second *util.GameTicker
}

func (this *CarManager) Init() {
	this.cars = make(map[uint64]*CarData)
	this.usercars = make(map[uint64]map[uint64]uint64)
	this.parkings = make(map[uint64]*ParkingData)
	this.userparkings = make(map[uint64][]uint64)
	this.partlevelupconfs = make(map[uint32]map[uint32]*table.TCarPartLevelupDefine)

	this.ticker1Minite = util.NewGameTicker(time.Minute, this.Handler1MiniteTick)
	this.ticker1Minite.Start()

	this.ticker1Second = util.NewGameTicker(time.Second, this.Handler1SecondTick)
	this.ticker1Second.Start()

	this.LoadCarFromDB()
	this.LoadParkingFromDB()
	this.LoadLevelupConf()

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

func (this *CarManager) LoadLevelupConf() {
	for _, v := range tbl.TCarPartLevelupBase.TCarPartLevelupById {
		levelupConfForPart := this.partlevelupconfs[v.Quality]
		if levelupConfForPart == nil {
			levelupConfForPart = make(map[uint32]*table.TCarPartLevelupDefine,0)
			this.partlevelupconfs[v.Quality] = levelupConfForPart
		}
		levelupConfForPart[v.Level] = v
	}
}

func (this *CarManager) GetCar(id uint64) *CarData {
	if _, ok := this.cars[id]; ok {
		return this.cars[id]
	}
	return nil
}

func (this *CarManager) GetCarTemplate(id uint32) *table.TCarDefine{
	template, find := tbl.TCarBase.TCarById[id]
	if find == false {
		log.Error("无效的车辆tid[%d]", id)
		return nil
	}
	return template
}

// 获得车辆对应house(目前没有一一绑定关系，车主house第一个house)
func (this *CarManager) GetCarHouseId(carid uint64) uint64 {
	car := this.GetCar(carid)
	if car == nil {
		return 0
	}

	houses := HouseSvrMgr().GetHousesByUser(car.data.GetOwnerid())
	if len(houses) != 0 {
		//return houses[0].id
		for _, v := range houses {
			return v.id
		}
	}
	return 0
}


func (this *CarManager) CreateNewCar(ownerid uint64, tid uint32, name string,price uint32) *CarData {
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
	data := &msg.CarData{}
	data.Id = pb.Uint64(carid)
	data.Tid = pb.Uint32(tid)
	data.Ownerid = pb.Uint64(ownerid)
	data.Createtime = pb.Uint64(uint64(util.CURTIMEMS()))
	data.Parkingid = pb.Uint64(0)
	data.Ownername = pb.String(name)
	data.Reward = &msg.CarReward{}
	data.Reward.Money = pb.Uint32(0)
	data.Star = pb.Uint32(1)
	data.State = pb.Uint32(uint32(msg.CarState_Idle))
	data.Starttime = pb.Uint64(0)
	data.Endtime = pb.Uint64(0)
	data.Latitude = pb.Float32(0.0)
	data.Longitude = pb.Float32(0.0)
	data.Price = pb.Uint32(price)
	data.Initprice = pb.Uint32(price)
	//创建部件
	data.Parts = make([]*msg.CarPartData, 0)
	this.CreateCarPart(template.Tyre,uint32(msg.CarPartType_Tyre),data)
	this.CreateCarPart(template.Tank,uint32(msg.CarPartType_Tank),data)
	this.CreateCarPart(template.Trunk,uint32(msg.CarPartType_Trunk),data)
	this.CreateCarPart(template.Engine,uint32(msg.CarPartType_Engine),data)
	this.CreateCarPart(template.Battery,uint32(msg.CarPartType_Battery),data)
	//计算属性
	attr := this.CalculateCarAttribute(data)
	car.data = data
	data.Attr = &msg.CarAttribute{}
	car.SetAttribute(attr)

	car.modified = false

	car.SaveBin(nil,true)
	Redis().SAdd(CarIdSetKey, carid)
	this.AddCar(car)
	return car
}

func (this *CarManager) CreateCarPart(id uint32,parttype uint32,data *msg.CarData) {
	_, ok := tbl.TCarPartBase.TCarPartById[id]
	if ok == false {
		log.Error("无效的配件id[%d]", id)
	}else {
		partData := &msg.CarPartData{}
		partData.Partid = pb.Uint32(id)
		partData.Parttype = pb.Uint32(parttype)
		partData.Level = pb.Uint32(1)
		partData.Exp = pb.Uint32(0)
		data.Parts = append(data.Parts, partData)
	}
}

func (this *CarManager) CalculateCarAttribute (data *msg.CarData) *msg.CarAttribute {
	attr := &msg.CarAttribute{}
	//部件属性
	for _, v := range data.Parts {
		partConf, ok := tbl.TCarPartBase.TCarPartById[v.GetPartid()]
		if ok == false {
			log.Error("无效的配件id[%d]", v.GetPartid())
		}else {
			attr.Reward = pb.Uint32(attr.GetReward() + (partConf.RewardInit + partConf.RewardAddition * v.GetLevel()))
			attr.Range = pb.Float32(attr.GetRange() + partConf.RangeInit + partConf.RangeAddition * float32(v.GetLevel()))
			attr.Itemlimit = pb.Uint32(attr.GetItemlimit() + (partConf.ItemLimitInit + partConf.ItemLimitAddition * v.GetLevel()))
			attr.Moneylimit = pb.Uint32(attr.GetMoneylimit() + (partConf.MoneyLimitInit + partConf.MoneyLimitAddition * v.GetLevel()))
			attr.Speed = pb.Float32(attr.GetSpeed() + partConf.SpeedInit + partConf.SpeedAddition * float32(v.GetLevel()))
			attr.Stoptime = pb.Float32(attr.GetStoptime() + partConf.StopTimeInit + partConf.StopTimeAddition * float32(v.GetLevel()))
		}
	}
	//星级属性 暂未
	carstartattr,find := tbl.TCarStarAttrBase.TCarStarAttrById[data.GetTid()]
	if find {
		// 是有星级属性的
		attr.Reward = pb.Uint32(attr.GetReward() + (carstartattr.RewardInit + carstartattr.RewardAddition * data.GetStar()))
		attr.Range = pb.Float32(attr.GetRange() + carstartattr.RangeInit + carstartattr.RangeAddition * float32(data.GetStar()))
		attr.Itemlimit = pb.Uint32(attr.GetItemlimit() + (carstartattr.ItemLimitInit + carstartattr.ItemLimitAddition * data.GetStar()))
		attr.Moneylimit = pb.Uint32(attr.GetMoneylimit() + (carstartattr.MoneyLimitInit + carstartattr.MoneyLimitAddition * data.GetStar()))
		attr.Speed = pb.Float32(attr.GetSpeed() + carstartattr.SpeedInit + carstartattr.SpeedAddition * float32(data.GetStar()))
		attr.Stoptime = pb.Float32(attr.GetStoptime() + carstartattr.StopTimeInit + carstartattr.StopTimeAddition * float32(data.GetStar()))
	}
	return attr
}


func (this *CarManager) AddCar(car *CarData) {
	this.cars[car.data.GetId()] = car
	if _, ok := this.usercars[car.data.GetOwnerid()]; !ok {
		this.usercars[car.data.GetOwnerid()] = make(map[uint64]uint64)
	}
	this.usercars[car.data.GetOwnerid()][car.data.GetId()] = car.data.GetId()
}

func (this *CarManager) DelCar(car *CarData) {
	if _, ok := this.usercars[car.data.GetOwnerid()]; ok {
		delete(this.usercars[car.data.GetOwnerid()], car.data.GetId())
	}
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
	prefix, data,brand, model := "", "", "", ""
	template := this.GetCarTemplate(car.data.GetTid())
	if template != nil {
		brandTemp, find := tbl.TCarBrandBase.TCarBrandById[template.Brand]
		if find {
			brand = brandTemp.Brand
		}
		modelTemp, find := tbl.TCarModelBase.TCarModelById[template.Model]
		if find {
			model = modelTemp.Model
		}
	}
	switch opttype {
	case uint32(msg.CarOperatorType_Park):
		//停车
		prefix = fmt.Sprintf("%d_%d_%d_%s  ", handleid, opttype, parking.data.GetHouseid(), time.Now().Format("15:04"))
		data = prefix + car.data.GetOwnername() + "将他的" + brand + model + "停在了你的车位"
		break
	case uint32(msg.CarOperatorType_TakeBack):
		//收车
		prefix = fmt.Sprintf("%d_%d_%d_%s  ", handleid, opttype, this.GetCarHouseId(car.data.GetId()), time.Now().Format("15:04"))
		data = prefix + car.data.GetOwnername() + "开走了他的" + brand + model
		break
	case uint32(msg.CarOperatorType_Ticket):
		prefix = fmt.Sprintf("%d_%d_%d_%s  ", handleid, opttype, parking.data.GetHouseid(), time.Now().Format("15:04"))
		data = prefix + parking.data.GetOwnername() + "对你的" + brand + model + "贴条"
		break
	case uint32(msg.CarOperatorType_AutoBack):
		prefix = fmt.Sprintf("%d_%d_%d_%s  ", handleid, opttype, 0, time.Now().Format("15:04"))
		data = prefix + "公共车位收益满自动回收你的" + brand + model
		break
	}
	// 保存数据
	key := fmt.Sprintf("parkingrecord_%d", ownerid)
	err := Redis().LPush(key, data).Err()
	if err != nil {
		log.Error("创建车位操作记录失败 id%d ，err: %s", ownerid, err)
		return ""
	}
	if Redis().LLen(key).Val() > 5 {
		//删除最老的记录
		err := Redis().BRPop(0, key).Err()
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
		if(parkingInfo.data.GetHouseid() != hid){
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
		if parkingtype != 0 && v.data.GetParkingtype() != parkingtype {
			continue
		}
		if playerid != 0 && v.data.GetOwnerid() != playerid {
			continue
		}

		findHouse := func(houseid uint64) bool {
			for _, w := range houseids {
				if houseid == w { return true }
			}
			return false
		}
		if len(houseids) > 0 && findHouse(v.data.GetHouseid()) == false {
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
	data := &msg.ParkingData{}
	data.Id = pb.Uint64(parkingid)
	data.Tid = pb.Uint32(tid)
	data.Parkingtype = pb.Uint32(template.Type)
	data.Ownerid = pb.Uint64(ownerid)
	data.Parkingcar = pb.Uint64(0)
	data.Parkingcarownerid = pb.Uint64(0)
	data.Parkingcarownername = pb.String("")
	data.Parkingtime = pb.Uint64(0)
	data.Parkingreward = pb.Uint32(0)
	data.Ownername = pb.String(name)
	data.Parkingcartid = pb.Uint32(0)
	data.Houseid = pb.Uint64(hid)
	parking.data = data
	parking.modified = false
	parking.SaveBin(nil,true)
	Redis().SAdd(ParkingIdSetKey, parkingid)
	this.AddParking(parking)
	return parking
}

func (this *CarManager) UpdateCarByID(user *GateUser, carid uint64, del bool) {
	car := this.GetCar(carid)
	if car == nil {
		return
	}
	send := &msg.GW2C_UpdateCar{}
	send.Carid = pb.Uint64(car.data.GetId())
	if del == false {
		send.Data = car.PackBin()
	}
	send.Isdel = pb.Bool(del)
	user.SendMsg(send)
}

func (this *CarManager) AddParking(parking *ParkingData) {
	this.parkings[parking.data.GetId()] = parking
	if _, ok := this.userparkings[parking.data.GetOwnerid()]; !ok {
		this.userparkings[parking.data.GetOwnerid()] = make([]uint64, 0)
	}
	this.userparkings[parking.data.GetOwnerid()] = append(this.userparkings[parking.data.GetOwnerid()], parking.data.GetId())
}

// 停车到车位
func (this *CarManager) ParkingCar(carid uint64, parkingid uint64, username string) (result int32) {
	car := this.GetCar(carid)
	parking := this.GetParking(parkingid)
	if car == nil || parking == nil {
		return 1
	}
	if car.CanOperate() == false {
		return 8
	}
	if parking.data.GetParkingcar() != 0 {
		user.SendNotify("改车位已经有车辆了")
		return 3
	}
	if parking.data.GetOwnerid() != 0 {
		//不是公共车位 不能停在自己的车位上咯
		user.SendNotify("不能停到非公共车位上")
		return 4
	}
	//要停公共车位了 看看车辆状态
	if car.data.GetState() != uint32(msg.CarState_Ready) {
		//不能停哦
		user.SendNotify("车辆当前状态[%d] 不能停车到公共车位上")
		return 5
	}
	if car.data.Reward.GetMoney() > 0 || len(car.data.Reward.GetItems()) > 0 {
		//有奖励未领取
		user.SendNotify("车辆上尚有奖励未领取")
		return 6
	}
	//看看出征时是不是到上限了
	if this.GetParkingCount(car.data.GetOwnerid()) <= this.GetActionCarCount(car.data.GetOwnerid()){
		//不能去干啥了哦
		user.SendNotify("已达到您的可使用车辆上限")
		return 7
	}
	//可以了
	car.ParkingCar(parkingid,parking.data.GetOwnerid())
	parking.Parking(car, username)
	record := this.CreateNewRecord(car.data.GetOwnerid(), parking.data.GetOwnerid(), car, parking, uint32(msg.CarOperatorType_Park), 0)

	//发送操作记录
	sendOwner := UserMgr().FindById(parking.data.GetOwnerid())
	if sendOwner != nil {
		sendRecord := &msg.GW2C_SynParkingRecord{}
		sendRecord.Records = append(sendRecord.Records, *pb.String(record))
		sendOwner.SendMsg(sendRecord)
	}
	return 0
}

func (this *CarManager) TakeBackFromParking(user *GateUser, parkingid uint64, optype uint32) (result uint32, reward uint32) {
	parking := this.GetParking(parkingid)
	if parking == nil {
		return 1, 0
	}
	if parking.data.GetParkingcar() == 0 {
		return 2, 0
	}
	car := this.GetCar(parking.data.GetParkingcar())
	if car == nil {
		return 3, 0
	}
	//可以收回
	parking.TakeBack()
	if parking.IsPublic() {
		privateParkings := this.GetParkingByUser(parking.data.GetOwnerid())
		takebacked := false
		for _, v := range privateParkings {
			if v.data.GetParkingcar() == car.data.GetId() {
				car.TakeBack(v)
				takebacked = true
				break;
			}
		}
		if !takebacked {
			car.TakeBack(nil)
		}
	} else {
		car.TakeBack(nil)
	}
	
	reward = car.data.Reward.GetMoney()
	record, notifyuser := "", uint64(0)
	switch optype {
	case uint32(msg.CarOperatorType_TakeBack):
		record = this.CreateNewRecord(car.data.GetOwnerid(), parking.data.GetOwnerid(), car, parking, uint32(msg.CarOperatorType_TakeBack), reward)
		notifyuser = parking.data.GetOwnerid()
		user.AddGold(reward, "收回车辆收益", true)
		break
	case uint32(msg.CarOperatorType_Ticket):
		record = this.CreateNewRecord(parking.data.GetOwnerid(), car.data.GetOwnerid(), car, parking, uint32(msg.CarOperatorType_Ticket), reward)
		notifyuser = car.data.GetOwnerid()
		user.AddGold(reward, "贴条车辆收益", true)
		reaper := UserMgr().FindById(parking.data.GetOwnerid())
		if reaper != nil {
			reaper.AddGold(reward, "贴条车辆收益", true)
		}
		break
	case uint32(msg.CarOperatorType_AutoBack):
		record = this.CreateNewRecord(parking.data.GetId(), car.data.GetOwnerid(), car, parking, uint32(msg.CarOperatorType_AutoBack), reward)
		notifyuser = car.data.GetOwnerid()
		car.SetRewardMoney(reward)
		log.Info("玩家[%s %d] 公共车位自动回收车辆[%d]", car.data.GetOwnername(), car.data.GetOwnerid(), car.data.GetId())
		break
	}

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

	if user.Id() != car.data.GetOwnerid() {
		user.SendNotify("这不是您的车辆")
		return 0, 0
	}

	if car.data.Reward.GetMoney() == 0 {
		user.SendNotify("车辆没有可领取收益")
		return 0, 0
	}

	reward = car.data.Reward.GetMoney()
	//TODO 还有物品哦
	user.AddGold(reward, "领取自动回收收益", true)
	car.ClearReward()
	user.SendNotify("领取成功")
	return 0, reward
}

func (this *CarManager) CarPartLevelup(user *GateUser,carid uint64,parttype uint32,pieces []*msg.CarPartPiece) (result uint32,data *msg.CarData){
	car := this.GetCar(carid)
	if car == nil {
		user.SendNotify("没有这辆车")
		return 1,nil
	}
	if car.data.GetState() != uint32(msg.CarState_Ready) {
		user.SendNotify(fmt.Sprintf("当前状态不可以升级 : %d", car.data.GetState()))
		return 10,nil
	}
	partData := car.GetPartByType(parttype)
	if partData == nil {
		user.SendNotify("没有这个部件")
		return 2,nil
	}
	parttemplate,find := tbl.TCarPartBase.TCarPartById[partData.GetPartid()]
	if find == false {
		user.SendNotify("没有这个部件的配置文件")
		return 3,nil
	}
	if partData.GetLevel() >= parttemplate.MaxLevel {
		user.SendNotify("该部件已经满级啦")
		return 4,nil
	}
	//计算可以获得的经验
	addExp := uint32(0)
	for _,v := range pieces {
		levelcarpart,find := tbl.TLevelCarPartBase.TLevelCarPartById[v.GetId()]
		if find == false {
			user.SendNotify(fmt.Sprintf("没有经验道具 : %d", v.GetId()))
			return 5,nil
		}
		if levelcarpart.PartType != parttype {
			user.SendNotify(fmt.Sprintf("经验道具不能升级该部件 : %d", v.GetId()))
			return 6,nil
		}
		if user.bag.GetItemNum(v.GetId()) < v.GetNum() {
			user.SendNotify(fmt.Sprintf("经验道具数量不足 : %d", v.GetId()))
			return 7,nil
		}
		addExp = addExp + (levelcarpart.Exp * v.GetNum())
	}
	//预测一下可以升几级
	targetlevel := partData.GetLevel()
	targetExp := partData.GetExp()
	costMoney := uint32(0)
	targetExp = targetExp + addExp
	levelupConf := this.GetCarPartLevelupConf(parttemplate.Quality,targetlevel)
	if levelupConf == nil {
		user.SendNotify("没有升级到这一级的配置")
		return 8,nil
	}
	for {
		if targetlevel >= parttemplate.MaxLevel {
			targetExp = 0
			break
		} else if targetExp < levelupConf.Exp {
			//经验升不了一级啦
			break
		}
		//可以升一级
		targetlevel = targetlevel + 1
		targetExp = targetExp - levelupConf.Exp
		costMoney = costMoney + levelupConf.Cost
		if targetlevel < parttemplate.MaxLevel {
			levelupConf = this.GetCarPartLevelupConf(parttemplate.Quality,targetlevel)
			if levelupConf == nil {
				user.SendNotify("没有升级到这一级的配置")
				return 8,nil
			}
		}
	}
	//预测完事了 钱够不够啊
	if user.GetGold() < costMoney {
		user.SendNotify("升级货币不足")
		return 9,nil
	}
	//升级
	leveluped := (partData.GetLevel() != targetlevel)
	partData.Level = pb.Uint32(targetlevel)
	partData.Exp = pb.Uint32(targetExp)
	if leveluped {
		//重新计算星级 
		attr := this.CalculateCarAttribute(car.data)
		car.SetAttribute(attr)
	}
	//扣钱扣道具
	user.RemoveGold(costMoney,"车辆部件升级消耗碎片",true)
	for _,v := range pieces {
		user.RemoveItem(v.GetId(),v.GetNum(),"车辆部件升级消耗碎片")
	}
	car.data.Price = pb.Uint32(car.data.GetPrice() + costMoney)
	car.modified = true

	return 0,car.data
}

func (this *CarManager) CarStarup(user *GateUser,carid uint64) (result uint32,data *msg.CarData){
	car := this.GetCar(carid)
	if car == nil {
		user.SendNotify("没有这辆车")
		return 1,nil
	}
	if car.data.GetState() != uint32(msg.CarState_Ready) {
		user.SendNotify(fmt.Sprintf("当前状态不可以升级 : %d", car.data.GetState()))
		return 2,nil
	}
	template := this.GetCarTemplate(car.GetTid())
	if template == nil {
		user.SendNotify(fmt.Sprintf("没有这辆车的配置 : %d", car.GetTid()))
		return 3,nil
	}
	starLimit := uint32(math.Min(float64(car.GetMinPartsLevel()),float64(template.MaxStar)))
	if car.GetStar() >= starLimit {
		user.SendNotify("已经满星了")
		return 4,nil
	}
	starupCarBase,find := tbl.TStarupCarBase.TStarupCarById[car.GetStar()]
	if !find {
		user.SendNotify("没有升星的配置文件")
		return 5,nil
	}
	//看看东西够不够
	if starupCarBase.Money > user.GetGold() {
		user.SendNotify("货币不足")
		return 6,nil
	}
	costItem := make(map[uint32]uint32)
	for _,v := range starupCarBase.Item {
		itemstr := strings.Split(v,"-")
		itemid, _ := strconv.Atoi(itemstr[0])
		itemnum, _ := strconv.Atoi(itemstr[1])
		if user.bag.GetItemNum(uint32(itemid)) < uint32(itemnum) {
			user.SendNotify(fmt.Sprintf("道具 %d 不足",itemid))
			return 7,nil
		}
		costItem[uint32(itemid)] = uint32(itemnum)
	}

	car.data.Star = pb.Uint32(car.GetStar() + 1)
	attr := this.CalculateCarAttribute(car.data)
	car.SetAttribute(attr)
	car.data.Price = pb.Uint32(car.data.GetPrice() + starupCarBase.Money)
	car.modified = true

	//扣东西
	user.RemoveGold(starupCarBase.Money, "车辆升星消耗", true)
	for k,v := range costItem {
		user.RemoveItem(k,v,"车辆升星消耗")
	}

	return 0,car.data
}

func (this *CarManager) GetCarPartLevelupConf(quality uint32,level uint32) *table.TCarPartLevelupDefine {
	partLevelupGroup := this.partlevelupconfs[quality]
	if partLevelupGroup == nil {
		return nil
	}else{
		return partLevelupGroup[level]
	}
}

func (this *CarManager) GetActionCarCount(uid uint64) uint32{
	cars := this.GetCarByUser(uid)
	count := uint32(0)
	for _, v := range cars {
		if v.data.GetState() != uint32(msg.CarState_Ready){
			count = count + 1
		}
	}
	return count
}

func (this *CarManager) GetParkingCount(uid uint64) uint32{
	count := uint32(0)
	parkings := this.GetParkingByUser(uid);
	for _, v := range parkings {
		v.data.GetHouseid();
		house := HouseSvrMgr().GetHouse(v.data.GetHouseid())
		if house.tradeuid == 0 {
			count = count + 1 
		}
	}
	return count
}
// 自动从公共车位回收汽车
func (this *CarManager) AutoTakeBackCar(car *CarData, parking *ParkingData) {
	if parking == nil || !parking.IsPublic() || car == nil || car.IsRewardFull() == false {
		return
	}

	this.TakeBackFromParking(nil, car.data.GetParkingid(), uint32(msg.CarOperatorType_AutoBack))

	user := UserMgr().FindById(car.data.GetOwnerid())
	if user != nil {
		automsg := &msg.GW2C_CarAutoBack{Carid:pb.Uint64(car.data.GetId())}
		user.SendMsg(automsg)
	}
}

func (this *CarManager) SaveAllData(force bool) {
	pipe := Redis().Pipeline()

	for _, v := range this.cars {
		v.SaveBin(pipe,force)
	}
	for _, v := range this.parkings {
		v.SaveBin(pipe,force)
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
		if c.data.GetParkingid() != 0 {
			parking := this.GetParking(c.data.GetParkingid())
			retIds = append(retIds, parking.data.GetHouseid())
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
	this.SaveAllData(false)
}

func (this *CarManager) Handler1SecondTick(now int64) {
	for _, v := range this.cars {
		if v.data.GetState() == uint32(msg.CarState_Parking) {
			v.UpdateReward(uint64(now))
			parking := this.GetParking(v.data.GetParkingid())
			this.AutoTakeBackCar(v, parking)
		}
	}
}
