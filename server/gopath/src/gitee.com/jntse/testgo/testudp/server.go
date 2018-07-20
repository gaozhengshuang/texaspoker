package main
import (
	"fmt"
	"net"
	"gitee.com/jntse/gotoolkit/log"
)

type UdpServer struct {
	ip string
	port int32
	listener *net.UDPConn
}

func NewUdpServer() *UdpServer {
	return new(UdpServer)
}

func (this *UdpServer) Host() string {
	return fmt.Sprintf("%s:%d", this.ip, this.port)
}

func (this *UdpServer) Read() {
}

func (this *UdpServer) Write() {
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
		return
	}
	this.listener = conn
}

func (this *UdpServer) Run() {
	for ;; {
	}
}


