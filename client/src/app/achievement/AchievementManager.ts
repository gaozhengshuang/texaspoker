/**
 * 成就/任务管理
 */
class AchievementManager
{
    /**
    * 成就解锁事件
    */
    public static achieveChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 领取成就奖励事件
     */
    public static getAchievementPrizeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 总成就和任务列表
     */
    public static allList: Array<AchievementInfo>;
    /**
     * 别的玩家任务进度
     */
    public static otherProcessList: game.Map<number, number>;

    public static initialize(result: game.SpRpcResult)
    {
        TimeManager.resetTime0Event.addListener(this.onResetTime, this);
        if (!AchievementManager.allList)
        {
            AchievementManager.allList = new Array<AchievementInfo>();
            for (let def of table.Achieve)
            {
                let info: AchievementInfo = new AchievementInfo();
                info.id = def.Id;
                info.isComplete = false;
                info.isTake = false;
                info.isOther = false;
                info.setActive();
                AchievementManager.allList.push(info);
            }
        }
        AchievementManager.setAllAchieveList(UserManager.userInfo, result, true);
    }
    /**
     * 请求接取动态任务
     */
    public static reqTakeOtherTask(type: DynamicTaskType)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data: msg.GW2C_RetTakeOtherTask = result.data;
            if (data.taskid > 0)
            {
                let acheiveInfo = AchievementManager.getAchieveInfoById(AchievementManager.allList, data.taskid);
                if (acheiveInfo)
                {
                    acheiveInfo.isActive = true;
                    AchieveProcessManager.addProcess(acheiveInfo.definition.Group);
                    AchievementManager.TakeOtherTaskEvent.dispatch(acheiveInfo);
                }
            }
        };
        SocketManager.call(Command.C2GW_ReqTakeOtherTask, { tasktype: type }, callback, null, this);
    }

    /**
     * 拉取某人成就信息
     */
    public static reqUserAchieveList(info: UserInfo)
    {
        if (info.roleId == UserManager.userInfo.roleId)
        {
            info.allAchieveList = UserManager.userInfo.allAchieveList;
            return;
        }
        let callback: Function = function (result: game.SpRpcResult)
        {
            AchievementManager.setAllAchieveList(info, result);
        }
        SocketManager.call(Command.C2GW_ReqAchieveInfo, { "roleid": info.roleId }, callback, null, this);
    }
    /**
     * 设置某用户已解锁的成就信息
     */
    private static setAllAchieveList(info: UserInfo, result: game.SpRpcResult, isSelf?: boolean)
    {
        if (isSelf)
        {
            if (AchievementManager.otherProcessList)
            {
                AchievementManager.otherProcessList.clear();
            }
            else
            {
                AchievementManager.otherProcessList = new game.Map<number, number>();
            }
        }
        let data: msg.GW2C_RetAchieveInfo = result.data;
        let list: Array<AchievementInfo> = new Array<AchievementInfo>();
        if (data.grouplist)
        {
            for (let aInfo of data.grouplist)
            {
                let achieveInfoList: Array<AchievementInfo> = AchievementManager.getAchieveListByGroup(AchievementManager.allList, aInfo.groupid); //同组任务的所有列表
                if (isSelf)
                {
                    AchievementManager.otherProcessList.add(aInfo.groupid, aInfo.process);
                }
                for (let achieveInfo of achieveInfoList)
                {
                    if (InfoUtil.checkAvailable(achieveInfo) && achieveInfo.definition.Para1 <= aInfo.process) //添加已完成未领奖的组
                    {
                        let completeInfo: AchievementInfo = new AchievementInfo();
                        completeInfo.id = achieveInfo.id;
                        completeInfo.isTake = false;
                        completeInfo.isComplete = true;
                        completeInfo.isActive = true;
                        completeInfo.isOther = info.roleId != UserManager.userInfo.roleId;
                        list.push(completeInfo);
                    }
                }
            }
        }
        info.allAchieveList = AchievementManager.getCompleteAchieveInfoDic(list, info);
    }
    /**
     * 生成包括所有成就信息的列表
     */
    private static getCompleteAchieveInfoDic(list: Array<AchievementInfo>, userInfo: UserInfo): Array<AchievementInfo>
    {
        if (list == null || list.length == 0)
        {
            return [];
            // return AchievementManager.allList;
        }
        let result: Array<AchievementInfo> = new Array<AchievementInfo>();
        for (let i: number = 0; i < AchievementManager.allList.length; i++)
        {
            let info: AchievementInfo = AchievementManager.allList[i];
            let resultInfo: AchievementInfo;
            for (let j: number = 0; j < list.length; j++)
            {
                if (list[j].id == info.id)
                {
                    resultInfo = list[j];
                    break;
                }
            }
            if (!resultInfo)
            {
                resultInfo = new AchievementInfo();
                resultInfo.id = info.id;
                resultInfo.isTake = false;
                resultInfo.isComplete = false;
                resultInfo.setActive();
                resultInfo.isOther = userInfo.roleId != UserManager.userInfo.roleId;
            }
            result.push(resultInfo);
        }
        return result;
    }

    /**
     * 根据tag获取成就/任务列表
     */
    public static getAchieveListByTag(userInfo: UserInfo, tag: number): Array<AchievementInfo>
    {
        let result: Array<AchievementInfo> = new Array<AchievementInfo>();
        if (userInfo.allAchieveList)
        {
            for (let info of userInfo.allAchieveList)
            {
                if (info.definition && info.definition.Tag == tag)
                {
                    result.push(info);
                }
            }
        }
        return result;
    }

    /**
     * 根据组获取成就/任务列表
     */
    public static getAchieveListByGroup(list: Array<AchievementInfo>, group: number)
    {
        let result: Array<AchievementInfo> = new Array<AchievementInfo>();
        for (let info of list)
        {
            if (info.definition && info.definition.Group == group)
            {
                result.push(info);
            }
        }
        return result;
    }

    /**
     * 通过指定的列表，获取成就id获取成就信息
     */
    public static getAchieveInfoById(list: Array<AchievementInfo>, id: number): AchievementInfo
    {
        for (let info of list)
        {
            if (info.id == id)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 通过成就id获取成就信息
     */
    public static getAchieveInfo(id: number): AchievementInfo
    {
        for (let info of AchievementManager.allList)
        {
            if (info.id == id)
            {
                return info;
            }
        }
        return null;
    }

    /**
    * 获取显示的任务列表
    */
    public static getShowAchieveList(): Array<AchievementInfo> 
    {
        let list: Array<BaseAchieveProcess> = AchieveProcessManager.getAchieveProcessListByTag(AchieveTag.Quest);
        let result: Array<AchievementInfo> = new Array<AchievementInfo>();
        for (let info of list)
        {
            if (!info.isTakeComplete)
            {
                let achieveInfo: AchievementInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.takeStep);
                let isSafeEnougth = VersionManager.isSafe ? achieveInfo.definition.IsSafe : 1;
                if (isSafeEnougth && achieveInfo.isActive)
                {
                    result.push(achieveInfo);
                }
            }
        }
        return result;
    }
    /**
     * 根据类型查找显示的列表
     */
    public static getShowAchieveListByType(dailyType: AchieveDailyType): Array<AchievementInfo> 
    {
        let list: Array<AchievementInfo> = AchievementManager.getShowAchieveList();
        let result: Array<AchievementInfo> = new Array<AchievementInfo>();
        for (let info of list)
        {
            if (info.definition && info.definition.DailyQuest == dailyType)
            {
                result.push(info);
            }
        }
        return result;
    }
    /**
     * 根据类型判断是否有未领取的任务
     */
    public static isHaveNoTakeByType(dailyType: AchieveDailyType): boolean
    {
        let list: Array<AchievementInfo> = AchievementManager.getShowAchieveListByType(dailyType);
        for (let info of list)
        {
            if (info.isComplete == true && info.isTake == false)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 根据战局类型查找显示的列表
     */
    public static getShowAchieveListByPlayType(type: AchieveShowPattern)
    {
        let list: Array<AchievementInfo> = AchievementManager.getShowAchieveList();
        let result: Array<AchievementInfo> = new Array<AchievementInfo>();
        for (let info of list)
        {
            if (info.definition)
            {
                for (let playingType of info.definition.PlayingFieldPattern)
                {
                    if (playingType == AchieveShowPattern.All || playingType == type)
                    {
                        result.push(info);
                        break;
                    }
                    if (playingType == AchieveShowPattern.AllPattern)
                    {
                        if (type == AchieveShowPattern.PrimaryPattern || type == AchieveShowPattern.MiddlePattern || type == AchieveShowPattern.HighPattern)
                        {
                            result.push(info);
                            break;
                        }
                    }
                }
            }
        }
        return result;
    }
    /**
     * 根据战局判断是否有未领取的任务
    */
    public static isHaveNoTakeByPlayType(type: AchieveShowPattern): boolean
    {
        let list: Array<AchievementInfo> = AchievementManager.getShowAchieveListByPlayType(type);
        for (let info of list)
        {
            if (info.isComplete == true && info.isTake == false)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 房间类型转换为任务显示显示类型
     */
    public static playingFieldTypeToAchieveShowPattern(type: PlayingFieldType): AchieveShowPattern
    {
        switch (type)
        {
            case PlayingFieldType.Primary:
                return AchieveShowPattern.PrimaryPattern;
            case PlayingFieldType.Middle:
                return AchieveShowPattern.MiddlePattern;
            case PlayingFieldType.High:
                return AchieveShowPattern.HighPattern;
            case PlayingFieldType.Mtt:
                return AchieveShowPattern.Match;
        }
    }
    /**
     * 发送领取成就奖励的请求
     */
    public static reqTakeAchievePrize(id: number[])
    {
        PropertyManager.OpenGet();
        SocketManager.call(Command.C2GW_ReqTakeAchieveAward, { "id": id }, AchievementManager.onTakeAchievePrize, null, this);
    }

    private static onTakeAchievePrize(result: game.SpRpcResult)
    {
        let data: msg.GW2C_RetTakeAchieveAward = result.data;
        if (data.id)
        {
            PropertyManager.ShowItemList();
            // for (let id of result.data["Id"]) //move todo
            // {
            let info: AchievementInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, data.id);
            if (info && !info.isTake)
            {
                info.isTake = true;
            }
            // }
            AchievementManager.getAchievementPrizeEvent.dispatch();
        }
        else
        {
            UIManager.showFloatTips("领取失败");
        }
    }
    /**
     * 重置任务
     */
    private static onResetTime(result: game.SpRpcResult)
    {
        AchievementManager.resetAchievement(AchieveDailyType.Daily);
        if (TimeManager.GetServerLocalDateTime().getDay() == WeekDay.Monday)
        {
            AchievementManager.resetAchievement(AchieveDailyType.Weekly);
        }
    }
    /**
     * 重置任务
     */
    private static resetAchievement(dailyType: AchieveDailyType)
    {
        for (let info of AchieveProcessManager.getAchieveProcessListByTag(AchieveTag.Quest))
        {
            if (info.dailyQuest == dailyType)
            {
                info.resetProcess();
            }
        }
    }
    /**
     * 接取任务返回事件
     */
    public static TakeOtherTaskEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}