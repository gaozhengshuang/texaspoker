/**
 * 新人礼面板
 */
class NewGiftPanel extends BaseActivityPanel
{
	public newGiftScroller: eui.Scroller;
	public newGiftList: eui.List;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.NewGiftPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		UIUtil.listRenderer(this.newGiftList, this.newGiftScroller, NewGiftItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
	}

	public init(appendData: any)
	{
		super.init(appendData);
		this.refresh();
	}

	private refresh()
	{
		UIUtil.writeListInfo(this.newGiftList, ActivityManager.pilePrizeHandler.getShowSubList(this.activityInfo.id), "subId", false);
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.addListener(this.onTake, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		ActivityManager.pilePrizeHandler.takePrizeCompleteEvent.removeListener(this.onTake, this);
	}

	private onTake(id: number)
	{
		if (id == this.activityInfo.id)
		{
			this.refresh();
			if (ActivityManager.pilePrizeHandler.isTakeAllAward(this.activityInfo.id) && UserManager.userInfo.bindRoleId != 0)
			{
				let info: PilePrizeItemInfo = ActivityManager.pilePrizeHandler.getExtraAward(this.activityInfo.id);
				if (InfoUtil.checkAvailable(info) && !info.isTaken)
				{
					ActivityManager.ReqGetActivityAward(info.id, info.subId, false);
					UIManager.showPanel(UIModuleName.BringAwardComPanel, { awardId: info.definition.awardId, des: "恭喜你完成所有新人礼，你绑定了好友的邀请码，你额外获得：", thisObj: this });
				}
			}
		}
	}
}