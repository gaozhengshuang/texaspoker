/**
 * 充值活动管理
 */
class PayPrizeHandler extends BaseActivitySubHandler<PayPrizeInfo>
{
    /**
     * 判断是否充值过
     */
    public isPay(subType: string): boolean
    {
        let activityInfo = this.getInfoBySubType(subType);
        if (activityInfo && ActivityUtil.getActivityOpenState(activityInfo) == ActivityOpenState.Open)
        {
            return activityInfo.step > 0;
        }
        return false;
    }
    /**
     *  是否显示首充（登录满5分钟或者从未充过时显示）
     */
    public isShowFirstPay(): boolean
    {
        if (VersionManager.isSafe)
        {
            return false;
        }
        let time: number = TimeManager.loginTimestamp - UserManager.userInfo.createdTime;
        return time > 300 && !this.isPay(ActivitySubType.firstPay);
    }
    /**
     * 根据子类型获取活动
     */
    public getInfoBySubType(subType: string): ActivityInfo
    {
        for (let info of this.list)
        {
            if (info.definition.subType == subType)
            {
                return info;
            }
        }
        return null;
    }

    public initialize(info: ActivityInfo)
    {
        super.initialize(info);
        let def: ActivityPayPrizeDefintion;
        let pInfo: PayPrizeInfo;
        for (let i: number = 0; i < ActivityPayPrizeDefined.GetInstance().dataList.length; i++) //填充子列表信息
        {
            def = ActivityPayPrizeDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, PayPrizeInfo, def);
        };
    }
    /**
	 * 领取奖励完成回调
	 */
    public onGetAwardComplete(id: number, subId: number)
    {
        let info = this.getInfo(id);
        if (info)
        {
            info.step++;
        }
        this.onGetAwardCompleteEvent.dispatch(id);
    }

    /**
     * 领取奖励完成事件
     */
    public onGetAwardCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}