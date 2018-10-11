/**
 * 支付配置列表定义
 * */
class ShopDefined
{
	private static _instance: ShopDefined;

	public static GetInstance(): ShopDefined
	{
		if (!ShopDefined._instance)
		{
			ShopDefined._instance = new ShopDefined();
		}
	
		return ShopDefined._instance;
	}
	public getDefinitionByAwardId(id:number):table.IPayListDefine
	{
		if(table.PayList)
		{
			for(let def of table.PayList)
			{
				if(def.AwardId == id)
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
		for (let def of table.PayList)
		{
			if (def.AwardId == awardId && def.Type == type)
			{
				return true;
			}
		}
		return false;
	}
}