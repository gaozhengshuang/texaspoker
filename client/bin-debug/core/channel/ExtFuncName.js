var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExtFuncName = (function () {
    function ExtFuncName() {
    }
    /**
     * 应用返回，只有ios有
     */
    ExtFuncName.OnBackToApplication = "OnBackToApplication";
    ExtFuncName.OnApplicationFocus = "OnApplicationFocus";
    ExtFuncName.OpenURL = "OpenURL";
    //
    ExtFuncName.Initialize = "Initialize";
    ExtFuncName.Login = "Login";
    ExtFuncName.Logout = "Logout";
    ExtFuncName.Share = "Share";
    /**
     * 请求麦克风(提前弹出权限提示),并且返回是否有权限
     */
    ExtFuncName.RequestMicrophone = "RequestMicrophone";
    /**
     * 录音
     */
    ExtFuncName.RecordAudio = "RecordAudio";
    /**
     * 设置录音数据
     */
    ExtFuncName.SetRecordData = "SetRecordData";
    /**
     * 本地是否存在录音数据
     */
    ExtFuncName.HasRecordData = "HasRecordData";
    /**
     * 播放录音
     */
    ExtFuncName.PlayRecord = "PlayRecord";
    /**
     * 停止播放正在播放的录音
     */
    ExtFuncName.StopRecord = "StopRecord";
    //
    ExtFuncName.SetExtData = "SetExtData";
    ExtFuncName.SetChannelData = "SetChannelData";
    //pay
    ExtFuncName.Pay = "Pay";
    ExtFuncName.CheckUnFinishedPayList = "CheckUnFinishedPayList";
    ExtFuncName.DeleteOrder = "DeleteOrder";
    //头像上传
    ExtFuncName.ImageSelect = "ImageSelect";
    /**
     * 震动
     */
    ExtFuncName.Shake = "Shake";
    //talkingdata
    ExtFuncName.TDSetAccount = "TDSetAccount";
    ExtFuncName.TDSetAccountName = "TDSetAccountName";
    ExtFuncName.TDSetLevel = "TDSetLevel";
    ExtFuncName.TDOnItemPurchase = "TDOnItemPurchase";
    ExtFuncName.TDOnItemUse = "TDOnItemUse";
    ExtFuncName.TDOnVirtualCurrencyChargeRequest = "TDOnVirtualCurrencyChargeRequest";
    ExtFuncName.TDOnVirtualCurrencyChargeSuccess = "TDOnVirtualCurrencyChargeSuccess";
    //copy
    ExtFuncName.CopyToPastboard = "CopyToPastboard";
    return ExtFuncName;
}());
__reflect(ExtFuncName.prototype, "ExtFuncName");
//# sourceMappingURL=ExtFuncName.js.map