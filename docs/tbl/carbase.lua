// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TCar : table.ITCarDefine[] = [
		{ Id : 1001, Brand : "奔驰", Model : "smart", Price : 0, Des : "", path : "carIconAltas_json.small_1", bigpath : "carIconAltas_json.big_1", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1002, Brand : "本田", Model : "思域", Price : 0, Des : "", path : "carIconAltas_json.small_2", bigpath : "carIconAltas_json.big_2", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1003, Brand : "大众", Model : "polo", Price : 0, Des : "", path : "carIconAltas_json.small_3", bigpath : "carIconAltas_json.big_3", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1004, Brand : "丰田", Model : "汉兰达", Price : 0, Des : "", path : "carIconAltas_json.small_4", bigpath : "carIconAltas_json.big_4", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1005, Brand : "奥迪", Model : "A4L", Price : 0, Des : "", path : "carIconAltas_json.small_5", bigpath : "carIconAltas_json.big_5", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1006, Brand : "宝马", Model : "mini", Price : 0, Des : "", path : "carIconAltas_json.small_6", bigpath : "carIconAltas_json.big_6", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1007, Brand : "雪佛莱", Model : "科迈罗", Price : 0, Des : "", path : "carIconAltas_json.small_7", bigpath : "carIconAltas_json.big_7", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1008, Brand : "保时捷", Model : "911", Price : 0, Des : "", path : "carIconAltas_json.small_8", bigpath : "carIconAltas_json.big_8", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1009, Brand : "奔驰", Model : "G级", Price : 0, Des : "", path : "carIconAltas_json.small_9", bigpath : "carIconAltas_json.big_9", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	},
		{ Id : 1010, Brand : "劳斯劳斯", Model : "古斯特", Price : 0, Des : "", path : "carIconAltas_json.small_10", bigpath : "carIconAltas_json.big_10", Tyre : 0, Tank : 0, Trunk : 0, Engine : 0, Battery : 0, MaxStar : 0, StarAttrGroup : 0 	}
	]


// Id
export var TCarById : game.Dictionary<table.ITCarDefine> = {}
function readTCarById(){
  for(let rec of TCar) {
    TCarById[rec.Id] = rec; 
  }
}
readTCarById();
}

