package def
import (
	"fmt"
	"gitee.com/jntse/gotoolkit/util"
	"gitee.com/jntse/minehero/pbmsg"
	pb"github.com/gogo/protobuf/proto"
)

// 每日整点h重置变量
type InthourAutoResetValue struct {
	id			int32		//
	hours		int32		// hours
	value 		int64		// value
	lastreset	int64		//
	nextreset	int64		// tmp timestamp
}

func NewInthourAutoResetValue(id, hours int32, value int64) *InthourAutoResetValue {
	v := &InthourAutoResetValue{id:id, hours:hours}
	v.Init()
	v.Inc(value)
	return v
}

func (t *InthourAutoResetValue) init() {
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

func (t *InthourAutoResetValue) loadBin(bin *msg.InthourAutoResetValue) {
	t.id, t.hours, t.value = bin.GetId(), bin.GetHours(), bin.GetValue()
	t.Init()
}

func (t *InthourAutoResetValue) packBin() *msg.InthourAutoResetValue {
	bin := &msg.InthourAutoResetValue{Id:pb.Int32(t.id), Hours:pb.Int32(t.hours), Value:pb.Int64(t.value)}
	return bin
}

func (t *InthourAutoResetValue) check() {
	now := util.CURTIME()
	if now > t.nextreset {
		t.value = 0
		t.lastreset = now
		t.nextreset = t.nextreset + util.DaySec
	}
}

func (t *InthourAutoResetValue) value() int64 {
	t.Check()
	return t.value
}

func (t *InthourAutoResetValue) inc(n int64) {
	t.Check()
	t.value += n
}

func (t *InthourAutoResetValue) dec(n int64) {
	t.Check()
	t.value -= n
}

// 自动重置变量管理器
type InthourAutoResetManager struct {
	values map[int32]*InthourAutoResetValue
}

// 加载
func (m *InthourAutoResetManager) LoadBin(bin *msg.InthourAutoResetManager) {
	for _, v := range bin.Values {
		vv := &InthourAutoResetValue{}
		vv.LoadBin(v)
		m.values[vv.id] = vv
	}
}

// 打包
func (m *InthourAutoResetManager) PackBin() *msg.InthourAutoResetManager {
	bin := &msg.InthourAutoResetManager{Values:make([]*msg.InthourAutoResetValue, 0)}
	for _, v := range m.values {
		bin.Values = append(bin.Values, v.PackBin())
	}
	return bin
}

// 获取值
func (m *InthourAutoResetManager) Val(id int32) (int64, error) {
	v, ok := m.values[id]
	if ok == false {
		return 0, fmt.Errorf("value is not exist")
	}
	return v.Value(), nil
}

// 增加
func (m *InthourAutoResetManager) Inc(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.Inc(n)
	return nil
}

// 减少
func (m *InthourAutoResetManager) Dec(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.Dec(n)
	return nil
}

// 添加新计数器
func (m *InthourAutoResetManager) Add(id, hours int32, n int64) error {
	_, ok := m.values[id]
	if ok == true {
		return fmt.Errorf("value is duplicated")
	}
	m.values[id] = NewInthourAutoResetValue(id, hours, n)
	return nil
}

// 删除计数器
func (m *InthourAutoResetManager) Remove(id int32) {
	delete(m.values, id)
}

