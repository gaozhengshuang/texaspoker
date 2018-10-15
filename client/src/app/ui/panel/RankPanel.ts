/**
 * 排行榜面板
 */
class RankPanel extends BasePanel
{
	public rankTypeTab: TabComponent;
	public listTypeTab: TabComponent;
	public listTabBg: eui.Image;
	public rankList: eui.List;
	public rankScroller: eui.Scroller;
	public rankGroup: eui.Group;

	private _currentRankType: number;
	private _currentListType: number;
	private _currentRankListInfo: RankListInfo;

	public constructor()
	{
		super();
		this.isTween = false;
		this.setSkinName(UIModuleName.RankPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.panelAlignType = PanelAlignType.Left_Center;
		this.rankTypeTab.build(TabComponent.CreatData(["财富", "等级", "VIP"], [this.rankGroup, this.rankGroup, this.rankGroup], TabButtonType.SmallOf3));
		this.rankTypeTab.isTween = false;
		this.listTypeTab.build(TabComponent.CreatData(["全部", "好友"], [this.rankGroup, this.rankGroup], TabButtonType.SubOf2));
		this.listTypeTab.isTween = false;
		UIUtil.listRenderer(this.rankList, this.rankScroller, RankItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this._currentRankType = this.rankTypeTab.lastIndex == undefined ? 0 : this.rankTypeTab.lastIndex;
		this._currentListType = this.listTypeTab.lastIndex == undefined ? 0 : this.listTypeTab.lastIndex;
		this.rankTypeTab.init(this._currentRankType);
		this.listTypeTab.init(this._currentListType);
		this.setEnterAnime();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.rankTypeTab.tabChangeEvent.addListener(this.onRankTypeTabTap, this);
		this.listTypeTab.tabChangeEvent.addListener(this.onListTypeTabTap, this);
		RankManager.getRankListEvent.addListener(this.getRankList, this);
		UIManager.onPanelCloseEvent.addListener(this.setOutAnime, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.rankTypeTab.tabChangeEvent.removeListener(this.onRankTypeTabTap, this);
		this.listTypeTab.tabChangeEvent.removeListener(this.onListTypeTabTap, this);
		RankManager.getRankListEvent.removeListener(this.getRankList, this);
		UIManager.onPanelCloseEvent.removeListener(this.setOutAnime, this);
		this.rankScroller.stopAnimation();
	}

	private getRankList(type: number)
	{
		UIUtil.writeListInfo(this.rankList, this._currentRankListInfo.list, "roleId", true);
	}

	private onRankTypeTabTap(index: number)
	{
		this._currentRankType = index;
		this._currentListType = RankListType.All;
		this.listTypeTab.setSelectIndex(0);
		this.reqRankList();
		this.rankScroller.stopAnimation();
		this.rankScroller.viewport.scrollV = 0;
	}
	private onListTypeTabTap(index: number)
	{
		this._currentListType = index;
		this.rankScroller.stopAnimation();
		this.rankScroller.viewport.scrollV = 0;
	}
	/**
	 * 发送排行榜请求
	 */
	private reqRankList()
	{
		let type = this.getListType(this._currentRankType, this._currentListType);
		this._currentRankListInfo = RankManager.getRankListInfo(type);
		if (RankManager.isRefreshRank(this._currentRankListInfo))
		{
			RankManager.reqRankList(type);
		}
		else
		{
			this.getRankList(type);
		}
	}

	/**
	 * 计算发送得的type类型
	 */
	private getListType(rankType: number, listType: number): number
	{
		if (rankType == RankTabType.Vip)
		{
			this.listTypeTab.visible = false;
			this.listTabBg.visible = false;
			this.rankGroup.y = 200;
			this.rankGroup.height = 620;
			this.rankList.height = 620;
			this.rankScroller.height = 620;
			return RankType.Vip;
		}
		else
		{
			this.listTypeTab.visible = true;
			this.listTabBg.visible = true;
			this.rankGroup.y = 270;
			this.rankGroup.height = 550;
			this.rankList.height = 550;
			this.rankScroller.height = 550;
			return rankType * 2 + listType + 1;
		}
	}

	private setEnterAnime()
	{
		this.removeAnime();
		this.left = -this.width;
		egret.Tween.get(this).to({ left: 20 }, 200).to({ left: 0 }, 120, egret.Ease.backIn);
	}
	private setOutAnime(panelName: string)
	{
		if (panelName == UIModuleName.RankPanel)
		{
			this.removeAnime();
			this.left = 0;
			egret.Tween.get(this).to({ left: -this.width }, 400, egret.Ease.backOut).call(this.tweenClose, this);
		}
	}
	private removeAnime()
	{
		egret.Tween.removeTweens(this);
	}

	protected onCloseBtnClickHandler(event: egret.TouchEvent)
	{
		if (event)
		{
			if (event.target instanceof eui.Button)
			{
				SoundManager.playEffect(MusicAction.close);
			}
		}
		if (!this.isTweenCloseing) //是否正在播放关闭的动画
		{
			this.onTweenOver(); //打开面板动画，还未播放完毕，就触发了关闭 则清除打开状态
			this.isTweenCloseing = true;
			this.setOutAnime(UIModuleName.RankPanel);
		}
	}
}
enum RankTabType
{
	/**
	 * 财富
	 */
	Gold = 0,
	/**
	 * 等级
	 */
	Level = 1,
	/**
	 * Vip
	 */
	Vip = 2
}
enum RankListType
{
	/**
	 * 所有
	 */
	All = 0,
	/**
	 * 朋友
	 */
	Friend = 1
}
