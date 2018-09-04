// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TMapEvent : table.ITMapEventDefine[] = [
		{ Id : 1001, Type : 1, Desc : "玩游戏得金币", MoneyType : 3, Price : 1, Icon : "", Reward : "" 	},
		{ Id : 1002, Type : 1, Desc : "玩游戏得金币", MoneyType : 3, Price : 1, Icon : "", Reward : "" 	},
		{ Id : 1003, Type : 1, Desc : "玩游戏得道具", MoneyType : 3, Price : 1, Icon : "", Reward : "" 	},
		{ Id : 2001, Type : 2, Desc : "随机奖励金币", MoneyType : 3, Price : 1, Icon : "", Reward : "1-1;2-2" 	},
		{ Id : 2002, Type : 2, Desc : "随机奖励体力", MoneyType : 3, Price : 1, Icon : "", Reward : "1-1;2-2" 	},
		{ Id : 3001, Type : 3, Desc : "商店", MoneyType : 3, Price : 0, Icon : "", Reward : "" 	},
		{ Id : 3002, Type : 3, Desc : "商店", MoneyType : 3, Price : 0, Icon : "", Reward : "" 	}
	]


// Id
export var TMapEventById : game.Dictionary<table.ITMapEventDefine> = {}
function readTMapEventById(){
  for(let rec of TMapEvent) {
    TMapEventById[rec.Id] = rec; 
  }
}
readTMapEventById();
}

