/**
 * 充值弹窗处理
 */
class BusinessChargeAlertHandler
{
    /**
     * 上次高级场破产时间
     */
    public data: msg.GW2C_RetPayRecommend;

    /**
     * 拉取充值弹窗相关信息
     */
    public reqGetBankruptInfo(payType: ChargeAlertReqType)
    {
        let callBack: Function = function (result: game.SpRpcResult)
        {
            this.data = result.data;
            this.OnGetBankruptInfoEvent.dispatch();
        };
        SocketManager.call(Command.C2GW_ReqPayRecommend, { param: payType }, callBack, null, this);
    }
    /**
     * 拉取充值弹窗相关信息事件
     */
    public OnGetBankruptInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
/**
 * 充值弹窗请求类型
 */
enum ChargeAlertReqType
{
    /**
     * 高级破产补助
     */
    Bankrupt = 1,
    /**
     * 直通车
     */
    GoAheadCar = 2,
    /**
     * 重返巅峰 
     */
    ReturnPeakedness = 3,
}
/**
 * 充值弹窗返回类型，对应paybag表里的id
 */
enum ChargeAlertType
{
    /**
    * 高级破产补助
    */
    Bankrupt = 1,
    /**
     * 直通车1
     */
    GoAheadCar1 = 2,
    /**
     * 直通车2
     */
    GoAheadCar2 = 3,
    /**
     * 重返巅峰 
     */
    ReturnPeakedness = 4,
}