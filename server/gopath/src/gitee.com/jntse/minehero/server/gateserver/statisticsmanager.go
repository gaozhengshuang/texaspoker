package main
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/redis"
)

type StatisticsManager struct {
}

func (this *StatisticsManager) Init() {

}

func (this *StatisticsManager) GetPlayerRoleInfo(id int64) *msg.GW2C_RetPlayerRoleInfo{
	send := &msg.GW2C_RetPlayerRoleInfo{}
	user := UserMgr().FindById(id)
	if user != nil {
		send.Roleid = pb.Int64(id)
		send.Errcode = pb.String("")
		send.Entity = pb.Clone(user.bin.GetEntity()).(*msg.EntityBase)
		send.Vip = pb.Clone(user.bin.GetBase().GetVip()).(*msg.UserVip)
		send.Statistics = pb.Clone(user.statistics.PackBin()).(*msg.UserStatistics)
	} else {
		send.Roleid = pb.Int64(id)
		send.Errcode = pb.String("")
		key, entityInfo := fmt.Sprintf("userentity_%d", id), &msg.EntityBase{}
		if err := utredis.GetProtoBin(Redis(), key, entityInfo); err != nil {
			log.Error("加载玩家[%d] entity 数据失败", id)
		}
		send.Entity = entityInfo
		key, vipInfo := fmt.Sprintf("uservip_%d", id), &msg.UserVip{}
		if err := utredis.GetProtoBin(Redis(), key, vipInfo); err != nil {
			log.Error("加载玩家[%d] vip 数据失败", id)
		}
		send.Vip = vipInfo
		key, statisticsInfo := fmt.Sprintf("userstatistics_%d", id), &msg.UserStatistics{}
		if err := utredis.GetProtoBin(Redis(), key, statisticsInfo); err != nil {
			log.Error("加载玩家[%d] statistics 数据失败", id)
		}
		send.Statistics = statisticsInfo
	}
	return send
}