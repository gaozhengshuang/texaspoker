package main

import (
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

type UserVip struct {
	vipexp       			int32
	viptime      			int32
	yearviptime  			int32
	viplevel	   			int32
}

func (this *UserVip) LoadBin(bin *msg.Serialize) {
	userBaseBin := bin.GetBase()
	if userBaseBin == nil { return }
	userVipBin := userBaseBin.GetVip()
	if userVipBin == nil { return }
	this.vipexp = userVipBin.GetVipexp()
	this.viptime = userVipBin.GetViptime()
	this.yearviptime = userVipBin.GetYearviptime()
	this.viplevel = userVipBin.GetViplevel()
}

func (this *UserVip) PackBin() *msg.UserVip {
	msg := &msg.UserVip{}
	msg.Vipexp = pb.Int32(this.vipexp)
	msg.Viptime = pb.Int32(this.viptime)
	msg.Yearviptime = pb.Int32(this.yearviptime)
	msg.Viplevel = pb.Int32(this.viplevel)
	return msg
}
