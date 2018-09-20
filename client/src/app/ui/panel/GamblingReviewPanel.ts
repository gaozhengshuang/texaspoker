/**
 * 牌局上局回顾面板
*/
class GamblingReviewPanel extends BasePanel
{
    public reviewScroller: eui.Scroller;
    public reviewList: eui.List;
    public hasReviewGroup: eui.Group;
    public noReviewGroup: eui.Group;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.GamblingReviewPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        UIUtil.listRenderer(this.reviewList, this.reviewScroller, GamblingReviewItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.reviewScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.reqReviewInfo();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        GamblingManager.gamblingReviewHandler.onGetAllPlayerInfoEvent.addListener(this.setPanelInfo, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        GamblingManager.gamblingReviewHandler.onGetAllPlayerInfoEvent.removeListener(this.setPanelInfo, this);
    }

    /**
     * 设置面板数据
    */
    private setPanelInfo()
    {
        if (GamblingManager.gamblingReviewHandler.reviewInfoList.length > 0)
        {
            this.hasReviewGroup.visible = true;
            this.noReviewGroup.visible = false;
            if (GamblingManager.gamblingReviewHandler.reviewInfoList && GamblingManager.gamblingReviewHandler.reviewInfoList.length > 0)
            {
                UIUtil.writeListInfo(this.reviewList, GamblingManager.gamblingReviewHandler.reviewInfoList, "roleId");
            }
        } else
        {
            this.hasReviewGroup.visible = false;
            this.noReviewGroup.visible = true;
        }
    }
    /**
     * 发送获取上局回顾信息请求
    */
    private reqReviewInfo()
    {
        if (this.panelData)
        {
            GamblingManager.gamblingReviewHandler.reqReviewInfo(this.panelData);
        }
    }
}