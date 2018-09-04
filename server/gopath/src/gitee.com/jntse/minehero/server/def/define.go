package def

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	_"reflect"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"github.com/go-redis/redis"
	"strconv"
	"math"

	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
)

// 预定义redis key
const (
	RedisKeyAccountGate  = "account_gateinfo"
	RedisKeyGateAccounts = "gate_accounts"
	Earth_Radius = float64(6371.0)
)

// 组装带颜色字体的公告内容
func MakeNoticeText(text string, color string, size int32) string {
	return fmt.Sprintf(`<font color="%s" size=%d>%s</font>`, color, size, text)
}

// 发送短信
func SendSms(phone string) (authcode string) {

	// make body
	randcode := util.RandBetween(10000, 99999)
	body := fmt.Sprintf(`{
		"batchName":"巨枫娱乐测试",
		"content":"%s:%d",
		"msgType":"sms",
		"items":[ { "to":"%s" } ]
	}`, tbl.Global.Sms.AuthCodeContent, randcode, phone)

	// make properties
	Auth := tbl.Global.Sms.Account + ":" + util.MD5(tbl.Global.Sms.Passwd) // md5加密
	AuthBase64 := base64.StdEncoding.EncodeToString([]byte(Auth))          // base64加密
	Contentlength := strconv.FormatInt(int64(len(body)), 10)               // 这个参数可选
	ContentType := "application/json"
	properties := map[string]string{"Content-Type": ContentType, "Authorization": AuthBase64, "Content-length": Contentlength, "Accept": ContentType}

	// make request
	url := tbl.Global.Sms.URLAPI
	resp, err := network.HttpSendByProperty("POST", url, body, properties)
	if err != nil {
		log.Error("TestPostSms HttpPost phone=%s err=[%v]", phone, err)
		return ""
	}

	if resp.Code != 200 {
		log.Error("TestPostSms HttpPost phone=%s 失败 Code=%d", phone, resp.Code)
		return ""
	}

	type stHttpResp struct {
		Code string
		Msg  string
		UUID string
	}

	RespObj := &stHttpResp{}
	unerror := json.Unmarshal(resp.Body, RespObj)
	if unerror != nil {
		log.Error("TestPostSms Unmarshal resp.body失败 phone=%s err[%s]", phone, unerror)
		return ""
	}

	log.Trace("TestPostSms body=%s", resp.Body)
	log.Trace("TestPostSms RespObj=%#v", RespObj)
	log.Info("手机:%s 生成验证码:%d", phone, randcode)
	authcode = strconv.FormatInt(int64(randcode), 10)
	return authcode
}

// 有效的装备位置
func IsValidEquipPos(pos int32) bool {
	if pos >= int32(msg.ItemPos_Helmet) && pos <= int32(msg.ItemPos_LongClothes) {
		return true
	}
	return false
}

// 有效的道具位置
func IsValidItemPos(pos int32) bool {
	if IsValidEquipPos(pos) || pos == int32(msg.ItemPos_Bag) {
		return true
	}
	return false
}

// 生成room uuid
func GenerateRoomId(redis *redis.Client) (id int64, errcode string) {
	key := "uuid_room"
	id, err := redis.Incr(key).Result()
	if err != nil {
		log.Error("生成roomid redis报错, err: %s", err)
		return 0, "redis不可用"
	}
	return id, ""
}

func RedisKeyGateRooms(gate string) string {
	key := fmt.Sprintf("gate_%s_roomamount", gate)
	return key
}

//生成女仆的 uuid
func GenerateMaidId(redis *redis.Client) (id int64, errcode string) {
	key := "uuid_maid"
	id, err := redis.Incr(key).Result()
	if err != nil {
		log.Error("生成女仆uuid RedisError: %s", err)
		return 0, "redis不可用"
	}
	return id, ""
}


//生成房子的 uuid
func GenerateHouseId(redis *redis.Client) (id int64, errcode string) {
	key := "uuid_house"
	id, err := redis.Incr(key).Result()
	if err != nil {
		log.Error("生成houseid redis报错, err: %s", err)
		return 0, "redis不可用"
	}
	return id, ""
}

//生成车的 uuid
func GenerateCarId(redis *redis.Client) (id uint64,errcode string){
	key := "uuid_car"
	newid,err := redis.Incr(key).Result()
	if err != nil {
		log.Error("生成carid redis报错, err: %s",err)
		return 0,"redis不可用"
	}
	return uint64(newid),""
}

//生成车位的 uuid
func GenerateParkingId(redis *redis.Client) (id uint64,errcode string){
	key := "uuid_parking"
	newid,err := redis.Incr(key).Result()
	if err != nil {
		log.Error("生成parkingid redis报错, err: %s",err)
		return 0,"redis不可用"
	}
	return uint64(newid),""
}

func ConvertDegreesToRadians(degrees float64) float64 {
	return degrees * float64(math.Pi) / float64(180.0)
}

func ConvertRadiansToDegrees(radian float64) float64 {
	return radian * float64(180.0) / float64(math.Pi)
}

func HaverSin(theta float64) float64 {
	v := math.Sin(theta / 2)
	return v * v
}

//根据经纬度计算距离
func CalculateDistance(originlat float64,originlon float64,destlat float64,destlon float64) float64 {
	lat1 := ConvertDegreesToRadians(originlat)
	lon1 := ConvertDegreesToRadians(originlon)
	lat2 := ConvertDegreesToRadians(destlat)
	lon2 := ConvertDegreesToRadians(destlon)

	vLon := math.Abs(lon1 - lon2)
	vLat := math.Abs(lat1 - lat2)

	h := HaverSin(vLat) + math.Cos(lat1) * math.Cos(lat2) * HaverSin(vLon)

	distance := float64(2.0) * math.Asin(math.Sqrt(h)) * Earth_Radius
	return distance;
}

// --------------------------------------------------------------------------
/// @brief 检查target中是否包含obj
/// @param obj 检查的值
/// @param target 检查的目标
/// @param 效率低，不建议使用
///
/// @return 
// --------------------------------------------------------------------------
//func IsContainObj(obj interface{}, target interface{}) bool {
//    targetValue := reflect.ValueOf(target)
//    switch reflect.TypeOf(target).Kind() {
//    case reflect.Slice, reflect.Array:
//        for i := 0; i < targetValue.Len(); i++ {
//            if targetValue.Index(i).Interface() == obj {
//                return true
//            }
//        }
//    case reflect.Map:
//        if targetValue.MapIndex(reflect.ValueOf(obj)).IsValid() {
//            return true
//        }
//    }
//
//    return false
//}


