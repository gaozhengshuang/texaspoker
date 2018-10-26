/**
 * 成就/任务进度管理
 */
class AchieveProcessManager
{
    private static _list: Array<BaseAchieveProcess>;
    private static _playOverList: AchieveProcessInfoList;
    /**
     * 任务进度更新事件
     */
    public static processUpdateEvent: game.DelegateDispatcher = new game.DelegateDispatcher();

    public static Initialize(result: game.SpRpcResult)
    {
        AchieveProcessManager.ClearList();
        AchieveProcessManager.initList();
        let data: msg.GW2C_RetAchieveInfo = result.data;
        if (data.grouplist)
        {
            for (let info of data.grouplist)
            {
                for (let process of AchieveProcessManager._list)
                {
                    if (process.group == info.groupid)
                    {
                        process.init(info.process);
                        break;
                    }
                }
            }
        }
        if (data.achievelist)
        {
            for (let info of data.achievelist)
            {
                for (let achieveInfo of UserManager.userInfo.allAchieveList)
                {
                    if (achieveInfo.id == info.id)
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
    public static getAchieveProcessInfoByGroup(group: AchieveGroup): BaseAchieveProcess
    {
        if (AchieveProcessManager._list)
        {
            for (let info of AchieveProcessManager._list)
            {
                if (info.group == group)
                {
                    return info;
                }
            }
        }
        return null;
    }
    /**
     * 根据任务大类查找进度列表
     */
    public static getAchieveProcessListByTag(tag: AchieveTag): Array<BaseAchieveProcess>
    {
        let list: Array<BaseAchieveProcess> = new Array<BaseAchieveProcess>();
        if (AchieveProcessManager._list)
        {
            for (let info of AchieveProcessManager._list)
            {
                if (info.tag == tag)
                {
                    list.push(info);
                }
            }
        }
        return list;
    }

    /**
     * 根据组生成进度类
     */
    private static GetProcess(group: AchieveGroup): BaseAchieveProcess
    {
        let process: BaseAchieveProcess;
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
            case AchieveGroup.OnePairGroup:
                process = new OnePairProcess(group);
                AchieveProcessManager._playOverList.list.push(process);  //关于牌局记录的，都要在用一个_playOverList来管理
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
            case AchieveGroup.LuckyGroup1:
            case AchieveGroup.LuckyGroup2:
            case AchieveGroup.LuckyGroup3:
                process = new LuckyTaskProcess(group);
                AchieveProcessManager._playOverList.list.push(process);
                break;
        }
        return process;
    }

    private static initList()
    {
        if (!AchieveProcessManager._list)
        {
            AchieveProcessManager._list = new Array<BaseAchieveProcess>();
        }
        if (!AchieveProcessManager._playOverList)
        {
            AchieveProcessManager._playOverList = new AchieveProcessInfoList(AchieveType.PlayOver);
        }
        let groupList = AchieveDefined.GetInstance().getAchieveGroup();
        for (let group of groupList)
        {
            AchieveProcessManager.addProcess(group);
        }
    }
    public static addProcess(group: AchieveGroup)
    {
        let process: BaseAchieveProcess = AchieveProcessManager.GetProcess(group); //move todo
        if (process)
        {
            if (process.group == AchieveGroup.LevelUpGroup || process.group == AchieveGroup.LevelGroup)
            {
                process.init(UserManager.userInfo.level);
            }
            else if (process.group == AchieveGroup.GoldGroup)
            {
                process.init(UserManager.userInfo.maxGold)
            }
            else
            {
                process.init(0);
            }
            AchieveProcessManager._list.push(process);
        }
    }
    public static removeProcess(process: BaseAchieveProcess)
    {
        game.ArrayUtil.RemoveItem(process, AchieveProcessManager._list);
        game.ArrayUtil.RemoveItem(process, AchieveProcessManager._playOverList.list);

        if (process)
        {
            process.destroy();
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
        if (AchieveProcessManager._playOverList)
        {
            AchieveProcessManager._playOverList.clear();
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
    public static onWinOfPlayField(processInfo: BaseAchieveProcess, type: AchieveShowPattern)
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
    public static onPlayHWField(processInfo: BaseAchieveProcess, type: HundredWarType)
    {
        if (InfoUtil.checkAvailable(HundredWarManager.roomInfo) && HundredWarManager.roomInfo.definition.Type == type && HundredWarManager.getThisBetGold() != 0)
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
    public static onWinOfCardType(processInfo: BaseAchieveProcess, type: CardType)
    {
        if (GamblingUtil.isWin(UserManager.userInfo.roleId))
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
