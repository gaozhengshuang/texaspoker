/**
 * 游戏规则面板
 */
class GameRulePanel extends BasePanel
{
	public gameRullTab: TabComponent;
	public RuleIntroGroup: eui.Group;
	public cardTypeGroup: eui.Group;
	public funcKeyIntroGroup: eui.Group;
	public resizeGroup: eui.Group;

	public resizeScrollerGroup: eui.Group;
	public resizeScroller: eui.Scroller;
	public resizeBottomGroup: eui.Group;

	public cardGroup: eui.Group;
	public cardScroller: eui.Scroller;
	public funcKeyIntroScroller: eui.Scroller;

	public img1: eui.Image;
	public img2: eui.Image;
	public img3: eui.Image;
	public img4: eui.Image;
	public img5: eui.Image;
	public img6: eui.Image;
	public img7: eui.Image;

	private _anime: PanelAnime;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.GameRulePanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this._anime = new PanelAnime(this);
		this.maskAlpha = 0;
		this.isCloseButtonTween = true;
		//创建标签页
		let array: Array<eui.Group> = new Array<eui.Group>();
		array.push(this.RuleIntroGroup);
		array.push(this.cardTypeGroup);
		array.push(this.resizeGroup);
		this.gameRullTab.build(TabComponent.CreatData(["玩法介绍", "牌型介绍", "功能键介绍"], array, TabButtonType.BigOf3));
		this.resizeScroller.viewport = this.resizeScrollerGroup;
		UIManager.pushResizeScroller(this.resizeScroller, 820);
		UIManager.pushResizeGroup(this.resizeBottomGroup);
		this.cardScroller.viewport = this.cardGroup;
		UIManager.pushResizeScroller(this.cardScroller, 1020);
		this.funcKeyIntroScroller.viewport = this.funcKeyIntroGroup;
		UIManager.pushResizeScroller(this.funcKeyIntroScroller, 1020);
	}

	public init(appendData: any)
	{
		super.init(appendData);
		this.gameRullTab.init(0);
		this.onTabTap(0);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this._anime.onEnable();
		this.gameRullTab.tabChangeEvent.addListener(this.onTabTap, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this._anime.onDisable();
		this.gameRullTab.tabChangeEvent.addListener(this.onTabTap, this);
	}
	protected showPrePanelName()
	{
		if (this.prevPanelName == UIModuleName.GamblingPanel)
		{
			UIManager.showPanel(this.prevPanelName, true);
		}
		else
		{
			UIManager.showPanel(this.prevPanelName);
		}
	}
	private onTabTap(index: number)
	{
		switch (index) 
		{
			case 0:
				this.resizeScroller.viewport.scrollV = 0;
				break;
			case 1:
				this.cardScroller.viewport.scrollV = 0;
				break;
			case 2:
				this.funcKeyIntroScroller.viewport.scrollV = 0;
				break;
		}
	}
	protected onCloseBtnClickHandler(event: egret.TouchEvent): void
	{
		this._anime.onCloseBtnClickHandler(event);
	}
}