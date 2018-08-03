// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TTask : table.ITTaskDefine[] = [
		{ Id : 1001, Desc : "注册账户", Count : 1, Reward : "6002-100" 	},
		{ Id : 1002, Desc : "达到目标分数", Count : 10000, Reward : "6002-100" 	},
		{ Id : 1003, Desc : "被邀请人达到目标分数", Count : 10000, Reward : "6002-100" 	},
		{ Id : 1004, Desc : "邀请其他玩家注册游戏", Count : 99999, Reward : "6002-100" 	}
	]


// Id
export var TTaskById : game.Dictionary<table.ITTaskDefine> = {}
function readTTaskById(){
  for(let rec of TTask) {
    TTaskById[rec.Id] = rec; 
  }
}
readTTaskById();
}

