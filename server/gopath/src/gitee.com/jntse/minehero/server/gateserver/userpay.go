package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	_"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_"github.com/go-redis/redis"
	_"strconv"
	"strings"
	"gitee.com/jntse/gotoolkit/net"
	"net/http"
	"encoding/json"
	"crypto/tls"
	"io/ioutil"
)

func HttpsGet(url, cacert, cert, certkey string) (*network.HttpResponse, error) {
	// 加载根证书
	/*
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
	*/
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	/*
	tr := &http.Transport {
		TLSClientConfig: &tls.Config {
			RootCAs:      pool,	// 如不指定使用默认根证书
			Certificates: []tls.Certificate{cliCrt},
		},
	}
	*/
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

func HttpsPost(url, cacert, cert, certkey, body string) (*network.HttpResponse, error) {
	// 加载根证书
	/*
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
	*/
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	/*
	tr := &http.Transport {
		TLSClientConfig: &tls.Config {
			RootCAs:      pool,	// 如不指定使用默认根证书
			Certificates: []tls.Certificate{cliCrt},
		},
	}
	*/

	client := &http.Client{Transport: tr}
	req, err := http.NewRequest("POST", url, strings.NewReader(body))
	if err != nil { return nil, err }

	// "The client must close the response body when finished with it"
	resp, err := client.Do(req)
	if err != nil {  return nil, err }
	defer resp.Body.Close()

	rbody, err := ioutil.ReadAll(resp.Body)
	if err != nil { return nil, err }
	return &network.HttpResponse{Code:resp.StatusCode, Status: resp.Status, Body: rbody}, nil
}

//谷歌支付验证
func (u *GateUser) OnGooglePayCheck(purchasetoken, productid string) {
	log.Info("OnGooglePayCheck uid:%d, productid:%s, purchasetoken:%s", u.Id(), productid, purchasetoken)
	send := &msg.GW2C_RetGooglePayCheck{}
	send.Purchasetoken = pb.String(purchasetoken)
	send.Productid = pb.String(productid)
	errorcode := ""
	switch{
		default:
		var resp *network.HttpResponse
		var respinfo map[string]interface{}

		errorcode, resp = u.HttpPostGetGooglePayToken()
		if errorcode != "" || resp == nil {
			break
		}
		unerr := json.Unmarshal(resp.Body, &respinfo)
		if unerr != nil {
			log.Error("玩家[%d] GooglePayCheck 获取access_token json.Unmarshal 'status' Fail[%s] ", u.Id(), unerr)
			errorcode = "json.Unmarshal Fail"
			break
		}
		access_token := respinfo["access_token"].(string)
		log.Info("GooglePayCheck access_token:%s", access_token)
		errorcode, resp = u.CheckPurchaseToken(purchasetoken, productid, access_token)
		if errorcode != "" || resp == nil {
			break
		}
		strBody := util.BytesToString(resp.Body)
		log.Info("CheckPurchaseToken body:\n%s", strBody)
		
		respinfo = make(map[string]interface{})
		unerr = json.Unmarshal(resp.Body, &respinfo)
		if unerr != nil {
			log.Error("玩家[%d] GooglePayCheck 验证支付 json.Unmarshal 'status' Fail[%s] ", u.Id(), unerr)
			errorcode = "json.Unmarshal Fail"
			break
		}
		var statuscode int32 = int32(respinfo["purchaseState"].(int))
		if statuscode != 1 {
			log.Error("玩家[%d] GooglePayCheck 订单验证失败 statuscode：%d", u.Id(), statuscode)
			errorcode = fmt.Sprintf("GooglePayCheck Fail purchaseState:%d", statuscode)
			break
		}
		orderId := ""
		if _, ok := respinfo["orderId"]; ok {
			orderId = respinfo["orderId"].(string)
		}
		errorcode = u.CheckAndTakeGooglePayOrderRecord(productid, orderId)
		if errorcode != "" {
			break
		}
		u.OnGooglePayCheckSuccess(productid, orderId)
	}
	send.Errcode = pb.String(errorcode)
	u.SendMsg(send)
}


func (u *GateUser) HttpPostGetGooglePayToken() (errcode string, resp *network.HttpResponse) {
	client_id := "894411058463-lnhrmgu4nciseebinjao2emtjjro917q.apps.googleusercontent.com"
	client_secret := "LYPTfBS4ULrhhcmw7WnqAhPv"
	refresh_token := "1/4dNZXZrvUoplTizo57t4Gn0TTA8_yI-NCX6BPwYHa9lZCDUNWTcshxjfh3bCvfkz"
	mapset := make(map[string]interface{})
	urltoken := "https://accounts.google.com/o/oauth2/token" 
	mapset["client_id"] = client_id
	mapset["client_secret"] = client_secret
	mapset["grant_type"] = "refresh_token"
	mapset["refresh_token"] = refresh_token
	postbody, jsonerr := json.Marshal(mapset)
	
	if jsonerr != nil {
		log.Error("玩家[%d] json.Marshal err[%s]", u.Id(), jsonerr)
		return "json.Marshal Fail", nil
	}
	strbody := util.BytesToString(postbody)
	log.Info("HttpPostGetGooglePayToken   postbody:%s", strbody)
	//resp, posterr := network.HttpsPost(urltoken, strbody)
	resp, posterr := HttpsPost(urltoken,"","","",strbody)
	if posterr != nil {
		log.Error("玩家[%d] GooglePayCheck post获取token失败 error[%s] resp[%#v]", u.Id(), posterr, resp)
		return "token HttpPost Fail", nil
	}
	if resp.Code != http.StatusOK {
		log.Error("玩家[%d] GooglePayCheck errcode[%d] status[%s]", u.Id(), resp.Code, resp.Status)
		return "token HttpPost GetErrorCode", nil
	}
	log.Info("玩家[%d] GooglePayCheck 获取access_token 返回Body [%s]", u.Id(), util.BytesToString(resp.Body))
	return "", resp

}

func (u *GateUser) CheckPurchaseToken(purchasetoken, productid, accesstoken string) (errcode string, resp *network.HttpResponse) {
	packageName := "com.giantfun.texaspoker"
	url := fmt.Sprintf("https://www.googleapis.com/androidpublisher/v3/applications/%s/purchases/products/%s/tokens/%s?access_token=%s",packageName, productid, purchasetoken, accesstoken)
	log.Info("CheckPurchaseToken url: %s", url)
	resp, err := HttpsGet(url, "", "", "")
	if err != nil {
		log.Error("CheckPurchaseToken HttpsGet Error :%s", err)
		return "CheckPurchaseToken HttpsGet Error", nil
	}
	if resp.Code != http.StatusOK {
		log.Error("ReqLoginGoogle CheckResponseError errcode:[%d] status:[%s]", resp.Code, resp.Status)
		return "CheckPurchaseToken Fail", nil
	}

	return "", resp
}

//服务器自己的支付订单记录 检查与创建 防止重复刷单
func (u *GateUser) CheckAndTakeGooglePayOrderRecord(productid, orderid string) string {
	strkey := fmt.Sprintf("googlepay_%s", orderid)
	//检查是否重复订单
	orderexist, _ := Redis().Exists(strkey).Result()
	if orderexist == 1 {
		log.Error("玩家[%d] googlepay fail has same orderid :%s", u.Id(), orderid)
		return "Fail reduplicate orderid"
	}
	//订单记录
	mfields := map[string]interface{}{"productid":productid, "uid":u.Id()}
	Redis().HMSet(strkey, mfields)
	log.Info("玩家[%d] google pay 支付成功创建订单记录 orderid:%s, productid%s", u.Id(), orderid, productid)
	return ""
}

//支付确认成功之后发奖
func (u *GateUser) OnGooglePayCheckSuccess (productid, orderid string) {
	log.Info("玩家[%d] google 购买验证支付成功 productid:%s  orderid:%s", productid, orderid)
	//以下加入 根据商品id 发奖
	//...
	//...

}


