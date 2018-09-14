/// @file msgindex.go
/// @brief 获取消息唯一id
/// @author jian xie, xiejian1998@foxmail.com
/// @version 1.0
/// @date 2017-09-27
package tbl
import "fmt"
import "reflect"
import _"strings"
import "github.com/gogo/protobuf/proto"

// 获取proto协议index id
func ProtoMsgIndexGenerator(msg interface{}) int32 {
	name := reflect.TypeOf(msg).String()
	//name = strings.TrimPrefix(name, "*")		// pointer type
	info := ProtoMsgIndex.ProtoIdByName[name]
	if info == nil { panic(fmt.Sprintf("proto msg [%s] not found index config", name)) }
	return info.Id
}

// 生成所有的proto协议
func GetAllProtoMsg() []interface{} {
	allmsg := make([]interface{}, 0, len(ProtoMsgIndex.ProtoIdByName))
	for _, info := range ProtoMsgIndex.ProtoIdByName {
		pbtype := proto.MessageType(info.Name)
		pbmsg := reflect.New(pbtype).Elem().Interface()
		allmsg = append(allmsg, pbmsg)
	}
	return allmsg
}

func GetAllMsgIndex() map[int32]string {
	allmsg := make(map[int32]string)
	for _, info := range ProtoMsgIndex.ProtoIdById {
		allmsg[info.Id] = info.Name
	}
	return allmsg
}


func JsonMsgIndexGenerator(msg interface{}) int32 {
	return 0
}


func StructMsgIndexGenerator(msg interface{}) int32 {
	return 0
}


