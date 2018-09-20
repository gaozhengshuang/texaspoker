/**
 * 保险箱管理
*/
class SafeBoxManager
{
    public static readonly pwdSuccessEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    public static readonly modifyPwdEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    public static readonly saveWithdrawEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     *  请求存取金币
    */
    public static reqSaveWithdrawGold(num: number, type: number, pwd?: string)
    {
        let successCallBack: Function = function (result: game.SpRpcResult)
        {
            if (type == SafeBoxOperateType.Save)
            {
                UIManager.showFloatTips("存入成功");
            }
            else if (type == SafeBoxOperateType.Withdraw)
            {
                UIManager.showFloatTips("取出成功");
            }
            SafeBoxManager.saveWithdrawEvent.dispatch(type);
        }
        let errorCallBack: Function = function (result: game.SpRpcResult)
        {
            if (result.error == 3004)
            {
                AlertManager.showAlert("您输入的密码错误，请重新输入！");
            }
        }
        SocketManager.call(Command.Req_saveORwithdraw_3014, { num: num, type: type, pwd: pwd }, successCallBack, errorCallBack, this);
    }
    /**
     *  请求创建密码
    */
    public static reqCreatePwd(newPwd: string)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            UserManager.userInfo.isSafePwd = true;
            SafeBoxManager.pwdSuccessEvent.dispatch();//协议发送后抛出存取完事件       
        }
        SocketManager.call(Command.Req_safePwd_3017, { "newPwd": newPwd }, callback, null, this);
    }
    /**
     *  请求修改密码
    */
    public static reqModifyPwd(newPwd: string, oldPwd: string)
    {
        let successCallBack: Function = function (result: game.SpRpcResult)
        {
            SafeBoxManager.modifyPwdEvent.dispatch();//协议发送后抛出存取完事件       
        }
        let errorCallBack: Function = function (result: game.SpRpcResult)
        {
            if (result.error == 3001)
            {
                AlertManager.showAlert("您的原密码不正确！");
            }
        }
        SocketManager.call(Command.Req_safePwd_3017, { "newPwd": newPwd, "oldPwd": oldPwd }, successCallBack, errorCallBack, this);
    }
    /**
     * 找回密码请求获取手机验证码
    */
    public static reqGetCode(mno: string)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            SafeBoxManager.onGetCodeEvent.dispatch();
        };
        SocketManager.call(Command.PhoneCode_Req_3689, { mno: mno }, callback, null, this);
    }
    /**
     * 请求找回密码
     */
    public static reqRetrievePwd(newPwd: string, code: string)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            SafeBoxManager.onRetrievePwdEvent.dispatch();
        };
        SocketManager.call(Command.Req_safePwd_3017, { newPwd: newPwd, code: code }, callback, null, this);
    }

    /**
    * 获取手机验证码成功广播
   */
    public static readonly onGetCodeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
    *找回密码成功广播
   */
    public static readonly onRetrievePwdEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}