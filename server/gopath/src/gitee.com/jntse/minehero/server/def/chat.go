package def

import (
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/pbmsg"
)

func MakeChatInfo(mtype int32, txt string, roleid int64, name string, subtype int32, showtype int32) *msg.GW2C_PushMessage{
	send := &msg.GW2C_PushMessage{}
	send.Type = pb.Int32(mtype)
	send.Txt = pb.String(txt)
	send.Roleid = pb.Int64(roleid)
	send.Name = pb.String(name)
	send.Subtype = pb.Int32(subtype)
	send.Showtype = pb.Int32(showtype)
	return send
}
