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
var Channel_android = (function (_super) {
    __extends(Channel_android, _super);
    function Channel_android() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Channel_android.prototype.Login = function (loginType, isAutoLogin) {
        if (loginType == ChannelLoginType.Weixin) {
            //微信登录
            if (isAutoLogin) {
                var token = PrefsManager.getLoginToken();
                if (token) {
                    ChannelManager.OnTokenLoginSucceed.dispatch(WxAuthorizeType.App + '###2###' + token);
                    return;
                }
            }
            egret.ExternalInterface.call(ExtFuncName.Login, loginType);
        }
        else if (loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount) {
            this.accountLogin(isAutoLogin);
        }
    };
    Channel_android.prototype.accountLogin = function (isAutoLogin) {
        var account = PrefsManager.getValue(PrefsManager.Login_Account);
        var password = PrefsManager.getValue(PrefsManager.Login_Password);
        if (isAutoLogin && account && password) {
            ChannelManager.DispatchAccountLoginSucceed(account, password);
        }
        else {
            if (!UIManager.isShowPanel(UIModuleName.LoginLocalPanel)) {
                UIManager.showPanel(UIModuleName.LoginLocalPanel);
            }
        }
    };
    Channel_android.prototype.PaySend = function (payState, awardId, serverId, orderId, price, productName) {
        ChannelUtil.openWebPay(serverId, orderId, price, productName, awardId);
    };
    Channel_android.prototype.share = function (type, title, message, inviteCode) {
        var data = {};
        data['type'] = type;
        data['title'] = title;
        data['message'] = message;
        data['url'] = ProjectDefined.GetInstance().getShareWebUrl(GameSetting.AppId, inviteCode);
        egret.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
    };
    Channel_android.prototype.imageSelect = function (size, quality) {
        var obj = { size: size, quality: quality };
        egret.ExternalInterface.call(ExtFuncName.ImageSelect, JSON.stringify(obj));
    };
    Channel_android.prototype.openURL = function (url) {
        egret.ExternalInterface.call(ExtFuncName.OpenURL, url);
    };
    Channel_android.prototype.copyToPastboard = function (data) {
        egret.ExternalInterface.call(ExtFuncName.CopyToPastboard, data);
    };
    return Channel_android;
}(ChannelBase));
__reflect(Channel_android.prototype, "Channel_android");
//# sourceMappingURL=Channel_android.js.map