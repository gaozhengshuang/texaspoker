/**
 * 百人大战胜负走势面板
*/
class HundredWarTrendPanel extends BasePanel
{
    public recordGroup: eui.Group;
    public noRecordGroup: eui.Group;
    public recordList: eui.List;
    public recordScroller: eui.Scroller;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.HundredWarTrendPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.recordList, this.recordScroller, HundredWarTrendItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.recordScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.showGroup();
    }
    public init(appendData: any)
    {
        super.init(appendData);
        HundredWarManager.panelHandler.reqHundredWarTrendList();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        HundredWarManager.panelHandler.OnGetHundredWarTrendListEvent.addListener(this.refreshUI, this);
    }
    private refreshUI()
    {
        if (HundredWarManager.panelHandler.HundredWarTrendList.length > 0)
        {
            this.showGroup(this.recordGroup);
            UIUtil.writeListInfo(this.recordList, HundredWarManager.panelHandler.HundredWarTrendList);
        }
        else
        {
            this.showGroup(this.noRecordGroup);
        }
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        HundredWarManager.panelHandler.OnGetHundredWarTrendListEvent.removeListener(this.refreshUI, this);
    }

    private showGroup(group?: eui.Group)
    {
        this.recordGroup.visible = false;
        this.noRecordGroup.visible = false;
        if (group)
        {
            group.visible = true;
        }
    }
}