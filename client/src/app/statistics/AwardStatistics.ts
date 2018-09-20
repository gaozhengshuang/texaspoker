/**
 * 兑换统计
 */
class AwardStatistics
{
	public static Invoke(info: AwardTimesInfo)
	{
		try
		{
			//充值
			let def: AwardDefinition = AwardDefined.GetInstance().getDefinition(info.id);
			let isCostCurrency: boolean = false;
			if (def.costList)
			{
				for (let costDef of def.costList)
				{
					if (costDef.type == CostType.RMB)
					{
						isCostCurrency = true;
						break;
					}
				}
			}
			if (isCostCurrency)
			{
				let payList: Array<ShopDefinition> = ShopDefined.GetInstance().dataList;
				for (let i: number = 0; i < payList.length; i++)
				{
					let payDef: ShopDefinition = payList[i];
					if (def != null && def.costList != null && def.costList.length > 0
						&& def.rewardList != null && def.rewardList.length > 0 && payDef.awardId == def.id)
					{
						let orderId: string = ChannelUtil.GenerateOrder(def.id, VersionManager.isServerTest);//订单id
						let price: number = def.costList[0].count / 100;//消耗的RMB,单位：元
						TalkingDataManager.onVirtualCurrencyChargeRequest(orderId, def.name, price, def.rewardList[0].count, ChannelManager.channelType);
						TalkingDataManager.onVirtualCurrencyChargeSuccess(orderId);

						// ChannelManager.PaySuccessFromServer(price, orderId);

						// TDEventStatistics.FirstCharge_RoleLevel(UserManager.level);
						return;
					}
				}
			}
			//消耗
			if (def != null && def.costList != null)
			{
				for (let i: number = 0; i < def.costList.length; i++)
				{
					if (def.costList[i].type == CostType.Diamond)
					{
						TalkingDataManager.onItemPurchase("Award:" + def.id.toString(), info.times, def.costList[i].count);
					}
				}
			}
		}
		catch (Exception) { }
	}
	/// <summary>
	/// 钻石花费记录
	/// </summary>
	public static diamondCostRecord(type: CostRecordType, times: number, diamond: number)
	{
		try
		{
			TalkingDataManager.onItemPurchase(type.toString(), times, diamond);
		}
		catch (Exception) { }
	}

}