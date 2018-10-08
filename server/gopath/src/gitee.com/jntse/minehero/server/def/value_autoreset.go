package def
import (
	"fmt"
	"time"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
)

// 变量自动重置(每日整点h/每周星期d)
type AutoResetValue struct {
	id			int32		//
	kind		int32		// 每日/每周
	weeks		int32		// weeks
	hours		int32		// hours
	value 		int64		// value
	lastreset	int64		//
	nextreset	int64		// tmp timestamp
}

// 变量自动重置类型
const (
	AutoResetValueKind_Day 	= 1;
	AutoResetValueKind_Week = 2;
)

// 变量枚举类型
const (
	CTNone int32 = iota		//value --> 0
	CTTimeRewardRound1		//初级局内时间奖励轮数
	CTTimeRewardSec1		//初级局内时间奖励时间计时
	CTTimeRewardRound2		//中级
	CTTimeRewardSec2		//中级
	CTTimeRewardRound3		//高级
	CTTimeRewardSec3		//高级
)

func NewAutoResetValue(kind, id, weeks, hours int32, value int64) *AutoResetValue {
	v := &AutoResetValue{id:id, kind:kind, weeks:weeks, hours:hours, lastreset:0, nextreset:0}
	v.init()
	v.inc(value)
	return v
}

func (t *AutoResetValue) init() {
	switch t.kind {
		case AutoResetValueKind_Day:	t.dayInit()
		case AutoResetValueKind_Week:	t.weekInit()
	}
}

func (t *AutoResetValue) dayInit() {
	now := util.CURTIME()
	baseline := util.GetDayStart() + int64(t.hours * util.HourSec)

	if t.lastreset >= baseline || now >= baseline {
		baseline += util.DaySec
	}

	if t.lastreset == 0 {	// firt init
		t.value ,t.lastreset, t.nextreset = 0, now, baseline
		return
	}

	if now - t.lastreset >= util.DaySec {	// over 24 hours
		t.value ,t.lastreset, t.nextreset = 0, now, baseline
		return
	}

	t.nextreset = baseline
}

func (t *AutoResetValue) weekInit() {
	now := util.CURTIME()
	weeks := t.weeks
	if t.weeks == 0 { weeks = 7 }	// 0 is Sunday, but treat as 7
	mathweek := weeks - 1
	baseline := util.GetWeekStart(now) + int64(mathweek * util.DaySec) + int64(t.hours * util.HourSec)
	if t.lastreset >= baseline || now >= baseline {
		baseline += util.DaySec * 7
	}

	if t.lastreset == 0 {	// firt init
		t.value ,t.lastreset, t.nextreset = 0, now, baseline
		return
	}

	if now - t.lastreset >= util.DaySec * 7 {	// over 1 week 
		t.value ,t.lastreset, t.nextreset = 0, now, baseline
		return
	}

	t.nextreset = baseline
}

func (t *AutoResetValue) loadBin(bin *msg.AutoResetValue) {
	t.id, t.hours, t.value = bin.GetId(), bin.GetHours(), bin.GetValue()
	t.init()
}

func (t *AutoResetValue) packBin() *msg.AutoResetValue {
	bin := &msg.AutoResetValue{Id:pb.Int32(t.id), Hours:pb.Int32(t.hours), Value:pb.Int64(t.value)}
	return bin
}

func (t *AutoResetValue) check() {
	now := util.CURTIME()
	if now < t.nextreset {
		return
	}

	t.value = 0
	t.lastreset = now
	switch t.kind {
		case AutoResetValueKind_Day:
			t.nextreset += util.DaySec
		case AutoResetValueKind_Week:
			t.nextreset += util.DaySec * 7
	}
}

func (t *AutoResetValue) val() int64 {
	t.check()
	return t.value
}

func (t *AutoResetValue) inc(n int64) {
	t.check()
	t.value += n
}

func (t *AutoResetValue) dec(n int64) {
	t.check()
	t.value -= n
}

func (t *AutoResetValue) set(n int64) {
	t.check()
	t.value = n
}

// 自动重置变量管理器
type AutoResetValues struct {
	values map[int32]*AutoResetValue
}

func (m *AutoResetValues) Init() {
	m.values = make(map[int32]*AutoResetValue)
}

// 加载
func (m *AutoResetValues) LoadBin(bin *msg.AutoResetValues) {
	for _, v := range bin.Values {
		vv := &AutoResetValue{}
		vv.loadBin(v)
		m.values[vv.id] = vv
	}
}

// 打包
func (m *AutoResetValues) PackBin() *msg.AutoResetValues {
	bin := &msg.AutoResetValues{Values:make([]*msg.AutoResetValue, 0)}
	for _, v := range m.values {
		bin.Values = append(bin.Values, v.packBin())
	}
	return bin
}

// 获取值
func (m *AutoResetValues) Val(id int32) (int64, error) {
	v, ok := m.values[id]
	if ok == false {
		return 0, fmt.Errorf("value is not exist")
	}
	return v.val(), nil
}

// 增加
func (m *AutoResetValues) Inc(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.inc(n)
	return nil
}

// 减少
func (m *AutoResetValues) Dec(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.dec(n)
	return nil
}

// 设置
func (m *AutoResetValues) Set(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.set(n)
	return nil
}

// 删除计数器
func (m *AutoResetValues) Remove(id int32) {
	delete(m.values, id)
}

// 添加新计数器(not import)
func (m *AutoResetValues) addNew(kind, id, weeks, hours int32, n int64) error {
	if _, ok := m.values[id]; ok == true {
		return fmt.Errorf("value is duplicated")
	}
	if kind != AutoResetValueKind_Day && kind != AutoResetValueKind_Week {
		return fmt.Errorf("kind is invalid")
	}
	if hours < 0 || hours >= 24 {
		return fmt.Errorf("hours is invalid")
	}
	if weeks < int32(time.Sunday) || weeks > int32(time.Saturday) {
		return fmt.Errorf("week is invalid")
	}
	m.values[id] = NewAutoResetValue(kind, id, weeks, hours, n)
	return nil
}

// 每日0点
func (m *AutoResetValues) AddDayDefault(id int32, n int64) error {
	return m.addNew(AutoResetValueKind_Day, id, 0, 0, n)
}

func (m *AutoResetValues) AddDay(id, hours int32, n int64) error {
	return m.addNew(AutoResetValueKind_Day, id, 0, hours, n)
}

// 每周一0点
func (m *AutoResetValues) AddWeekDefault(id int32, n int64) error {
	return m.addNew(AutoResetValueKind_Week, id, int32(time.Monday), 0, n)
}

func (m *AutoResetValues) AddWeekHours(id, weeks, hours int32, n int64) error {
	return m.addNew(AutoResetValueKind_Week, id, weeks, hours, n)
}

func (m *AutoResetValues) AddWeek(id, weeks int32, n int64) error {
	return m.addNew(AutoResetValueKind_Week, id, weeks, 0, n)
}


