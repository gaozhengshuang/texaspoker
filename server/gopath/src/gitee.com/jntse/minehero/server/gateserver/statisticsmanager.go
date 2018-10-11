package main
import (
	"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/redis"
	"github.com/go-redis/redis"
)

type StatisticsManager struct {
}

func (this *StatisticsManager) Init() {
	
}

func (this *StatisticsManager) GetPlayerRoleInfo(id int64) *msg.GW2C_RetPlayerRoleInfo{
	msg := &msg.GW2C_RetPlayerRoleInfo{}
	user := UserMgr().FindById(id)
	if user {
		msg.Roleid = pb.Int64(id)
		msg.Errcode = pb.String("")
		msg.Entity = pb.Clone(user.bin.GetEntity()).(*msg.EntityBase)
		msg.Vip = pb.Clone(user.bin.GetBase().GetVip()).(*msg.UserVip)
		msg.Statistics = pb.Clone(user.bin.GetBase().GetStatics()).(*msg.UserStatistics)
	} else {
		msg.Roleid = pb.Int64(id)
		msg.Errcode = pb.String("")
		key, entityInfo := fmt.Sprintf("userentity_%d", id), &msg.EntityBase{}
		if err = utredis.GetProtoBin(Redis(), key, entityInfo); err != nil {
			log.Error("加载玩家[%d] entity 数据失败", id)
		}
		msg.Entity = entityInfo
		key, vipInfo := fmt.Sprintf("uservip_%d", this.Id()), &msg.UserVip{}
		if err = utredis.GetProtoBin(Redis(), key, vipInfo); err != nil {
			log.Error("加载玩家[%d] vip 数据失败", id)
		}
		msg.Vip = vipInfo
		key, statisticsInfo := fmt.Sprintf("userstatistics_%d", this.Id()), &msg.UserStatistics{}
		if err = utredis.GetProtoBin(Redis(), key, statisticsInfo); err != nil {
			log.Error("加载玩家[%d] statistics 数据失败", id)
		}
		msg.Statistics = statisticsInfo
	}
	return msg;
}