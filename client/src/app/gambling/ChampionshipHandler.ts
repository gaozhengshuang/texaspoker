/**
 * 锦标赛行牌管理
 */
class ChampionshipHandler
{
    public initializeRoomInfo(result: game.SpRpcResult)
    {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match) 
        {
            let matchRoomInfo: MatchRoomInfo = ChampionshipManager.getMatchRoomInfoByRoomId(GamblingManager.roomInfo.id);
            if (matchRoomInfo)
            {
                matchRoomInfo.cloneTo(GamblingManager.matchRoomInfo);
                if (result && result.data)
                {
                    if (result.data["rank"])
                    {
                        GamblingManager.matchRoomInfo.rank = result.data["rank"];
                    }
                    if (result.data["join"])
                    {
                        GamblingManager.matchRoomInfo.leftJoin = result.data["join"];
                    }
                    if (result.data["avgChips"])
                    {
                        GamblingManager.matchRoomInfo.avgChips = result.data["avgChips"];
                    }
                }
            }
            if (!GamblingManager.roomInfo.blindLevel)
            {
                GamblingManager.roomInfo.blindLevel = 1;
            }
            if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
            {
                //盲注等级达到上限
                let def: table.IChampionshipBlindDefine = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.blindLevel + 1, GamblingManager.matchRoomInfo.definition.BlindType);
                if (!def)
                {
                    GamblingManager.roomInfo.blindTime = -1;
                }
                else if (!GamblingManager.roomInfo.blindTime && GamblingManager.roomInfo.startTime)
                {
                    GamblingManager.roomInfo.blindTime = GamblingManager.roomInfo.startTime + def.UpTime;
                }
            }
            GamblingManager.roomInfo.nowBlindLevel = GamblingManager.roomInfo.blindLevel;
            if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition)
            {
                let def: table.IChampionshipBlindDefine = ChampionshipBlindDefined.GetInstance().getDefByBlind(GamblingManager.matchRoomInfo.definition.BlindType, GamblingManager.roomInfo.sBlind, GamblingManager.roomInfo.bBlind);
                if (def && def.Level <= GamblingManager.roomInfo.blindLevel)
                {
                    GamblingManager.roomInfo.nowBlindLevel = def.Level;
                }
            }
            if (!GamblingManager.roomInfo.addonTimes)
            {
                GamblingManager.roomInfo.addonTimes = 0;
            }
            if (!GamblingManager.roomInfo.rebuyTimes)
            {
                GamblingManager.roomInfo.rebuyTimes = 0;
            }
            if (!GamblingManager.self)
            {
                this.startRoomDisbandListener();
            }
        }
    }
    /**
     * 设置下级盲注时间
     */
    public setNextAddTime()
    {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match) 
        {
            if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition && GamblingManager.roomInfo)
            {
                if (!GamblingManager.roomInfo.blindLevel)
                {
                    GamblingManager.roomInfo.blindLevel = 1;
                }
                let def: table.IChampionshipBlindDefine = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.blindLevel + 1, GamblingManager.matchRoomInfo.definition.BlindType);
                if (def)
                {
                    GamblingManager.roomInfo.blindTime = def.UpTime + TimeManager.GetServerUtcTimestamp();
                }
                else
                {
                    GamblingManager.roomInfo.blindTime = -1;
                }
            }
        }
    }
    /**
     * 是否能重购/增购
     */
    public isCanAddChips(type: number, isShow: boolean = false): boolean
    {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition)
        {
            if (type == ChampionshipBuyType.Rebuy)
            {
                let pInfo: PlayerInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
                if (pInfo && (pInfo.initbankRoll <= GamblingManager.matchRoomInfo.definition.InitialChips || !pInfo.initbankRoll))
                {
                    let def: table.IChampionshipBlindDefine = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.nowBlindLevel, GamblingManager.matchRoomInfo.definition.BlindType);
                    if (def && def.Rebuy > 0 && GamblingManager.matchRoomInfo.definition.Rebuy > 0 && GamblingManager.matchRoomInfo.definition.MaxRebuyTimes > 0)
                    {
                        if (GamblingManager.matchRoomInfo.definition.Rebuy > GamblingManager.roomInfo.rebuyTimes || !GamblingManager.roomInfo.rebuyTimes)
                        {
                            if (!GamblingManager.roomInfo.addbuy || (GamblingManager.roomInfo.addbuy < GamblingManager.matchRoomInfo.definition.MaxRebuyTimes * GamblingManager.matchRoomInfo.definition.InitialChips))
                            {
                                return true;
                            }
                            else
                            {
                                if (isShow)
                                {
                                    AlertManager.showAlert("本局重购次数已达上限");
                                }
                                return false;
                            }
                        }
                        else
                        {
                            if (isShow)
                            {
                                AlertManager.showAlert("重购次数已达上限");
                            }
                            return false;
                        }
                    }
                }
                else
                {
                    if (isShow)
                    {
                        AlertManager.showAlert("拥有筹码小于或等于初始筹码时才能进行重购");
                    }
                    return false;
                }
            }
            else if (type == ChampionshipBuyType.Addon)
            {
                let def: table.IChampionshipBlindDefine = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.nowBlindLevel, GamblingManager.matchRoomInfo.definition.BlindType);
                if (def && def.Addon > 0 && GamblingManager.matchRoomInfo.definition.Addon > 0)
                {
                    if (GamblingManager.matchRoomInfo.definition.Addon > GamblingManager.roomInfo.addonTimes || !GamblingManager.roomInfo.addonTimes)
                    {
                        if (!GamblingManager.roomInfo.addbuy || (GamblingManager.roomInfo.addbuy < GamblingManager.matchRoomInfo.definition.AddonChips))
                        {
                            return true;
                        }
                        else
                        {
                            if (isShow)
                            {
                                AlertManager.showAlert("本局增购次数已达上限");
                            }
                            return false;
                        }
                    }
                    else
                    {
                        if (isShow)
                        {
                            AlertManager.showAlert("增购次数已达上限");
                        }
                        return false;
                    }
                }
            }
        }
        if (isShow)
        {
            if (type == ChampionshipBuyType.Rebuy)
            {
                AlertManager.showAlert("当前阶段无法重购");
            }
            else if (type == ChampionshipBuyType.Addon)
            {
                AlertManager.showAlert("当前阶段无法增购");
            }
        }
        return false;
    }
    /**
     * 请求重购/增购
     */
    public addShip(type: number)
    {
        if (!GamblingManager.roomInfo || GamblingManager.roomInfo.isMatchOut) //如果已经被淘汰了则不发请求
        {
            return;
        }
        let callback: Function = function (result: game.SpRpcResult)
        {
            SocketManager.RemoveCommandListener(Command.MTTRebuyOrAddon_3619, callback, this);
            SocketManager.RemoveErrorListener(Command.MTTRebuyOrAddon_3619, callbackError, this);
            if (type == ChampionshipBuyType.Out)
            {
                return;
            }
            if (GamblingManager.roomInfo)
            {
                if (type == ChampionshipBuyType.Rebuy)
                {
                    GamblingManager.roomInfo.rebuyTimes++;
                }
                else
                {
                    GamblingManager.roomInfo.addonTimes++;
                }
                if (GamblingManager.roomInfo.gamblingType == GamblingType.Match)
                {
                    if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition)
                    {
                        if (!GamblingManager.roomInfo.addbuy)
                        {
                            GamblingManager.roomInfo.addbuy = 0;
                        }
                        if (type == ChampionshipBuyType.Rebuy)
                        {
                            GamblingManager.roomInfo.addbuy += GamblingManager.matchRoomInfo.definition.InitialChips;
                            AlertManager.showAlert(game.StringUtil.format("重购成功,{0}筹码将在下局增加", GamblingManager.matchRoomInfo.definition.InitialChips));
                        }
                        else
                        {
                            GamblingManager.roomInfo.addbuy += GamblingManager.matchRoomInfo.definition.AddonChips;
                            AlertManager.showAlert(game.StringUtil.format("增购成功,{0}筹码将在下局增加", GamblingManager.matchRoomInfo.definition.AddonChips));
                        }
                    }
                    else
                    {
                        if (type == ChampionshipBuyType.Rebuy)
                        {
                            AlertManager.showAlert("重购成功,筹码将在下局增加");
                        }
                        else
                        {
                            AlertManager.showAlert("增购成功,筹码将在下局增加");
                        }
                    }
                }
            }
            GamblingManager.RebuyORAddonEvent.dispatch({ isSuccess: true })
        };
        let callbackError: Function = function (result: game.SpRpcResult)
        {
            SocketManager.RemoveCommandListener(Command.MTTRebuyOrAddon_3619, callback, this);
            SocketManager.RemoveErrorListener(Command.MTTRebuyOrAddon_3619, callbackError, this);
            if (result.error == "3012") //move todo
            {
                if (type == ChampionshipBuyType.Rebuy)
                {
                    AlertManager.showAlert("当前阶段无法重购");
                }
                else if (type == ChampionshipBuyType.Addon)
                {
                    AlertManager.showAlert("当前阶段无法增购");
                }
            }
            GamblingManager.RebuyORAddonEvent.dispatch({ isSuccess: false })
        };
        SocketManager.AddCommandListener(Command.MTTRebuyOrAddon_3619, callback, this);
        SocketManager.AddErrorListener(Command.MTTRebuyOrAddon_3619, callbackError, this);
        SocketManager.Send(Command.MTTRebuyOrAddon_3619, { type: type });
    }
    public outChampionship(recordId: number)
    {
        GamblingManager.roomInfo.isMatchOut = true;
        game.Console.log("房间处于旁观状态状态");
    }
    /**
     * 比赛房间侦听自动解散
     */
    public startRoomDisbandListener()
    {
        game.Tick.AddSecondsInvoke(this.checkRoomPlayerList, this);
    }
    public stopRoomDisbandListener()
    {
        game.Tick.RemoveSecondsInvoke(this.checkRoomPlayerList, this);
    }
    private checkRoomPlayerList()
    {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
        {
            if (GamblingManager.roomInfo.playerList && GamblingManager.roomInfo.playerList.length <= 1)
            {
                this.stopRoomDisbandListener();
                AlertManager.showAlert("该比赛房间已经解散，请返回大厅！", () =>
                {
                    GamblingManager.reqLeaveRoom();
                });
            }
        }
        else
        {
            this.stopRoomDisbandListener();
        }
    }
}
class ChampionshipBuyType
{
    /**
     * 重购
     */
    public static Rebuy = 1;
    /**
     * 增购
     */
    public static Addon = 2;
    /**
     * 取消(输光时)
     */
    public static Out = 3;
}
/**
 * 竞标赛 房间消息类型
 */
class ChampionshipRoomUIAlertType
{
    /**
     * 进入奖励圈
     */
    public static InAward = 1;
    /**
     * 进入最终桌
     */
    public static InFinals = 2;
    /**
     * 重新分配房间
     */
    public static ChangeRoom = 3;
    /**
     * 剩余人数变更
     */
    public static LeftNumChange = 4;
}