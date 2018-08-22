package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/redis"
	_ "gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	_ "gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	"strconv"
	"strings"
	_ "time"
)

//楼的结构
type BuildingData struct {
	id   uint32
	data map[uint32][]uint64

	tbl *table.TBuildingsDefine
}

func (this *BuildingData) Init() {
	this.data = make(map[uint32][]uint64)
}

func (this *BuildingData) LoadBin(bin *msg.BuildingData) {
	this.Init()
	this.id = bin.GetId()
	for _, v := range bin.GetData() {
		index := v.GetIndex()
		houseids := v.GetHouseid()
		this.data[index] = make([]uint64, 0)
		for _, w := range houseids {
			this.data[index] = append(this.data[index], w)
		}
	}
}

func (this *BuildingData) PackBin() *msg.BuildingData {
	bin := &msg.BuildingData{}
	bin.Id = pb.Uint32(this.id)
	for k, v := range this.data {
		temp := &msg.BuidingSoldData{}
		temp.Index = pb.Uint32(k)
		for _, w := range v {
			temp.Houseid = append(temp.Houseid, w)
		}
		bin.Data = append(bin.Data, temp)
	}
	return bin
}

func (this *BuildingData) SaveBin(pipe redis.Pipeliner) {
	key := fmt.Sprintf("buildings_%d", this.id)
	if pipe != nil {
		if err := utredis.SetProtoBinPipeline(pipe, key, this.PackBin()); err != nil {
			log.Error("保存楼[%d]数据失败", this.id)
			return
		}
	} else {
		if err := utredis.SetProtoBin(Redis(), key, this.PackBin()); err != nil {
			log.Error("保存楼[%d]数据失败", this.id)
			return
		}
		log.Info("保存楼[%d]数据成功", this.id)
	}
}

//购买楼中的房屋
func (this *BuildingData) UserBuyHouse(userid uint64, floor, index uint32) bool {
	return true
}

//-------------------------------------------------------------------------------------------
//楼的管理器
type BuildingManager struct {
	buildings map[uint32]*BuildingData
}

//启动初始化
func (this *BuildingManager) Init() {
	this.buildings = make(map[uint32]*BuildingData)
	//跟据配置加载或创建所有的楼
	newbuildings := make([]*BuildingData, 0)
	for _, v := range tbl.TBuildingsBase.TBuildingsById {
		key, bin := fmt.Sprintf("buildings_%d", v.Id), &msg.BuildingData{}
		if err := utredis.GetProtoBin(Redis(), key, bin); err != nil {
			newbuildings = append(newbuildings, this.CreateBuilding(v.Id))
		} else {
			building := &BuildingData{}
			building.LoadBin(bin)
			this.AddBuilding(building)
		}
	}
	//新创建的楼批量存一次
	if len(newbuildings) > 0 {
		log.Info("新建楼 批量储存")
		pipe := Redis().Pipeline()
		for _, v := range newbuildings {
			if v != nil {
				v.SaveBin(pipe)
			}
		}
		_, err := pipe.Exec()

		if err != nil {
			log.Error("储存新建楼信息失败 [%s]", err)
		} else {
			log.Info("储存新建楼信息成功")
		}
	}
}

//创建楼
func (this *BuildingManager) CreateBuilding(buildingid uint32) *BuildingData {
	_, find := tbl.TBuildingsBase.TBuildingsById[buildingid]
	if find == false {
		log.Error("CreateBuilding Err id not found in tbl id:%d", buildingid)
		return nil
	}
	building := &BuildingData{}
	building.id = buildingid
	building.Init()
	this.AddBuilding(building)
	return building
}

//添加楼到管理器
func (this *BuildingManager) AddBuilding(building *BuildingData) {
	if building == nil {
		log.Error("AddBuilding Err building nil")
		return
	}

	base, find := tbl.TBuildingsBase.TBuildingsById[building.id]
	if find == false {
		log.Error("AddBuilding Err id not found in tbl id:%d", building.id)
		return
	}

	if _, ok := this.buildings[building.id]; ok {
		log.Error("AddBuilding Err Same buildingid id:%", building.id)
		return
	} else {
		building.tbl = base
		this.buildings[building.id] = building
	}

}

//获取一栋楼的数据
func (this *BuildingManager) GetBuilding(buildingid uint32) *BuildingData {
	if _, ok := this.buildings[buildingid]; ok {
		return this.buildings[buildingid]
	} else {
		log.Error("GetBuilding Err got nil id:%d", buildingid)
		return nil
	}
}

//存储所有楼信息
func (this *BuildingManager) SaveAllBuildings() {

}

//获取楼还有多少房屋未售
func (this *BuildingManager) GetHouseNotSoldNumFromBuilding(buildingid uint32) uint32 {
	building := this.GetBuilding(buildingid)
	if building == nil || building.tbl == nil {
		return 0
	}
	total := building.tbl.MaxFloor * building.tbl.NumPerFloor
	cur := 0
	for _, v := range building.data {
		cur = cur + len(v)
	}
	if uint32(cur) < uint32(total) {
		num := uint32(total) - uint32(cur)
		return num
	} else {
		return 0
	}

}

//玩家从楼中购买房屋
func (this *BuildingManager) UserBuyHouseFromBuilding(userid uint64, buildingid, index uint32) uint32 {
	user := UserMgr().FindById(userid)
	if user == nil {
		return 0
	}
	if this.GetHouseNotSoldNumFromBuilding(buildingid) == 0 {
		return 0
	}
	building := this.GetBuilding(buildingid)
	if building == nil || building.tbl == nil {
		return 0
	}
	if index > building.tbl.NumPerFloor || index < 1 {
		return 0
	}
	//当前已售出
	curnum := 0
	if _, ok := building.data[index]; ok {
		curnum = len(building.data[index])
	}
	//判断所买户型是否还有剩余
	if uint32(curnum) > building.tbl.MaxFloor {
		return 0
	}
	strhouse := ""
	if index == 1 {
		strhouse = building.tbl.Houses1
	} else if index == 2 {
		strhouse = building.tbl.Houses2
	} else if index == 3 {
		strhouse = building.tbl.Houses3
	} else if index == 4 {
		strhouse = building.tbl.Houses4
	}
	slicestr := strings.Split(strhouse, "-")
	housetid, _ := strconv.Atoi(slicestr[0])
	cost, _ := strconv.Atoi(slicestr[0])
	if user.RemoveGold(uint32(cost), "购买房屋", true) == false {
		return 0
	}

	house := HouseSvrMgr().CreateNewHouse(userid, uint32(housetid), user.Name(), building.id)
	if house == nil {
		user.AddGold(uint32(cost), "购买房屋创建失败返还金币", true)
		log.Error("购买房屋失败创建房屋nil userid:%d buildingid:%d index:%d", userid, buildingid, index)
		return 0
	}
	return 1
}

//----------------------------------------------------------------------
//user相关接口
func (this *GateUser) BuyHouseFromBuilding(buildingid, index uint32) {
	ret := BuildSvrMgr().UserBuyHouseFromBuilding(this.Id(), buildingid, index)
	send := &msg.GW2C_AckBuyHouseFromBuilding{}
	send.Buildingid = pb.Uint32(buildingid)
	send.Index = pb.Uint32(index)
	send.Ret = pb.Uint32(ret)
	this.SendMsg(send)
}

func (this *GateUser) ReqBuildingCanBuyInfo(buildingid uint32) {
	building := BuildSvrMgr().GetBuilding(buildingid)
	if building == nil || building.tbl == nil {
		log.Error("ReqBuildingCanBuyInfo GetBuilding nil buildingid:%d", buildingid)
		return
	}
	count := building.tbl.MaxFloor
	send := &msg.GW2C_AckBuildingCanBuyInfo{}
	send.Buildingid = pb.Uint32(buildingid)
	for i := uint32(1); i <= building.tbl.NumPerFloor; i++ {
		info := &msg.CanBuyInfo{}
		info.Index = pb.Uint32(i)
		if v, ok := building.data[i]; ok {
			tmp := uint32(len(v))
			if tmp < count {
				info.Count = pb.Uint32(count - tmp)
			} else {
				info.Count = pb.Uint32(0)
			}
		} else {
			info.Count = pb.Uint32(count)
		}
		send.Data = append(send.Data, info)
	}
	this.SendMsg(send)
}
