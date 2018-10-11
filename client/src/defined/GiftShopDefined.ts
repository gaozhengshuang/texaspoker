/**
 * 礼物商城列表定义
 * */
class GiftShopDefined
{
	private static _instance: GiftShopDefined;

	public static GetInstance(): GiftShopDefined
	{
		if (!GiftShopDefined._instance)
		{
			GiftShopDefined._instance = new GiftShopDefined();
		}
		return GiftShopDefined._instance;
	}

	public getListByType(type: GiftShopType)
	{
		let result: Array<table.IGiftShopDefine> = new Array<table.IGiftShopDefine>();
		if (table.GiftShop != null)
		{
			for (let i: number = 0; i < table.GiftShop.length; i++)
			{
				if (table.GiftShop[i].Type == type)
				{
					result.push(table.GiftShop[i]);
				}
			}
		}
		return result;
	}
}