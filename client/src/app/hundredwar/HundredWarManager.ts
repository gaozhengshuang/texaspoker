/**
 * 百人大战玩法管理
*/
class HundredWarManager
{

    public static panelHandler: HundredWarPanelHandler = new HundredWarPanelHandler();
    /**
	 * 房间信息
	 */
    public static roomInfo: HWRoomInfo;
    /**
     * 下一次注的金币数
    */
    public static oneBetGold: number;
    /**
     * 结算信息
    */
    public static hundredWarOverInfo: HundredWarOverInfo;
    /**
	 * 自己的信息
	 */
    private static _self: HWHundredWarRoomPlayerInfo;
    public static get self(): HWHundredWarRoomPlayerInfo
    {
        HundredWarManager._self = HundredWarManager.getPlayerInfo(UserManager.userInfo.roleId);
        return HundredWarManager._self;
    }
    private static _isInitialize: boolean = false;
    private static _isHadLeave: boolean;

    public static addPushListener()
    {
        SocketManager.AddCommandListener(Command.HWSeatChange_Push_2127, HundredWarManager.onPosChange, this);
        SocketManager.AddCommandListener(Command.HWBetChange_Push_2123, HundredWarManager.onBetChange, this);
        SocketManager.AddCommandListener(Command.HWStateChange_Push_2126, HundredWarManager.onRoomStateChange, this);
        SocketManager.AddCommandListener(Command.HWCards_Push_2124, HundredWarManager.onCardPush, this);
        SocketManager.AddCommandListener(Command.OutRoom_Push_2128, HundredWarManager.onOutRoomPush, this);

        // SocketManager.AddIgnoreError(ErrorCode.HundredWarOverFlow); //move todo
    }

    public static removePushListener()
    {
        SocketManager.RemoveCommandListener(Command.HWSeatChange_Push_2127, HundredWarManager.onPosChange, this);
        SocketManager.RemoveCommandListener(Command.HWBetChange_Push_2123, HundredWarManager.onBetChange, this);
        SocketManager.RemoveCommandListener(Command.HWStateChange_Push_2126, HundredWarManager.onRoomStateChange, this);
        SocketManager.RemoveCommandListener(Command.HWCards_Push_2124, HundredWarManager.onCardPush, this);
        SocketManager.RemoveCommandListener(Command.OutRoom_Push_2128, HundredWarManager.onOutRoomPush, this);

        // SocketManager.RemoveIgnoreError(ErrorCode.HundredWarOverFlow); //move todo
        HundredWarManager.onBankerChangeEvent.removeListener(HundredWarManager.onBankerChange, this);
    }

    /**
     * 离开房间清空数据
    */
    public static leaveClear()
    {
        HundredWarManager.roomInfo = undefined;
        HundredWarManager.hundredWarOverInfo = undefined;
        HundredWarManager._self = undefined;
    }
    /**
     * 一轮结束清除数据
    */
    public static roundOverClear()
    {
        if (HundredWarManager.roomInfo)
        {
            for (let betInfo of HundredWarManager.roomInfo.betList)
            {
                betInfo.bet = 0;
                betInfo.myBet = 0;
            }
        }
    }
    public static resetByReLogin()
    {
        HundredWarManager._isInitialize = false;
    }
    /**
     * 发送请求进入房间
    */
    public static reqEnterRoom(id: number = 0)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            if (result.data)
            {
                if (!HundredWarManager._isInitialize)
                {
                    HundredWarManager._isInitialize = true;
                    HundredWarManager.OnGetRoomInfoEvent.addListener(HundredWarManager.onFirstEnterRoom, this);
                    HundredWarManager.addPushListener();
                }
                SocketManager.RemoveCommandListener(Command.EnterHW_Req_3693, callback, this);
                HundredWarManager.roomInfo = new HWRoomInfo();
                HundredWarManager.roomInfo.copyValueFrom(result.data);
                if (result.data.playerList) 
                {
                    UserManager.OnGetSimpleUserInfoEvent.addListener(HundredWarManager.onReqComplete, this);
                    HundredWarManager.roomInfo.playerList = new Array<HWHundredWarRoomPlayerInfo>();
                    let info: HWHundredWarRoomPlayerInfo;
                    for (let i: number = 0; i < result.data.playerList.length; i++)
                    {
                        let playerInfo: HWHundredWarRoomPlayerInfo = result.data.playerList[i];
                        info = new HWHundredWarRoomPlayerInfo();
                        info.copyValueFrom(playerInfo);
                        HundredWarManager.roomInfo.playerList.push(info);
                    }
                    HundredWarManager.startReqPlayerInfo(HundredWarManager.roomInfo.playerList);
                }
                if (result.data.myBet && result.data.myBet.length > 0)       //为注池信息写入自己的下注的注数         
                {
                    if (result.data.betList && result.data.betList.length > 0) 
                    {
                        HundredWarManager.roomInfo.betList = new Array<HWBetPotInfo>();
                        for (let betInfo of result.data.betList)
                        {
                            betInfo.myBet = result.data.myBet[betInfo.pos]; //move todo result.data.myBet[betInfo.pos - 1];
                            HundredWarManager.roomInfo.betList.push(betInfo);
                        }
                    }
                }
                HundredWarManager._isHadLeave = false;
                HundredWarManager.OnGetRoomInfoEvent.dispatch();
            }
            HundredWarManager.onBankerChangeEvent.addListener(HundredWarManager.onBankerChange, this);
        };
        SocketManager.AddCommandListener(Command.EnterHW_Req_3693, callback, this);
        if (id > 0)
        {
            SocketManager.Send(Command.EnterHW_Req_3693, { id: id });
        }
        else
        {
            SocketManager.Send(Command.EnterHW_Req_3693);
        }
    }

    /**
     * 坐下玩家信息请求队列
     */
    private static _reqPlayerInfoListClone: HWHundredWarRoomPlayerInfo[];
    public static get reqPlayerInfoListClone(): HWHundredWarRoomPlayerInfo[]
    {
        return HundredWarManager._reqPlayerInfoListClone;
    }
    /**
     * 开始请求
     */
    public static startReqPlayerInfo(list: HWHundredWarRoomPlayerInfo[])
    {
        HundredWarManager._reqPlayerInfoListClone = HundredWarManager.roomInfo.playerList.concat();
        let info: HWHundredWarRoomPlayerInfo;
        for (let i: number = 0; i < HundredWarManager._reqPlayerInfoListClone.length; i++)
        {
            info = HundredWarManager._reqPlayerInfoListClone[i];
            if (HundredWarManager.isSysBanker(info.roleId))
            {
                HundredWarManager._reqPlayerInfoListClone.splice(i, 1);
                break;
            }
        }
        HundredWarManager.nextReq();
    }
    /**
     * 请求下一个
     */
    public static nextReq()
    {
        if (this._reqPlayerInfoListClone.length > 0)
        {
            let playerInfo: any = this._reqPlayerInfoListClone.shift();
            if (HundredWarManager.isSysBanker(playerInfo.roleId))
            {
                this.onReqComplete(null);
            }
            else
            {
                UserManager.reqSimpleUserInfo(playerInfo.roleId);
            }
        }
    }
    /**
     * 请求完成
     */
    private static onReqComplete(data: any)
    {
        if (data)
        {
            HundredWarManager.getetRoomInfoOver(data);
        }
        HundredWarManager.nextReq();
    }
    /**
     * 庄家变更
     */
    public static onBankerChange(data: any)
    {
        if (data)
        {
            if (data.beforeId == UserManager.userInfo.roleId) //自动下庄
            {
                for (let i: number = 0; i < HundredWarManager.panelHandler.HundredWarBankerList.length; i++)
                {
                    if (HundredWarManager.panelHandler.HundredWarBankerList[i].roleId == data.beforeId)
                    {
                        HundredWarManager.panelHandler.HundredWarBankerList.splice(i, 1);
                        break;
                    }
                }
                HundredWarManager.panelHandler.onUpDownBankerEvent.dispatch(false);
            }
        }
    }

    /**
     * 进入房间后拉取完用户信息
    */
    private static getetRoomInfoOver(data: any)
    {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList)
        {
            HundredWarManager.getPlayerInfoSuccess(data);
            let banker: HWHundredWarRoomPlayerInfo = HundredWarManager.getPlayerInfoByPos(0);  //进入房间时写入庄家坐庄带入的金币
            if (banker)
            {
                if (HundredWarManager.isSysBanker(banker.roleId))
                {
                    banker.gold = HundredWarManager.sysBanker.gold;
                } else
                {
                    banker.gold = HundredWarManager.roomInfo.bankerGold;
                }
            }
            let len: number = HundredWarManager.roomInfo.playerList.length;
            if (len > 0)
            {
                if (data.roleId == HundredWarManager.roomInfo.playerList[len - 1].roleId)
                {
                    UserManager.OnGetSimpleUserInfoEvent.removeListener(HundredWarManager.onReqComplete, this);
                    HundredWarManager.OnGetPlayerInfoEvent.dispatch();
                    return;
                }
            } else
            {
                UserManager.OnGetSimpleUserInfoEvent.removeListener(HundredWarManager.onReqComplete, this);
                HundredWarManager.OnGetPlayerInfoEvent.dispatch();
            }
        }
    }
    public static getPlayerInfoSuccess(data: any)
    {
        if (data && HundredWarManager.roomInfo.playerList)
        {
            for (let playerInfo of HundredWarManager.roomInfo.playerList)
            {
                if (playerInfo.roleId == data["roleId"])
                {
                    playerInfo.copyValueFrom(data);
                    if (!HundredWarManager.isSysBanker(data.roleId) && HundredWarManager.isBanker(data.roleId) && HundredWarManager.roomInfo && HundredWarManager.roomInfo.bankerGold)  //结算后更新庄家带入金币
                    {
                        playerInfo.gold = HundredWarManager.roomInfo.bankerGold;
                    }
                    break;
                }
            }
        }
    }
    /**
     * 发送坐下请求
    */
    public static reqSeat(pos: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            HundredWarManager.onSeatEvent.dispatch(pos);
        };
        SocketManager.call(Command.HWSit_Req_3701, { pos: pos }, callback, null, this);
    }
    /**
     * 发送站起请求
    */
    public static reqStandUp()
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            HundredWarManager.onStandUpEvent.dispatch();
        };
        SocketManager.call(Command.HWStandUp_Req_3704, null, callback, null, this);
    }
    /**
     * 发送下注请求
    */
    public static reqBet(pos: number, num: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let addFlag: boolean = true;
            for (let betInfo of HundredWarManager.roomInfo.betList)  //更新旧的
            {
                let i: number = betInfo.pos - 1;
                if (betInfo.pos == pos)
                {
                    betInfo.myBet += num;
                    addFlag = false;
                    break;
                }
            }

            if (addFlag)  //添加新的
            {
                let betInfo: HWBetPotInfo = new HWBetPotInfo();
                betInfo.pos = pos;
                betInfo.myBet = num;
                HundredWarManager.roomInfo.betList.push(betInfo);
            }
            HundredWarManager.onBetEvent.dispatch({ pos: pos, num: num });
        };
        let errorCallback: Function = function (result: game.SpRpcResult)
        {
            if (result.error == "ErrorCode.HundredWarOverFlow") //move todo
            {
                UIManager.showFloatTips("当前下注金币数已达庄家金币上限");
            }
        }
        SocketManager.call(Command.HWBet_Req_3694, { pos: pos, num: num }, callback, errorCallback, this);
    }
    /**
     * 发送离开请求
    */
    public static reqLeave()
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            HundredWarManager.leaveClear();
            HundredWarManager.onLeaveEvent.dispatch();
        };
        if (HundredWarManager.roomInfo)
        {
            if (HundredWarManager.panelHandler.isBankerList())  //是否在庄家列表
            {
                AlertManager.showAlert("您现在已上庄，请下庄后再退出房间！");
                return;
            }
            if ((HundredWarManager.roomInfo.state == HWState.Bet) && (HundredWarManager.getThisBetGold() > 0))  //判断是否正在游戏中
            {
                AlertManager.showAlert("游戏正在进行中，您暂时不能退出房间，请等本局结束再操作。");
            } else
            {
                HundredWarManager._isHadLeave = true;
                SocketManager.call(Command.HWLeave_Req_3702, null, callback, null, this);
            }
        }
    }
    /**
     * 请求下一局开始
    */
    public static reqNextRoundStart()
    {
        let callback: Function = function (result: game.SpRpcResult)
        {

        };
        if (!HundredWarManager._isHadLeave && HundredWarManager.roomInfo)
        {
            SocketManager.call(Command.HWNextRoundStart_Req_3703, null, callback, null, this);
        }
    }

    /**
     * 位置变更
     */
    public static onPosChange(result: game.SpRpcResult)
    {
        if (result.data)
        {
            let beforeId: number;
            if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList)
            {
                if (result.data.pos == 0 && !result.data.roleId && HundredWarManager.isBanker(UserManager.userInfo.roleId) && InfoUtil.checkAvailable(HundredWarManager.roomInfo) && HundredWarManager.roomInfo.bankerGold < HundredWarManager.roomInfo.definition.BankerMinGold)
                {
                    AlertManager.showAlert("您的当前金币低于" + game.MathUtil.formatNum(HundredWarManager.roomInfo.definition.BankerMinGold) + "金币，已从庄家列表退出。");
                }
                if (HundredWarManager.roomInfo.playerList.length > 0)
                {
                    let flag: boolean = true;
                    for (let i: number = 0; i < HundredWarManager.roomInfo.playerList.length; i++)
                    {
                        if (result.data.pos == HundredWarManager.roomInfo.playerList[i].pos)
                        {
                            beforeId = HundredWarManager.roomInfo.playerList[i].roleId;
                            if (!result.data.roleId)
                            {
                                HundredWarManager.roomInfo.playerList.splice(i, 1);
                            } else if (result.data.roleId != HundredWarManager.roomInfo.playerList[i].roleId)
                            {
                                HundredWarManager.roomInfo.playerList[i].roleId = result.data.roleId;
                                UserManager.reqSimpleUserInfo(result.data.roleId);
                            }
                            flag = false;
                        }
                    }
                    if (flag)
                    {
                        let playerInfo: HWHundredWarRoomPlayerInfo = new HWHundredWarRoomPlayerInfo();
                        playerInfo.pos = result.data.pos;
                        playerInfo.roleId = result.data.roleId;
                        HundredWarManager.roomInfo.playerList.push(playerInfo);
                        UserManager.reqSimpleUserInfo(result.data.roleId);
                    }
                } else
                {
                    if (result.data.roleId && !HundredWarManager.isSysBanker(result.data.roleId))
                    {
                        let playerInfo: HWHundredWarRoomPlayerInfo = new HWHundredWarRoomPlayerInfo();
                        playerInfo.pos = result.data.pos;
                        playerInfo.roleId = result.data.roleId;
                        HundredWarManager.roomInfo.playerList.push(playerInfo);
                        UserManager.reqSimpleUserInfo(result.data.roleId);
                    } else
                    {
                        HundredWarManager.roomInfo.playerList.push(HundredWarManager.sysBanker);
                        UserManager.OnGetSimpleUserInfoEvent.dispatch(HundredWarManager.sysBanker);
                    }
                }
                if (result.data.bankerGold)
                {
                    HundredWarManager.roomInfo.bankerGold = result.data.bankerGold;
                }
                if (HundredWarManager.isSysBanker(result.data.roleId))
                {
                    HundredWarManager.roomInfo.bankerGold = HundredWarManager.sysBanker.gold;
                }
            }
            if (result.data.pos == 0)
            {
                HundredWarManager.onBankerChangeEvent.dispatch({ beforeId: beforeId, afterId: result.data.roleId });
            }
            HundredWarManager.onPosChangeEvent.dispatch({ pos: result.data.pos, roleId: result.data.roleId });
        }
    }
    /**
     * 注池变更
     */
    public static onBetChange(result: game.SpRpcResult)
    {
        if (result.data && result.data.bet)
        {
            let changeBet: Array<number> = new Array<number>();
            for (let info of HundredWarManager.roomInfo.betList)
            {
                if (info.pos - 1 >= 0)  //闲家注池是 1 - 4
                {
                    if (info.bet != result.data.bet[info.pos - 1])
                    {
                        changeBet.push(info.pos);
                    }
                    info.bet = result.data.bet[info.pos - 1];
                }
            }
            result.data.bet = changeBet;
            HundredWarManager.onBetChangeEvent.dispatch(result.data);
        }
    }
    /**
     * 房间状态变更
     */
    public static onRoomStateChange(result: game.SpRpcResult)
    {
        if (result.data)
        {
            if (HundredWarManager.roomInfo)
            {
                HundredWarManager.roomInfo.state = result.data.state;
                if (result.data.stateTime)
                {
                    HundredWarManager.roomInfo.stateTime = result.data.stateTime;
                } else
                {
                    HundredWarManager.roomInfo.stateTime = 0;
                }
            }
            HundredWarManager.onRoomStateChangeEvent.dispatch();
        }
    }
    /**
     * 牌推送(结算)
     */
    public static onCardPush(result: game.SpRpcResult)
    {
        if (result.data)
        {
            HundredWarManager.hundredWarOverInfo = new HundredWarOverInfo();
            if (result.data.betList)
            {
                let cardInfoList: Array<CardInfo>;
                let betPot: HWBetPotInfo;
                HundredWarManager.hundredWarOverInfo.betList = new Array<HWBetPotInfo>();
                for (let betInfo of result.data.betList)
                {
                    cardInfoList = new Array<CardInfo>();
                    betPot = new HWBetPotInfo();
                    GamblingUtil.cardArr2CardInfoList(betInfo.cards, cardInfoList);
                    betPot.cards = cardInfoList;
                    betPot.pos = betInfo.pos;
                    betPot.win = betInfo.win;
                    HundredWarManager.hundredWarOverInfo.betList.push(betPot);
                }
            }
            if (result.data.rankList)
            {
                HundredWarManager.hundredWarOverInfo.rankList = result.data.rankList;
                HundredWarManager.hundredWarOverInfo.rankList.sort(SortUtil.hundredOverRankSort);
            }
            HundredWarManager.hundredWarOverInfo.gold = result.data.gold;
            HundredWarManager.hundredWarOverInfo.pool = result.data.pool;
            HundredWarManager.hundredWarOverInfo.isWin = result.data.isWin;
            HundredWarManager.roomInfo.bankerGold = result.data.bankerGold;
            HundredWarManager.onCardPushEvent.dispatch();
        }
    }
    /**
     * 被踢出房间
    */
    public static onOutRoomPush(result: game.SpRpcResult)
    {
        if (result.data)
        {
            // let data:msg.
            HundredWarManager._isHadLeave = true;
            HundredWarManager.onOutRoomEvent.dispatch(result.data["id"]);
        }
    }

    public static onFirstEnterRoom()
    {
        HundredWarManager.OnGetRoomInfoEvent.removeListener(HundredWarManager.onFirstEnterRoom, this);
        SceneManager.switcScene(SceneType.HundredWar);
    }

    /**
     * 生成系统庄家
    */
    private static _sysBanker: HWHundredWarRoomPlayerInfo;
    public static get sysBanker(): HWHundredWarRoomPlayerInfo
    {
        if (!HundredWarManager._sysBanker)
        {
            HundredWarManager._sysBanker = new HWHundredWarRoomPlayerInfo();
            HundredWarManager._sysBanker.roleId = 9999;
            HundredWarManager._sysBanker.sex = 2;
            HundredWarManager._sysBanker.name = "萌萌";
            HundredWarManager._sysBanker.gold = 88888888;
            HundredWarManager._sysBanker.head = SheetSubName.HundredWarSysBanker_Head;
            HundredWarManager._sysBanker.pos = 0;
        }
        return HundredWarManager._sysBanker;
    }
    /**
     * 判断是不是系统庄家根据roleId
    */
    public static isSysBanker(roleId: number): boolean
    {
        if (roleId == HundredWarManager.sysBanker.roleId)
        {
            return true;
        }
        return false;
    }
    /**
     * 获得闲家下注的总金币数
    */
    public static getPlayerBetTotalNum(): number
    {
        let total: number = 0;
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.betList)
        {
            for (let info of HundredWarManager.roomInfo.betList)
            {
                if (info.bet > 0)
                {
                    total += info.bet;
                }
            }
        }
        return total;
    }
    /**
     * 根据位置获取对应注池自己下注的金额
    */
    public static getSelfPoolGoldByPos(pos: number): number
    {
        if (HundredWarManager.roomInfo.betList)
        {
            for (let info of HundredWarManager.roomInfo.betList)
            {
                if (info.pos == pos && info.myBet)
                {
                    return info.myBet;
                }
            }
        }
        return null;
    }
    /**
     * 根据位置获取该注池是否有人下注
    */
    public static getIsHasBetByPos(pos: number): boolean
    {
        if (HundredWarManager.roomInfo.betList)
        {
            for (let info of HundredWarManager.roomInfo.betList)
            {
                if (info.pos == pos && info.bet > 0)
                {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 获得自己本轮下注的总金币数
    */
    public static getThisBetGold(): number
    {
        let total: number = 0;
        if (HundredWarManager.roomInfo.betList)
        {
            for (let info of HundredWarManager.roomInfo.betList)
            {
                if (info.myBet)
                {
                    total += info.myBet;
                }
            }
        }
        return total;
    }
    /**
     * 根据位置注池的位置获得该注池的输赢
    */
    public static getBetPotResultByPos(pos: number): boolean
    {
        let isWin: boolean;
        if (HundredWarManager.hundredWarOverInfo && HundredWarManager.hundredWarOverInfo.betList)
        {
            for (let betInfo of HundredWarManager.hundredWarOverInfo.betList)
            {
                if (betInfo.pos == pos)
                {
                    if (betInfo.win == HundredWarResultType.Win)
                    {
                        isWin = true;
                    } else
                    {
                        isWin = false;
                    }
                    break;
                }
            }
        }
        return isWin;
    }
    /**
	 * 获取玩家信息根据位置
	 */
    public static getPlayerInfoByPos(pos: number): HWHundredWarRoomPlayerInfo
    {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList)
        {
            for (let player of HundredWarManager.roomInfo.playerList)
            {
                if (player.pos == pos)
                {
                    return player;
                }
            }
        }
        return null;
    }
    /**
	 * 获取坐下玩家信息根据玩家id
	 */
    public static getPlayerInfo(roleId: number): HWHundredWarRoomPlayerInfo
    {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList)
        {
            for (let player of HundredWarManager.roomInfo.playerList)
            {
                if (player.roleId == roleId)
                {
                    return player;
                }
            }
        }
        return null;
    }
    /**
     * 判断是不是庄家
    */
    public static isBanker(roleId: number): boolean
    {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.playerList)
        {
            for (let i: number = 0; i < HundredWarManager.roomInfo.playerList.length; i++)
            {
                if (HundredWarManager.roomInfo.playerList[i].roleId == roleId && HundredWarManager.roomInfo.playerList[i].pos == 0)
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 进入百人大战成功广播
    */
    public static OnGetRoomInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取坐下用户信息完成广播
    */
    public static OnGetPlayerInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 坐下成功广播
    */
    public static onSeatEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 站起成功广播
    */
    public static onStandUpEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 下注成功广播
    */
    public static onBetEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 离开成功广播
    */
    public static onLeaveEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 注池变更推送广播
    */
    public static onBetChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 牌推送广播
    */
    public static onCardPushEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 房间状态变更推送广播
    */
    public static onRoomStateChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 位置变更推送广播
    */
    public static onPosChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 庄家变更事件
     */
    public static onBankerChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 发牌动画完成广播
    */
    public static onDealCardsEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 显示牌动画完成广播
    */
    public static onShowCardsEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 结算动画播放完成广播
    */
    public static onShowCardsAnimOverEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 隐藏牌广播
    */
    public static onHideCardsEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 踢出房间广播
    */
    public static onOutRoomEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}