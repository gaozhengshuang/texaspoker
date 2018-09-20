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
 * 登录界面
 */
var LoginPanel = (function (_super) {
    __extends(LoginPanel, _super);
    function LoginPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.LoginPanel);
        return _this;
    }
    LoginPanel.prototype.onAwake = function (event) {
        this.isTween = false;
        _super.prototype.onAwake.call(this, event);
        this.logoImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Logo_png);
    };
    LoginPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var loginTypeList = ChannelLoginType.GetChannelLoginList(OperatePlatform.getCurrent(), ChannelManager.channelType, VersionManager.isServerTest, VersionManager.isSafe);
        this.agreeCheckBox.selected = true;
        GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
        this.guestLoginBtn.visible = false;
        this.intranetAccountBtn.visible = false;
        this.weixinLoginBtn.visible = false;
        this.accountBtn.visible = false;
        this.intranetGuestBtn.visible = false;
        this.telLoginBtn.visible = false;
        for (var _i = 0, loginTypeList_1 = loginTypeList; _i < loginTypeList_1.length; _i++) {
            var val = loginTypeList_1[_i];
            if (val == ChannelLoginType.Qin) {
                this.telLoginBtn.visible = true;
                this.telLoginBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.Guest) {
                this.guestLoginBtn.visible = true;
                this.guestLoginBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.IntranetAccount) {
                this.intranetAccountBtn.visible = true;
                this.intranetAccountBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.Weixin) {
                this.weixinLoginBtn.visible = true;
                this.weixinLoginBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.Account) {
                this.accountBtn.visible = true;
                this.accountBtn.includeInLayout = true;
            }
            else if (val == ChannelLoginType.IntranetGuest) {
                this.intranetGuestBtn.visible = true;
                this.intranetGuestBtn.includeInLayout = true;
            }
        }
        this.versionLabel.text = VersionManager.getVersionStr();
    };
    LoginPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.weixinLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.weixinClickHandler, this);
        this.guestLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.guestLoginClickHandler, this);
        this.intranetAccountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetAccountClickHandler, this);
        this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.userBtnClickHandler, this);
        this.accountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.accountBtnClickHandler, this);
        this.intranetGuestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetGuestBtnClickHandler, this);
        this.telLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.telAccountBtnClickHandler, this);
        this.agreeCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeCheckBoxClickHandler, this);
        UIManager.addEventListener(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE, this.outAngree, this);
    };
    LoginPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.weixinLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.weixinClickHandler, this);
        this.guestLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.guestLoginClickHandler, this);
        this.intranetAccountBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetAccountClickHandler, this);
        this.userBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.userBtnClickHandler, this);
        this.accountBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.accountBtnClickHandler, this);
        this.intranetGuestBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.intranetGuestBtnClickHandler, this);
        this.telLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.telAccountBtnClickHandler, this);
        this.agreeCheckBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeCheckBoxClickHandler, this);
        UIManager.removeEventListener(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE, this.outAngree, this);
    };
    LoginPanel.prototype.guestLoginClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Guest);
    };
    LoginPanel.prototype.accountBtnClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Account);
    };
    LoginPanel.prototype.intranetGuestBtnClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.IntranetGuest);
    };
    LoginPanel.prototype.telAccountBtnClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.isAgreeUserAgreement()) {
            UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Qin);
        }
    };
    LoginPanel.prototype.intranetAccountClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.IntranetAccount);
    };
    LoginPanel.prototype.weixinClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.isAgreeUserAgreement()) {
            if (qin.System.isWeb || ChannelManager.hasWeixin) {
                UIManager.dispatchEvent(UIModuleName.LoginPanel, UIModuleEvent.COMPLETE, ChannelLoginType.Weixin);
            }
            else {
                UIManager.showFloatTips("请安装微信后重启本游戏！");
            }
        }
    };
    LoginPanel.prototype.userBtnClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        UIManager.showPanel(UIModuleName.UserAngreementPanel);
    };
    /**
     * 是否同意了用户协议
    */
    LoginPanel.prototype.isAgreeUserAgreement = function () {
        if (GameSetting.IsAgreeUserAgreement) {
            return true;
        }
        else {
            UIManager.showFloatTips("用户必须同意用户协议才可进行登录！");
            return false;
        }
    };
    LoginPanel.prototype.agreeCheckBoxClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
    };
    LoginPanel.prototype.outAngree = function () {
        this.agreeCheckBox.selected = true;
        GameSetting.IsAgreeUserAgreement = this.agreeCheckBox.selected;
    };
    return LoginPanel;
}(BasePanel));
__reflect(LoginPanel.prototype, "LoginPanel");
//# sourceMappingURL=LoginPanel.js.map