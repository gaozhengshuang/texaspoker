package main
import(
	"fmt"
	"github.com/go-redis/redis"
	pb "github.com/gogo/protobuf/proto"

	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"

	"gitee.com/jntse/minehero/pbmsg"
	"gitee.com/jntse/minehero/server/tbl"
	"gitee.com/jntse/minehero/server/tbl/excel"
)

// --------------------------------------------------------------------------
/// @brief 道具
// --------------------------------------------------------------------------
type Item struct {
	base 	*table.ItemBaseDataDefine
	u 		*GateUser
	id 		int32
	num 	int32
	dirty 	bool
}

func (t *Item) Id() int32 {
	return t.id
}

func (t *Item) Name() string {
	return t.base.Name
}

func (t *Item) Num() int32 {
	return t.num
}

func (t *Item) Inc(num int32) {
	t.num += num
	t.dirty = true
}

func (t *Item) Dec(num int32) {
	if t.Num() < num { num = t.Num() }
	t.num -= num
	t.dirty = true
}

func (t *Item) Dirty() bool {
	return t.dirty
}

func (t *Item) LoadBin(id int32, pipe redis.Pipeliner) {
	pipe.HGetAll(fmt.Sprintf("userbagitem_%d_%d", t.u.Id(), id))
}

func (t *Item) SaveBin(pipe redis.Pipeliner) {
	t.dirty = false
	if pipe != nil {
		pipe.HSet(fmt.Sprintf("userbagitem_%d_%d", t.u.Id(), t.Id()), "num", t.Num())
		return
	}
	Redis().HSet(fmt.Sprintf("userbagitem_%d_%d", t.u.Id(), t.Id()), "num", t.Num())
	log.Info("[背包] 保存背包成功 id[%d]", t.Id())
}

func (t *Item) AddBin() {
	t.dirty = false
	mfields := map[string]interface{}{"id":t.Id(), "num":t.Num()}
	Redis().HMSet(fmt.Sprintf("userbagitem_%d_%d", t.u.Id(), t.Id()), mfields)
	Redis().SAdd(fmt.Sprintf("userbagitems_%d", t.u.Id()), t.Id())
}

func (t *Item) RemoveBin() {
	t.dirty = false
	Redis().Del(fmt.Sprintf("userbagitem_%d_%d", t.u.Id(), t.Id()))
	Redis().SRem(fmt.Sprintf("userbagitems_%d", t.u.Id()), t.Id())
}

func LoadDetail(u* GateUser, cmd redis.Cmder) *Item {
	cmdbase , ok := cmd.(*redis.StringStringMapCmd)
	if ok == false {
		log.Error("[背包] 玩家[%s %d] 加载DB详情失败 [%d]", u.Name(), u.Id())
		return nil
	}

	var id, num int32 = 0, 0
	for k, v := range cmdbase.Val() {
		if k == "id" 	{ id = util.NewVarType(v).Int32() }
		if k == "num" 	{ num = util.NewVarType(v).Int32() }
	}

	if num == 0 {
		return nil
	}

	return NewItem(id, num, u)
}

func NewItem(id, num int32, u *GateUser) *Item {
	base := FindItemBase(id)
	if base == nil { 
		log.Error("创建道具[%d]，找不到配置", id)
		return nil
	}
	item := &Item{id:id, num:num, base:base, dirty:true, u:u}
	return item
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
	owner   *GateUser
}

func (b *UserBag) Init(user *GateUser) {
	b.items = make(map[int32]*Item)
	b.names = make(map[string]*Item)
	b.owner = user
}

func (b *UserBag) Id() int64 {
	return b.owner.Id()
}

func (b *UserBag) Name() string {
	return b.owner.Name()
}

func (b *UserBag) Size() int32 {
	return int32(len(b.items))
}

func (b *UserBag) DBLoad() {
	b.Clean()
	idlist, err := Redis().SMembers(fmt.Sprintf("userbagitems_%d", b.Id())).Result()
	if err != nil {
		log.Error("[背包] 玩家[%s %d] 加载DB背包列表失败 RedisError[%s]", b.Name(), b.Id(), err)
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	for _, v := range idlist {
		id, item := util.Atoi(v), &Item{u:b.owner}
		item.LoadBin(id, pipe)
	}
	cmds, err := pipe.Exec()
	if err != nil && err != redis.Nil {
		log.Error("[背包] 玩家[%s %d] 加载DB背包失败 RedisError[%s]", b.Name(), b.Id(), err)
		return
	}

	for i:=0; i < len(cmds); i++ {
		if item := LoadDetail(b.owner, cmds[i]); item != nil {
			b.items[item.Id()] = item
		}
	}

	if b.Size() != 0 {
		log.Info("[背包] 玩家[%s %d] 加载DB背包成功，数量[%d]", b.Name(), b.Id(), b.Size() )
	}
}

// 存盘
func (b *UserBag) DBSave() {
	pipe := Redis().Pipeline()
	for _, v := range b.items {
		if v.Dirty() == true { v.SaveBin(pipe) }
	}

	if cmds, err := pipe.Exec(); err != nil {
		log.Error("[背包] 玩家[%s %d] 保存背包失败 RedisError[%s]", b.Name(), b.Id(), err)
	}else if len(cmds) != 0 {
		log.Info("[背包] 玩家[%s %d] 保存背包成功，数量[%d]", b.Name(), b.Id(), len(cmds))
	}
	pipe.Close()
}

func (b *UserBag) FindById(id int32) *Item {
	return b.items[id]
}

func (b *UserBag) FindByName(name string) *Item {
	return b.names[name]
}

func (b *UserBag) AddItem(id int32, num int32, reason string) *Item {
	item := b.FindById(id)
	if item != nil {
		item.Inc(num)
	}else {
		item = NewItem(id, num, b.owner)
		if item == nil { 
			log.Error("玩家[%d] 添加道具[%d]失败", b.owner.Id(), id)
			return nil
		}
		b.items[item.Id()], b.names[item.Name()] = item, item
		item.AddBin()
	}

	send := &msg.GW2C_PushPackageItemAdd{Itemid:pb.Int32(id), Num:pb.Int32(num) }
	b.owner.SendMsg(send)

	log.Info("玩家[%d] 添加道具[%d] 数量[%d] 库存[%d] 原因[%s]", b.owner.Id(), id, num, item.Num(), reason)
	return item
}

func (b *UserBag) RemoveItem(id int32, num int32, reason string) bool {
	item, leftnum := b.FindById(id), int32(0)
	if item == nil { 
		log.Error("[道具] 道具[%d] 数量为0", id)
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
		item.RemoveBin()
	}

	send := &msg.GW2C_PushPackageItemRemove{Itemid:pb.Int32(id), Num:pb.Int32(num) }
	b.owner.SendMsg(send)

	log.Info("玩家[%d] 扣除道具[%d] 数量[%d] 库存[%d] 原因[%s]", b.owner.Id(), id, num, leftnum, reason)
	return true
}

func (b *UserBag) GetItemNum(id int32) int32 {
	item, _ := b.FindById(id), int32(0)
	if item == nil { 
		return  0
	}
	return item.Num()
}

func (b *UserBag) Clean() {
	b.items , b.names = nil, nil
	b.items = make(map[int32]*Item)
	b.names = make(map[string]*Item)
}

