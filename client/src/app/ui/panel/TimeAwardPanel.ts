/**
 * 计时奖励面板
*/
class TimeAwardPanel extends BasePanel
{
    /**
     * 重置时间
    */
    public resetLabel: eui.Label;
    /**
     * 奖励scroller
    */
    public awardScroller: eui.Scroller;
    /**
     * 奖励list
    */
    public awardList: eui.List;
    /**
     * 场次以及第几轮描述
    */
    public desLabel: eui.Label;
    /**
     * 领奖时间倒计时
    */
    public timeLabel: eui.Label;
    /**
     * 金币数量
    */
    public goldLabel: eui.Label;
    /**
     * 领取奖励按钮
    */
    public getBtn: eui.Button;
    /**
     * 场次（初中高）
    */
    public pattern: PlayingFieldType;

    public anmGroup: eui.Group;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.TimeAwardPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0.5;
        UIUtil.listRenderer(this.awardList, this.awardScroller, TimeAwardItemRenderer, ScrollViewDirection.Horizontal_L_R);
        this.awardScroller.scrollPolicyV = eui.ScrollPolicy.OFF;
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        UIManager.pushResizeGroup(this.anmGroup);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.pattern = appendData;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        this.setTimeAwardInfo();
        GamblingManager.timeAwardHandler.getTimeAward(this.pattern);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.addListener(this.onCloseBtnClickHandler, this);
        GamblingManager.timeAwardHandler.getTimeAwardEvent.addListener(this.setTimeAward, this);
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getTimeAward, this);
        GamblingManager.timeAwardHandler.BringTimeAwardEvent.addListener(this.setTimeAwardCanBring, this);
        GamblingManager.timeAwardHandler.TimeAwardCountDownEvent.addListener(this.refreshTime, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.removeListener(this.onCloseBtnClickHandler, this);
        GamblingManager.timeAwardHandler.getTimeAwardEvent.removeListener(this.setTimeAward, this);
        this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getTimeAward, this);
        GamblingManager.timeAwardHandler.BringTimeAwardEvent.removeListener(this.setTimeAwardCanBring, this);
        GamblingManager.timeAwardHandler.TimeAwardCountDownEvent.removeListener(this.refreshTime, this);
    }

    /**
     * 设置及时奖励数据
    */
    private setTimeAwardInfo()
    {
        if (GamblingManager.timeAwardHandler.round == TimeAwardDefined.GetInstance().dataList.length)
        {
            this.getBtn.enabled = false;
            this.timeLabel.text = "距离下次领奖时间00:00";
            let name: string = PlayingFieldManager.getPatternName(this.pattern);
            if (name)
            {
                this.desLabel.text = "您已领取" + name + "全部计时奖励";
            }
            let item: TimeAwardItemRenderer;
            for (let i: number = 0; i < this.awardList.numChildren; i++)
            {
                if (i < GamblingManager.timeAwardHandler.round)
                {
                    item = this.awardList.getChildAt(i) as TimeAwardItemRenderer;
                    item.flagImg.visible = true;
                    item.numLabel.textColor = ColorEnum.TimeAward_Finish_Yellow;
                }
            }
            return;
        }
        if (GamblingManager.timeAwardHandler.time)
        {
            this.getBtn.enabled = false;
            this.timeLabel.text = "距离下次领奖时间" + qin.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false);
        } else
        {
            this.getBtn.enabled = true;
            this.timeLabel.text = "距离下次领奖时间00:00";
        }
        let playInfo: PlayerInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
        if (playInfo)
        {
            let bankRoll: number = playInfo.bankRoll;  //桌内的筹码             
            this.goldLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold + bankRoll);
        } else
        {
            this.goldLabel.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
        }
        if (GamblingManager.timeAwardHandler.round != undefined)
        {
            let item: TimeAwardItemRenderer;
            for (let i: number = 0; i < this.awardList.numChildren; i++)
            {
                if (i < GamblingManager.timeAwardHandler.round)
                {
                    item = this.awardList.getChildAt(i) as TimeAwardItemRenderer;
                    item.flagImg.visible = true;
                    item.numLabel.textColor = ColorEnum.TimeAward_Finish_Yellow;
                }
            }
            let name: string = PlayingFieldManager.getPatternName(this.pattern);
            if (name)
            {
                let r: number = GamblingManager.timeAwardHandler.round + 1;
                this.desLabel.text = "您正在进行" + name + "第" + r + "轮";
            }
        }
    }
    /**
     * 写入对应场次的计时奖励数据
    */
    private setTimeAward()
    {
        this.awardList.dataProvider = new eui.ArrayCollection(GamblingManager.timeAwardHandler.timeAwardList);
    }
    /**
     * 领取奖励按钮点击事件
    */
    private getTimeAward(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        PropertyManager.OpenGet();
        GamblingManager.timeAwardHandler.reqGetTimeAward(this.pattern);
    }

    /**
     * 计时奖励可领取
    */
    private setTimeAwardCanBring()
    {
        this.getBtn.enabled = true;
    }
    /**
     * 倒计时
    */
    private refreshTime()
    {
        this.timeLabel.text = "距离下次领奖时间" + qin.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false);
    }
}