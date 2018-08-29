package main

import (
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/server/tbl"
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
		err := rows.Scan(&trade.tradeuid, &trade.name, &trade.houselevel, &trade.price, &trade.area, &trade.income, &trade.houseuid, &trade.housebaseid, &trade.endtime, &trade.location, &trade.sublocation, &trade.posx, &trade.posy, &trade.state)
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
			})
	}
	this.SendMsg(send)
}

func (this *GateUser) TradeHouse(houseuid uint64, price int32){
	house := HouseSvrMgr().GetHouse(houseuid)
	if house != nil {
		this.SendNotify("房屋不存在")
		return
	}
	buildconf, buidfind := tbl.TBuildingsBase.TBuildingsById[house.buildingid]
	if buidfind == false {
		this.SendNotify("大楼信息不存在")
		return
	}
	endtime := util.CURTIME() + 86400 * 3
	strsql := fmt.Sprintf("INSERT INTO TREASURE (name, houselevel, price, area, income, houseuid, housebaseid, endtime, location, sublocation, posx, posy, state) VALUES (%s, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d)", buildconf.Community, house.level, price, house.area, house.GetIncome(), house.id, house.tid, endtime, buildconf.Province, buildconf.City, buildconf.PosX, buildconf.PosY, 0)
	log.Info("[房屋交易] 玩家[%d] 添加交易数据 SQL语句[%s]", this.Id(), strsql)
	_, err := MysqlDB().Exec(strsql)
	if err != nil {
		log.Info("数据库插入失败")
	}
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

	house.ChangeOwner(this)
	send := &msg.GW2C_RetBuyTradeHouse{}
	send.Tradeuid = pb.Uint64(tradeuid)
	this.SendMsg(send)

	optional string name = 1;           //房产名字
	optional uint32 houselevel = 2;     //房屋等级
	optional uint32 price = 3;          //房屋总价
	optional uint32 area = 4;           //房屋面积
	optional uint32 income = 5;         //房屋收益
	optional uint32 tradetime = 6;      //交易结束时间
	optional uint32 housetype = 7;      //房屋类型
	optional uint32 housebaseid = 8;    //房屋表id
	optional uint32 state = 9;          //状态
	optional uint32 tradeuid = 10;      //交易id

	//history := &msg.TradeHouseHistory{}
	//history.Tradeuid 
}

