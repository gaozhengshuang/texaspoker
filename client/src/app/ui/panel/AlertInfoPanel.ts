/**
 * 提示框面板
 */
class AlertInfoPanel extends BasePanel
{
	public subTxt: eui.Label;
	public infoTxt: eui.Label;
	public confirmBtn: eui.Button;
	public cancelBtn: eui.Button;
	public group: eui.Group;

	public constructor()
	{
		super();
		this.layer = UILayerType.Tips;
		this.setSkinName(UIModuleName.AlertInfoPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.infoTxt.text = qin.StringConstants.Empty;
		this.subTxt.text = qin.StringConstants.Empty;
		this.confirmBtn.label = "确定";
		this.cancelBtn.label = "取消";
		if (appendData)
		{
			if (appendData.subTitle)
			{
				this.subTxt.text = appendData.subTitle;
			}
			if (appendData.message)
			{
				this.infoTxt.textFlow = qin.TextUtil.parse(appendData.message);
			}
			if (appendData.confirmLabel)
			{
				this.confirmBtn.label = appendData.confirmLabel;
			}
			if (appendData.cancelLabel)
			{
				this.cancelBtn.label = appendData.cancelLabel;
			}
			if (appendData.alignment)
			{
				this.infoTxt.textAlign = appendData.alignment;
			}
			if (appendData.isSingle)
			{
				if (this.cancelBtn.parent)
				{
					this.cancelBtn.parent.removeChild(this.cancelBtn);
				}
			}
			else
			{
				this.group.addChildAt(this.cancelBtn, 0);
			}
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}

	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
		this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
		if (this.panelData instanceof AlertInfo)
		{
			qin.PoolUtil.PutObject(this.panelData);
		}
	}
	private onConfirmClick(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		if (this.panelData && this.panelData.OnConfirm)
		{
			qin.FuncUtil.invoke(this.panelData.OnConfirm, this.panelData.thisObject, this.panelData.confirmParam);
		}
		super.onCloseBtnClickHandler(null);
	}
	private onCancelClick(event: egret.TouchEvent)
	{
		SoundManager.playEffect(MusicAction.buttonClick);
		if (this.panelData && this.panelData.OnCancel)
		{
			qin.FuncUtil.invoke(this.panelData.OnCancel, this.panelData.thisObject, this.panelData.cancelParam);
		}
		super.onCloseBtnClickHandler(null);
	}
}
class AlertInfo implements qin.IPoolObject
{
	public thisObject: any;
	/// <summary>
	/// 标题
	/// </summary>
	public title: string = qin.StringConstants.Empty;
	/// <summary>
	/// 副标题
	/// </summary>
	public subTitle: string = qin.StringConstants.Empty;
	/// <summary>
	/// 消息
	/// </summary>
	public message: string = qin.StringConstants.Empty;
	/// <summary>
	/// 确定按钮文本
	/// </summary>
	public confirmLabel: string = qin.StringConstants.Empty;
	/// <summary>
	/// 取消按钮文本
	/// </summary>
	public cancelLabel: string = qin.StringConstants.Empty;
	/// <summary>
	/// 确定回调
	/// </summary>
	public OnConfirm: Function = null;
	/// <summary>
	/// 取消回调
	/// </summary>
	public OnCancel: Function = null;
	/// <summary>
	/// 确定回调参数
	/// </summary>
	public confirmParam: any = null;
	/// <summary>
	/// 取消回调参数
	/// </summary>
	public cancelParam: any = null;
	/// <summary>
	/// 拓展数据
	/// </summary>
	public extraData: any = null;
	/// <summary>
	/// 文本对齐
	/// </summary>
	public alignment: string = egret.HorizontalAlign.CENTER;
	/**
	 * 是否是单按钮
	 */
	public isSingle: boolean = true;

	public reset()
	{
		this.thisObject = null;
		this.title = qin.StringConstants.Empty;
		this.subTitle = qin.StringConstants.Empty;
		this.message = qin.StringConstants.Empty;
		this.confirmLabel = qin.StringConstants.Empty;
		this.cancelLabel = qin.StringConstants.Empty;
		this.OnConfirm = null;
		this.OnCancel = null;
		this.confirmParam = null;
		this.cancelParam = null;
		this.extraData = null;
		this.alignment = egret.HorizontalAlign.CENTER;
		this.isSingle = true;
	}
}