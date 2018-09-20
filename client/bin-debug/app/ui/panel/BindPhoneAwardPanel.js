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
 * 绑定手机奖励面板
*/
var BindPhoneAwardPanel = (function (_super) {
    __extends(BindPhoneAwardPanel, _super);
    function BindPhoneAwardPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.BindPhoneAwardPanel);
        return _this;
    }
    BindPhoneAwardPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.list, this.scroller, BindPhoneAwardItemRenderer, ScrollViewDirection.Horizontal_L_R, eui.ScrollPolicy.AUTO, null, true);
        this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
    };
    BindPhoneAwardPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        BindAccountManager.reqGetList();
        this.setAwardInfo();
        this.rendererListInfo();
    };
    BindPhoneAwardPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    BindPhoneAwardPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.goToBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goToBind, this);
        this.bringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bringAward, this);
        BindAccountManager.bindListEvent.addListener(this.refreshQinBindState, this);
        ActivityManager.bindPhoneAwardHandler.bringSuccessEvent.addListener(this.bringSuccess, this);
        BindAccountManager.bindSuccessEvent.addListener(this.bindSuccess, this);
    };
    BindPhoneAwardPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.goToBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goToBind, this);
        this.bringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bringAward, this);
        BindAccountManager.bindListEvent.removeListener(this.refreshQinBindState, this);
        ActivityManager.bindPhoneAwardHandler.bringSuccessEvent.removeListener(this.bringSuccess, this);
        BindAccountManager.bindSuccessEvent.removeListener(this.bindSuccess, this);
    };
    BindPhoneAwardPanel.prototype.refreshQinBindState = function () {
        //手机账号绑定
        if (BindAccountManager.getIsBinding(ChannelLoginType.Qin)) {
            this.goToBtn.visible = false;
            this.bringBtn.visible = true;
        }
        else {
            this.goToBtn.visible = true;
            this.bringBtn.visible = false;
        }
    };
    /**
     * 跳到绑定界面
    */
    BindPhoneAwardPanel.prototype.goToBind = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        BindAccountManager.startBindQin(UIModuleName.BindPhoneAwardPanel);
    };
    /**
     * 绑定成功
    */
    BindPhoneAwardPanel.prototype.bindSuccess = function (data) {
        if (data == ChannelLoginType.Qin) {
            this.goToBtn.visible = false;
            this.bringBtn.visible = true;
        }
    };
    /**
     * 领取奖励
    */
    BindPhoneAwardPanel.prototype.bringAward = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        var subInfo = this.activityInfo.subList[0];
        ActivityManager.ReqGetActivityAward(subInfo.id, subInfo.subId);
    };
    /**
     * 领取成功
    */
    BindPhoneAwardPanel.prototype.bringSuccess = function (id) {
        if (this.activityInfo.id == id) {
            _super.prototype.onCloseBtnClickHandler.call(this, null);
        }
    };
    /**
     * 设置奖励数据
    */
    BindPhoneAwardPanel.prototype.setAwardInfo = function () {
        if (InfoUtil.checkAvailable(this.activityInfo)) {
            var phoneDef = this.activityInfo.subList[0].definition;
            if (phoneDef) {
                var awardDef = AwardDefined.GetInstance().getDefinition(phoneDef.awardId);
                if (awardDef) {
                    this._awardList = awardDef.rewardList;
                }
            }
        }
    };
    /**
     * 渲染列表项
    */
    BindPhoneAwardPanel.prototype.rendererListInfo = function () {
        UIUtil.writeListInfo(this.list, this._awardList, null);
    };
    return BindPhoneAwardPanel;
}(BaseActivityPanel));
__reflect(BindPhoneAwardPanel.prototype, "BindPhoneAwardPanel");
//# sourceMappingURL=BindPhoneAwardPanel.js.map