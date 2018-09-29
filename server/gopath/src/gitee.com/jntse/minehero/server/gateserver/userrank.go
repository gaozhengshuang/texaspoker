package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	_ "gitee.com/jntse/gotoolkit/net"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"
	"strconv"
	_ "strings"
)

//排行榜每条记录信息
type UserRankInfo struct {
	uid    int64
	name   string
	sex    int32
	rank   int32
	score  int32
	head   string
	change int32
}

//排行榜管理器
type RankManager struct {
	goldranklist    []*UserRankInfo
	levelranklist   []*UserRankInfo
	lastrefreshtime int64
}

func (u *RankManager) Init() {
	u.goldranklist = make([]*UserRankInfo, 0)
	u.levelranklist = make([]*UserRankInfo, 0)
	u.UpdateGoldRankList()
	u.UpdateLevelRankList()
	u.lastrefreshtime = util.CURTIME()
}

//Tick
func (u *RankManager) Tick() {
	now := util.CURTIME()
	if now-u.lastrefreshtime >= 300 {
		u.UpdateGoldRankList()
		u.UpdateLevelRankList()
		u.lastrefreshtime = now
	}
}

//刷新金币排行榜
func (u *RankManager) UpdateGoldRankList() {
	//nowms := util.CURTIMEMS()
	u.goldranklist = make([]*UserRankInfo, 0)
	picklist, err := Redis().ZRevRangeWithScores("zGoldRank", 0, 49).Result()
	if err != nil {
		log.Error("刷新金币排行榜 读榜 redis 出错")
		return
	}
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for k, v := range picklist {
		data := &UserRankInfo{}
		uidstr := v.Member.(string)
		data.uid, _ = strconv.ParseInt(uidstr, 10, 32)
		data.score = int32(v.Score)
		data.rank = int32(k + 1)
		u.goldranklist = append(u.goldranklist, data)
		key := fmt.Sprintf("charbase_%d", data.uid)
		pipe.HMGet(key, "name", "face", "sex")
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("刷新金币排行榜 批量读取玩家信息 redis 出错:%s", err)
		return
	}
	for k, v := range cmds {
		if v.Err() != nil && v.Err() == redis.Nil {
			log.Error("刷新金币排行榜 读取单个玩家信息 redis 出错:%s", v.Err())
			continue
		}
		vals, err2 := v.(*redis.SliceCmd).Result()
		if err2 != nil && err == redis.Nil {
			log.Error("刷新金币排行榜 读取单个玩家信息 redis 出错:%s", err2)
			continue
		}
		if len(vals) < 3 {
			log.Error("刷新金币排行榜 读取单个玩家信息 字段个数不对")
			continue
		}
		if name, ok := vals[0].(string); ok {
			u.goldranklist[k].name = name
		} else {
			log.Error("刷新金币排行榜 读取单个玩家名字异常 uid:%d", u.goldranklist[k].uid)
		}

		if head, ok := vals[1].(string); ok {
			u.goldranklist[k].head = head
		} else {
			log.Error("刷新金币排行榜 读取单个玩家头像异常 uid:%d", u.goldranklist[k].uid)
		}
		if sexstr, ok := vals[2].(string); ok {
			sex, _ := strconv.ParseInt(sexstr, 10, 32)
			u.goldranklist[k].sex = int32(sex)
		} else {
			log.Error("刷新金币排行榜 读取单个玩家性别异常 uid:%d", u.goldranklist[k].uid)
		}
	}
	//passtime := util.CURTIMEMS() - nowms
	//log.Info("金币排行榜刷新 耗时 %d 毫秒", passtime)

}

//刷新等级排行榜
func (u *RankManager) UpdateLevelRankList() {
	//nowms := util.CURTIMEMS()
	//
	//passtime := util.CURTIMEMS() - nowms
	//log.Info("等级排行榜刷新 耗时 %d 毫秒", passtime)
}

func (u *RankManager) GetRankListByType(_type, _rank int32) []*UserRankInfo {
	if _type == 1 {
		return u.goldranklist
	}

	return make([]*UserRankInfo, 0)
}

//同步玩家金币到redis
func (u *GateUser) SyncGoldRankRedis() {
	zMem := redis.Z{Score: float64(u.GetGold()), Member: u.Id()}
	Redis().ZAdd("zGoldRank", zMem)
}

//同步玩家等级到redis
func (u *GateUser) SyncLevelRankRedis() {
	zMem := redis.Z{Score: float64(u.Level()), Member: u.Id()}
	Redis().ZAdd("zLevelRank", zMem)
}

//玩家请求查看排行榜
func (u *GateUser) ReqRankListByType(_type, _rank int32) {
	send := &msg.GW2C_RetRankList{}
	if _type == 1 {
		//金币排行榜
		List := RankMge().GetRankListByType(_type, _rank)
		for _, v := range List {
			tmp := &msg.RankInfo{}
			tmp.Roleid = pb.Int64(v.uid)
			tmp.Name = pb.String(v.name)
			tmp.Sex = pb.Int32(v.sex)
			tmp.Rank = pb.Int32(v.rank)
			tmp.Score = pb.Int32(v.score)
			tmp.Head = pb.String(v.head)
			send.Ranklist = append(send.Ranklist, tmp)
		}
	}
	u.SendMsg(send)
}
