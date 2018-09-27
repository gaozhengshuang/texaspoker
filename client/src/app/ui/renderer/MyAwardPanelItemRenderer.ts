/**
 * 我的礼物渲染项
 */
class MyAwardPanelItemRenderer extends BaseItemRenderer<PrizeInfo>
{
    public itemTitleLabel: eui.Label//物品标题
    public itemDesLabel: eui.Label//物品描述
    public takePrizeBtn: eui.Button//领取奖品
    public takeDesLabel: eui.Label//奖品状态
    public takeErrorLabel: eui.Label//奖品返还提醒

    private _itemDef: table.IItemBaseDataDefine;
    public comItemIcon: CommonIcon;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.MyAwardPanelItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData)
        {
            this._itemDef = table.ItemBaseDataById[this.bindData.itemId);
            if (this._itemDef)
            {
                this.bindData.effectType = this._itemDef.effectType;
                this.takePrizeBtn.visible = this.takeDesLabel.visible = this.itemDesLabel.visible = false;
                this.comItemIcon.init(this._itemDef.icon + ResSuffixName.PNG, 88);
                this.itemTitleLabel.text = this._itemDef.name;
                this.takeErrorLabel.visible = false;
                if (this.bindData.isGet == 1)  //未领取
                {
                    this.takePrizeBtn.visible = this.itemDesLabel.visible = true;
                    this.itemDesLabel.text = this._itemDef.des;
                } else if (this.bindData.isGet == 2)  //已领取
                {
                    this.takeDesLabel.visible = this.itemDesLabel.visible = true;
                    this.itemDesLabel.text = this._itemDef.des;
                    if (this.bindData.state == PrizeState.Complete)
                    {
                        if (this._itemDef.effectType == PrizeEffectType.Kind)
                        {
                            this.takeDesLabel.text = "已发货";
                        } else if (this._itemDef.effectType == PrizeEffectType.Cost)
                        {
                            this.takeDesLabel.text = "已充值";
                        }
                    } else if (this.bindData.state == PrizeState.Underway)
                    {
                        if (this._itemDef.effectType == PrizeEffectType.Kind)
                        {
                            this.takeDesLabel.text = "等待发货";
                        } else if (this._itemDef.effectType == PrizeEffectType.Cost)
                        {
                            this.takeDesLabel.text = "充值中";
                        }
                    } else if (this.bindData.state == PrizeState.InfoError)
                    {
                        this.takeDesLabel.text = "信息错误";
                        this.takeErrorLabel.visible = true;
                    }
                }
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeAward, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeAward, this);
    }

    //领取礼物
    private onTakeAward()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (!UserManager.userInfo.addressName)
        {
            AlertManager.showAlert("您尚未填写领奖信息，请填写后再领取奖品", this.skipToInfo);
        } else
        {
            if (this._itemDef.effectType == PrizeEffectType.Kind)
            {
                //实物订单确认界面
                UIManager.showPanel(UIModuleName.PrizeOrderSurePanel, { id: this.bindData.itemId, type: PrizeEffectType.Kind, awardName: this._itemDef.name });
            } else
            {
                //话费订单确认界面
                UIManager.showPanel(UIModuleName.PrizeOrderSurePanel, { id: this.bindData.itemId, type: PrizeEffectType.Cost, awardName: this._itemDef.name });
            }
        }
    }
    /**
     * 调到领奖信息选项
    */
    private skipToInfo()
    {
        PrizeManager.onSkipEvent.dispatch();
    }
    private cancelBubble(event: egret.TouchEvent)
    {
        event.stopImmediatePropagation();
    }
}