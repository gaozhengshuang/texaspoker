package main
import (
	"fmt"
	"time"
	"gitee.com/jntse/gotoolkit/log"
	"gitee.com/jntse/gotoolkit/util"
)

var g_Quit bool = false
var g_KeyBordInput util.KeyBordInput

func main() {
	fmt.Println("vim-go")

	log.Init("","","trace")
	log.Info("初始日志完成")

	// 初始化键盘输入
	g_KeyBordInput.Init()
	g_KeyBordInput.Start()
	log.Info("初始键盘输入完成")

	server := NewUdpServer()
	server.Init("127.0.0.1", 7004)
	server.Start()


	for g_Quit == false {
		time.Sleep(time.Millisecond * 10)
		select {
		case cmd,_:= <-g_KeyBordInput.C:
			DoInputCmd(cmd)
		default:
		}
	}
}

func DoInputCmd(cmd string) {
	switch cmd {
	case "quit","exit":
		g_Quit = true
		break
	default:
		break
	}
}
