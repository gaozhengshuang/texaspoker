package main
import (
	_"time"
	"fmt"
	"net"
	"gitee.com/jntse/gotoolkit/log"
)


type UdpClient struct {
	ip string
	port int32
	dialer *net.UDPConn
	running bool
}

func NewUdpClient() *UdpClient {
	return new(UdpClient)
}

func (this *UdpClient) Host() string {
	return fmt.Sprintf("%s:%d", this.ip, this.port)
}

func (this *UdpClient) Read() {
	data := make([]byte, 2048)
	n, err := this.dialer.Read(data)
	if err != nil {
		fmt.Printf("error during read: %s", err)
	}
	fmt.Printf("receive %s from \n", data[:n])
}

func (this *UdpClient) Write() {
	sendbuf := []byte("client msg")
	this.dialer.Write(sendbuf)
}

func (this *UdpClient) Init(ip string, port int32) {
	this.ip = ip
	this.port = port
}

func (this *UdpClient) Shutdown() {
	this.running = true
	this.dialer.Close()
}

func (this *UdpClient) Start() {
	addr, err_resolve := net.ResolveUDPAddr("udp", this.Host())
	if err_resolve != nil {
		log.Error("'%s' ResolveUDPAddr error:%v", this.Host(), err_resolve)
		return
	}

	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	this.dialer = conn
	this.Write()
	this.Read()
}

