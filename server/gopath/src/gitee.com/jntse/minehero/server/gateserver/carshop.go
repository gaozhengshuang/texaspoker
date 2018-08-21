package main
import (
	"strconv"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/redis"
	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
	pb "github.com/gogo/protobuf/proto"

	"github.com/go-redis/redis"
)

type CarShop struct {
	products map[uint32] *msg.CarProductData
}

func (shop* CarShop) Init() {
	log.Info("汽车商店初始化")
	shop.LoadDB()
	shop.InitOnce()
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

func (shop* CarShop) SaveProduct(product *msg.CarProductData) {
}

// DB加载
func (shop* CarShop) LoadDB() {
	pipe := Redis().Pipeline()
	for _, v := range tbl.CarShopBase.TCarShopById {
		pid := strconv.FormatUint(uint64(v.Id), 10)
		pipe.HGet("carshop", pid)
	}
	cmds, err := pipe.Exec()
	if err != nil {
		log.Error("CarShop LoadDB Error:%s ", err)
		return
	}

	for _, v := range cmds {
		rbuf, _ := v.(*redis.StringCmd).Bytes()
		productdata := shop.LoadProduct(rbuf)
		if productdata == nil { continue }
		shop.products[productdata.GetPid()] = productdata
	}
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
}

// 购买汽车
func (shop *CarShop) BuyCar(user *GateUser, pid uint32) {
	config, ok := tbl.CarShopBase.TCarShopById[pid]
	if ok == false {
		user.SendNotify("购买的车辆不存在")
		log.Error("玩家[%s %d] 购买的车辆不存在[%d]", user.Name(), user.Id(), pid)
		return
	}

	if config.Price > user.GetGold() {
		user.SendNotify("金币不足")
		return
	}

	product, ok := shop.products[pid]
	if ok == false {
		product = shop.AddNewProduct(config)
	}

	// 限量
	if product.GetSell() >= product.GetSold() {
		user.SendNotify("车辆数量不足")
		return
	}

	user.RemoveGold(config.Price, "购买车辆", true)
	product.Sell = pb.Uint32(product.GetSell() - 1)


	send := &msg.GW2C_UpdateCarShopProduct{Product:pb.Clone(product).(*msg.CarProductData)}
	user.SendMsg(send)
}

func (shop *CarShop) AddNewProduct(config *table.TCarShopDefine) *msg.CarProductData {
	product := &msg.CarProductData{ Pid:pb.Uint32(config.Id), Sell:pb.Uint32(config.Nums), Sold:pb.Uint32(0) }
	shop.products[config.Id] = product
	return product
}

func (shop *CarShop) SendShopInfo(user *GateUser) {
	send := &msg.GW2C_SendCarShopInfo{}
	for _, v := range shop.products {
		send.Products = append(send.Products, pb.Clone(v).(*msg.CarProductData))
	}
	user.SendMsg(send)
}


