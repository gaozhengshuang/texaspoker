// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TStarupCar : table.ITStarupCarDefine[] = [
		{ Id : 1, Money : 1000, Item : [  ] 	},
		{ Id : 2, Money : 3000, Item : [  ] 	},
		{ Id : 3, Money : 5000, Item : [  ] 	},
		{ Id : 4, Money : 7000, Item : [  ] 	},
		{ Id : 5, Money : 9000, Item : [  ] 	},
		{ Id : 6, Money : 11000, Item : [  ] 	},
		{ Id : 7, Money : 13000, Item : [  ] 	},
		{ Id : 8, Money : 15000, Item : [  ] 	},
		{ Id : 9, Money : 17000, Item : [  ] 	},
		{ Id : 10, Money : 19000, Item : [  ] 	}
	]


// Id
export var TStarupCarById : game.Dictionary<table.ITStarupCarDefine> = {}
function readTStarupCarById(){
  for(let rec of TStarupCar) {
    TStarupCarById[rec.Id] = rec; 
  }
}
readTStarupCarById();
}

