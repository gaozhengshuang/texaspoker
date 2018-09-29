package main
import "gitee.com/jntse/minehero/pbmsg"
import "gitee.com/jntse/gotoolkit/log"
import pb "github.com/gogo/protobuf/proto"
import "gitee.com/jntse/minehero/server/tbl"
import "gitee.com/jntse/minehero/server/tbl/excel"


// --------------------------------------------------------------------------
/// @brief 道具
// --------------------------------------------------------------------------
type Item struct {
	bin *msg.ItemData
	base *table.ItemBaseDataDefine
}

func (t *Item) Bin() *msg.ItemData {
	return t.bin
}

func (t *Item) Id() int32 {
	return t.bin.GetId()
}

func (t *Item) BaseId() int32 {
	return t.base.Id
}

func (t *Item) Name() string {
	return t.base.Name
}

func (t *Item) Pos() int32 {
	return t.bin.GetPos()
}

func (t *Item) Num() int32 {
	return t.bin.GetNum()
}

func (t *Item) Inc(num int32) {
	t.bin.Num = pb.Int32(t.Num() + num)
}

func (t *Item) Dec(num int32) {
	if t.Num() < num { num = t.Num() }
	t.bin.Num = pb.Int32(t.Num() - num)
}

func (t *Item) SetPos(pos int32) {
	t.bin.Pos = pb.Int32(pos)
}

func NewItem(data *msg.ItemData) *Item {
	base := FindItemBase(data.GetId())
	if base == nil { 
		log.Error("创建道具[%d]，找不到配置", data.GetId())
		return nil
	}

	item := new(Item)
	item.bin = data
	item.base = base
	return item
}

func NewItemData(id int32, num int32, pos int32) *msg.ItemData {
	data := &msg.ItemData { Id:pb.Int32(id), Num:pb.Int32(num), Pos:pb.Int32(pos) }
	return data
}

func FindItemBase(id int32) *table.ItemBaseDataDefine {
	return tbl.ItemBase.ItemBaseDataById[id]
}

// --------------------------------------------------------------------------
/// @brief 背包
// --------------------------------------------------------------------------
type UserBag struct {
	items	map[int32]*Item
	names	map[string]*Item
	owner	*RoomUser
}

func (b *UserBag) Init(user *RoomUser) {
	b.items = make(map[int32]*Item)
	b.names = make(map[string]*Item)
	b.owner = user
}

func (b *UserBag) LoadBin(bin *msg.Serialize) {
	itembin := bin.GetItem();
	if itembin == nil { return }
	for _, data := range itembin.GetItems() {
		if data.GetPos() != int32(msg.ItemPos_Bag) { continue }
		item := NewItem(data)
		if item != nil {  b.LoadItemObj(item) }
	}
}

func (b *UserBag) PackBin(bin *msg.Serialize) {
	bin.Item = &msg.ItemBin{Items:make([]*msg.ItemData,0)}
	itembin := bin.GetItem();
	for _, item := range b.items {
		itembin.Items = append(itembin.Items, item.bin)
	}
}

func (b *UserBag) FindById(id int32) *Item {
	return b.items[id]
}

func (b *UserBag) FindByName(name string) *Item {
	return b.names[name]
}

func (b *UserBag) FindByPos(pos int32) *Item {
	for _, item := range b.items {
		if item.Pos() == pos { return item }
	}
	return nil
}

func (b *UserBag) LoadItemObj(item *Item) {
	b.items[item.Id()] = item
	b.names[item.Name()] = item
	log.Info("加载背包道具%+v", item.bin)
	log.Info("加载背包道具%+v", item.base)
}

func (b *UserBag) AddItem(id int32, num int32, reason string) *Item {
	item := b.FindById(id)
	if item != nil {
		item.Inc(num)
	}else {
		item = NewItem(NewItemData(id, num, int32(msg.ItemPos_Bag)))
		if item == nil { 
			log.Error("玩家[%d] 添加道具[%d]失败", b.owner.Id(), id)
			return nil 
		}
		b.items[item.Id()] = item
		b.names[item.Name()] = item
	}

	send := &msg.GW2C_PushPackageItemAdd{Itemid:pb.Int32(id), Num:pb.Int32(num) }
	b.owner.SendClientMsg(send)
	log.Info("玩家[%d] 添加道具[%d] 数量[%d] 库存[%d] 原因[%s]", b.owner.Id(), id, num, item.Num(), reason)
	return item
}

func (b *UserBag) RemoveItem(id int32, num int32, reason string) bool {

	item, leftnum := b.FindById(id), int32(0)
	if item == nil {
		log.Error("[道具] 道具[%d] 一个也没有", id)
		return  false
	}

	if item.Num() < num {
		log.Info("玩家[%d] 扣除道具[%d]失败 数量[%d] 库存[%d] 原因[%s]", b.owner.Id(), id, num, leftnum, reason)
		return false
	}

	if item.Num() > num {
		item.Dec(num)
		leftnum = item.Num()
	} else if item.Num() == num{
		delete(b.items, id)
		delete(b.names, item.Name())
	}
	log.Info("玩家[%d] 扣除道具[%d] 数量[%d] 库存[%d] 原因[%s]", b.owner.Id(), id, num, leftnum, reason)
	return true
}

