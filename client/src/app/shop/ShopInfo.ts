class ShopInfo implements IHaveDefintionInfo
{
	private _id: number = 0;
	public get id(): number
	{
		return this._id;
	}
	public set id(value: number)
	{
		this._id = value;
		this._definition = table.PayListById[value];
	}
	private _definition: table.IPayListDefine
	public get definition(): table.IPayListDefine
	{
		return this._definition;
	}
	public set definition(value: table.IPayListDefine)
	{
		this._definition = value;
	}
}