package main

import (
	_ "fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

func (this *GateUser) ReqMatchCarData() {
	sendmatch := &msg.GW2MS_ReqCarInfo{}
	sendmatch.Userid = pb.Uint64(this.Id())
	Match().SendCmd(sendmatch)
}

