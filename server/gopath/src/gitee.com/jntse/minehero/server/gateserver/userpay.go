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
	client_id := tbl.Global.GooglePay.Clientid //"965099845816-mstu690p5nqe71us91k225iou7ghuk8s.apps.googleusercontent.com"
	client_secret := tbl.Global.GooglePay.Clientsecret //"DxXIJHSVZwo2eH9soS5M5XYO"
	refresh_token := tbl.Global.GooglePay.Refreshtoken //"1/wKz0Z5H1MiRnSHrvb4FhD0FI0x9rhRPGjA7UhL7dYgs"

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

func (u *GateUser) CheckPurchaseToken(purchasetoken, productid, accesstoken string) (errcode string, resp *network.HttpResponse) {
	packageName := tbl.Global.GooglePay.Packagename //"com.giantfun.texaspoker"
	url := fmt.Sprintf("https://www.googleapis.com/androidpublisher/v3/applications/%s/purchases/products/%s/tokens/%s?access_token=%s",packageName, productid, purchasetoken, accesstoken)
	log.Info("CheckPurchaseToken url: %s", url)
	resp, err := HttpsGetSkipVerify(url)
	if err != nil {
		log.Error("CheckPurchaseToken HttpsGetSkipVerify Error :%s", err)
		return "CheckPurchaseToken HttpsGetSkipVerify Error", nil
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

//apple支付验证 
func (u *GateUser) OnApplePayCheck (productIdentifier, state, receipt, transactionIdentifier string, issandbox int32) {
	send := &msg.GW2C_RetApplePayCheck{}
	errcode := ""
	url := ""
	if issandbox == 0 {
		//正式地址
		url = tbl.Global.Apple.Paycheckurl
	} else {
		//沙箱地址
		url = tbl.Global.Apple.Paycheckurlsandbox
	}
	switch{
		default:
		if state != "Purchased" {
			log.Error("玩家[%d] OnApplePayCheck state error state:%s", u.Id(), state)
			errcode = "state not Purchased"
			break
		}
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
		if objcmd.Receipt["bundle_id"].(string) != tbl.Global.Apple.Bundleid {
			log.Error("玩家[%d] OnApplePayCheck bundle_id 不一致 bundle_id:%s  need:%s", objcmd.Receipt["bundle_id"], tbl.Global.Apple.Bundleid)
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
		u.OnApplePayCheckSuccess(productIdentifier, transactionIdentifier)
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
func (u *GateUser) OnApplePayCheckSuccess (productid, transactionid string) {
	log.Info("玩家[%d] Apple 购买验证支付成功 productid:%s  transactionid:%s", productid, transactionid)
	//以下加入 根据商品id 发奖
	//...
	//...

}
