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

type CarProduct struct {
	bin *msg.CarProductData
}

type CarShop struct {
	products 		map[uint32] *msg.CarProductData
	ticker1Minite 	*util.GameTicker
}

func (shop* CarShop) Init() {
	shop.products = make(map[uint32] *msg.CarProductData)
	shop.ticker1Minite = util.NewGameTicker(time.Minute, shop.Handler1MiniteTick)
	shop.ticker1Minite.Start()

	shop.LoadDB()
	shop.InitOnce()
}

func (shop* CarShop) Tick(now int64) {
	shop.ticker1Minite.Run(now)
}

func (shop *CarShop) Handler1MiniteTick(now int64) {
	;
}


// 第一次初始化
func (shop *CarShop) InitOnce() {
	if len(shop.products) != 0 {
		return
	}

	for _, v := range tbl.CarShopBase.TCarShopById {
		product := &msg.CarProductData{ Pid:pb.Uint32(v.Id), Sell:pb.Uint32(v.Nums), Sold:pb.Uint32(0) }
		shop.products[v.Id] = product
	}
	log.Info("汽车商店首次初始化")
	shop.SaveAll()
}

// 反序列化
func (shop* CarShop) LoadProduct(rbuf []byte) *msg.CarProductData {
	data := &msg.CarProductData{}
	if err := pb.Unmarshal(rbuf, data); err != nil {
		return nil
	}
	return data
}

// 保存单个产品数据
func (shop* CarShop) SaveProduct(product *msg.CarProductData) {
	pid := strconv.FormatUint(uint64(product.GetPid()), 10)
	utredis.HSetProtoBin(Redis(), "carshop", pid, product)
}

// DB加载
func (shop* CarShop) LoadDB() {
	pipe := Redis().Pipeline()
	for _, v := range tbl.CarShopBase.TCarShopById {
		pid := strconv.FormatUint(uint64(v.Id), 10)
		pipe.HGet("carshop", pid)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("CarShop LoadDB Error:%s ", err)
		return
	}

	for _, v := range cmds {
		if v.Err() == redis.Nil { continue }
		rbuf, _ := v.(*redis.StringCmd).Bytes()
		productdata := shop.LoadProduct(rbuf)
		if productdata == nil { continue }
		shop.products[productdata.GetPid()] = productdata
	}
	log.Info("汽车商店DB加载数据 size=%d", len(shop.products))
}

// 保存
func (shop *CarShop) SaveAll() {
	pipe := Redis().Pipeline()
	for _, v := range shop.products {
		pid := strconv.FormatUint(uint64(v.GetPid()), 10)
		utredis.HSetProtoBinPipeline(pipe, "carshop", pid, v)
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
		product = shop.addNewProduct(config)
	}

	// 限量
	if product.GetSell() >= product.GetSold() {
		user.SendNotify("车辆数量不足")
		return
	}


	user.RemoveGold(config.Price, "购买车辆", true)
	product.Sell = pb.Uint32(product.GetSell() - 1)
	CarMgr().CreateNewCar(user.Id(), cartemplate.Id, user.Name())


	// 刷新单条数据
	send := &msg.GW2C_UpdateCarShopProduct{Product:pb.Clone(product).(*msg.CarProductData)}
	user.SendMsg(send)
}

func (shop *CarShop) addNewProduct(config *table.TCarShopDefine) *msg.CarProductData {
	product := &msg.CarProductData{ Pid:pb.Uint32(config.Id), Sell:pb.Uint32(config.Nums), Sold:pb.Uint32(0) }
	shop.products[config.Id] = product
	shop.SaveProduct(product)
	return product
}

// 发送汽车商店信息
func (shop *CarShop) SendShopInfo(user *GateUser) {
	send := &msg.GW2C_SendCarShopInfo{}
	for _, v := range shop.products {
		send.Products = append(send.Products, pb.Clone(v).(*msg.CarProductData))
	}
	user.SendMsg(send)
}


