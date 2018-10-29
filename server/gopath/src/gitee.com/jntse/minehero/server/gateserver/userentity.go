package main
import (
	"fmt"
	"gitee.com/jntse/minehero/pbmsg"
	pb "github.com/gogo/protobuf/proto"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/gotoolkit/log"
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
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "level", int64(n))
}
func (u *UserEntity) Exp() int32 { 
	u.exp = util.Atoi(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "exp").Val())
	return u.exp
}
func (u *UserEntity) SetExp(exp int32) { 
	Redis().HSet(fmt.Sprintf("charbase_%d", u.Id()), "exp", exp)
}

//
func (u *UserEntity) Gold() int64 {
	u.gold = util.Atol(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "gold").Val())
	return u.gold
}
func (u *UserEntity) IncGold(n int64) {
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "gold", n)
}
func (u *UserEntity) DecGold(n int64) {
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "gold", -n)
}

//
func (u *UserEntity) YuanBao() int64 {
	u.yuanbao = util.Atol(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao").Val())
	return u.yuanbao
}
func (u *UserEntity) IncYuanBao(n int64) {
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao", n)
}
func (u *UserEntity) DecYuanBao(n int64) {
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "yuanbao", -n)
}

//
func (u *UserEntity) Diamond() int64 {
	u.diamond = util.Atol(Redis().HGet(fmt.Sprintf("charbase_%d", u.Id()), "diamond").Val())
	return u.diamond
}
func (u *UserEntity) IncDiamond(n int64) {
	Redis().HIncrBy(fmt.Sprintf("charbase_%d", u.Id()), "diamond", n)
}
func (u *UserEntity) DecDiamond(n int64) {
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
	//pipe.HSet(fmt.Sprintf("charbase_%d", uid), "account",  u.Account())
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "level", u.level)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "exp", u.exp)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "gold", u.gold)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "yuanbao", u.yuanbao)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "diamond", u.diamond)
	pipe.HSet(fmt.Sprintf("charbase_%d", uid), "age", u.age)

	_, err := pipe.Exec()
	if err != nil {
		log.Error("玩家[%s %d] 保存charbase失败 RedisError[%s]", u.Name(), u.Id(), err)
		return
	}
	log.Info("玩家[%s %d] 保存charbase成功", u.Name(), u.Id())
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
	return info
}

