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
 * 破产补助面板
 */
var BankruptSubsidyInGamePanel = (function (_super) {
    __extends(BankruptSubsidyInGamePanel, _super);
    function BankruptSubsidyInGamePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.BankruptSubsidyInGamePanel);
        return _this;
    }
    BankruptSubsidyInGamePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    BankruptSubsidyInGamePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (!this._subInfo) {
            this._subInfo = this.activityInfo.subList[0];
        }
        this.refresh();
    };
    BankruptSubsidyInGamePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakePrize, this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.addListener(this.onTakeOver, this);
    };
    BankruptSubsidyInGamePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakePrize, this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.removeListener(this.onTakeOver, this);
    };
    BankruptSubsidyInGamePanel.prototype.onTakeOver = function () {
        this.refresh();
        this.onCloseBtnClickHandler(null);
    };
    BankruptSubsidyInGamePanel.prototype.refresh = function () {
        if (InfoUtil.checkAvailable(this.activityInfo)) {
            this.leftTimeLabel.text = ActivityManager.bankruptSubsidyHandler.getLeftPrizeTimes().toString();
            if (this._subInfo) {
                this.goldLimitLabel.text = this._subInfo.definition.limitGold.toString();
            }
            this.takePrizeBtn.enabled = ActivityManager.bankruptSubsidyHandler.isBankruptSubsidy;
        }
    };
    BankruptSubsidyInGamePanel.prototype.onTakePrize = function (event) {
        if (this._subInfo && UserManager.userInfo.gold > this._subInfo.definition.limitGold) {
            AlertManager.showAlert("您当前拥有的金币大于1000，暂时不可领取救助金！");
            return;
        }
        if (ActivityManager.bankruptSubsidyHandler.getLeftPrizeTimes() > 0) {
            ActivityManager.ReqGetActivityAward(this.activityInfo.id, 1);
        }
        else {
            qin.Console.log("领取次数已用尽");
        }
    };
    return BankruptSubsidyInGamePanel;
}(BaseActivityPanel));
__reflect(BankruptSubsidyInGamePanel.prototype, "BankruptSubsidyInGamePanel");
//# sourceMappingURL=BankruptSubsidyInGamePanel.js.map