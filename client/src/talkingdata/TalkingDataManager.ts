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
		if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(accountId))
		{
			qin.ExternalInterface.call(ExtFuncName.TDSetAccount, accountId);
		}
	}
	/**
	 * 设置帐户的显示性名
	 */
	public static setAccountName(accountName: string)
	{
		if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(accountName))
		{
			qin.ExternalInterface.call(ExtFuncName.TDSetAccountName, accountName);
		}
	}
	/**
	 * 设置等级
	 */
	public static setLevel(level: number)
	{
		if (TalkingDataManager.enabled && level > 0)
		{
			qin.ExternalInterface.call(ExtFuncName.TDSetLevel, level.toString());
		}
	}
	/**
	 * 购买虚拟物品
	 */
	public static onItemPurchase(item: string, itemNumber: number, priceInVirtualCurrency: number)
	{
		if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(item) && itemNumber > 0 && priceInVirtualCurrency > 0)
		{
			let obj: Object = { item: item, itemNumber: itemNumber, priceInVirtualCurrency: priceInVirtualCurrency };
			qin.ExternalInterface.call(ExtFuncName.TDOnItemPurchase, JSON.stringify(obj));
		}
	}
	/**
	 * 物品使用
	 */
	public static onItemUse(item: string, itemNumber: number)
	{
		if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(item) && itemNumber > 0)
		{
			let obj: Object = { item: item, itemNumber: itemNumber };
			qin.ExternalInterface.call(ExtFuncName.TDOnItemUse, JSON.stringify(obj));
		}
	}
	/**
	 * 请求购买虚拟货币
	 */
	public static onVirtualCurrencyChargeRequest(orderId: string, iapId: string, currencyAmount: number, virtualCurrencyAmount: number, paymentType: string)
	{
		if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(orderId)
			&& !qin.StringUtil.isNullOrEmpty(iapId) && currencyAmount > 0 && virtualCurrencyAmount > 0 && !qin.StringUtil.isNullOrEmpty(paymentType))
		{
			let obj: Object = { orderId: orderId, iapId: iapId, currencyAmount: currencyAmount, virtualCurrencyAmount: virtualCurrencyAmount, paymentType: paymentType };
			qin.ExternalInterface.call(ExtFuncName.TDOnVirtualCurrencyChargeRequest, JSON.stringify(obj));
		}
	}
	/**
	 * 购买成功
	 */
	public static onVirtualCurrencyChargeSuccess(orderId: string)
	{
		if (TalkingDataManager.enabled && !qin.StringUtil.isNullOrEmpty(orderId))
		{
			let obj: Object = { orderId: orderId };
			qin.ExternalInterface.call(ExtFuncName.TDOnVirtualCurrencyChargeSuccess, JSON.stringify(obj));
		}
	}
}