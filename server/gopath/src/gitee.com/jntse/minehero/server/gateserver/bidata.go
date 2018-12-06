package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	_"gitee.com/jntse/gotoolkit/mysql"
	"time"
)

//每日新增一条的统计数据
type BiData_daily struct {
	user_incr 	int32 //日新增用户数量
	user_pay  	int32 //日付费用户数量
	user_login 	int32 //日登录用户数量
	pay_amount 	int32 //日充值总额度
	pay_orders 	int32 //日充值订单数
	online_max 	int32 //日最高在线人数

	lasttick 	int64 
}

func (this *BiData_daily) Init(now int64) {
	this.lasttick = now
	db := DB()
	if db == nil {
		panic("mysql should init")
		return
	}

	bInsertNew := false
	//查找最新的一条记录
	sqlstr := "SELECT  timestamp FROM bidata_daily ORDER BY id DESC LIMIT 1"
	rows1, err1 := db.Query(sqlstr)
	defer rows1.Close()
	if err1 != nil{
		log.Error("bidata_daily init query err: %v\n", err1)
		return
	}
	if rows1.Next() {
		timestamp := int64(0)
		err1 = rows1.Scan(&timestamp)
		if err1 != nil {
			log.Error("bidata_daily init scan err: %v\n", err1)
			return
		}
		if util.IsSameDay(timestamp, now) == false {
			bInsertNew = true
		}
	} else {
		bInsertNew = true
	}

	if bInsertNew {
		this.InsertNewDailyData(now)
	} else {
		sqlstr := "SELECT user_incr, user_pay, user_login, pay_amount, pay_orders, online_max FROM bidata_daily ORDER BY id DESC LIMIT 1"
		rows, err := db.Query(sqlstr)
		defer rows.Close()
		if err != nil{
			log.Error("bidata_daily init query err: %v\n", err)
			return
		}
		if rows.Next() {
			err = rows.Scan(&this.user_incr, &this.user_pay, &this.user_login, &this.pay_amount, &this.pay_orders, &this.online_max)
			if err != nil {
				log.Error("bidata_daily init scan err: %v\n", err)
				return
			}
		}
	}
	log.Info("bidata_daily init user_incr:%d, user_pay:%d, user_login:%d, pay_amount:%d, pay_orders:%d", this.user_incr, this.user_pay, this.user_login, this.pay_amount, this.pay_orders)
}

func (this *BiData_daily) InsertNewDailyData(now int64) {
	db := DB()
	if db == nil {
		panic("mysql should init")
		return
	}

	datetime := time.Now().Format("2006-01-02")
	sqlstr := fmt.Sprintf("INSERT INTO bidata_daily (date, timestamp) VALUES ('%v','%d')", datetime, now)
	log.Info(sqlstr)
	_, inserr := db.Exec(sqlstr)
	if inserr != nil {
		log.Error("bidata_daily insert err: %v\n", inserr)
	}
	this.user_incr = 0
	this.user_pay = 0
	this.user_login = 0
	this.pay_amount = 0
	this.pay_orders = 0
	this.online_max = 0
}

func (this *BiData_daily) Update(now int64) {
	sqlstr := fmt.Sprintf("UPDATE bidata_daily set user_incr='%d', user_pay='%d', user_login='%d', pay_amount='%d', pay_orders='%d', online_max='%d' WHERE 1 ORDER BY id DESC LIMIT 1", this.user_incr, this.user_pay, this.user_login, this.pay_amount, this.pay_orders, this.online_max)
	db := DB()
	if db == nil {
		panic("mysql should init")
		return
	}
	_, err := db.Exec(sqlstr)
	if err != nil {
		log.Error("bidata_daily UPDATE err: %v\n", err)
	}

	if util.IsSameDay(this.lasttick, now) == false {
		this.InsertNewDailyData(now)
	}
	this.lasttick = now
}

func (this *BiData_daily) OnNewUserCreate() {
	this.user_incr = this.user_incr + 1
}

func (this *BiData_daily) OnUserLogin(uid int64) {
	onlines := int32(len(UserMgr().accounts))
	if onlines > this.online_max {
		this.online_max = onlines
	}
	//判断是否是本日第一次登录 若是则login + 1
	dailylogin := Redis().HGet(fmt.Sprintf("charstate_%d", uid), "dailylogin").Val()
	if dailylogin == "" {
		Redis().HSet(fmt.Sprintf("charstate_%d", uid), "dailylogin", 1)
		this.user_login = this.user_login + 1
	}
}

func (this *BiData_daily) OnUserPay(uid int64, amount int32) {
	this.pay_amount = this.pay_amount + amount
	this.pay_orders = this.pay_orders + 1
	//判断是否是此玩家本日第一次充值 若是 则user_pay +1
	dailypay := Redis().HGet(fmt.Sprintf("charstate_%d", uid), "dailypay").Val()
	if dailypay == "" {
		Redis().HSet(fmt.Sprintf("charstate_%d", uid), "dailypay", 1)
		this.user_pay = this.user_pay + 1
	}
}



type BiDataManager struct {
	bidata_daily  *BiData_daily
}

func (this *BiDataManager) Init() {
	nowtime := util.CURTIME()
	this.bidata_daily = &BiData_daily{}
	this.bidata_daily.Init(nowtime)
}

//新用户创建
func (this *BiDataManager) OnNewUserCreate() {
	this.bidata_daily.OnNewUserCreate()
}

//用户登录
func (this *BiDataManager) OnUserLogin(uid int64) {
	this.bidata_daily.OnUserLogin(uid)
}

//用户充值
func (this *BiDataManager) OnUserPay(uid int64, amount int32) {
	this.bidata_daily.OnUserPay(uid, amount)
}

//定时存档
func (this *BiDataManager) OnTick1m() {
	nowtime := util.CURTIME()
	this.bidata_daily.Update(nowtime)
}
