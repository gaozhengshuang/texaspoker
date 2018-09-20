/**
 * 多条消息的组合通知
 */
class MultiMessageNotifyHandle extends BaseNotifyHandle
{
	private _types: Array<NotifyType>;

	constructor(params: Array<NotifyType>)
	{
		super(params[0]);
		this._types = params;
	}
	protected init()
	{
		super.init();
		NotifyManager.OnNotifyValueChanged.addListener(this.notifyManager_OnNotifyValueChanged, this);
	}
	private notifyManager_OnNotifyValueChanged(data: any)
	{
		if (data.type != this.type && this._types && this._types.indexOf(data.type) != -1)
		{
			this.dispatchNotify();
		}
	}
	public get count(): number
	{
		let result: number = 0;
		if (this._types.length > 1)
		{
			for (let i: number = 1; i < this._types.length; i++)
			{
				result += NotifyManager.getCount(this._types[i]);
			}
		}
		return result;
	}
}