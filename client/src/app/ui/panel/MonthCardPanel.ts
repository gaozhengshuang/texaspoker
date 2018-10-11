/**
 * 月卡面板
*/
class MonthCardPanel extends BasePanel
{
    public scroller: eui.Scroller;
    public list: eui.List;
    private _monthCardsList: Array<ShopInfo>;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.MonthCardPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this._monthCardsList = new Array<ShopInfo>();
        let info: ShopInfo;
        for (let i: number = 0; i < table.PayList.length; i++)
        {
            info = new ShopInfo();
            info.id = table.PayList[i].Id;
            if (info.definition && info.definition.Type == ShopType.MonthCard)
            {
                this._monthCardsList.push(info);
            }
        }
        UIUtil.listRenderer(this.list, this.scroller, MonthCardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.AUTO, null, true);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.refreshUI();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
    }

    /**
     * 重置面板
    */
    private refreshUI()
    {
        UIUtil.writeListInfo(this.list, this._monthCardsList, null);
    }
}