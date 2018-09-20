/**
 * 欢乐豪礼管理
 */
class HappyGiftHandler extends BaseActivitySubHandler<HappyGiftItemInfo>
{

    /**
     * 排名列表
     */
    public rankList: game.Map<number, Array<RankInfo>> = new game.Map<number, Array<RankInfo>>();

    public clear()
    {
        super.clear();
        this.rankList.clear();
    }

    public initialize(info: ActivityInfo)
    {
        super.initialize(info);
        ActivityManager.onReqSingleActivityEvent.addListener(this.refreshActivityInfo, this);
        let def: ActivityHappyGiftDefintion;
        let pInfo: HappyGiftItemInfo;
        for (let i: number = 0; i < ActivityHappyGiftDefined.GetInstance().dataList.length; i++) //填充子列表信息
        {
            def = ActivityHappyGiftDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, HappyGiftItemInfo, def);
            if (pInfo)
            {
                pInfo.buyTime = 0
            }
        };
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
        if (info)
        {
            for (let key in info.gotJsonObj)
            {
                let subInfo: HappyGiftItemInfo = this.getSubInfo(info.id, parseInt(key));
                if (subInfo)
                {
                    subInfo.buyTime = info.gotJsonObj[key];
                }
            }
        }
    }

    /**
     * 获取已兑换的奖品列表
     */
    public getHaveTakenPrizeList(id: number): Array<HappyGiftItemInfo>
    {
        let result: Array<HappyGiftItemInfo> = new Array<HappyGiftItemInfo>();
        let info: ActivityInfo = this.getInfo(id);
        if (info && info.subList)
        {
            for (let subInfo of info.subList)
            {
                let happyGiftinfo = subInfo as HappyGiftItemInfo;
                if (happyGiftinfo.buyTime > 0)
                {
                    result.push(happyGiftinfo);
                }
            }
        }
        return result;
    }
    /**
     * 兑换完成操作
     */
    public onGetAwardComplete(id: number, subId: number)
    {
        super.onGetAwardComplete(id, subId);
        let itemInfo: HappyGiftItemInfo = this.getSubInfo(id, subId);
        if (InfoUtil.checkAvailable(itemInfo))
        {
            let activityInfo = this.getInfo(id);
            if (activityInfo)
            {
                activityInfo.step -= itemInfo.definition.cost;
            }
            itemInfo.buyTime++;
        }
        this.takePrizeCompleteEvent.dispatch();
    }
    /**
	 * 兑换奖励完成事件
	 */
    public takePrizeCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}