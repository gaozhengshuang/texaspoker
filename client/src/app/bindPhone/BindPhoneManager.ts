/**
 * 绑定手机管理
*/
class BindPhoneManager
{
    /**
     * 发送获取手机验证码请求
    */
    public static reqGetCode(mno: string)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            BindPhoneManager.onGetCodeEvent.dispatch();
        };
        SocketManager.call(Command.PhoneCode_Req_3689, { mno: mno }, callback, null, this);
    }
    /**
     * 发送绑定手机请求
    */
    public static reqBindPhone(mno: string, code: string)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            BindPhoneManager.onBindPhoneEvent.dispatch();
        };
        SocketManager.call(Command.PhoneBind_3688, { mno: mno, code: code }, callback, null, this);
    }

    /**
     * 获取手机验证码成功广播
    */
    public static onGetCodeEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 绑定手机成功广播
    */
    public static onBindPhoneEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}