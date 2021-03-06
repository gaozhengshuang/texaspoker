// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var TGuide : table.ITGuideDefine[] = [
		{ Id : 1, PreId : 0, NextId : 0, FinishFlag : 0, EndFlag : 0, AutoFinishFlag : 0, Group : 0, TriggerType : 0, Reward : 0, TriggerParams : "", Direction : 0, FinishType : 0, FinishParams : "", BgAlpha : 0, Desc : "" 	},
		{ Id : 2, PreId : 0, NextId : 3, FinishFlag : 1, EndFlag : 1, AutoFinishFlag : 1, Group : 2, TriggerType : 1, Reward : 0, TriggerParams : "22,none,247,774,217,221", Direction : 1, FinishType : 1, FinishParams : "22,goinRoom_btn", BgAlpha : 0, Desc : "" 	},
		{ Id : 3, PreId : 2, NextId : 4, FinishFlag : 1, EndFlag : 1, AutoFinishFlag : 0, Group : 3, TriggerType : 1, Reward : 0, TriggerParams : "19,none,361,627,135,219", Direction : 1, FinishType : 2, FinishParams : "msg.GW2C_AckTakeSelfHouseGoldRet", BgAlpha : 0.5, Desc : "这里是房子中客厅的收益，每隔一定的时间就会有金币产生，要及时来收取金币。" 	},
		{ Id : 4, PreId : 3, NextId : 5, FinishFlag : 0, EndFlag : 0, AutoFinishFlag : 0, Group : 4, TriggerType : 1, Reward : 0, TriggerParams : "19,level_btn", Direction : 1, FinishType : 1, FinishParams : "19,level_btn", BgAlpha : 0.5, Desc : "升级房子能够开启更多房间来产生金币" 	},
		{ Id : 5, PreId : 4, NextId : 6, FinishFlag : 1, EndFlag : 0, AutoFinishFlag : 0, Group : 4, TriggerType : 0, Reward : 0, TriggerParams : "19,none,532,440, 170,66", Direction : 1, FinishType : 2, FinishParams : "msg.GW2C_AckHouseLevelUp", BgAlpha : 0.5, Desc : "点击升级按钮，就可以开启卧室了" 	},
		{ Id : 6, PreId : 5, NextId : 7, FinishFlag : 0, EndFlag : 1, AutoFinishFlag : 0, Group : 4, TriggerType : 0, Reward : 0, TriggerParams : "19,hideList_btn", Direction : 1, FinishType : 1, FinishParams : "19,hideList_btn", BgAlpha : 0.5, Desc : "" 	},
		{ Id : 7, PreId : 6, NextId : 8, FinishFlag : 1, EndFlag : 1, AutoFinishFlag : 0, Group : 5, TriggerType : 1, Reward : 0, TriggerParams : "19,none,482,458,135,219", Direction : 1, FinishType : 2, FinishParams : "msg.GW2C_AckTakeSelfHouseGoldRet", BgAlpha : 0.5, Desc : "点击这里，领取卧室产生的金币" 	},
		{ Id : 8, PreId : 7, NextId : 9, FinishFlag : 0, EndFlag : 0, AutoFinishFlag : 0, Group : 6, TriggerType : 1, Reward : 0, TriggerParams : "19,lingju_btn", Direction : 1, FinishType : 1, FinishParams : "19,lingju_btn", BgAlpha : 0.5, Desc : "让我们看看楼里邻居的状况" 	},
		{ Id : 9, PreId : 8, NextId : 10, FinishFlag : 0, EndFlag : 0, AutoFinishFlag : 0, Group : 6, TriggerType : 0, Reward : 0, TriggerParams : "19,none,517,431,150,56", Direction : 1, FinishType : 2, FinishParams : "msg.GW2C_AckHouseDataByHouseId", BgAlpha : 0.5, Desc : "选择其中一个邻居，进入他的房间吧" 	},
		{ Id : 10, PreId : 9, NextId : 11, FinishFlag : 1, EndFlag : 0, AutoFinishFlag : 0, Group : 6, TriggerType : 0, Reward : 500, TriggerParams : "19,none,356,637,135,219", Direction : 1, FinishType : 2, FinishParams : "msg.GW2C_AckTakeOtherHouseGoldRet", BgAlpha : 0.5, Desc : "点击邻居家客厅的金币，就可以抢夺他的金币了" 	},
		{ Id : 11, PreId : 10, NextId : 12, FinishFlag : 0, EndFlag : 1, AutoFinishFlag : 0, Group : 6, TriggerType : 0, Reward : 0, TriggerParams : "19,none,16,5,160,60", Direction : 2, FinishType : 1, FinishParams : "19,titlePanel,return_btn", BgAlpha : 0.5, Desc : "" 	},
		{ Id : 12, PreId : 11, NextId : 13, FinishFlag : 0, EndFlag : 0, AutoFinishFlag : 0, Group : 7, TriggerType : 1, Reward : 0, TriggerParams : "19,none,197,278,120,130", Direction : 1, FinishType : 1, FinishParams : "19,level_btn", BgAlpha : 0.5, Desc : "让我们提升客厅的等级，提升收益" 	},
		{ Id : 13, PreId : 12, NextId : 14, FinishFlag : 1, EndFlag : 0, AutoFinishFlag : 0, Group : 7, TriggerType : 0, Reward : 0, TriggerParams : "19,none,532,606, 170,66", Direction : 1, FinishType : 2, FinishParams : "msg.GW2C_AckHouseCellLevelUp", BgAlpha : 0.5, Desc : "升级客厅可以提升金币产量" 	},
		{ Id : 14, PreId : 13, NextId : 15, FinishFlag : 0, EndFlag : 1, AutoFinishFlag : 0, Group : 7, TriggerType : 0, Reward : 0, TriggerParams : "19,hideList_btn", Direction : 1, FinishType : 1, FinishParams : "19,hideList_btn", BgAlpha : 0.5, Desc : "" 	},
		{ Id : 15, PreId : 14, NextId : 16, FinishFlag : 1, EndFlag : 0, AutoFinishFlag : 0, Group : 8, TriggerType : 0, Reward : 0, TriggerParams : "19,none,361,627,135,219", Direction : 1, FinishType : 2, FinishParams : "msg.GW2C_AckTakeSelfHouseGoldRet", BgAlpha : 0.5, Desc : "可以领取客厅收益了" 	},
		{ Id : 16, PreId : 15, NextId : 0, FinishFlag : 1, EndFlag : 1, AutoFinishFlag : 0, Group : 8, TriggerType : 0, Reward : 0, TriggerParams : "19,none,482,458,135,219", Direction : 1, FinishType : 2, FinishParams : "msg.GW2C_AckTakeSelfHouseGoldRet", BgAlpha : 0.5, Desc : "可以领取卧室收益了" 	}
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

