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
            this._awardDef = table.AwardById[info.definition.awardId];
            if (this._awardDef && this._awardDef.CostId)
            {
                this.diamondImg.source = info.definition.iconName + ResSuffixName.PNG;
                this.diamondNum.text = this._awardDef.Name;
                for (let i: number = 0; i < this._awardDef.CostType.length; i++)
                {
                    if (this._awardDef.CostType[i] == CostType.RMB)
                    {
                        this.diamondBtn.label = this._awardDef.CostNum[i] / 100 + "元";
                        break;
                    }
                }
            }
        }
    }

    private buy()
    {
        ChannelManager.PaySend(this._info.id);
        if (this._awardDef)
        {
            let count: number = 0;
            for (let i: number = 0; i < this._awardDef.CostType.length; i++)
            {
                if (this._awardDef.CostType[i] == CostType.RMB)
                {
                    count = this._awardDef.CostNum[i];
                    break;
                }
            }
            AlertManager.showConfirm(game.StringUtil.format("是否花费{0}元，购买{1}？", count, this._awardDef.Name), ChannelManager.PaySend, null, this._info.id);
        }
    }
}