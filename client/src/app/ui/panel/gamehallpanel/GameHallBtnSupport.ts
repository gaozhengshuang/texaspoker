/**
 * 大厅面板按钮逻辑
 */
class GameHallBtnSupport
{
    public target: GameHallPanel;
    public constructor(panel: GameHallPanel)
    {
        this.target = panel;
        if (!VersionManager.isSafe)
        {
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.NewGiftBtn, this.target.newGiftBtn));
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.InviteBtn, this.target.inviteBtn));
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.ShareBtn, this.target.shareBtn));
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.FirstpayBtn, this.target.firstpayBtn));
            this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.BindPhoneAwardBtn, this.target.bindPhoneAwardBtn));
        }
        this.btnInfoList.push(new GameHallBtnListInfo(GameHallBtnPriority.MonthCardBtn, this.target.monthCardBtn));
        VersionManager.setComponentVisibleBySafe(this.target.newGiftBtn, this.target.inviteBtn, this.target.shareBtn, this.target.firstpayBtn, this.target.bindPhoneAwardBtn);
        this.btnInfoList.sort(SortUtil.GameHallBtnSort);
    }
    public onEnable()
    {
        AwardManager.OnAwardValueChanged.addListener(this.refreshPayButton, this);
        BindAccountManager.bindListEvent.addListener(this.setIsShowBindPhoneAwardBtn, this);
        ActivityManager.bindPhoneAwardHandler.bringSuccessEvent.addListener(this.bringSuccess, this);
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.addListener(this.onGetPayPrizeAward, this);
    }
    public onDisable()
    {
        AwardManager.OnAwardValueChanged.removeListener(this.refreshPayButton, this);
        BindAccountManager.bindListEvent.removeListener(this.setIsShowBindPhoneAwardBtn, this);
        ActivityManager.bindPhoneAwardHandler.bringSuccessEvent.removeListener(this.bringSuccess, this);
        ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.addListener(this.onGetPayPrizeAward, this);
    }

    public init()
    {
        this.refreshPayButton();
        this.refreshNewGift();
        this.changeActivityBtn(this.target.shareBtn, false);
    }
    public btnInfoList: Array<GameHallBtnListInfo> = new Array<GameHallBtnListInfo>();

    /**
    * 充值过后刷新首充活动按钮
    */
    public refreshPayButton()
    {
        let isShow: boolean = ActivityManager.payPrizeHandler.isShowFirstPay();
        if (isShow)
        {
            this.changeActivityBtn(this.target.firstpayBtn, true);
        }
        else
        {
            this.changeActivityBtn(this.target.firstpayBtn, false);
        }
    }

    /**
     * 领取累积活动奖励刷新按钮
     */
    private onGetPayPrizeAward(id: number)
    {
        let info: ActivityInfo = ActivityManager.getActivityInfo(id);
        if (InfoUtil.checkAvailable(info) && info.definition.SubType == ActivitySubType.NewGift)
        {
            this.refreshNewGift();
        }
    }

    /**
     * 刷新新人礼活动
     */
    private refreshNewGift()
    {
        let activityInfo: ActivityInfo = ActivityManager.pilePrizeHandler.getInfoBySubType(ActivitySubType.NewGift);
        let state: ActivityOpenState = ActivityUtil.getActivityOpenState(activityInfo);
        if (InfoUtil.checkAvailable(activityInfo) && !ActivityManager.pilePrizeHandler.isTakeAllAward(activityInfo.id) && state == ActivityOpenState.Open)//新人礼活动是否有效
        {
            this.changeActivityBtn(this.target.newGiftBtn, true);
        }
        else
        {
            this.changeActivityBtn(this.target.newGiftBtn, false);
        }
    }

    private readonly bindPhoneAwardId: number = 201;
    /**
    * 设置是否显示绑定手机奖励按钮
    */
    private setIsShowBindPhoneAwardBtn()
    {
        // let bringAwardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(this.bindPhoneAwardId);  //move todo
        // if (ChannelManager.loginType != ChannelLoginType.GiantFun)
        // {
        //     if (BindAccountManager.getIsBinding(ChannelLoginType.GiantFun) && AwardManager.isToLimit(bringAwardDef))
        //     {
        //         this.changeActivityBtn(this.target.bindPhoneAwardBtn, false);
        //     }
        //     else
        //     {
        //         this.changeActivityBtn(this.target.bindPhoneAwardBtn, true);
        //     }
        // }
        // else
        // {
        //     this.changeActivityBtn(this.target.bindPhoneAwardBtn, false);
        // }
    }

    /**
	 * 绑定手机奖励领取成功
	*/
    private bringSuccess(id: number)
    {
        let activityInfo: ActivityInfo = ActivityManager.getOpenAchivityByType(ActivityType.BindChannel);
        if (activityInfo && activityInfo.id == id)
        {
            this.changeActivityBtn(this.target.bindPhoneAwardBtn, false);
        }
    }

    /**
     * 改变活动按钮显隐
     */
    public changeActivityBtn(btn: egret.DisplayObject, isShow: boolean)
    {
        let btnInfo: GameHallBtnListInfo;
        for (let info of this.btnInfoList)
        {
            if (info.btn == btn)
            {
                btnInfo = info;
                break;
            }
        }
        if (btnInfo)
        {
            btnInfo.isShow = isShow;
            this.refreshBtnList();
        }
        else
        {
            game.Console.logError("按钮不存在于队列!");
        }
    }
    private refreshBtnList()
    {
        if (this.target.topBtnGroup.numChildren > 0)
        {
            this.target.topBtnGroup.removeChildren();
        }
        for (let i: number = 0; i < this.btnInfoList.length; i++)
        {
            if (this.btnInfoList[i].isShow)
            {
                this.target.topBtnGroup.addChild(this.btnInfoList[i].btn);
            }
        }
    }
}