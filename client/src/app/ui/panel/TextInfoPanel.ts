/**
 * 文本信息面板
 */
class TextInfoPanel extends BasePanel
{
	public txtGroupScroller: eui.Scroller;
	public txtList: eui.List;
	public txtLabel: eui.Label;
	public txtGroup: eui.Group;
	public titleLabel: eui.Label;
	public titleImg: eui.Image;
	private _contentList: Array<string>;

	private _def: table.ITextDefine;

	private _txtCount: number = 24;

	public _lastShowContainer: any;

	public constructor(isNewSkin: boolean)
	{
		super();
		this._contentList = new Array<string>();
		if (!isNewSkin)
		{
			this.setSkinName(UIModuleName.TextInfoPanel);
		}
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.isMaskClickClose = true;
		this.maskAlpha = 0.5;
		this.txtGroupScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
	}
	public init(appendData: any)
	{
		if (this._lastShowContainer)
		{
			if (appendData == this.panelData)
			{
				this._lastShowContainer.visible = true;
			}
			else
			{
				this._lastShowContainer.visible = false;
			}
		}
		else
		{
			this.txtList.visible = false;
			this.txtGroup.visible = false;
		}
		super.init(appendData);
		if (this.panelData instanceof table.TextDefine)
		{
			this._def = this.panelData;
		}
		else if (typeof this.panelData == "number")
		{
			this._def = table.TextById[this.panelData];
		}
		this.contentContainerOper();
	}
	private contentContainerOper()
	{
		if (this._def)
		{
			if (this._def.IsRichTxt)
			{
				this.txtGroupScroller.viewport = this.txtGroup;
			}
			else
			{
				this.txtGroupScroller.viewport = this.txtList;
			}
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		UIUtil.hideScrollerBar(this.txtGroupScroller, true, false);
		if (this._def)
		{
			if (this._def.Url)
			{
				this.titleImg.source = this._def.Url;
			}
			else
			{
				if (this.titleLabel)
				{
					this.titleLabel.text = this._def.Title;
				}
			}
			if (!this._def.IsRichTxt)
			{
				this.txtList.visible = true;
				this._lastShowContainer = this.txtList;
				this.contentOper();
				UIUtil.listRenderer(this.txtList, this.txtGroupScroller, TextRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, this._contentList, true);
			}
			else
			{
				this.txtLabel.textFlow = game.TextUtil.parse(this._def.Text);
				this.txtGroup.visible = true;
				this._lastShowContainer = this.txtGroup;
			}
		}
		this.txtGroupScroller.stopAnimation();
		this.txtGroupScroller.viewport.scrollV = 0;
	}
	private contentOper()
	{
		game.ArrayUtil.Clear(this._contentList);
		let str: string = this._def.Text;
		let splitStr: string = "\n";
		// if (this._def.isRichTxt)
		// {
		// 	splitStr = "<br/>"
		// }
		if (str.indexOf(splitStr) == -1)
		{
			this._contentList.push(str);
		}
		else
		{
			let index: number = 0;
			let tmpStr: string = game.StringConstants.Empty;
			let line: number = 0;
			let oneStr: string;
			let reaLine: number;
			while (str.length > 0)
			{
				index = str.indexOf(splitStr);
				if (index != -1)
				{
					// if (this._def.isRichTxt)
					// {
					// 	oneStr = str.slice(0, index + 5);
					// 	str = str.slice(index + 5, str.length);
					// }
					// else
					// {
					oneStr = str.slice(0, index + 1);
					str = str.slice(index + 1, str.length);
					// }
					if (oneStr.length > this._txtCount)
					{
						while (oneStr.length > 0)
						{
							tmpStr = oneStr.slice(0, this._txtCount) + splitStr;
							this._contentList.push(tmpStr);
							oneStr = oneStr.substring(this._txtCount, oneStr.length);
						}
					}
					else
					{
						this._contentList.push(oneStr);
					}
				}
				else
				{
					this._contentList.push(str);
					break;
				}
			}
		}
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
	}
}