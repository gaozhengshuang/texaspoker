/**
 * 兑奖面板
 */
class AwardsPanel extends BasePanel
{
	public tabComponent: TabComponent;
	public awardsGroup: eui.Group;
	public awardsRecordGroup: eui.Group;

	public awardsScroller: eui.Scroller;
	public awardsList: eui.List;

	public recordScroller: eui.Scroller;
	public recordList: eui.List;

	public goldenBeanLabel: eui.Label;

	private _recordList: Array<AwardRecordInfo>;
	private readonly _startId: number = 0;
	private readonly _count: number = 30;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.AwardsPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.tabComponent.isTween = false;
		this.tabComponent.build(TabComponent.CreatData(["奖品兑换", "兑换记录"], [this.awardsGroup, this.awardsRecordGroup], TabButtonType.SmallOf2));
		UIUtil.listRenderer(this.awardsList, this.awardsScroller, GoldenBeanAwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
		UIUtil.listRenderer(this.recordList, this.recordScroller, GoldenBeanRecordItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this._recordList = null;
		this.tabComponent.init(0);
		this.refresh();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		ItemManager.itemReduceEvent.addListener(this.refresh, this);
		this.tabComponent.tabChangeEvent.addListener(this.onTabChange, this);
		AwardManager.getAwardRecordEvent.addListener(this.refreshRecordList, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		ItemManager.itemReduceEvent.removeListener(this.refresh, this);
		this.tabComponent.tabChangeEvent.removeListener(this.onTabChange, this);
		AwardManager.getAwardRecordEvent.removeListener(this.refreshRecordList, this);
	}
	private refresh()
	{
		this.goldenBeanLabel.text = ItemManager.getItemNumById(ItemFixedId.GoldenBean, ItemManager.itemList).toString();
		UIUtil.writeListInfo(this.awardsList, GoldenBeanAwardDefined.GetInstance().dataList, "id", false);
	}
	private refreshRecordList(list: Array<AwardRecordInfo>)
	{
		this._recordList = list;
		UIUtil.writeListInfo(this.recordList, this._recordList, "id", false);
	}
	private onTabChange(index: number)
	{
		if (index == 1)
		{
			this.recordScroller.stopAnimation();
			this.recordScroller.viewport.scrollV = 0;
			if (!this._recordList)
			{
				AwardManager.reqAwardRecord(AwardLogId.GoldenBean, this._startId, this._count);
			}
			else
			{
				UIUtil.writeListInfo(this.recordList, this._recordList, "id", false, SortUtil.AwardRecoedSort);
			}
		}
	}
}