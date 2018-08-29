/// @file maid.go
/// @brief 女仆相关
/// @author jackytse, xiejian1998@foxmail.com
/// @version 1.0
/// @date 2018-08-28
package main
import (
	"time"
	"strconv"
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
// --------------------------------------------------------------------------
type Maid struct {
	bin 	*msg.HouseMaidData
	//clothes map[int32]*msg.ItemData
	clothes map[int32]map[int32]*msg.ItemData	// 客户端强烈要去保留男女2套服装
	dirty 	bool
}

func (m *Maid) Init() {
	m.clothes = make(map[int32]map[int32]*msg.ItemData)
	m.clothes[int32(msg.Sex_Female)] = make(map[int32]*msg.ItemData)
	m.clothes[int32(msg.Sex_Male)] = make(map[int32]*msg.ItemData)
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

	for _, image := range data.Images {
		for _, item := range image.Clothes {
			m.clothes[image.GetSex()][item.GetPos()] = item
		}
	}
	m.bin = data
	return data
}

func (m *Maid) PackBin() *msg.HouseMaidData {
	images := make([]*msg.ImageData, 2)
	images[0] = &msg.ImageData{Sex:pb.Int32(int32(msg.Sex_Female))}
	images[0].Clothes = make([]*msg.ItemData, 0)
	images[1] = &msg.ImageData{Sex:pb.Int32(int32(msg.Sex_Male))}
	images[1].Clothes = make([]*msg.ItemData, 0)

	for sex, image := range m.clothes {
		for _, item := range image {
			if sex == int32(msg.Sex_Female) {
				images[0].Clothes = append(images[0].Clothes, item)
			}else if sex == int32(msg.Sex_Male) {
				images[1].Clothes = append(images[1].Clothes, item)
			}
		}
	}
	m.bin.Images = make([]*msg.ImageData, 0)
	m.bin.Images = append(m.bin.Images, images[0])
	m.bin.Images = append(m.bin.Images, images[1])
	return m.bin
}

func (m *Maid) Clean() {
	m.clothes = make(map[int32]map[int32]*msg.ItemData)
	m.clothes[int32(msg.Sex_Female)] = make(map[int32]*msg.ItemData)
	m.clothes[int32(msg.Sex_Male)] = make(map[int32]*msg.ItemData)
}

func (m *Maid) GetClothesByPos(owner *GateUser, pos int32) *msg.ItemData {
	image, find := m.clothes[owner.Sex()]
	if find == false {
		return nil
	}

	if item, find := image[pos]; find == true {
		return item
	}
	return nil
}

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
	m.clothes[owner.Sex()][pos] = copyItem
	MaidMgr().SendUserMaids(owner)
}

// 脱下服装
func (m *Maid) UnDressClothes(owner *GateUser, pos int32, syn bool) {
	if clothes := m.GetClothesByPos(owner, pos); clothes == nil {
		return
	}

	delete(m.clothes[owner.Sex()], pos)
	if syn {
		MaidMgr().SendUserMaids(owner)
	}
}

// 脱下全部
func (m *Maid) UnDressAll(owner *GateUser, syn bool) {
	m.clothes[owner.Sex()] = make(map[int32]*msg.ItemData)
	if syn {
		MaidMgr().SendUserMaids(owner)
	}
}

//
func (m *Maid) IsHaveDressSuit(owner *GateUser) bool {
	clothes := m.clothes[owner.Sex()]
	for _, v := range clothes {
		if v.GetPos() == int32(msg.ItemPos_Suit) {
			return true 
		}
	}
	return false
}

func (m *Maid) GetEquipSkills(owner *GateUser) []int32 {
	clothes, find := m.clothes[owner.Sex()]
	if find == false {
		return nil
	}

	skills := make([]int32, 10)
	for _, item := range clothes {
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
	bin.Images = make([]*msg.ImageData, 0)
	bin.Id = pb.Uint64(uint64(uuid))
	bin.Level = pb.Int32(1)
	bin.Ownerid = pb.Uint64(ownerid)
	bin.Ownername = pb.String(ownername)
	bin.Houseid = pb.Uint64(houseid)

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
