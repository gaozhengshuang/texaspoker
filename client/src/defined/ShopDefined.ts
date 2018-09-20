/**
 * 支付配置列表定义
 * */
class ShopDefined extends BaseDefined<ShopDefinition>
{
	private static readonly ShoppingConfig: string = "payList";
	private static _instance: ShopDefined;

	public static GetInstance(): ShopDefined
	{
		if (!ShopDefined._instance)
		{
			ShopDefined._instance = new ShopDefined();
		}
		if (DefinedManager.IsParsed(ShopDefined.ShoppingConfig) == false)
		{
			ShopDefined._instance.initialize();
		}
		return ShopDefined._instance;
	}
	private initialize()
	{
		this.dataList = DefinedManager.GetData(ShopDefined.ShoppingConfig) as Array<ShopDefinition>;
	}
	public getDefinitionByAwardId(id:number):ShopDefinition
	{
		if(this.dataList)
		{
			for(let def of this.dataList)
			{
				if(def.awardId == id)
				{
					return def;
				}
			}
		}
		return null;
	}
	/**
	 * 指定的awardid是否是指定类型
	 */
	public isType(awardId: number, type:ShopType):boolean
	{
		for (let def of this.dataList)
		{
			if (def.awardId == awardId && def.type == type)
			{
				return true;
			}
		}
		return false;
	}
}


/**
 * 支付配置定义
 * */
class ShopDefinition implements IBaseDefintion
{
	public id: number;
	public type: ShopType;
	public ignoreInPanel: number;
	public iconName: string;
	public isWhiteView: number;
	public awardId: number;
}