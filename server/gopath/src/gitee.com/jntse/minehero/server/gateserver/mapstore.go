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
	data := &msg.StoreProductData{ Pid:pb.Uint32(config.Id), Shopid:pb.Uint32(config.ShopId), Sell:pb.Uint32(config.Nums), Sold:pb.Uint32(0) }
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
		if err := utredis.HSetProtoBin(Redis(), "mapstore", pid, cp.bin); err != nil {
			log.Error("[地图商店] 保存产品数据 Redis Error:%s", err)
		}
		log.Error("[地图商店] 保存产品数据成功 pid[%d]", pid)
	}else {
		utredis.HSetProtoBinPipeline(pipe, "mapstore", pid, cp.bin)
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

func (store* MapStore) Init() {
	store.products = make(map[uint32] *StoreProduct)
	store.ticker1Minite = util.NewGameTicker(time.Minute, store.Handler1MiniteTick)
	store.ticker1Minite.Start()
	store.LoadDB()
}

func (store* MapStore) Tick(now int64) {
	store.ticker1Minite.Run(now)
}

func (store *MapStore) Handler1MiniteTick(now int64) {
	pipe := Redis().Pipeline()
	for _, v := range store.products {
		if v.Dirty() == true { v.SaveBin(pipe) }
	}
	_, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[地图商店] 定时存盘RedisError:%s", err)
	}
	pipe.Close()
}

func (store *MapStore) Refresh() {
	store.products = make(map[uint32] *StoreProduct)
	for _, v := range tbl.MapStoreBase.TMapStoreById {
		store.products[v.Id] = NewStoreProduct(v)
	}
	log.Info("[地图商店] 刷新所有商店库存 总数[%d]", len(store.products))
	store.SaveAll()
}

// 投放新库存
func (store *MapStore) PutNewProduct(pid, num uint32) {
	config, find := tbl.MapStoreBase.TMapStoreById[pid]
	if find == false {
		log.Error("[地图商店] 投放新的商品失败，无效的商品id[%d]", pid)
		return
	}

	product, ok := store.products[pid]
	if ok == true {
		product.SetSell(product.Sell() + num)
	}else {
		product = NewStoreProduct(config)
		product.SetSell(num)
		store.products[pid] = product
	}

	log.Info("[地图商店] 投放新的商品成功，商品id[%d] 数量[%d]", pid, num)
}

// DB加载
func (store* MapStore) LoadDB() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range tbl.MapStoreBase.TMapStoreById {
		pid := strconv.FormatUint(uint64(v.Id), 10)
		pipe.HGet("mapstore", pid)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[地图商店] MapStore LoadDB RedisError:%s ", err)
		return
	}

	for _, v := range cmds {
		if v.Err() == redis.Nil { continue }
		rbuf, _ := v.(*redis.StringCmd).Bytes()
		product := &StoreProduct{}
		if product.LoadBin(rbuf) != nil {
			store.products[product.Pid()] = product
		}
	}
	log.Info("[地图商店] DB加载数据 size=%d", len(store.products))
}

// 保存
func (store *MapStore) SaveAll() {
	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range store.products {
		v.SaveBin(pipe)
	}
	_, err := pipe.Exec()
	if err != nil {
		log.Error("[地图商店] MapStore SaveAll Error:%s", err)
		return
	}
	log.Info("[地图商店] 保存所有数据")
}

// 购买汽车
func (store *MapStore) BuyProduct(user *GateUser, shopid, pid, num uint32) {
	config, ok := tbl.MapStoreBase.TMapStoreById[pid]
	if ok == false {
		user.SendNotify("购买的商品不存在")
		log.Error("[地图商店] 玩家[%s %d] 购买商品不在出售列表[%d]", user.Name(), user.Id(), pid)
		return
	}

	itembase, ok := tbl.ItemBase.ItemBaseDataById[config.Id]
	if ok == false {
		log.Error("[地图商店] 玩家[%s %d] 购买商品但商品配置无效[%d]", user.Name(), user.Id(), config.Id)
		return
	}

	product, ok := store.products[pid]
	if ok == false {
		product = NewStoreProduct(config)
		product.SaveBin(nil)
	}

	// 限量
	if product.Sell() < product.Sold() + num {
		user.SendNotify("商品数量不足")
		return
	}

	// 价格检查
	if config.MoneyType == uint32(msg.MoneyType__Gold) {
		if config.Price > user.GetGold() {
			user.SendNotify("金币不足")
			return
		}
		user.RemoveGold(config.Price, "地图商店购买", true)
	}else if config.MoneyType == uint32(msg.MoneyType__Diamond) {
		if config.Price > user.GetDiamond() {
			user.SendNotify("钻石不足")
			return
		}
		user.RemoveDiamond(config.Price, "地图商店购买", true)
	}else {
		log.Error("[地图商店] 玩家[%s %d] 购买商品但商品价格类型无效%d", user.Name(), user.Id(), config.MoneyType)
		return
	}

	product.AddSold(1)
	user.AddItem(itembase.Id, num, "地图商店购买", true)

	// 刷新单条数据
	send := &msg.GW2C_UpdateMapStoreProduct{Product:pb.Clone(product.Bin()).(*msg.StoreProductData)}
	user.SendMsg(send)
}

// 发送地图商店信息
func (store *MapStore) SendStoreInfo(user *GateUser, shopid uint32) {
	send := &msg.GW2C_SendMapStoreInfo{Shopid:pb.Uint32(shopid)}
	for _, v := range store.products {
		send.Products = append(send.Products, pb.Clone(v.Bin()).(*msg.StoreProductData))
	}
	user.SendMsg(send)
}

func (store *MapStore) DoGMCmd(cmd map[string]*util.VarType) {
	opt, ok := cmd["opt"]
	if !ok || opt == nil {
		return
	}

	id, ok := cmd["id"]
	if !ok || id == nil {
		return
	}

	num, ok := cmd["num"]
	if !ok || num == nil {
		return
	}

	switch opt.String() {
	case "inc":
		store.PutNewProduct(id.Uint32(), num.Uint32())
		break
	case "dec":
		break
	}
}


