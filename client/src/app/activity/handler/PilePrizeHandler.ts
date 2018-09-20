/**
 * 累充活动管理
 */
class PilePrizeHandler extends BaseActivitySubHandler<PilePrizeItemInfo>
{
    public clear()
    {
        super.clear();
    }

    public initialize(info: ActivityInfo)
    {
        super.initialize(info);
        ActivityManager.onReqSingleActivityEvent.addListener(this.refreshActivityInfo, this);
        UserManager.levelUpgrade.addListener(this.updateLevelProcess, this);
        ChampionshipManager.OnMTTOverPushEvent.addListener(this.updateMttProcess, this);
        let def: ActivityPilePrizeDefintion;
        let pInfo: PilePrizeItemInfo;
        for (let i: number = 0; i < ActivityPilePrizeDefined.GetInstance().dataList.length; i++) //填充子列表信息
        {
            def = ActivityPilePrizeDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, PilePrizeItemInfo, def);
            if (pInfo)
            {
                pInfo.process = 0
                pInfo.isTaken = false;
            }
        };
        this.setProcess(info);
    }
	/**
	 * 拉取单个活动信息后，刷新操作
	 */
    public refreshActivityInfo(id: number)
    {
        super.refreshActivityInfo(id);
        let info = this.getInfo(id);
        if (InfoUtil.checkAvailable(info) && info.definition.type == ActivityType.HappyGift)
        {
            this.setJson(info);
        }
    }
    /**
     * 设置Json
     */
    public setJson(info: ActivityInfo)
    {
        super.setJson(info);
        let subInfo: PilePrizeItemInfo;
        if (info)
        {
            for (let key in info.jsonObj)
            {
                subInfo = this.getSubInfo(info.id, parseInt(key));
                if (InfoUtil.checkAvailable(subInfo))
                {
                    subInfo.process = info.jsonObj[key] > subInfo.definition.para1 ? subInfo.definition.para1 : info.jsonObj[key];
                }
            }
            for (let key in info.gotJsonObj)
            {
                subInfo = this.getSubInfo(info.id, info.gotJsonObj[key]);
                if (subInfo)
                {
                    subInfo.isTaken = true;
                }
            }
        }
    }

    private updateMttProcess(record: any)
    {
        if (record.rank)
        {
            this.updateProcess(AchieveType.PlayMtt);
        }
    }
    private updateLevelProcess()
    {
        this.updateProcess(AchieveType.Level);
    }
    /**
     * 更新进度
     */
    private updateProcess(type: AchieveType)
    {
        for (let info of this.list)
        {
            if (info && info.subList && ActivityUtil.getActivityOpenState(info) == ActivityOpenState.Open)
            {
                for (let item of info.subList)
                {
                    let subInfo: PilePrizeItemInfo = item as PilePrizeItemInfo;
                    if (subInfo.definition.type == type)
                    {
                        if (type == AchieveType.Level)
                        {
                            subInfo.process = UserManager.userInfo.level;
                        }
                        else
                        {
                            subInfo.process++;
                        }
                    }
                }
            }
        }
    }

    public getInfoBySubType(subType: ActivitySubType)
    {
        for (let info of this._list)
        {
            if (InfoUtil.checkAvailable(info) && info.definition.subType == subType)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 设置进度
     */
    private setProcess(info: ActivityInfo)
    {
        for (let item of info.subList)
        {
            let subInfo: PilePrizeItemInfo = item as PilePrizeItemInfo;
            switch (subInfo.definition.type)
            {
                case AchieveType.Register:
                    subInfo.process = 1;
                    break;
                case AchieveType.DownLoadApp:
                    subInfo.process = subInfo.definition.para2.indexOf(BundleManager.getBid()) < 0 ? 0 : 1;
                    break;
                case AchieveType.Level:
                    subInfo.process = UserManager.userInfo.level > subInfo.definition.para1 ? subInfo.definition.para1 : UserManager.userInfo.level;
                    break;
                case AchieveType.PlayMtt:
                    break;
            }
        }
    }

    /**
     * 兑换完成操作
     */
    public onGetAwardComplete(id: number, subId: number)
    {
        super.onGetAwardComplete(id, subId);
        let itemInfo: PilePrizeItemInfo = this.getSubInfo(id, subId);
        if (InfoUtil.checkAvailable(itemInfo))
        {
            itemInfo.isTaken = true;
        }
        this.takePrizeCompleteEvent.dispatch(id);
    }
    /**
     * 是否完成并领取所有奖励
     */
    public isTakeAllAward(id: number): boolean
    {
        let info: ActivityInfo = this.getInfo(id);
        if (info)
        {
            for (let item of info.subList)
            {
                let subInfo: PilePrizeItemInfo = item as PilePrizeItemInfo;
                if (subInfo.definition.type != AchieveType.BindInviteExtra && !subInfo.isTaken)
                {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * 是否有可领取的奖励
     */
    public isHavePrize(id: number): boolean
    {
        let info: ActivityInfo = this.getInfo(id);
        if (info)
        {
            for (let item of info.subList)
            {
                let subInfo: PilePrizeItemInfo = item as PilePrizeItemInfo;
                if (subInfo.definition.type != AchieveType.BindInviteExtra && !subInfo.isTaken && subInfo.isCanTake)
                {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 获得显示的子项列表    
     */
    public getShowSubList(id: number): Array<PilePrizeItemInfo>
    {
        let result: Array<PilePrizeItemInfo> = new Array<PilePrizeItemInfo>();
        let info: ActivityInfo = this.getInfo(id);
        if (info)
        {
            for (let item of info.subList)
            {
                let subInfo: PilePrizeItemInfo = item as PilePrizeItemInfo;
                if (!subInfo.definition.isHide)
                {
                    result.push(subInfo);
                }
            }
        }
        return result;
    }
    /**
     * 获得额外奖励信息
     */
    public getExtraAward(id: number): PilePrizeItemInfo
    {
        let info: ActivityInfo = this.getInfo(id);
        if (info)
        {
            for (let item of info.subList)
            {
                let subInfo: PilePrizeItemInfo = item as PilePrizeItemInfo;
                if (subInfo.definition.type == AchieveType.BindInviteExtra)
                {
                    return subInfo;
                }
            }
        }
        return null;
    }

    /**
	 * 兑换奖励完成事件
	 */
    public takePrizeCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}