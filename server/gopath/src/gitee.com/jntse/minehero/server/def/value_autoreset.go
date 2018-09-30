package def
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
)

// 每日整点h重置变量
type AutoResetValue struct {
	id			int32		//
	hours		int32		// hours
	value 		int64		// value
	lastreset	int64		//
	nextreset	int64		// tmp timestamp
}

func NewAutoResetValue(id, hours int32, value int64) *AutoResetValue {
	v := &AutoResetValue{id:id, hours:hours}
	v.init()
	v.inc(value)
	return v
}

func (t *AutoResetValue) init() {
	resetbaseline, now := util.GetDayStart() + int64(t.hours * util.HourSec), util.CURTIME()
	if t.lastreset == 0 {	// firt init
		t.value ,t.lastreset = 0, now
	}else if now - t.lastreset > util.DaySec {	// over 24 hours
		t.value ,t.lastreset = 0, now
	}

	if now < resetbaseline {
		t.nextreset = resetbaseline
	}else {
		t.nextreset = resetbaseline + util.DaySec
	}
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
	if now > t.nextreset {
		t.value = 0
		t.lastreset = now
		t.nextreset = t.nextreset + util.DaySec
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

// 自动重置变量管理器
type AutoResetValueManager struct {
	values map[int32]*AutoResetValue
}

// 加载
func (m *AutoResetValueManager) LoadBin(bin *msg.AutoResetValueManager) {
	for _, v := range bin.Values {
		vv := &AutoResetValue{}
		vv.loadBin(v)
		m.values[vv.id] = vv
	}
}

// 打包
func (m *AutoResetValueManager) PackBin() *msg.AutoResetValueManager {
	bin := &msg.AutoResetValueManager{Values:make([]*msg.AutoResetValue, 0)}
	for _, v := range m.values {
		bin.Values = append(bin.Values, v.packBin())
	}
	return bin
}

// 获取值
func (m *AutoResetValueManager) Val(id int32) (int64, error) {
	v, ok := m.values[id]
	if ok == false {
		return 0, fmt.Errorf("value is not exist")
	}
	return v.val(), nil
}

// 增加
func (m *AutoResetValueManager) Inc(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.inc(n)
	return nil
}

// 减少
func (m *AutoResetValueManager) Dec(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.dec(n)
	return nil
}

// 添加新计数器
func (m *AutoResetValueManager) Add(id, hours int32, n int64) error {
	_, ok := m.values[id]
	if ok == true {
		return fmt.Errorf("value is duplicated")
	}
	m.values[id] = NewAutoResetValue(id, hours, n)
	return nil
}

// 删除计数器
func (m *AutoResetValueManager) Remove(id int32) {
	delete(m.values, id)
}

