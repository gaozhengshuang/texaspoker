package main
import (
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)


func (u *User) ReqFriendList() {
	send := &msg.C2GW_ReqFriendsList{}
	u.SendGateMsg(send)
}

func (u *User) ReqFriendRequestList() {
	send := &msg.C2GW_ReqFriendRequestList{}
	u.SendGateMsg(send)
}

func (u *User) AddFriend(subcmd string) {
	uid := util.Atol(subcmd)
	send := &msg.C2GW_ReqAddFriend{Roleid:pb.Int64(uid)}
	u.SendGateMsg(send)
}

func (u *User) ProcessFriend(subcmd string) {
	uid := util.Atol(subcmd)
	send := &msg.C2GW_ReqProcessFriendRequest{Roleid:pb.Int64(uid)}
	u.SendGateMsg(send)
}

func (u *User) FriendPresent(subcmd string) {
	uid := util.Atol(subcmd)
	send := &msg.C2GW_ReqPresentToFriend{Roleid:pb.Int64(uid)}
	u.SendGateMsg(send)
}

func (u *User) RemoveFriend(subcmd string) {
	uid := util.Atol(subcmd)
	send := &msg.C2GW_ReqRemoveFriend{Roleid:pb.Int64(uid)}
	u.SendGateMsg(send)
}

func (u *User) SearchFriend(subcmd string) {
	send := &msg.C2GW_ReqFriendSearch{Val:pb.String(subcmd) }
	u.SendGateMsg(send)
}

func on_GW2C_RetFriendsList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetFriendsList)
	log.Info("%+v", tmsg)
}

func on_GW2C_RetPresentToFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetPresentToFriend)
	log.Info("%+v", tmsg)
}

func on_GW2C_RetGetFriendPresent(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetGetFriendPresent)
	log.Info("%+v", tmsg)
}

func on_GW2C_RetFriendRequestList(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetFriendRequestList)
	log.Info("%+v", tmsg)
}

func on_GW2C_RetRemoveFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetRemoveFriend)
	log.Info("%+v", tmsg)
}

func on_GW2C_PushRemoveFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushRemoveFriend)
	log.Info("%+v", tmsg)
}

func on_GW2C_RetAddFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetAddFriend)
	log.Info("%+v", tmsg)
}

func on_GW2C_PushFriendAddSuccess(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushFriendAddSuccess)
	log.Info("%+v", tmsg)
}

func on_GW2C_PushAddYouFriend(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_PushAddYouFriend)
	log.Info("%+v", tmsg)
}

func on_GW2C_RetProcessFriendRequest(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetProcessFriendRequest)
	log.Info("%+v", tmsg)
}

func on_GW2C_RetFriendSearch(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.GW2C_RetFriendSearch)
	log.Info("%+v", tmsg)
}

