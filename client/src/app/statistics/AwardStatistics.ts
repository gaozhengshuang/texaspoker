/**
 * 兑换统计
 */
class AwardStatistics
{
	public static Invoke(info: msg.IAwardGetInfo)
	{
		try
		{
			//充值
			let def: table.IAwardDefine = table.AwardById[info.id];
			let costList = AwardManager.getCostInfoDefinitionList(info.id);
			let rewardList = AwardManager.getAwardInfoDefinitionList(info.id);
			let isCostCurrency: boolean = false;
			if (costList)
			{
				for (let costDef of costList)
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
					if (def && costList != null && costList.length > 0
						&& rewardList != null && rewardList.length > 0 && payDef.awardId == info.id)
					{
						let orderId: string = ChannelUtil.GenerateOrder(info.id, VersionManager.isServerTest);//订单id
						let price: number = costList[0].count / 100;//消耗的RMB,单位：元
						TalkingDataManager.onVirtualCurrencyChargeRequest(orderId, def.Name, price, rewardList[0].count, ChannelManager.channelType);
						TalkingDataManager.onVirtualCurrencyChargeSuccess(orderId);

						// ChannelManager.PaySuccessFromServer(price, orderId);

						// TDEventStatistics.FirstCharge_RoleLevel(UserManager.level);
						return;
					}
				}
			}
			//消耗
			if (costList != null)
			{
				for (let i: number = 0; i < costList.length; i++)
				{
					if (costList[i].type == CostType.Diamond)
					{
						TalkingDataManager.onItemPurchase("Award:" + info.id.toString(), info.count, costList[i].count);
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