/// @file maid.go
/// @brief 女仆相关
/// @author jackytse, xiejian1998@foxmail.com
/// @version 1.0
/// @date 2018-08-28
package main
import (
	"time"
	"strconv"
	"strings"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/log"

	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	"gitee.com/jntse/minehero/server/tbl"
)

const (
	RedisKeyMaidRawData = "maidrawdata"
)

// --------------------------------------------------------------------------
/// @brief 女仆
/// @brief 
/// @brief 
/// @brief 
/// @brief 
/// @brief 
/// @brief 
// --------------------------------------------------------------------------
type Maid struct {
	bin 	*msg.HouseMaidData
	clothes map[int32]*msg.ItemData		// 衣服装扮
	dirty 	bool
}

func (m *Maid) Init() {
	m.clothes = make(map[int32]*msg.ItemData)
}

func (m *Maid) Bin() *msg.HouseMaidData {
	return m.bin
}

func (m *Maid) Id() uint64 {
	return m.bin.GetId()
}

func (m *Maid) OwnerId() uint64 {
	return m.bin.GetOwnerid()
}

func (m *Maid) OwnerName() string {
	return m.bin.GetOwnername()
}

func (m *Maid) RobberId() uint64 {
	return m.bin.GetRobberid()
}

func (m *Maid) RobberName() string {
	return m.bin.GetRobbername()
}

func (m *Maid) SetRobber(id uint64, name string) {
	m.bin.Robberid = pb.Uint64(id)
	m.bin.Robbername = pb.String(name)
}

func (m *Maid) Earning() uint32 {
	return m.bin.GetEarning()
}

func (m *Maid) SetEarning(n uint32) {
	m.bin.Earning = pb.Uint32(n)
	m.dirty = true
}

func (m *Maid) Level() int32 {
	return m.bin.GetLevel()
}

func (m *Maid) SetLevel(l int32) {
	m.bin.Level = pb.Int32(l)
	m.dirty = true
}

func (m *Maid) Dirty() bool {
	return m.dirty
}

func (m *Maid) HouseId() uint64 {
	return m.bin.GetHouseid()
}

func (m *Maid) SetHouseId(id uint64) {
	m.bin.Houseid = pb.Uint64(id)
}

func (m *Maid) TimeStart() int64 {
	return m.bin.GetTmworking()
}

func (m *Maid) SetTimeStart(t int64) {
	m.bin.Tmworking = pb.Int64(t)
}

func (m *Maid) OnLevelUp() {
	m.SetLevel(m.Level() + 1)
}

func (m *Maid) SaveBin(pipe redis.Pipeliner) {
	id := strconv.FormatUint(uint64(m.Id()), 10)
	m.dirty = false
	if pipe == nil {
		if err := utredis.HSetProtoBin(Redis(), RedisKeyMaidRawData, id, m.bin); err != nil {
			log.Error("[女仆] 保存产品数据 Redis Error:%s", err)
		}
		log.Info("[女仆] 保存数据是成功 id=%d owner[%s %d]", m.Id(), m.OwnerName(), m.OwnerId())
	}else {
		utredis.HSetProtoBinPipeline(pipe, RedisKeyMaidRawData, id, m.bin)
	}
}

func (m *Maid) LoadBin(rbuf []byte) *msg.HouseMaidData {
	data := &msg.HouseMaidData{}
	if err := pb.Unmarshal(rbuf, data); err != nil {
		return nil
	}

	for _, item := range data.Clothes {
		m.clothes[item.GetPos()] = item
	}
	m.bin = data
	return data
}

// pack时装数据到二进制
func (m *Maid) PackBin() *msg.HouseMaidData {
	m.bin.Clothes = make([]*msg.ItemData, 0)
	for _, item := range m.clothes {
		m.bin.Clothes = append(m.bin.Clothes, item)
	}
	return m.bin
}

func (m *Maid) Clean() {
	m.clothes = make(map[int32]*msg.ItemData)
}

func (m *Maid) GetClothesByPos(pos int32) *msg.ItemData {
	if item, find := m.clothes[pos]; find == true {
		return item
	}
	return nil
}

// 穿衣服
func (m *Maid) DressClothes(owner *GateUser, pos int32, itemid int32) {
	newEquip := owner.bag.FindById(uint32(itemid))
	if newEquip == nil {
		owner.SendNotify("找不到穿戴的服装")
		return
	}

	equipbase := newEquip.EquipBase()
	if equipbase == nil {
		owner.SendNotify("只能穿戴服装道具")
		return 
	}

	if equipbase.Pos != pos {
		owner.SendNotify("不能穿戴这个位置")
		return
	}

	if equipbase.Sex != int32(msg.Sex_Neutral) && equipbase.Sex != owner.Sex() {
		owner.SendNotify("性别不符合")
		return
	}

	copyItem := pb.Clone(newEquip.Bin()).(*msg.ItemData)
	copyItem.Pos = pb.Int32(pos)
	m.clothes[pos] = copyItem
	m.dirty = true
	m.PackBin()
	MaidMgr().SendUserMaids(owner)
}

// 脱下服装
func (m *Maid) UnDressClothes(owner *GateUser, pos int32, syn bool) {
	if clothes := m.GetClothesByPos(pos); clothes == nil {
		return
	}
	delete(m.clothes, pos)
	m.dirty = true
	m.PackBin()

	if syn {
		MaidMgr().SendUserMaids(owner)
	}
}

// 脱下全部
func (m *Maid) UnDressAll(owner *GateUser, syn bool) {
	m.clothes = make(map[int32]*msg.ItemData)
	m.dirty = true
	m.PackBin()
	if syn {
		MaidMgr().SendUserMaids(owner)
	}
}

// 是否穿戴套装
func (m *Maid) IsHaveDressSuit() bool {
	for _, v := range m.clothes {
		if v.GetPos() == int32(msg.ItemPos_Suit) {
			return true 
		}
	}
	return false
}

// 获得时装技能属性
func (m *Maid) GetEquipSkills(owner *GateUser) []int32 {
	skills := make([]int32, 10)
	for _, item := range m.clothes {
		equip, find := tbl.TEquipBase.EquipById[int32(item.GetId())]
		if find == false { continue }
		for _, skill := range equip.Skill { 
			iskill, _ := strconv.ParseInt(skill, 10, 32)
			skills = append(skills, int32(iskill))
		}
	}
	return skills
}



// --------------------------------------------------------------------------
/// @brief 女仆管理器
/// @brief 
/// @brief 
/// @brief 
/// @brief 
// --------------------------------------------------------------------------
type MaidManager struct {
	ticker1Minite *util.GameTicker
	maids map[uint64]*Maid					// 所有女仆
	usermaids map[uint64]map[uint64]*Maid	// 玩家女仆
	housemaids map[uint64]map[uint64]*Maid	// 房屋女仆
	//robbermaids map[uint64]map[uint64]*Maid	// 玩家掠夺女仆
}

func (ma *MaidManager) CreateNewMaid(ownerid uint64, ownername string, houseid uint64) *Maid {
	uuid, err := def.GenerateMaidId(Redis())
	if err != "" {
		return nil
	}

	bin := &msg.HouseMaidData{}
	bin.Clothes = make([]*msg.ItemData, 0)
	bin.Id = pb.Uint64(uint64(uuid))
	bin.Level = pb.Int32(1)
	bin.Ownerid = pb.Uint64(ownerid)
	bin.Ownername = pb.String(ownername)
	bin.Houseid = pb.Uint64(houseid)
	bin.Tmworking = pb.Int64(util.CURTIME())	// 秒

	maid := &Maid{bin:bin, dirty:true}
	maid.Init()
	maid.SaveBin(nil)
	ma.AddMaid(maid)
	return maid
}

func (ma *MaidManager) Init() {
	ma.ticker1Minite = util.NewGameTicker(time.Minute, ma.Handler1MiniteTick)
	ma.ticker1Minite.Start()
	ma.maids = make(map[uint64]*Maid)
	ma.usermaids = make(map[uint64]map[uint64]*Maid)
	ma.housemaids = make(map[uint64]map[uint64]*Maid)
	ma.LoadDB()
}

// 加载所有db女仆
func (ma *MaidManager) LoadDB() {

	// all maid id
	ids, err := Redis().HKeys(RedisKeyMaidRawData).Result()
	if err != nil && err != redis.Nil {
		log.Error("[女仆] 获取女仆所有id列表失败")
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, id := range ids {
		pipe.HGet(RedisKeyMaidRawData, id)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[女仆] 加载所有数据失败 RedisError:%s ", err)
		return
	}

	for _, v := range cmds {
		if v.Err() == redis.Nil { continue }
		rbuf, _ := v.(*redis.StringCmd).Bytes()
		maid := &Maid{}
		if maid.LoadBin(rbuf) != nil {
			ma.AddMaid(maid)
		}
	}
	log.Info("[女仆] DB加载数据 size=%d", len(ma.maids))
}

func (ma *MaidManager) SaveAll() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range ma.maids {
		v.SaveBin(pipe)
	}
	_, err := pipe.Exec()
	if err != nil {
		log.Error("[女仆] SaveAll RedisError:%s", err)
		return
	}
	log.Info("[女仆] 保存所有数据")

}

func (ma *MaidManager) Tick(now int64) {
	ma.ticker1Minite.Run(now)
}

// 1分钟回调
func (ma *MaidManager) Handler1MiniteTick(now int64) {
	pipe := Redis().Pipeline()
	for _, v := range ma.maids {
		if v.Dirty() == true { v.SaveBin(pipe) }
	}
	_, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[女仆] 定时存盘 RedisError:%s", err)
	}
	pipe.Close()
}

// 
func (ma *MaidManager) AddMaid(maid *Maid) {
	if _, ok := ma.usermaids[maid.OwnerId()]; ok == false {
		ma.usermaids[maid.OwnerId()] = make(map[uint64]*Maid)
	}
	if _, ok := ma.housemaids[maid.HouseId()]; ok == false {
		ma.housemaids[maid.HouseId()] = make(map[uint64]*Maid)
	}
	ma.maids[maid.Id()] = maid
	ma.usermaids[maid.OwnerId()][maid.Id()] = maid
	ma.housemaids[maid.HouseId()][maid.Id()] = maid
}

// 获得房屋女仆
func (ma *MaidManager) GetMaidsById(uid uint64) *Maid {
	maids, _ := ma.maids[uid]
	return maids
}

// 获得玩家女仆
func (ma *MaidManager) GetUserMaids(uid uint64) map[uint64]*Maid {
	maids, _ := ma.usermaids[uid]
	return maids
}

// 获得房屋女仆
func (ma *MaidManager) GetHouseMaids(uid uint64) map[uint64]*Maid {
	maids, _ := ma.housemaids[uid]
	return maids
}

// 发送房子女仆
func (ma *MaidManager) SendHouseMaids(user *GateUser, houseid uint64) {
	if user == nil { return }
	send := &msg.GW2C_SendHouseMaidInfo{Houseid:pb.Uint64(houseid), Maids:make([]*msg.HouseMaidData,0)}
	maids := ma.GetHouseMaids(houseid)
	for _, v := range maids {
		send.Maids = append(send.Maids, pb.Clone(v.Bin()).(*msg.HouseMaidData))	// append(send.Maids, v.Bin())
	}
	user.SendMsg(send)
}

// 发送玩家女仆
func (ma *MaidManager) SendUserMaids(user *GateUser) {
	if user == nil { return }
	send := &msg.GW2C_SendUserMaidInfo{Userid:pb.Uint64(user.Id()), Maids:make([]*msg.HouseMaidData,0)}
	maids := ma.GetUserMaids(user.Id())
	for _, v := range maids {
		send.Maids = append(send.Maids, pb.Clone(v.Bin()).(*msg.HouseMaidData))	// append(send.Maids, v.Bin())
	}
	user.SendMsg(send)
}

// 升级女仆
func (ma *MaidManager) UpgradeMaid(user *GateUser, uid uint64) {
	if user == nil { return }
	maid := ma.GetMaidsById(uid)
	if maid == nil {
		user.SendNotify("不存在的女仆")
		return
	}

	levelbase, ok := tbl.LevelMaidBase.TLevelMaidById[uint32(maid.Level())]
	if ok == false {
		log.Error("[女仆] 找不到女仆升级配置")
		return
	}

	if levelbase.NextLevel == 0 {
		user.SendNotify("已达到最大等级")
		return
	}

	item := user.bag.FindById(levelbase.UpgradeID)
	if item == nil || item.Num() < levelbase.Upgradenum {
		user.SendNotify("碎片不足")
		return
	}

	user.RemoveItem(levelbase.UpgradeID, levelbase.Upgradenum, "升级女仆")
	maid.OnLevelUp()
	ma.SendUserMaids(user)
}

// 收取女仆收益
func (ma *MaidManager) TakeMaidEarning(user *GateUser, uid uint64) {
	if user == nil { return }
	maid := ma.GetMaidsById(uid)
	if maid == nil {
		user.SendNotify("不存在的女仆")
		return
	}

	house := HouseSvrMgr().GetHouse(maid.HouseId())
	if house == nil {
		user.SendNotify("不存在的房屋")
		return
	}

	if house.ownerid != user.Id() {
		user.SendNotify("这不是您的房屋")
		return
	}

	if maid.OwnerId() != user.Id() {
		user.SendNotify("这不是您的自己的女仆")
		return
	}

	now := util.CURTIME()
	elapse := now - maid.TimeStart()
	levelbase, ok := tbl.LevelMaidBase.TLevelMaidById[uint32(maid.Level())]
	if ok == false {
		log.Error("[女仆] 找不到女仆等级配置")
		return
	}

	if elapse < levelbase.ProduceTime {
		log.Error("[女仆] 生产时间未完成，不能领取")	// 客户端要预判断
		return
	}

	user.AddGold(levelbase.ProduceGold, "领取女仆收益", true)
	maid.SetTimeStart(now)
}

// 掠夺他人女仆
func (ma *MaidManager) RobMaid(user *GateUser, uid, dropto uint64) {
	if user == nil { return }
	maid := ma.GetMaidsById(uid)
	if maid == nil {
		user.SendNotify("不存在的女仆")
		return
	}

	house := HouseSvrMgr().GetHouse(maid.HouseId())
	if house == nil {
		user.SendNotify("不存在的房屋")
		return
	}

	if house.ownerid == user.Id() {
		user.SendNotify("这是您的房屋")
		return
	}

	if house.id != maid.HouseId() {
		user.SendNotify("女仆不在这个房屋")
		return
	}

	if maid.OwnerId() == user.Id() {
		user.SendNotify("这是您自己的女仆")
		return
	}

	if maid.RobberId() != 0 {
		user.SendNotify("掠夺来的女仆不能抢走")
		return
	}

	// 掠夺女仆到指定house
	if dropto != 0 {
		ma.RobMaidToHosue(user, maid, dropto)
		return
	}

	// 从附近人进入抢夺，弹出自己可以放置女仆的房产列表
	drophouses := ma.GetCanDropRobMaidHouse(user.Id())
	if len(drophouses) == 0 {
		user.SendNotify("没有多余可放置女仆的房产")
		return
	}

	send := &msg.GW2C_EnableMaidDropTo{Houses:make([]*msg.HouseData,0)}
	send.Houses = append(send.Houses, drophouses...)
	user.SendMsg(send)
}

func (ma *MaidManager) RobMaidToHosue(user *GateUser, maid *Maid, dropto uint64) bool {
	drophouse := HouseSvrMgr().GetHouse(dropto)
	if drophouse == nil {
		log.Error("[女仆] 掠夺dropid无效[%d]", dropto)
		return false
	}
	if drophouse.ownerid != user.Id() {
		log.Error("[女仆] 只能掠夺到自己的房产中")
		return false
	}
	if ma.IsHouseCanDropRobMaid(dropto) == false {
		user.SendNotify("这个房屋不能掠夺更多的女仆")
		return false
	}

	// 产生记录，女仆已经产生的钱留给房主
	;

	// 我有概率获得道具	
	ma.ItemProduce(user, maid, "掠夺女仆")

	//
	maid.SetRobber(user.Id(), user.Name())
	maid.SetTimeStart(util.CURTIME())
	ma.ChangeMaidHouse(maid, dropto)
	return true
}

//
func (ma *MaidManager) ChangeMaidHouse(maid *Maid, houseid uint64) {
	maid.SetHouseId(houseid)
	delete(ma.housemaids[maid.HouseId()], maid.Id())
	if ma.housemaids[houseid] == nil { ma.housemaids[houseid] = make(map[uint64]*Maid) }
	ma.housemaids[houseid][maid.Id()] = maid
	log.Info("[女仆] 女仆[%d]被放置到新房间[%d]", maid.Id(), houseid)
}

// 房子是否能否放置抢来的女仆(目前最多抢1个)
func (ma *MaidManager) IsHouseCanDropRobMaid(houseid uint64) bool {
	maids, count := ma.GetHouseMaids(houseid), 0
	for _, v := range maids {
		if v.RobberId() != 0 { count++ }
	}
	return count <= 0
}

// 可以放置抢夺女仆的所有房产
func (ma *MaidManager) GetCanDropRobMaidHouse(userid uint64) []*msg.HouseData {
	houses := HouseSvrMgr().GetHousesByUser(userid)
	housedatas := make([]*msg.HouseData, 0)
	for _, v := range houses {
		if ma.IsHouseCanDropRobMaid(v.id) { housedatas = append(housedatas, v.PackBin()) }
	}
	return housedatas
}

// 女仆动态
func (ma *MaidManager) CreateMaidRecord() string {
	return ""
}

// 道具产出
func (ma *MaidManager) ItemProduce(user *GateUser, maid *Maid, reason string) {
	// 解析概率配置
	ParseProString := func (sliceweight* []util.WeightOdds, Pro []string) (bool) {
		for _ , strpro := range Pro {
			slicepro := strings.Split(strpro, "-")
			if len(slicepro) != 2 {
				log.Error("[女仆] 解析道具产出概率配置异常 strpro=%s", strpro)
				return false
			}
			id    , _ := strconv.ParseInt(slicepro[0], 10, 32)
			weight, _ := strconv.ParseInt(slicepro[1], 10, 32)
			num,    _ := strconv.ParseInt(slicepro[2], 10, 32)
			*sliceweight = append(*sliceweight, util.WeightOdds{Weight:int32(weight), Uid:int64(id), Num:int64(num)})
		}
		return true
	}

	giftweight := make([]util.WeightOdds, 0)
	levelbase, ok := tbl.LevelMaidBase.TLevelMaidById[uint32(maid.Level())]
	if ok == false {
		log.Error("[女仆] 找不到女仆等级配置")
		return
	}

	if ParseProString(&giftweight, levelbase.ProduceItem) == false { 
		log.Error("[女仆] 解析道具产出配置失败")
		return
	}

	index := util.SelectByWeightOdds(giftweight)
	if index < 0 || index >= int32(len(giftweight)) {
		log.Error("[女仆] 权重获得产出道具失败")
		return
	}

	uid, num := giftweight[index].Uid, giftweight[index].Num
	_, find := tbl.ItemBase.ItemBaseDataById[uint32(uid)]
	if find == false {
		log.Error("[女仆] 无效的道具id[%d]", uid)
		return
	}

	user.AddItem(uint32(uid), uint32(num), reason, true)
}

