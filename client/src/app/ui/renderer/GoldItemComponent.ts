/**
 * 商城金币项
*/
class GoldItemComponent extends BaseComponent<ShopInfo>{
    public goldImg: eui.Image;//钻石图片；
    public goldNum: eui.Label;//钻石数量；
    public goldCount: eui.Label;//钻石计算；
    public goldBtn: eui.Button;//钻石（元）；

    private _info: ShopInfo;
    private _awardDef: AwardDefinition;

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);
    }
    protected onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);
        super.onDisable(event);
    }
    public init(info: ShopInfo)
    {
        if (InfoUtil.checkAvailable(info))
        {
            this._info = info;
            this._awardDef = AwardDefined.GetInstance().getDefinition(info.definition.awardId);
            if (this._awardDef && this._awardDef.costList)
            {
                this.goldImg.source = info.definition.iconName + ResSuffixName.PNG;
                this.goldNum.text = this._awardDef.name;
                this.goldCount.text = this._awardDef.des;
                for (let def of this._awardDef.costList)
                {
                    if (def.type == CostType.RMB)
                    {
                        this.goldBtn.label = def.count / 100 + "元";
                    }
                }
            }
        }
    }

    private buy()
    {
        ChannelManager.PaySend(this._info.id);
        // if (this._awardDef)
        // {
        //     let def: AwardInfoDefinition;
        //     for (let cost of this._awardDef.costList)
        //     {
        //         if (cost.type == CostType.RMB)
        //         {
        //             def = cost;
        //         }
        //     }
        //     AlertManager.showConfirm(game.StringUtil.format("是否花费{0}元，购买{1}？", def.count, this._awardDef.name), ChannelManager.PaySend, null, this._info.id);
        // }
    }
}