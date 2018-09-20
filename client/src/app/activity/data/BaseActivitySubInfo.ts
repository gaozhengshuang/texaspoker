/**
 * 子活动信息
 */
abstract class BaseActivitySubInfo<T extends BaseActivitySubDefnition> extends BaseServerValueInfo implements IHaveDefintionInfo
{
	protected _id: number;
	public get id(): number
	{
		return this._id;
	}
	public set id(value: number)
	{
		this._id = value;
		if (this.isUnSetedDefnition)
		{
			this.trySetDefinition();
		}
	}
	protected _subId: number;
	/**
	 * 子ID
	 */
	public get subId(): number
	{
		return this._subId;
	}
	public set subId(value: number)
	{
		this._subId = value;
		if (this.isUnSetedDefnition)
		{
			this.trySetDefinition();
		}
	}

	protected _definition: T;
	/**
	 * 映射的配置表数据
	 */
	public get definition()
	{
		return this._definition;
	}
	/**
	 * 是否未设置过配置数据
	 */
	protected get isUnSetedDefnition(): boolean
	{
		return this._id > 0 && this._subId > 0 && !this._definition;
	}
	/**
	 * 此方法需要在子类重写 设置信息配置表映射
	 */
	protected trySetDefinition()
	{

	}
}