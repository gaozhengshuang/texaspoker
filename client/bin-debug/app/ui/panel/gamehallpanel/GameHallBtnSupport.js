var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 大厅面板按钮逻辑
 */
var GameHallBtnSupport = (function () {
    function GameHallBtnSupport(panel) {
        this.btnInfoList = new Array();
        this.bindPhoneAwardId = 201;
        this.target = panel;
        if (!VersionManager.isSafe) {
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.NewGiftBtn, this.target.newGiftBtn));
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.InviteBtn, this.target.inviteBtn));
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.ShareBtn, this.target.shareBtn));
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.FirstpayBtn, this.target.firstpayBtn));
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.BindPhoneAwardBtn, this.target.bindPhoneAwardBtn));
        }
        this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.MonthCardBtn, this.target.monthCardBtn));
        VersionManager.setComponentVisibleBySafe(this.target.newGiftBtn, this.target.inviteBtn, this.target.shareBtn, this.target.firstpayBtn, this.target.bindPhoneAwardBtn);
        this.btnInfoList.sort(SortUtil.GameHallBtnSort);
    }
    GameHallBtnSupport.prototype.onEnable = function () {
        AwardManager.OnAwardValueChanged.addListener(this.refreshPayButton, this);
        BindAccountManager.bindListEvent.addListener(this.setIsShowBindPhoneAwardBtn, this);
        ActivityManager.bindPhoneAwardHandler.bringSuccessEvent.addListener(this.bringSuccess, this);
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.addListener(this.onGetPayPrizeAward, this);
    };
    GameHallBtnSupport.prototype.onDisable = function () {
        AwardManager.OnAwardValueChanged.removeListener(this.refreshPayButton, this);
        BindAccountManager.bindListEvent.removeListener(this.setIsShowBindPhoneAwardBtn, this);
        ActivityManager.bindPhoneAwardHandler.bringSuccessEvent.removeListener(this.bringSuccess, this);
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.addListener(this.onGetPayPrizeAward, this);
    };
    GameHallBtnSupport.prototype.init = function () {
        this.refreshPayButton();
        this.refreshNewGift();
        this.changeActivityBtn(this.target.shareBtn, false);
    };
    /**
    * 充值过后刷新首充活动按钮
    */
    GameHallBtnSupport.prototype.refreshPayButton = function () {
        var isShow = ActivityManager.payPrizeHandler.isShowFirstPay();
        if (isShow) {
            this.changeActivityBtn(this.target.firstpayBtn, true);
        }
        else {
            this.changeActivityBtn(this.target.firstpayBtn, false);
        }
    };
    /**
     * 领取累积活动奖励刷新按钮
     */
    GameHallBtnSupport.prototype.onGetPayPrizeAward = function (id) {
        var info = ActivityManager.getActivityInfo(id);
        if (InfoUtil.checkAvailable(info) && info.definition.subType == ActivitySubType.NewGift) {
            this.refreshNewGift();
        }
    };
    /**
     * 刷新新人礼活动
     */
    GameHallBtnSupport.prototype.refreshNewGift = function () {
        var activityInfo = ActivityManager.pilePrizeHandler.getInfoBySubType(ActivitySubType.NewGift);
        var state = ActivityUtil.getActivityOpenState(activityInfo);
        if (InfoUtil.checkAvailable(activityInfo) && !ActivityManager.pilePrizeHandler.isTakeAllAward(activityInfo.id) && state == ActivityOpenState.Open) {
            this.changeActivityBtn(this.target.newGiftBtn, true);
        }
        else {
            this.changeActivityBtn(this.target.newGiftBtn, false);
        }
    };
    /**
    * 设置是否显示绑定手机奖励按钮
    */
    GameHallBtnSupport.prototype.setIsShowBindPhoneAwardBtn = function () {
        var bringAwardDef = AwardDefined.GetInstance().getDefinition(this.bindPhoneAwardId);
        if (ChannelManager.loginType != ChannelLoginType.Qin) {
            if (BindAccountManager.getIsBinding(ChannelLoginType.Qin) && AwardManager.isToLimit(bringAwardDef)) {
                this.changeActivityBtn(this.target.bindPhoneAwardBtn, false);
            }
            else {
                this.changeActivityBtn(this.target.bindPhoneAwardBtn, true);
            }
        }
        else {
            this.changeActivityBtn(this.target.bindPhoneAwardBtn, false);
        }
    };
    /**
     * 绑定手机奖励领取成功
    */
    GameHallBtnSupport.prototype.bringSuccess = function (id) {
        var activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BindChannel);
        if (activityInfo && activityInfo.id == id) {
            this.changeActivityBtn(this.target.bindPhoneAwardBtn, false);
        }
    };
    /**
     * 改变活动按钮显隐
     */
    GameHallBtnSupport.prototype.changeActivityBtn = function (btn, isShow) {
        var btnInfo;
        for (var _i = 0, _a = this.btnInfoList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.btn == btn) {
                btnInfo = info;
                break;
            }
        }
        if (btnInfo) {
            btnInfo.isShow = isShow;
            this.refreshBtnList();
        }
        else {
            qin.Console.logError("按钮不存在于队列!");
        }
    };
    GameHallBtnSupport.prototype.refreshBtnList = function () {
        if (this.target.topBtnGroup.numChildren > 0) {
            this.target.topBtnGroup.removeChildren();
        }
        for (var i = 0; i < this.btnInfoList.length; i++) {
            if (this.btnInfoList[i].isShow) {
                this.target.topBtnGroup.addChild(this.btnInfoList[i].btn);
            }
        }
    };
    return GameHallBtnSupport;
}());
__reflect(GameHallBtnSupport.prototype, "GameHallBtnSupport");
//# sourceMappingURL=GameHallBtnSupport.js.map