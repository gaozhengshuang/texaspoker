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
 * 比赛1分钟开始倒计时提醒面板
 */
var MinuteRemindPanel = (function (_super) {
    __extends(MinuteRemindPanel, _super);
    function MinuteRemindPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.MinuteRemindPanel);
        return _this;
    }
    MinuteRemindPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    MinuteRemindPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this._isClick = false;
        if (appendData) {
            this.countDownNum = appendData.countDownNum;
            this.recordId = appendData.recordId;
        }
    };
    MinuteRemindPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    MinuteRemindPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMacth, this);
        ChampionshipManager.OnWithdrawEvent.addListener(this.outAnime, this);
    };
    MinuteRemindPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMacth, this);
        ChampionshipManager.OnWithdrawEvent.removeListener(this.outAnime, this);
        qin.Tick.RemoveTimeoutInvoke(this.palyOutAnime, this);
    };
    /**
     * 设置提示信息
    */
    MinuteRemindPanel.prototype.setRemindInfo = function () {
        this.desLabel.text = "您报名的比赛将于00:60秒后开始！";
    };
    /**
     * 退赛关闭横幅
    */
    MinuteRemindPanel.prototype.withdrawClose = function (data) {
        if (data.recordId == this.recordId) {
            this.outAnime();
        }
    };
    MinuteRemindPanel.prototype.onCloseAnmComplete = function () {
        if (!this._isClick) {
            UIManager.closePanel(UIModuleName.MinuteRemindPanel);
        }
    };
    /**
     * 立即进入
    */
    MinuteRemindPanel.prototype.enterMacth = function (event) {
        SoundManager.playButtonEffect(event.target);
        var info = ChampionshipManager.getMathInfoByRecordId(this.recordId);
        if (info) {
            ChampionshipManager.enterMttHandler.enterMatch(info, UIModuleName.MinuteRemindPanel);
            this._isClick = true;
        }
    };
    /**
     * 倒计时
    */
    MinuteRemindPanel.prototype.countDown = function () {
        this.countDownNum--;
        this.desLabel.text = "您报名的比赛将于" + qin.DateTimeUtil.countDownFormat(this.countDownNum, false) + "秒后开始！";
        if (this.countDownNum <= 0) {
            this.desLabel.text = "比赛即将开始";
            qin.Tick.RemoveSecondsInvoke(this.countDown, this);
            qin.Tick.AddTimeoutInvoke(this.palyOutAnime, 500, this);
        }
    };
    MinuteRemindPanel.prototype.palyOutAnime = function () {
        qin.Tick.RemoveTimeoutInvoke(this.palyOutAnime, this);
        this.outAnime();
    };
    return MinuteRemindPanel;
}(BaseBannerRemindPanel));
__reflect(MinuteRemindPanel.prototype, "MinuteRemindPanel");
//# sourceMappingURL=MinuteRemindPanel.js.map