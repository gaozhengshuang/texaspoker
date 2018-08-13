package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	"strconv"
	"strings"
	_ "time"
)

//房间单元
type HouseCell struct {
	tid       uint32 //间的配置id
	index     uint32 //房间在房屋内的编号
	level     uint32 //房间等级
	tmproduce int64  //产金币的起始时间戳
	gold      uint32 //当前待收取的金币
	state     uint32 //当前生产状态
}

func (this *HouseCell) LoadBin(bin *msg.HouseCell) {
	this.tid = bin.GetTid()
	this.index = bin.GetIndex()
	this.level = bin.GetLevel()
	this.tmproduce = bin.GetTmproduce()
	this.gold = bin.GetGold()
	this.state = bin.GetState()
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

//主人收获金币
func (this *HouseCell) OwnerTakeGold() uint32 {
	if this.state == 0 {
		return 0
	} else {
		gold := this.gold
		this.gold = 0
		this.tmproduce = util.CURTIME()
		return gold
	}
}

//其他人偷金币
func (this *HouseCell) VisitorTakeGold() uint32 {
	protect := 30
	if this.state == 0 || this.gold <= uint32(protect) {
		return 0
	}

	take := uint32(float64(this.gold) * 0.2)
	temp := this.gold - take
	if temp <= uint32(protect) {
		this.gold = uint32(protect)
		take = this.gold - uint32(protect)
	} else {
		this.gold = temp
	}

	return take
}

//检查生产状态
func (this *HouseCell) CkeckGoldProduce() {
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
	if util.CURTIME()-this.tmproduce >= int64(needtime) {
		this.state = 1
		this.gold = base.ProduceGold
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
	return bin
}

//房屋访问者操作信息
type HouseVisitInfo struct {
	visitorid uint64 //来访玩家的id
	tmvisit   int64  //来访时间
	optindex  uint32 //操作的房间编号
	opttype   uint32 //操作类型 1主人收钱 2别人抢钱
	optparam  uint32 //操作附加参数 例如主人收了多少钱 别人抢了多少钱
}

func (this *HouseVisitInfo) LoadBin(bin *msg.HouseVisitInfo) {
	this.visitorid = bin.GetVisitorid()
	this.tmvisit = bin.GetTmvisit()
	this.optindex = bin.GetOptindex()
	this.opttype = bin.GetOpttype()
	this.optparam = bin.GetOptparam()
}

func (this *HouseVisitInfo) PackBin() *msg.HouseVisitInfo {
	bin := &msg.HouseVisitInfo{}
	bin.Visitorid = pb.Uint64(this.visitorid)
	bin.Tmvisit = pb.Int64(this.tmvisit)
	bin.Optindex = pb.Uint32(this.optindex)
	bin.Opttype = pb.Uint32(this.opttype)
	bin.Optparam = pb.Uint32(this.optparam)
	return bin
}

type HouseData struct {
	id         uint64                //唯一id
	tid        uint32                //配置id tbl
	ownerid    uint64                //所有者id
	buildingid uint32                //所在楼房的id  新手所租房为虚拟的所在楼房id为0
	level      uint32                //房屋等级
	housecells map[uint32]*HouseCell //每个房间信息
	visitinfo  []*HouseVisitInfo
}

func (this *HouseData) LoadBin(bin *msg.HouseData) {
	this.housecells = make(map[uint32]*HouseCell)
	this.visitinfo = make([]*HouseVisitInfo, 0)
	this.id = bin.GetId()
	this.tid = bin.GetTid()
	this.ownerid = bin.GetOwnerid()
	this.buildingid = bin.GetBuildingid()
	this.level = bin.GetLevel()
	for _, v := range bin.GetHousecells() {
		cell := &HouseCell{}
		cell.LoadBin(v)
		this.housecells[cell.index] = cell
	}

	for _, v := range bin.GetVisitinfo() {
		info := &HouseVisitInfo{}
		info.LoadBin(v)
		this.visitinfo = append(this.visitinfo, info)
	}
	this.OnLoadBin()
}

func (this *HouseData) OnLoadBin() {

}

func (this *HouseData) PackBin() *msg.HouseData {
	bin := &msg.HouseData{}
	bin.Id = pb.Uint64(this.id)
	bin.Tid = pb.Uint32(this.tid)
	bin.Ownerid = pb.Uint64(this.ownerid)
	bin.Buildingid = pb.Uint32(this.buildingid)
	bin.Level = pb.Uint32(this.level)
	bin.Housecells = make([]*msg.HouseCell, 0)
	for _, v := range this.housecells {
		bin.Housecells = append(bin.Housecells, v.PackBin())
	}

	bin.Visitinfo = make([]*msg.HouseVisitInfo, 0)
	for _, v := range this.visitinfo {
		bin.Visitinfo = append(bin.Visitinfo, v.PackBin())
	}

	return bin
}

func (this *HouseData) SaveBin() {
	key := fmt.Sprintf("houses_%d", this.id)
	if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
		log.Error("保存房屋[%d]数据失败", this.id)
		return
	}
	log.Info("保存房屋[%d]数据成功", this.id)
}

//每秒的Tick回调
func (this *HouseData) Handler1SecTick() {
	for _, v := range this.housecells {
		v.CkeckGoldProduce()
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
func (this *HouseData) VisitorTakeGold(cellindex uint32) uint32 {
	if _, ok := this.housecells[cellindex]; ok {
		return this.housecells[cellindex].VisitorTakeGold()
	} else {
		log.Error("玩家[%d] 偷金币出错 房屋id[%d] tid:[%d] 没有此区域index[%d]", this.ownerid, this.id, this.tid, cellindex)
		return 0
	}
}

//主人id
func (this *HouseData) GetOwnerId() uint64 {
	return this.ownerid
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
	this.houses = make(map[uint64]*HouseData)
	this.userhouses = make(map[uint64][]uint64)
	this.housesIdList = make([]uint64, 0)
	this.useronlne = make(map[uint64]int)
}

//获取房屋
func (this *HouseManager) GetHouse(houseid uint64) *HouseData {
	if _, ok := this.houses[houseid]; ok {
		return this.houses[houseid]
	} else {
		//尝试从内存加载 如果没有返回nil
		key, bin := fmt.Sprintf("houses_%d", houseid), &msg.HouseData{}
		if err := utredis.GetProtoBin(Redis(), key, bin); err != nil {
			log.Error("加载房屋信息失败无此房屋数据 id%d ，err: %s", houseid, err)
			return nil
		}
		house := &HouseData{}
		house.LoadBin(bin)
		this.AddHouse(house)
		return house
	}
}

//获取玩家关联的房屋
func (this *HouseManager) GetHousesByUser(uid uint64) []*HouseData {
	data := make([]*HouseData, 0)
	return data
}

//创建一个新的房屋
func (this *HouseManager) CreateNewHouse(ownerid uint64, tid uint32) *HouseData {
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
		house.housecells[uint32(index)] = cell
	}

	house.visitinfo = make([]*HouseVisitInfo, 0)
	house.id = uint64(houseid)
	house.tid = tid
	house.level = 1

	Redis().SAdd("houses_idset", houseid)
	this.AddHouse(house)
	return house
}

//添加房屋到管理器
func (this *HouseManager) AddHouse(house *HouseData) {
	this.houses[house.id] = house
	if _, ok := this.userhouses[house.ownerid]; ok {
		this.userhouses[house.ownerid] = append(this.userhouses[house.ownerid], house.id)
	} else {
		this.userhouses[house.ownerid] = make([]uint64, 0)
		this.userhouses[house.ownerid] = append(this.userhouses[house.ownerid], house.id)
	}
	this.housesIdList = append(this.housesIdList, house.id)
}

//储存所有的房屋信息
func (this *HouseManager) SaveAllHousesData() {
	for _, v := range this.houses {
		v.SaveBin()
	}
}

//主人/访客 取金币
func (this *HouseManager) TakeHouseGold(uid uint64, houseid uint64, index uint32) uint32 {
	house := this.GetHouse(houseid)
	take := uint32(0)
	if house.GetOwnerId() == uid {
		take = house.OwnerTakeGold(index)
	} else {
		take = house.VisitorTakeGold(index)
	}
	return take
}

func (this *HouseManager) OnSyncUserOnlineState(uid uint64, state uint32, sessionid int) {
	if state == 1 {
		this.useronlne[uid] = sessionid
	} else {
		if k, ok := this.useronlne[uid]; ok {
			delete(this.useronlne, uint64(k))
		}
	}
}
