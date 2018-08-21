package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	"strconv"
	"strings"
	"time"
)

//房间单元
type HouseCell struct {
	tid       uint32 //间的配置id
	index     uint32 //房间在房屋内的编号
	level     uint32 //房间等级
	tmproduce int64  //产金币的起始时间戳
	gold      uint32 //当前待收取的金币
	state     uint32 //当前生产状态

	ownerid uint64   //所有者id
	robdata []uint64 //抢钱人id
}

func (this *HouseCell) LoadBin(bin *msg.HouseCell) {
	this.robdata = make([]uint64, 0)
	this.tid = bin.GetTid()
	this.index = bin.GetIndex()
	this.level = bin.GetLevel()
	this.tmproduce = bin.GetTmproduce()
	this.gold = bin.GetGold()
	this.state = bin.GetState()
	this.robdata = bin.GetRobers()
	this.OnLoadBin()
}

func (this *HouseCell) OnLoadBin() {
	now := util.CURTIME()
	//这里要读表
	base, find := tbl.THouseCellBase.THouseCellById[this.tid]
	if find == false {
		log.Error("无效的房间区域cell  tid[%d]", this.tid)
		return
	}
	needtime := base.ProduceTime
	if this.state == 0 && now-this.tmproduce > int64(needtime) {
		this.gold = base.ProduceGold
		this.state = 1
	}
}

func (this *HouseCell) SetOwner(ownerid uint64) {
	this.ownerid = ownerid
}

//主人收获金币
func (this *HouseCell) OwnerTakeGold() uint32 {
	base, find := tbl.THouseCellBase.THouseCellById[this.tid]
	if find == false {
		log.Error("无效的房间区域cell  tid[%d]", this.tid)
		return 0
	}
	goldmax := base.ProduceGold
	if this.gold > goldmax {
		this.gold = goldmax
	}
	if this.state == 0 {
		return 0
	} else {
		gold := this.gold
		this.gold = 0
		this.state = 0
		this.tmproduce = util.CURTIME()
		return gold
	}
}

//其他人偷金币
func (this *HouseCell) VisitorTakeGold(roberid uint64) uint32 {
	base, find := tbl.THouseCellBase.THouseCellById[this.tid]
	if find == false {
		log.Error("无效的房间区域cell  tid[%d]", this.tid)
		return 0
	}
	goldmax := base.ProduceGold
	if this.gold > goldmax {
		this.gold = goldmax
	}
	count := len(this.robdata)
	for _, v := range this.robdata {
		if v == roberid {
			//这个玩家已经抢过
			return 0
		}
	}
	if this.state == 0 || count >= 3 {
		//未产出 或 被抢三次
		return 0
	}
	take := uint32(float64(goldmax) * 0.2)
	if take >= this.gold {
		take = this.gold
		this.gold = 0
	} else {
		this.gold = this.gold - take
	}

	this.robdata = append(this.robdata, roberid)
	return take
}

//检查生产状态
func (this *HouseCell) CkeckGoldProduce(now int64) {
	//log.Info("HouseCell CkeckGoldProduce index:%d", this.index)
	if this.state > 0 {
		return
	}
	//这里要读表
	base, find := tbl.THouseCellBase.THouseCellById[this.tid]
	if find == false {
		log.Error("无效的房间区域cell  tid[%d]", this.tid)
		return
	}
	needtime := base.ProduceTime
	nowsecond := util.CURTIME()
	if nowsecond-this.tmproduce >= int64(needtime) {
		this.state = 1
		this.gold = base.ProduceGold
		this.robdata = make([]uint64, 0)
		HouseSvrMgr().SyncUserHouseData(this.ownerid)
	}
}

func (this *HouseCell) PackBin() *msg.HouseCell {
	bin := &msg.HouseCell{}
	bin.Tid = pb.Uint32(this.tid)
	bin.Index = pb.Uint32(this.index)
	bin.Level = pb.Uint32(this.level)
	bin.Tmproduce = pb.Int64(this.tmproduce)
	bin.Gold = pb.Uint32(this.gold)
	bin.State = pb.Uint32(this.state)
	bin.Robers = this.robdata
	return bin
}

func (this *HouseCell) LevelUp() bool {
	base, find := tbl.THouseCellBase.THouseCellById[this.tid]
	if find == false {
		log.Error("HouseCell LevelUp 无效的房间区域cell  tid[%d]", this.tid)
		return false
	}

	if this.level >= base.MaxLevel {
		log.Error("HouseCell LevelUp 房间Cell升级 已达最大等级  tid[%d]", this.tid)
		return false
	}
	this.level = this.level + 1
	this.tid = this.tid + 1
	return true
}

//房屋访问者操作信息
type HouseVisitInfo struct {
	visitorid   uint64 //来访玩家的id
	tmvisit     int64  //来访时间
	optindex    uint32 //操作的房间编号
	opttype     uint32 //操作类型 1主人收钱 2别人抢钱
	optparam    uint32 //操作附加参数 例如主人收了多少钱 别人抢了多少钱
	visitorname string //来访玩家的名字
}

func (this *HouseVisitInfo) LoadBin(bin *msg.HouseVisitInfo) {
	this.visitorid = bin.GetVisitorid()
	this.tmvisit = bin.GetTmvisit()
	this.optindex = bin.GetOptindex()
	this.opttype = bin.GetOpttype()
	this.optparam = bin.GetOptparam()
	this.visitorname = bin.GetVisitorname()
}

func (this *HouseVisitInfo) PackBin() *msg.HouseVisitInfo {
	bin := &msg.HouseVisitInfo{}
	bin.Visitorid = pb.Uint64(this.visitorid)
	bin.Tmvisit = pb.Int64(this.tmvisit)
	bin.Optindex = pb.Uint32(this.optindex)
	bin.Opttype = pb.Uint32(this.opttype)
	bin.Optparam = pb.Uint32(this.optparam)
	bin.Visitorname = pb.String(this.visitorname)
	return bin
}

type HouseData struct {
	id           uint64                //唯一id
	tid          uint32                //配置id tbl
	ownerid      uint64                //所有者id
	buildingid   uint32                //所在楼房的id  新手所租房为虚拟的所在楼房id为0
	level        uint32                //房屋等级
	housecells   map[uint32]*HouseCell //每个房间信息
	visitinfo    []*HouseVisitInfo
	ownername    string
	robcheckflag uint32 //标记是否被抢过钱 有人抢置1 客户端查看过之后置0

	ticker1Sec *util.GameTicker
}

func (this *HouseData) LoadBin(bin *msg.HouseData) {
	this.housecells = make(map[uint32]*HouseCell)
	this.visitinfo = make([]*HouseVisitInfo, 0)
	this.id = bin.GetId()
	this.tid = bin.GetTid()
	this.ownerid = bin.GetOwnerid()
	this.buildingid = bin.GetBuildingid()
	this.level = bin.GetLevel()
	this.ownername = bin.GetOwnername()
	this.robcheckflag = bin.GetRobcheckflag()
	for _, v := range bin.GetHousecells() {
		cell := &HouseCell{}
		cell.LoadBin(v)
		cell.SetOwner(this.ownerid)
		this.housecells[cell.index] = cell
	}

	for _, v := range bin.GetVisitinfo() {
		info := &HouseVisitInfo{}
		info.LoadBin(v)
		this.visitinfo = append(this.visitinfo, info)
	}
	log.Info("读取房屋[%d] ", this.id)
	this.OnLoadBin()
}

func (this *HouseData) Tick(now int64) {
	this.ticker1Sec.Run(now)
}

func (this *HouseData) OnLoadBin() {
	this.ticker1Sec = util.NewGameTicker(1000*time.Millisecond, this.Handler1SecTick)
	this.ticker1Sec.Start()
}

func (this *HouseData) PackBin() *msg.HouseData {
	bin := &msg.HouseData{}
	bin.Id = pb.Uint64(this.id)
	bin.Tid = pb.Uint32(this.tid)
	bin.Ownerid = pb.Uint64(this.ownerid)
	bin.Buildingid = pb.Uint32(this.buildingid)
	bin.Level = pb.Uint32(this.level)
	bin.Ownername = pb.String(this.ownername)
	bin.Housecells = make([]*msg.HouseCell, 0)
	bin.Robcheckflag = pb.Uint32(this.robcheckflag)
	for _, v := range this.housecells {
		bin.Housecells = append(bin.Housecells, v.PackBin())
	}

	bin.Visitinfo = make([]*msg.HouseVisitInfo, 0)
	for _, v := range this.visitinfo {
		bin.Visitinfo = append(bin.Visitinfo, v.PackBin())
	}

	return bin
}

func (this *HouseData) SaveBin(pipe redis.Pipeliner) {
	key := fmt.Sprintf("houses_%d", this.id)
	if pipe != nil {
		if err := utredis.SetProtoBinPipeline(pipe, key, this.PackBin()); err != nil {
			log.Error("保存房屋[%d]数据失败", this.id)
			return
		}
	} else {
		if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
			log.Error("保存房屋[%d]数据失败", this.id)
			return
		}
		log.Info("保存房屋[%d]数据成功", this.id)
	}
}

//每秒的Tick回调
func (this *HouseData) Handler1SecTick(now int64) {
	for _, v := range this.housecells {
		v.CkeckGoldProduce(now)
	}
}

//主人收金币
func (this *HouseData) OwnerTakeGold(cellindex uint32) uint32 {
	if _, ok := this.housecells[cellindex]; ok {
		return this.housecells[cellindex].OwnerTakeGold()
	} else {
		log.Error("玩家[%d] 收金币出错 房屋id[%d] tid:[%d] 没有此区域index[%d]", this.ownerid, this.id, this.tid, cellindex)
		return 0
	}
}

//访客偷金币
func (this *HouseData) VisitorTakeGold(cellindex uint32, visitorid uint64, visitorname string) uint32 {
	if _, ok := this.housecells[cellindex]; ok {
		gold := this.housecells[cellindex].VisitorTakeGold(visitorid)
		if gold > 0 {
			//加偷钱的记录
			this.AddVisitInfo(visitorid, cellindex, 2, gold, visitorname)
		}
		return gold
	} else {
		log.Error("玩家[%d] 偷金币出错 房屋id[%d] tid:[%d] 没有此区域index[%d]", visitorid, this.id, this.tid, cellindex)
		return 0
	}
}

//主人id
func (this *HouseData) GetOwnerId() uint64 {
	return this.ownerid
}

//房屋升级
func (this *HouseData) LevelUp() bool {
	base, find := tbl.THouseBase.THouseById[uint32(this.tid)]
	if find == false {
		log.Error("House LevelUp 无效的房屋tid[%d]", this.tid)
		return false
	}
	if this.level >= base.MaxLevel {
		log.Error("House LevelUp 房屋已达最大等级 tid[%d]", this.tid)
		return false
	}
	this.level = this.level + 1
	this.tid = this.tid + 1
	return true
}

//添加记录
func (this *HouseData) AddVisitInfo(visitorid uint64, optindex uint32, opttype uint32, optparam uint32, visitorname string) {
	data := &HouseVisitInfo{}
	data.visitorid = visitorid
	data.tmvisit = util.CURTIME()
	data.optindex = optindex
	data.opttype = opttype
	data.optparam = optparam
	data.visitorname = visitorname
	this.visitinfo = append(this.visitinfo, data)
	infolen := len(this.visitinfo)

	for {
		if infolen <= 5 {
			break
		}
		this.visitinfo = append(this.visitinfo[:0], this.visitinfo[1:]...)
		infolen = len(this.visitinfo)
	}
	this.robcheckflag = 1
}

//客户端查看记录重置查看状态
func (this *HouseData) ResetRobcheckflag() {
	log.Info("重置查看状态 houseid: %d", this.id)
	this.robcheckflag = 0
}

//------------------------------------------------------------------------------------
//房屋管理器
type HouseManager struct {
	houses map[uint64]*HouseData //已加载的所有房屋的map

	userhouses map[uint64][]uint64 //玩家id 关联的房屋id

	housesIdList []uint64 //房屋id列表

	useronlne map[uint64]int //玩家id session
}

func (this *HouseManager) Init() {
	log.Info("HouseManager Init")
	this.houses = make(map[uint64]*HouseData)
	this.userhouses = make(map[uint64][]uint64)
	this.housesIdList = make([]uint64, 0)
	this.useronlne = make(map[uint64]int)
	data, err := Redis().SMembers("houses_idset").Result()
	if err != nil {
		log.Error("启动加载放假数据失败 err: %s", err)
	} else {

		for _, v := range data {
			houseid, _ := strconv.Atoi(v)
			key, bin := fmt.Sprintf("houses_%d", uint64(houseid)), &msg.HouseData{}
			if err := utredis.GetProtoBin(Redis(), key, bin); err != nil {
				log.Error("加载房屋信息失败无此房屋数据 id%d ，err: %s", uint64(houseid), err)
			} else {
				house := &HouseData{}
				house.LoadBin(bin)
				this.AddHouse(house)
			}
		}
	}
}

//获取房屋
func (this *HouseManager) GetHouse(houseid uint64) *HouseData {
	if _, ok := this.houses[houseid]; ok {
		return this.houses[houseid]
	} else {
		log.Error("GetHouse House ERR No Data return nil id%d ", houseid)
		return nil
	}
}

//获取玩家关联的房屋
func (this *HouseManager) GetHousesByUser(uid uint64) []*HouseData {
	data := make([]*HouseData, 0)
	if _, ok := this.userhouses[uid]; ok {
		ids := this.userhouses[uid]
		for _, v := range ids {
			tmp := this.GetHouse(v)
			if tmp != nil {
				data = append(data, tmp)
			}
		}
	}

	return data
}

//创建一个新的房屋
func (this *HouseManager) CreateNewHouse(ownerid uint64, tid uint32, ownername string) *HouseData {
	log.Info("建一个新的房屋 ownerid: %d, tid: %d", ownerid, tid)
	houseid, errcode := def.GenerateHouseId(Redis())
	if errcode != "" {
		log.Error("创建新的房屋生成新的房屋id出错，error:%s", errcode)
		return nil
	}
	//查表去获取房屋的配置信息创建
	house := &HouseData{}
	house.housecells = make(map[uint32]*HouseCell)
	base, find := tbl.THouseBase.THouseById[uint32(tid)]
	if find == false {
		log.Error("无效的房屋tid[%d]", tid)
		return nil
	}
	cellstr := base.Cells
	slicecell := strings.Split(cellstr, "-")
	for k, v := range slicecell {
		index := k + 1
		celltype, _ := strconv.Atoi(v)
		celltid := celltype*1000 + 1
		cell := &HouseCell{}
		cell.tid = uint32(celltid)
		cell.index = uint32(index)
		cell.level = 1
		cell.tmproduce = util.CURTIME()
		cell.gold = 0
		cell.state = 0
		cell.robdata = make([]uint64, 0)
		cell.SetOwner(ownerid)
		house.housecells[uint32(index)] = cell
	}

	house.visitinfo = make([]*HouseVisitInfo, 0)
	house.id = uint64(houseid)
	house.tid = tid
	house.level = 1
	house.ownerid = ownerid
	house.ownername = ownername
	house.SaveBin(nil)
	Redis().SAdd("houses_idset", houseid)
	this.AddHouse(house)
	//创建好之后初始化额外计时器等
	house.OnLoadBin()
	return house
}

//添加房屋到管理器
func (this *HouseManager) AddHouse(house *HouseData) {
	if _, ok := this.houses[house.id]; ok {
		log.Error("AddHouse Err Same houseid  id:%d ", house.id)
	} else {
		this.houses[house.id] = house
		this.housesIdList = append(this.housesIdList, house.id)
	}
	if _, ok := this.userhouses[house.ownerid]; ok {
		this.userhouses[house.ownerid] = append(this.userhouses[house.ownerid], house.id)
	} else {
		this.userhouses[house.ownerid] = make([]uint64, 0)
		this.userhouses[house.ownerid] = append(this.userhouses[house.ownerid], house.id)
	}
}

//储存所有的房屋信息
func (this *HouseManager) SaveAllHousesData() {
	log.Info("储存所有的房屋信息 SaveAllHousesData")
	pipe := Redis().Pipeline()
	for _, v := range this.houses {
		v.SaveBin(pipe)
	}

	_, err := pipe.Exec()
	if err != nil {
		log.Error("储存所有的房屋信息失败 [%s]", err)
	} else {
		log.Info("储存所有的房屋信息成功")
	}
}

//循环
func (this *HouseManager) Tick(now int64) {
	for _, v := range this.houses {
		v.Tick(now)
	}
}

//通知 玩家房屋信息变化
func (this *HouseManager) SyncUserHouseData(uid uint64) {
	user := UserMgr().FindById(uid)
	if user != nil {
		user.ReqMatchHouseData()
	}
}

//房屋升级 1成功 0失败
func (this *HouseManager) HouseLevelUp(userid uint64, houseid uint64) uint32 {
	house := this.GetHouse(houseid)
	if house == nil {
		return 0
	}
	if house.LevelUp() {
		this.SyncUserHouseData(userid)
		return 1
	} else {
		return 0
	}

}

//房间升级 1成功 0 失败
func (this *HouseManager) HouseCellLevelUp(userid uint64, houseid uint64, index uint32) uint32 {
	house := this.GetHouse(houseid)
	if house == nil {
		return 0
	}
	houselevel := house.level
	if _, ok := house.housecells[index]; ok {
		cell := house.housecells[index]
		celllevel := cell.level
		if celllevel >= houselevel {
			return 0
		}
		if cell.LevelUp() {
			this.SyncUserHouseData(userid)
			return 1
		} else {
			return 0
		}
	} else {
		log.Error("房间单元升级 房屋没有此房间 housetid:%d  index:%d", house.tid, index)
		return 0
	}
}

//收金币 返回偷取金币数 >0 时成功
func (this *HouseManager) TakeSelfHouseGold(userid uint64, houseid uint64, index uint32) uint32 {
	house := this.GetHouse(houseid)
	if house == nil {
		return 0
	}

	gold := house.OwnerTakeGold(index)
	if gold > 0 {
		this.SyncUserHouseData(userid)
		return gold
	}
	return 0
}

//偷金币 返回偷取金币数 > 0 时成功
func (this *HouseManager) TakeOtherHouseGold(houseid uint64, index uint32, visitorid uint64, visitorname string) uint32 {
	house := this.GetHouse(houseid)
	if house == nil {
		return 0
	}
	if house.ownerid == visitorid {
		log.Error("偷取金币出错 不能偷取自己的房屋金币 houseid:%d  ownerid:%d  visitorid:%d", houseid, house.ownerid, visitorid)
		return 0
	}
	gold := house.VisitorTakeGold(index, visitorid, visitorname)
	if gold > 0 {
		this.SyncUserHouseData(house.ownerid)
		return gold
	}
	return 0
}

//获取随机的房屋列表
func (this *HouseManager) GetRandHouseList(uid uint64) []*msg.HouseData {
	data := make([]*msg.HouseData, 0)
	count := len(this.housesIdList)
	if count <= 11 {
		i := 0
		for _, v := range this.houses {
			if i >= 11 {
				break
			}
			if v.ownerid != uid {
				data = append(data, v.PackBin())
			}
			i = i + 1
		}
	} else {
		tmprand := def.GetRandNumbers(int32(count-1), 11)
		for _, v := range tmprand {
			houseid := this.housesIdList[int(v)]
			house := this.GetHouse(houseid)
			if house != nil && house.ownerid != uid {
				data = append(data, house.PackBin())
			}
		}
	}
	if len(data) > 10 {
		data = data[1:]
	}
	return data

}

func (this *HouseManager) ResetRobcheckflag(houseid uint64) {
	house := this.GetHouse(houseid)
	if house == nil {
		return
	}
	house.ResetRobcheckflag()
	this.SyncUserHouseData(house.ownerid)
}

func (this *GateUser) ReqMatchHouseData() {
	this.UpdateHouseData()
	this.SendHouseData()
}

func (this *GateUser) SendHouseData() {
	send := &msg.GW2C_AckHouseData{}
	for _, v := range this.housedata {
		send.Datas = append(send.Datas, v)
	}

	this.SendMsg(send)
}

func (this *GateUser) UpdateHouseData() {
	info := HouseSvrMgr().GetHousesByUser(this.Id())
	data := make([]*msg.HouseData, 0)
	for _, v := range info {
		tmp := v.PackBin()
		data = append(data, tmp)
	}
	this.housedata = data
}

func (this *GateUser) GetUserHouseDataByHouseId(houseid uint64) *msg.HouseData {
	for _, v := range this.housedata {
		if houseid == v.GetId() {
			return v
		}
	}
	return nil
}

func (this *GateUser) HouseLevelUp(houseid uint64) {
	house := this.GetUserHouseDataByHouseId(houseid)
	if house != nil {
		base, find := tbl.THouseBase.THouseById[house.GetTid()]
		if find == false {
			log.Error("无效的房屋  tid[%d]", house.GetTid())
			return
		}
		if house.GetLevel() >= base.MaxLevel {
			//房屋到最高等级
			return
		}
		needgold := base.LevelUpCost
		if this.RemoveGold(needgold, "升级房屋扣除", true) == false {
			//钱不够
			return
		} else {
			ret := HouseSvrMgr().HouseLevelUp(this.Id(), houseid)
			house := HouseSvrMgr().GetHouse(houseid)
			if house == nil {
				return
			}
			this.ReqMatchHouseData()
			send := &msg.GW2C_AckHouseLevelUp{}
			send.Houseid = pb.Uint64(houseid)
			send.Ret = pb.Uint32(ret)
			send.Data = house.PackBin()
			this.SendMsg(send)
		}
	} else {
		log.Error("HouseLevelUp house not found id:%d", houseid)
	}
}

func (this *GateUser) HouseCellLevelUp(houseid uint64, index uint32) {
	house := this.GetUserHouseDataByHouseId(houseid)
	if house != nil {
		cells := house.GetHousecells()
		for _, v := range cells {
			if v.GetIndex() == index {
				base, find := tbl.THouseCellBase.THouseCellById[v.GetTid()]
				if find == false {
					log.Error("无效的房间Cell  tid[%d]", v.GetTid())
					return
				}
				if v.GetLevel() >= base.MaxLevel {
					//Cell到最高等级
					return
				}
				if house.GetLevel() <= v.GetLevel() {
					//房屋等级不足
					return
				}
				needgold := base.LevelUpCost
				if this.RemoveGold(needgold, "升级房屋扣除", true) == false {
					//钱不够
					return
				} else {
					ret := HouseSvrMgr().HouseCellLevelUp(this.Id(), houseid, index)
					house := HouseSvrMgr().GetHouse(houseid)
					if house == nil {
						return
					}
					this.ReqMatchHouseData()
					send := &msg.GW2C_AckHouseCellLevelUp{}
					send.Houseid = pb.Uint64(houseid)
					send.Index = pb.Uint32(index)
					send.Ret = pb.Uint32(ret)
					send.Data = house.PackBin()
					this.SendMsg(send)

				}
				return
			}
		}
		//here not find index
		log.Error("HouseCellLevelUp index not found index:%d", index)
	} else {
		log.Error("HouseCellLevelUp house not found id:%d", houseid)
	}

}

func (this *GateUser) TakeSelfHouseGold(houseid uint64, index uint32) {
	house := this.GetUserHouseDataByHouseId(houseid)
	if house != nil {
		cells := house.GetHousecells()
		for _, v := range cells {
			if v.GetIndex() == index {
				if v.GetGold() <= 0 {
					//没钱可取
					log.Error("TakeSelfHouseGold have no gold")
					return
				}
				gold := HouseSvrMgr().TakeSelfHouseGold(this.Id(), houseid, index)
				if gold > 0 {
					this.AddGold(gold, "收取自己房屋产出金币", true)
					this.ReqMatchHouseData()
				}
				house := HouseSvrMgr().GetHouse(houseid)
				if house == nil {
					return
				}
				send := &msg.GW2C_AckTakeSelfHouseGoldRet{}
				send.Houseid = pb.Uint64(houseid)
				send.Index = pb.Uint32(index)
				send.Gold = pb.Uint32(gold)
				send.Data = house.PackBin()
				this.SendMsg(send)

				return
			}
		}
		//here not find index
		log.Error("TakeSelfHouseGold index not found index:%d", index)
	} else {
		log.Error("TakeSelfHouseGold house not found id:%d", houseid)
	}

}

func (this *GateUser) TakeOtherHouseGold(houseid uint64, index uint32) {
	if this.robcount <= 0 {
		return
	}

	gold := HouseSvrMgr().TakeOtherHouseGold(houseid, index, this.Id(), this.Name())
	if gold > 0 {
		this.AddGold(gold, "抢夺其他玩家房屋产出金币", true)
		this.SetRobCount(this.GetRobCount() - 1)
	}
	house := HouseSvrMgr().GetHouse(houseid)
	if house == nil {
		return
	}
	send := &msg.GW2C_AckTakeOtherHouseGoldRet{}
	send.Houseid = pb.Uint64(houseid)
	send.Index = pb.Uint32(index)
	send.Gold = pb.Uint32(gold)
	send.Data = house.PackBin()
	this.SendMsg(send)
}

func (this *GateUser) ReqRandHouseList() {
	data := HouseSvrMgr().GetRandHouseList(this.Id())
	send := &msg.GW2C_AckRandHouseList{}
	send.Datas = data
	this.SendMsg(send)
}

func (this *GateUser) ReqOtherUserHouse(otherid uint64) {
	info := HouseSvrMgr().GetHousesByUser(otherid)
	send := &msg.GW2C_AckOtherUserHouseData{}
	for _, v := range info {
		tmp := v.PackBin()
		send.Datas = append(send.Datas, tmp)
	}
	this.SendMsg(send)
}

func (this *GateUser) ResetRobCheckFlag(houseid uint64) {
	house := this.GetUserHouseDataByHouseId(houseid)
	if house == nil {
		log.Error("ResetRobCheckFlag have no house  houseid: %d", houseid)
		return
	}
	HouseSvrMgr().ResetRobcheckflag(houseid)
}

func (this *GateUser) UnLockHouseCell(houseid uint64, index uint32) {
	send := &msg.GW2C_ACKUnLockHouseCell{}
	send.Houseid = pb.Uint64(houseid)
	send.Index = pb.Uint32(index)
	send.Ret = pb.Uint32(1)
	this.SendMsg(send)
}
