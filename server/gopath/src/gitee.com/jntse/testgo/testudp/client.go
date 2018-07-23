package main
import (
	"time"
	"fmt"
	"net"
	"gitee.com/jntse/gotoolkit/log"
)


type UdpClient struct {
	ip string
	port int32
	listener *net.UDPConn
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
	n, err := this.listener.Read(data)
	if err != nil {
		fmt.Printf("error during read: %s", err)
	}
	fmt.Printf("receive %s from \n", data[:n])
}

func (this *UdpClient) Write() {
	//sendbuf := []byte("123123")
	//this.listener.Write(sendbuf)
}

func (this *UdpClient) Init(ip string, port int32) {
	this.ip = ip
	this.port = port
}

func (this *UdpClient) Start() {
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
	log.Info("listen[%s] ok", this.Host())

	go this.run()
}

func (this *UdpClient) Shutdown() {
	this.running = true
	this.listener.Close()
}

func (this *UdpClient) run() {
	for ;; {
		if this.running == false {
			break
		}
		this.Read()
		time.Sleep(time.Second)
	}
}

