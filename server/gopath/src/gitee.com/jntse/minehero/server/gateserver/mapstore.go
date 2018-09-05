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
type StoreProduct struct {
	bin *msg.StoreProductData
	dirty bool
}

func NewStoreProduct(config *table.TMapStoreDefine) *StoreProduct {
	data := &msg.StoreProductData{ Pid:pb.Uint32(config.Id), Sell:pb.Uint32(config.Nums), Sold:pb.Uint32(0) }
	prodcut := &StoreProduct{bin:data, dirty:true}
	return prodcut
}

func (cp *StoreProduct) Bin() *msg.StoreProductData {
	return cp.bin
}

func (cp *StoreProduct) Pid() uint32 {
	return cp.bin.GetPid()
}

func (cp *StoreProduct) Sold() uint32 {
	return cp.bin.GetSold()
}

func (cp *StoreProduct) Sell() uint32 {
	return cp.bin.GetSell()
}

func (cp *StoreProduct) SetSell(n uint32) {
	cp.bin.Sell = pb.Uint32(n)
	cp.dirty = true
}

func (cp *StoreProduct) AddSold(n uint32) {
	cp.bin.Sold = pb.Uint32(cp.Sold() + n)
	cp.dirty = true
}

func (cp *StoreProduct) Dirty() bool {
	return cp.dirty
}

func (cp *StoreProduct) SaveBin(pipe redis.Pipeliner) {
	pid := strconv.FormatUint(uint64(cp.Pid()), 10)
	cp.dirty = false
	if pipe == nil {
		if err := utredis.HSetProtoBin(Redis(), "carshop", pid, cp.bin); err != nil {
			log.Error("[汽车商店] 保存产品数据 Redis Error:%s", err)
		}
		log.Error("[汽车商店] 保存产品数据成功 pid[%d]", pid)
	}else {
		utredis.HSetProtoBinPipeline(pipe, "carshop", pid, cp.bin)
	}
}

func (cp *StoreProduct) LoadBin(rbuf []byte) *msg.StoreProductData {
	data := &msg.StoreProductData{}
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
type MapStore struct {
	products 		map[uint32] *StoreProduct
	ticker1Minite 	*util.GameTicker
}

func (shop* MapStore) Init() {
	shop.products = make(map[uint32] *StoreProduct)
	shop.ticker1Minite = util.NewGameTicker(time.Minute, shop.Handler1MiniteTick)
	shop.ticker1Minite.Start()

	shop.LoadDB()
	//shop.InitOnce()
}

func (shop* MapStore) Tick(now int64) {
	shop.ticker1Minite.Run(now)
}

func (shop *MapStore) Handler1MiniteTick(now int64) {
	pipe := Redis().Pipeline()
	for _, v := range shop.products {
		if v.Dirty() == true { v.SaveBin(pipe) }
	}
	_, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[汽车商店] 定时存盘RedisError:%s", err)
	}
	pipe.Close()
}

// 第一次初始化
//func (shop *MapStore) InitOnce() {
//	if len(shop.products) != 0 {
//		return
//	}
//	for _, v := range tbl.MapStoreBase.TMapStoreById {
//		shop.products[v.Id] = NewStoreProduct(v)
//	}
//	log.Info("[汽车商店] 首次初始化")
//	shop.SaveAll()
//}

//func (shop *MapStore) PutNewCar(pid, num uint32) {
//	config, find := tbl.MapStoreBase.TMapStoreById[pid]
//	if find == false {
//		log.Error("[汽车商店] 投放新的车辆失败，无效的商品id[%d]", pid)
//		return
//	}
//
//	product, ok := shop.products[pid]
//	if ok == true {
//		product.SetSell(product.Sell() + num)
//	}else {
//		product = NewStoreProduct(config)
//		product.SetSell(num)
//		shop.products[pid] = product
//	}
//
//	log.Info("[汽车商店] 投放新的车辆成功，商品id[%d] 数量[%d]", pid, num)
//}

// DB加载
func (shop* MapStore) LoadDB() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range tbl.MapStoreBase.TMapStoreById {
		pid := strconv.FormatUint(uint64(v.Id), 10)
		pipe.HGet("carshop", pid)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[汽车商店] MapStore LoadDB RedisError:%s ", err)
		return
	}

	for _, v := range cmds {
		if v.Err() == redis.Nil { continue }
		rbuf, _ := v.(*redis.StringCmd).Bytes()
		product := &StoreProduct{}
		if product.LoadBin(rbuf) != nil {
			shop.products[product.Pid()] = product
		}
	}
	log.Info("[汽车商店] DB加载数据 size=%d", len(shop.products))
}

// 保存
func (shop *MapStore) SaveAll() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range shop.products {
		v.SaveBin(pipe)
	}
	_, err := pipe.Exec()
	if err != nil {
		log.Error("[汽车商店] MapStore SaveAll Error:%s", err)
		return
	}
	log.Info("[汽车商店] 保存所有数据")
}

// 购买汽车
func (shop *MapStore) BuyCar(user *GateUser, shopid, pid uint32) {
	config, ok := tbl.MapStoreBase.TMapStoreById[pid]
	if ok == false {
		user.SendNotify("购买的车辆不存在")
		log.Error("[汽车商店] 玩家[%s %d] 购买车辆不在出售列表[%d]", user.Name(), user.Id(), pid)
		return
	}

	cartemplate, ok := tbl.TCarBase.TCarById[config.Carid]
	if ok == false {
		log.Error("[汽车商店] 玩家[%s %d] 购买车辆但车辆配置无效[%d]", user.Name(), user.Id(), config.Carid)
		return
	}

	if config.Price > user.GetGold() {
		user.SendNotify("金币不足")
		return
	}

	product, ok := shop.products[pid]
	if ok == false {
		product = NewStoreProduct(config)
		product.SaveBin(nil)
	}

	// 限量
	if product.Sell() <= product.Sold() {
		user.SendNotify("车辆数量不足")
		return
	}


	user.RemoveGold(config.Price, "购买车辆", true)
	product.AddSold(1)
	cardata := CarMgr().CreateNewCar(user.Id(), cartemplate.Id, user.Name(),config.Price)

	carmsg := &msg.GW2C_AddNewCar{}
	carmsg.Car = pb.Clone(cardata.PackBin()).(*msg.CarData)
	user.SendMsg(carmsg)

	// 刷新单条数据
	send := &msg.GW2C_UpdateMapStoreProduct{Product:pb.Clone(product.Bin()).(*msg.StoreProductData)}
	user.SendMsg(send)
}

// 发送汽车商店信息
//func (shop *MapStore) SendShopInfo(user *GateUser) {
//	send := &msg.GW2C_SendMapStoreInfo{}
//	for _, v := range shop.products {
//		send.Products = append(send.Products, pb.Clone(v.Bin()).(*msg.StoreProductData))
//	}
//	user.SendMsg(send)
//}

//func (shop *MapStore) DoGMCmd(cmd map[string]*util.VarType) {
//	opt, ok := cmd["opt"]
//	if !ok || opt == nil {
//		return
//	}
//
//	id, ok := cmd["id"]
//	if !ok || id == nil {
//		return
//	}
//
//	num, ok := cmd["num"]
//	if !ok || num == nil {
//		return
//	}
//
//	switch opt.String() {
//	case "inc":
//		shop.PutNewCar(id.Uint32(), num.Uint32())
//		break
//	case "dec":
//		break
//	}
//}
