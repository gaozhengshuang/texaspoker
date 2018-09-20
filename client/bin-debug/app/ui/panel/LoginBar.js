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
 * 账号信息条
 */
var LoginBar = (function (_super) {
    __extends(LoginBar, _super);
    function LoginBar() {
        var _this = _super.call(this) || this;
        _this.isTween = true;
        _this.setSkinName(UIModuleName.LoginBar);
        return _this;
    }
    LoginBar.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    LoginBar.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var loginInfo = appendData;
        if (loginInfo.ServerList != null && loginInfo.ServerList.length > 0) {
            //显示最后登录的服务器
            if (loginInfo.LastSId > 0) {
                for (var i = 0; i < loginInfo.ServerList.length; i++) {
                    var item = loginInfo.ServerList[i];
                    if (item.id == loginInfo.LastSId) {
                        this._serverInfo = item;
                        break;
                    }
                }
            }
            if (this._serverInfo == null) {
                // loginInfo.ServerList.Sort(LoginUtil.OnSortServerInfo);
                //显示没有维护的服务器
                for (var i = loginInfo.ServerList.length - 1; i >= 0; i--) {
                    var item = loginInfo.ServerList[i];
                    if (item.status != 1) {
                        this._serverInfo = item;
                        break;
                    }
                }
                //显示最后一台服务器
                if (this._serverInfo == null) {
                    this._serverInfo = loginInfo.ServerList[loginInfo.ServerList.length - 1];
                }
            }
        }
        //平台登录则是平台帐号id，qin登录特殊处理显示平台帐号名
        if (ChannelLoginType.IsViewAccount(ChannelManager.loginType)) {
            this.accountLabel.text = ChannelManager.loginType == ChannelLoginType.Qin ? AccountManager.account : LoginManager.account;
        }
    };
    LoginBar.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    LoginBar.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.switchAccountButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchClickHandler, this);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterClickHandler, this);
    };
    LoginBar.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.switchAccountButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.switchClickHandler, this);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterClickHandler, this);
    };
    LoginBar.prototype.switchClickHandler = function (event) {
        // if (PlatSettingDefined.GetInstance().isSwitchAccount || PlatSettingDefined.GetInstance().IsBuiltLogin(ChannelManager.channelType))
        // {
        //     UIManager.DispatchEvent(this, UIModuleEvent.OnChanged);
        // }
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginBar, UIModuleEvent.CHANGE);
    };
    LoginBar.prototype.enterClickHandler = function (event) {
        //  if (this._serverInfo != null)
        // {
        // if (ServerIsMaintain())
        // {
        //     UIManager.ShowFloatTips(LangDefined.GetText("服务器维护中！"));
        //     return;
        // }
        SoundManager.playButtonEffect(event.target);
        UIManager.dispatchEvent(UIModuleName.LoginBar, UIModuleEvent.COMPLETE, this._serverInfo);
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    return LoginBar;
}(BasePanel));
__reflect(LoginBar.prototype, "LoginBar");
//# sourceMappingURL=LoginBar.js.map