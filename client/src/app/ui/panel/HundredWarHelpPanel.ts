/**
 * 百人大战帮助面板
 */
class HundredWarHelpPanel extends BasePanel
{

	public playHelpGroup: eui.Group;
	public uiHelpGroup: eui.Group;
	public prizeHelpGroup: eui.Group;
	public tab: TabComponent;

	public imgLabelGroup: eui.Group;
	public imgGroup: eui.Group;
	public labelGroup: eui.Group;

	public playwayLabel: eui.Label;
	public playHelpScroller: eui.Scroller;

	public uiHelpBg: eui.Image;
	public uiHelpScroller: eui.Scroller;

	public prizeLabel: eui.Label;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.HundredWarHelpPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		let array = new Array<eui.Group>(this.playHelpGroup, this.uiHelpGroup, this.prizeHelpGroup);
		this.tab.build(TabComponent.CreatData(["玩法说明", "界面说明", "奖池说明"], array, TabButtonType.SmallOf3));
		this.tab.isTween = false;
		this.setLabel(this.playwayLabel, TextFixedId.HundredWarRule);
		this.playHelpScroller.viewport = this.imgLabelGroup;
		this.uiHelpScroller.viewport = this.imgGroup;
		this.maskAlpha = 0;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.tab.init(0);
		this.resetScroller();
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.tab.tabChangeEvent.addListener(this.onBarItemTap, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.tab.tabChangeEvent.removeListener(this.onBarItemTap, this);
	}

	private setLabel(label: eui.Label, id: TextFixedId)
	{
		let def: table.ITextDefine = table.TextById[id];
		if (def)
		{
			if (def.IsRichTxt)
			{
				label.textFlow = game.TextUtil.parse(TextDefined.GetInstance().getText(def));
			}
			else
			{
				label.text = TextDefined.GetInstance().getText(def);
			}
		}
	}

	private onBarItemTap(index: number)
	{
		if (index == 0)
		{
			this.resetScroller(this.playHelpScroller);
		}
		if (index == 1)
		{
			if (!this.uiHelpBg.texture)
			{
				UIUtil.loadBg(ResFixedFileName.HundredWar_Help, this.uiHelpBg);
			}
			this.resetScroller(this.uiHelpScroller);
		}
		if (index == 2)
		{
			if (game.StringUtil.isNullOrEmpty(this.prizeLabel.text))
			{
				this.setLabel(this.prizeLabel, TextFixedId.HundredWarPrize);
			}
		}
	}

	private resetScroller(scroller?: eui.Scroller)
	{
		if (scroller)
		{
			scroller.stopAnimation();
			scroller.viewport.scrollV = 0;
		}
		else
		{
			this.playHelpScroller.stopAnimation();
			this.playHelpScroller.viewport.scrollV = 0;
			this.uiHelpScroller.stopAnimation();
			this.uiHelpScroller.viewport.scrollV = 0;
		}
	}
}