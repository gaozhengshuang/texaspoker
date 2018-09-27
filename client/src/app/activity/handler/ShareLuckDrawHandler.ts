/**
 * 分享抽奖管理
 */
class ShareLuckDrawHandler extends BaseActivitySubHandler<any>
{
    public initialize(info: ActivityInfo)
    {
        super.initialize(info);
        let def: ActivityShareDefintion;
        let pInfo: ShareLuckDrawInfo;
        // for (let i: number = 0; i < ActivityShareDefined.GetInstance().dataList.length; i++) //填充子列表信息 move todo
        // {
        //     def = ActivityShareDefined.GetInstance().dataList[i];
        //     pInfo = this.addSubInfo(info, ShareLuckDrawInfo, def);
        // };
    }

    /**
     * 分享成功
    */
    public reqShareSuccess(type: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            ActivityManager.shareLuckDrawHandler.OnShareSuccessEvent.dispatch();
        }
        SocketManager.call(Command.ShareSuccess_Req_3715, { type: type }, callback, null, this);
    }

    /**
     * 请求增加分享成功次数成功
    */
    public OnShareSuccessEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}