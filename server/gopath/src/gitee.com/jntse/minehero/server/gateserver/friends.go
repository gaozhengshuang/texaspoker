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
	stat, _ := Redis().HGet(fmt.Sprintf("friendbase_%d_%d", m.u.Id(), m.Id()), "stat_get").Int()
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
	Redis().HSet(fmt.Sprintf("friendbase_%d_%d", m.Id(), m.u.Id()), "stat_get", 1)	// 修改对方领取标记
}

func (m *Friend) ReceivePresent() {
	//m.stat_get, m.dirty = 2, true
	Redis().HSet(fmt.Sprintf("friendbase_%d_%d", m.u.Id(), m.Id()), "stat_get", 2)
	m.u.AddGold(100, "好友赠送", true)
}


func (m *Friend) SaveBin(pipe redis.Pipeliner) {
	m.dirty = false
	mfields := map[string]interface{}{"id":m.Id(), "time_present":m.PresentTime(), "stat_present":m.PresentStat(), "stat_get":m.GetStat()}
	if pipe != nil {
		pipe.HMSet(fmt.Sprintf("friendbase_%d_%d", m.u.Id(), m.Id()), mfields)
		return
	}
	Redis().HMSet(fmt.Sprintf("friendbase_%d_%d", m.u.Id(), m.Id()), mfields)
	log.Info("[好友] 保存好友成功 id[%d]", m.Id())
}

func (m *Friend) LoadBin(friend int64, pipe redis.Pipeliner) {
	pipe.HGetAll(fmt.Sprintf("friendbase_%d_%d", m.u.Id(), friend))
	pipe.HGetAll(fmt.Sprintf("charbase_%d", friend))
}

func (m *Friend) AddBin() {
	mfields := map[string]interface{}{"id":m.Id(), "time_present":m.PresentTime(), "stat_present":m.PresentStat(), "stat_get":m.GetStat()}
	Redis().HMSet(fmt.Sprintf("friendbase_%d_%d", m.u.Id(), m.Id()), mfields)
	Redis().SAdd(fmt.Sprintf("friendlist_%d", m.u.Id()), m.Id())
}

func (m *Friend) RemoveBin() {
	Redis().Del(fmt.Sprintf("friendbase_%d_%d", m.u.Id(), m.Id()))
	Redis().SRem(fmt.Sprintf("friendlist_%d", m.u.Id()), m.Id())
}

func (m *Friend) LoadDetail(cmd1, cmd2 redis.Cmder) bool {
	cmdbase , ok := cmd1.(*redis.StringStringMapCmd)
	if ok == false {
		log.Error("[好友] 玩家[%s %d] 加载DB详情失败 [%d]", m.u.Name(), m.u.Id())
		return false
	}
	cmdcharbase , ok := cmd2.(*redis.StringStringMapCmd)
	if ok == false {
		log.Error("[好友] 玩家[%s %d] 加载DB详情失败 [%d]", m.u.Name(), m.u.Id())
		return false
	}

	for k, v := range cmdbase.Val() {
		if k == "id" { m.id = util.NewVarType(v).Int64() }
		if k == "time_present" { m.time_present = util.NewVarType(v).Int64() }
		if k == "stat_present" { m.stat_present = util.NewVarType(v).Int32() }
		if k == "stat_get" { m.stat_get = util.NewVarType(v).Int32() }
	}

	charbase := FillFriendBrief(cmdcharbase.Val())
	if m.Id() != charbase.GetRoleid() {
		return false
	}
	m.charbase = charbase
	return true
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
	m.PassedFriendRequestCheck()
	m.RemovedFriendCheck()
}

// 加载
func (m *Friends) DBLoad() {
	idlist, err := Redis().SMembers(fmt.Sprintf("friendlist_%d", m.owner.Id())).Result()
	if err != nil {
		log.Error("[好友] 玩家[%s %d] 加载DB好友列表失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range idlist {
		id, friend := util.Atol(v), &Friend{u:m.owner}
		friend.LoadBin(id, pipe)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[好友] 玩家[%s %d] 加载DB好友失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	for i:=0; i+1<len(cmds); i+=2 {
		friend := &Friend{u:m.owner, charbase:nil, dirty:false}
		if friend.LoadDetail(cmds[i], cmds[i+1]) {
			m.friends[friend.Id()] = friend
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
		if v.Dirty() == true { v.SaveBin(pipe) }
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

// 好友列表
func (m *Friends) SendFriendList() {
	send := &msg.GW2C_RetFriendsList{Friendlist:make([]*msg.FriendData,0)}
	for _, v := range m.friends {
		send.Friendlist = append(send.Friendlist, v.Bin())
	}
	m.owner.SendMsg(send)
}

func (m *Friends) RemoveFriend(id int64, reason string) {
	f, ok := m.friends[id]
	if ok == false {
		return
	}
	f.RemoveBin()
	delete(m.friends, id)
	log.Info("[好友] 玩家[%s %d] 删除好友[%s %d] 原因[%s]", m.owner.Name(), m.owner.Id(), f.Name(), id, reason)
}

func (m *Friends) AddFriend(brief *msg.FriendBrief) *Friend {
	uid := brief.GetRoleid()
	if _, find := m.friends[uid]; find == true {
		log.Info("[好友] 玩家[%s %d] 重复添加好友[%d]", m.owner.Name(), m.owner.Id(), uid)
		return nil
	}

	f := &Friend{id:uid, u:m.owner, charbase:brief, dirty:true}
	m.friends[f.Id()] = f
	f.AddBin()
	log.Info("[好友] 玩家[%s %d] 添加好友[%s %d]成功", m.owner.Name(), m.owner.Id(), f.Id(), f.Name())
	return f
}

// 删除好友
func (m *Friends) RequestRemoveFriend(uid int64) {
	if _, ok := m.friends[uid]; ok == false {
		m.owner.SendNotify("对方不是你好友")
		return
	}

	m.RemoveFriend(uid, "主动删除")
	send := &msg.GW2C_RetRemoveFriend{Roleid:pb.Int64(uid)}
	m.owner.SendMsg(send)

	// 
	Redis().SAdd(fmt.Sprintf("firendremoveyou_%d", uid), m.owner.Id())


	// 通知对方删除
	pushmsg := &msg.GW2C_PushRemoveFriend{ Handler:pb.Int64(uid), Roleid:pb.Int64(m.owner.Id()) }
	if target := UserMgr().FindById(uid); target != nil {
		target.friends.OnFriendRemove(pushmsg)
	}else {
		GateSvr().SendGateMsg(0, pushmsg)	// 跨服务器
	}

}

// 请求添加好友
func (m *Friends) RequestAddFriend(uid int64) {
	if _, ok := m.friends[uid]; ok == true {
		m.owner.SendNotify("对方已经是你好友了")
		return
	}
	send := &msg.GW2C_RetAddFriend{}
	m.owner.SendMsg(send)

	// 请求列表
	Redis().SAdd(fmt.Sprintf("addfriend_request_%d", uid), m.owner.Id())

	// 通知对方
	pushmsg := &msg.GW2C_PushAddYouFriend{ Handler:pb.Int64(uid) }
	pushmsg.Friend = m.owner.FillUserBrief()
	if target := UserMgr().FindById(uid); target != nil {
		target.friends.OnFriendRequestRecv(pushmsg)
	}else {
		GateSvr().SendGateMsg(0, pushmsg)	// 跨服务器
	}
}

// 处理好友添加请求
func (m *Friends) ProcessFriendRequest(uid int64, accept bool) {
	if _, ok := m.friends[uid]; ok == true {
		m.owner.SendNotify("对方已经是你好友了")
		return
	}

	// 检查请求列表
	bfind := Redis().SIsMember(fmt.Sprintf("addfriend_request_%d", m.owner.Id()), uid).Val()
	if bfind == false {
		m.owner.SendNotify("对方不在您的申请列表")
		return
	}

	// 从列表删除
	Redis().SRem(fmt.Sprintf("addfriend_request_%d", m.owner.Id()), uid)
	response := &msg.GW2C_RetProcessFriendRequest{}
	m.owner.SendMsg(response)
	if accept == false {
		log.Info("[好友] 玩家[%s %d] 拒绝了[%d]的好友添加请求", m.owner.Name(), m.owner.Id(), uid)
		return
	}

	// 获取好友详情
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("charbase_%d", uid)).Result()
	if err != nil {
		log.Error("[好友] 玩家[%s %d] 获取玩家Charbase失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}
	m.AddFriend(FillFriendBrief(cmdmap))


	// 通知对方请求通过
	Redis().SAdd(fmt.Sprintf("addfriend_passed_%d", uid), m.owner.Id())
	pushmsg := &msg.GW2C_PushFriendAddSuccess{Handler:pb.Int64(m.owner.Id()), Friend:m.owner.FillUserBrief()}
	if target := UserMgr().FindById(uid); target != nil {
		target.friends.OnFriendRequestPass(pushmsg)
	}else {
		GateSvr().SendGateMsg(0, pushmsg)	// 跨服务器
	}
}


// 收到好友添加消息
func (m *Friends) OnFriendRemove(push *msg.GW2C_PushRemoveFriend) {
	uid := push.GetRoleid()
	Redis().SRem(fmt.Sprintf("firendremoveyou_%d", m.owner.Id()), uid)
	m.RemoveFriend(uid, "被对方删除")
	m.owner.SendMsg(push)
}

// 收到好友添加消息
func (m *Friends) OnFriendRequestRecv(reqmsg *msg.GW2C_PushAddYouFriend) {
	m.owner.SendMsg(reqmsg)
}

// 收到申请通过消息
func (m *Friends) OnFriendRequestPass(push *msg.GW2C_PushFriendAddSuccess) {
	m.AddFriend(push.Friend)
	m.owner.SendMsg(push)
	Redis().SRem(fmt.Sprintf("addfriend_passed_%d", m.owner.Id()), push.Friend.GetRoleid())
}

// 收到申请礼物消息
func (m *Friends) OnFriendPresent(push *msg.GW2C_PushFriendPresent) {
	m.owner.SendMsg(push)
}


// 赠送金币
func (m *Friends) PresentToFriend(uid int64) {
	friend, ok := m.friends[uid]
	if ok == false {
		log.Info("[好友] 玩家[%s %d] 赠送好友[%d]，好友不存在", m.owner.Name(), m.owner.Id(), uid)
		return
	}
	friend.Present()

	send := &msg.GW2C_RetPresentToFriend{}
	m.owner.SendMsg(send)

	pushmsg := &msg.GW2C_PushFriendPresent{Handler:pb.Int64(uid), Roleid:pb.Int64(m.owner.Id()) }
	if target := UserMgr().FindById(uid); target != nil {
		target.friends.OnFriendPresent(pushmsg)
	}else {
		GateSvr().SendGateMsg(0, pushmsg)	// 跨服务器
	}
}

// 领取好友赠送礼物
func (m *Friends) GetFriendPresent(uid int64) {
	send := &msg.GW2C_RetGetFriendPresent{Roleid:make([]int64,0)}
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
func (m *Friends) SendFriendRequestList() {
	send := &msg.GW2C_RetFriendRequestList{Array:make([]*msg.FriendBrief, 0)}
	userbriefs := m.GetRequestUserBrief()
	for _, v := range userbriefs {
		send.Array = append(send.Array, v)
	}
	m.owner.SendMsg(send)
}

// 好友拉黑检查
func (m *Friends) RemovedFriendCheck() {
	list, err := Redis().SMembers(fmt.Sprintf("firendremoveyou_%d", m.owner.Id())).Result()
	if err != nil {
		log.Error("[好友] 玩家[%s %d] 拉取同意列表失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	for _, v := range list {
		uid := util.Atol(v)
		Redis().SRem(fmt.Sprintf("firendremoveyou_%d", m.owner.Id()), uid)
		m.RemoveFriend(uid, "被对方删除")
	}
}

// 通过的请求检查
func (m *Friends) PassedFriendRequestCheck() {
	list, err := Redis().SMembers(fmt.Sprintf("addfriend_passed_%d", m.owner.Id())).Result()
	if err != nil {
		log.Error("[好友] 玩家[%s %d] 拉取同意列表失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, strid := range list {
		pipe.HGetAll(fmt.Sprintf("charbase_%s", strid))
	}
	cmds, err := pipe.Exec()
	if err != nil {
		log.Error("[好友] 玩家[%s %d] 拉取玩家charbase信息失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	rmlist := make([]interface{}, 0)
	for _, cmd := range cmds {
		sscmd := cmd.(*redis.StringStringMapCmd)
		if f := m.AddFriend(FillFriendBrief(sscmd.Val())); f != nil {
			rmlist = append(rmlist, f.Id())
		}
	}

	// 清理列表
	Redis().SRem(fmt.Sprintf("addfriend_passed_%d", m.owner.Id()), rmlist...)
}

// 获取好友请求列表玩家Brief信息
func (m *Friends) GetRequestUserBrief() []*msg.FriendBrief {
	userbriefs := make([]*msg.FriendBrief, 0)
	requests := Redis().SMembers(fmt.Sprintf("addfriend_request_%d", m.owner.Id())).Val()
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
		charbase := FillFriendBrief(sscmd.Val())
		userbriefs = append(userbriefs, charbase)
	}
	return userbriefs
}

// 查看好友详细信息
func (m *Friends) SendFriendDetail(uid int64) {
	//friend, ok := m.friends[uid]
	//if ok == false {
	//	log.Info("[好友] 玩家[%s %d] 查看好友详细信息[%d]，好友不存在", m.owner.Name(), m.owner.Id(), uid)
	//	return
	//}
	//send := &msg.GW2C_RetFriendDetail{}
	//m.owner.SendMsg(send)
}


func FillFriendBrief(charset map[string]string) *msg.FriendBrief {
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

func (u *GateUser) FillUserBrief() *msg.FriendBrief {
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

// 搜索玩家
func (u *GateUser) SearchUser(val string) {
	id, send := util.Atol(val), &msg.GW2C_RetFriendSearch{ Brief:make([]*msg.FriendBrief,0) }

	// id 查找
	user := UserMgr().FindById(id)
	if user != nil {
		send.Brief = append(send.Brief,user.FillUserBrief())
		u.SendMsg(send)
		return
	}
	
	// 名字查找
	user = UserMgr().FindByName(val)
	if user != nil {
		send.Brief = append(send.Brief,user.FillUserBrief())
		u.SendMsg(send)
		return
	}

	u.SendMsg(send)
}


