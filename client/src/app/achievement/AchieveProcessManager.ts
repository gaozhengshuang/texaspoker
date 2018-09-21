/**
 * 成就/任务进度管理
 */
class AchieveProcessManager
{
    private static _list: Array<BaseAchieveProcessInfo>;
    private static _playOverList: AchieveProcessInfoList;
    /**
     * 任务进度更新事件
     */
    public static processUpdateEvent: game.DelegateDispatcher = new game.DelegateDispatcher();

    public static Initialize(result: game.SpRpcResult)
    {
        AchieveProcessManager.ClearList();
        AchieveProcessManager.initList();
        if (result.data["groupList"])
        {
            for (let info of result.data["groupList"])
            {
                for (let process of AchieveProcessManager._list)
                {
                    if (process.group == info["group"])
                    {
                        process.init(info["process"]);
                        break;
                    }
                }
            }
        }
        if (result.data["achieveList"])
        {
            for (let info of result.data["achieveList"])
            {
                for (let achieveInfo of UserManager.userInfo.allAchieveList)
                {
                    if (achieveInfo.id == info["id"])
                    {
                        achieveInfo.isTake = true;
                    }
                }
            }
        }
    }

    /**
     * 根据组查找进度信息
     */
    public static getAchieveProcessInfoByGroup(group: AchieveGroup): BaseAchieveProcessInfo
    {
        for (let info of AchieveProcessManager._list)
        {
            if (info.group == group)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 根据任务大类查找进度列表
     */
    public static getAchieveProcessListByTag(tag: AchieveTag): Array<BaseAchieveProcessInfo>
    {
        let list: Array<BaseAchieveProcessInfo> = new Array<BaseAchieveProcessInfo>();
        for (let info of AchieveProcessManager._list)
        {
            if (info.tag == tag)
            {
                list.push(info);
            }
        }
        return list;
    }

    /**
     * 根据组生成进度类
     */
    private static GetProcess(group: AchieveGroup): BaseAchieveProcessInfo
    {
        let process: BaseAchieveProcessInfo;
        switch (group)
        {
            case AchieveGroup.GoldGroup:
                process = new GoldProcess(group);
                break;
            case AchieveGroup.FriendGroup:
                process = new FriendProcess(group);
                break;
            case AchieveGroup.LevelGroup:
                process = new LevelProcess(group);
                break;
            case AchieveGroup.OnePairGroup:
                process = new OnePairProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.TwoPairsGroup:
                process = new TwoPairsProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.ThreeOfAKindGroup:
                process = new ThreeOfAKindProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.StraightGroup:
                process = new StraightProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.FlushGroup:
                process = new FlushProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.FullhouseGroup:
                process = new FullhouseProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.FourOfAKindGroup:
                process = new FourOfAKindProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.StraightFlushGroup:
                process = new StraightFlushProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.RoyalFlushGroup:
                process = new RoyalFlushProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.PrimaryPatternGroup:
                process = new PrimaryPatternProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.MiddlePatternGroup:
                process = new MiddlePatternProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.HighPatternGroup:
                process = new HighPatternProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.WinGroup:
                process = new WinProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
            case AchieveGroup.LevelUpGroup:
                process = new LevelUpProcess(group);
                break;
            case AchieveGroup.JoinMTTGroup:
                process = new JoinMTTProcess(group);
                break;
            case AchieveGroup.WinMTTGroup:
                process = new WinMTTProcess(group);
                break;
            case AchieveGroup.HWFunPatternGroup:
                process = new HundredWarFunPatternProcess(group);
                break;
            case AchieveGroup.HWRichPatternGroup:
                process = new HundredWarRichPatternProcess(group);
                break;
            case AchieveGroup.WinHWGroup:
                process = new WinHundredWarProcess(group);
                break;
        }
        return process;
    }

    private static initList()
    {
        if (!AchieveProcessManager._list)
        {
            AchieveProcessManager._list = new Array<BaseAchieveProcessInfo>();
        }
        if (!AchieveProcessManager._playOverList)
        {
            AchieveProcessManager._playOverList = new AchieveProcessInfoList(AchieveType.PlayOver);
        }
        for (let group of AchieveDefined.GetInstance().getAchieveGroup())
        {
            let achieveInfo: BaseAchieveProcessInfo = AchieveProcessManager.GetProcess(group);
            if (achieveInfo.group == AchieveGroup.LevelUpGroup || achieveInfo.group == AchieveGroup.LevelGroup)
            {
                achieveInfo.init(UserManager.userInfo.level);
            }
            else if (achieveInfo.group == AchieveGroup.GoldGroup)
            {
                achieveInfo.init(UserManager.userInfo.maxGold)
            }
            else
            {
                achieveInfo.init(0);
            }
            AchieveProcessManager._list.push(achieveInfo);
        }
    }
    /**
     * 重登陆的时候清除list里的信息和事件
     */
    private static ClearList()
    {
        if (AchieveProcessManager._list != null)
        {
            for (let i: number = 0; i < AchieveProcessManager._list.length; i++)
            {
                AchieveProcessManager._list[i].destroy();
            }
            game.ArrayUtil.Clear(AchieveProcessManager._list);
        }
    }

    /**
     * 根据类型创建监听
     */
    public static addProcessListener(type: AchieveType, callback: Function, thisObj: any)
    {
        switch (type)
        {
            case AchieveType.Gold:
                UserManager.propertyChangeEvent.addListener(callback, thisObj);
                break;
            case AchieveType.Friend:
                FriendManager.onRefreshInfoEvent.addListener(callback, thisObj);
                break;
            case AchieveType.Level:
                UserManager.levelUpgrade.addListener(callback, thisObj);
            case AchieveType.PlayOver:
                GamblingManager.RoundOverEvent.addListener(callback, thisObj);
                break;
        }
    }

    /**
    * 根据类型移除监听
    */
    public static removeProcessListener(type: number, callback: Function, thisObj: any)
    {
        switch (type)
        {
            case AchieveType.Gold:
                UserManager.propertyChangeEvent.removeListener(callback, thisObj);
                break;
            case AchieveType.Friend:
                FriendManager.onRefreshInfoEvent.removeListener(callback, thisObj);
                break;
            case AchieveType.Level:
                UserManager.levelUpgrade.removeListener(callback, thisObj);
            case AchieveType.PlayOver:
                GamblingManager.RoundOverEvent.addListener(callback, thisObj);
                break;
        }
    }
    /**
     * 通过不同游戏场 对局 后的进度更新
     */
    public static onWinOfPlayField(processInfo: BaseAchieveProcessInfo, type: AchieveShowPattern)
    {
        let overInfo: RoundOverInfo = GamblingManager.roundOverInfo;
        if (overInfo && InfoUtil.checkAvailable(GamblingManager.roomInfo) && type == AchievementManager.playingFieldTypeToAchieveShowPattern(GamblingManager.roomInfo.definition.Type) && AchieveProcessManager.isOnPlay())
        {
            processInfo.process++;
        }
    }
    /**
     * 通过百人大战不同场次 对局 后的进度更新
     */
    public static onPlayHWField(processInfo: BaseAchieveProcessInfo, type: HundredWarType)
    {
        if (InfoUtil.checkAvailable(HundredWarManager.roomInfo) && HundredWarManager.roomInfo.definition.type == type && HundredWarManager.getThisBetGold() != 0)
        {
            processInfo.process++;
        }
    }
    /**
     * 是否在游玩
     */
    private static isOnPlay()
    {
        if (GamblingManager.self && GamblingManager.self.state != PlayerState.WaitNext)
        {
            return true;
        }
        return false;
    }

    /**
     * 通过牌型胜利后的进度更新
     */
    public static onWinOfCardType(processInfo: BaseAchieveProcessInfo, type: CardType)
    {
        if (GamblingUtil.isWin(UserManager.userInfo.id))
        {
            let cardInfoList: CardInfo[] = GamblingManager.roomInfo.handCard;
            if (cardInfoList)
            {
                CardTypeMatchUtil.matchCardInRoom(cardInfoList);
                if (CardTypeMatchUtil.cardType == type)
                {
                    processInfo.process++;
                    processInfo.init(processInfo.process);
                }
            }
        }
    }
}
