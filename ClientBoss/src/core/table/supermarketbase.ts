// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TSupermarket : table.ITSupermarketDefine[] = [
		{ Id : 1, ItemId : 120004, Num : 1, Odds : 30, Show : "3" 	},
		{ Id : 2, ItemId : 130004, Num : 1, Odds : 50, Show : "2;3" 	},
		{ Id : 3, ItemId : 130005, Num : 1, Odds : 30, Show : "3" 	},
		{ Id : 4, ItemId : 130009, Num : 1, Odds : 50, Show : "2;3" 	},
		{ Id : 5, ItemId : 130010, Num : 1, Odds : 30, Show : "3" 	},
		{ Id : 6, ItemId : 130014, Num : 1, Odds : 50, Show : "2;3" 	},
		{ Id : 7, ItemId : 130015, Num : 1, Odds : 30, Show : "3" 	},
		{ Id : 8, ItemId : 130019, Num : 1, Odds : 50, Show : "2;3" 	},
		{ Id : 9, ItemId : 130020, Num : 1, Odds : 30, Show : "3" 	},
		{ Id : 10, ItemId : 130024, Num : 1, Odds : 50, Show : "2;3" 	},
		{ Id : 11, ItemId : 130025, Num : 1, Odds : 30, Show : "3" 	},
		{ Id : 12, ItemId : 140001, Num : 1, Odds : 30, Show : "3" 	},
		{ Id : 13, ItemId : 130001, Num : 1, Odds : 80, Show : "1;2" 	},
		{ Id : 14, ItemId : 130006, Num : 1, Odds : 80, Show : "1;2" 	},
		{ Id : 15, ItemId : 130011, Num : 1, Odds : 80, Show : "1" 	},
		{ Id : 16, ItemId : 130016, Num : 1, Odds : 80, Show : "1" 	},
		{ Id : 17, ItemId : 130021, Num : 1, Odds : 80, Show : "1" 	}
	]


// Id
export var TSupermarketById : game.Dictionary<table.ITSupermarketDefine> = {}
function readTSupermarketById(){
  for(let rec of TSupermarket) {
    TSupermarketById[rec.Id] = rec; 
  }
}
readTSupermarketById();
}

