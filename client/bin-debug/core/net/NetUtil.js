var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NetUtil = (function () {
    function NetUtil() {
    }
    //------------------------------------------------------------------
    // alert
    //------------------------------------------------------------------
    NetUtil.AlertResultError = function (result, OnConfirm) {
        if (OnConfirm === void 0) { OnConfirm = null; }
        var alertInfo = new AlertInfo();
        alertInfo.subTitle = qin.StringUtil.format("protocol:{0} code:{1}", result.cmdId, result.error);
        alertInfo.message = ErrorDefined.GetInstance().getDetails(result.error);
        alertInfo.OnConfirm = OnConfirm;
        AlertManager.showAlertInfo(alertInfo);
    };
    NetUtil.AlertFailing = function (errorCode, OnReLogin) {
        var alertInfo = new AlertInfo();
        alertInfo.title = "连接失败";
        alertInfo.confirmLabel = "重新登录";
        alertInfo.subTitle = errorCode;
        alertInfo.message = "登录验证失效或网络连接断开，点击确认重新登录游戏！";
        alertInfo.OnConfirm = OnReLogin;
        AlertManager.showAlertInfo(alertInfo);
    };
    NetUtil.AlertNetworkErrorReLogin = function (errorCode, OnReLogin) {
        var alertInfo = new AlertInfo();
        alertInfo.title = "网络断开";
        alertInfo.confirmLabel = "重新登录";
        alertInfo.subTitle = errorCode;
        alertInfo.message = "登录验证已失效，点击确认重新登录游戏！";
        alertInfo.OnConfirm = OnReLogin;
        AlertManager.showAlertInfo(alertInfo);
    };
    /**
     * socket 连接失败 网络错误，或服务器主动断开
     */
    NetUtil.AlertConnectError = function (errorCode, OnReconnect, title, message) {
        if (title === void 0) { title = "网络断开"; }
        if (message === void 0) { message = "网络连接断开，请检查您的网络是否正常，点击确认重试！"; }
        var alertInfo = new AlertInfo();
        alertInfo.title = title;
        alertInfo.subTitle = errorCode;
        alertInfo.confirmLabel = "重连";
        alertInfo.message = message;
        alertInfo.OnConfirm = OnReconnect;
        AlertManager.showAlertInfo(alertInfo);
    };
    NetUtil.AlertHandshakeError = function (errorCode, OnReconnect) {
        var alertInfo = new AlertInfo();
        alertInfo.title = "验证错误";
        alertInfo.subTitle = errorCode;
        var error = parseInt(errorCode);
        if (error != 0) {
            alertInfo.message = ErrorDefined.GetInstance().getDetails(error);
        }
        else {
            alertInfo.message = "连接服务器验证错误";
        }
        alertInfo.confirmLabel = "重连";
        alertInfo.OnConfirm = OnReconnect;
        AlertManager.showAlertInfo(alertInfo);
    };
    return NetUtil;
}());
__reflect(NetUtil.prototype, "NetUtil");
//# sourceMappingURL=NetUtil.js.map