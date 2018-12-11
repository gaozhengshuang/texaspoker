package main

import (
	"fmt"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/mysql"
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
	colname := make([]string,0)
	colname = append(colname,"`timestamp`")
	cond := "1 ORDER BY `id` DESC"
	rows, err := db.Select("bidata_daily",colname,cond,1)
 	if db.CheckErr(err) == true {
		return
	}
	if len(rows) > 0 {
		timestamp := rows[0][0].Int64()
		if util.IsSameDay(timestamp, now) == false {
			bInsertNew = true
		}
	} else {
		bInsertNew = true
	}
	
	if bInsertNew {
		this.InsertNewDailyData(now)
	} else {
		colname = make([]string,0)
		colname = append(colname,"user_incr")
		colname = append(colname,"user_pay")
		colname = append(colname,"user_login")
		colname = append(colname,"pay_amount")
		colname = append(colname,"pay_orders")
		colname = append(colname,"online_max")
		cond = "1 ORDER BY id DESC"
		rows, err = db.Select("bidata_daily",colname,cond,1)
		if db.CheckErr(err) == true {
			return
		}
		if len(rows) > 0 {
			this.user_incr = rows[0][0].Int32()
			this.user_pay = rows[0][1].Int32()
			this.user_login = rows[0][2].Int32()
			this.pay_amount = rows[0][3].Int32()
			this.pay_orders = rows[0][4].Int32()
			this.online_max = rows[0][5].Int32()
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

	args := make([]*mysql.MysqlField, 0)
	args = append(args, &mysql.MysqlField{Name:"date", Value:datetime})
	args = append(args, &mysql.MysqlField{Name:"timestamp", Value:now})
	_, err := db.Insert("bidata_daily", args...)
	db.CheckErr(err)

	this.user_incr = 0
	this.user_pay = 0
	this.user_login = 0
	this.pay_amount = 0
	this.pay_orders = 0
	this.online_max = 0
}

func (this *BiData_daily) Update(now int64) {
	db := DB()
	if db == nil {
		panic("mysql should init")
		return
	}

	args := make([]*mysql.MysqlField, 0)
	args = append(args, &mysql.MysqlField{Name:"user_incr", Value:this.user_incr})
	args = append(args, &mysql.MysqlField{Name:"user_pay", Value:this.user_pay})
	args = append(args, &mysql.MysqlField{Name:"user_login", Value:this.user_login})
	args = append(args, &mysql.MysqlField{Name:"pay_amount", Value:this.pay_amount})
	args = append(args, &mysql.MysqlField{Name:"pay_orders", Value:this.pay_orders})
	args = append(args, &mysql.MysqlField{Name:"online_max", Value:this.online_max})
	
	cond := "1 ORDER BY `id` DESC LIMIT 1"
	_, err := db.Update("bidata_daily", cond, args...)
	db.CheckErr(err)

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
