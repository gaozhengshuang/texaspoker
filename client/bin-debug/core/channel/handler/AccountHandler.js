var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <summary>
/// qin自己内置的帐号系统处理
/// </summary>
var AccountHandler = (function () {
    function AccountHandler() {
    }
    AccountHandler.prototype.Login = function (isAutoLogin) {
        AccountManager.Initialize(GameSetting.AppId, ChannelManager.channelType, ChannelManager.deviceId, ProjectDefined.GetInstance().getValue(ProjectDefined.usePhone));
        this.RemoveQinEvents();
        AccountManager.OnLoginCancel.addListener(this.OnQinLoginCancel, this);
        AccountManager.OnLoginSuccess.addListener(this.OnQinLoginSuccess, this);
        AccountManager.ShowLogin(isAutoLogin);
    };
    AccountHandler.prototype.Logout = function () {
        AccountManager.Logout();
        ChannelManager.sdk_Logout();
    };
    AccountHandler.prototype.RemoveQinEvents = function () {
        AccountManager.OnLoginCancel.removeListener(this.OnQinLoginCancel, this);
        AccountManager.OnLoginSuccess.removeListener(this.OnQinLoginSuccess, this);
    };
    AccountHandler.prototype.OnQinLoginSuccess = function (data) {
        this.RemoveQinEvents();
        ChannelManager.OnTokenLoginSucceed.dispatch(data.token);
    };
    AccountHandler.prototype.OnQinLoginCancel = function () {
        this.RemoveQinEvents();
        ChannelManager.OnLoginFailed.dispatch();
    };
    return AccountHandler;
}());
__reflect(AccountHandler.prototype, "AccountHandler");
//# sourceMappingURL=AccountHandler.js.map