// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var Activity_list : table.IActivity_listDefine[] = [
		{ Id : 3, Type : "signin", Name : "签到奖励", ClearType : 2, ClearType2 : 2, ResGroup : "", KeepDayEnd : 0, StartTime : [ 2017, 1, 1, 0, 0, 0 ], EndTime : [  ], Des : "", Icon : "", ImgId : "", PanelName : "SignInPanel", UnInShowPanel : 1, SubType : "", Trigger : [ "GameHallPanel", "signBtn" ], TriggerType : 1 	},
		{ Id : 4, Type : "payPrize", Name : "首充优惠", ClearType : 0, ClearType2 : 0, ResGroup : "activity_common", KeepDayEnd : 0, StartTime : [ 2017, 1, 1, 0, 0, 0 ], EndTime : [  ], Des : "额外赠送<font color='#f9cb55'>100000金币</font>+<font color='#f9cb55'>100元话费赛门票</font>", Icon : "", ImgId : "", PanelName : "FirstPayPanel", UnInShowPanel : 1, SubType : "firstPay", Trigger : [ "GameHallPanel", "firstpayBtn" ], TriggerType : 1 	},
		{ Id : 5, Type : "happyGift", Name : "欢乐送豪礼", ClearType : 0, ClearType2 : 0, ResGroup : "activity_happyGift", KeepDayEnd : 0, StartTime : [ 2018, 1, 19, 0, 0, 0 ], EndTime : [ 2018, 2, 28, 23, 59, 59 ], Des : "玩牌就送IphoneX、2亿金币、Ipad Pro、话费等丰厚大奖", Icon : "activity_shl", ImgId : "activity_happyGift_bg_png", PanelName : "HappyGiftPanel", UnInShowPanel : 0, SubType : "", Trigger : [  ], TriggerType : 1 	},
		{ Id : 6, Type : "laBa", Name : "德州转转转", ClearType : 0, ClearType2 : 0, ResGroup : "activity_laBa", KeepDayEnd : 0, StartTime : [ 2018, 1, 19, 0, 0, 0 ], EndTime : [ 2018, 2, 28, 23, 59, 59 ], Des : "赢海量金币，超级大量，巨额奖励转不停", Icon : "activity_dz", ImgId : "activity_laBa_bg_png", PanelName : "ShimTaeYoonPanel", UnInShowPanel : 0, SubType : "", Trigger : [  ], TriggerType : 1 	},
		{ Id : 7, Type : "bankruptSubsidy", Name : "破产补助", ClearType : 1, ClearType2 : 1, ResGroup : "", KeepDayEnd : 0, StartTime : [ 2018, 3, 16, 0, 0, 0 ], EndTime : [  ], Des : "在您的金币小于1000后，可领取破产补助4000金币，每天仅限4次。", Icon : "activity_pochan", ImgId : "", PanelName : "BankruptSubsidyPanel", UnInShowPanel : 0, SubType : "", Trigger : [  ], TriggerType : 1 	},
		{ Id : 8, Type : "bindChannel", Name : "绑定大礼包", ClearType : 0, ClearType2 : 0, ResGroup : "activity_bindChannel", KeepDayEnd : 0, StartTime : [ 2018, 3, 16, 0, 0, 0 ], EndTime : [  ], Des : "", Icon : "", ImgId : "", PanelName : "BindPhoneAwardPanel", UnInShowPanel : 1, SubType : "", Trigger : [ "GameHallPanel", "bindPhoneAwardBtn" ], TriggerType : 1 	},
		{ Id : 10, Type : "pilePrize", Name : "新人礼", ClearType : 0, ClearType2 : 0, ResGroup : "activity_newGift", KeepDayEnd : 2592000, StartTime : [ 2018, 3, 16, 0, 0, 0 ], EndTime : [  ], Des : "", Icon : "", ImgId : "", PanelName : "NewGiftPanel", UnInShowPanel : 1, SubType : "newGift", Trigger : [ "GameHallPanel", "newGiftBtn" ], TriggerType : 1 	},
		{ Id : 11, Type : "share", Name : "分享", ClearType : 1, ClearType2 : 1, ResGroup : "activity_share", KeepDayEnd : 0, StartTime : [ 2018, 3, 16, 0, 0, 0 ], EndTime : [  ], Des : "每日首次分享朋友圈，即可获得1次抽奖机会，100%中奖。抽奖次数当日有效，请尽快使用！", Icon : "", ImgId : "", PanelName : "ShareLuckDrawPanel", UnInShowPanel : 1, SubType : "", Trigger : [ "GameHallPanel", "shareBtn" ], TriggerType : 1 	}
	]


// Id
export var Activity_listById : game.Dictionary<table.IActivity_listDefine> = {}
function readActivity_listById(){
  for(let rec of Activity_list) {
    Activity_listById[rec.Id] = rec; 
  }
}
readActivity_listById();
}

