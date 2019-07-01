// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var HundredWar : table.IHundredWarDefine[] = [
		{ Id : 1, Type : 1, Name : "欢乐场", Icon : "xiuxian_1", MinBuyin : 1000, MaxRole : 300, Bet : [ 100, 1000, 10000, 100000, 1000000 ], BankerGold : 200000000, SeatGold : 10000000, BettingRatio : 0.2, BankerRatio : 0.2, TaxRate : 0.05, Seat : 8, WaitTime : 3, BetTime : 15, ConfirmTime : 5, TimeOut : 25, Kick : 2, BankerRound : 15, BankerMinGold : 50000000, TitleImg : "br_hlc", PoolImg : "br_jc_1", FontColor : "0x5bffd3" 	},
		{ Id : 2, Type : 2, Name : "富豪场", Icon : "xiuxian_2", MinBuyin : 20000, MaxRole : 300, Bet : [ 1000, 10000, 100000, 1000000, 10000000 ], BankerGold : 500000000, SeatGold : 30000000, BettingRatio : 0.2, BankerRatio : 0.2, TaxRate : 0.05, Seat : 8, WaitTime : 3, BetTime : 15, ConfirmTime : 5, TimeOut : 25, Kick : 2, BankerRound : 15, BankerMinGold : 200000000, TitleImg : "br_thc", PoolImg : "br_jc_2", FontColor : "0x5beeff" 	}
	]


// Id
export var HundredWarById : game.Dictionary<table.IHundredWarDefine> = {}
function readHundredWarById(){
  for(let rec of HundredWar) {
    HundredWarById[rec.Id] = rec; 
  }
}
readHundredWarById();
}

