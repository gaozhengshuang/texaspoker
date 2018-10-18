package def
import (
	"fmt"
	"strings"
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
	detail.Subtype  = pb.Int32(subtype)
	detail.Type     = pb.Int32(tconf.Type)
	detail.Title    = pb.String(tconf.Title)


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
	utredis.HSetProtoBin(rclient, fmt.Sprintf("usermails_%d", rid), util.Ltoa(uuid), detail)
	log.Info("收件人[%d] 发件人[%s %d] 新邮件创建成功 Id[%d] SubType[%d] 附件[%v] 内容[%s]", rid, sname, sid, uuid, subtype, items, content)
	return detail
}


