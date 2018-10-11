/**
 *商城管理
 */
class ShopManager
{
	public static shoppingList: Array<ShopInfo> = new Array<ShopInfo>();
	public static goldList: Array<ShopInfo> = new Array<ShopInfo>();
	public static diamondList: Array<ShopInfo> = new Array<ShopInfo>();
	public static vipList: Array<ShopInfo> = new Array<ShopInfo>();
	public static propList: Array<ShopInfo> = new Array<ShopInfo>();
	public static awardGoldList: Array<table.IAwardDefine> = new Array<table.IAwardDefine>();

	public static goldListRender: ShopInfo[][] = [];
	public static diamondListRender: ShopInfo[][] = [];

	public static giftShopIsSelf: boolean;
	public static giftShopSelect: GiftShopItemRenderer;
	private static readonly _vipId: number[] = [AwardFixedId.OneMonthVip, AwardFixedId.SixMonthVip, AwardFixedId.YearVip, AwardFixedId.GShopOneMonthVip, AwardFixedId.GShopSixMonthVip, AwardFixedId.GShopYearVip];

	public static initialize()
	{
		game.ArrayUtil.Clear(ShopManager.shoppingList);
		let info: ShopInfo;
		for (let i: number = 0; i < ShopDefined.GetInstance().dataList.length; i++)
		{
			info = new ShopInfo();
			info.id = ShopDefined.GetInstance().dataList[i].Id;
			if (info.definition)
			{
				switch (info.definition.type)
				{
					case ShopType.Gold:
						ShopManager.goldList.push(info);
						break;
					case ShopType.Diamond:
						ShopManager.diamondList.push(info);
						break;
					case ShopType.Vip:
						ShopManager.vipList.push(info);
						break;
					case ShopType.Prop:
						ShopManager.propList.push(info);
						break;
				}
			}
		}
		let awardDef: table.IAwardDefine;
		for (let i: number = 0; i < ShopManager.goldList.length; i++)
		{
			awardDef = table.AwardById[ShopManager.goldList[i].definition.awardId];
			ShopManager.awardGoldList.push(awardDef);
		}
		let temp: number = Math.ceil(ShopManager.goldList.length / 3);
		for (let i: number = 0; i < temp; i++)
		{
			ShopManager.goldListRender.push([]);
		}
		for (let i: number = 0; i < ShopManager.goldList.length; i++)
		{
			ShopManager.goldListRender[Math.floor(i / 3)][i % 3] = ShopManager.goldList[i];
		}

		temp = Math.ceil(ShopManager.diamondList.length / 3);
		for (let i: number = 0; i < temp; i++)
		{
			ShopManager.diamondListRender.push([]);
		}
		for (let i: number = 0; i < ShopManager.diamondList.length; i++)
		{
			ShopManager.diamondListRender[Math.floor(i / 3)][i % 3] = ShopManager.diamondList[i];
		}
	}
	/**
	 * 兑换vip后的操作
	 */
	public static onExchangeVipHandler(id: number)
	{
		if (ShopManager._vipId.indexOf(id) != -1)
		{
			let awardDef: table.IAwardDefine = table.AwardById[id];
			if (awardDef && awardDef.RewardId)
			{
				let itemGetList: Array<ItemGetInfo> = new Array<ItemGetInfo>();
				for (let i: number = 0; i < awardDef.RewardId.length; i++)
				{
					let id = awardDef.RewardId[i];
					let count = awardDef.RewardNum[i];
					let type = awardDef.RewardType[i];

					let itemGetInfo: ItemGetInfo = new ItemGetInfo();
					itemGetInfo.id = id;
					itemGetInfo.count = count;
					itemGetInfo.type = type;
					itemGetList.push(itemGetInfo);
					if (itemGetInfo.id == ItemFixedId.vipExp)
					{
						UserManager.userInfo.vipExp += itemGetInfo.count;
					}
				}
				UIManager.showPanel(UIModuleName.GetItemTipsPanel, itemGetList);
			}
		}
	}

	public static reqSendGift(roleId: number, id: number)
	{
		let callback: Function = function (result: game.SpRpcResult)
		{
			ShopManager.sendGiftEvent.dispatch({ "id": id, "roleId": roleId });
		}
		SocketManager.call(Command.SendGift_Req_3716, { "id": id, "roleId": roleId }, callback, null, this);
	}
	/**
	 * 清空列表
	*/
	public static clearList()
	{
		game.ArrayUtil.Clear(ShopManager.diamondList);
		game.ArrayUtil.Clear(ShopManager.goldList);
		game.ArrayUtil.Clear(ShopManager.vipList);
	}
	/**
	 * 礼物商店选中事件
	 */
	public static giftShopItemSelectEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 赠送礼物事件
	 */
	public static sendGiftEvent: game.DelegateDispatcher = new game.DelegateDispatcher();

}