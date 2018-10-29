/**
 * 月卡项面板
*/
class MonthCardItemRenderer extends BaseItemRenderer<ShopInfo>
{
    /**
     * 剩余天数
    */
    public surplusDayLabel: eui.Label;
    /**
     * 每天可领取金币的描述
    */
    public goldNumDesLabel: eui.Label;
    /**
     * 每天可领取金币的数量
    */
    public goldNumLabel: eui.Label;
    /**
     * 购买月卡需要花费的钱
    */
    public costLabel: eui.Label;
    /**
     * 已激活显示的group
    */
    public openGroup: eui.Group;
    /**
     * 未激活显示的group
    */
    public closeGroup: eui.Group;
    /**
     * 领取按钮
    */
    public bringBtn: eui.Button;
    /**
     * 购买按钮
    */
    public buyBtn: eui.Button;
    /**
     * 月卡图标
    */
    public iconImg: eui.Image;
    /**
     * 领取的award信息
    */
    private _bringAwardDef: table.IAwardDefine;
    /**
     * 月卡的定义信息
    */
    private _monthCardDefinition: table.IAwardDefine;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.MonthCardItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.iconImg.source = this.bindData.definition.IconName + ResSuffixName.PNG;
            this._monthCardDefinition = table.AwardById[this.bindData.definition.AwardId];
            if (this._monthCardDefinition)
            {
                if (this._monthCardDefinition.CostId)
                {
                    this.costLabel.text = game.longToNumber(this._monthCardDefinition.CostNum[0]) / 100 + this.getDesByCostType(this._monthCardDefinition.CostType[0]);
                }
                this._bringAwardDef = AwardDefined.GetInstance().getAwardInfoByPreId(this._monthCardDefinition.Id);
                if (this._bringAwardDef)
                {
                    if (this._bringAwardDef.RewardId)
                    {
                        this.goldNumDesLabel.text = this._bringAwardDef.RewardNum[0] + "金币";
                        this.goldNumLabel.text = this._bringAwardDef.RewardNum[0].toString();
                    }
                }
            }
            this.setRendererInfo();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
            this.bringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBringBtnClick, this);
            AwardManager.OnExchanged.addListener(this.bringSuccess, this);
            // AwardManager.OnAwardValueChanged.addListener(this.buySuccess, this);
            UserManager.propertyChangeEvent.addListener(this.buySuccess, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
        this.bringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBringBtnClick, this);
        AwardManager.OnExchanged.removeListener(this.bringSuccess, this);
        // AwardManager.OnAwardValueChanged.removeListener(this.buySuccess, this);
        UserManager.propertyChangeEvent.removeListener(this.buySuccess, this);
    }

    /**
     * 写入激活或者未激活两种状态的数据
    */
    private setRendererInfo()
    {
        let surplusTime: number = this.getSurplusTime();
        if (surplusTime > 0) // 判断是否处于激活状态
        {
            this.openGroup.visible = true;
            this.closeGroup.visible = false;
            this.surplusDayLabel.text = "剩余:" + game.DateTimeUtil.GetLefttimeText(surplusTime, false, true);
            this.surplusDayLabel.textColor = ColorEnum.White;
            if (AwardManager.isToLimit(this._bringAwardDef))  //判断当天是否领取完
            {
                this.forbidBringBtn();
            } else
            {
                this.bringBtn.enabled = true;
            }

        } else
        {
            this.openGroup.visible = false;
            this.closeGroup.visible = true;
            this.surplusDayLabel.textColor = ColorEnum.MonthCard_Inactivite_Brown;
            this.surplusDayLabel.text = "未激活";
        }
    }
    /**
     * 禁用领取按钮
    */
    private forbidBringBtn()
    {
        this.bringBtn.enabled = false;
    }
    /**
     * 领取成功
    */
    private bringSuccess(id: number)
    {
        if (this._bringAwardDef.Id == id)
        {
            this.forbidBringBtn();
        }
    }
    /**
     * 购买成功
    */
    private buySuccess()
    {
        // if (id == this._monthCardDefinition.Id)
        // {
        this.setRendererInfo();
        // }
    }
    /**
     * 购买按钮点击事件
    */
    private onBuyBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        this.tryPay();
    }
    /**
     * 领取按钮点击事件
    */
    private onBringBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this._bringAwardDef)
        {
            AwardManager.Exchange(this._bringAwardDef.Id);
        }
    }
    /**
     * 获得月卡剩余时间
    */
    private getSurplusTime(): number
    {
        let time = 0;
        switch (this.bindData.definition.AwardId)
        {
            case AwardFixedId.SliverMonthCard:
                time = UserManager.userInfo.silvercardtime;
                break;
            case AwardFixedId.GoldMonthCard:
                time = UserManager.userInfo.goldcardtime;
                break;
        }
        if (time > 0)
        {
            return time - TimeManager.GetServerUtcSecondstamp();
        }
        return 0;
    }
    /**
     * 购买
    */
    private tryPay()
    {
        if (this.bindData)
        {
            ChannelManager.PaySend(this.bindData.id);
        }
    }
    /**
     * 根据消耗类型获得类型描述
    */
    private getDesByCostType(costType: number): string
    {
        let str: string;
        switch (costType)
        {
            case CostType.Gold:
                str = "金币";
                break;
            case CostType.Diamond:
                str = "钻石";
                break;
            case CostType.RMB:
                str = "元";
                break;
        }
        return str;
    }
}