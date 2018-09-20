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
 * 计时奖励面板
*/
var TimeAwardPanel = (function (_super) {
    __extends(TimeAwardPanel, _super);
    function TimeAwardPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.TimeAwardPanel);
        return _this;
    }
    TimeAwardPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0.5;
        UIUtil.listRenderer(this.awardList, this.awardScroller, TimeAwardItemRenderer, ScrollViewDirection.Horizontal_L_R);
        this.awardScroller.scrollPolicyV = eui.ScrollPolicy.OFF;
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        UIManager.pushResizeGroup(this.anmGroup);
    };
    TimeAwardPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.pattern = appendData;
    };
    TimeAwardPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.setTimeAwardInfo();
        GamblingManager.timeAwardHandler.getTimeAward(this.pattern);
    };
    TimeAwardPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.addListener(this.onCloseBtnClickHandler, this);
        GamblingManager.timeAwardHandler.getTimeAwardEvent.addListener(this.setTimeAward, this);
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getTimeAward, this);
        GamblingManager.timeAwardHandler.BringTimeAwardEvent.addListener(this.setTimeAwardCanBring, this);
        GamblingManager.timeAwardHandler.TimeAwardCountDownEvent.addListener(this.refreshTime, this);
    };
    TimeAwardPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.removeListener(this.onCloseBtnClickHandler, this);
        GamblingManager.timeAwardHandler.getTimeAwardEvent.removeListener(this.setTimeAward, this);
        this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getTimeAward, this);
        GamblingManager.timeAwardHandler.BringTimeAwardEvent.removeListener(this.setTimeAwardCanBring, this);
        GamblingManager.timeAwardHandler.TimeAwardCountDownEvent.removeListener(this.refreshTime, this);
    };
    /**
     * 设置及时奖励数据
    */
    TimeAwardPanel.prototype.setTimeAwardInfo = function () {
        if (GamblingManager.timeAwardHandler.round == TimeAwardDefined.GetInstance().dataList.length) {
            this.getBtn.enabled = false;
            this.timeLabel.text = "距离下次领奖时间00:00";
            var name_1 = PlayingFieldManager.getPatternName(this.pattern);
            if (name_1) {
                this.desLabel.text = "您已领取" + name_1 + "全部计时奖励";
            }
            var item = void 0;
            for (var i = 0; i < this.awardList.numChildren; i++) {
                if (i < GamblingManager.timeAwardHandler.round) {
                    item = this.awardList.getChildAt(i);
                    item.flagImg.visible = true;
                    item.numLabel.textColor = ColorEnum.TimeAward_Finish_Yellow;
                }
            }
            return;
        }
        if (GamblingManager.timeAwardHandler.time) {
            this.getBtn.enabled = false;
            this.timeLabel.text = "距离下次领奖时间" + qin.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false);
        }
        else {
            this.getBtn.enabled = true;
            this.timeLabel.text = "距离下次领奖时间00:00";
        }
        var playInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
        if (playInfo) {
            var bankRoll = playInfo.bankRoll; //桌内的筹码             
            this.goldLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold + bankRoll);
        }
        else {
            this.goldLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
        }
        if (GamblingManager.timeAwardHandler.round != undefined) {
            var item = void 0;
            for (var i = 0; i < this.awardList.numChildren; i++) {
                if (i < GamblingManager.timeAwardHandler.round) {
                    item = this.awardList.getChildAt(i);
                    item.flagImg.visible = true;
                    item.numLabel.textColor = ColorEnum.TimeAward_Finish_Yellow;
                }
            }
            var name_2 = PlayingFieldManager.getPatternName(this.pattern);
            if (name_2) {
                var r = GamblingManager.timeAwardHandler.round + 1;
                this.desLabel.text = "您正在进行" + name_2 + "第" + r + "轮";
            }
        }
    };
    /**
     * 写入对应场次的计时奖励数据
    */
    TimeAwardPanel.prototype.setTimeAward = function () {
        this.awardList.dataProvider = new eui.ArrayCollection(GamblingManager.timeAwardHandler.timeAwardList);
    };
    /**
     * 领取奖励按钮点击事件
    */
    TimeAwardPanel.prototype.getTimeAward = function (event) {
        SoundManager.playButtonEffect(event.target);
        PropertyManager.OpenGet();
        GamblingManager.timeAwardHandler.reqGetTimeAward(this.pattern);
    };
    /**
     * 计时奖励可领取
    */
    TimeAwardPanel.prototype.setTimeAwardCanBring = function () {
        this.getBtn.enabled = true;
    };
    /**
     * 倒计时
    */
    TimeAwardPanel.prototype.refreshTime = function () {
        this.timeLabel.text = "距离下次领奖时间" + qin.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false);
    };
    return TimeAwardPanel;
}(BasePanel));
__reflect(TimeAwardPanel.prototype, "TimeAwardPanel");
//# sourceMappingURL=TimeAwardPanel.js.map