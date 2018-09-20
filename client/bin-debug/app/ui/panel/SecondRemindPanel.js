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
 * 比赛20秒开始提醒面板
 */
var SecondRemindPanel = (function (_super) {
    __extends(SecondRemindPanel, _super);
    function SecondRemindPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.SecondRemindPanel);
        return _this;
    }
    SecondRemindPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    SecondRemindPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this.countDownNum = appendData.countDownNum;
            this.recordId = appendData.recordId;
            this.desLabel.text = "您报名的比赛将于" + qin.DateTimeUtil.countDownFormat(this.countDownNum, false) + "秒后开始，是否立即进入比赛？";
            qin.Tick.AddSecondsInvoke(this.countDown, this);
        }
    };
    SecondRemindPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    SecondRemindPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
    };
    SecondRemindPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
    };
    SecondRemindPanel.prototype.onCloseBtnClickHandler = function (event) {
        ChampionshipManager.mttRemindStartHandler.remindWaitMTT();
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    /**
     * 立即进入
    */
    SecondRemindPanel.prototype.enterMatch = function (event) {
        SoundManager.playButtonEffect(event.target);
        var info = ChampionshipManager.getMathInfoByRecordId(this.recordId);
        if (info) {
            ChampionshipManager.enterMttHandler.enterMatch(info, UIModuleName.SecondRemindPanel);
        }
    };
    /**
     * 倒计时
    */
    SecondRemindPanel.prototype.countDown = function () {
        this.countDownNum--;
        this.desLabel.text = "您报名的比赛将于" + qin.DateTimeUtil.countDownFormat(this.countDownNum, false) + "秒后开始，是否立即进入比赛？";
        if (this.countDownNum <= 0) {
            this.desLabel.text = "比赛即将开始";
            qin.Tick.RemoveSecondsInvoke(this.countDown, this);
            this.onCloseBtnClickHandler(null);
        }
    };
    return SecondRemindPanel;
}(BasePanel));
__reflect(SecondRemindPanel.prototype, "SecondRemindPanel");
//# sourceMappingURL=SecondRemindPanel.js.map