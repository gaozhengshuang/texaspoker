package main
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"github.com/go-redis/redis"
)

// --------------------------------------------------------------------------
/// @brief 邮件
// --------------------------------------------------------------------------
type Mail struct {
	bin *msg.MailDetail
	dirty bool
}

func (m *Mail) Id() int64 {
	return m.bin.GetId()
}

func (m *Mail) Bin() *msg.MailDetail {
	return m.bin
}

func (m *Mail) IsGot() bool {
	return m.bin.GetIsgot()
}


func (m *Mail) SaveBin(userid int64, pipe redis.Pipeliner) {
	id := util.Ltoa(m.Id())
	m.dirty = false
	if pipe == nil {
		utredis.HSetProtoBinPipeline(pipe, fmt.Sprintf("usermails_%d", userid), id, m.bin)
		return
	}
	if err := utredis.HSetProtoBin(Redis(), fmt.Sprintf("usermails_%d", userid), id, m.bin); err != nil {
		log.Error("[邮件] 保存邮件失败 RedisError[%s]", err)
	}else {
		log.Info("[邮件] 保存邮件成功 id[%d]", id)
	}
}

func (m *Mail) LoadBin(rbuf []byte) *msg.MailDetail {
	data := &msg.MailDetail{}
	if err := pb.Unmarshal(rbuf, data); err != nil {
		return nil
	}
	m.bin = data
	return data
}


// --------------------------------------------------------------------------
/// @brief 邮箱
// --------------------------------------------------------------------------
type MailBox struct {
	owner *GateUser
	mails map[int64]*Mail
}

func (m *MailBox) Init(owner *GateUser) {
	m.owner = owner
	m.mails = make(map[int64]*Mail)
	m.LoadDB()
}

func (m *MailBox) Size() int32 {
	return int32(len(m.mails))
}

func (m *MailBox) Online() {
}

func (m *MailBox) LoadDB() {
	lists, err := Redis().HGetAll(fmt.Sprintf("usermails_%d", m.owner.Id())).Result()
	if err != nil {
		log.Error("[邮件] 玩家[%s %d]加载DB邮件失败[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	// 反序列化
	for k, str := range lists {
		id, rbuf, mail := util.Atol(k), []byte(str), &Mail{}
		if mail.LoadBin([]byte(rbuf)) != nil {
			log.Error("[邮件] 玩家[%s %d]解析邮件[%d]失败[%s]", m.owner.Name(), m.owner.Id(), id, err)
			continue
		}
		m.mails[id] = mail
		log.Trace("[邮件] 玩家[%s %d] 加载邮件[%#v]", mail)
	}

	log.Info("[邮件] 玩家[%s %d] 加载所有邮件[%d]", m.Size())
}

func (m *MailBox) SaveAll() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range m.mails {
		v.SaveBin(m.owner.Id(), pipe)
	}
	_, err := pipe.Exec()
	if err != nil {
		log.Error("[邮件] 玩家[%s %d] 保存所有邮件 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}
	log.Info("[邮件] 玩家[%s %d] 保存所有邮件成功[%d]", m.owner.Name(), m.owner.Id(), m.Size())
}

func (m *MailBox) Tick(now int64) {
}

// 邮件列表
func (m *MailBox) SendMailList() {
	send := &msg.GW2C_RetMailList{Maillist:make([]*msg.MailDetail,0)}
	for _, v := range m.mails {
		send.Maillist = append(send.Maillist, v.Bin())
	}
	m.owner.SendMsg(send)
}

// 领取附件
func (m *MailBox) TakeMailItem(id int64) {
	errcode := ""
	switch {
	default:
		mail, ok := m.mails[id]
		if ok == false {
			log.Error("[邮件] 玩家[%s %d]提取附件，无效的邮件[%d]", m.owner.Name(), m.owner.Id(), id)
			errcode = "无效的邮件"
			break
		}

		if mail.IsGot() == true {
			log.Error("[邮件] 玩家[%s %d]提取附件，附件已领取过[%d]", m.owner.Name(), m.owner.Id(), id)
			errcode = "附件已领取"
			break
		}
	}

	send := &msg.GW2C_RetTakeMailItem{Uid:pb.Int64(id), Errcode:pb.String(errcode)}
	m.owner.SendMsg(send)
}

// 接收新邮件
func (m *MailBox) ReceiveNewMail() {
}


