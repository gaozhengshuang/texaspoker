/**
 * 百人大战面板管理
*/
class HundredWarPanelHandler
{
    /**
     * 百人大战房间列表
    */
    public hundredWarList: Array<HundredWarListInfo>;
    /**
     * 无座玩家列表
     */
    public hundredWarNoSeatList: Array<SimpleUserInfo>;
    /**
     * 胜负走势列表
     */
    public HundredWarTrendList: Array<number[]>;
    /**
     * 庄家列表
     */
    public HundredWarBankerList: Array<SimpleUserInfo>;
    /**
     * 奖池信息
     */
    public lastPoolInfo: HundredWarlastPoolInfo;

    /**
     * 请求百人大战列表
    */
    public reqGetHundredWarInfo()
    {
        if (!HundredWarManager.panelHandler.hundredWarList)
        {
            HundredWarManager.panelHandler.hundredWarList = new Array<HundredWarListInfo>();
        }
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data:msg.GW2C_RetTFRoomList = result.data;
            if (data.array)
            {
                game.ArrayUtil.Clear(HundredWarManager.panelHandler.hundredWarList);
                for (let requestInfo of data.array)
                {
                    let info: HundredWarListInfo = new HundredWarListInfo();
                    info.copyValueFromIgnoreCase(requestInfo);
                    HundredWarManager.panelHandler.hundredWarList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarInfoEvent.dispatch();
        };
        SocketManager.call(Command.C2GW_ReqTFRoomList, {}, callback, null, this);
    }
    /**
     * 请求无座玩家列表
     */
    public reqHundredWarNoSeatInfo(start: number, count: number)
    {
        if (!HundredWarManager.panelHandler.hundredWarNoSeatList)
        {
            HundredWarManager.panelHandler.hundredWarNoSeatList = new Array<SimpleUserInfo>();
        }
        let callback: Function = function (result: game.SpRpcResult)
        {
            let isBottom: boolean = false;
            let playerNum: number;
            let data:msg.RS2C_RetTFStandPlayer = result.data;
            if (data && data.playerlist)
            {
                if (data.playerlist.length < count)
                {
                    isBottom = true;
                }
                game.ArrayUtil.Clear(HundredWarManager.panelHandler.hundredWarNoSeatList);
                for (let playerInfo of data.playerlist)
                {
                    if (!HundredWarManager.isSysBanker(game.longToNumber(playerInfo.roleid)))
                    {
                        let info: SimpleUserInfo = new SimpleUserInfo();
                        info.copyValueFromIgnoreCase(playerInfo);
                        HundredWarManager.panelHandler.hundredWarNoSeatList.push(info);
                    }
                }
                if (data.total)
                {
                    playerNum = data.total;
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.dispatch({ isBottom: isBottom, userList: HundredWarManager.panelHandler.hundredWarNoSeatList, playerNum: playerNum });
        };
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqTFStandPlayer, { start: start, count: count }, callback, null, this);
    }
    /**
     * 请求胜负走势列表
     */
    public reqHundredWarTrendList()
    {
        if (!HundredWarManager.panelHandler.HundredWarTrendList)
        {
            HundredWarManager.panelHandler.HundredWarTrendList = new Array<number[]>();
        }
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data:msg.RS2C_RetWinLoseTrend = result.data;
            
            if (data.trendlist)
            {
                game.ArrayUtil.Clear(HundredWarManager.panelHandler.HundredWarTrendList);
                for (let trendInfo of data.trendlist)
                {
                    let info: number[] = Array<number>();
                    info.push(trendInfo.p1);
                    info.push(trendInfo.p2);
                    info.push(trendInfo.p3);
                    info.push(trendInfo.p4);
                    HundredWarManager.panelHandler.HundredWarTrendList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarTrendListEvent.dispatch();
        };
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqWinLoseTrend, {}, callback, null, this);
    }

    /**
    * 请求庄家列表
    */
    public reqHundredWarBankerList()
    {
        if (!HundredWarManager.panelHandler.HundredWarBankerList)
        {
            HundredWarManager.panelHandler.HundredWarBankerList = new Array<SimpleUserInfo>();
        }
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data:msg.RS2C_RetTFBankerList = result.data;
            if (data.bankerlist)
            {
                game.ArrayUtil.Clear(HundredWarManager.panelHandler.HundredWarBankerList);
                for (let bankerInfo of data.bankerlist)
                {
                    let info: SimpleUserInfo;
                    if (HundredWarManager.isSysBanker(game.longToNumber(bankerInfo.roleid)))
                    {
                        info = new SimpleUserInfo(HundredWarManager.sysBanker);
                    }
                    else
                    {
                        info = new SimpleUserInfo()
                        info.copyValueFromIgnoreCase(bankerInfo);
                    }
                    HundredWarManager.panelHandler.HundredWarBankerList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarBankerListEvent.dispatch();
        };
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqTFBankerList, {}, callback, null, this);
    }
    /**
     * 请求上庄
     */
    public reqUpBanker(gold: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let info: SimpleUserInfo = new SimpleUserInfo();
            info.copyValueFromThis(UserManager.userInfo);
            info.gold = gold;
            HundredWarManager.panelHandler.HundredWarBankerList.push(info);
            HundredWarManager.panelHandler.onUpDownBankerEvent.dispatch(true);
        }
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqTFBecomeBanker, { gold: gold }, callback, null, this);
    }
    /**
     * 请求下庄
     */
    public reqDownBanker()
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            if (HundredWarManager.panelHandler.isBanker() && HundredWarManager.roomInfo.state != HWState.WaitNext)
            {
                AlertManager.showAlert("牌局正在进行中，本局结束后自动下庄！");
            }
            else
            {
                HundredWarManager.panelHandler.reqHundredWarBankerList();
                HundredWarManager.panelHandler.onUpDownBankerEvent.dispatch(false);
            }
        }
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqTFQuitBanker, {}, callback, null, this);
    }
    /**
     * 是否在庄家列表
     */
    public isBankerList(): boolean
    {
        for (let info of HundredWarManager.panelHandler.HundredWarBankerList)
        {
            if (info.roleId == UserManager.userInfo.roleId)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 是否为当前庄家
     */
    public isBanker(): boolean
    {
        for (let info of HundredWarManager.roomInfo.playerList)
        {
            if (info.roleId == UserManager.userInfo.roleId)
            {
                if (info.pos == 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        return false;
    }
    /**
     *请求奖池信息
     */
    public reqPoolInfo()
    {
        if (!HundredWarManager.panelHandler.lastPoolInfo)
        {
            HundredWarManager.panelHandler.lastPoolInfo = new HundredWarlastPoolInfo();
        }
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data:msg.RS2C_RetTFLastAwardPoolHit = result.data;
            if (data)
            {
                HundredWarManager.panelHandler.lastPoolInfo.copyValueFromIgnoreCase(data);
            }
            HundredWarManager.panelHandler.OnGetHundredWarPoolInfoEvent.dispatch();
        }
        MsgTransferSend.sendRoomProto(Command.C2RS_ReqTFLastAwardPoolHit, {}, callback, null, this);
    }
    /**
     * 上/下庄完成事件(true为上庄,false为下庄)
     */
    public onUpDownBankerEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
    * 获取百人大战广播事件
    */
    public OnGetHundredWarInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取无座玩家事件
     */
    public OnGetHundredWarNoSeatInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取胜负走势事件
     */
    public OnGetHundredWarTrendListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取庄家列表事件
     */
    public OnGetHundredWarBankerListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取奖池信息事件
     */
    public OnGetHundredWarPoolInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}