// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TMapEventRefresh : table.ITMapEventRefreshDefine[] = [
		{ Id : 1, TypeRand : [ "1001-500", "1002-500", "1003-500", "2001-500", "2002-500", "3001-100", "3002-100" ], RangeMin : 0, RangeMax : 1000, Num : 3 	},
		{ Id : 2, TypeRand : [ "1001-500", "1002-500", "1003-500", "2001-500", "2002-500", "3001-100", "3002-100" ], RangeMin : 1000, RangeMax : 2000, Num : 5 	},
		{ Id : 3, TypeRand : [ "1001-500", "1002-500", "1003-500", "2001-500", "2002-500", "3001-100", "3002-100" ], RangeMin : 2000, RangeMax : 4000, Num : 7 	},
		{ Id : 4, TypeRand : [ "1001-500", "1002-500", "1003-500", "2001-500", "2002-500", "3001-100", "3002-100" ], RangeMin : 4000, RangeMax : 6000, Num : 9 	},
		{ Id : 5, TypeRand : [ "1001-500", "1002-500", "1003-500", "2001-500", "2002-500", "3001-100", "3002-100" ], RangeMin : 6000, RangeMax : 10000, Num : 10 	}
	]


// Id
export var TMapEventRefreshById : game.Dictionary<table.ITMapEventRefreshDefine> = {}
function readTMapEventRefreshById(){
  for(let rec of TMapEventRefresh) {
    TMapEventRefreshById[rec.Id] = rec; 
  }
}
readTMapEventRefreshById();
}

