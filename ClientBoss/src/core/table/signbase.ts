// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TSign : table.ITSignDefine[] = [
		{ Id : 1, CostId : 6005, Num : 10 	},
		{ Id : 2, CostId : 6005, Num : 10 	},
		{ Id : 3, CostId : 6005, Num : 10 	},
		{ Id : 4, CostId : 6005, Num : 10 	},
		{ Id : 5, CostId : 4027, Num : 1 	},
		{ Id : 6, CostId : 6005, Num : 10 	},
		{ Id : 7, CostId : 6005, Num : 10 	}
	]


// Id
export var TSignById : game.Dictionary<table.ITSignDefine> = {}
function readTSignById(){
  for(let rec of TSign) {
    TSignById[rec.Id] = rec; 
  }
}
readTSignById();
}

