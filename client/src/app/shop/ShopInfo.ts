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
		this._definition = ShopDefined.GetInstance().getDefinition(value);
	}
	private _definition: ShopDefinition
	public get definition(): ShopDefinition
	{
		return this._definition;
	}
	public set definition(value: ShopDefinition)
	{
		this._definition = value;
	}
}