// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TPayBag : table.ITPayBagDefine[] = [
		{ Id : 1, Name : "破产补助", Push : 1, Time : 0, IsBankrupInHigh : 1, IsBankrupInMid : 0, NumOfBankrup : 0, RoundNum : 0, GoldNum : 0, IsDailyClear : 1, IsLimit : 1, AwardId : [ 4000 ] 	},
		{ Id : 2, Name : "直通车", Push : 2, Time : 1, IsBankrupInHigh : 1, IsBankrupInMid : 1, NumOfBankrup : 1, RoundNum : 0, GoldNum : 0, IsDailyClear : 1, IsLimit : 1, AwardId : [ 4001 ] 	},
		{ Id : 3, Name : "直通车", Push : 2, Time : 3, IsBankrupInHigh : 1, IsBankrupInMid : 1, NumOfBankrup : 2, RoundNum : 0, GoldNum : 0, IsDailyClear : 1, IsLimit : 1, AwardId : [ 4001 ] 	},
		{ Id : 4, Name : "重返巅峰", Push : 3, Time : 1, IsBankrupInHigh : 1, IsBankrupInMid : 1, NumOfBankrup : 0, RoundNum : 2, GoldNum : 5000, IsDailyClear : 1, IsLimit : 1, AwardId : [ 4002 ] 	}
	]


// Id
export var TPayBagById : game.Dictionary<table.ITPayBagDefine> = {}
function readTPayBagById(){
  for(let rec of TPayBag) {
    TPayBagById[rec.Id] = rec; 
  }
}
readTPayBagById();
}

