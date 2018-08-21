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
	_ "strconv"
	_ "strings"
	_ "time"
)

//楼的结构
type BuildingData struct {
	id   uint32
	data map[uint32]uint64

	tbl *table.TBuildingsDefine
}

func (this *BuildingData) Init() {
	this.data = make(map[uint32]uint64)
}

func (this *BuildingData) LoadBin(bin *msg.BuildingData) {
	this.Init()
	this.id = bin.GetId()
	for _, v := range bin.GetData() {
		index := v.GetIndex()
		houseid := v.GetHouseid()
		this.data[index] = houseid
	}
}

func (this *BuildingData) PackBin() *msg.BuildingData {
	bin := &msg.BuildingData{}
	bin.Id = pb.Uint32(this.id)
	for k, v := range this.data {
		temp := &msg.BuidingSoldData{}
		temp.Index = pb.Uint32(k)
		temp.Houseid = pb.Uint64(v)
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

//获取楼还有多少房屋未售
func (this *BuildingManager) GetHouseNotSoldNumFromBuilding(buildingid uint32) uint32 {
	building := this.GetBuilding(buildingid)
	if building == nil || building.tbl == nil {
		return 0
	}
	return 0
}

//玩家从楼中购买房屋
func (this *BuildingManager) UserBuyHouseFromBuilding(userid uint64, buildingid, floor, index uint32) bool {
	return true
}
