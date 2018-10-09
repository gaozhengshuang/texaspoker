package main
import (
	"fmt"
	_"strings"
	_"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	_"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/minehero/pbmsg"
	_"gitee.com/jntse/minehero/server/tbl"
	_"gitee.com/jntse/minehero/server/def"
	pb "github.com/gogo/protobuf/proto"
	"github.com/go-redis/redis"
)

// --------------------------------------------------------------------------
/// @brief 好友
// --------------------------------------------------------------------------
type Friend struct {
	id int64
	stat_present int32	// 是否已经赠送 0未赠送，1已经赠送 
	time_present int64	// 赠送时间戳
	stat_get int32		// 是否可以领取 0不可领，1可以领取，2已经领取
	base *msg.FriendBrief
	basebuf string 
	dirty bool
}

func (m *Friend) Id() int64 {
	return m.id
}

func (m *Friend) PresentTime() int64 {
	return m.time_present
}

func (m *Friend) PresentStat() int32 {
	return m.stat_present
}

func (m *Friend) GetStat() int32 {
	return m.stat_get
}

func (m *Friend) Bin() *msg.FriendData {
	return &msg.FriendData{Base:m.base, Givegold:pb.Int32(m.PresentStat()), Getgold:pb.Int32(m.GetStat())}
}

func (m *Friend) Dirty() bool {
	return m.dirty
}

func (m *Friend) Present(u *GateUser) {
	now := util.CURTIME()
	if util.IsSameDay(now, m.time_present) {
		u.SendNotify("今天已经赠送过了")
		return
	}

	Redis().HSet(fmt.Sprintf("userfriendbrief_%d_%d", m.Id(), u.Id()), "stat_get", 1)
	m.stat_present = 1
	m.time_present = now
	m.dirty = true
}

func (m *Friend) GetPresent(u *GateUser) {
	m.stat_get = 2
	u.AddGold(100, "好友赠送", true)
	m.dirty = true
}


func (m *Friend) SaveBin(userid, friend int64, pipe redis.Pipeliner) {
	id := util.Ltoa(m.Id())
	m.dirty = false
	mfields := map[string]interface{}{"id":m.Id(), "time_present":m.PresentTime(), "stat_present":m.PresentStat(), "stat_get":m.GetStat()}
	if pipe != nil {
		pipe.HMSet(fmt.Sprintf("userfriendbrief_%d_%d", userid, friend), mfields)
		return
	}

	Redis().HMSet(fmt.Sprintf("userfriendbrief_%d_%d", userid, friend), mfields)
	log.Info("[好友] 保存好友成功 id[%s]", id)
}

func (m *Friend) LoadBin(userid, friend int64, pipe redis.Pipeliner) {
	//pipe.HMGet(fmt.Sprintf("userfriendbrief_%d_%d", userid, friend), "id", "stat_present", "stat_get")
	pipe.HGetAll(fmt.Sprintf("userfriendbrief_%d_%d", userid, friend))
	pipe.Get(fmt.Sprintf("frienduser_%d", friend))
}


// --------------------------------------------------------------------------
/// @brief 邮箱
// --------------------------------------------------------------------------
type Friends struct {
	owner *GateUser
	friends map[int64]*Friend
}

func (m *Friends) Init(owner *GateUser) {
	m.owner = owner
	m.friends = make(map[int64]*Friend)
}

func (m *Friends) Size() int32 {
	return int32(len(m.friends))
}

func (m *Friends) Online() {
}

// 加载
func (m *Friends) DBLoad() {
	idlist, err := Redis().SMembers(fmt.Sprintf("userfriendlist_%d", m.owner.Id())).Result()
	if err != nil {
		log.Error("[好友] 玩家[%s %d] 加载DB好友列表失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range idlist {
		id, friend := util.Atol(v), &Friend{}
		friend.LoadBin(m.owner.Id(), id, pipe)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[好友] 玩家[%s %d] 加载DB好友失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	friendinfo := &Friend{base:nil, dirty:false}
	for _, cmd := range cmds {
		if sscmd, ok := cmd.(*redis.StringStringMapCmd); ok == true && len(sscmd.Val()) != 0 {
			friendinfo = &Friend{base:nil, dirty:false}
			for k, v := range sscmd.Val() {
				if k == "id" { friendinfo.id = util.NewVarType(v).Int64() }
				if k == "time_present" { friendinfo.time_present = util.NewVarType(v).Int64() }
				if k == "stat_present" { friendinfo.stat_present = util.NewVarType(v).Int32() }
				if k == "stat_get" { friendinfo.stat_get = util.NewVarType(v).Int32() }
			}
			continue
		}

		if scmd, ok := cmd.(*redis.StringCmd); ok == true {
			friendinfo.basebuf = scmd.Val()
			if friendinfo.Id() != 0 { m.friends[friendinfo.id] = friendinfo }
		}
	}

	if m.Size() != 0 {
		log.Info("[好友] 玩家[%s %d] 加载DB好友成功，数量[%d]", m.owner.Name(), m.owner.Id(), m.Size() )
	}
}

// 存盘
func (m *Friends) DBSave() {
	return	// TODO: 测试代码
	pipe := Redis().Pipeline()
	for _, v := range m.friends {
		if v.Dirty() == true { v.SaveBin(m.owner.Id(), v.Id(), pipe) }
	}

	if cmds, err := pipe.Exec(); err != nil {
		log.Error("[好友] 玩家[%s %d] 保存好友失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
	}else if len(cmds) != 0 {
		log.Info("[好友] 玩家[%s %d] 保存好友成功，数量[%d]", m.owner.Name(), m.owner.Id(), len(cmds))
	}
	pipe.Close()
}

// 1分钟tick
func (m *Friends) Tick(now int64) {
	m.DBSave()
}


func (m *Friends) RemoveFriend(id int64) {
	if id == 0 { return }
	Redis().HDel(fmt.Sprintf("userfriendbrief_%d", m.owner.Id()), util.Ltoa(id))
	delete(m.friends, id)
	log.Info("[好友] 玩家[%s %d] 删除好友[%d]", m.owner.Name(), m.owner.Id(), id)
}

// 好友列表
func (m *Friends) SendFriendList() {
	send := &msg.GW2C_RetFriendsList{Friendlist:make([]*msg.FriendData,0)}
	for _, v := range m.friends {
		send.Friendlist = append(send.Friendlist, v.Bin())
	}
	m.owner.SendMsg(send)
}

// 赠送金币
func (m *Friends) PresentToFriends(uid int64) {
	friend, ok := m.friends[uid]
	if ok == false {
		log.Info("[好友] 玩家[%s %d] 赠送好友[%d]，好友不存在", m.owner.Name(), m.owner.Id(), uid)
		return
	}
	friend.Present(m.owner)

	send := &msg.GW2C_RetPresentToFriends{}
	m.owner.SendMsg(send)
}

// 查看好友详细信息
func (m *Friends) SendFriendDetail(uid int64) {
	//friend, ok := m.friends[uid]
	//if ok == false {
	//	log.Info("[好友] 玩家[%s %d] 查看好友详细信息[%d]，好友不存在", m.owner.Name(), m.owner.Id(), uid)
	//	return
	//}
	//send := &msg.GW2C_RetFriendsDetail{}
	//m.owner.SendMsg(send)
}

// 查看好友详细信息
func (m *Friends) GetFriendsPresent(uid int64) {
	send := &msg.GW2C_RetGetFriendsPresent{Roleid:make([]int64,0)}
	if uid != 0 {	// 领取个人
		friend, ok := m.friends[uid]
		if ok == false {
			log.Info("[好友] 玩家[%s %d] 查看好友详细信息[%d]，好友不存在", m.owner.Name(), m.owner.Id(), uid)
			return
		}
		if friend.stat_get != 1 {
			m.owner.SendNotify("不可领取")
			return
		}
		send.Roleid = append(send.Roleid, uid)
		friend.GetPresent(m.owner)
	} else {		// 领取全部
		for _, f := range m.friends {
			if f.stat_get != 1 {
				continue
			}
			send.Roleid = append(send.Roleid, uid)
			f.GetPresent(m.owner)
		}
	}
	m.owner.SendMsg(send)
}

