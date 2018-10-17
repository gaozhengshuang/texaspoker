package main

const (
	SUITSIZE int = 4   //四种花色
	CARDRANK int = 13  //2 3 4....K A
)

type Card struct{
	Suit  int32    //程序统一标准：0是方、1是红、2是黑、3是草
	Value int32    //0代表‘牌2’、1代表‘牌3’...etc

	Showtime int32 //just for sort
	IsHand bool		//是否是手里的牌
}

func NewCard(suit, val int32) *Card {
	return &Card{Suit:suit, Value:val}
}


//实现sort包中的排序接口
type Cards []*Card

func (c Cards) Len() int {
	return len(c)
}

func (c Cards) Less(i, j int)bool {
	if c[i].Showtime > c[j].Showtime{
		return true
	}else if c[i].Showtime < c[j].Showtime{
		return false
	}else{
		return c[i].Value > c[j].Value
	}
}

func (c Cards) Swap(i, j int){
	tmp := c[i]
	c[i] = c[j]
	c[j] = tmp
}
