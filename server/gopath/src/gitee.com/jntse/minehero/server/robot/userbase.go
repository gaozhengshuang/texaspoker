package main
import (
	"gitee.com/jntse/gotoolkit/log"
	_"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
)

type IBaseUser interface {
	Init()
}

type UserAccount struct {
	account string
	passwd  string
	phone   string
	idcard  string
}

type UserBase struct {
	UserAccount				// 匿名字段，字段名就是类型名
	islogin		bool
	verifykey 	string
	data        msg.Serialize
}

//func newUserBase(acc string, pw string, ph string, idcard string) *UserBase {
//	return &UserBase{ UserAccount:UserAccount{account:acc, passwd:pw, phone:ph, idcard:idcard }}
//}

func (u *UserBase) Init(acc string, pwd string, ph string, idcard string) {
	u.account = acc
	u.passwd = pwd
	u.phone = ph
	u.idcard = idcard
}

func (u *UserBase) SetVerifykey(key string) {
	u.verifykey = key
}

func (u *UserBase) Account() string {
	return u.account
}

func (u *UserBase) Name() string {
	return u.data.GetEntity().GetName()
}

func (u *UserBase) Id() int64 {
	return u.data.GetEntity().GetRoleid()
}

func (u *UserBase) Head() string {
	return u.data.GetEntity().GetHead()
}

func (u *UserBase) Sex() int32 {
	return u.data.GetEntity().GetSex()
}

func (u *UserBase) SetSex(sex int32) {
	u.data.GetEntity().Sex = pb.Int32(sex)
}

func (u *UserBase) GetGold() int64 {
	return 0
}

func (u *UserBase) LoadUserData(tmsg *msg.GW2C_PushUserInfo) {
	//u.data = pb.Clone(db).(*msg.Serialize)
	u.data.Entity = pb.Clone(tmsg.Entity).(*msg.EntityBase)
	u.data.Base   = pb.Clone(tmsg.Base).(*msg.UserBase)
	u.data.Item   = pb.Clone(tmsg.Item).(*msg.ItemBin)

	log.Info("玩家数据: ==========")
	log.Info("%v",  u.data)
	//log.Info("%#v", u.data.GetEntity())
	//log.Info("%#v", u.data.GetBase())
	//log.Info("%#v", u.data.GetItem())
	log.Info("玩家数据: ==========")
}

func (u *UserBase) NewRegistAccountMsg() *msg.C2L_ReqRegistAccount {
	msg := &msg.C2L_ReqRegistAccount{
		Phone: pb.String(u.account),
		Passwd: pb.String(u.passwd),
		Authcode: pb.String("robot@free@regist"),
		Invitationcode: pb.String(""),
		Nickname: pb.String(u.account),
	}
	return msg
}

func (u *UserBase) NewReqLoginMsg() *msg.C2L_ReqLogin {
	msg := &msg.C2L_ReqLogin {
		Account:pb.String(u.account),
		Passwd:pb.String(u.passwd),
	}
	return msg
}

func (u *UserBase) NewReqLoginWechatMsg() *msg.C2L_ReqLoginWechat {
	msg := &msg.C2L_ReqLoginWechat {
		Openid:pb.String(u.account),
		Nickname:pb.String(u.account),
		Head:pb.String(""),
	}
	return msg
}


func (u *UserBase) NewReqLoginGateMsg() *msg.C2GW_ReqLogin {
	msg := &msg.C2GW_ReqLogin {
		Account : pb.String(u.account),
		Verifykey : pb.String(u.verifykey),
	}
	return msg
}

//func (u *UserBase) NewReqMatchMsg(mode int) *msg.C2GW_ReqStartMatch {
//	msg := &msg.C2GW_ReqStartMatch {
//		Mode : pb.Int(mode),
//	}
//	return msg
//}

//func (u *UserBase) NewCancelMatchMsg() *msg.C2GW_ReqCancelMatch {
//
//	msg := &msg.C2GW_ReqCancelMatch {
//		//Userid : pb.Int64(u.id),
//	}
//	return msg
//}
