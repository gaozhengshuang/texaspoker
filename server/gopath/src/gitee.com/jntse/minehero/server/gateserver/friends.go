package main
import (
	"fmt"
	_"strings"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/redis"
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
	bin *msg.FriendData
	dirty bool
}

func (m *Friend) Id() int64 {
	return m.bin.GetRoleid()
}

func (m *Friend) Bin() *msg.FriendData {
	return m.bin
}

func (m *Friend) Dirty() bool {
	return m.dirty
}

func (m *Friend) SaveBin(userid int64, pipe redis.Pipeliner) {
	id := util.Ltoa(m.Id())
	m.dirty = false
	if pipe == nil {
		utredis.HSetProtoBinPipeline(pipe, fmt.Sprintf("userfriends_%d", userid), id, m.bin)
		return
	}
	if err := utredis.HSetProtoBin(Redis(), fmt.Sprintf("userfriends_%d", userid), id, m.bin); err != nil {
		log.Error("[邮件] 保存邮件失败 RedisError[%s]", err)
	}else {
		log.Info("[邮件] 保存邮件成功 id[%s]", id)
	}
}

func (m *Friend) LoadBin(rbuf []byte) *msg.FriendData {
	data := &msg.FriendData{}
	if err := pb.Unmarshal(rbuf, data); err != nil {
		return nil
	}
	m.bin = data
	return data
}


// --------------------------------------------------------------------------
/// @brief 邮箱
// --------------------------------------------------------------------------
type FriendBox struct {
	owner *GateUser
	friends map[int64]*Friend
}

func (m *FriendBox) Init(owner *GateUser) {
	m.owner = owner
	m.friends = make(map[int64]*Friend)
}

func (m *FriendBox) Size() int32 {
	return int32(len(m.friends))
}

func (m *FriendBox) Online() {
}

// 加载
func (m *FriendBox) DBLoad() {
	lists, err := Redis().HGetAll(fmt.Sprintf("userfriends_%d", m.owner.Id())).Result()
	if err != nil {
		log.Error("[邮件] 玩家[%s %d]加载DB邮件失败[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	// 反序列化
	for k, str := range lists {
		id, rbuf, mail := util.Atol(k), []byte(str), &Friend{}
		if mail.LoadBin([]byte(rbuf)) == nil {
			log.Error("[邮件] 玩家[%s %d] 邮件[%d] Protobuf Unmarshal 失败", m.owner.Name(), m.owner.Id(), id)
			continue
		}
		m.friends[id] = mail
		log.Trace("[邮件] 玩家[%s %d] 加载邮件[%d]", m.owner.Name(), m.owner.Id(), id)
	}
	log.Info("[邮件] 玩家[%s %d] 加载邮件完毕，数量[%d]", m.owner.Name(), m.owner.Id(), m.Size())
}

// 存盘
func (m *FriendBox) DBSave() {
	pipe := Redis().Pipeline()
	for _, v := range m.friends {
		if v.Dirty() == true { v.SaveBin(m.owner.Id(), pipe) }
	}

	if cmds, err := pipe.Exec(); err != nil {
		log.Error("[邮件] 玩家[%s %d] 保存邮件失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
	}else if len(cmds) != 0 {
		log.Info("[邮件] 玩家[%s %d] 保存邮件成功，数量[%d]", m.owner.Name(), m.owner.Id(), len(cmds))
	}
	pipe.Close()
}

// 1分钟tick
func (m *FriendBox) Tick(now int64) {
	m.DBSave()
}


// 异常邮件
func (m *FriendBox) RemoveFriend(id int64) {
	if id == 0 { return }
	Redis().HDel(fmt.Sprintf("userfriends_%d", m.owner.Id()), util.Ltoa(id))
	delete(m.friends, id)
	log.Info("[邮件] 玩家[%s %d] 删除邮件[%d]", m.owner.Name(), m.owner.Id(), id)
}

// 邮件列表
func (m *FriendBox) SendFriendList() {
	//send := &msg.GW2C_RetFriendList{Friendlist:make([]*msg.FriendData,0)}
	//for _, v := range m.friends {
	//	send.Friendlist = append(send.Friendlist, v.Bin())
	//}
	//m.owner.SendMsg(send)
}

