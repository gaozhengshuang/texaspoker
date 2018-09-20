var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 绑定手机管理
*/
var BindPhoneManager = (function () {
    function BindPhoneManager() {
    }
    /**
     * 发送获取手机验证码请求
    */
    BindPhoneManager.reqGetCode = function (mno) {
        var callback = function (result) {
            BindPhoneManager.onGetCodeEvent.dispatch();
        };
        SocketManager.call(Command.PhoneCode_Req_3689, { mno: mno }, callback, null, this);
    };
    /**
     * 发送绑定手机请求
    */
    BindPhoneManager.reqBindPhone = function (mno, code) {
        var callback = function (result) {
            BindPhoneManager.onBindPhoneEvent.dispatch();
        };
        SocketManager.call(Command.PhoneBind_3688, { mno: mno, code: code }, callback, null, this);
    };
    /**
     * 获取手机验证码成功广播
    */
    BindPhoneManager.onGetCodeEvent = new qin.DelegateDispatcher();
    /**
     * 绑定手机成功广播
    */
    BindPhoneManager.onBindPhoneEvent = new qin.DelegateDispatcher();
    return BindPhoneManager;
}());
__reflect(BindPhoneManager.prototype, "BindPhoneManager");
//# sourceMappingURL=BindPhoneManager.js.map