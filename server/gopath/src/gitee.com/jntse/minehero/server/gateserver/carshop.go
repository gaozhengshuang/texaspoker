package main
import (
	"time"
	"strconv"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	pb "github.com/gogo/protobuf/proto"

	"github.com/go-redis/redis"
)

// --------------------------------------------------------------------------
/// @brief 
/// @brief 
/// @brief 
// --------------------------------------------------------------------------
type CarProduct struct {
	bin *msg.CarProductData
	dirty bool
}

func NewCarProduct(config *table.TCarShopDefine) *CarProduct {
	data := &msg.CarProductData{ Pid:pb.Uint32(config.Id), Sell:pb.Uint32(config.Nums), Sold:pb.Uint32(0) }
	prodcut := &CarProduct{bin:data, dirty:true}
	return prodcut
}

func (cp *CarProduct) Bin() *msg.CarProductData {
	return cp.bin
}

func (cp *CarProduct) Pid() uint32 {
	return cp.bin.GetPid()
}

func (cp *CarProduct) Sold() uint32 {
	return cp.bin.GetSold()
}

func (cp *CarProduct) Sell() uint32 {
	return cp.bin.GetSell()
}

func (cp *CarProduct) AddSell(n uint32) {
	cp.bin.Sell = pb.Uint32(cp.Sell() + 1)
	cp.dirty = true
}

func (cp *CarProduct) Dirty() bool {
	return cp.dirty
}

func (cp *CarProduct) SaveBin(pipe redis.Pipeliner) {
	pid := strconv.FormatUint(uint64(cp.Pid()), 10)
	cp.dirty = false
	if pipe == nil {
		if err := utredis.HSetProtoBin(Redis(), "carshop", pid, cp.bin); err != nil {
			log.Error("汽车商店保存产品数据 Redis Error:%s", err)
		}
	}else {
		utredis.HSetProtoBinPipeline(pipe, "carshop", pid, cp.bin)
	}
}

func (cp *CarProduct) LoadBin(rbuf []byte) *msg.CarProductData {
	data := &msg.CarProductData{}
	if err := pb.Unmarshal(rbuf, data); err != nil {
		return nil
	}
	cp.bin = data
	return data
}


// --------------------------------------------------------------------------
/// @brief 
/// @brief 
/// @brief 
// --------------------------------------------------------------------------
type CarShop struct {
	products 		map[uint32] *CarProduct
	ticker1Minite 	*util.GameTicker
}

func (shop* CarShop) Init() {
	shop.products = make(map[uint32] *CarProduct)
	shop.ticker1Minite = util.NewGameTicker(time.Minute, shop.Handler1MiniteTick)
	shop.ticker1Minite.Start()

	shop.LoadDB()
	shop.InitOnce()
}

func (shop* CarShop) Tick(now int64) {
	shop.ticker1Minite.Run(now)
}

func (shop *CarShop) Handler1MiniteTick(now int64) {
}

// 第一次初始化
func (shop *CarShop) InitOnce() {
	if len(shop.products) != 0 {
		return
	}
	for _, v := range tbl.CarShopBase.TCarShopById {
		shop.products[v.Id] = NewCarProduct(v)
	}
	log.Info("汽车商店首次初始化")
	shop.SaveAll()
}

// DB加载
func (shop* CarShop) LoadDB() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range tbl.CarShopBase.TCarShopById {
		pid := strconv.FormatUint(uint64(v.Id), 10)
		pipe.HGet("carshop", pid)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("CarShop LoadDB RedisError:%s ", err)
		return
	}

	for _, v := range cmds {
		if v.Err() == redis.Nil { continue }
		rbuf, _ := v.(*redis.StringCmd).Bytes()
		product := &CarProduct{}
		if product.LoadBin(rbuf) != nil {
			shop.products[product.Pid()] = product
		}
	}
	log.Info("汽车商店DB加载数据 size=%d", len(shop.products))
}

// 保存
func (shop *CarShop) SaveAll() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range shop.products {
		v.SaveBin(pipe)
	}
	_, err := pipe.Exec()
	if err != nil {
		log.Error("CarShop SaveAll Error:%s", err)
		return
	}
	log.Info("汽车商店保存所有数据")
}

// 购买汽车
func (shop *CarShop) BuyCar(user *GateUser, shopid, pid uint32) {
	config, ok := tbl.CarShopBase.TCarShopById[pid]
	if ok == false {
		user.SendNotify("购买的车辆不存在")
		log.Error("玩家[%s %d] 购买车辆不在出售列表[%d]", user.Name(), user.Id(), pid)
		return
	}

	cartemplate, ok := tbl.TCarBase.TCarById[config.Carid]
	if ok == false {
		log.Error("玩家[%s %d] 购买车辆但车辆配置无效[%d]", user.Name(), user.Id(), config.Carid)
		return
	}

	if config.Price > user.GetGold() {
		user.SendNotify("金币不足")
		return
	}

	product, ok := shop.products[pid]
	if ok == false {
		product = NewCarProduct(config)
		product.SaveBin(nil)
	}

	// 限量
	if product.Sell() <= product.Sold() {
		user.SendNotify("车辆数量不足")
		return
	}


	user.RemoveGold(config.Price, "购买车辆", true)
	product.AddSell(1)
	CarMgr().CreateNewCar(user.Id(), cartemplate.Id, user.Name())


	// 刷新单条数据
	send := &msg.GW2C_UpdateCarShopProduct{Product:pb.Clone(product.Bin()).(*msg.CarProductData)}
	user.SendMsg(send)
}

// 发送汽车商店信息
func (shop *CarShop) SendShopInfo(user *GateUser) {
	send := &msg.GW2C_SendCarShopInfo{}
	for _, v := range shop.products {
		send.Products = append(send.Products, pb.Clone(v.Bin()).(*msg.CarProductData))
	}
	user.SendMsg(send)
}


