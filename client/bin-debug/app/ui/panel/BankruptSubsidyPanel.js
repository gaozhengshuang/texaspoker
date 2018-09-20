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
var BankruptSubsidyPanel = (function (_super) {
    __extends(BankruptSubsidyPanel, _super);
    function BankruptSubsidyPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.BankruptSubsidyPanel);
        return _this;
    }
    BankruptSubsidyPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.resizeScroller.viewport = this.resizeGroup;
        UIManager.pushResizeScroller(this.resizeScroller, 1200);
        this.resizeScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    };
    BankruptSubsidyPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (!this._subInfo) {
            this._subInfo = this.activityInfo.subList[0];
        }
        this.resizeScroller.viewport.scrollV = 0;
        this.refresh();
    };
    BankruptSubsidyPanel.prototype.refresh = function () {
        if (InfoUtil.checkAvailable(this.activityInfo)) {
            this.leftTimeLabel.text = ActivityManager.bankruptSubsidyHandler.getLeftPrizeTimes().toString();
            if (this._subInfo) {
                this.goldLimitLabel.text = this._subInfo.definition.limitGold.toString();
            }
            this.takePrizeBtn.enabled = ActivityManager.bankruptSubsidyHandler.isBankruptSubsidy;
        }
    };
    BankruptSubsidyPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakePrize, this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.addListener(this.refresh, this);
    };
    BankruptSubsidyPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakePrize, this);
        ActivityManager.bankruptSubsidyHandler.takeBankruptcyCompleteEvent.removeListener(this.refresh, this);
    };
    BankruptSubsidyPanel.prototype.onTakePrize = function (event) {
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
    BankruptSubsidyPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return BankruptSubsidyPanel;
}(BaseActivityPanel));
__reflect(BankruptSubsidyPanel.prototype, "BankruptSubsidyPanel");
//# sourceMappingURL=BankruptSubsidyPanel.js.map