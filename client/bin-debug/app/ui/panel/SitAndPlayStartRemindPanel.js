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
 * 坐满即玩开赛提示面板
 */
var SitAndPlayStartRemindPanel = (function (_super) {
    __extends(SitAndPlayStartRemindPanel, _super);
    function SitAndPlayStartRemindPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.SitAndPlayStartRemindPanel);
        return _this;
    }
    SitAndPlayStartRemindPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    SitAndPlayStartRemindPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this._countDownNum = appendData.countDownNum;
            this._startMatch = appendData.startMatch;
            this.desLabel.textFlow = qin.TextUtil.parse('您报名的坐满即玩' +
                '<font color="#F3C655" size="24">' + this._startMatch.definition.name + '</font>' +
                '马上就要开赛，是否立即进入？' + '（' + qin.DateTimeUtil.countDownFormat(this._countDownNum, false) + '）');
            qin.Tick.AddSecondsInvoke(this.countDown, this);
        }
    };
    SitAndPlayStartRemindPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    SitAndPlayStartRemindPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
    };
    SitAndPlayStartRemindPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterMatch, this);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
    };
    SitAndPlayStartRemindPanel.prototype.onCloseBtnClickHandler = function (event) {
        ChampionshipManager.mttRemindStartHandler.remindWaitMTT();
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    /**
     * 立即进入
    */
    SitAndPlayStartRemindPanel.prototype.enterMatch = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this._startMatch) {
            ChampionshipManager.enterMttHandler.enterMatch(this._startMatch, UIModuleName.SecondRemindPanel);
        }
    };
    /**
     * 倒计时
    */
    SitAndPlayStartRemindPanel.prototype.countDown = function () {
        this._countDownNum--;
        this.desLabel.textFlow = qin.TextUtil.parse('您报名的坐满即玩' +
            '<font color="#F3C655" size="24">' + this._startMatch.definition.name + '</font>' +
            '马上就要开赛，是否立即进入？' + '（' + qin.DateTimeUtil.countDownFormat(this._countDownNum, false) + '）');
        if (this._countDownNum <= 0) {
            this.desLabel.text = "比赛即将开始";
            qin.Tick.RemoveSecondsInvoke(this.countDown, this);
            this.onCloseBtnClickHandler(null);
        }
    };
    return SitAndPlayStartRemindPanel;
}(BasePanel));
__reflect(SitAndPlayStartRemindPanel.prototype, "SitAndPlayStartRemindPanel");
//# sourceMappingURL=SitAndPlayStartRemindPanel.js.map