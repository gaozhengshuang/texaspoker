package main

import (
	"fmt"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/gotoolkit/log"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
)

func (u *GateUser) CheckPayPush (param int32) {
	var pushid int32
	var brtime int64
	var count int32
	var play int32
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("bankrupt_%d", u.Id())).Result()
	if err == nil {
		for k, v := range cmdmap {
			switch k {
				case "time":
					brtime = util.Atol(v)
				case "count":
					count = util.Atoi(v)
				case "play":
					play = util.Atoi(v)
				default :
			}
		}
	}
	brpasttime := util.CURTIME() - brtime
	
	for _, v := range tbl.PayBagBase.TPayBagById {
		if v.Push == param {
			if v.IsBankrupInHigh > 0 && brtime == 0 {
				continue
			}
			if v.Time > 0 && brpasttime > int64(3600*24*v.Time) {
				continue
			}
			if v.IsBankrupInMid > 0 && count == 0 {
				continue
			}
			if v.NumOfBankrup > 0 && count != v.NumOfBankrup {
				continue
			}
			if v.RoundNum > 0 && play < v.RoundNum {
				continue
			}
			if v.GoldNum > 0 && u.GetGold() > v.GoldNum {
				continue
			}
			if v.IsLimit > 0 {
				cmdval, err := Redis().Get(fmt.Sprintf("paypush_%d_%d", u.Id(), v.Push)).Result()
				if err == nil && util.Atoi(cmdval) == 2{
						continue
				}
			}
			pushid = v.Id
			break
		}
	}

	if pushid > 0 {
		u.SendPayPush(int32(pushid))
		Redis().Set(fmt.Sprintf("paypush_%d_%d", u.Id(), tbl.PayBagBase.TPayBagById[pushid].Push), 1, 0)
	}
}

func (u *GateUser) SendPayPush (pushid int32) {
	log.Info("推送玩家[%s]%d礼包 推送id:%d", u.Name(), u.Id(), pushid)
	send := &msg.GW2C_RetPayPush{}
	send.Pushid = pb.Int32(pushid)
}


func (u *GateUser) OnReqBankruptInfo() {
	send := &msg.GW2C_RetBankruptInfo{}
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("bankrupt_%d", u.Id())).Result()
	if err == nil {
		for k, v := range cmdmap {
			switch k {
				case "time":
					send.Time = pb.Int64(util.Atol(v))
				case "count":
					send.Count = pb.Int32(util.Atoi(v))
				case "play":
					send.Play = pb.Int32(util.Atoi(v))
				default :
			}
		}
	}
	u.SendMsg(send)
}

func (u *GateUser) OnDailyClear() {
	for _, v := range tbl.PayBagBase.TPayBagById {
		if v.IsDailyClear > 0 {
			cmdval, err := Redis().Get(fmt.Sprintf("paypush_%d_%d", u.Id(), v.Push)).Result()
			if err == nil && util.Atoi(cmdval) == 2 {
				Redis().Set(fmt.Sprintf("paypush_%d_%d", u.Id(), v.Push), 0, 0)
			}
		}
	}
}
