package main
import (
	"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/mysql"
)

type UserEntity struct {
	roleid  int64
	name    string
	head    string
	sex     int32
	account string
	level   int32
	exp     int32
	gold 	int64
	yuanbao int64
	diamond int64
	age     int32
	vipexp 	int32
	viplevel int32
	viptime1 int64
	viptime2 int64

	dirty   bool
}

func (u *UserEntity) Init(id int64) { 
	u.roleid = id
}

func (u *UserEntity) Id() int64 { return u.roleid }
func (u *UserEntity) Name() string { return u.name }
func (u *UserEntity) Head() string { return u.head }
func (u *UserEntity) Sex() int32 { return u.sex }
func (u *UserEntity) Account() string { return u.account }
func (u *UserEntity) Age() int32 { return u.age }
func (u *UserEntity) SetName(n string) { u.name = n; u.dirty = true }

//
func (u *UserEntity) Level() int32 { 
	u.level = util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "level").Val())
	return u.level
}
func (u *UserEntity) IncLevel(n int32)  { 
	u.level += n
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "level", int64(n))
}
func (u *UserEntity) Exp() int32 { 
	u.exp = util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "exp").Val())
	return u.exp
}
func (u *UserEntity) SetExp(exp int32) {
	u.exp = exp
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "exp", exp)
}

//
func (u *UserEntity) VipLevel() int32 {
	u.viplevel = util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "viplevel").Val())
	return u.viplevel
}
func (u *UserEntity) SetVipLevel(viplevel int32) {
	u.viplevel = viplevel
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "viplevel", viplevel)
}
func (u *UserEntity) VipExp() int32 {
	u.vipexp = util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "vipexp").Val())
	return u.vipexp
}
func (u *UserEntity) SetVipExp(vipexp int32) {
	u.vipexp = vipexp
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "vipexp", vipexp)
}
func (u *UserEntity) VipTime1() int64 {
	u.viptime1 = util.Atol(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "viptime1").Val())
	return u.viptime1
}
func (u *UserEntity) VipTime2() int64 {
	u.viptime2 = util.Atol(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "viptime2").Val())
	return u.viptime2
}
func (u *UserEntity) SetVipTime1(time int64) {
	u.viptime1 = time
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "viptime1", time)
}
func (u *UserEntity) SetVipTime2(time int64) {
	u.viptime2 = time
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "viptime2", time)
}

//
func (u *UserEntity) Gold() int64 {
	u.gold = util.Atol(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "gold").Val())
	return u.gold
}
func (u *UserEntity) IncGold(n int64) {
	u.gold += n
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "gold", n)
}
func (u *UserEntity) DecGold(n int64) {
	u.gold -= n
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "gold", -n)
}

//
func (u *UserEntity) YuanBao() int64 {
	u.yuanbao = util.Atol(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao").Val())
	return u.yuanbao
}
func (u *UserEntity) IncYuanBao(n int64) {
	u.yuanbao += n
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao", n)
}
func (u *UserEntity) DecYuanBao(n int64) {
	u.yuanbao -= n
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao", -n)
}

//
func (u *UserEntity) Diamond() int64 {
	u.diamond = util.Atol(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "diamond").Val())
	return u.diamond
}
func (u *UserEntity) IncDiamond(n int64) {
	u.diamond -= n
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "diamond", n)
}
func (u *UserEntity) DecDiamond(n int64) {
	u.diamond += n
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "diamond", -n)
}

func (u *UserEntity) DBLoad() {
	uid := u.roleid
	cmdmap, err := Redis().HGetAll(fmt.Sprintf("charbase_%d", uid)).Result()
	if err != nil {
		log.Error("玩家[%d] 获取玩家Charbase失败 RedisError[%s]", u.Id(), err)
		return
	}

	for k, v := range cmdmap {
		vt := util.NewVarType(v)
		switch k {
			case "name":        u.name = vt.String()
			case "face":        u.head = vt.String()
			case "sex":         u.sex = vt.Int32()
			case "account":     u.account = vt.String()
			case "level":       u.level = vt.Int32()
			case "exp":         u.exp = vt.Int32()
			case "gold":		u.gold = vt.Int64()
			case "yuanbao":		u.yuanbao = vt.Int64()
			case "diamond":		u.diamond = vt.Int64()
			case "age":         u.age = vt.Int32()
			case "viplevel": 	u.viplevel = vt.Int32()
			case "vipexp":   	u.vipexp = vt.Int32()
			case "viptime1": 	u.viptime1 = vt.Int64()
			case "viptime2":    u.viptime2 = vt.Int64()
		}
	}
}

func (u *UserEntity) DBSave() {
	if u.dirty == false {
		return
	}

	pipe := Redis().Pipeline()
	defer pipe.Close()
	u.dirty = false

	// charbase 部分基础数据
	uid := u.roleid
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "name",  u.name)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "face",  u.head)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "sex",   u.sex)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "account",  u.Account())
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "level", u.level)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "exp", u.exp)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "gold", u.gold)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "yuanbao", u.yuanbao)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "diamond", u.diamond)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "age", u.age)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "viplevel", u.viplevel)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "vipexp", u.vipexp)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "viptime1", u.viptime1)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "viptime2", u.viptime2)

	_, err := pipe.Exec()
	if err != nil {
		log.Error("玩家[%s %d] 保存charbase失败 RedisError[%s]", u.Name(), u.Id(), err)
		return
	}
	log.Info("玩家[%s %d] 保存charbase成功", u.Name(), u.Id())
}

// mysql存储
func (u *UserEntity) DBSaveMysql() {

	// Delete
	db := DB()
	if _, err := db.Delete("charbase", fmt.Sprintf("id=%d",u.Id())); err != nil {
		log.Error("玩家[%s %d] DBSaveMysql Delete失败[%s]", u.Name(), u.Id(), err)
		return
	}else {
		//affected , _ := rDel.RowsAffected()
		//log.Info("玩家[%s %d] DBSaveMysql Delete成功 affected[%d]", u.Name(), u.Id(), affected)
	}


	// Insert
	args := make([]*mysql.MysqlField, 0)
	args = append(args, &mysql.MysqlField{Name:"id", 		Value:u.Id()})
	args = append(args, &mysql.MysqlField{Name:"name", 		Value:u.Name()})
	args = append(args, &mysql.MysqlField{Name:"face", 		Value:u.Head()})
	args = append(args, &mysql.MysqlField{Name:"sex", 		Value:u.Sex()})
	args = append(args, &mysql.MysqlField{Name:"account", 	Value:u.Account()})
	args = append(args, &mysql.MysqlField{Name:"level", 	Value:u.Level()})
	args = append(args, &mysql.MysqlField{Name:"exp", 		Value:u.Exp()})
	args = append(args, &mysql.MysqlField{Name:"gold", 		Value:u.Gold()})
	args = append(args, &mysql.MysqlField{Name:"yuanbao",	Value:u.YuanBao()})
	args = append(args, &mysql.MysqlField{Name:"diamond", 	Value:u.Diamond()})
	args = append(args, &mysql.MysqlField{Name:"age", 		Value:u.Age()})
	args = append(args, &mysql.MysqlField{Name:"viplevel", 	Value:u.VipLevel()})
	args = append(args, &mysql.MysqlField{Name:"vipexp", 	Value:u.VipExp()})
	args = append(args, &mysql.MysqlField{Name:"viptime1", 	Value:u.VipTime1()})
	args = append(args, &mysql.MysqlField{Name:"viptime2", 	Value:u.VipTime2()})
	if rInsert, err := db.Insert("charbase", args...); err != nil {
		log.Error("玩家[%s %d] DBSaveMysql Insert失败[%s]", u.Name(), u.Id(), err)
		return
	}else {
		affected , _ := rInsert.RowsAffected()
		log.Info("玩家[%s %d] DBSaveMysql Insert成功 affected[%d]", u.Name(), u.Id(), affected)
	}
}

func (u *UserEntity) FillEntity() *msg.EntityBase {
	info := &msg.EntityBase{}
	info.Roleid = pb.Int64(u.roleid)
	info.Name = pb.String(u.name)
	info.Head = pb.String(u.head)
	info.Sex = pb.Int32(u.sex)
	info.Account = pb.String(u.account)

	info.Level = pb.Int32(u.Level())
	info.Exp = pb.Int32(u.Exp())
	info.Gold = pb.Int64(u.Gold())
	info.Yuanbao = pb.Int64(u.YuanBao())
	info.Diamond = pb.Int64(u.Diamond())

	info.Age = pb.Int32(u.age)
	info.Viplevel = pb.Int32(u.viplevel)
	info.Vipexp = pb.Int32(u.vipexp)
	info.Viptime1 = pb.Int64(u.viptime1)
	info.Viptime2 = pb.Int64(u.viptime2)

	return info
}

