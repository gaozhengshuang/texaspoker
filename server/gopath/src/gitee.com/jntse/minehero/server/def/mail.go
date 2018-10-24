package def
import (
	"fmt"
	_"strings"
	pb "github.com/gogo/protobuf/proto"
	"github.com/go-redis/redis"

	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"

	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"

)

// 创建邮件
func MakeNewMail(rclient *redis.Client, rid int64, sid int64, sname string, subtype int32, items []*msg.MailItem, args ...interface{}) *msg.MailDetail {
	t1 := util.CURTIMEUS()
	defer func() { log.Trace("[邮件] 邮件创建耗时[%d]", util.CURTIMEUS() - t1) }()
	tconf, find := tbl.MailBase.MailById[subtype]
	if find == false {
		log.Error("收件人[%d] 发件人[%s %d] 新邮件创建失败，无效的SubType[%d]", rid, sname, sid, subtype)
		return nil
	}

	// uuid generate
	uuid, errcode := GenerateMailId(rclient)
	if errcode != "" {
		return nil
	}

	// mail detail
	detail := &msg.MailDetail{Items:make([]*msg.MailItem,0)}
	detail.Id       = pb.Int64(uuid)
	detail.Senderid = pb.Int64(sid)
	detail.Sender   = pb.String(sname)
	detail.Date     = pb.Int64(util.CURTIME())
	detail.Isread   = pb.Bool(false)
	detail.Isgot    = pb.Bool(false)
	detail.Items    = append(detail.Items, items...)
	detail.Tid		= pb.Int32(tconf.Id)

	// DBSave
	utredis.HSetProtoBin(rclient, fmt.Sprintf("usermails_%d", rid), util.Ltoa(uuid), detail)
	log.Info("收件人[%d] 发件人[%s %d] 新邮件创建成功 Id[%d] SubType[%d] 附件[%v]", rid, sname, sid, uuid, subtype, items)
	return detail
}

// 创建锦标赛邮件
func MakeMTTMail(rclient *redis.Client, rid int64, mtttid int32, mttrank int32, mttaward int32) *msg.MailDetail {
	// uuid generate
	uuid, errcode := GenerateMailId(rclient)
	if errcode != "" {
		return nil
	}

	// mail detail
	detail := &msg.MailDetail{Items:make([]*msg.MailItem,0)}
	detail.Id       = pb.Int64(uuid)
	detail.Date     = pb.Int64(util.CURTIME())
	detail.Isread   = pb.Bool(false)
	detail.Isgot    = pb.Bool(false)
	detail.Tid		= pb.Int32(101)
	detail.Mtttid	= pb.Int32(mtttid)
	detail.Mttrank	= pb.Int32(mttrank)
	detail.Mttawardtid = pb.Int32(mttaward)

	// DBSave
	utredis.HSetProtoBin(rclient, fmt.Sprintf("usermails_%d", rid), util.Ltoa(uuid), detail)
	log.Info("收件人[%d] 发件人[%d] 锦标赛邮件创建成功 Id[%d] 排名%d award%d", rid, 0, uuid, mttrank, mttaward)
	return detail
}


