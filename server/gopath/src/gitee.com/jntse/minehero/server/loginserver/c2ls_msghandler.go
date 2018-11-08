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
	"errors"
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

	// 发
	//mh.msgparser.RegistSendProto(msg.L2C_RetLogin{})
	//mh.msgparser.RegistSendProto(msg.L2C_RetRegistAccount{})
}

func newL2C_RetLogin(reason string, ip string, port int, key string) *msg.L2C_RetLogin {
	send := &msg.L2C_RetLogin {
		Result : pb.Int32(1),
		Reason : pb.String(reason),
		Gatehost : &msg.IpHost {
		Ip : pb.String(ip),
		Port : pb.Int(port),
		},
		Verifykey : pb.String(key),
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
		if errcode = DirectRegistAccount(account, passwd); errcode != "" {
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
		if ok := QuickLogin(session, account); ok == true {
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
		}
		agent.SendMsg(sendmsg)
		Login().CheckInSetAdd(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus", session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, ""))
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
		if ok := QuickLogin(session, account); ok == true {
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
		}
		agent.SendMsg(sendmsg)
		Login().CheckInSetAdd(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus",session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, ""))
		session.Close()
	}
}

//苹果账号登录
func on_C2L_ReqLoginApple(session network.IBaseNetSession, message interface{}) {
	tmsg := message.(*msg.C2L_ReqLoginApple)
	openid, keyurl, signature, timestamp, salt :=  tmsg.GetOpenid(), tmsg.GetKeyurl(), tmsg.GetSignature(), tmsg.GetTimestamp(), tmsg.GetSalt()
	bundleid := "com.abcedf.wasd"
	cert := DownloadCert(keyurl)
	if cert == nil {
		log.Error("DownloadCert error")
		return
	}
	err := VerifySig(signature, openid, bundleid, salt, timestamp, cert)
	if err != nil {
		log.Error("apple login error VerifySig fail err:%s", err)
		return
	}
	log.Info("apple verify Success")

	//以下继续写苹果登录
	//...
	//...
}

//获取证书
func DownloadCert(url string) []byte {
	resp, err := http.Get(url)
	if err != nil {
		log.Error("url can not be reached %s,%s", url, err)
		return nil
	}

	if resp.StatusCode != http.StatusOK {
		log.Error("DownloadCert Error:%s",errors.New("ERROR_STATUS_NOT_OK"))
		return nil
	}
	body := resp.Body
	defer body.Close()
	content, err2 := ioutil.ReadAll(body)
	if err2 != nil {
		log.Error("url read error %s, %s", url, err2)
		return nil
	}
	return content

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
	openid, token :=  tmsg.GetOpenid(), tmsg.GetToken()
	log.Info("ReqLoginFaceBook openid: %s   token: %s", openid, token)
	account := fmt.Sprintf("facebook-%s",openid)
	errcode := ""
	appid := "509788029497020"  //应用id
	appsecret := "215495db0076b0778084d7b44d6655a1"         //应用秘钥
	url := fmt.Sprintf("https://graph.facebook.com/debug_token?access_token=%s|%s&input_token=%s", appid, appsecret, token)
	caCert := "../cert/wechat/cacert.pem" //后续修正
	certFile := "../cert/wechat/apiclient_cert.pem" //后续修正
	certKey := "../cert/wechat/apiclient_key.pem" //后续修正
	switch {
		default:
		resp, err := HttpsGet(url, caCert, certFile, certKey)
		if err != nil {
			log.Error("ReqLoginFaceBook HttpsGet Error :%s", err)
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
		
		if errcode = DirectRegistAccount(account, ""); errcode != "" {
			break
		}
		
		if Login().CheckInSetFind(account) == true {
			errcode = "同时登陆多个账户"
			break
		}

		// TODO: 从Redis获取账户缓存Gate信息，实现快速登陆
		log.Info("账户[%s]登陆Login ", account)
		if ok := QuickLogin(session, account); ok == true {
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
		}
		agent.SendMsg(sendmsg)
		Login().CheckInSetAdd(account, session)		// 避免同时登陆
		tm5 := util.CURTIMEUS()
		log.Info("登陆验证通过，请求注册玩家到Gate sid[%d] account[%s] host[%s] 登陆耗时%dus", session.Id(), account, agent.Host(), tm5-tm1)
		return
	}

	if errcode != "" {
		log.Info("账户:[%s] sid[%d] 登陆失败[%s]", account, session.Id(), errcode)
		session.SendCmd(newL2C_RetLogin(errcode, "", 0, ""))
		session.Close()
	}

}

func HttpsGet(url, cacert, cert, certkey string) (*network.HttpResponse, error) {
	// 加载根证书
	pool := x509.NewCertPool()
	caCrt, err := ioutil.ReadFile(cacert)
	if err != nil {
		return nil, fmt.Errorf("Read CA Cert File err:%s", err)
	}
	pool.AppendCertsFromPEM(caCrt)

	cliCrt, err := tls.LoadX509KeyPair(cert, certkey)
	if err != nil {
		return nil, fmt.Errorf("Loadx509keypair err:%s", err)
	}

	//tr := &http.Transport{
	//	TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	//}
	tr := &http.Transport {
		TLSClientConfig: &tls.Config {
			RootCAs:      pool,	// 如不指定使用默认根证书
			Certificates: []tls.Certificate{cliCrt},
		},
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
