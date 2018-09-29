/**
 * 邮箱面板
 */
class MailPanel extends BasePanel
{
	public tab: TabComponent;
	public mailList: eui.List;
	public mailScroller: eui.Scroller;
	public noMailLabel: eui.Scroller;
	public mailGroup: eui.Group;
	private _lastIdx:number;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.MailPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.tab.build(TabComponent.CreatData(["系统邮箱", "私人邮箱"], [this.mailGroup, this.mailGroup], TabButtonType.SmallOf2));
		this.tab.isTween = false;
		UIUtil.listRenderer(this.mailList, this.mailScroller, MailItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
		this.addRedPoint();
        this.maskAlpha = 0;
	}
	private addRedPoint()
	{
		let btn: eui.RadioButton = this.tab.getBtnByLabel("系统邮箱");
		UIUtil.addSingleNotify(btn, NotifyType.Mail_HaveNewSystem, 3, 78);
		btn = this.tab.getBtnByLabel("私人邮箱");
		UIUtil.addSingleNotify(btn, NotifyType.Mail_HaveNewPlayer, 3, 78);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.tab.init(0);
		MailManager.unReadCount = 0;
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.tab.tabChangeEvent.addListener(this.onBarItemTap, this);
		MailManager.getMailListEvent.addListener(this.getMailList, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.tab.tabChangeEvent.removeListener(this.onBarItemTap, this);
		MailManager.getMailListEvent.removeListener(this.getMailList, this);
		this.mailScroller.stopAnimation();
	}

	private getMailList()
	{
		this.refreshUI();
	}
	/**
     * 渲染信息
    */
	private refreshUI()
	{
		this.noMailLabel.visible = MailManager.mailList.length == 0;
		let list: MailInfo[] = MailManager.getListByType(this._lastIdx);
		UIUtil.writeListInfo(this.mailList, list, "Id");
	}

	private onBarItemTap(index: number): void
	{
		this._lastIdx = index;
		let list: MailInfo[] = MailManager.getListByType(index);
		if (list)
		{
			this.noMailLabel.visible = list.length == 0;
			UIUtil.writeListInfo(this.mailList, list, "Id", false, SortUtil.MailDateSort);
		}
		else
		{
			this.noMailLabel.visible = true;
		}
		this.mailScroller.stopAnimation();
	}

}