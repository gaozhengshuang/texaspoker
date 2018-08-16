// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var THouseCell : table.ITHouseCellDefine[] = [
		{ Id : 1001, Type : 1, MaxLevel : 5, ProduceGold : 10, ProduceTime : 10, LevelUpCost : 50, Des : "客厅", IncomePerSecond : 1 	},
		{ Id : 1002, Type : 1, MaxLevel : 5, ProduceGold : 150, ProduceTime : 30, LevelUpCost : 1500, Des : "客厅", IncomePerSecond : 5 	},
		{ Id : 1003, Type : 1, MaxLevel : 5, ProduceGold : 450, ProduceTime : 50, LevelUpCost : 6750, Des : "客厅", IncomePerSecond : 9 	},
		{ Id : 1004, Type : 1, MaxLevel : 5, ProduceGold : 910, ProduceTime : 70, LevelUpCost : 18200, Des : "客厅", IncomePerSecond : 13 	},
		{ Id : 1005, Type : 1, MaxLevel : 5, ProduceGold : 1530, ProduceTime : 90, LevelUpCost : 0, Des : "客厅", IncomePerSecond : 17 	},
		{ Id : 2001, Type : 2, MaxLevel : 5, ProduceGold : 30, ProduceTime : 15, LevelUpCost : 150, Des : "卧室", IncomePerSecond : 2 	},
		{ Id : 2002, Type : 2, MaxLevel : 5, ProduceGold : 210, ProduceTime : 35, LevelUpCost : 2100, Des : "卧室", IncomePerSecond : 6 	},
		{ Id : 2003, Type : 2, MaxLevel : 5, ProduceGold : 550, ProduceTime : 55, LevelUpCost : 8250, Des : "卧室", IncomePerSecond : 10 	},
		{ Id : 2004, Type : 2, MaxLevel : 5, ProduceGold : 1050, ProduceTime : 75, LevelUpCost : 21000, Des : "卧室", IncomePerSecond : 14 	},
		{ Id : 2005, Type : 2, MaxLevel : 5, ProduceGold : 1710, ProduceTime : 95, LevelUpCost : 0, Des : "卧室", IncomePerSecond : 18 	},
		{ Id : 3001, Type : 3, MaxLevel : 5, ProduceGold : 60, ProduceTime : 20, LevelUpCost : 300, Des : "厕所", IncomePerSecond : 3 	},
		{ Id : 3002, Type : 3, MaxLevel : 5, ProduceGold : 280, ProduceTime : 40, LevelUpCost : 2800, Des : "厕所", IncomePerSecond : 7 	},
		{ Id : 3003, Type : 3, MaxLevel : 5, ProduceGold : 660, ProduceTime : 60, LevelUpCost : 9900, Des : "厕所", IncomePerSecond : 11 	},
		{ Id : 3004, Type : 3, MaxLevel : 5, ProduceGold : 1200, ProduceTime : 80, LevelUpCost : 24000, Des : "厕所", IncomePerSecond : 15 	},
		{ Id : 3005, Type : 3, MaxLevel : 5, ProduceGold : 1900, ProduceTime : 100, LevelUpCost : 0, Des : "厕所", IncomePerSecond : 19 	},
		{ Id : 4001, Type : 4, MaxLevel : 5, ProduceGold : 100, ProduceTime : 25, LevelUpCost : 500, Des : "厨房", IncomePerSecond : 4 	},
		{ Id : 4002, Type : 4, MaxLevel : 5, ProduceGold : 360, ProduceTime : 45, LevelUpCost : 3600, Des : "厨房", IncomePerSecond : 8 	},
		{ Id : 4003, Type : 4, MaxLevel : 5, ProduceGold : 780, ProduceTime : 65, LevelUpCost : 11700, Des : "厨房", IncomePerSecond : 12 	},
		{ Id : 4004, Type : 4, MaxLevel : 5, ProduceGold : 1360, ProduceTime : 85, LevelUpCost : 27200, Des : "厨房", IncomePerSecond : 16 	},
		{ Id : 4005, Type : 4, MaxLevel : 5, ProduceGold : 2100, ProduceTime : 105, LevelUpCost : 0, Des : "厨房", IncomePerSecond : 20 	}
	]


// Id
export var THouseCellById : game.Dictionary<table.ITHouseCellDefine> = {}
function readTHouseCellById(){
  for(let rec of THouseCell) {
    THouseCellById[rec.Id] = rec; 
  }
}
readTHouseCellById();
}

