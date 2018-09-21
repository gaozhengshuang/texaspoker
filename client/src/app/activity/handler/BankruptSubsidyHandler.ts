/**
 * 破产补助活动管理
 */
class BankruptSubsidyHandler extends BaseActivitySubHandler<BankruptSubsidyInfo>
{

    public initialize(info: ActivityInfo)
    {
        super.initialize(info);
        let def: BankruptSubsidyDefintion;
        let pInfo: BankruptSubsidyInfo;
        for (let i: number = 0; i < BankruptSubsidyDefined.GetInstance().dataList.length; i++) //填充子列表信息
        {
            def = BankruptSubsidyDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, BankruptSubsidyInfo, def);
        };
        GamblingManager.SitOrStandEvent.addListener(this.onBust, this);
    }
    /**
	 * 领取奖励完成回调
	 */
    public onGetAwardComplete(id: number, subId: number)
    {
        super.onGetAwardComplete(id, subId);
        let activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BankruptSubsidy);
        if (activityInfo && id == activityInfo.id)
        {
            let info: ActivityInfo = this.getInfo(id);
            if (info)
            {
                info.step++;
            }
            this.takeBankruptcyCompleteEvent.dispatch();
        }
    }
    /**
     * 领取奖励次数
     */
    public getPrizeTimes(id: number): number
    {
        let info = this.getInfo(id);
        if (info)
        {
            return info.step;
        }
        else
        {
            game.Console.log("活动id不存在！");
            return 0;
        }
    }
    /**
     * 获取剩余次数
     */
    public getLeftPrizeTimes(): number
    {
        let activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BankruptSubsidy);
        if (activityInfo)
        {
            let subInfo: BankruptSubsidyInfo = this.getSubInfo(activityInfo.id, 1);
            if (subInfo)
            {
                return subInfo.definition.times - this.getPrizeTimes(activityInfo.id);
            }
            else
            {
                game.Console.log("子id不存在！");
            }
        }
        return 0;
    }
    /**
     * 是否能够领取破产补助
     */
    public get isBankruptSubsidy(): boolean
    {
        let activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BankruptSubsidy);
        if (activityInfo)
        {
            let subInfo = this.getSubInfo(activityInfo.id, 1);
            if (subInfo && UserManager.userInfo.gold + UserManager.userInfo.safeGold < subInfo.definition.limitGold && this.getLeftPrizeTimes() > 0)
            {
                return true;
            }
        }
        return false;
    }
    /**
     * 破产处理
     */
    private onBust(obj: any)
    {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && obj.pInfo.roleId == UserManager.userInfo.id && obj.state == BuyInGameState.Stand && UserManager.isBust)
        {
            let minNum: number = GamblingManager.roomInfo.definition.SBuyin;
            if (SceneManager.sceneType != SceneType.Hall)
            {
                let activityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BankruptSubsidy);
                //破产活动时间内，且有条件领取破产补助
                if (activityInfo && ActivityUtil.getActivityOpenState(activityInfo) == ActivityOpenState.Open && this.isBankruptSubsidy)
                {
                    UIManager.showPanel(UIModuleName.BankruptSubsidyInGamePanel, { info: activityInfo });
                }
                else
                {
                    UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { minNum: minNum, isGoldInsufficient: true, isBankruptcy: true });
                }
            }
        }
    }

    /**
     * 领取破产奖励完成事件
     */
    public takeBankruptcyCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
/**
 * 破产补助信息
 */
class BankruptSubsidyInfo extends BaseActivitySubInfo<BankruptSubsidyDefintion>
{
    protected trySetDefinition()
    {
        super.trySetDefinition();
        this._definition = BankruptSubsidyDefined.GetInstance().getSubDefinition(this._id, this._subId);
    }
}