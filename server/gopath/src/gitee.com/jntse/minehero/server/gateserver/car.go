package main

import (
	_ "fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
)

func (this *GateUser) ReqMatchCarData() {
	sendmatch := &msg.GW2MS_ReqCarInfo{}
	sendmatch.Userid = pb.Uint64(this.Id())
	Match().SendCmd(sendmatch)
}

