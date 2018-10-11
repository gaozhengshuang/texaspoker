/**
 * 礼物商城列表定义
 * */
class GiftShopDefined extends BaseDefined<GiftShopDefinition>
{
	private static readonly GiftShopConfig: string = "giftShop";
	private static _instance: GiftShopDefined;

	public static GetInstance(): GiftShopDefined
	{
		if (!GiftShopDefined._instance)
		{
			GiftShopDefined._instance = new GiftShopDefined();
		}
		if (DefinedManager.IsParsed(GiftShopDefined.GiftShopConfig) == false)
		{
			GiftShopDefined._instance.initialize();
		}
		return GiftShopDefined._instance;
	}
	private initialize()
	{
		this.dataList = DefinedManager.GetData(GiftShopDefined.GiftShopConfig) as Array<GiftShopDefinition>;
	}

	public getListByType(type: GiftShopType)
	{
		let result: Array<GiftShopDefinition> = new Array<GiftShopDefinition>();
		if (this.dataList != null)
		{
			for (let i: number = 0; i < this.dataList.length; i++)
			{
				if (this.dataList[i].type == type)
				{
					result.push(this.dataList[i]);
				}
			}
		}
		return result;
	}
}

/**
 * 礼物商城配置定义
 * */
class GiftShopDefinition implements IBaseDefintion
{
	public Id: number;
	public type: GiftShopType;
	public iconName: string;
	public awardId: number;
}