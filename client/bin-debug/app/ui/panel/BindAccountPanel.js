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
 * 绑定账号面板
 */
var BindAccountPanel = (function (_super) {
    __extends(BindAccountPanel, _super);
    function BindAccountPanel() {
        var _this = _super.call(this) || this;
        _this.isTween = true;
        _this.setSkinName(UIModuleName.BindAccountPanel);
        return _this;
    }
    BindAccountPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.wxImg.visible = this.bindWXBtn.visible = this.bindPhoneBtn.visible = this.phoneImg.visible = false;
    };
    BindAccountPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.userHeadCom.init(UserManager.userInfo, 110);
        this.nameLabel.text = UserManager.userInfo.name;
        this.idLabel.text = UserManager.userInfo.roleId.toString();
        VersionManager.setComponentVisibleBySafe(this.wxGroup);
        BindAccountManager.reqGetList();
    };
    BindAccountPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    BindAccountPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        BindAccountManager.bindListEvent.addListener(this.bindListHandler, this);
        BindAccountManager.bindSuccessEvent.addListener(this.bindSuccessHandler, this);
        this.bindPhoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bindPhoneHandler, this);
        this.bindWXBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bindWXHandler, this);
    };
    BindAccountPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        BindAccountManager.bindListEvent.removeListener(this.bindListHandler, this);
        BindAccountManager.bindSuccessEvent.removeListener(this.bindSuccessHandler, this);
        this.bindPhoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bindPhoneHandler, this);
        this.bindWXBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bindWXHandler, this);
    };
    BindAccountPanel.prototype.bindListHandler = function () {
        this.refreshQinBindState();
        this.refreshWxBindState();
    };
    BindAccountPanel.prototype.refreshQinBindState = function () {
        //手机账号绑定
        if (BindAccountManager.getIsBinding(ChannelLoginType.Qin) || ChannelManager.loginType == ChannelLoginType.Qin) {
            this.bindPhoneBtn.visible = false;
            this.phoneImg.visible = true;
            this.phoneNumLabel.text = "已绑定";
            // this.phoneNumLabel.text = this.phoneNumFormat(4, 9, UserManager.userInfo.mno);
        }
        else {
            this.bindPhoneBtn.visible = true;
            this.phoneImg.visible = false;
            this.phoneNumLabel.text = "未绑定";
        }
    };
    BindAccountPanel.prototype.refreshWxBindState = function () {
        //微信绑定
        if (BindAccountManager.getIsBinding(ChannelLoginType.Weixin) || ChannelManager.loginType == ChannelLoginType.Weixin) {
            this.bindWXBtn.visible = false;
            this.wxImg.visible = true;
            this.wxNameLabel.text = "已绑定";
        }
        else {
            if (qin.System.isWeChat) {
                this.bindWXBtn.enabled = true;
            }
            else if (qin.System.isWeb) {
                this.bindWXBtn.enabled = false;
            }
            else {
                this.bindWXBtn.enabled = true;
            }
            this.bindWXBtn.visible = true;
            this.wxImg.visible = false;
            this.wxNameLabel.text = "未绑定";
        }
    };
    /**
     * 绑定成功处理
     */
    BindAccountPanel.prototype.bindSuccessHandler = function (data) {
        switch (data) {
            case ChannelLoginType.Qin:
                this.refreshQinBindState();
                break;
            case ChannelLoginType.Weixin:
                this.refreshWxBindState();
                break;
        }
    };
    /**
     * 点击绑定手机
    */
    BindAccountPanel.prototype.bindPhoneHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (!BindAccountManager.getIsBinding(ChannelLoginType.Qin)) {
            BindAccountManager.startBindQin(UIModuleName.BindAccountPanel);
        }
    };
    /**
     * 点击绑定微信
    */
    BindAccountPanel.prototype.bindWXHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (!BindAccountManager.getIsBinding(ChannelLoginType.Weixin)) {
            BindAccountManager.tryBindWx();
        }
    };
    return BindAccountPanel;
}(BasePanel));
__reflect(BindAccountPanel.prototype, "BindAccountPanel");
//# sourceMappingURL=BindAccountPanel.js.map