package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	_ "gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
	_"gitee.com/jntse/minehero/server/tbl/excel"
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
}

func (this *BuildingData) Init() {
	this.data = make(map[uint32][]uint64)
}

func (this *BuildingData) LoadBin(rbuf []byte) *msg.BuildingData {
	this.Init()
	bin := &msg.BuildingData{}
	if err := pb.Unmarshal(rbuf, bin); err != nil {
		return nil
	}
	this.id = bin.GetId()
	for _, v := range bin.GetData() {
		index := v.GetIndex()
		houseids := v.GetHouseid()
		this.data[index] = make([]uint64, 0)
		for _, w := range houseids {
			this.data[index] = append(this.data[index], w)
		}
	}
	return bin
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

//-------------------------------------------------------------------------------------------
//楼的管理器
type BuildingManager struct {
	buildings map[uint32]*BuildingData
}

//启动初始化
func (this *BuildingManager) Init() {
	this.buildings = make(map[uint32]*BuildingData)
	this.LoadDB()
}

func (this *BuildingManager) LoadDB() {
	//跟据配置加载或创建所有的楼
	pipe := Redis().Pipeline()
	defer pipe.Close()
	newbuildings := make([]*BuildingData, 0)
	for _, v := range tbl.TBuildingsBase.TBuildingsById {
		key := fmt.Sprintf("buildings_%d", v.Id)
		pipe.Get(key)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("BuildingManager LoadDB RedisError:%s ", err)
		return
	}

	for _, v := range cmds {
		if v.Err() == redis.Nil {
			key := v.Args()[1].(string)
			ids := strings.TrimLeft(key, "buildings_")
			id, _ := strconv.Atoi(ids)
			newbuildings = append(newbuildings, this.CreateBuilding(uint32(id)))
		} else {
			rbuf, _ := v.(*redis.StringCmd).Bytes()
			building := &BuildingData{}
			if building.LoadBin(rbuf) != nil {
				this.AddBuilding(building)
			}
		}
	}

	//新创建的楼批量存一次
	if len(newbuildings) > 0 {
		log.Info("新建楼 批量储存")
		pipe2 := Redis().Pipeline()
		defer pipe2.Close()
		for _, v := range newbuildings {
			if v != nil {
				v.SaveBin(pipe2)
			}
		}
		_, err := pipe2.Exec()

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
	log.Info("CreateBuilding buildingid:%d", buildingid)
	this.AddBuilding(building)
	return building
}

//添加楼到管理器
func (this *BuildingManager) AddBuilding(building *BuildingData) {
	if building == nil {
		log.Error("AddBuilding Err building nil")
		return
	}

	_, find := tbl.TBuildingsBase.TBuildingsById[building.id]
	if find == false {
		log.Error("AddBuilding Err id not found in tbl id:%d", building.id)
		return
	}

	if _, ok := this.buildings[building.id]; ok {
		log.Error("AddBuilding Err Same buildingid id:%", building.id)
		return
	} else {
		this.buildings[building.id] = building
		log.Info("AddBuilding buildingid:%d", building.id)
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
	log.Info("储存所有的楼信息 SaveAllBuildings")
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range this.buildings {
		v.SaveBin(pipe)
	}

	_, err := pipe.Exec()
	if err != nil {
		log.Error("储存所有的楼信息失败 [%s]", err)
	} else {
		log.Info("储存所有的楼信息成功")
	}
}

//获取楼还有多少房屋未售
func (this *BuildingManager) GetHouseNotSoldNumFromBuilding(buildingid uint32) uint32 {
	building := this.GetBuilding(buildingid)
	if building == nil {
		return 0
	}
	base, find := tbl.TBuildingsBase.TBuildingsById[building.id]
	if find == false {
		return 0
	}

	total := base.MaxFloor * base.NumPerFloor
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
func (this *BuildingManager) UserBuyHouseFromBuilding(userid uint64, buildingid, index uint32) uint64 {
	user := UserMgr().FindById(userid)
	if user == nil {
		return 0
	}
	if this.GetHouseNotSoldNumFromBuilding(buildingid) == 0 {
		return 0
	}
	building := this.GetBuilding(buildingid)
	if building == nil {
		return 0
	}

	base, find := tbl.TBuildingsBase.TBuildingsById[building.id]
	if find == false {
		return 0
	}

	if index > base.NumPerFloor || index < 1 {
		return 0
	}
	//当前已售出
	curnum := 0
	if _, ok := building.data[index]; ok {
		curnum = len(building.data[index])
	}
	//判断所买户型是否还有剩余
	if uint32(curnum) >= base.MaxFloor {
		return 0
	}
	strhouse := ""
	if index == 1 {
		strhouse = base.Houses1
	} else if index == 2 {
		strhouse = base.Houses2
	} else if index == 3 {
		strhouse = base.Houses3
	} else if index == 4 {
		strhouse = base.Houses4
	}
	slicestr := strings.Split(strhouse, "|")
	slicehouse := strings.Split(slicestr[0], "-")
	housetid, _ := strconv.Atoi(slicehouse[0])
	costper, _ := strconv.Atoi(slicehouse[1])
	square, _ := strconv.Atoi(slicehouse[2])
	cost := uint32(costper) * uint32(square)
	if user.RemoveGold(uint32(cost), "购买房屋", true) == false {
		return 0
	}
	
	roommember := (uint32(curnum) + 1)*100 + uint32(index)

	house := HouseSvrMgr().CreateNewHouse(userid, uint32(housetid), user.Name(), building.id, uint32(roommember), uint32(square), uint32(cost))
	if house == nil {
		user.AddGold(uint32(cost), "购买房屋创建失败返还金币", true)
		log.Error("购买房屋失败创建房屋nil userid:%d buildingid:%d index:%d", userid, buildingid, index)
		return 0
	}
	if _, ok := building.data[index]; ok {
		building.data[index] = append(building.data[index], house.id)
	} else {
		building.data[index] = make([]uint64, 0)
		building.data[index] = append(building.data[index], house.id)
	}
	building.SaveBin(nil)

	if len(slicestr) > 1 {
		slicecarparking := strings.Split(slicestr[1], "-")
		for _, v := range slicecarparking {
			parkingtid, _ := strconv.Atoi(v)
			CarMgr().CreateNewParking(userid, uint32(parkingtid), user.Name(), house.id)
		}
	}
	return house.id
}

//获取楼中所有入住的房屋 userid为除了某玩家之外 userid=0 为此楼所有房屋
func (this *BuildingManager) GetAllHouseDataFromBuilding(buildingid uint32, userid uint64) []*HouseData {
	data := make([]*HouseData, 0)
	building := this.GetBuilding(buildingid)
	if building == nil {
		log.Error("GetAllHouseDataFromBuilding Err building nil buildingid:%d", buildingid)
		return data
	}
	for _, v := range building.data {
		for _, w := range v {
			house := HouseSvrMgr().GetHouse(w)
			if house == nil {
				continue
			}
			if userid != 0 && house.ownerid == userid {
				continue
			}
			data = append(data, house)
		}
	}
	return data
}

//----------------------------------------------------------------------
//user相关接口
func (this *GateUser) BuyHouseFromBuilding(buildingid, index uint32) {
	log.Info("玩家[%s]id:%d 请求购买房屋 buildingid:%d index:%d", this.Name(), this.Id(), buildingid, index)
	houseid := BuildSvrMgr().UserBuyHouseFromBuilding(this.Id(), buildingid, index)
	ret := 0
	if houseid > 0 {
		this.ReqMatchHouseData()
		ret = 1
	}
	send := &msg.GW2C_AckBuyHouseFromBuilding{}
	send.Buildingid = pb.Uint32(buildingid)
	send.Index = pb.Uint32(index)
	send.Ret = pb.Uint32(uint32(ret))
	send.Houseid = pb.Uint64(houseid)
	this.SendMsg(send)
}

func (this *GateUser) ReqBuildingCanBuyInfo(buildingid uint32) {
	log.Info("ReqBuildingCanBuyInfo buildingid:%d", buildingid)
	building := BuildSvrMgr().GetBuilding(buildingid)
	if building == nil {
		log.Error("ReqBuildingCanBuyInfo GetBuilding nil buildingid:%d", buildingid)
		return
	}
	base, find := tbl.TBuildingsBase.TBuildingsById[building.id]
	if find == false {
		return
	}
	count := base.MaxFloor
	send := &msg.GW2C_AckBuildingCanBuyInfo{}
	send.Buildingid = pb.Uint32(buildingid)
	for i := uint32(1); i <= base.NumPerFloor; i++ {
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

//获取楼中最多10个除了自己之外房屋信息
func (this *GateUser) ReqBuildingRandHouseList(buildingid uint32) []*msg.HouseData {
	alldata := BuildSvrMgr().GetAllHouseDataFromBuilding(buildingid, this.Id())
	count := len(alldata)
	data := make([]*msg.HouseData, 0)
	if count <= 10 {
		for _, v := range alldata {
			data = append(data, v.PackBin())
		}
	} else {
		tmprand := util.SelectRandNumbers(int32(count-1), 10)
		for _, v := range tmprand {
			house := alldata[int(v)]
			data = append(data, house.PackBin())
		}
	}
	return data
}
