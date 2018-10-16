// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var HundredWarCardType : table.IHundredWarCardTypeDefine[] = [
		{ Id : 1, Type : 1, Odds : 1, PoolOdds : 0 	},
		{ Id : 2, Type : 2, Odds : 1, PoolOdds : 0 	},
		{ Id : 3, Type : 3, Odds : 1, PoolOdds : 0 	},
		{ Id : 4, Type : 4, Odds : 2, PoolOdds : 0 	},
		{ Id : 5, Type : 5, Odds : 2, PoolOdds : 0 	},
		{ Id : 6, Type : 6, Odds : 3, PoolOdds : 0 	},
		{ Id : 7, Type : 7, Odds : 4, PoolOdds : 0 	},
		{ Id : 8, Type : 8, Odds : 5, PoolOdds : 0.3 	},
		{ Id : 9, Type : 9, Odds : 6, PoolOdds : 0.4 	},
		{ Id : 10, Type : 10, Odds : 7, PoolOdds : 0.5 	}
	]


// Id
export var HundredWarCardTypeById : game.Dictionary<table.IHundredWarCardTypeDefine> = {}
function readHundredWarCardTypeById(){
  for(let rec of HundredWarCardType) {
    HundredWarCardTypeById[rec.Id] = rec; 
  }
}
readHundredWarCardTypeById();
}

