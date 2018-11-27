package main
import ( 
	_"reflect"
	"fmt"
	_"math/rand"
	"crypto/md5"
	"strings"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	_"gitee.com/jntse/gotoolkit/eventqueue"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/pbmsg"
	"io/ioutil"
	"net/http"
	"crypto"
	"crypto/x509"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/tls"
	"encoding/base64"
	"encoding/binary"
	"bytes"
	"encoding/json"
)


//func init() {
//	NewC2LSMsgHandler()
//}

type HttpArguLoginFaceBookBase struct {
	Data HttpArguLoginFaceBookData
}

type HttpArguLoginFaceBookData struct {
	Is_valid 	bool
	User_id 	string
}

type HttpArguLoginGoogle struct {
	Iss string
	Sub string
	Azp string
	Aud string
	Iat string
	Exp string
}

type C2LSMsgHandler struct {
	msgparser *network.ProtoParser
}

func NewC2LSMsgHandler() *C2LSMsgHandler {
	handler := &C2LSMsgHandler{}
	handler.Init()
	return handler
}

func (mh* C2LSMsgHandler) Init() {

	mh.msgparser = network.NewProtoParser("C2LS_MsgParser", tbl.ProtoMsgIndexGenerator)
	if mh.msgparser == nil {
		return
	}

	// 收
	mh.msgparser.RegistProtoMsg(msg.C2L_ReqLogin{}, on_C2L_ReqLogin)
	mh.msgparser.RegistProtoMsg(msg.C2L_ReqLoginWechat{}, on_C2L_ReqLoginWechat)
	mh.msgparser.RegistProtoMsg(msg.C2L_ReqRegistAccount{}, on_C2L_ReqRegistAccount)
	mh.msgparser.RegistProtoMsg(msg.C2L_ReqRegistAuthCode{}, on_C2L_ReqRegistAuthCode)
	mh.msgparser.RegistProtoMsg(msg.C2L_ReqLoginApple{}, on_C2L_ReqLoginApple)
	mh.msgparser.RegistProtoMsg(msg.C2L_ReqLoginFaceBook{}, on_C2L_ReqLoginFaceBook)
	mh.msgparser.RegistProtoMsg(msg.C2L_ReqLoginGoogle{}, on_C2L_ReqLoginGoogle)

	// 发
	//mh.msgparser.RegistSendProto(msg.L2C_RetLogin{})
	//mh.msgparser.RegistSendProto(msg.L2C_RetRegistAccount{})
}

func newL2C_RetLogin(reason string, ip string, port int, key string, logintype string) *msg.L2C_RetLogin {
	send := &msg.L2C_RetLogin {
		Result : pb.Int32(1),
		Reason : pb.String(reason),
		Gatehost : &msg.IpHost {
		Ip : pb.String(ip),
		Port : pb.Int(port),
		},
		Verifykey : pb.String(key),
		Logintype : pb.String(logintype),
	}
	if reason != "" {
		send.Result = pb.Int32(0)
	}
	return send
}

// 获取手机验证码
func on_C2L_ReqRegistAuthCode(session network.IBaseNetSession, message interface{}) {
	//tmsg := message.(*msg.C2L_ReqRegistAuthCode)
	//GetRegistAuthCode(tmsg.GetPhone())
}


// 注册账户
func on_C2L_ReqRegistAccount(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2L_ReqRegistAccount)
	errcode, phone, passwd, authcode, invitationcode := "", tmsg.GetPhone(), tmsg.GetPasswd(), tmsg.GetAuthcode(), tmsg.GetInvitationcode()
	nickname, account := tmsg.GetNickname(), phone

	switch {
	default:
		if errcode = RegistAccountCheck(account, passwd, invitationcode, authcode, nickname); errcode != "" {
			break
		}

		if errcode = RegistAccount(account, passwd, invitationcode, nickname, "", ""); errcode != "" {
			break
		}
	}


	// 回复
	send := &msg.L2C_RetRegistAccount{Errcode : pb.String(errcode) }
	session.SendCmd(send)
	if errcode != "" { log.Info("[注册] 账户[%s] 注册失败[%s]", phone, errcode) }
}


// 请求登陆验证
func on_C2L_ReqLogin(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2L_ReqLogin)
	tm1 := util.CURTIMEUS()
	errcode, account, passwd := "", tmsg.GetAccount(), tmsg.GetPasswd()
	switch {
	default:
		// 1. 多Gate时避免多客户端同时登陆
		// 2. 已经登陆上的账户，在对应的Gate中要验证是否重复登陆
		if account == "" || strings.Contains(account, " ") || strings.Contains(account, "-") {
			errcode = "账户空字符串或包含非法字符"
			break
		}

		// 目前暂时先免注册，客户端直接账户密码登陆
		if errcode = DirectRegistAccount(account, passwd,"", ""); errcode != "" {
			break
		}

		// 登陆验证
		if errcode = Authenticate(session, account, passwd); errcode != "" {
			break
		}

		if Login().CheckInSetFind(account) == true {
			errcode = "同时登陆多个账户"
			break
		}

		// TODO: 从Redis获取账户缓存Gate信息，实现快速登陆
		log.Info("账户[%s]登陆Login ", account)
		if ok := QuickLogin(session, account, "IntranetAccount"); ok == true {
			return
		}

		// 挑选一个负载较低的agent
		agent := GateMgr().FindLowLoadGate()
		if agent == nil {
			errcode = "没有可用Gate"
			break
		}

		// 生成校验key，玩家简单信息发送到对应Gate,用于验证玩家登陆Gate合法
		now := util.CURTIMEMS()
		signbytes := []byte(fmt.Sprintf("<%d-%s>", now, account))
		md5array := md5.Sum(signbytes)
		md5bytes := []byte(md5array[:])
		md5string := fmt.Sprintf("%s_%x", account, md5bytes)

		sendmsg := &msg.L2GW_ReqRegistUser{
			Account : pb.String(account),
			Expire : pb.Int64(now+10000),	// 10秒
			Gatehost : pb.String(agent.Host()),
			Sid : pb.Int(session.Id()),
			Timestamp: pb.Int64(now),
			Verifykey : pb.String(md5string),
			Logintype : pb.String("IntranetAccount"),
		}
		agent.SendMsg(sendmsg)
		Login().CheckInSetAdd(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus", session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, "", "IntranetAccount"))
		session.Close()
	}
}

// 微信小游戏登陆
func on_C2L_ReqLoginWechat(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2L_ReqLoginWechat)
	tm1  := util.CURTIMEUS()
	errcode, openid, face, nickname := "", tmsg.GetOpenid(), tmsg.GetHead(), tmsg.GetNickname()
	account, passwd, invitationcode := openid, "", tmsg.GetInvitationcode()
	switch {
	default:
		// 1. 多Gate时避免多客户端同时登陆
		// 2. 已经登陆上的账户，在对应的Gate中要验证是否重复登陆
		if account == "" {
			errcode = "账户空字符串或包含空格"
			break
		}

		//// 登陆验证
		//if errcode = Authenticate(session, account, passwd); errcode != "" {
		//	break
		//}

		// 微信小游戏注册
		if errcode = RegistAccountFromWechatMiniGame(account, passwd, invitationcode, nickname, face); errcode != "" {
			break
		}

		if Login().CheckInSetFind(account) == true {
			errcode = "同时登陆多个账户"
			break
		}

		// TODO: 从Redis获取账户缓存Gate信息，实现快速登陆
		log.Info("账户[%s] 使用邀请码[%s] 登陆Login", account, invitationcode)
		if ok := QuickLogin(session, account, "WeChat"); ok == true {
			return
		}

		// 挑选一个负载较低的agent
		agent := GateMgr().FindLowLoadGate()
		if agent == nil {
			errcode = "没有可用Gate"
			break
		}

		// 生成校验key，玩家简单信息发送到对应Gate,用于验证玩家登陆Gate合法
		now := util.CURTIMEMS()
		signbytes := []byte(fmt.Sprintf("<%d-%s>", now, account))
		md5array := md5.Sum(signbytes)
		md5bytes := []byte(md5array[:])
		md5string := fmt.Sprintf("%s_%x", account, md5bytes)

		sendmsg := &msg.L2GW_ReqRegistUser{
			Account : pb.String(account),
			Expire : pb.Int64(now+10000),	// 10秒
			Gatehost : pb.String(agent.Host()),
			Sid : pb.Int(session.Id()),
			Timestamp: pb.Int64(now),
			Verifykey : pb.String(md5string),
			Logintype : pb.String("WeChat"),
		}
		agent.SendMsg(sendmsg)
		Login().CheckInSetAdd(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus",session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, "", "WeChat"))
		session.Close()
	}
}

//苹果账号登录
func on_C2L_ReqLoginApple(session network.IBaseNetSession, message interface{}) {
	tm1 := util.CURTIMEUS()
	tmsg := message.(*msg.C2L_ReqLoginApple)
	openid, keyurl, signature, timestamp, salt, nickname, face, bundleid :=  tmsg.GetOpenid(), tmsg.GetKeyurl(), tmsg.GetSignature(), tmsg.GetTimestamp(), tmsg.GetSalt(), tmsg.GetNickname(), tmsg.GetFace(), tmsg.GetBundleid()
	errcode := ""

	account := fmt.Sprintf("apple-%s",openid)
	switch{
		default:
		resp, err := HttpsGetSkipVerify(keyurl)
		if err != nil {
			log.Error("ReqLoginApple HttpsGetSkipVerify Error :%s", err)
			errcode = "apple验证获取key出错"
			break
		}
		if resp.Code != http.StatusOK {
			log.Error("ReqLoginApple CheckResponseError errcode:[%d] status:[%s]", resp.Code, resp.Status)
			errcode = "apple验证获取key出错"
			break
		}
		cert := resp.Body

		err = VerifySig(signature, openid, bundleid, salt, timestamp, cert)
		if err != nil {
			log.Error("apple login error VerifySig fail err:%s", err)
			errcode = "apple验证失败"
			break
		}
		log.Info("apple verify Success")

		if errcode = DirectRegistAccount(account, "", nickname, face); errcode != "" {
			break
		}
		
		if Login().CheckInSetFind(account) == true {
			errcode = "同时登陆多个账户"
			break
		}

		// TODO: 从Redis获取账户缓存Gate信息，实现快速登陆
		log.Info("账户[%s]登陆Login ", account)
		if ok := QuickLogin(session, account, "GameCenter"); ok == true {
			return
		}
		// 挑选一个负载较低的agent
		agent := GateMgr().FindLowLoadGate()
		if agent == nil {
			errcode = "没有可用Gate"
			break
		}

		// 生成校验key，玩家简单信息发送到对应Gate,用于验证玩家登陆Gate合法
		now := util.CURTIMEMS()
		signbytes := []byte(fmt.Sprintf("<%d-%s>", now, account))
		md5array := md5.Sum(signbytes)
		md5bytes := []byte(md5array[:])
		md5string := fmt.Sprintf("%s_%x", account, md5bytes)

		sendmsg := &msg.L2GW_ReqRegistUser{
			Account : pb.String(account),
			Expire : pb.Int64(now+10000),	// 10秒
			Gatehost : pb.String(agent.Host()),
			Sid : pb.Int(session.Id()),
			Timestamp: pb.Int64(now),
			Verifykey : pb.String(md5string),
			Logintype : pb.String("GameCenter"),
		}
		agent.SendMsg(sendmsg)
		Login().CheckInSetAdd(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus", session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, "", "GameCenter"))
		session.Close()
	}
}


func VerifySig(sSig, sGcId, sBundleId, sSalt string, timestamp uint64, cert []byte) (err error) {
	sig, err := base64.StdEncoding.DecodeString(sSig)
	if err != nil {
		return err
	}
	salt, err := base64.StdEncoding.DecodeString(sSalt)
	if err != nil {
		return err
	}

	payload := new(bytes.Buffer)
	payload.WriteString(sGcId)
	payload.WriteString(sBundleId)
	binary.Write(payload, binary.BigEndian, timestamp)
	payload.Write(salt)

	return VerifyRsa(cert, sig, payload.Bytes())
}

func VerifyRsa(key, sig, content []byte) error {
	cert, err := x509.ParseCertificate(key)
	if err != nil {
		log.Error("parse cert error %s", err)
		return err
	}
	pub := cert.PublicKey.(*rsa.PublicKey)

	h := sha256.New()
	h.Write(content)
	digest := h.Sum(nil)

	err = rsa.VerifyPKCS1v15(pub, crypto.SHA256, digest, sig)
	return err
}

//Facebook 用户登录
func on_C2L_ReqLoginFaceBook(session network.IBaseNetSession, message interface{}) {
	tm1 := util.CURTIMEUS()
	tmsg := message.(*msg.C2L_ReqLoginFaceBook)
	openid, token, nickname, face, appid :=  tmsg.GetOpenid(), tmsg.GetToken(), tmsg.GetNickname(), tmsg.GetFace(), tmsg.GetAppid()
	log.Info("ReqLoginFaceBook openid: %s,  token: %s,  appid:%s", openid, token, appid)
	account := fmt.Sprintf("facebook-%s",openid)
	errcode := ""
	appsecret := ""
	for _, v := range tbl.FaceBook.FaceBookLogin {
		if v.Appid == appid {
			appsecret = v.Appsecret
			break
		}
	}
	if appsecret == "" {
		errcode = "appid not find"
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, "", "FaceBook"))
		session.Close()
	}
	url := fmt.Sprintf("https://graph.facebook.com/debug_token?access_token=%s|%s&input_token=%s", appid, appsecret, token)
	switch {
		default:
		resp, err := HttpsGetSkipVerify(url)
		if err != nil {
			log.Error("ReqLoginFaceBook HttpsGetSkipVerify Error :%s", err)
			errcode = "facebook验证出错"
			break
		}
		if resp.Code != http.StatusOK {
			log.Error("ReqLoginFaceBook CheckResponseError errcode:[%d] status:[%s]", resp.Code, resp.Status)
			errcode = "facebook验证出错"
			break
		}
		strBody := util.BytesToString(resp.Body)
		log.Info("CheckResponse body:\n%s", strBody)
		objcmd := &HttpArguLoginFaceBookBase{}
		objerror := json.Unmarshal(resp.Body, objcmd)
		if objerror != nil {
			log.Error("json.Unmarshal to HttpArguLoginFaceBookBase err[%s]", objerror)
			errcode = "facebook验证出错"
			break
		}
		
		if objcmd.Data.Is_valid == false {
			log.Error("ReqLoginFaceBook Check valid fail")
			errcode = "facebook验证未通过"
			break
		}
	
		if objcmd.Data.User_id != openid {
			log.Error("ReqLoginFaceBook Check user_id fail user_id: %s  openid: %s", objcmd.Data.User_id, openid)
			errcode = "facebook验证未通过"
			break 
		}
		
		if errcode = DirectRegistAccount(account, "", nickname, face); errcode != "" {
			break
		}
		
		if Login().CheckInSetFind(account) == true {
			errcode = "同时登陆多个账户"
			break
		}

		// TODO: 从Redis获取账户缓存Gate信息，实现快速登陆
		log.Info("账户[%s]登陆Login ", account)
		if ok := QuickLogin(session, account, "FaceBook"); ok == true {
			return
		}
		// 挑选一个负载较低的agent
		agent := GateMgr().FindLowLoadGate()
		if agent == nil {
			errcode = "没有可用Gate"
			break
		}

		// 生成校验key，玩家简单信息发送到对应Gate,用于验证玩家登陆Gate合法
		now := util.CURTIMEMS()
		signbytes := []byte(fmt.Sprintf("<%d-%s>", now, account))
		md5array := md5.Sum(signbytes)
		md5bytes := []byte(md5array[:])
		md5string := fmt.Sprintf("%s_%x", account, md5bytes)

		sendmsg := &msg.L2GW_ReqRegistUser{
			Account : pb.String(account),
			Expire : pb.Int64(now+10000),	// 10秒
			Gatehost : pb.String(agent.Host()),
			Sid : pb.Int(session.Id()),
			Timestamp: pb.Int64(now),
			Verifykey : pb.String(md5string),
			Logintype : pb.String("FaceBook"),
		}
		agent.SendMsg(sendmsg)
		Login().CheckInSetAdd(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus", session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, "", "FaceBook"))
		session.Close()
	}

}

func HttpsGetSkipVerify(url string) (*network.HttpResponse, error) {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}

	client := &http.Client{Transport: tr}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil { return nil, err }

	// "The client must close the response body when finished with it"
	resp, err := client.Do(req)
	if err != nil {  return nil, err }
	defer resp.Body.Close()

	rbody, err := ioutil.ReadAll(resp.Body)
	if err != nil { return nil, err }
	return &network.HttpResponse{Code:resp.StatusCode, Status: resp.Status, Body: rbody}, nil
}

func on_C2L_ReqLoginGoogle(session network.IBaseNetSession, message interface{}) {
	tm1 := util.CURTIMEUS()
	tmsg := message.(*msg.C2L_ReqLoginGoogle)
	openid, token, nickname, face, appid := tmsg.GetOpenid(), tmsg.GetToken(), tmsg.GetNickname(), tmsg.GetFace(), tmsg.GetClientid()
	log.Info("ReqLoginGoogle openid: %s   token: %s", openid, token)
	account := fmt.Sprintf("google-%s",openid)
	errcode := ""
	//appid := tbl.Global.GoogleLogin.Appid
	bfind := false
	for _, v := range tbl.Google.GoogleLoginAppIDArray {
		if appid == v {
			bfind = true
			break
		}
	}
	if bfind == false {
		log.Error("ReqLoginGoogle 非法的 appid")
		session.SendCmd(newL2C_RetLogin("appid not find", "", 0, "", "GooglePlay"))
		return
	}
	url := fmt.Sprintf("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=%s", token)
	switch {
		default:
		resp, err := HttpsGetSkipVerify(url)
		if err != nil {
			log.Error("ReqLoginGoogle HttpsGetSkipVerify Error :%s", err)
			errcode = "google验证出错"
			break
		}
		if resp.Code != http.StatusOK {
			log.Error("ReqLoginGoogle CheckResponseError errcode:[%d] status:[%s]", resp.Code, resp.Status)
			errcode = "google验证出错"
			break
		}
		strBody := util.BytesToString(resp.Body)
		log.Info("CheckResponse body:\n%s", strBody)
		objcmd := &HttpArguLoginGoogle{}
		objerror := json.Unmarshal(resp.Body, objcmd)
		if objerror != nil {
			log.Error("json.Unmarshal to HttpArguLoginFaceBookBase err[%s]", objerror)
			errcode = "google验证出错"
			break
		}
		
		if objcmd.Aud != appid {
			log.Error("ReqLoginGoogle Check appid fail aud: %s  appid: %s", objcmd.Aud, appid)
			errcode = "google验证未通过"
			break 
		}
		
		if objcmd.Sub != openid {
			log.Error("ReqLoginGoogle Check openid fail sub: %s  openid: %s", objcmd.Sub, openid)
			errcode = "google验证未通过"
			break 
		}
		if errcode = DirectRegistAccount(account, "", nickname, face); errcode != "" {
			break
		}
		
		if Login().CheckInSetFind(account) == true {
			errcode = "同时登陆多个账户"
			break
		}

		// TODO: 从Redis获取账户缓存Gate信息，实现快速登陆
		log.Info("账户[%s]登陆Login ", account)
		if ok := QuickLogin(session, account, "GooglePlay"); ok == true {
			return
		}
		// 挑选一个负载较低的agent
		agent := GateMgr().FindLowLoadGate()
		if agent == nil {
			errcode = "没有可用Gate"
			break
		}

		// 生成校验key，玩家简单信息发送到对应Gate,用于验证玩家登陆Gate合法
		now := util.CURTIMEMS()
		signbytes := []byte(fmt.Sprintf("<%d-%s>", now, account))
		md5array := md5.Sum(signbytes)
		md5bytes := []byte(md5array[:])
		md5string := fmt.Sprintf("%s_%x", account, md5bytes)

		sendmsg := &msg.L2GW_ReqRegistUser{
			Account : pb.String(account),
			Expire : pb.Int64(now+10000),	// 10秒
			Gatehost : pb.String(agent.Host()),
			Sid : pb.Int(session.Id()),
			Timestamp: pb.Int64(now),
			Verifykey : pb.String(md5string),
			Logintype : pb.String("GooglePlay"),
		}
		agent.SendMsg(sendmsg)
		Login().CheckInSetAdd(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus", session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, "", "GooglePlay"))
		session.Close()
	}
}
