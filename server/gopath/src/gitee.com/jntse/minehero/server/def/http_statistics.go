package def
import (
	"net/http"
	"net/url"
	"strings"
	"strconv"
	"crypto/md5"
	"encoding/json"
	"encoding/xml"
	"sort"
	"fmt"
	"time"
	"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	"github.com/go-redis/redis"
)


func GetUserToken(redis *redis.Client, charid uint64) string {
	if redis == nil {
		log.Error("redis is nil")
		return ""
	}

	tokenkey := fmt.Sprintf("charid_%d_token", charid)
	token, err := redis.Get(tokenkey).Result()
	if err != nil {
		log.Error("redis get[%s] is err[%s]", tokenkey, err)
		return ""
	}

	return token
}

func HttpPostDataStatistics(charid uint64, mapset map[string]interface{}, sortVal, tvmid, url, secret, mode string) (errcode string, resp *network.HttpResponse) {
	if tbl.Global.IntranetFlag {
		log.Warn("本版本推送暂不可用")
		return "本版本推送暂不可用", nil
	}

	// 签名
	strtimestamp := strconv.FormatInt(mapset["timestamp"].(int64), 10)
	signtemp := mapset["key"].(string) + sortVal + mapset["nonce"].(string) + strtimestamp + secret 
	signbytes := []byte(signtemp)
	md5array := md5.Sum(signbytes)
	md5bytes := []byte(md5array[:])
	md5string := fmt.Sprintf("%x", md5bytes)
	mapset["sign"] = strings.ToLower(md5string)

	// 序列化
	postbody, jsonerr := json.Marshal(mapset)
	if jsonerr != nil {
		log.Error("[%s] 玩家[%d] json.Marshal err[%s]", mode, charid, jsonerr)
		return "json.Marshal Fail", nil
	}
	log.Trace("[%s] 玩家[%d] url[%s] postbody[%s]", mode, charid, url, postbody)

	// post
	resp, posterr := network.HttpPost(url, util.BytesToString(postbody))
	if posterr != nil {
		log.Error("[%s] 玩家[%d] 推送失败 error[%s] resp[%#v]", mode, charid, posterr, resp)
		return "HttpPost失败", nil
	}

	// response
	if resp.Code != http.StatusOK { 
		log.Info("[%s] 玩家[%d] 推送失败 errcode[%d] status[%s]", mode, charid, resp.Code, resp.Status)
		return "HttpPost ErrorCode", nil
	}
	log.Trace("[%s] 玩家[%d] 推送完成 [%s]", mode, charid, util.BytesToString(resp.Body))
	return "", resp
}


// 新建角色
func HttpRequestNewUserArglist(arglist []interface{}) []interface{} {
	if len(arglist) != 4 {
		return nil
	}
	tvmid, ok := arglist[0].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[0]).String()); return nil }

	token, ok := arglist[1].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[1]).String()); return nil }

	username, ok := arglist[2].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[2]).String()); return nil }

	charid, ok := arglist[3].(uint64)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[3]).String()); return nil }

	HttpRequestNewUser(tvmid,token,username,charid)
	return nil
}

func HttpRequestNewUser(tvmid, token, username string, charid uint64) {

	//url := "https://open.yx.tvyouxuan.com/public/finance/MultiRecharge"
	//url := "http://open.std.tvmopt.com/public/finance/MultiRecharge"
	url := tbl.Global.HongBaoAPI.CharacterCreation
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["game_role_id"] = strconv.FormatInt(int64(charid), 10)
	mapset["role_name"] = username
	mapset["role_create_time"] = time.Now().Format("2006-01-02")


	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "game_role_id")
	sortKeys = append(sortKeys, "role_name")
	sortKeys = append(sortKeys, "role_create_time")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys { 
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return
		}

	}

	HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "推送新用户")
}


// 推送在线时长，在线时间，单位分钟
func HttpRequestUserOnlineTimeArglist(arglist []interface{}) []interface{} {
	if len(arglist) != 4 {
		return nil
	}
	tvmid, ok := arglist[0].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[0]).String()); return nil }

	token, ok := arglist[1].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[1]).String()); return nil }

	charid, ok := arglist[2].(uint64)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[2]).String()); return nil }

	tm_online, ok := arglist[3].(int64)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[3]).String()); return nil }

	HttpRequestUserOnlineTime(tvmid, token, charid, tm_online)
	return nil
}
func HttpRequestUserOnlineTime(tvmid, token string, charid uint64, tm_online int64) {
	//token := GetUserToken(redis, charid)
	if token == "" {
		log.Error("玩家[%d] token is empty", charid)
		return
	}

	//url := "https://open.yx.tvyouxuan.com/public/finance/MultiRecharge"
	//url := "http://open.std.tvmopt.com/public/finance/MultiRecharge"
	url := tbl.Global.HongBaoAPI.Online
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["online_time"] = tm_online

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "online_time")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys { 
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return
		}

	}

	HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "推送在线时长")
}

// 推送战斗次数(开房间次数)
func HttpRequestUserBattleCountArglist(arglist []interface{}) []interface{} {
	if len(arglist) != 5 {
		return nil
	}
	tvmid, ok := arglist[0].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[0]).String()); return nil }

	token, ok := arglist[1].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[1]).String()); return nil }

	charid, ok := arglist[2].(uint64)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[2]).String()); return nil }

	playtype, ok := arglist[3].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[3]).String()); return nil }

	palycount, ok := arglist[4].(int32)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[4]).String()); return nil }

	HttpRequestUserBattleCount(tvmid, token, charid, playtype, palycount)
	return nil
}
func HttpRequestUserBattleCount(tvmid, token string, charid uint64, playtype string, palycount int32) {

	url := tbl.Global.HongBaoAPI.Battles
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["play_type"] = playtype
	mapset["play_count"] = int64(palycount)

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "play_type")
	sortKeys = append(sortKeys, "play_count")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys { 
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return
		}

	}

	HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "推送战斗次数")
}


// 推送角色等级
func HttpRequestUserLevelArglist(arglist []interface{}) []interface{} {
	if len(arglist) != 4 {
		return nil
	}
	tvmid, ok := arglist[0].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[0]).String()); return nil }

	token, ok := arglist[1].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[1]).String()); return nil }

	charid, ok := arglist[2].(uint64)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[2]).String()); return nil }

	level, ok := arglist[3].(uint32)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[3]).String()); return nil }

	HttpRequestUserLevel(tvmid, token, charid, level)
	return nil
}

func HttpRequestUserLevel(tvmid, token string, charid uint64, level uint32) {

	//url := "https://open.yx.tvyouxuan.com/public/finance/MultiRecharge"
	//url := "http://open.std.tvmopt.com/public/finance/MultiRecharge"
	url := tbl.Global.HongBaoAPI.CharacterLevel
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["game_role_id"] = strconv.FormatInt(int64(charid), 10)
	mapset["level"] = int64(level)


	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "game_role_id")
	sortKeys = append(sortKeys, "level")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys { 
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return
		}
	}

	HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "推送角色等级")
}


// 推送资源消耗，price 等值人民币金额，单位分
func HttpRequestUserResourceConsumeArglist(arglist []interface{}) []interface{} {
	if len(arglist) != 4 {
		return nil
	}
	tvmid, ok := arglist[0].(string)
	if ok == false { 
		log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[0]).String());
		return nil 
	}

	token, ok := arglist[1].(string)
	if ok == false { 
		log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[1]).String())
		return nil 
	}

	charid, ok := arglist[2].(uint64)
	if ok == false { 
		log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[2]).String())
		return nil 
	}

	price, ok := arglist[3].(uint32)
	if ok == false { 
		log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[3]).String())
		return nil 
	}

	HttpRequestUserResourceConsume(tvmid, token, charid, price)
	return nil
}

func HttpRequestUserResourceConsume(tvmid, token string, charid uint64, price uint32) {

	if price <= 0 {
		return
	}

	//url := "https://open.yx.tvyouxuan.com/public/finance/MultiRecharge"
	//url := "http://open.std.tvmopt.com/public/finance/MultiRecharge"
	url := tbl.Global.HongBaoAPI.ConsumeMoney
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["consume"] = int64(price)

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "consume")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys { 
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return
		}
	}

	HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "推送资源消耗")
}


// 推送资源获取，price 等值人民币金额，单位分
func HttpRequestUserResourceEarnArglist(arglist []interface{}) []interface{} {
	if len(arglist) != 4 {
		return nil
	}
	tvmid, ok := arglist[0].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[0]).String()); return nil }

	token, ok := arglist[1].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[1]).String()); return nil }

	charid, ok := arglist[2].(uint64)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[2]).String()); return nil }

	price, ok := arglist[3].(uint32)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[3]).String()); return nil }

	HttpRequestUserResourceEarn(tvmid, token, charid, price)
	return nil
}

func HttpRequestUserResourceEarn(tvmid, token string, charid uint64, price uint32) {

	if price <= 0 {
		return
	}
	//url := "https://open.yx.tvyouxuan.com/public/finance/MultiRecharge"
	//url := "http://open.std.tvmopt.com/public/finance/MultiRecharge"
	url := tbl.Global.HongBaoAPI.LootMoney
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["earm"] = int64(price)

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "earm")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys { 
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return
		}
	}

	HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "推送资源获取")
}


// 胜利次数,拿大奖次数
func HttpRequestUserVictoryArglist(arglist []interface{}) []interface{} {
	if len(arglist) != 5 {
		return nil
	}
	tvmid, ok := arglist[0].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[0]).String()); return nil }

	token, ok := arglist[1].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[1]).String()); return nil }

	charid, ok := arglist[2].(uint64)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[2]).String()); return nil }

	victype, ok := arglist[3].(string)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[3]).String()); return nil }

	count, ok := arglist[4].(int32)
	if ok == false { log.Fatal("类型转换错误 argu 真实类型是：%s", reflect.TypeOf(arglist[4]).String()); return nil }

	HttpRequestUserVictory(tvmid, token, charid, victype, count)
	return nil
}

func HttpRequestUserVictory(tvmid, token string, charid uint64, victype string, count int32) {

	//url := "https://open.yx.tvyouxuan.com/public/finance/MultiRecharge"
	//url := "http://open.std.tvmopt.com/public/finance/MultiRecharge"
	url := tbl.Global.HongBaoAPI.Victory
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["victory_type"] = victype 
	mapset["victory_count"] = int64(count)

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "victory_type")
	sortKeys = append(sortKeys, "victory_count")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys {
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return
		}
	}

	HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "推送胜利次数")
}

// 获得平台金币和钻石
func HttpRequestFinanceQuery(charid uint64, token, tvmid string) (errocde string, coin, diamond int32) {

	//url := "https://open.yx.tvyouxuan.com/public/finance/Query"
	//url := "http://open.std.tvmopt.com/public/finance/Query"
	url := tbl.Global.HongBaoAPI.FinanceQuery
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys {
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return "签名拼接参数错误", 0, 0
		}
	}

	errcode, resp := HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "查询平台货币")
	if errcode != "" || resp == nil {
		return errcode, 0, 0
	}

	// check status
	type stFinance struct {
		Coins int32
		Diamonds int32
	}
	type stFinanceResp struct {
		Status 	int32
		Data	stFinance
		Msg		string
	}
	
	var fResp stFinanceResp
	unerr := json.Unmarshal(resp.Body, &fResp)
	if unerr != nil {
		log.Info("玩家[%d] 查询平台金币 json.Unmarshal 'status' Fail[%s] ", charid, unerr)
		return "json.Unmarshal resp.Body 失败", 0, 0
	}

	if fResp.Status != 0 {
		log.Error("玩家[%d] 查询平台金币失败 status[%d] msg[%s]", charid, fResp.Status, fResp.Msg)
		return fResp.Msg, 0, 0
	}

	return "", fResp.Data.Coins, fResp.Data.Diamonds

	//var respinfo map[string]interface{}
	//unerr := json.Unmarshal(resp.Body, &respinfo)
	//if unerr != nil {
	//	log.Info("玩家[%d] 扣平台金币 json.Unmarshal 'status' Fail[%s] ", charid, unerr)
	//	return 0, 0
	//}

	//var statuscode int32 = int32(respinfo["status"].(float64))
	//if statuscode != 0 {
	//	log.Error("玩家[%d] 扣平台金币 status[%d] msg[%s]", charid, statuscode, respinfo["msg"])
	//	return 0, 0
	//}

	//moneypair, convertok := respinfo["data"].(map[string]interface{})
	//if convertok == false {
	//	panic(convertok)
	//}

	//return int32(moneypair["coins"].(float64)), int32(moneypair["diamonds"].(float64))
}

// 扣除平台金币
func HttpRequestDecrCoins(charid uint64, token, tvmid string, count int32, desc string) bool {

	//url := "https://open.yx.tvyouxuan.com/public/finance/DecrCoins"
	//url := "http://open.std.tvmopt.com/public/finance/DecrCoins"
	url := tbl.Global.HongBaoAPI.DecrCoins
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	order_id := strconv.FormatInt(int64(charid),10) + "_decrcoins_" + strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["order_id"] = order_id
	mapset["amount"] = int64(count)
	mapset["description"] = desc

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "order_id")
	sortKeys = append(sortKeys, "amount")
	sortKeys = append(sortKeys, "description")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys {
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return false
		}
	}

	errcode, resp := HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "扣平台金币")
	if errcode != "" || resp == nil {
		return false
	}

	// check status
	var respinfo map[string]interface{}
	unerr := json.Unmarshal(resp.Body, &respinfo)
	if unerr != nil {
		log.Info("玩家[%d] 扣平台金币 json.Unmarshal 'status' Fail[%s] ", charid, unerr)
		return false
	}

	// statuscode 非0 不一定是余额不足
	var statuscode int32 = int32(respinfo["status"].(float64))
	if statuscode != 0 {
		log.Error("玩家[%d] 扣平台金币 status[%d] msg[%s]", charid, statuscode, respinfo["msg"])
		return false
	}

	return true
}

// 增加钻石，需要绑定微信号
func HttpRequestIncrDiamonds(charid uint64, token, tvmid string, count int32, desc string) bool {

	//url := "https://open.yx.tvyouxuan.com/public/finance/IncrDiamonds"
	//url := "http://open.std.tvmopt.com/public/finance/IncrDiamonds"
	url := tbl.Global.HongBaoAPI.IncrDiamonds
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	order_id := strconv.FormatInt(int64(charid),10) + "_incrdiamonds_" + strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["tvmid"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["order_id"] = order_id
	mapset["amount"] = int64(count)
	mapset["description"] = desc

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "tvmid")
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "order_id")
	sortKeys = append(sortKeys, "amount")
	sortKeys = append(sortKeys, "description")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys {
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return false
		}
	}

	errcode, resp := HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "增加平台钻石")
	if errcode != "" || resp == nil {
		return false
	}

	// check status
	var respinfo map[string]interface{}
	unerr := json.Unmarshal(resp.Body, &respinfo)
	if unerr != nil {
		log.Info("玩家[%d] 增加平台钻石 json.Unmarshal 'status' Fail[%s] ", charid, unerr)
		return false
	}

	var statuscode int32 = int32(respinfo["status"].(float64))
	if statuscode != 0 {
		log.Error("玩家[%d] 增加平台钻石 status[%d] msg[%s]", charid, statuscode, respinfo["msg"])
		return false
	}

	return true
}


// 检查是否绑定微信
func HttpRequestCheckWechatBound(charid uint64, token, tvmid string) {

	//url := "https://open.yx.tvyouxuan.com/public/user/CheckWechatBound"
	//url := "http://open.std.tvmopt.com/public/user/CheckWechatBound"
	url := tbl.Global.HongBaoAPI.CheckWechatBound
	secret := tbl.Global.HongBaoAPI.Secret
	key := tbl.Global.HongBaoAPI.Key
	mapset := make(map[string]interface{})
	mapset["token"] = token
	mapset["phone"] = tvmid
	mapset["timestamp"] = util.CURTIME()
	mapset["key"] = key
	mapset["nonce"] = strconv.FormatInt(util.CURTIMEUS(), 10)

	// 除公共参数以外的内容，按键从小到大排序，将值拼接
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "token")
	sortKeys = append(sortKeys, "phone")
	sortKeys.Sort()
	sortVal := ""
	for _, v := range sortKeys {
		if str, ok := mapset[v].(string); ok == true {
			sortVal += str
		}else if num, ok := mapset[v].(int64); ok == true {
			sortVal += strconv.FormatInt(num, 10)
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return
		}
	}

	HttpPostDataStatistics(charid, mapset, sortVal, tvmid, url, secret, "检查绑定微信")
}

// 企业微信支付到个人
func HttpWechatCompanyPay(openid string, amount int64, reason string) string {
	if openid == "" {
		return "玩家微信openid是空"
	}

	//
	mapset := make(map[string]interface{})
	mapset["mch_appid"] = tbl.Global.Wechat.AppID
	mapset["mchid"] = tbl.Global.Wechat.Mchid
	//mapset["device_info"] = ""
	mapset["nonce_str"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["partner_trade_no"] = strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["openid"] = openid
	mapset["check_name"] = "NO_CHECK"
	//mapset["re_user_name"] = ""
	mapset["amount"] = amount
	mapset["desc"] = reason
	mapset["spbill_create_ip"] = "127.0.0.1"
	mapset["sign"] = ""

	//
	sortKeys := make(sort.StringSlice,0)
	sortKeys = append(sortKeys, "mch_appid")
	sortKeys = append(sortKeys, "mchid")
	sortKeys = append(sortKeys, "nonce_str")
	sortKeys = append(sortKeys, "partner_trade_no")
	sortKeys = append(sortKeys, "openid")
	sortKeys = append(sortKeys, "check_name")
	sortKeys = append(sortKeys, "amount")
	sortKeys = append(sortKeys, "desc")
	sortKeys = append(sortKeys, "spbill_create_ip")
	sortKeys.Sort()

	sortVal := ""
	for _, v := range sortKeys {
		if sortVal != "" { sortVal += "&" }
		if str, ok := mapset[v].(string); ok == true {
			keypair := v + "=" + str
			sortVal += keypair
		}else if num, ok := mapset[v].(int64); ok == true {
			keypair := v + "=" + strconv.FormatInt(num, 10)
			sortVal += keypair
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return "签名拼接参数失败"
		}
	}

	stringSignTemp := sortVal + "&key=" + tbl.Global.Wechat.PaySecret
	sign, md5string := "", util.MD5(stringSignTemp)
	sign = strings.ToUpper(md5string)
	//sign = util.SHA256(sign)	// HMAC-SHA256签名方式
	mapset["sign"] = sign

	//
	type OrderWechatPay struct {
		XMLName   xml.Name 		`xml:"xml"`
		Mch_appid 	string		`xml:"mch_appid"`
		Mchid		string   	`xml:"mchid"`
		Nonce_str	string   	`xml:"nonce_str"`
		Partner_trade_no string	`xml:"partner_trade_no"`
		Openid 		string		`xml:"openid"`
		Check_name 	string		`xml:"check_name"`
		Amount 		int64 		`xml:"amount"`
		Desc 		string 		`xml:"desc"`
		Spbill_create_ip string `xml:"spbill_create_ip"`
		Sign		string		`xml:"sign"`
	}

	order := &OrderWechatPay{}
	order.Mch_appid = mapset["mch_appid"].(string)
	order.Mchid = mapset["mchid"].(string)
	order.Nonce_str = mapset["nonce_str"].(string)
	order.Partner_trade_no = mapset["partner_trade_no"].(string)
	order.Openid = mapset["openid"].(string)
	order.Check_name = mapset["check_name"].(string)
	order.Amount = mapset["amount"].(int64)
	order.Desc = mapset["desc"].(string)
	order.Spbill_create_ip = mapset["spbill_create_ip"].(string)
	order.Sign = mapset["sign"].(string)

	//
	postbody, xmlerr := xml.MarshalIndent(order, "", "   ")
	if xmlerr != nil {
		log.Error("玩家[%s] xml.Marshal err[%s]", openid, xmlerr)
		return "xml.Marshal Fail"
	}
	log.Trace("玩家[%s] postbody=\n%s", openid, util.BytesToString(postbody))

	// post
	url := "https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers"
	caCert := "../cert/wechat/cacert.pem"
	certFile := "../cert/wechat/apiclient_cert.pem"
	certKey := "../cert/wechat/apiclient_key.pem"
	resp, posterr := network.HttpsPost(url, caCert, certFile, certKey, util.BytesToString(postbody))
	if posterr != nil {
		log.Error("玩家[%s] 推送失败 error[%s] resp[%#v]", openid, posterr, resp)
		return "HttpPost失败"
	}

	// response
	if resp.Code != http.StatusOK { 
		log.Info("玩家[%s] 推送失败 errcode[%d] status[%s]", openid, resp.Code, resp.Status)
		return "HttpPost ErrorCode"
	}
	log.Trace("玩家[%s] 推送完成 resp.body=\n%s", openid, util.BytesToString(resp.Body))
	return ""
}

// 获取微信AccessToken
func HttpWechatAccessToken() (string) {
	url := fmt.Sprintf("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",
		tbl.Global.Wechat.AppID, tbl.Global.Wechat.AppSecret)
	resp, geterr := network.HttpGet(url)
	if geterr != nil {
		log.Error("获取微信 AccessToken失败 error[%s] resp[%#v]", geterr, resp)
		return ""
	}

	if resp.Code != http.StatusOK { 
		log.Info("推送失败 errcode[%d] status[%s]", resp.Code, resp.Status)
		return ""
	}

	type RespAccessToken struct {
		Access_token string
		Expires_in int64
	}

	objResp := &RespAccessToken{}
	unerr := json.Unmarshal(resp.Body, objResp)
	if unerr != nil {
		log.Info("HttpWechatAccessToken json.Unmarshal Fail[%s] ", unerr)
		return ""
	}
	if objResp.Access_token != "" {
		//log.Trace("获取微信AccessToken成功[%#v]", objResp)
		return objResp.Access_token
	}

	log.Error("获取AccessToken失败返回错误 %s", resp.Body)
	return ""
}


// --------------------------------------------------------------------------
/// @brief 微信小游戏虚拟支付sig签名
/// @brief 坑：这里面不需要 access_token !!!
///
/// @param map[string]interface{}
///
/// @return 
// --------------------------------------------------------------------------
func WechatMiniGameSign(dataset *map[string]interface{}, RequestURI string) (errmsg string) {
	mapset := *dataset
	sortKeys := make(sort.StringSlice,0)
	//sortKeys = append(sortKeys, "openid")
	//sortKeys = append(sortKeys, "appid")
	//sortKeys = append(sortKeys, "offer_id")
	//sortKeys = append(sortKeys, "ts")
	//sortKeys = append(sortKeys, "zone_id")
	//sortKeys = append(sortKeys, "pf")
	//sortKeys = append(sortKeys, "bill_no")
	//sortKeys = append(sortKeys, "present_counts")
	for k, v := range mapset {  
		if v != "" { sortKeys = append(sortKeys, k) }
	}
	sortKeys.Sort()

	sortVal := ""
	for _, v := range sortKeys {
		if sortVal != "" { sortVal += "&" }
		if str, ok := mapset[v].(string); ok == true {
			keypair := v + "=" + str
			sortVal += keypair
		}else if num, ok := mapset[v].(int64); ok == true {
			keypair := v + "=" + strconv.FormatInt(num, 10)
			sortVal += keypair
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return "签名拼接参数失败"
		}
	}

	//stringSignTemp := sortVal + "&org_loc=/cgi-bin/midas/sandbox/getbalance&method=POST&secret=" + tbl.Global.WechatMiniGame.MidasSecret
	stringSignTemp := sortVal + "&org_loc=" + RequestURI + "&method=POST&secret=" + tbl.Global.WechatMiniGame.MidasSecret
	//log.Trace("\nGetBalance stringSignTemp=%s\n", stringSignTemp)
	sign := util.HMAC_SHA256(tbl.Global.WechatMiniGame.MidasSecret, stringSignTemp)	// HMAC-SHA256签名方式
	mapset["sig"] = sign
	return ""
}


// --------------------------------------------------------------------------
/// @brief 微信小游戏虚拟支付mp_sig签名
/// @brief 坑：这里面需要 access_token !!!
///
/// @param map[string]interface{}
///
/// @return 
// --------------------------------------------------------------------------
func WechatMiniGameSign_Mp(dataset *map[string]interface{}, redis *redis.Client, access_token, RequestURI string) (errmsg string) {
	mapset := *dataset
	sortKeys := make(sort.StringSlice,0)
	//sortKeys = append(sortKeys, "openid")
	//sortKeys = append(sortKeys, "appid")
	//sortKeys = append(sortKeys, "offer_id")
	//sortKeys = append(sortKeys, "ts")
	//sortKeys = append(sortKeys, "zone_id")
	//sortKeys = append(sortKeys, "pf")
	//sortKeys = append(sortKeys, "sig")
	//sortKeys = append(sortKeys, "present_counts")
	//sortKeys = append(sortKeys, "bill_no")
	for k, v := range mapset {
		if v != "" { sortKeys = append(sortKeys, k) }
	}
	sortKeys = append(sortKeys, "access_token")
	sortKeys.Sort()

	sortVal := ""
	for _, v := range sortKeys {
		if sortVal != "" { sortVal += "&" }
		if v == "access_token" {
			keypair := v + "=" + access_token
			sortVal += keypair
		}else if str, ok := mapset[v].(string); ok == true {
			keypair := v + "=" + str
			sortVal += keypair
		}else if num, ok := mapset[v].(int64); ok == true {
			keypair := v + "=" + strconv.FormatInt(num, 10)
			sortVal += keypair
		}else {
			log.Error("签名拼接参数[%s]的类型不是int64或者string", v )
			return "签名拼接参数失败"
		}
	}

	openid := mapset["openid"].(string)
	session_key, _ := redis.Get(fmt.Sprintf("wechat_openid_%s_sessionkey", openid)).Result()
	if session_key == "" {
		log.Error("获取openid[%s]的SessionKey失败", openid)
		return "找不到SessionKey"
	}

	//stringSignTemp := sortVal + "&org_loc=/cgi-bin/midas/sandbox/getbalance&method=POST&session_key=" + session_key
	stringSignTemp := sortVal + "&org_loc=" + RequestURI + "&method=POST&session_key=" + session_key
	//log.Trace("\nGetBalance stringSignTemp=%s\n", stringSignTemp)
	sign := util.HMAC_SHA256(session_key, stringSignTemp)	// HMAC-SHA256签名方式
	mapset["mp_sig"] = sign

	return ""
}


// --------------------------------------------------------------------------
/// @brief 微信小游戏获取请求连接的URI
///
/// @param string
///
/// @return 
// --------------------------------------------------------------------------
func WechatMiniGameGetRequestURI(rawurl string) (uri string, errmsg string) {
	u, err := url.Parse(rawurl)
	if err != nil {
		return "", "解析请求连接URI失败"
	}

	fulluri := u.RequestURI()
	index := strings.Index(fulluri, "?")
	if index == -1 {
		return "", "请求连接URI没有'?'符号"
	}

	return fulluri[:index], ""
}

// --------------------------------------------------------------------------
/// @brief 微信小游戏虚拟支付查询余额
///
/// @param redis.Client
/// @param 
/// @param string
///
/// @return 
// --------------------------------------------------------------------------
func HttpWechatMiniGameGetBalance(redis *redis.Client, openid string) (balance, save_amt int64, errmsg string) {
	if openid == "" {
		return 0, 0, "玩家微信openid是空"
	}

	//
	access_token := HttpWechatAccessToken()
	if access_token == "" {
		return 0, 0, "无法获取 access_token"
	}

	mapset := make(map[string]interface{})
	mapset["openid"] = openid
	mapset["appid"] = tbl.Global.Wechat.AppID
	mapset["offer_id"] = tbl.Global.WechatMiniGame.MidasOfferID
	mapset["ts"] = util.CURTIME()
	mapset["zone_id"] = "1"
	mapset["pf"] = "android"
	//mapset["user_ip"] = ""
	mapset["sig"] = ""
	//mapset["access_token"] = access_token	// 不需要！
	mapset["mp_sig"] = ""

	// 获取URI
	rawurl := tbl.Global.WechatMiniGame.MidasBalance + access_token
	RequestURI, errmsg := WechatMiniGameGetRequestURI(rawurl)
	if errmsg != "" {
		return 0, 0, errmsg
	}


	// 坑：这里面不需要 access_token
	if errmsg := WechatMiniGameSign(&mapset, RequestURI); errmsg != "" {
		return 0, 0, errmsg
	}

	// 坑：这里面需要 access_token
	if errmsg := WechatMiniGameSign_Mp(&mapset, redis, access_token, RequestURI); errmsg != "" {
		return 0, 0, errmsg
	}

	// 序列化
	postbody, jsonerr := json.Marshal(mapset)
	if jsonerr != nil {
		log.Error("玩家[%s] json.Marshal err[%s]", openid, jsonerr)
		return 0, 0, "json.Marshal Fail"
	}
	//log.Trace("玩家[%s] rawurl[%s] postbody[%s]", openid, rawurl, postbody)


	// post
	resp, posterr := network.HttpPost(rawurl, util.BytesToString(postbody))
	if posterr != nil {
		log.Error("玩家[%s] 推送失败 error[%s] resp[%#v]", openid, posterr, resp)
		return 0, 0, "HttpPost失败"
	}

	// response
	if resp.Code != http.StatusOK { 
		log.Info("玩家[%s] 推送失败 errcode[%d] status[%s]", openid, resp.Code, resp.Status)
		return 0, 0, "HttpPost ErrorCode"
	}
	log.Trace("玩家[%s] 推送完成 resp.body=\n%s", openid, util.BytesToString(resp.Body))


	// 解析
	type RespUserBalance struct {
		Errcode	int64 	// 错误码
		Errmsg	string  // 错误信息
		Balance	int64 	// 游戏币个数（包含赠送）
		Ben_balance	int64 	// 赠送游戏币数量（赠送游戏币数量）
		First_save	int64 	// 是否满足历史首次充值
		Save_amt	int64 	// 累计充值金额的游戏币数量
		Save_sum	int64 	// 历史总游戏币金额
		Cost_sum	int64 	// 历史总消费游戏币金额
		Present_sum	int64 	// 历史累计收到赠送金额
	}
	objResp := &RespUserBalance{}
	unerr := json.Unmarshal(resp.Body, objResp)
	if unerr != nil {
		log.Info("HttpWechatAccessToken json.Unmarshal Fail[%s] ", unerr)
		return 0, 0, "json.Unmarsha失败"
	}

	if objResp.Errcode != 0 {
		log.Error("微信端返回错误 errcode[%d] objResp[%#v]", objResp.Errcode, objResp)
		return 0, 0, "微信端返回错误"
	}

	return objResp.Balance, objResp.Save_amt, ""
}


// --------------------------------------------------------------------------
/// @brief 微信小游戏虚拟支付赠送金币 
///
/// @param redis.Client
/// @param 
/// @param string
///
/// @return 
// --------------------------------------------------------------------------
func HttpWechatMiniGamePresentMoney(redis *redis.Client, openid string, count int64) (int64, string) {
	if openid == "" {
		return 0, "玩家微信openid是空"
	}

	//
	access_token := HttpWechatAccessToken()
	if access_token == "" {
		return 0, "无法获取 access_token"
	}

	mapset := make(map[string]interface{})
	mapset["openid"] = openid
	mapset["appid"] = tbl.Global.Wechat.AppID
	mapset["offer_id"] = tbl.Global.WechatMiniGame.MidasOfferID
	mapset["ts"] = util.CURTIME()
	mapset["zone_id"] = "1"
	mapset["pf"] = "android"
	//mapset["user_ip"] = ""
	mapset["sig"] = ""
	//mapset["access_token"] = access_token		// 不需要！
	mapset["mp_sig"] = ""
	mapset["bill_no"] = "bill_no_" + strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["present_counts"] = count

	// 获取URI
	rawurl := tbl.Global.WechatMiniGame.MidasPresent + access_token
	RequestURI, errmsg := WechatMiniGameGetRequestURI(rawurl)
	if errmsg != "" {
		return 0, errmsg
	}


	// 坑：这里面不需要 access_token
	if errmsg := WechatMiniGameSign(&mapset, RequestURI); errmsg != "" {
		return 0, errmsg
	}

	// 坑：这里面需要 access_token
	if errmsg := WechatMiniGameSign_Mp(&mapset, redis, access_token, RequestURI); errmsg != "" {
		return 0, errmsg
	}

	// 序列化
	postbody, jsonerr := json.Marshal(mapset)
	if jsonerr != nil {
		log.Error("玩家[%s] json.Marshal err[%s]", openid, jsonerr)
		return 0, "json.Marshal Fail"
	}
	//log.Trace("玩家[%s] rawurl[%s] postbody[%s]", openid, rawurl, postbody)


	// post
	resp, posterr := network.HttpPost(rawurl, util.BytesToString(postbody))
	if posterr != nil {
		log.Error("玩家[%s] 推送失败 error[%s] resp[%#v]", openid, posterr, resp)
		return 0, "HttpPost失败"
	}

	// response
	if resp.Code != http.StatusOK { 
		log.Info("玩家[%s] 推送失败 errcode[%d] status[%s]", openid, resp.Code, resp.Status)
		return 0, "HttpPost ErrorCode"
	}
	log.Trace("玩家[%s] 推送完成 resp.body=\n%s", openid, util.BytesToString(resp.Body))


	// 解析
	type RespPresent struct {
		Errcode	int64 	// 错误码
		Errmsg	string  // 错误信息
		Balance	int64 	// 游戏币个数（包含赠送）
		Bill_no string 	// 赠送游戏币数量（赠送游戏币数量）
	}
	objResp := &RespPresent{}
	unerr := json.Unmarshal(resp.Body, objResp)
	if unerr != nil {
		log.Info("HttpWechatMiniGamePresentMoney json.Unmarshal Fail[%s] ", unerr)
		return 0, "json.Unmarsha失败"
	}

	if objResp.Errcode != 0 {
		log.Error("微信端返回错误 errcode[%d] objResp[%+v]", objResp.Errcode, *objResp)
		return 0, "微信端返回错误"
	}

	return objResp.Balance, ""
}


// --------------------------------------------------------------------------
/// @brief 微信小游戏虚拟支付扣除金币 
///
/// @param redis.Client
/// @param 
/// @param string
///
/// @return 
// --------------------------------------------------------------------------
func HttpWechatMiniGamePayMoney(redis *redis.Client, openid string, count int64) (balance int64, errmsg string) {
	if openid == "" {
		return 0, "玩家微信openid是空"
	}

	//
	access_token := HttpWechatAccessToken()
	if access_token == "" {
		return 0, "无法获取 access_token"
	}

	mapset := make(map[string]interface{})
	mapset["openid"] = openid
	mapset["appid"] = tbl.Global.Wechat.AppID
	mapset["offer_id"] = tbl.Global.WechatMiniGame.MidasOfferID
	mapset["ts"] = util.CURTIME()
	mapset["zone_id"] = "1"
	mapset["pf"] = "android"
	//mapset["user_ip"] = ""
	mapset["sig"] = ""
	//mapset["access_token"] = access_token		// 不需要！
	mapset["mp_sig"] = ""
	mapset["bill_no"] = "pay_bill_no_" + strconv.FormatInt(util.CURTIMEUS(), 10)
	mapset["amt"] = count
	//mapset["pay_item"] = ""
	//mapset["app_remark"] = ""

	// 获取URI
	rawurl := tbl.Global.WechatMiniGame.MidasPay + access_token
	RequestURI, errmsg := WechatMiniGameGetRequestURI(rawurl)
	if errmsg != "" {
		return 0, errmsg
	}


	// 坑：这里面不需要 access_token
	if errmsg := WechatMiniGameSign(&mapset, RequestURI); errmsg != "" {
		return 0, errmsg
	}

	// 坑：这里面需要 access_token
	if errmsg := WechatMiniGameSign_Mp(&mapset, redis, access_token, RequestURI); errmsg != "" {
		return 0, errmsg
	}

	// 序列化
	postbody, jsonerr := json.Marshal(mapset)
	if jsonerr != nil {
		log.Error("玩家[%s] json.Marshal err[%s]", openid, jsonerr)
		return 0, "json.Marshal Fail"
	}
	//log.Trace("玩家[%s] rawurl[%s] postbody[%s]", openid, rawurl, postbody)
	log.Trace("玩家[%s] 微信小游戏虚拟支付扣除金币", openid)


	// post
	resp, posterr := network.HttpPost(rawurl, util.BytesToString(postbody))
	if posterr != nil {
		log.Error("玩家[%s] 推送失败 error[%s] resp[%#v]", openid, posterr, resp)
		return 0, "HttpPost失败"
	}

	// response
	if resp.Code != http.StatusOK { 
		log.Info("玩家[%s] 推送失败 errcode[%d] status[%s]", openid, resp.Code, resp.Status)
		return 0, "HttpPost ErrorCode"
	}
	//log.Trace("玩家[%s] 推送完成 resp.body=\n%s", openid, util.BytesToString(resp.Body))


	// 解析
	type RespPresent struct {
		Errcode	int64 	// 错误码
		Errmsg	string  // 错误信息
		Bill_no string 	// 赠送游戏币数量（赠送游戏币数量）
		Balance	int64 	// 游戏币个数（包含赠送）
		used_gen_balance int64	// 本次扣的赠送币的余额
	}
	objResp := &RespPresent{}
	unerr := json.Unmarshal(resp.Body, objResp)
	if unerr != nil {
		log.Info("HttpWechatMiniGamePayMoney json.Unmarshal Fail[%s] ", unerr)
		return 0, "json.Unmarsha失败"
	}

	if objResp.Errcode != 0 {
		log.Error("微信端返回错误 errcode[%d] objResp[%+v]", objResp.Errcode, *objResp)
		return 0, "微信端返回错误"
	}

	return objResp.Balance, ""
}

