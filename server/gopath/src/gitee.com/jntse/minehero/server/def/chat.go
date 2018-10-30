package def

import (
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/minehero/pbmsg"
)

const (
	ChatRoom = 1        //房间内消息
	ChatAll = 2         //全员消息
)

const (
	SystemMsg = 0       //系统后台消息
	MTTMsg = 1          //锦标赛消息
	HWarMsg = 2         //百人大战消息
	HornMsg = 3         //小喇叭消息
	TexasMsg = 4		//德州房间消息
)

const (
	MsgShowAll = 0      //全部显示
	MsgOnRoom = 1       //只在房间显示
	MsgOnMTT = 2        //只在锦标赛
	MsgOnGambling = 3   //只在赌博局
	MsgOnHWar = 4       //只在百人大战
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
