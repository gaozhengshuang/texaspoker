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
	u *GateUser
	id int64
	stat_present int32	// 是否已经赠送 0未赠送，1已经赠送 
	time_present int64	// 赠送时间戳
	stat_get int32		// 是否可以领取 0不可领，1可以领取，2已经领取
	charbase *msg.FriendBrief
	dirty bool
}

func (m *Friend) Id() int64 {
	return m.id
}

func (m *Friend) Name() string {
	return m.charbase.GetName()
}

func (m *Friend) PresentTime() int64 {
	return m.time_present
}

func (m *Friend) PresentStat() int32 {
	return m.stat_present
}

func (m *Friend) GetStat() int32 {
	//return m.stat_get
	stat, _ := Redis().HGet(fmt.Sprintf("userfriendbrief_%d_%d", m.u.Id(), m.Id()), "stat_get").Int()
	return int32(stat)
}


func (m *Friend) Bin() *msg.FriendData {
	return &msg.FriendData{Base:m.charbase, Givegold:pb.Int32(m.PresentStat()), Getgold:pb.Int32(m.GetStat())}
}

func (m *Friend) Dirty() bool {
	return m.dirty
}

func (m *Friend) Present() {
	now := util.CURTIME()
	if util.IsSameDay(now, m.time_present) {
		m.u.SendNotify("今天已经赠送过了")
		return
	}
	m.stat_present, m.time_present, m.dirty = 1, now, true
	Redis().HSet(fmt.Sprintf("userfriendbrief_%d_%d", m.Id(), m.u.Id()), "stat_get", 1)	// 修改对方领取标记
}

func (m *Friend) ReceivePresent() {
	//m.stat_get, m.dirty = 2, true
	Redis().HSet(fmt.Sprintf("userfriendbrief_%d_%d", m.u.Id(), m.Id()), "stat_get", 2)
	m.u.AddGold(100, "好友赠送", true)
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
	pipe.HGetAll(fmt.Sprintf("userfriendbrief_%d_%d", userid, friend))
	pipe.HGetAll(fmt.Sprintf("charbase_%d", friend))
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

	friend := &Friend{u:m.owner, charbase:nil, dirty:false}
	for _, cmd := range cmds {
		sscmd, ok := cmd.(*redis.StringStringMapCmd)
		if ok == false { continue }
		if len(sscmd.Val()) == 4 {
			friend = m.FillFriendBrief(sscmd.Val())
		} else {
			charbase := m.FillCharBase(sscmd.Val())
			if friend.Id() != charbase.GetRoleid() {
				continue
			}
			friend.charbase = charbase
			m.friends[friend.Id()] = friend
			friend = nil
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
	delete(m.friends, id)
	Redis().Del(fmt.Sprintf("userfriendbrief_%d_%d", m.owner.Id(), id))
	Redis().SRem(fmt.Sprintf("userfriendlist_%d", m.owner.Id()), id)
	log.Info("[好友] 玩家[%s %d] 删除好友[%d]", m.owner.Name(), m.owner.Id(), id)

	// 通知对方同步删除
}

func (m *Friends) AddFriend(f *Friend) {
	m.friends[f.Id()] = f
	Redis().SAdd(fmt.Sprintf("userfriendlist_%d", m.owner.Id()), f.Id())
	log.Info("[好友] 玩家[%s %d] 添加好友[%s %d]成功", m.owner.Name(), m.owner.Id(), f.Id(), f.Name())
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
	friend.Present()

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

// 领取好友赠送礼物
func (m *Friends) GetFriendsPresent(uid int64) {
	send := &msg.GW2C_RetGetFriendsPresent{Roleid:make([]int64,0)}
	if uid != 0 {	// 领取个人
		friend, ok := m.friends[uid]
		if ok == false {
			log.Info("[好友] 玩家[%s %d] 查看好友详细信息[%d]，好友不存在", m.owner.Name(), m.owner.Id(), uid)
			return
		}
		if friend.GetStat() != 1 {
			m.owner.SendNotify("不可领取")
			return
		}
		send.Roleid = append(send.Roleid, uid)
		friend.ReceivePresent()
	} else {		// 领取全部
		for _, f := range m.friends {
			if f.GetStat() != 1 {
				continue
			}
			send.Roleid = append(send.Roleid, uid)
			f.ReceivePresent()
		}
	}
	m.owner.SendMsg(send)
}

// 好友添加请求列表
func (m *Friends) SendFriendsRequestList() {
	send := &msg.GW2C_RetFriendsRequestList{Array:make([]*msg.FriendBrief, 0)}
	userbriefs := m.GetRequestUserBrief()
	for _, v := range userbriefs {
		send.Array = append(send.Array, v)
	}
	m.owner.SendMsg(send)
}

// 处理好友添加请求
func (m *Friends) DealFriendsRequest(uid int64, isaccept bool) {
	friend, ok := m.friends[uid]
	if ok == true {
		m.owner.SendNotify("对方已经是你好友了")
		return
	}

	//
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("charbase_%d", uid)).Result()
	if err != nil {
		return
	}
	friend = &Friend{id:uid, u:m.owner, charbase:m.FillCharBase(cmdmap), dirty:true}
	m.AddFriend(friend)
}

// 请求添加好友
func (m *Friends) RequestAddFriends(uid int64) {
	if _, ok := m.friends[uid]; ok == true {
		m.owner.SendNotify("对方已经是你好友了")
		return
	}

	send := &msg.GW2C_RetFriendsAdd{}
	m.owner.SendMsg(send)
	//u := m.owner

	// push
	target := UserMgr().FindById(uid)
	if target != nil {
		pushmsg := &msg.GW2C_PushAddYouFriends{Friend:m.owner.FillFriendBrief()}
		target.SendMsg(pushmsg)
		Redis().SAdd(fmt.Sprintf("friendsrequest_%d", uid), m.owner.Id())
		return
	}

}

// 获取好友请求列表玩家Brief信息
func (m *Friends) GetRequestUserBrief() []*msg.FriendBrief {
	userbriefs := make([]*msg.FriendBrief, 0)
	requests := Redis().SMembers(fmt.Sprintf("friendsrequest_%d", m.owner.Id())).Val()
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, strid := range requests {
		pipe.HGetAll(fmt.Sprintf("charbase_%s", strid))
	}
	cmds, err := pipe.Exec()
	if err != nil {
		log.Error("[好友] 玩家[%s %d] 拉取玩家charbase信息失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return userbriefs
	}

	for _, cmd := range cmds {
		sscmd := cmd.(*redis.StringStringMapCmd)
		charbase := m.FillCharBase(sscmd.Val())
		userbriefs = append(userbriefs, charbase)
		//friend := &Friend{id:charbase.GetRoleid(), u:m.owner, charbase:charbase, dirty:true}
		//m.AddFriend(friend)
	}
	return userbriefs
}

func (m *Friends) FillCharBase(charset map[string]string) *msg.FriendBrief {
	charbase := &msg.FriendBrief{}
	for k, v := range charset {
		vt := util.NewVarType(v)
		if k == "roleid"		{ charbase.Roleid = pb.Int64(vt.Int64()) }
		if k == "name"			{ charbase.Name = pb.String(vt.String()) }
		if k == "face"			{ charbase.Head = pb.String(vt.String()) }
		if k == "level"			{ charbase.Level = pb.Int32(vt.Int32()) }
		if k == "sex"			{ charbase.Sex = pb.Int32(vt.Int32()) }
		if k == "gold"			{ charbase.Gold = pb.Int32(vt.Int32()) }
		if k == "viplevel"		{ charbase.Viplevel = pb.Int32(vt.Int32()) }
		if k == "offlinetime" 	{ charbase.Offlinetime = pb.Int32(vt.Int32()) }
	}
	return charbase
}

func (m *Friends) FillFriendBrief(briefs map[string]string) *Friend {
	friend := &Friend{u:m.owner, charbase:nil, dirty:false}
	for k, v := range briefs {
		if k == "id" { friend.id = util.NewVarType(v).Int64() }
		if k == "time_present" { friend.time_present = util.NewVarType(v).Int64() }
		if k == "stat_present" { friend.stat_present = util.NewVarType(v).Int32() }
		if k == "stat_get" { friend.stat_get = util.NewVarType(v).Int32() }
	}
	return friend
}

// 搜索玩家
func (u *GateUser) SearchUser(val string) {
	id, send := util.Atol(val), &msg.GW2C_RetFriendsSearch{}

	// id 查找
	user := UserMgr().FindById(id)
	if user != nil {
		send.Brief = user.FillFriendBrief()
		u.SendMsg(send)
		return
	}
	
	// 名字查找
	user = UserMgr().FindByName(val)
	if user != nil {
		send.Brief = user.FillFriendBrief()
		u.SendMsg(send)
		return
	}

	u.SendMsg(send)
}

func (u *GateUser) FillFriendBrief() *msg.FriendBrief {
	charbase := &msg.FriendBrief{}
	charbase.Roleid = pb.Int64(u.Id())
	charbase.Name 	= pb.String(u.Name())
	charbase.Head	= pb.String(u.Head())
	charbase.Level 	= pb.Int32(u.Level())
	charbase.Sex 	= pb.Int32(u.Sex())
	charbase.Gold 	= pb.Int32(u.GetGold())
	charbase.Viplevel = pb.Int32(0)
	charbase.Offlinetime = pb.Int32(0)
	return charbase
}

