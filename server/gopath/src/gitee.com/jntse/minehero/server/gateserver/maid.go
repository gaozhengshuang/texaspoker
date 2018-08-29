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
)

const (
	RedisKeyMaidRawData = "maidrawdata"
)

// --------------------------------------------------------------------------
/// @brief 女仆
// --------------------------------------------------------------------------
type Maid struct {
	bin *msg.HouseMaidData
	dirty bool
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
			log.Error("[汽车商店] 保存产品数据 Redis Error:%s", err)
		}
	}else {
		utredis.HSetProtoBinPipeline(pipe, RedisKeyMaidRawData, id, m.bin)
	}
}

func (m *Maid) LoadBin(rbuf []byte) *msg.HouseMaidData {
	data := &msg.HouseMaidData{}
	if err := pb.Unmarshal(rbuf, data); err != nil {
		return nil
	}
	m.bin = data
	return data
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
	ma.AddMaid(maid)
	return maid
}

func (ma *MaidManager) Init() {
	ma.ticker1Minite = util.NewGameTicker(time.Second, ma.Handler1MiniteTick)
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
		ma.housemaids[maid.HouseId()][maid.Id()] = maid
	}
	ma.maids[maid.Id()] = maid
	ma.usermaids[maid.OwnerId()][maid.Id()] = maid
	ma.housemaids[maid.OwnerId()][maid.Id()] = maid
}

// 获得玩家女仆
func (ma *MaidManager) GetUserMaids(uid uint64) map[uint64]*Maid {
	maids, _ := ma.usermaids[uid]
	return maids
}

// 发送房子女仆
func (ma *MaidManager) SendHouseMaids(houseid uint64) {
}

// 发送玩家女仆
func (ma *MaidManager) SendUserMaids(user *GateUser) {
	if user == nil {
		return
	}
	send := &msg.GW2C_SendUserMaidInfo{Userid:pb.Uint64(user.Id()),Maids:make([]*msg.HouseMaidData,0)}
	maids, ok := ma.usermaids[user.Id()]
	if ok == true {
		for _, v := range maids {
			//send.Maids = append(send.Maids, v.Bin())
			send.Maids = append(send.Maids, pb.Clone(v.Bin()).(*msg.HouseMaidData))
		}
	}
	user.SendMsg(send)
}
