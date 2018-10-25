/* 你应该先看一下这里的介绍，对你阅读会事半功倍
---------------------------------------------------------------
这里详细介绍一下各种数据是如何储存的
关于牌，我们用一个14位的二进制区间来存储，例如一副牌2-A，将表示为
11111111111110，即第二位表示牌2，第三位表示牌3，以此类推。那么第一位是干嘛的呢？请继续看下面

这样的储存方式除了省空间外还有什么优势呢？我们顺子的判断为例：
例如顺子10~~A，在二进制区间将表示为11111000000000，叫它S
现在我们有手牌2 3 10 J Q K A，那么它的二进制表示是11111000000110，叫它T
那么T&S==S的话，就可以说明T包含一个顺子，并且顺子是10~~A
S转化为10进制的话是15872
类似的我们将所有可能的顺子预先保存好，可以看到“StraightValue”这个数组，就是干这个用的
由于德州扑克里面A 2 3 4 5是最小的顺子，现在你可以明白二进制区间里第0位的作用了，和最高位一样也是保存A

我们将所有牌型做一个分级：
皇家同花顺：10
同花顺    ：9
四条      ：8
葫芦      ：7
同花      ：6
顺子      ：5
三条      ：4
两对      ：3
一对      ：2
高牌      ：1

比较的时候先比较两手牌的等级，等级相同的情况下，我们进一步分析每一副手牌的value值。
我的value的算法如下：
对你的手牌进行排序，排序规则是出现次数多的优先，次数相同的则值大的优先，比如：
7 8 4 2 2 A K，排序后为:22AK874,可以理解为16进制：0x22AD874。
需要注意的是，顺子和同花不适应此算法，顺子的value就是该顺子的最高牌；同花的value是该花色牌集并集(具体读者可以自己思考)

各种牌型的判断以及比较：
1、皇家同花顺 royal flush
这个最简单了，直接用四个花色的牌集(详见straight数组)，去和15872相与即可(原理见上)
一场牌局只可能出现唯一皇家同花顺，所以只需要记录等级即可，因为只可能win or tie(五张公牌)

2、同花顺straight flush
和皇家同花顺类似，从大到小遍历所有可能的顺子，和它们做与操作。value值是该顺子中最大的高牌

3、四条 four of a kind
维护一个数组count []int32用于对每一种牌值进行计数即可。
还有一种方法是将四种花色的牌集相与，最后二进制区间内还是1的那些就是我们要的。

4、葫芦 full house
通过count数组先遍历有没有出现三次的，有的话，再遍历有没有出现2次的

5、同花 flush
有两个方法，一个是对每一个花色的牌集进行处理，看看二进制集合里有没有5个1
第二个方法详见代码，判断同花的逻辑处

6、顺子 straight
取所有花色牌的集合，去和所有可能的顺子做与操作

7、三条 three of a kind；两对 two pairs； 一对 one pair
运用count数组计数器
*/

package main

import (
		"errors"
		//"fmt"
		"sort"
		//"gitee.com/jntse/gotoolkit/log"
)

//每个花色所在二进制区间，详见判断同花逻辑
var SuitShift = []int32{0, 3, 6, 9}

//各个顺子代表的值|10--A, 9--K, 8--Q..ect
var StraightValue = []int32{15872, 7936, 3968, 1984, 992, 496, 248, 124, 62, 31}

//顺子的牌值
var StraightType = [][]int32{{8,9,10,11,12},{7,8,9,10,11},{6,7,8,9,10},{5,6,7,8,9},{4,5,6,7,8},{3,4,5,6,7},{2,3,4,5,6},{1,2,3,4,5},{0,1,2,3,4},{12,0,1,2,3}}

type Hand struct{
	flush int32						//用于判断是否有同花
	straight []int32					//记录每种花色的牌集，用于判断同花顺
	handvalue int32					//手头上四种花色牌的并集，用于判断是否有顺子
	count []int32						//记录每种牌值出现的次数
	initilized bool					//是否初始化
	cards Cards				//储存发下来的手牌
	handsize int32					//当前手头有多少张牌

	/*
	这套手牌的权重等级，一共有10个等级
	皇家同花顺：10
	同花顺    ：9
	四条      ：8
	葫芦      ：7
	同花      ：6
	顺子      ：5
	三条      ：4
	两对      ：3
	一对      ：2
	高牌      ：1
	*/
	level int32 

	/*
	一副手牌的最终值，level相同的情况下，我们用finalvalue来比较大小
	例如一副手牌：3 3 3 7 7 A K，
	它的值是：33377AK
	数据排序规则是，出现次数多者优先，次数相同则大小优先
	*/
	finalvalue int32
	highvalue int32

	//记录牌型所用
	cardsuit int32
	straightindex int32
}

func GetHand() *Hand{
	h := new(Hand)
	h.initilized = false
	return h
}

func (h *Hand)Init(){
	h.flush = 0
	h.straight = []int32{0,0,0,0}
	h.count = []int32{0,0,0,0,0,0,0,0,0,0,0,0,0,0}
	h.cards = make(Cards, 7)
	for i:=0; i<7; i++{
		if h.cards[i] != nil{
			continue
		}
		h.cards[i] = new(Card)
	}
	h.handvalue = 0
	h.handsize = 0
	h.initilized = true
	h.highvalue = 0

	h.level = -1
	h.finalvalue = -1
}

func (h *Hand) GetFightValue() int32 {
	return h.finalvalue
}

func (h *Hand) GetFightLevel() int32 {
	return h.level
}

func (h *Hand)SetCard(c *Card, ishand bool) error{
	if h.initilized == false{
		return errors.New("Hand must init first")
	}
	if h.handsize == 7{
		return errors.New("after a game, you should init Hand again")
	}
	h.cards[h.handsize].Suit = c.Suit
	h.cards[h.handsize].Value = c.Value
	h.cards[h.handsize].Showtime = 0
	h.cards[h.handsize].IsHand = ishand
	h.handsize++
	return nil
}

func (h *Hand) ClearAnalyse() {
	h.flush = 0
	h.straight = []int32{0,0,0,0}
	h.count = []int32{0,0,0,0,0,0,0,0,0,0,0,0,0,0}
	h.handvalue = 0
	h.level = -1
	h.finalvalue = -1
	h.highvalue = 0
}

//可以重构一下，分成更多小函数
func (h *Hand)AnalyseHand() error{
	if h.initilized == false{
		return errors.New("Hand must init first")
	}
	h.ClearAnalyse()
	//if h.handsize < 7{
	//	return errors.New("not enough cards, must have seven!")
	//}

	h.analyCards()
	sort.Sort(h.cards)
	tmp := turnToValue(h.cards)
	for _ , card := range h.cards {
		if card.IsHand {
			h.highvalue = card.Value
			break
		}
	}

	//由大到小来判断手牌等级
	//判断是否有皇家同花顺
	for i:=0; i<SUITSIZE; i++{
		if h.straight[i]&StraightValue[0] == StraightValue[0]{
			h.level = 10
			h.cardsuit = int32(i)
			return nil
		}
	}
	//判断是否有同花顺，由于只有可能出现一个花色的同花顺，所以记录高牌的值即可比较两个同花顺大小
	for i:=0; i<SUITSIZE; i++{
		for j:=1; j<len(StraightValue); j++{
			if h.straight[i]&StraightValue[j] == StraightValue[j]{
				h.level = 9
				h.cardsuit = int32(i) 
				h.finalvalue = int32(len(StraightValue)-j+4)
				return nil
			}
		}
	}
	//判断四条，四条和同花顺同理，每种四条都是有且唯一的，都是四条情况下，记录高牌即可比较大小
	for i:= CARDRANK-1; i>=0; i--{
		if h.count[i] == 4{
			h.level = 8
			h.finalvalue = tmp
			return nil
		}
	}
	//判断葫芦，和四条同理
	for i:= CARDRANK-1; i>=0; i--{
		if h.count[i] == 3{
			for j:=0; j<CARDRANK; j++{
				if j == i{
					continue
				}
				if h.count[j] >=2{
					h.level = 7
					h.finalvalue = tmp
					return nil
				}
			}
		}
	}
	/*判断同花，解释下flush的二进制结构代表的意思：
	flush是一个12位长度的二进制int32
	每三位代表一个花色的数目，从低位到高位分别代表黑桃、红桃、梅花、方片
	例如101000000010表示有两个黑桃、五个方片
	例如000000000111表示有七个黑桃
	所以只需要判断每一个三位是否大于等于5，就说明有同花

	还是同理，场上有且只有可能出现一个花色的同花
	都是同花的情况下，就比较谁的同花大
	*/
	for i:=0; i<SUITSIZE; i++{
		tmp := (uint32(h.flush)>>uint32(SuitShift[i])) & 7
		if tmp >=5{
			h.level = 6
			h.cardsuit = int32(i)
			h.finalvalue = h.straight[i]
			return nil
		}
	}

	//判断顺子，handvalue保存的是所有花色rank的并集，和同花顺同理
	for i:=0; i<len(StraightValue); i++{
		if h.handvalue&StraightValue[i] == StraightValue[i]{
			h.level = 5
			h.finalvalue = int32(len(StraightValue)-i+4)
			h.straightindex = int32(i)
			return nil
		}
	}
	//判断三条
	for i:=CARDRANK-1; i>=0; i--{
		if h.count[i] == 3{
			h.level = 4
			h.finalvalue = tmp
			return nil
		}
	}
	/*
	判断两对，首先我们要确定有没有两对，都有两对的情况下，也有可能出现平局的情况
	所以判断依据是将手牌排序，出现次数多的牌优先，次数相同的情况下，牌值大的优先
	最后将排序转化成16进制int32，直接比较即可
	例如2 2 3 3 A J 8 以及 2 2 3 3 A Q 8两副手牌
	排序之后是3322AB8和3322AC8，显然第二副手牌大
	*/
	//这里要特殊处理下 如果一方是998844A 另一方是9988AQ7 其实是一样大的牌
	for i:=0; i<CARDRANK; i++{
		if h.count[i] == 2{
			for j:=i+1; j<CARDRANK; j++{
				if h.count[j] == 2{
					h.level = 3
					tmpcards := make([]int32, 0)
					for _, c := range h.cards {
						if c == nil {
							continue
						}
						if c.Value == int32(i) || c.Value == int32(j) {
							continue
						}
						tmpcards = append(tmpcards, c.Value)
					}
					if len(tmpcards) > 0 {
						h.finalvalue = int32(j)*10000 + int32(j)*1000 + int32(i)*100 + int32(i)*10 + tmpcards[0]
					}else{
						h.finalvalue = tmp
					}
					return nil
				}
			}
		}
	}
	//判断一对
	for i:=0; i<CARDRANK; i++{
		if h.count[i] == 2{
			h.level = 2
			h.finalvalue = tmp
			return nil
		}
	}

	//判断高牌
	h.level = 1
	h.finalvalue = tmp
	return nil
}

//将手牌转化成整数形式
func turnToValue(cards Cards) int32{
	//我是降序排的
	var res int32 = 0
	for i:=0; i<len(cards)-2; i++{
		res *= 10
		res += cards[i].Value
		//log.Info("手牌%d  牌%d", res, cards[i].Value)
	}
	return res
}

//返回二进制区间里最大的那张牌
func getHibitPos(a int32) int32{
	var res int32 = 0
	for a>0 {
		a /= 2
		res++
	}
	return res
}

func (h *Hand)analyCards(){
	for i:=0; i<int(h.handsize); i++{
		c := h.cards[i]

		h.flush += 1<<uint32(SuitShift[c.Suit])
		h.straight[c.Suit] |= 1<<uint32(c.Value+1)
		h.handvalue |= 1<<uint32(c.Value+1)

		if c.Value == 12{ //A也保存到第一位中去，用于判断A2345这样的顺子
			h.straight[c.Suit] |= 1
			h.handvalue |= 1
		}

		h.count[c.Value]++
	}

	for i:=0; i<int(h.handsize); i++{
		c := h.cards[i]
		c.Showtime = h.count[c.Value]
	}
}

func (h *Hand)ToAllCard() []int32{
	tmpcard := make([]int32, 0)
	for _, v := range h.cards {
		if v == nil {
			continue
		}
		tmpcard = append(tmpcard, v.Suit+1)
		tmpcard = append(tmpcard, v.Value+2)
	}
	return tmpcard
}

func (h *Hand)ToRecordCard() []int32{
	tmpcard := make([]int32, 0)
	count := make(map[int32]int32)
	for _, v := range h.cards {
		if v == nil {
			continue
		}
		//同花
		if h.level == 9 || h.level == 6 || h.level == 10{
			if h.cardsuit == v.Suit {
				tmpcard = append(tmpcard, v.Suit+1)
				tmpcard = append(tmpcard, v.Value+2)
			}
		} else if h.level == 5 {//顺子
			straight := StraightType[h.straightindex]
			var cards Cards
			cards = make([]*Card, 0)
			for _, v2 := range straight {
				if v.Value == v2 {
					if _, ok := count[v.Value]; ok {
						continue
					}
					count[v.Value] = v.Value
					cards = append(cards, v)
					break
				}
			}
			sort.Sort(cards)
			for _, v3 := range cards {
				tmpcard = append(tmpcard, v3.Suit+1)
				tmpcard = append(tmpcard, v3.Value+2)
			}
		} else {//其他
			tmpcard = append(tmpcard, v.Suit+1)
			tmpcard = append(tmpcard, v.Value+2)
		}
		if len(tmpcard)	>= 10 {
			break
		}
	}
	return tmpcard
}

