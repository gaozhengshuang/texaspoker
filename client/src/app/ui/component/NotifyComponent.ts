/**
 * 通知组件
 */
class NotifyComponent extends BaseComponent<NotifyInfo>
{
	public numLabel: eui.Label;
	public point: eui.Image;

	public info: NotifyInfo;
	public type: NotifyType = NotifyType.Null;

	public init(data: NotifyInfo)
	{
		super.init(data);
		if (this.bindData)
		{
			this.visible = false;
			this.type = this.bindData.type;
			if (this.bindData.top != undefined)
			{
				this.top = this.bindData.top;
			}
			else
			{
				this.top = 5;
			}
			if (this.bindData.right != undefined)
			{
				this.right = this.bindData.right;
			}
			else
			{
				this.right = 5; //默认右上
			}
			if (this.bindData.attachObject)
			{
				this.bindData.attachObject.addChild(this);
			}
		}
		this.refresh();
	}
	private refresh()
	{
		this.checkVisible();
	}
	protected rendererStart(event: egret.Event)
	{
		super.rendererStart(event);
		this.refresh();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		NotifyManager.OnNotifyValueChanged.addListener(this.notifyManager_onNotifyValueChanged, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		NotifyManager.OnNotifyValueChanged.removeListener(this.notifyManager_onNotifyValueChanged, this);
	}
	private notifyManager_onNotifyValueChanged(data: any)
	{
		if (this.type == data.type)
		{
			if (data.params != undefined)
			{
				if (data.params == this.bindData.params)
				{
					this.showByCount(data.count);
				}
			}
			else
			{
				this.showByCount(data.count);
			}
			this.showNumLabel(data.count);
		}
	}
	private checkVisible()
	{
		let count: number = NotifyManager.getCount(this.type, this.bindData.params);
		this.showByCount(count);
		this.showNumLabel(count);
	}
	private showByCount(count: number)
	{
		this.visible = count > 0;
	}
	private showNumLabel(count: number)
	{
		if (this.bindData.isShowNum)
		{
			this.numLabel.visible = true;
			this.numLabel.text = count.toString();
		}
		else
		{
			this.numLabel.visible = false;
		}
	}
}