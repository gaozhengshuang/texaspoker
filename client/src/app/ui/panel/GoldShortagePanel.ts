/**
 * 金币不足面板
 */
class GoldShortagePanel extends BasePanel
{
    public buyNowBtn: eui.Button;
    public priceLabel: eui.Label;
    public goldLabel: eui.Label;
    public bankruptcyImage: eui.Image;
    public insufficientImage: eui.Image;
    private _shopInfo: ShopInfo;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.GoldShortagePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        this.isCloseButtonTween = false;
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        super.onAwake(event);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (this.panelData && this.panelData.goldShortage > 0)
        {
            this.unEnoughGoldHandle();
            if (appendData.isBankruptcy)
            {
                this.bankruptcyImage.visible = true;
                this.insufficientImage.visible = false;
            }
            else
            {
                this.bankruptcyImage.visible = false;
                this.insufficientImage.visible = true;
            }
        }
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.buyNowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buNow, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.buyNowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buNow, this);
        AwardManager.OnExchanged.removeListener(this.onExchanged, this);
    }
    private buNow(event: egret.TouchEvent)
    {
        if (this._shopInfo && this._shopInfo.definition)
        {
            // let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(this._shopInfo.definition.awardId);  // move todo
            // if (awardDef)
            // {
            //     let def: AwardInfoDefinition;
            //     for (let cost of awardDef.costList)
            //     {
            //         if (cost.type == CostType.RMB)
            //         {
            //             def = cost;
            //         }
            //     }
            //     AwardManager.OnExchanged.removeListener(this.onExchanged, this);
            //     AwardManager.OnExchanged.addListener(this.onExchanged, this);
            //     ChannelManager.PaySend(this._shopInfo.id);
            // }
        }
    }
    private onExchanged(id: number)
    {
        if (this._shopInfo && this._shopInfo.definition && this._shopInfo.definition.AwardId == id)
        {
            AwardManager.OnExchanged.removeListener(this.onExchanged, this);
            this.onCloseBtnClickHandler(null);
        }
    }
    private buyInGameHandler()
    {
        this.onCloseBtnClickHandler(null);
    }
	/**
	 * 金币不足处理
	*/
    private unEnoughGoldHandle()
    {
        this._shopInfo = null;
        let awardDef: table.IAwardDefine;
        if (ShopManager.goldList.length > 0)
        {
            for (let i: number = 0; i < ShopManager.goldList.length; i++)
            {
                let info: ShopInfo = ShopManager.goldList[i];
                if (info && info.definition)
                {
                    awardDef = table.AwardById[info.definition.AwardId];
                    if (awardDef && this.panelData.goldShortage <= awardDef.RewardNum[0] || i == ShopManager.goldList.length - 1)
                    {
                        this._shopInfo = info;
                        break;
                    }
                }
            }
            if (this._shopInfo && awardDef)
            {
                if (awardDef.CostNum && awardDef.CostNum.length > 0)
                {
                    this.priceLabel.text = "仅需" + awardDef.CostNum[0] / 100 + "元";
                }
                this.goldLabel.text = awardDef.Name;
            }
        }
    }
}