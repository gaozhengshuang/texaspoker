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
 * 计时奖励可领取提醒面板
 */
var GetTimeAwardRemindPanel = (function (_super) {
    __extends(GetTimeAwardRemindPanel, _super);
    function GetTimeAwardRemindPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GetTimeAwardRemindPanel);
        return _this;
    }
    GetTimeAwardRemindPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.anmGroup.touchEnabled = false;
        this.layer = UILayerType.Tips;
    };
    GetTimeAwardRemindPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.enterAnime();
        this.countDownNum = 5;
        var round = this.panelData.round + 1;
        if (round < TimeAwardDefined.GetInstance().dataList.length) {
            this.nextTimeGroup.visible = true;
            var timeawardDef = TimeAwardDefined.GetInstance().getDefinition(round + 1);
            if (timeawardDef) {
                this.nextTimeLabel.text = Math.round(timeawardDef.time / 60) + "分钟";
            }
        }
        else {
            this.nextTimeGroup.visible = false;
        }
        if (this.panelData.num) {
            this.awardNumLabel.text = this.panelData.num.toString() + "金币";
        }
        this.desLabel.text = "您完成了计时奖励第" + round + "轮";
        qin.Tick.AddSecondsInvoke(this.countDown, this);
    };
    GetTimeAwardRemindPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getTimeAward, this);
    };
    GetTimeAwardRemindPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeTweens();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getTimeAward, this);
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
    };
    /**
     * 移除动画
    */
    GetTimeAwardRemindPanel.prototype.removeTweens = function () {
        if (this.anmGroup) {
            egret.Tween.removeTweens(this.anmGroup);
        }
    };
    /**
     * 入场动画
    */
    GetTimeAwardRemindPanel.prototype.enterAnime = function () {
        egret.Tween.removeTweens(this.anmGroup);
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = -100;
        enter.to({ y: 0 }, 200);
    };
    /**
     * 退场动画
    */
    GetTimeAwardRemindPanel.prototype.outAnime = function () {
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.y = 0;
        enter.to({ y: -100 }, 200).call(this.onCloseAnmComplete, this);
    };
    GetTimeAwardRemindPanel.prototype.onCloseAnmComplete = function () {
        qin.Tick.RemoveTimeoutInvoke(this.outAnime, this);
        UIManager.closePanel(UIModuleName.GetTimeAwardRemindPanel);
    };
    /**
     * 领取
    */
    GetTimeAwardRemindPanel.prototype.getTimeAward = function (event) {
        SoundManager.playButtonEffect(event.target);
        PropertyManager.OpenGet();
        GamblingManager.timeAwardHandler.reqGetTimeAward(this.panelData.pattern);
        this.outAnime();
        qin.Tick.RemoveSecondsInvoke(this.countDown, this);
    };
    /**
     * 倒计时
    */
    GetTimeAwardRemindPanel.prototype.countDown = function () {
        this.countDownNum--;
        if (this.countDownNum <= 0) {
            qin.Tick.RemoveSecondsInvoke(this.countDown, this);
            qin.Tick.AddTimeoutInvoke(this.outAnime, 0.5, this);
        }
    };
    return GetTimeAwardRemindPanel;
}(BasePanel));
__reflect(GetTimeAwardRemindPanel.prototype, "GetTimeAwardRemindPanel");
//# sourceMappingURL=GetTimeAwardRemindPanel.js.map