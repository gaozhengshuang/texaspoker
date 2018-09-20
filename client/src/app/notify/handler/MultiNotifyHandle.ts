/**
 * 有参数的基本通知
 */
abstract class MultiNotifyHandle extends BaseNotifyHandle
{
	/**
	 * 参数列表，列表里面的参数是对等的
	 */
	protected _params: game.Map<any, number> = new game.Map<any, number>();

	public constructor(type: NotifyType)
	{
		super(type);
	}
	/**
	* 根据id获取数量,需要重写
	*/
	public getCountByParams(params: any): number
	{
		return this._params.getValue(params);
	}
	public clearParams()
	{
		this._params.clear();
	}
	protected dispatchNotifyByParams(params: any)
	{
		NotifyManager.dispatchNotify(this.type, params);
	}
	public setParams(params: any, count:number = 0)
	{
		this._params.add(params, count);
	}
	/**
	 * 获取总count
	 */
	public get totalCount():number
	{
		let values: Array<number> = this._params.getValues();
		let count: number = 0;
		for (let i: number = 0; i < values.length; i++)
		{
			if (values[i] != undefined)
			{
				count += values[i];
			}
		}
		return count;
	}
	protected dispatchNotify()
	{
		throw new Error("这个方法不能被调用，请调用上面的dispatchNotifyByParams(string id)");
	}
}