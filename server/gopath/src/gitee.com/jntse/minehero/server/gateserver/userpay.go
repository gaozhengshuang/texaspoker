package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	pb "github.com/gogo/protobuf/proto"
	_"github.com/go-redis/redis"
	_"strconv"
	"strings"
	"gitee.com/jntse/gotoolkit/net"
	"net/http"
	"encoding/json"
	"crypto/tls"
	"io/ioutil"
	"time"
)

type HttpArguApplePayBase struct {
	Status int32
	Receipt map[string]interface{}
}

func HttpsGetSkipVerify(url  string) (*network.HttpResponse, error) {
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


func HttpsPostSkipVerifyByJson(url, body string) (*network.HttpResponse, error) {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}

	client := &http.Client{Transport: tr}
	req, err := http.NewRequest("POST", url, strings.NewReader(body))
	if err != nil { return nil, err }
	req.Header.Set("Content-Type", "application/json")


	// "The client must close the response body when finished with it"
	resp, err := client.Do(req)
	if err != nil {  return nil, err }
	defer resp.Body.Close()

	rbody, err := ioutil.ReadAll(resp.Body)
	if err != nil { return nil, err }
	return &network.HttpResponse{Code:resp.StatusCode, Status: resp.Status, Body: rbody}, nil
}


//谷歌支付验证
func (u *GateUser) OnGooglePayCheck(purchasetoken, productid, packageName, orderid string) {
	log.Info("OnGooglePayCheck uid:%d, productid:%s, purchasetoken:%s, packageName:%s, orderid:%s", u.Id(), productid, purchasetoken, packageName, orderid)
	send := &msg.GW2C_RetGooglePayCheck{}
	send.Purchasetoken = pb.String(purchasetoken)
	send.Productid = pb.String(productid)
	errorcode := ""
	if u.IsPayCheckForbidenUser() == true {
		log.Error("GooglePayCheck 玩家[%d] 恶意刷单", u.Id())
		errorcode = "check failed too much!"
		send.Errcode = pb.String(errorcode)
		u.SendMsg(send)
		return
	}
	errorcode = u.CheckGooglePayOrderRecord(orderid)
	if errorcode != "" {
		send.Errcode = pb.String(errorcode)
		u.SendMsg(send)
		return 
	}

	bfind := false
	client_id := ""
	client_secret := ""
	refresh_token := ""
	for _, v := range tbl.Google.GooglePayConfig {
		if v.Packagename == packageName {
			bfind = true
			client_id = v.Clientid
			client_secret = v.Clientsecret
			refresh_token = v.Refreshtoken
			break
		}
	}
	if bfind == false {
		errorcode = "packageName not find"
		log.Error("GooglePayCheck packageName not find packageName:%s ",packageName)
	} else {
		switch{
			default:
			var resp *network.HttpResponse
			var respinfo map[string]interface{}
	
			errorcode, resp = u.CheckPurchaseToken(purchasetoken, productid, packageName, client_id, client_secret, refresh_token)
			if errorcode != "" || resp == nil {
				break
			}
			strBody := util.BytesToString(resp.Body)
			log.Info("CheckPurchaseToken body:\n%s", strBody)
			
			respinfo = make(map[string]interface{})
			unerr := json.Unmarshal(resp.Body, &respinfo)
			if unerr != nil {
				log.Error("玩家[%d] GooglePayCheck 验证支付 json.Unmarshal 'status' Fail[%s] ", u.Id(), unerr)
				errorcode = "json.Unmarshal Fail"
				break
			}
			var statuscode int32 = int32(respinfo["purchaseState"].(float64))
			if statuscode != 0 {
				log.Error("玩家[%d] GooglePayCheck 订单验证失败 statuscode：%d", u.Id(), statuscode)
				errorcode = fmt.Sprintf("GooglePayCheck Fail purchaseState:%d", statuscode)
				u.IncrPayCheckFailCount()
				break
			}
			_orderId := ""
			if _, ok := respinfo["orderId"]; ok {
				_orderId = respinfo["orderId"].(string)
			}
			if _orderId != orderid {
				log.Error("玩家[%d] GooglePayCheck 订单验证失败 orderid不匹配 orderid:%s,  _orderId:%s", u.Id(), orderid, _orderId)
				errorcode = "orderid not same"
				u.IncrPayCheckFailCount()
				break
			}
			u.TakeGooglePayOrderRecord(productid, _orderId)
			if u.OnGooglePayCheckSuccess(productid, _orderId) == false {
				errorcode = fmt.Sprintf("take award fail productid:%s", productid)
				break
			}
		}
	}
	send.Errcode = pb.String(errorcode)
	u.SendMsg(send)
}


func (u *GateUser) HttpPostGetGooglePayToken(client_id, client_secret, refresh_token string) (errcode string, resp *network.HttpResponse) {
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
	resp, posterr := network.HttpsPostSkipVerify(urltoken, strbody)
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

func (u *GateUser) CheckPurchaseToken(purchasetoken, productid, packageName, client_id, client_secret, refresh_token string) (errcode string, resp *network.HttpResponse) {
	access_token, _err := Redis().Get(fmt.Sprintf("googlepay_access_token_%s", packageName)).Result()
	if _err != nil || access_token == "" {
		var respinfo map[string]interface{}
		errorcode, _resp := u.HttpPostGetGooglePayToken(client_id, client_secret, refresh_token)
		if errorcode != "" || _resp == nil {
			return errorcode, nil
		}
		unerr := json.Unmarshal(_resp.Body, &respinfo)
		if unerr != nil {
			log.Error("玩家[%d] GooglePayCheck 获取access_token json.Unmarshal 'status' Fail[%s] ", u.Id(), unerr)
			errorcode = "json.Unmarshal Fail"
			return errorcode, nil
		}
		access_token = respinfo["access_token"].(string)
		log.Info("GooglePayCheck refresh token get new access_token:%s", access_token)
		Redis().Set(fmt.Sprintf("googlepay_access_token_%s", packageName), access_token, 3600*time.Second)
	} 

	url := fmt.Sprintf("https://www.googleapis.com/androidpublisher/v3/applications/%s/purchases/products/%s/tokens/%s?access_token=%s",packageName, productid, purchasetoken, access_token)
	log.Info("CheckPurchaseToken url: %s", url)
	resp, err := HttpsGetSkipVerify(url)
	if err != nil {
		log.Error("CheckPurchaseToken HttpsGetSkipVerify Error :%s", err)
		return "CheckPurchaseToken HttpsGetSkipVerify Error", nil
	}
	if resp.Code != http.StatusOK {
		log.Error("ReqLoginGoogle CheckResponseError errcode:[%d] status:[%s]", resp.Code, resp.Status)
		strBody := util.BytesToString(resp.Body)
		log.Error("body:%s", strBody)
		return "CheckPurchaseToken Fail", nil
	}

	return "", resp
}

//服务器自己的支付订单记录 检查重复订单
func (u *GateUser) CheckGooglePayOrderRecord(orderid string) string {
	strkey := fmt.Sprintf("googlepay_%s", orderid)
	//检查是否重复订单
	orderexist, _ := Redis().Exists(strkey).Result()
	if orderexist == 1 {
		log.Error("玩家[%d] googlepay fail has same orderid :%s", u.Id(), orderid)
		return "Fail reduplicate orderid"
	}
	return ""
}

//服务器自己的支付订单记录
func (u *GateUser) TakeGooglePayOrderRecord(productid, orderid string) {
	strkey := fmt.Sprintf("googlepay_%s", orderid)
	//订单记录
	mfields := map[string]interface{}{"productid":productid, "uid":u.Id()}
	Redis().HMSet(strkey, mfields)
	log.Info("玩家[%d] google pay 支付成功创建订单记录 orderid:%s, productid%s", u.Id(), orderid, productid)
}

//支付确认成功之后发奖
func (u *GateUser) OnGooglePayCheckSuccess (productid, orderid string) bool {
	ss := strings.Split(productid,".")
	awardid := int32(util.Atoi(ss[len(ss) - 1]))
	log.Info("玩家[%d] google 支付购买商品 productid:%s, awardid:%d",u.Id(),  productid, awardid)

	if awardid != 0 {
		if u.GetActivityAwardByAwardId(awardid, "GooglePay付费购买") == true{
			log.Info("玩家[%d] google 支付购买商品发奖成功 productid:%s, awardid:%d, orderid:%s ", u.Id(), productid, awardid, orderid)
			config, _ := tbl.AwardBase.AwardById[awardid]
			amount := int32(config.CostNum[0])
			BiMgr().OnUserPay(u.Id(),amount)
			return true
		} else {
			log.Error("玩家[%d] google 支付购买商品发奖失败 productid:%s, awardid:%d, orderid:%s ", u.Id(), productid, awardid, orderid)
			return false
		}
	}else {
		log.Error("玩家[%d] google 支付购买商品发奖失败 没找到对应的award productid:%s, awardid:%d, orderid:%s ", u.Id(), productid, awardid, orderid)
		return false
	}
}

//apple支付验证 
func (u *GateUser) OnApplePayCheck (productIdentifier, state, receipt, transactionIdentifier, bundleid string, issandbox int32) {
	send := &msg.GW2C_RetApplePayCheck{}
	errcode := ""
	bfind := false
	for _, v := range tbl.Apple.AppleLoginBundleidArray {
		if v == bundleid {
			bfind = true
			break
		}
	}
	if bfind == false {
		errcode = "bundleid not find"
		send.Errcode = pb.String(errcode)
		u.SendMsg(send)
		return	
	}

	url := ""
	if issandbox == 0 {
		//正式地址
		url = tbl.Apple.ApplePayCheckURL.Paycheckurl
	} else {
		//沙箱地址
		url = tbl.Apple.ApplePayCheckURL.Paycheckurlsandbox
	}
	switch{
		default:
		mapset := make(map[string]interface{})
		mapset["receipt-data"] = receipt
		postbody, jsonerr := json.Marshal(mapset)
		
		if jsonerr != nil {
			log.Error("玩家[%d] json.Marshal err[%s]", u.Id(), jsonerr)
			errcode = "json.Marshal error"
			break
		}
		strbody := util.BytesToString(postbody)
		log.Info("OnApplePayCheck postbody:%s", strbody)
		resp, posterr := HttpsPostSkipVerifyByJson(url, strbody)
		if posterr != nil {
			log.Error("玩家[%d] OnApplePayCheck post error[%s] resp[%#v]", u.Id(), posterr, resp)
			errcode = "post error"
			break
		}
		if resp.Code != http.StatusOK {
			log.Error("玩家[%d] OnApplePayCheck post errcode[%d] status[%s]", u.Id(), resp.Code, resp.Status)
			errcode = "post error"
			break
		}
		log.Info("玩家[%d] OnApplePayCheck post 返回Body [%s]", u.Id(), util.BytesToString(resp.Body))
		
		objcmd := &HttpArguApplePayBase{} 
		objcmd.Receipt = make(map[string]interface{})
		objcmd.Receipt["bundle_id"] = ""
		objcmd.Receipt["product_id"] = ""
		objcmd.Receipt["transaction_id"] = ""
		objerror := json.Unmarshal(resp.Body, objcmd)
		if objerror != nil {
			log.Error("json.Unmarshal to HttpArguApplePayBase err[%s]", objerror)
			errcode = "json.Unmarshal error"
			break
		}
		if objcmd.Status != 0 {
			log.Error("玩家[%d] OnApplePayCheck 验证失败 status:%d", objcmd.Status)
			errcode = fmt.Sprintf("apple check fail status %d", objcmd.Status)
			break
		}
		if objcmd.Receipt["bundle_id"].(string) != bundleid {
			log.Error("玩家[%d] OnApplePayCheck bundle_id 不一致 bundle_id:%s  need:%s", objcmd.Receipt["bundle_id"], bundleid)
			errcode = "apple check bundle_id not same"
			break
		}
		if objcmd.Receipt["product_id"].(string) != productIdentifier {
			log.Error("玩家[%d] OnApplePayCheck product_id 不一致 product_id:%s  productIdentifier:%s", objcmd.Receipt["product_id"], productIdentifier)
			errcode = "apple check product_id not same"
			break
		}
		if objcmd.Receipt["transaction_id"].(string) != transactionIdentifier {
			log.Error("玩家[%d] OnApplePayCheck transaction_id 不一致 transaction_id:%s  transactionIdentifier:%s", objcmd.Receipt["transaction_id"], transactionIdentifier)
			errcode = "apple check transaction_id not same"
			break
		}
		//校验自己的订单是否有重复的
		errcode = u.CheckAndTakeApplePayOrderRecord(productIdentifier, transactionIdentifier)
		if errcode != "" {
			break
		}
		if u.OnApplePayCheckSuccess(productIdentifier, transactionIdentifier) == false {
			errcode = fmt.Sprintf("take award fail productid:%s", productIdentifier)
			break
		}
	}
	send.Errcode = pb.String(errcode)
	u.SendMsg(send)
}


//服务器自己的支付订单记录 检查与创建 防止重复刷单
func (u *GateUser) CheckAndTakeApplePayOrderRecord(productid, transactionid string) string {
	strkey := fmt.Sprintf("applepay_%s", transactionid)
	//检查是否重复订单
	orderexist, _ := Redis().Exists(strkey).Result()
	if orderexist == 1 {
		log.Error("玩家[%d] applepay fail has same transactionid :%s", u.Id(), transactionid)
		return "Fail reduplicate transactionid"
	}
	//订单记录
	mfields := map[string]interface{}{"productid":productid, "uid":u.Id()}
	Redis().HMSet(strkey, mfields)
	log.Info("玩家[%d] apple pay 支付成功创建订单记录 transactionid:%s, productid%s", u.Id(), transactionid, productid)
	return ""
}

//支付确认成功之后发奖
func (u *GateUser) OnApplePayCheckSuccess (productid, transactionid string) bool {
	ss := strings.Split(productid,".")
	awardid := int32(util.Atoi(ss[len(ss) - 1]))
	log.Info("玩家[%d] apple 支付购买商品 productid:%s, awardid:%d",u.Id(),  productid, awardid)
	
	if awardid != 0 {
		if u.GetActivityAwardByAwardId(awardid, "ApplePay付费购买") == true{
			log.Info("玩家[%d] apple 支付购买商品发奖成功 productid:%s, awardid:%d, transactionid:%s ", productid, awardid, transactionid)
			config, _ := tbl.AwardBase.AwardById[awardid]
			amount := int32(config.CostNum[0])
		BiMgr().OnUserPay(u.Id(),amount)
			return true
		} else {
			log.Error("玩家[%d] apple 支付购买商品发奖失败 productid:%s, awardid:%d, transactionid:%s ", productid, awardid, transactionid)
			return false
		}
	}else {
		log.Error("玩家[%d] apple 支付购买商品发奖失败 没找到对应的award productid:%s, awardid:%d, transactionid:%s ", productid, awardid, transactionid)
		return false
	}
}

//订单验证失败玩家验证限速 防止恶意刷单
func (u *GateUser) IncrPayCheckFailCount() {
	strkey := fmt.Sprintf("paycheckfail_%d", u.Id())
	Redis().Incr(strkey)
	Redis().Expire(strkey, 300*time.Second)
}

//检查是否是处在限制中 的玩家验证 如果判定5分钟内发起订单验证失败次数达到10次 则认为存在恶意刷单行为 返回true则5分钟内不许再发起验证
func (u *GateUser) IsPayCheckForbidenUser() bool {
	strkey := fmt.Sprintf("paycheckfail_%d", u.Id())
	failper300s, _ := Redis().Get(strkey).Int64()
	if failper300s >= 10 {
		return true
	}
	return false
}
