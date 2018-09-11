// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TGuide : table.ITGuideDefine[] = [
		{ Id : 1, PreId : 0, NextId : 0, FinishFlag : 0, Group : 0, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "" 	},
		{ Id : 2, PreId : 0, NextId : 3, FinishFlag : 1, Group : 1, TriggerType : 1, Reward : 0, TriggerParams : "22,goinRoom_btn", FinishType : 1, FinishParams : "goinRoom_btn", Desc : "" 	},
		{ Id : 3, PreId : 2, NextId : 4, FinishFlag : 1, Group : 2, TriggerType : 1, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "这里是房子中客厅的收益，每隔一定的时间就会有金币产生，要及时来收取金币。" 	},
		{ Id : 4, PreId : 3, NextId : 5, FinishFlag : 0, Group : 3, TriggerType : 1, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "升级房子能够开启更多房间来产生金币" 	},
		{ Id : 5, PreId : 4, NextId : 6, FinishFlag : 1, Group : 3, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "点击升级按钮，就可以开启卧室了" 	},
		{ Id : 6, PreId : 5, NextId : 7, FinishFlag : 0, Group : 3, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "" 	},
		{ Id : 7, PreId : 6, NextId : 8, FinishFlag : 1, Group : 4, TriggerType : 1, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "点击这里，领取卧室产生的金币" 	},
		{ Id : 8, PreId : 7, NextId : 9, FinishFlag : 0, Group : 5, TriggerType : 1, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "让我们看看楼里邻居的状况" 	},
		{ Id : 9, PreId : 8, NextId : 10, FinishFlag : 0, Group : 5, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "选择其中一个邻居，进入他的房间吧" 	},
		{ Id : 10, PreId : 9, NextId : 11, FinishFlag : 1, Group : 5, TriggerType : 0, Reward : 500, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "点击邻居家客厅的金币，就可以抢夺他的金币了" 	},
		{ Id : 11, PreId : 10, NextId : 12, FinishFlag : 0, Group : 5, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "" 	},
		{ Id : 12, PreId : 11, NextId : 13, FinishFlag : 0, Group : 5, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "" 	},
		{ Id : 13, PreId : 12, NextId : 14, FinishFlag : 0, Group : 6, TriggerType : 1, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "让我们提升客厅的等级，提升收益" 	},
		{ Id : 14, PreId : 13, NextId : 15, FinishFlag : 1, Group : 6, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "升级客厅可以提升金币产量" 	},
		{ Id : 15, PreId : 14, NextId : 16, FinishFlag : 0, Group : 6, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "" 	},
		{ Id : 16, PreId : 15, NextId : 17, FinishFlag : 1, Group : 7, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "可以领取客厅收益了" 	},
		{ Id : 17, PreId : 16, NextId : 0, FinishFlag : 1, Group : 7, TriggerType : 0, Reward : 0, TriggerParams : "", FinishType : 0, FinishParams : "", Desc : "可以领取卧室收益了" 	}
	]


// Id
export var TGuideById : game.Dictionary<table.ITGuideDefine> = {}
function readTGuideById(){
  for(let rec of TGuide) {
    TGuideById[rec.Id] = rec; 
  }
}
readTGuideById();
}

