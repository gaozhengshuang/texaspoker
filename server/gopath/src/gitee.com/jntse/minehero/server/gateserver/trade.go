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

//////////////////////////////////////////////////房屋交易/////////////////////////////////////////////////////

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
	limitsql = fmt.Sprintf("limit %d,10", rev.GetStartnum())
	wheresql = fmt.Sprintf("endtime>%d ", util.CURTIME())
	if rev.GetLocation() != 0 {
		wheresql += fmt.Sprintf("and location=%d ", rev.GetLocation())
	}
	if rev.GetSublocation() != 0 {
		wheresql += fmt.Sprintf("and sublocation=%d ", rev.GetSublocation())
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
		wheresql += "and name like '%" + rev.GetName() + "%'"
	}
	if rev.GetPricedec() == true {
		ordersql += "ORDER BY PRICE DESC"
	}else{
		ordersql += "ORDER BY PRICE ASC"
	}

	if wheresql != "" {
		strsql = fmt.Sprintf("SELECT * FROM housetrade WHERE %s %s %s", wheresql, ordersql, limitsql)
	}else{
		strsql = fmt.Sprintf("SELECT * FROM housetrade %s %s", ordersql, limitsql)
	}

	log.Info("[房屋交易] 玩家[%d] 请求交易列表 SQL语句[%s]", this.Id(), strsql)

	rows, err := MysqlDB().Query(strsql)
	if err != nil{
		log.Info("查询表失败 %v", err)
		return
	}
	defer rows.Close()
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
	if house == nil {
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
	strsql := fmt.Sprintf("INSERT INTO housetrade (name, houselevel, price, area, income, houseuid, housebaseid, endtime, location, sublocation, posx, posy, state, housetype) VALUES ('%s', %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d, %d)", buildconf.Community, house.level, price, house.area, house.GetIncome(), house.id, house.tid, endtime, buildconf.Province, buildconf.City, uint32(buildconf.PosX), uint32(buildconf.PosY), 0, house.GetType())
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
	house.tradeendtime = uint32(endtime)
	house.tradeuid = uint64(LastInsertId)
	house.tradeprice = uint32(price)

	this.UpdateHouseDataById(house.id, false)

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
	history.State = pb.Uint32(uint32(1))

	historykey := fmt.Sprintf("tradehousehistory_%d_%d", this.Id(), history.GetTradeuid())
	utredis.SetProtoBin(Redis(), historykey, history)
	listkey := fmt.Sprintf("tradehousehistorylist_%d", this.Id())
	Redis().RPush(listkey, history.GetTradeuid())

	this.SendNotify("操作成功")
}

func (this *GateUser) BuyTradeHouse(tradeuid uint64, houseuid uint64){
	house := HouseSvrMgr().GetHouse(uint64(houseuid))
	if house == nil {
		this.SendNotify("房屋不存在")
		return
	}

	if house.tradeuid != tradeuid {
		this.SendNotify("房屋不在交易中")
		return 
	}

	if house.ownerid == this.Id() {
		this.SendNotify("不能买自己的房子")
		return
	}

	historykey := fmt.Sprintf("tradehousehistory_%d_%d", house.ownerid, house.tradeuid)
	history := &msg.TradeHouseHistory{}
	if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil {
		return
	}

	if this.RemoveGold(uint32(history.GetPrice()), "交易房屋", true) == false {
		return
	}

	delsql := fmt.Sprintf("DELETE FROM housetrade WHERE id=%d", tradeuid)
	_, execerr := MysqlDB().Exec(delsql)
	if execerr != nil {
		log.Info("数据库删除失败")
	}

	exownerid := house.ownerid

	house.ChangeOwner(this)
	house.ClearTrade()

	history.Tradetime = pb.Uint32(uint32(util.CURTIME()))
	history.State = pb.Uint32(uint32(2))
	exprice := history.GetPrice()
	history.Price = pb.Uint32(history.GetPrice() * 9 / 10)

	sellkey := fmt.Sprintf("tradehousehistory_%d_%d", exownerid, tradeuid)
	utredis.SetProtoBin(Redis(), sellkey, history)
	//selllistkey := fmt.Sprintf("tradehousehistorylist_%d", exownerid)
	//Redis().RPush(selllistkey, tradeuid)

	history.Price = pb.Uint32(exprice)
	history.State = pb.Uint32(uint32(4))
	buykey := fmt.Sprintf("tradehousehistory_%d_%d", this.Id(), tradeuid)
	utredis.SetProtoBin(Redis(), buykey, history)
	buylistkey := fmt.Sprintf("tradehousehistorylist_%d", this.Id())
	Redis().RPush(buylistkey, tradeuid)

	this.SendNotify("购买成功")
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
	historykey := fmt.Sprintf("tradehousehistory_%d_%d", this.Id(), tradeuid)
	history := &msg.TradeHouseHistory{}
	if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil {
		return
	}
	if history.GetState() == 2 {
		this.AddGold(history.GetPrice(), "交易房屋获得", true)	
		history.State = pb.Uint32(3)
		utredis.SetProtoBin(Redis(), historykey, history)
		this.SendNotify("领取成功")
		send := &msg.GW2C_RetGetTradeHouseReward{}
		send.Tradeuid = pb.Uint64(tradeuid)
		this.SendMsg(send)
	}else{
		this.SendNotify("已经领取过")
	}
}

func (this *GateUser) CancelTradeHouse(houseuid uint64){
	house := HouseSvrMgr().GetHouse(uint64(houseuid))
	if house == nil {
		this.SendNotify("房屋不存在")
		return
	}

	tradeuid := house.tradeuid
	historykey := fmt.Sprintf("tradehousehistory_%d_%d", this.Id(), tradeuid)
	history := &msg.TradeHouseHistory{}
	if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil {
		this.SendNotify("交易不存在")
		return
	}
	
	if history.GetState() != 1 {
		this.SendNotify("不能取消")
		return
	}

	history.State = pb.Uint32(5)
	utredis.SetProtoBin(Redis(), historykey, history)
	this.SendNotify("取消成功")

	delsql := fmt.Sprintf("DELETE FROM housetrade WHERE id=%d", tradeuid)
	_, execerr := MysqlDB().Exec(delsql)
	if execerr != nil {
		log.Info("数据库删除失败")
		return
	}

	house.ClearTrade()
	this.UpdateHouseDataById(house.id, false)

	//send := &msg.GW2C_RetCancelTradeHouse{}
	//send.Tradeuid = pb.Uint64(tradeuid)
	//this.SendMsg(send)
}

/////////////////////////////////////////////////////汽车交易/////////////////////////////////////////////////

type CarTradeInfo struct {
	tradeuid int
	caruid int
	price int
	income int
	carbaseid int
	endtime int
	ownerid int
	carlevel int
	cartype int
	name string
	carsubtype int
}

func (this *GateUser) ReqTradeCarList(rev *msg.C2GW_ReqCarTradeList){
	var wheresql string
	var ordersql string
	var limitsql string
	var strsql string
	limitsql = fmt.Sprintf("limit %d,10", rev.GetStartnum())
	wheresql = fmt.Sprintf("endtime>%d ", util.CURTIME())
	if rev.GetCartype() != 0 {
		wheresql += fmt.Sprintf("and cartype=%d ", rev.GetCartype())
	}
	if rev.GetCarsubtype() != 0 {
		wheresql += fmt.Sprintf("and carsubtype=%d ", rev.GetCarsubtype())
	}
	if rev.GetPricemin() != 0 {
		wheresql += fmt.Sprintf("and price>=%d ", rev.GetPricemin())
	}
	if rev.GetPricemax() != 0 {
		wheresql += fmt.Sprintf("and price<=%d ", rev.GetPricemax())
	}
	if rev.GetCarlevel() != 0 {
		wheresql += fmt.Sprintf("and carlevel=%d ", rev.GetCarlevel())
	}
	if rev.GetName() != "" {
		wheresql += "and name like '%" + rev.GetName() + "%'"
	}
	if rev.GetPricedec() == true {
		ordersql += "ORDER BY PRICE DESC"
	}else{
		ordersql += "ORDER BY PRICE ASC"
	}

	if wheresql != "" {
		strsql = fmt.Sprintf("SELECT * FROM cartrade WHERE %s %s %s", wheresql, ordersql, limitsql)
	}else{
		strsql = fmt.Sprintf("SELECT * FROM cartrade %s %s", ordersql, limitsql)
	}

	log.Info("[汽车交易] 玩家[%d] 请求交易列表 SQL语句[%s]", this.Id(), strsql)

	rows, err := MysqlDB().Query(strsql)
	if err != nil{
		log.Info("查询表失败 %v", err)
		return
	}
	defer rows.Close()
	send := &msg.GW2C_RetCarTradeList{} 
	for rows.Next() {
		trade := CarTradeInfo{}
		err := rows.Scan(&trade.tradeuid, &trade.caruid, &trade.price, &trade.income, &trade.carbaseid, &trade.endtime, &trade.ownerid, &trade.carlevel, &trade.cartype, &trade.name, &trade.carsubtype)
		if nil != err {
			log.Info("获取表值失败")
			continue
		}

		send.List = append(send.List, &msg.SimpleCarTrade{
			Tradeuid : pb.Uint64(uint64(trade.tradeuid)),
			Caruid : pb.Uint32(uint32(trade.caruid)),
			Price : pb.Uint32(uint32(trade.price)),
			Income : pb.Uint32(uint32(trade.income)),
			Carbaseid : pb.Uint32(uint32(trade.carbaseid)),
			Endtime : pb.Uint32(uint32(trade.endtime)),
			Ownerid : pb.Uint32(uint32(trade.ownerid)),
			Carlevel : pb.Uint32(uint32(trade.carlevel)),
			Cartype : pb.Uint32(uint32(trade.cartype)),
			Name : pb.String(trade.name),
			})
	}
	this.SendMsg(send)
}

func (this *GateUser) TradeCar(caruid uint64, price uint32){
	car := CarMgr().GetCar(caruid)
	if car == nil {
		this.SendNotify("汽车不存在")
		return
	}

	if car.GetOwnerId() != this.Id(){
		this.SendNotify("只能交易自己的车")
		return
	}

	if car.CanTrade() == false {
		this.SendNotify("汽车只有在收回状态下才能交易")
		return
	}

	endtime := util.CURTIME() + 86400 * 3
	strsql := fmt.Sprintf("INSERT INTO cartrade (caruid, price, income, carbaseid, endtime, ownerid, carlevel, cartype, name, carsubtype) VALUES (%d, %d, %d, %d, %d, %d, %d, %d, '%s', %d)",car.GetId(), price, car.GetRewardPerM(), car.GetTid(), endtime, car.GetOwnerId(), car.GetStar(), car.GetCarBrand(), car.GetCarName(), car.GetCarModel())
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
	
	car.data.Tradeuid = pb.Uint64(uint64(LastInsertId))
	car.data.Tradeendtime = pb.Uint32(uint32(endtime))
	car.data.Tradeprice = pb.Uint32(uint32(price))
	car.modified = true
	CarMgr().UpdateCarByID(this, car.GetId(), false)

	history := &msg.TradeCarHistory{}
	history.Tradeuid = pb.Uint64(uint64(LastInsertId))
	history.Caruid = pb.Uint64(uint64(car.GetId()))
	history.Carlevel = pb.Uint32(uint32(car.GetStar()))
	history.Price = pb.Uint32(uint32(price))
	history.Income = pb.Uint32(uint32(car.GetRewardPerM()))
	history.Tradetime = pb.Uint32(uint32(util.CURTIME()))
	history.Cartype = pb.Uint32(uint32(car.GetCarBrand()))
	history.Carbaseid = pb.Uint32(uint32(car.GetTid()))
	history.State = pb.Uint32(uint32(1))

	historykey := fmt.Sprintf("tradecarhistory_%d_%d", this.Id(), history.GetTradeuid())
	utredis.SetProtoBin(Redis(), historykey, history)
	listkey := fmt.Sprintf("tradecarhistorylist_%d", this.Id())
	Redis().RPush(listkey, history.GetTradeuid())

	this.SendNotify("操作成功")
}

func (this *GateUser) BuyTradeCar(tradeuid uint64, caruid uint64){
	car := CarMgr().GetCar(caruid)
	if car == nil {
		this.SendNotify("汽车不存在")
		return
	}

	if car.data.GetTradeuid() != tradeuid {
		this.SendNotify("汽车不在交易中")
		log.Info("汽车交易 %d %d carid %d", car.GetTradeuid(), tradeuid, caruid)
		return 
	}

	if car.GetOwnerId() == this.Id() {
		this.SendNotify("不能买自己的汽车")
		return
	}

	historykey := fmt.Sprintf("tradecarhistory_%d_%d", car.GetOwnerId(), car.GetTradeuid())
	history := &msg.TradeCarHistory{}
	if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil {
		return
	}

	if this.RemoveGold(uint32(history.GetPrice()), "交易汽车", true) == false {
		return
	}

	delsql := fmt.Sprintf("DELETE FROM cartrade WHERE id=%d", tradeuid)
	_, execerr := MysqlDB().Exec(delsql)
	if execerr != nil {
		log.Info("数据库删除失败")
	}

	exownerid := car.GetOwnerId()

	car.ChangeOwner(this)
	car.ClearTrade()
	car.modified = true

	history.Tradetime = pb.Uint32(uint32(util.CURTIME()))
	history.State = pb.Uint32(uint32(2))
	exprice := history.GetPrice()
	history.Price = pb.Uint32(history.GetPrice() * 9 / 10)

	sellkey := fmt.Sprintf("tradecarhistory_%d_%d", exownerid, tradeuid)
	utredis.SetProtoBin(Redis(), sellkey, history)
	//selllistkey := fmt.Sprintf("tradecarhistorylist_%d", exownerid)
	//Redis().RPush(selllistkey, tradeuid)

	history.Price = pb.Uint32(exprice)
	history.State = pb.Uint32(uint32(4))
	buykey := fmt.Sprintf("tradecarhistory_%d_%d", this.Id(), tradeuid)
	utredis.SetProtoBin(Redis(), buykey, history)
	buylistkey := fmt.Sprintf("tradecarhistorylist_%d", this.Id())
	Redis().RPush(buylistkey, tradeuid)

	this.SendNotify("购买成功")
}

func (this* GateUser) ReqTradeCarHistory(){
	key := fmt.Sprintf("tradecarhistorylist_%d", this.Id())
	rlist, err := Redis().LRange(key, 0, 20).Result()
	if err != nil {
		log.Error("加载车辆交易操作记录失败 id %d ，err: %s", this.Id(), err)
		return
	}
	send := &msg.GW2C_RetTradeCarHistory{}
	for _, v := range rlist {
		historykey := fmt.Sprintf("tradecarhistory_%d_%s", this.Id(), v)
		history := &msg.TradeCarHistory{}
		if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil{
			continue
		}
		send.List = append(send.List, history)
	}
	this.SendMsg(send)
}

func (this *GateUser) GetTradeCarReward(tradeuid uint64){
	historykey := fmt.Sprintf("tradecarhistory_%d_%d", this.Id(), tradeuid)
	history := &msg.TradeCarHistory{}
	if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil {
		return
	}
	if history.GetState() == 2 {
		this.AddGold(history.GetPrice(), "交易车辆获得", true)	
		history.State = pb.Uint32(3)
		utredis.SetProtoBin(Redis(), historykey, history)
		this.SendNotify("领取成功")
		send := &msg.GW2C_RetGetTradeCarReward{}
		send.Tradeuid = pb.Uint64(tradeuid)
		this.SendMsg(send)
	}else{
		this.SendNotify("已经领取过")
	}
}

func (this *GateUser) CancelTradeCar(caruid uint64){
	car := CarMgr().GetCar(uint64(caruid))
	if car == nil {
		this.SendNotify("汽车不存在")
		return
	}

	tradeuid := car.GetTradeuid()
	historykey := fmt.Sprintf("tradecarhistory_%d_%d", this.Id(), tradeuid)
	history := &msg.TradeCarHistory{}
	if err := utredis.GetProtoBin(Redis(), historykey, history); err != nil {
		this.SendNotify("交易不存在")
		return
	}
	
	if history.GetState() != 1 {
		this.SendNotify("不能取消")
		return
	}

	history.State = pb.Uint32(5)
	utredis.SetProtoBin(Redis(), historykey, history)
	this.SendNotify("取消成功")

	delsql := fmt.Sprintf("DELETE FROM cartrade WHERE id=%d", tradeuid)
	_, execerr := MysqlDB().Exec(delsql)
	if execerr != nil {
		log.Info("数据库删除失败")
		return
	}

	car.ClearTrade()
	car.modified = true
	CarMgr().UpdateCarByID(this, car.GetId(), false)

	//send := &msg.GW2C_RetCancelTradeHouse{}
	//send.Tradeuid = pb.Uint64(tradeuid)
	//this.SendMsg(send)
}

/////////////////////////////////////////////////////道具交易//////////////////////////////////////////////////////

type ItemTradeInfo struct {
	tradeuid int
	itemid int
	itemnum int
	price int
	endtime int
	ownerid int
	itemtype int
	itemsubtype int
	name string
}
/*
func (this *GateUser) ReqTradeItemList(rev *msg.C2GW_ReqItemTradeList){
	var wheresql string
	var ordersql string
	var limitsql string
	var strsql string
	limitsql = fmt.Sprintf("limit %d,20", rev.GetStartnum())
	wheresql = fmt.Sprintf("endtime>%d ", util.CURTIME())
	if rev.GetPricemin() != 0 {
		wheresql += fmt.Sprintf("and price>=%d ", rev.GetPricemin())
	}
	if rev.GetPricemax() != 0 {
		wheresql += fmt.Sprintf("and price<=%d ", rev.GetPricemax())
	}
	if rev.GetItemtype() != 0 {
		wheresql += fmt.Sprintf("and itemtype=%d ", rev.GetItemtype())
	}
	if rev.GetItemsubype() != 0 {
		wheresql += fmt.Sprintf("and itemsubtype=%d ", rev.GetItemsubtype())
	}
	if rev.GetName() != "" {
		wheresql += fmt.Sprintf("and name like '%s%'", rev.GetName())
	}
	if rev.GetPricedec() == true {
		ordersql += "ORDER BY PRICE DESC"
	}else{
		ordersql += "ORDER BY PRICE ASC"
	}

	if wheresql != "" {
		strsql = fmt.Sprintf("SELECT * FROM itemtrade WHERE %s %s %s", wheresql, ordersql, limitsql)
	}else{
		strsql = fmt.Sprintf("SELECT * FROM itemtrade %s %s", ordersql, limitsql)
	}

	log.Info("[道具交易] 玩家[%d] 请求交易列表 SQL语句[%s]", this.Id(), strsql)

	rows, err := MysqlDB().Query(strsql)
	if err != nil{
		log.Info("查询表失败 %v", err)
		return
	}
	defer rows.Close()
	send := &msg.GW2C_RetItemTradeList{} 
	for rows.Next() {
		trade := ItemTradeInfo{}
		err := rows.Scan(&trade.tradeuid, &trade.itemid, &trade.houselevel, &trade.price, &trade.area, &trade.income, &trade.houseuid, &trade.housebaseid, &trade.endtime, &trade.location, &trade.sublocation, &trade.posx, &trade.posy, &trade.state, &trade.housetype)
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
}*/
