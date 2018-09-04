package main
import (
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/pbmsg"
)

func (this *GateUser) StartThrow() {
	if this.RemoveGold(1000, "参加超市购物", true) {
		this.cartflag = true
	}
}

//命中目标
func (this *GateUser) TargetItem(itemids []uint32) {
    send := &msg.GW2C_HitTarget{}
	itemnum := len(itemids)
	if this.cartflag == true && itemnum != 0{
		count := 0
		for _, itemid := range itemids {
			cartfig , findid := tbl.TSupermarketBase.TSupermarketById[itemid]
			if findid == false {
				log.Error("找不到配置 %d", itemid)
				continue
			}
			if util.SelectPercent(int32(cartfig.Odds)) {
				send.Itemid = append(send.Itemid, uint32(itemid))
				this.AddItem(cartfig.ItemId, cartfig.Num, "钩子抓住获得", true)
			}else{
				log.Info("账户[%s] [%d %s] 抓取购物车奖励%d:失败 概率:%d", this.Account(), this.Id(), this.Name(), cartfig.ItemId, cartfig.Odds)
			}
			count++
			if count >= 3{
				break
			}
		}
	}
	this.cartflag = false
	this.SendMsg(send)
}


