package main
import (
	"time"
	"fmt"
	"net"
	"gitee.com/jntse/gotoolkit/log"
)

type UdpServer struct {
	ip string
	port int32
	listener *net.UDPConn
	running bool
}

func NewUdpServer() *UdpServer {
	return new(UdpServer)
}

func (this *UdpServer) Host() string {
	return fmt.Sprintf("%s:%d", this.ip, this.port)
}

func (this *UdpServer) Read() {
	data := make([]byte, 2048)
	n, err := this.listener.Read(data)
	if err != nil {
		fmt.Printf("error during read: %s", err)
	}
	fmt.Printf("receive %s from %s\n", data[:n], this.listener.RemoteAddr())
	this.Write()
}

func (this *UdpServer) Write() {
	sendbuf := []byte("server msg")
	this.listener.Write(sendbuf)
}

func (this *UdpServer) Init(ip string, port int32) {
	this.ip = ip
	this.port = port
}

func (this *UdpServer) Start() {
	addr, err_resolve := net.ResolveUDPAddr("udp", this.Host())
	if err_resolve != nil {
		log.Error("'%s' ResolveUDPAddr error:%v", this.Host(), err_resolve)
		return
	}

	conn, err := net.ListenUDP("udp", addr)
	if err != nil {
		fmt.Println(err)
		panic(err)
		return
	}
	this.listener = conn
	this.running = true
	log.Info("listen[%s] ok", this.Host())

	go this.run()
}

func (this *UdpServer) Shutdown() {
	this.running = true
	this.listener.Close()
}

func (this *UdpServer) run() {
	for ;; {
		if this.running == false {
			break
		}
		this.Read()
		time.Sleep(time.Second)
	}
}


