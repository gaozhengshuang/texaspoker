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
 * 横幅提醒
 */
var BaseBannerRemindPanel = (function (_super) {
    __extends(BaseBannerRemindPanel, _super);
    function BaseBannerRemindPanel() {
        return _super.call(this) || this;
    }
    BaseBannerRemindPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.layer = UILayerType.Guide;
    };
    BaseBannerRemindPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this.des = appendData;
        }
        this.countDownNum = 3;
    };
    BaseBannerRemindPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.setRemindInfo();
        this.enterAnime();
        this.countDown();
        qin.Tick.AddSecondsInvoke(this.countDown, this);
    };
    BaseBannerRemindPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    BaseBannerRemindPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
    };
    /**
     * 设置提示信息
    */
    BaseBannerRemindPanel.prototype.setRemindInfo = function () {
        this.desLabel.text = this.des;
    };
    /**
     * 入场动画
    */
    BaseBannerRemindPanel.prototype.enterAnime = function () {
        egret.Tween.removeTweens(this.anmGroup);
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = -100;
        enter.to({ y: 0 }, 200);
    };
    /**
     * 退场动画
    */
    BaseBannerRemindPanel.prototype.outAnime = function () {
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 0;
        enter.to({ y: -100 }, 200).call(this.onCloseAnmComplete, this);
    };
    BaseBannerRemindPanel.prototype.onCloseAnmComplete = function () {
        UIManager.closePanel(this);
    };
    /**
     * 关闭按钮点击事件
    */
    BaseBannerRemindPanel.prototype.onCloseBtnClickHandler = function (event) {
        ChampionshipManager.mttRemindStartHandler.ResetThreeMinFlagEvent.dispatch();
        this.outAnime();
    };
    /**
     * 倒计时
    */
    BaseBannerRemindPanel.prototype.countDown = function () {
        this.countDownNum--;
        if (this.countDownNum <= 0) {
            qin.Tick.RemoveSecondsInvoke(this.countDown, this);
            ChampionshipManager.mttRemindStartHandler.ResetThreeMinFlagEvent.dispatch();
            this.outAnime();
        }
    };
    return BaseBannerRemindPanel;
}(BasePanel));
__reflect(BaseBannerRemindPanel.prototype, "BaseBannerRemindPanel");
//# sourceMappingURL=BaseBannerRemindPanel.js.map