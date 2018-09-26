/**
 * 商城钻石列表
*/
class DiamondItemComponent extends BaseComponent<ShopInfo>{
    public diamondImg: eui.Image;//钻石图片；
    public diamondNum: eui.Label;//钻石数量；
    public diamondBtn: eui.Button;//钻石（元）；

    private _info: ShopInfo;
    private _awardDef: table.IAwardDefine;

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);
    }

    protected onDisable(event: eui.UIEvent): void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);
        super.onDisable(event);
    }
    public init(info: ShopInfo)
    {
        if (InfoUtil.checkAvailable(info))
        {
            this._info = info;
            // this._awardDef = AwardDefined.GetInstance().getDefinition(info.definition.awardId); //move todo
            // if (this._awardDef && this._awardDef.costList)
            // {
            //     this.diamondImg.source = info.definition.iconName + ResSuffixName.PNG;
            //     this.diamondNum.text = this._awardDef.name;
            //     for (let def of this._awardDef.costList)
            //     {
            //         if (def.type == CostType.RMB)
            //         {
            //             this.diamondBtn.label = def.count / 100 + "元";
            //             break;
            //         }
            //     }
            // }
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