/**
 *上局回顾管理器
*/
class GamblingReviewHandler
{
    public isNewRound: boolean;

    public lastRoundData: msg.RS2C_RetReviewInfo;
    /**
     * 发送获取上局回顾信息的请求
    */
    public reqReviewInfo(id: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            this.reset();
            this.lastRoundData = result.data;
            if (this.lastRoundData)
            {
                this.onReqReviewInfoEvent.dispatch();
            }
        };
        if (this.isNewRound)
        {
            MsgTransferSend.sendRoomProto(Command.C2RS_ReqReviewInfo, null, callback, null, this);
        }
    }
    /**
     * 重置数据
    */
    public reset()
    {
        this.lastRoundData = undefined;
        this.isNewRound = false;
    }
    /**
     * 请求牌局上局回顾信息成功广播
     */
    public onReqReviewInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
