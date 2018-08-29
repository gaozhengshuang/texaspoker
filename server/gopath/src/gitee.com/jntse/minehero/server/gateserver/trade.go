package main

import (
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/gotoolkit/redis"
	"fmt"
)

type HouseTradeInfo struct {
	tradeuid int
	name string
	price int
	houselevel int
	area int
	income int
	houseuid int
	housebaseid int
	endtime int
	location int
	sublocation int
	posx int
	posy int
	state int
	housetype int
}

func (this *GateUser) ReqTradeHouseList(rev *msg.C2GW_ReqHouseTradeList){
	var wheresql string
	var ordersql string
	var limitsql string
	var strsql string
	limitsql = fmt.Sprintf("limit %d 20", rev.GetStartnum())
	wheresql = fmt.Sprintf(" endtime>%d ", util.CURTIME())
	if rev.GetLocation() != 0 {
		wheresql += fmt.Sprintf("and loction=%d ", rev.GetLocation())
	}
	if rev.GetSublocation() != 0 {
		wheresql += fmt.Sprintf("and suboction=%d ", rev.GetSublocation())
	}
	if rev.GetHousetype() != 0 {
		wheresql += fmt.Sprintf("and housetype=%d ", rev.GetHousetype())
	}
	if rev.GetPricemin() != 0 {
		wheresql += fmt.Sprintf("and price>=%d ", rev.GetPricemin())
	}
	if rev.GetPricemax() != 0 {
		wheresql += fmt.Sprintf("and price<=%d ", rev.GetPricemax())
	}
	if rev.GetHouselevel() != 0 {
		wheresql += fmt.Sprintf("and houselevel=%d ", rev.GetHouselevel())
	}
	if rev.GetName() != "" {
		wheresql += fmt.Sprintf("and name like '%s%'", rev.GetName())
	}
	if rev.GetPricedec() == true {
		ordersql += "ORDER BY PRICE DEC"
	}else{
		ordersql += "ORDER BY PRICE ASC"
	}

	if wheresql != "" {
		strsql = fmt.Sprintf("SELECT * FROM treasure WHERE %s %s %s", wheresql, ordersql, limitsql)
	}else{
		strsql = fmt.Sprintf("SELECT * FROM treasure %s %s", ordersql, limitsql)
	}

	log.Info("[房屋交易] 玩家[%d] 请求交易列表 SQL语句[%s]", this.Id(), strsql)

	rows, err := MysqlDB().Query(strsql)
	defer rows.Close()
	if err != nil{
		log.Info("查询表失败")
		return
	}

	send := &msg.GW2C_RetHouseTradeList{} 
	for rows.Next() {
		trade := HouseTradeInfo{}
		err := rows.Scan(&trade.tradeuid, &trade.name, &trade.houselevel, &trade.price, &trade.area, &trade.income, &trade.houseuid, &trade.housebaseid, &trade.endtime, &trade.location, &trade.sublocation, &trade.posx, &trade.posy, &trade.state, &trade.housetype)
		if nil != err {
			log.Info("获取表值失败")
			continue
		}
		send.List = append(send.List, &msg.SimpleHouseTrade{
			Tradeuid : pb.Uint64(uint64(trade.tradeuid)),
			Name : pb.String(trade.name),
			Houselevel : pb.Uint32(uint32(trade.houselevel)),
			Price : pb.Uint32(uint32(trade.price)),
			Area : pb.Uint32(uint32(trade.area)),
			Income : pb.Uint32(uint32(trade.income)),
			Houseuid : pb.Uint32(uint32(trade.houseuid)),
			Housebaseid : pb.Uint32(uint32(trade.housebaseid)),
			Endtime : pb.Uint32(uint32(trade.endtime)),
			Location : pb.Uint32(uint32(trade.location)),
			Sublocation : pb.Uint32(uint32(trade.sublocation)),
			Posx : pb.Uint32(uint32(trade.posx)),
			Posy : pb.Uint32(uint32(trade.posy)),
			Housetype : pb.Uint32(uint32(trade.housetype)),
			})
	}
	this.SendMsg(send)
}

func (this *GateUser) TradeHouse(houseuid uint64, price uint32){
	house := HouseSvrMgr().GetHouse(houseuid)
	if house != nil {
		this.SendNotify("房屋不存在")
		return
	}
	if house.issell == true {
		this.SendNotify("房屋不存在")
		return
	}

	buildconf, buidfind := tbl.TBuildingsBase.TBuildingsById[house.buildingid]
	if buidfind == false {
		this.SendNotify("大楼信息不存在")
		return
	}
	endtime := util.CURTIME() + 86400 * 3
	strsql := fmt.Sprintf("INSERT INTO TREASURE (name, houselevel, price, area, income, houseuid, housebaseid, endtime, location, sublocation, posx, posy, state, housetype) VALUES (%s, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d)", buildconf.Community, house.level, price, house.area, house.GetIncome(), house.id, house.tid, endtime, buildconf.Province, buildconf.City, buildconf.PosX, buildconf.PosY, 0, house.GetType())
	log.Info("[房屋交易] 玩家[%d] 添加交易数据 SQL语句[%s]", this.Id(), strsql)
	ret, err := MysqlDB().Exec(strsql)
	if err != nil {
		log.Info("数据库插入失败")
		return
	}
	LastInsertId, inserterr := ret.LastInsertId()
	if inserterr != nil {
		log.Info("数据库插入失败2")
		return
	}

	house.issell = true	

	history := &msg.TradeHouseHistory{}
	history.Tradeuid = pb.Uint64(uint64(LastInsertId))
	history.Name = pb.String(buildconf.Community)
	history.Houselevel = pb.Uint32(uint32(house.level))
	history.Price = pb.Uint32(uint32(price))
	history.Area = pb.Uint32(uint32(house.area))
	history.Income = pb.Uint32(uint32(house.GetIncome()))
	history.Tradetime = pb.Uint32(uint32(util.CURTIME()))
	history.Housetype = pb.Uint32(uint32(house.GetType()))
	history.Housebaseid = pb.Uint32(uint32(house.tid))
	history.State = pb.Uint32(uint32(2))

	historykey := fmt.Sprintf("tradehousehistory_%d_%d", this.Id(), history.GetTradeuid())
	utredis.SetProtoBin(Redis(), historykey, history)
	listkey := fmt.Sprintf("tradehousehistorylist_%d", this.Id())
	Redis().RPush(listkey, history.GetTradeuid())
}

func (this *GateUser) BuyTradeHouse(tradeuid uint64){
	strsql := fmt.Sprintf("SELECT * FROM treasure WHERE tradeid=%d", tradeuid)
	rows, err := MysqlDB().Query(strsql)
	defer rows.Close()
	if err != nil{
		log.Info("查询表失败")
		return
	}

	trade := HouseTradeInfo{}
	if rows.Next() {
		err := rows.Scan(&trade.tradeuid, &trade.name, &trade.houselevel, &trade.price, &trade.area, &trade.income, &trade.houseuid, &trade.housebaseid, &trade.endtime, &trade.location, &trade.sublocation, &trade.posx, &trade.posy, &trade.state)
		if nil != err {
			log.Info("获取表值失败")
			return
		}
	}else{
		log.Info("查询表失败2")
		return
	}

	house := HouseSvrMgr().GetHouse(uint64(trade.houseuid))
	if house != nil {
		this.SendNotify("房屋不存在")
		return
	}

	if this.RemoveGold(uint32(trade.price), "交易房屋", true) == false {
		return
	}

	delsql := fmt.Sprintf("DELETE FROM treasure WHERE tradeid=%d", tradeuid)
	_, execerr := MysqlDB().Exec(delsql)
	if execerr != nil {
		log.Info("数据库删除失败")
	}

	exownerid := house.ownerid

	house.ChangeOwner(this)
	send := &msg.GW2C_RetBuyTradeHouse{}
	send.Tradeuid = pb.Uint64(tradeuid)
	this.SendMsg(send)

	history := &msg.TradeHouseHistory{}
	history.Tradeuid = pb.Uint64(uint64(trade.tradeuid))
	history.Name = pb.String(trade.name)
	history.Houselevel = pb.Uint32(uint32(trade.houselevel))
	history.Price = pb.Uint32(uint32(trade.price))
	history.Area = pb.Uint32(uint32(trade.area))
	history.Income = pb.Uint32(uint32(trade.income))
	history.Tradetime = pb.Uint32(uint32(util.CURTIME()))
	history.Housetype = pb.Uint32(uint32(house.GetType()))
	history.Housebaseid = pb.Uint32(uint32(trade.housebaseid))
	history.State = pb.Uint32(uint32(2))

	sellkey := fmt.Sprintf("tradehousehistory_%d_%d", exownerid, trade.tradeuid)
	utredis.SetProtoBin(Redis(), sellkey, history)
	selllistkey := fmt.Sprintf("tradehousehistorylist_%d", exownerid)
	Redis().RPush(selllistkey, trade.tradeuid)

	history.State = pb.Uint32(uint32(4))
	buykey := fmt.Sprintf("tradehousehistory_%d_%d", this.Id(), trade.tradeuid)
	utredis.SetProtoBin(Redis(), buykey, history)
	buylistkey := fmt.Sprintf("tradehousehistorylist_%d", this.Id())
	Redis().RPush(buylistkey, trade.tradeuid)
	
}

func (this* GateUser) ReqTradeHouseHistory(){
	key := fmt.Sprintf("tradehousehistorylist_%d", this.Id())
	rlist, err := Redis().LRange(key, 0, 20).Result()
	if err != nil {
		log.Error("加载房屋交易操作记录失败 id %d ，err: %s", this.Id(), err)
		return
	}
	send := &msg.GW2C_RetTradeHouseHistory{}
	for _, v := range rlist {
		historykey := fmt.Sprintf("tradehousehistory_%d_%s", this.Id(), v)
		history := &msg.TradeHouseHistory{}
		if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil{
			continue
		}
		send.List = append(send.List, history)
	}
	this.SendMsg(send)
}

func (this *GateUser) GetTradeHouseReward(tradeuid uint64){
	historykey := fmt.Sprintf("tradehousehistory_%d_%s", this.Id(), tradeuid)
	history := &msg.TradeHouseHistory{}
	if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil {
		return
	}
	if history.GetState() == 2 {
		this.AddGold(history.GetPrice(), "交易房屋获得", true)	
		history.State = pb.Uint32(3)
		utredis.SetProtoBin(Redis(), historykey, history)
		this.SendNotify("领取成功")
	}else{
		this.SendNotify("已经领取过")
	}
}

func (this *GateUser) CancelTradeHouse(tradeuid uint64){
	historykey := fmt.Sprintf("tradehousehistory_%d_%s", this.Id(), tradeuid)
	history := &msg.TradeHouseHistory{}
	if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil {
		return
	}
	
	if history.GetState() != 1 {
		this.SendNotify("不能取消")
		return
	}

	history.State = pb.Uint32(5)
	utredis.SetProtoBin(Redis(), historykey, history)
	this.SendNotify("取消成功")

	delsql := fmt.Sprintf("DELETE FROM treasure WHERE tradeid=%d", tradeuid)
	_, execerr := MysqlDB().Exec(delsql)
	if execerr != nil {
		log.Info("数据库删除失败")
	}

	send := &msg.GW2C_RetCancelTradeHouse{}
	send.Tradeuid = pb.Uint64(tradeuid)
	this.SendMsg(send)
}

