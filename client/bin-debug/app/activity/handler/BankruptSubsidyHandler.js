var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 破产补助活动管理
 */
var BankruptSubsidyHandler = (function (_super) {
    __extends(BankruptSubsidyHandler, _super);
    function BankruptSubsidyHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 领取破产奖励完成事件
         */
        _this.takeBankruptcyCompleteEvent = new qin.DelegateDispatcher();
        return _this;
    }
    BankruptSubsidyHandler.prototype.initialize = function (info) {
        _super.prototype.initialize.call(this, info);
        var def;
        var pInfo;
        for (var i = 0; i < BankruptSubsidyDefined.GetInstance().dataList.length; i++) {
            def = BankruptSubsidyDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, BankruptSubsidyInfo, def);
        }
        ;
        GamblingManager.SitOrStandEvent.addListener(this.onBust, this);
    };
    /**
     * 领取奖励完成回调
     */
    BankruptSubsidyHandler.prototype.onGetAwardComplete = function (id, subId) {
        _super.prototype.onGetAwardComplete.call(this, id, subId);
        var activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BankruptSubsidy);
        if (activityInfo && id == activityInfo.id) {
            var info = this.getInfo(id);
            if (info) {
                info.step++;
            }
            this.takeBankruptcyCompleteEvent.dispatch();
        }
    };
    /**
     * 领取奖励次数
     */
    BankruptSubsidyHandler.prototype.getPrizeTimes = function (id) {
        var info = this.getInfo(id);
        if (info) {
            return info.step;
        }
        else {
            qin.Console.log("活动id不存在！");
            return 0;
        }
    };
    /**
     * 获取剩余次数
     */
    BankruptSubsidyHandler.prototype.getLeftPrizeTimes = function () {
        var activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BankruptSubsidy);
        if (activityInfo) {
            var subInfo = this.getSubInfo(activityInfo.id, 1);
            if (subInfo) {
                return subInfo.definition.times - this.getPrizeTimes(activityInfo.id);
            }
            else {
                qin.Console.log("子id不存在！");
            }
        }
        return 0;
    };
    Object.defineProperty(BankruptSubsidyHandler.prototype, "isBankruptSubsidy", {
        /**
         * 是否能够领取破产补助
         */
        get: function () {
            var activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BankruptSubsidy);
            if (activityInfo) {
                var subInfo = this.getSubInfo(activityInfo.id, 1);
                if (subInfo && UserManager.userInfo.gold + UserManager.userInfo.safeGold < subInfo.definition.limitGold && this.getLeftPrizeTimes() > 0) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 破产处理
     */
    BankruptSubsidyHandler.prototype.onBust = function (obj) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && obj.pInfo.roleId == UserManager.userInfo.roleId && obj.state == BuyInGameState.Stand && UserManager.isBust) {
            var minNum = GamblingManager.roomInfo.definition.sBuyin;
            if (SceneManager.sceneType != SceneType.Hall) {
                var activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BankruptSubsidy);
                //破产活动时间内，且有条件领取破产补助
                if (activityInfo && ActivityUtil.getActivityOpenState(activityInfo) == ActivityOpenState.Open && this.isBankruptSubsidy) {
                    UIManager.showPanel(UIModuleName.BankruptSubsidyInGamePanel, { info: activityInfo });
                }
                else {
                    UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { minNum: minNum, isGoldInsufficient: true, isBankruptcy: true });
                }
            }
        }
    };
    return BankruptSubsidyHandler;
}(BaseActivitySubHandler));
__reflect(BankruptSubsidyHandler.prototype, "BankruptSubsidyHandler");
/**
 * 破产补助信息
 */
var BankruptSubsidyInfo = (function (_super) {
    __extends(BankruptSubsidyInfo, _super);
    function BankruptSubsidyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankruptSubsidyInfo.prototype.trySetDefinition = function () {
        _super.prototype.trySetDefinition.call(this);
        this._definition = BankruptSubsidyDefined.GetInstance().getSubDefinition(this._id, this._subId);
    };
    return BankruptSubsidyInfo;
}(BaseActivitySubInfo));
__reflect(BankruptSubsidyInfo.prototype, "BankruptSubsidyInfo");
//# sourceMappingURL=BankruptSubsidyHandler.js.map