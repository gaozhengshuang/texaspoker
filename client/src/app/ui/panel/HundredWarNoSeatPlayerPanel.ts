/**
 * 百人大战无座玩家面板
*/
class HundredWarNoSeatPlayerPanel extends BasePanel
{
	/**
	 * 无座玩家人数
	*/
    public playerNumLabel: eui.Label;

    public userGroup: eui.Group;
    public noUserGroup: eui.Group;
    public userList: eui.List;
    public userScroller: eui.Scroller;

    public reqscroller: ReqScroller;

    private readonly _reqNum: number = 12;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.HundredWarNoSeatPlayerPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        UIUtil.listRenderer(this.userList, this.userScroller, HundredWarNoSeatItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.reqscroller = new ReqScroller(this.userScroller, this.userList, this._reqNum, this.reqInfo.bind(this));
        this.userScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.showGroup();
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.reqscroller.Clear();
        this.reqInfo();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.addListener(this.refreshUI, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.removeListener(this.refreshUI, this);
    }
    /**
     * 请求数据
     */
    private reqInfo()
    {
        HundredWarManager.panelHandler.reqHundredWarNoSeatInfo(this.reqscroller.index, this.reqscroller.reqNum);
    }
    /**
     * 刷新数据
     */
    private refreshUI(data)
    {
        this.reqscroller.init(new eui.ArrayCollection(data.userList), data.isBottom);
        if (data.playerNum > 0)
        {
            this.showGroup(this.userGroup)
            this.playerNumLabel.text = "当前无座玩家共有" + data.playerNum + "人";
            // UIUtil.writeListInfo(this.userList, HundredWarManager.panelHandler.hundredWarNoSeatList, "roleId", true, SortUtil.HundredWarNoSeatSort);
        }
        else
        {
            this.showGroup(this.noUserGroup);
        }
    }
    private showGroup(group?: eui.Group)
    {
        this.userGroup.visible = false;
        this.noUserGroup.visible = false;
        if (group)
        {
            group.visible = true;
        }
    }
}