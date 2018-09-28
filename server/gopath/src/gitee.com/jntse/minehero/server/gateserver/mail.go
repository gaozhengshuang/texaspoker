package main
import (
	"fmt"
	"strings"
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

func (m *Mail) IsExpire(now int64) bool {
	return now > (m.Date() + tbl.Global.Mail.ExpiryDate * util.DaySec)
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
}

func (m *MailBox) Size() int32 {
	return int32(len(m.mails))
}

func (m *MailBox) Online() {
}

// 加载
func (m *MailBox) DBLoad() {
	lists, err := Redis().HGetAll(fmt.Sprintf("usermails_%d", m.owner.Id())).Result()
	if err != nil {
		log.Error("[邮件] 玩家[%s %d]加载DB邮件失败[%s]", m.owner.Name(), m.owner.Id(), err)
		return
	}

	// 反序列化
	for k, str := range lists {
		id, rbuf, mail := util.Atol(k), []byte(str), &Mail{}
		if mail.LoadBin([]byte(rbuf)) == nil {
			log.Error("[邮件] 玩家[%s %d] 邮件[%d] Protobuf Unmarshal 失败", m.owner.Name(), m.owner.Id(), id)
			continue
		}
		m.mails[id] = mail
		log.Trace("[邮件] 玩家[%s %d] 加载邮件[%d]", m.owner.Name(), m.owner.Id(), id)
	}
	log.Info("[邮件] 玩家[%s %d] 加载邮件完毕，数量[%d]", m.owner.Name(), m.owner.Id(), m.Size())

	// 删除过期邮件
	m.CheckExpire(util.CURTIME())
}

// 存盘
func (m *MailBox) DBSave() {
	pipe := Redis().Pipeline()
	for _, v := range m.mails {
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
func (m *MailBox) Tick(now int64) {
	m.DBSave()
}

// 删除过期邮件
func (m *MailBox) CheckExpire(now int64) {
	pipe := Redis().Pipeline()
	for id, v := range m.mails {
		if v.IsExpire(now) == false {
			continue
		}
		pipe.HDel(fmt.Sprintf("usermails_%d", m.owner.Id()), util.Ltoa(id))
		delete(m.mails, id)
	}

	if cmds, err := pipe.Exec(); err != nil {
		log.Error("[邮件] 玩家[%s %d] 删除过期邮件失败 RedisError[%s]", m.owner.Name(), m.owner.Id(), err)
	}else if len(cmds) != 0 {
		log.Error("[邮件] 玩家[%s %d] 删除过期邮件成功 数量[%d]", m.owner.Name(), m.owner.Id(), len(cmds))
	}
	pipe.Close()
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
	mail := &Mail{bin:detail, dirty:false}
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
func MakeNewMail(rid int64, sid int64, sname string, subtype int32, items []*msg.MailItem, args ...interface{}) bool {
	tconf, find := tbl.MailBase.MailById[subtype]
	if find == false {
		log.Error("收件人[%d] 发件人[%s %d] 新邮件创建失败，无效的SubType[%d]", rid, sname, sid, subtype)
		return false
	}

	// uuid generate
	uuid, errcode := def.GenerateMailId(Redis())
	if errcode != "" {
		return false
	}

	// mail detail
	detail := &msg.MailDetail{Items:make([]*msg.MailItem,0)}
	detail.Id 		= pb.Int64(uuid)
	detail.Senderid = pb.Int64(sid)
	detail.Sender 	= pb.String(sname)
	detail.Date 	= pb.Int64(util.CURTIME())
	detail.Isread 	= pb.Bool(false)
	detail.Isgot 	= pb.Bool(false)
	detail.Items 	= append(detail.Items, items...)
	detail.Subtype 	= pb.Int32(subtype)
	detail.Type 	= pb.Int32(tconf.Type)
	detail.Title 	= pb.String(tconf.Title)


	// 内容解析
	content := fmt.Sprintf(tconf.Content, args...)
	textreward := "奖励："
	for _, item := range items {
		itembase, ok := tbl.ItemBase.ItemBaseDataById[item.GetId()]
		if ok == false { continue }
		textreward += fmt.Sprintf("%s*%d ", itembase.Name, item.GetNum())
	}
	content = strings.Replace(content, "{奖励}", textreward, 1)
	detail.Content  = pb.String(content)

	// DBSave
	utredis.HSetProtoBin(Redis(), fmt.Sprintf("usermails_%d", rid), util.Ltoa(uuid), detail)
	log.Info("收件人[%d] 发件人[%s %d] 新邮件创建成功 Id[%d] SubType[%d] 附件[%v] 内容[%s]", rid, sname, sid, uuid, subtype, items, content)


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


