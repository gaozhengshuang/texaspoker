/**
 * 充值弹窗处理
 */
class BusinessChargeAlertHandler
{
    /**
     * 上次高级场破产时间
     */
    public data: msg.GW2C_RetBankruptInfo;

    /**
     * 拉取充值弹窗相关信息
     */
    public reqGetBankruptInfo()
    {
        let callBack: Function = function (result: game.SpRpcResult)
        {
            this.data = result.data;
            this.OnGetBankruptInfoEvent.dispatch();
        };
        SocketManager.call(Command.C2GW_ReqBankruptInfo, {}, callBack, null, this);
    }
    /**
     * 拉取充值弹窗相关信息事件
     */
    public OnGetBankruptInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}