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
            if (result.data.Array)
            {
                game.ArrayUtil.Clear(HundredWarManager.panelHandler.hundredWarList);
                for (let requestInfo of result.data.Array)
                {
                    let info: HundredWarListInfo = new HundredWarListInfo();
                    info.copyValueFrom(requestInfo);
                    HundredWarManager.panelHandler.hundredWarList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarInfoEvent.dispatch();
        };
        SocketManager.call(Command.HWRoomInfo_Req_3692, null, callback, null, this);
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
            if (result.data && result.data["playerList"])
            {
                if (result.data["playerList"].length < count)
                {
                    isBottom = true;
                }
                game.ArrayUtil.Clear(HundredWarManager.panelHandler.hundredWarNoSeatList);
                for (let playerInfo of result.data["playerList"])
                {
                    if (!HundredWarManager.isSysBanker(playerInfo.roleId))
                    {
                        let info: SimpleUserInfo = new SimpleUserInfo();
                        info.copyValueFrom(playerInfo);
                        HundredWarManager.panelHandler.hundredWarNoSeatList.push(info);
                    }
                }
                if (result.data["total"])
                {
                    playerNum = result.data["total"];
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.dispatch({ isBottom: isBottom, userList: HundredWarManager.panelHandler.hundredWarNoSeatList, playerNum: playerNum });
        };
        SocketManager.call(Command.HWNoSeatInfo_Req_3696, { start: start, count: count }, callback, null, this);
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
            if (result.data["trendList"])
            {
                game.ArrayUtil.Clear(HundredWarManager.panelHandler.HundredWarTrendList);
                for (let trendInfo of result.data["trendList"])
                {
                    let info: number[] = Array<number>();
                    info.push(trendInfo["p1"]);
                    info.push(trendInfo["p2"]);
                    info.push(trendInfo["p3"]);
                    info.push(trendInfo["p4"]);
                    HundredWarManager.panelHandler.HundredWarTrendList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarTrendListEvent.dispatch();
        };
        SocketManager.call(Command.HWTrend_Req_3697, null, callback, null, this);
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
            if (result.data["bankerList"])
            {
                game.ArrayUtil.Clear(HundredWarManager.panelHandler.HundredWarBankerList);
                for (let bankerInfo of result.data["bankerList"])
                {
                    let info: SimpleUserInfo;
                    if (HundredWarManager.isSysBanker(bankerInfo.roleId))
                    {
                        info = new SimpleUserInfo(HundredWarManager.sysBanker);
                    }
                    else
                    {
                        info = new SimpleUserInfo()
                        info.copyValueFrom(bankerInfo);
                    }
                    HundredWarManager.panelHandler.HundredWarBankerList.push(info);
                }
            }
            HundredWarManager.panelHandler.OnGetHundredWarBankerListEvent.dispatch();
        };
        SocketManager.call(Command.HWbanker_Req_3698, null, callback, null, this);
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
        SocketManager.call(Command.HWKamisho_Req_3699, { gold: gold }, callback, null, this);
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
        SocketManager.call(Command.HWShimosho_Req_3700, null, callback, null, this);
    }
    /**
     * 是否在庄家列表
     */
    public isBankerList(): boolean
    {
        for (let info of HundredWarManager.panelHandler.HundredWarBankerList)
        {
            if (info.roleId == UserManager.userInfo.id)
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
            if (info.roleId == UserManager.userInfo.id)
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
            if (result.data)
            {
                HundredWarManager.panelHandler.lastPoolInfo.copyValueFrom(result.data);
            }
            HundredWarManager.panelHandler.OnGetHundredWarPoolInfoEvent.dispatch();
        }
        SocketManager.call(Command.HWPoolInfo_Req_3695, null, callback, null, this);
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