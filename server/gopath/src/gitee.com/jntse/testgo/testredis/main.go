package main

import (
	"fmt"
	"log"
	"github.com/go-redis/redis"
	pb "github.com/golang/protobuf/proto"
	"gitee.com/jntse/testgo/testredis/proto"
	//"gitee.com/jntse/gotoolkit/util"
)



func main() {
	fmt.Println("vim-go")

	// 常规key
	//TestKeys()

	// incr
	//TestIncr()

	// list
	//TestList()

	// Set
	//TestSet()

	// ZSet
	//TestZSet()

	// 二进制
	//TestBin()

	// pipeline
	//TestPipeline()

	// cluster
	TestRedisCluster()

}

// 连接redis服务器
func init() {
	ExampleNewClient()
}


var GRedis *redis.Client = nil
func ExampleNewClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	GRedis = client
	pong, err := client.Ping().Result()
	log.Println(pong, err)
	// Output: PONG <nil>
	return GRedis
}


func TestKeys() {
	key1 := fmt.Sprintf("goredis_keys_%d", 1001)
	if ret1, err1 := GRedis.Set(key1, "user1", 0).Result(); err1 != nil {
		panic(err1)
	}else {
		log.Printf("set key=%s status[%s] \n", key1 , ret1)
	}

	if val1, err2 := GRedis.Get(key1).Result(); err2 == redis.Nil {
		log.Println("key not found:" , key1)
	}else if( err2 != nil ) {
		log.Println("TestKeys err2:", err2)
	}else {
		log.Printf("%s=%s\n", key1, val1)
	}


	if _, err3 := GRedis.Get("goredis_keys").Result(); err3 == redis.Nil {
		log.Println("key username not found")
	}


	val2, _:= GRedis.Exists(key1).Result()
	val3, _:= GRedis.Exists("goredis_keys_1").Result()
	log.Printf("key %s exists[%d]\n", key1, val2)
	log.Printf("key %s exists[%d]\n", "goredis_keys_1", val3)
}

func TestIncr() {
	key := fmt.Sprintf("goredis_incr_%d", 1001)
	GRedis.Del(key)

	// key不存在
	ret, err := GRedis.Incr(key).Result()
	if err != nil {
		panic(err)
	}
	log.Printf("incr %s ret %v\n", key, ret)

	// key存在
	ret1, err1 := GRedis.Incr(key).Result()
	if err1 != nil {
		panic(err1)
	}
	log.Printf("incr %s ret %v\n", key, ret1)
}


func TestList() {

	// 删除
	key := fmt.Sprintf("goredis_list_%d", 1001)
	GRedis.Del(key)

	// 添加
	err := GRedis.LPush(key, 100).Err()
	if err != nil {
		panic(err)
	}

	// 一次多个
	err2 := GRedis.LPush(key, 101, 102).Err()
	if err2 != nil {
		log.Println("TestList err2:", err2)
	}

	//获取
	rlist, err3 := GRedis.LRange(key, 0, 5).Result()
	if err3 != nil {
		log.Println("TestList err3:", err3)
	}
	log.Printf("TestList rlist=%#v\n", rlist)
}


func TestSet() {

	// Size
	key := fmt.Sprintf("goredis_set_%d", 1001)
	if err := GRedis.Del(key).Err(); err != nil {
		panic(err)
	}

	len := GRedis.SCard(key).Val()
	log.Printf("TestSet key[%s] len[%d]\n", key, len)

	// 添加
	if err := GRedis.SAdd(key, 10).Err(); err != nil {
		panic(err)
	}

	// 一次多个
	if err := GRedis.SAdd(key, 11, 12).Err(); err != nil {
		log.Println("TestSet err2:", err)
	}

	// 重复添加
	if val , err := GRedis.SAdd(key, 10).Result(); val == 0 || err != nil {
		if err != nil { 
			log.Println("TestSet duplicate key 10, err: ", err) 
		} else { 
			log.Println("TestSet key 10 is duplicate") 
		}
	}

	//获取
	rlist, err3 := GRedis.SMembers(key).Result()
	if err3 != nil {
		log.Println("TestSet err3:", err3)
	}
	log.Printf("TestSet rlist=%#v\n", rlist)


	// 查找
	isfind, err4 := GRedis.SIsMember(key, 12).Result()
	if err4 != nil {
		log.Println("TestSet err4:", err4)
	} else if isfind == true {
		log.Println("TestSet key 12 is member")
	}

	len = GRedis.SCard(key).Val()
	log.Printf("TestSet key[%s] len[%d]\n", key, len)
}


func TestZSet() {

	// Size
	key := fmt.Sprintf("goredis_zset_%d", 1001)
	len := GRedis.ZCard(key).Val()
	log.Printf("key %s len %d\n", key, len)


	// 添加
	err := GRedis.ZAdd(key, redis.Z{8, "fruit"}).Err()
	if err == redis.Nil {
		log.Printf("TestZSet ZAdd fruit fail")
	}else if err != nil {
		panic(err)
	}


	// 一次多个
	err2 := GRedis.ZAdd(key, redis.Z{15, "meat"} , redis.Z{3, "vegetables"}).Err()
	if err2 != nil {
		log.Println("TestZSet err2:", err2)
	}


	// 获取排名, 0开始
	rank, err3 := GRedis.ZRank(key, "fruit").Result()
	if err3 != nil {
		log.Println("TestZSet err3:", err3)
	}
	log.Printf("TestZSet fruit rank=%d\n", rank)


	// 获取前10排名列表
	rlist, err4 := GRedis.ZRange(key, 0, 10).Result()
	if err4 != nil {
		log.Println("TestZSet err4:", err4)
	}
	log.Printf("TestZSet range:%v\n", rlist)


	// 获取带分数的排名
	wscores0, err5  := GRedis.ZRangeWithScores(key, 0, 5).Result()
	wscores1, errrev := GRedis.ZRevRangeWithScores(key, 0, 5).Result()
	if err5 != nil || errrev != nil {
		log.Println("TestZSet err5:",  err5)
		log.Println("TestZSet err52:", errrev)
	}
	log.Printf("TestZSet rank with scores=%v\n", wscores0)
	log.Printf("TestZSet revrank with scores =%v\n", wscores1)


	// 获取在[min,max]分数区间内的列表
	rscores, err6 := GRedis.ZRangeByScore(key, redis.ZRangeBy{"0", "15", 0, 0}).Result()
	if err6 != nil {
		log.Println("TestZSet err6:", err5)
	}
	log.Printf("TestZSet range:%v\n", rscores)

}


// 设置 protobuff value
func SetBin(msg pb.Message) {

	// proto 序列化
	buf, err := pb.Marshal(msg)
	if err != nil {
		panic(err)
	}
	log.Printf("TestBin Marshal len=%d\n", len(buf))

	// Set二进制
	key := fmt.Sprintf("goredis_bin_%d", 1001)
	err2 := GRedis.Set(key, buf, 0).Err()
	if err2 != nil {
		log.Printf("TestBin err2=%v\n", err2)
		return
	}
}

func GetBin(msg pb.Message) {

	// Get二进制
	key := fmt.Sprintf("goredis_bin_%d", 1001)
	rstr, err3 := GRedis.Get(key).Result()
	if err3 != nil {
		log.Printf("TestBin err3=%v\n", err3)
		return
	}
	log.Printf("TestBin getbin len=%d\n", len(rstr))


	// 反序列化
	rbuf :=[]byte(rstr)
	err4 := pb.Unmarshal(rbuf, msg)
	if err4 != nil {
		panic(err4)
	}
}




// 设置二进制
func TestBin() {

	msg := &user.UserData{
		Base : &user.EntityBase{Id:pb.Uint64(5100), Name:pb.String("go-redis")},
		Level : pb.Int(1),
		Exp : pb.Int(0),
	}
	log.Printf("TestBin Marshal msg=%+v\n", msg)
	SetBin(msg)

	rmsg := &user.UserData{}
	GetBin(rmsg)
	log.Printf("TestBin Unmarshal rmsg=%+v\n", rmsg)

}


// 管道技术
func TestPipeline() {
	key1, key2, count := "pipe_test1", "pipe_test2", 10

	// 普通方式
	for i:=0; i < count; i++ {
		_, err := GRedis.Get(fmt.Sprintf("%s_%d",key1,i)).Result()
		if err != nil { log.Println("Redis Get Error: ", err) }
	}
	
	// 管道方式
	pipe := GRedis.Pipeline()
	for i:=0; i < count; i++ {
		_, err := pipe.Get(fmt.Sprintf("%s_%d",key2,i)).Result()
		if err != nil { log.Println("Redis Get Error: ", err) }
	}
	cmds, err := pipe.Exec()
	if err != nil {
		log.Println("Pipe Exec Error: ", err)
		for _, v := range cmds { log.Println(v) }
	}
}



// Cluster
func TestRedisCluster() {

	// cluster nodes
	nodes := make([]string, 0)
	for i:=6274; i <= 6279; i++ {
		nodes = append(nodes, fmt.Sprintf("127.0.0.1:%d", i))
	}

	// client
	clusteropt := &redis.ClusterOptions{ Addrs: nodes }
	var client *redis.ClusterClient = redis.NewClusterClient(clusteropt)
	err := client.Ping().Err()
	if err != nil {
		log.Println("redis cluster ping err: ", err)
		return
	}
	//log.Println(clusteropt.ClusterSlots)

	// flush all
	//client.FlushAll().Result()


	// strings
	client.Set("cluster", "hello", 0).Result()
	val, err := client.Get("cluster").Result()
	log.Println("cluster val: ", val)


	// set 
	client.SAdd("addrs", "china shanghai pudong").Result()
	log.Println(client.SMembers("addrs").Val())


	// hset
	client.HSet("charbase_1001", "uid",  "37").Result()
	client.HSet("charbase_1001", "name", "jacky").Result()
	client.HSet("charbase_1001", "old",  "30").Result()
	client.HSet("charbase_1001", "sex",  "1").Result()
	client.HSet("charbase_1001", "face", "").Result()
	log.Println(client.HKeys("charbase_1001").Val())
	log.Println(client.HVals("charbase_1001").Val())

	// sortset
	client.ZAdd("rankscore", redis.Z{150, "jakcy"})
	client.ZAdd("rankscore", redis.Z{130, "Jimmy"})
	client.ZAdd("rankscore", redis.Z{120, "John"})
	log.Println(client.ZRangeWithScores("rankscore", 0, -1).Val())

}


