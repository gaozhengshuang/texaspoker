// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TCarBrand : table.ITCarBrandDefine[] = [
		{ Id : 1000, Brand : "奔驰" 	},
		{ Id : 2000, Brand : "本田" 	},
		{ Id : 3000, Brand : "大众" 	},
		{ Id : 4000, Brand : "丰田" 	},
		{ Id : 5000, Brand : "奥迪" 	},
		{ Id : 6000, Brand : "宝马" 	},
		{ Id : 7000, Brand : "雪佛莱" 	},
		{ Id : 8000, Brand : "保时捷" 	},
		{ Id : 9000, Brand : "奔驰" 	},
		{ Id : 10000, Brand : "劳斯劳斯" 	}
	]


// Id
export var TCarBrandById : game.Dictionary<table.ITCarBrandDefine> = {}
function readTCarBrandById(){
  for(let rec of TCarBrand) {
    TCarBrandById[rec.Id] = rec; 
  }
}
readTCarBrandById();
}

