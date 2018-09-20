/**
 * talkingdata
 */
class TalkingDataManager
{
	public static enabled: boolean = false;

	/**
	 * 设置唯一账户
	 */
	public static setAccount(accountId: string)
	{
		if (TalkingDataManager.enabled && !game.StringUtil.isNullOrEmpty(accountId))
		{
			game.ExternalInterface.call(ExtFuncName.TDSetAccount, accountId);
		}
	}
	/**
	 * 设置帐户的显示性名
	 */
	public static setAccountName(accountName: string)
	{
		if (TalkingDataManager.enabled && !game.StringUtil.isNullOrEmpty(accountName))
		{
			game.ExternalInterface.call(ExtFuncName.TDSetAccountName, accountName);
		}
	}
	/**
	 * 设置等级
	 */
	public static setLevel(level: number)
	{
		if (TalkingDataManager.enabled && level > 0)
		{
			game.ExternalInterface.call(ExtFuncName.TDSetLevel, level.toString());
		}
	}
	/**
	 * 购买虚拟物品
	 */
	public static onItemPurchase(item: string, itemNumber: number, priceInVirtualCurrency: number)
	{
		if (TalkingDataManager.enabled && !game.StringUtil.isNullOrEmpty(item) && itemNumber > 0 && priceInVirtualCurrency > 0)
		{
			let obj: Object = { item: item, itemNumber: itemNumber, priceInVirtualCurrency: priceInVirtualCurrency };
			game.ExternalInterface.call(ExtFuncName.TDOnItemPurchase, JSON.stringify(obj));
		}
	}
	/**
	 * 物品使用
	 */
	public static onItemUse(item: string, itemNumber: number)
	{
		if (TalkingDataManager.enabled && !game.StringUtil.isNullOrEmpty(item) && itemNumber > 0)
		{
			let obj: Object = { item: item, itemNumber: itemNumber };
			game.ExternalInterface.call(ExtFuncName.TDOnItemUse, JSON.stringify(obj));
		}
	}
	/**
	 * 请求购买虚拟货币
	 */
	public static onVirtualCurrencyChargeRequest(orderId: string, iapId: string, currencyAmount: number, virtualCurrencyAmount: number, paymentType: string)
	{
		if (TalkingDataManager.enabled && !game.StringUtil.isNullOrEmpty(orderId)
			&& !game.StringUtil.isNullOrEmpty(iapId) && currencyAmount > 0 && virtualCurrencyAmount > 0 && !game.StringUtil.isNullOrEmpty(paymentType))
		{
			let obj: Object = { orderId: orderId, iapId: iapId, currencyAmount: currencyAmount, virtualCurrencyAmount: virtualCurrencyAmount, paymentType: paymentType };
			game.ExternalInterface.call(ExtFuncName.TDOnVirtualCurrencyChargeRequest, JSON.stringify(obj));
		}
	}
	/**
	 * 购买成功
	 */
	public static onVirtualCurrencyChargeSuccess(orderId: string)
	{
		if (TalkingDataManager.enabled && !game.StringUtil.isNullOrEmpty(orderId))
		{
			let obj: Object = { orderId: orderId };
			game.ExternalInterface.call(ExtFuncName.TDOnVirtualCurrencyChargeSuccess, JSON.stringify(obj));
		}
	}
}