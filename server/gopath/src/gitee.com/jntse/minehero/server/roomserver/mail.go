package main
import (
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/def"
	pb "github.com/gogo/protobuf/proto"
)

// 创建邮件
func SendMail(rid int64, sid int64, sname string, subtype int32, items []*msg.MailItem, args ...interface{}) bool {
	detail := def.MakeNewMail(Redis(), rid, sid, sname, subtype, items, args...)
	if detail == nil {
		return false
	}

	// 转发到中心服务器
	transmsg := &msg.RS2MS_PushNewMail{Receiver:pb.Int64(rid), Mail:detail}
	Match().SendCmd(transmsg)
	return true
}
