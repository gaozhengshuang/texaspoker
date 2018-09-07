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
	nextreset	int64		// tmp timestamp
}

func NewInthourAutoResetValue(id, hours int32, value int64) *InthourAutoResetValue {
	v := &InthourAutoResetValue{id:id, hours:hours}
	v.Init()
	v.Inc(value)
	return v
}

func (t *InthourAutoResetValue) Init() {
	resetbaseline, now := util.GetDayStart() + int64(t.hours * util.HourSec), util.CURTIME()
	if now < resetbaseline {
		t.nextreset = resetbaseline
	}else {
		t.value = 0 
		t.nextreset = resetbaseline + util.DaySec
	}
}

func (t *InthourAutoResetValue) LoadBin(bin *msg.InthourAutoResetValue) {
	t.id, t.hours, t.value = bin.GetId(), bin.GetHours(), bin.GetValue()
	t.Init()
}

func (t *InthourAutoResetValue) PackBin() *msg.InthourAutoResetValue {
	bin := &msg.InthourAutoResetValue{Id:pb.Int32(t.id), Hours:pb.Int32(t.hours), Value:pb.Int64(t.value)}
	return bin
}

func (t *InthourAutoResetValue) Check() {
	if util.CURTIME() > t.nextreset {
		t.value = 0
		t.nextreset = t.nextreset + util.DaySec
	}
}

func (t *InthourAutoResetValue) Value() int64 {
	t.Check()
	return t.value
}

func (t *InthourAutoResetValue) Inc(n int64) {
	t.Check()
	t.value += n
}

func (t *InthourAutoResetValue) Dec(n int64) {
	t.Check()
	t.value -= n
}

//
type InthourAutoResetManager struct {
	values map[int32]*InthourAutoResetValue
}

func (m *InthourAutoResetManager) LoadBin(bin *msg.InthourAutoResetManager) {
	for _, v := range bin.Values {
		vv := &InthourAutoResetValue{}
		vv.LoadBin(v)
		m.values[vv.id] = vv
	}
}

func (m *InthourAutoResetManager) PackBin() *msg.InthourAutoResetManager {
	bin := &msg.InthourAutoResetManager{Values:make([]*msg.InthourAutoResetValue, 0)}
	for _, v := range m.values {
		bin.Values = append(bin.Values, v.PackBin())
	}
	return bin
}

//
func (m *InthourAutoResetManager) Value(id int32) (int64, error) {
	v, ok := m.values[id]
	if ok == false {
		return 0, fmt.Errorf("value is not exist")
	}
	return v.Value(), nil
}

func (m *InthourAutoResetManager) Inc(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.Inc(n)
	return nil
}

func (m *InthourAutoResetManager) Dec(id int32, n int64) error {
	v, ok := m.values[id]
	if ok == false {
		return fmt.Errorf("value is not exist")
	}
	v.Dec(n)
	return nil
}

// 增加一个新的计数器
func (m *InthourAutoResetManager) Add(id, hours int32, n int64) error {
	_, ok := m.values[id]
	if ok == true {
		return fmt.Errorf("value is duplicated")
	}
	m.values[id] = NewInthourAutoResetValue(id, hours, n)
	return nil
}

// 删除一个计数器
func (m *InthourAutoResetManager) Remove(id int32) {
	delete(m.values, id)
}

