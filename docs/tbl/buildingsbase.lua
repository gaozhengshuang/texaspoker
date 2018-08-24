// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TBuildings : table.ITBuildingsDefine[] = [
		{ Id : 1, Province : 102, City : 2003, CommunityId : 2003001, Community : "万科城市花园", Number : 1, MaxFloor : 10, NumPerFloor : 4, BuildingPrice : 9400, Houses1 : "1001-1-62", Houses2 : "2001-1-82", Houses3 : "3001-1-102", Houses4 : "4001-1-130", PosX : 31.153342, PosY : 121.334982, Des : "万科旗下精品住宅，9号线中春路旁100米，盛大开盘！" 	},
		{ Id : 2, Province : 102, City : 2003, CommunityId : 2003001, Community : "万科城市花园", Number : 2, MaxFloor : 10, NumPerFloor : 4, BuildingPrice : 9400, Houses1 : "1001-1-62", Houses2 : "2001-1-82", Houses3 : "3001-1-102", Houses4 : "4001-1-130", PosX : 31.153342, PosY : 121.334982, Des : "万科旗下精品住宅，9号线中春路旁100米，盛大开盘！" 	}
	]


// Id
export var TBuildingsById : game.Dictionary<table.ITBuildingsDefine> = {}
function readTBuildingsById(){
  for(let rec of TBuildings) {
    TBuildingsById[rec.Id] = rec; 
  }
}
readTBuildingsById();
}

