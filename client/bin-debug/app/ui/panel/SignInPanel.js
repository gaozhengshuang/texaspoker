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
 * 签到面板
 */
var SignInPanel = (function (_super) {
    __extends(SignInPanel, _super);
    function SignInPanel() {
        var _this = _super.call(this) || this;
        /**
         * 签到进度条单位
         */
        _this._processUnit = 82;
        /**
         * 进度条偏移量
         */
        _this._processOffset = 19;
        _this.setSkinName(UIModuleName.SignInPanel);
        return _this;
    }
    SignInPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.processScroller.viewport = this.processGroup;
        UIUtil.listRenderer(this.signInList, this.signIn_scroller, SignInGoldItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, false);
    };
    SignInPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.setDaysPrize(SignInDay.SignInThree, this.threeDayLabel, this.signImg3);
        this.setDaysPrize(SignInDay.SignInFive, this.fiveDayLabel, this.signImg5);
        this.setDaysPrize(SignInDay.SignInSeven, this.sevenDayLabel, this.signImg7);
        this.refreshUI();
    };
    /**
     * 设置累计签到奖励
     */
    SignInPanel.prototype.setDaysPrize = function (day, prizeLabel, prizeIcon) {
        var signinDef = SignInDefined.GetInstance().getDefinitionbySubId(day);
        if (signinDef) {
            var awardDef = AwardDefined.GetInstance().getDefinition(signinDef.pilePrize);
            if (awardDef && awardDef.rewardList) {
                prizeLabel.text = ActivityManager.signInHandler.getAwardDes(awardDef);
                var itemDef = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id);
                if (itemDef) {
                    prizeIcon.source = itemDef.icon + ResSuffixName.PNG;
                }
            }
        }
    };
    SignInPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.signInBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        ActivityManager.signInHandler.signInCompleteEvent.addListener(this.onSignInResult, this);
    };
    SignInPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.signInBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        ActivityManager.signInHandler.signInCompleteEvent.removeListener(this.onSignInResult, this);
    };
    /**
     * 点击签到
    */
    SignInPanel.prototype.onClickHandler = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        ActivityManager.signInHandler.reqSignIn(this.activityInfo.id, this.activityInfo.step);
    };
    /**
     * 签到成功刷新信息
     */
    SignInPanel.prototype.onSignInResult = function () {
        this.refreshUI();
        this.onCloseBtnClickHandler(null);
    };
    SignInPanel.prototype.onCloseBtnClickHandler = function (event) {
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    /**
     * 刷新签到信息
    */
    SignInPanel.prototype.refreshUI = function () {
        if (ActivityManager.signInHandler.isSignToday(this.activityInfo.id)) {
            this.signInBtn.visible = false;
            this.haveSignedImg.visible = true;
        }
        else {
            this.signInBtn.visible = true;
            this.haveSignedImg.visible = false;
        }
        if (this.activityInfo.step == 0) {
            this.processScroller.width = 0;
        }
        else {
            this.processScroller.width = this._processUnit * (this.activityInfo.step - 1) + this._processOffset;
        }
        UIUtil.writeListInfo(this.signInList, this.activityInfo.subList, "subId");
    };
    return SignInPanel;
}(BaseActivityPanel));
__reflect(SignInPanel.prototype, "SignInPanel");
//# sourceMappingURL=SignInPanel.js.map