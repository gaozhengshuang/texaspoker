package main
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/def"
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

func (m *Mail) Dirty() bool {
	return m.dirty
}

func (m *Mail) IsGot() bool {
	return m.bin.GetIsgot()
}

func (m *Mail) SetGot() {
	m.bin.Isgot = pb.Bool(true)
	m.dirty = true
}

func (m *Mail) SetRead() {
	m.bin.Isread = pb.Bool(true)
	m.dirty = true
}

func (m *Mail) Items() []*msg.MailItem {
	return m.bin.Items
}

func (m *Mail) Date() int64 {
	return m.bin.GetDate()
}

func (m *Mail) IsExpiry(now int64) bool {
	return (m.Date() + tbl.Global.Mail.ExpiryDate * util.DaySec) > now
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
	m.DBLoad()
}

func (m *MailBox) Size() int32 {
	return int32(len(m.mails))
}

func (m *MailBox) Online() {
}

func (m *MailBox) DBLoad() {
	lists, err := Redis().HGetAll(fmt.Sprintf("usermails_%d", m.owner.Id())).Result()
	if err != nil {
		log.Error("[邮件] 玩家[%s %d]加载DB邮件失败[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	// 反序列化
	now :=  util.CURTIME()
	for k, str := range lists {
		id, rbuf, mail := util.Atol(k), []byte(str), &Mail{}
		if mail.LoadBin([]byte(rbuf)) != nil {
			log.Error("[邮件] 玩家[%s %d]解析邮件[%d]失败[%s]", m.owner.Name(), m.owner.Id(), id, err)
			continue
		}
		if mail.IsExpiry(now) {
			log.Info("[邮件] 玩家[%s %d] 邮件[%d] 过期删除", m.owner.Name(), m.owner.Id(), id)
			continue
		}
		m.mails[id] = mail
		log.Trace("[邮件] 玩家[%s %d] 加载邮件[%#v]", mail)
	}

	log.Info("[邮件] 玩家[%s %d] 加载所有邮件[%d]", m.Size())
}

func (m *MailBox) DBSave() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range m.mails {
		if v.Dirty() == true { v.SaveBin(m.owner.Id(), pipe) }
	}
	_, err := pipe.Exec()
	if err != nil {
		log.Error("[邮件] 玩家[%s %d] 保存邮件失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}
	log.Info("[邮件] 玩家[%s %d] 保存邮件成功，数量[%d]", m.owner.Name(), m.owner.Id(), m.Size())
}

// 1分钟tick
func (m *MailBox) Tick(now int64) {
	m.DBSave()
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

		for _, item := range mail.Items() {
			m.owner.AddItem(item.GetId(), item.GetNum(), "邮件附件", true)
		}
		mail.SetGot()
		mail.SetRead()
		log.Info("[邮件] 玩家[%s %d]提取附件成功", m.owner.Name(), m.owner.Id())
	}

	send := &msg.GW2C_RetTakeMailItem{Uid:pb.Int64(id), Errcode:pb.String(errcode)}
	m.owner.SendMsg(send)
}

// 接收新邮件
func (m *MailBox) ReceiveNewMail(detail *msg.MailDetail) {
	mail := &Mail{bin:detail}
	if _, exist := m.mails[mail.Id()]; exist == true {
		log.Info("玩家[%s %d] 收到新邮件[%d]，UUID重复", m.owner.Name(), m.owner.Id(), mail.Id())
		return
	}

	m.mails[mail.Id()] = mail
	newmail := &msg.GW2C_PushNewMail{Mail:detail}
	m.owner.SendMsg(newmail)
	log.Info("玩家[%s %d] 收到新邮件[%d]", m.owner.Name(), m.owner.Id(), mail.Id())
}

// 创建邮件
func MakeNewMail(rid int64, rname string, sid int64, sname string, subtype int32, items []*msg.MailItem) bool {
	uuid, errcode := def.GenerateMailId(Redis())
	if errcode != "" {
		return false
	}

	detail := &msg.MailDetail{Items:make([]*msg.MailItem,0)}
	detail.Id 		= pb.Int64(uuid)
	detail.Senderid = pb.Int64(sid)
	detail.Sender 	= pb.String(sname)
	detail.Date 	= pb.Int64(util.CURTIME())
	detail.Isread 	= pb.Bool(false)
	detail.Isgot 	= pb.Bool(false)
	detail.Items 	= append(detail.Items, items...)
	detail.Subtype 	= pb.Int32(subtype)
	//detail.Type 	= pb.Int32(0)
	//detail.Title 	= pb.String("")
	//detail.Content= pb.String("")

	utredis.HSetProtoBin(Redis(), fmt.Sprintf("usermails_%d", rid), util.Ltoa(uuid), detail)
	log.Info("玩家[%s %d] 新邮件[%d]创建成功 SubType[%d] 附件[%v]", rid, rname, uuid, subtype, items)

	// 收件人是否在本服务器
	if receiver := UserMgr().FindById(rid); receiver != nil {
		receiver.mailbox.ReceiveNewMail(detail)
		return true
	}

	// 转发到中心服务器
	transmsg := &msg.GW2MS_PushNewMail{Receiver:pb.Int64(rid), Mail:detail}
	Match().SendCmd(transmsg)
	return true
}


