// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TCar : table.ITCarDefine[] = [
		{ Id : 1001, Brand : "宝马", Model : "X7", MoveRange : 1000, Capacity : 1000, RewardPerH : 100, Price : 2000, Des : "", path : "carIconAltas_json.small_1", bigpath : "carIconAltas_json.big_1" 	}
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

