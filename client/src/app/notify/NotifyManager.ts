/**
 * 通知管理
 */
class NotifyManager
{
	/**
	 * 第一个参数类型type，第二个数字count，第三个参数附加参数params
	 */
	public static OnNotifyValueChanged: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 通知系统初始化完成事件
	 */
	public static OnInitCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 重新登录
	 */
	public static OnNewInitEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 通知管理
	 */
	private static _notifyMap: game.Map<NotifyType, BaseNotifyHandle> = new game.Map<NotifyType, BaseNotifyHandle>();

	/**
	 * 初始化
	 */
	public static initialize()
	{
		NotifyManager._notifyMap.add(NotifyType.Mtt_HaveJoinedList, new MttHaveJoinedListHandler(NotifyType.Mtt_HaveJoinedList));
		NotifyManager._notifyMap.add(NotifyType.Mail_HaveNewSystem, new NewMailNotifyHandler(NotifyType.Mail_HaveNewSystem));
		NotifyManager._notifyMap.add(NotifyType.Mail_HaveNewPlayer, new NewMailNotifyHandler(NotifyType.Mail_HaveNewPlayer));
		NotifyManager._notifyMap.add(NotifyType.Achieve_HaveDaily, new AchieveNotifyHandler(NotifyType.Achieve_HaveDaily));
		NotifyManager._notifyMap.add(NotifyType.Achieve_HaveWeekly, new AchieveNotifyHandler(NotifyType.Achieve_HaveWeekly));
		NotifyManager._notifyMap.add(NotifyType.Achieve_HaveGrowUp, new AchieveNotifyHandler(NotifyType.Achieve_HaveGrowUp));
		NotifyManager._notifyMap.add(NotifyType.Achieve_PrimaryPattern, new AchieveNotifyHandler(NotifyType.Achieve_PrimaryPattern));
		NotifyManager._notifyMap.add(NotifyType.Achieve_MiddlePattern, new AchieveNotifyHandler(NotifyType.Achieve_MiddlePattern));
		NotifyManager._notifyMap.add(NotifyType.Achieve_HighPattern, new AchieveNotifyHandler(NotifyType.Achieve_HighPattern));
		NotifyManager._notifyMap.add(NotifyType.Friend_ReceivePrize, new FriendPrizeNotifyHandler(NotifyType.Friend_ReceivePrize));
		NotifyManager._notifyMap.add(NotifyType.Friend_HaveNew, new NewFriendNotifyHandler(NotifyType.Friend_HaveNew));
		NotifyManager._notifyMap.add(NotifyType.Gambling_TimeAward, new NewTimeAwardNotifyHandler(NotifyType.Gambling_TimeAward));
		NotifyManager._notifyMap.add(NotifyType.HundredWar_Chat, new HundredWarChatNotifyHandler(NotifyType.HundredWar_Chat));
		NotifyManager._notifyMap.add(NotifyType.MonthCard, new MonthCardNotifyHandler(NotifyType.MonthCard));
		NotifyManager._notifyMap.add(NotifyType.Signin, new SignInNotifyHandler(NotifyType.Signin));
		NotifyManager._notifyMap.add(NotifyType.BankruptSubsidy, new BankruptSubsidyNotifyHandler(NotifyType.BankruptSubsidy));
		NotifyManager._notifyMap.add(NotifyType.NewGift, new NewGiftNotifyHandler(NotifyType.NewGift));
		NotifyManager._notifyMap.add(NotifyType.Invite, new InviteNotifyHandler(NotifyType.Invite));
		NotifyManager._notifyMap.add(NotifyType.Share, new ShareNotifyHandler(NotifyType.Share));

		//
		// 组合类型(先传入本类型，再传入其他子类型)
		//
		NotifyManager._notifyMap.add(NotifyType.Achieve_HaveNoTake, new MultiMessageNotifyHandle([NotifyType.Achieve_HaveNoTake, NotifyType.Achieve_HaveDaily, NotifyType.Achieve_HaveWeekly, NotifyType.Achieve_HaveGrowUp]));
		NotifyManager._notifyMap.add(NotifyType.Friend_Hall, new MultiMessageNotifyHandle([NotifyType.Friend_Hall, NotifyType.Friend_ReceivePrize, NotifyType.Friend_HaveNew]));
		NotifyManager._notifyMap.add(NotifyType.Mail_HaveNew, new MultiMessageNotifyHandle([NotifyType.Mail_HaveNew, NotifyType.Mail_HaveNewSystem, NotifyType.Mail_HaveNewPlayer]));
		NotifyManager._notifyMap.add(NotifyType.ActivityRedPoint, new MultiMessageNotifyHandle([NotifyType.ActivityRedPoint, NotifyType.BankruptSubsidy]));
		// _notifyMap.Add(NotifyType.CarnivalAward, new CarnivalNotifyHandler());
		// _notifyMap.Add(NotifyType.SevenStar_2, new MultiMessageNotifyHandle(NotifyType.SevenStar_2, NotifyType.SevenStar));

		//==========================最后抛送初始化完成事件==========================//
		NotifyManager.OnInitCompleteEvent.dispatch();
	}
	/**
	 * 重新登录初始化
	 */
	public static initByReLogin()
	{
		//把上个账号暂存的所有数据还原成默认值
		NotifyManager.reset();
		NotifyManager.OnNewInitEvent.dispatch();
	}
	/**
	 * 抛出通知
	 */
	public static dispatchNotify(type: NotifyType, id?: Object)
	{
		let count: number = NotifyManager.getCount(type, id);
		NotifyManager.OnNotifyValueChanged.dispatch({ type: type, count: count, id: id });
	}
	public static setParams(type: NotifyType, count: number, params: any)
	{
		if (NotifyManager._notifyMap == null)
		{
			return;
		}
		let handle: BaseNotifyHandle = NotifyManager._notifyMap.getValue(type);
		if (handle && handle instanceof MultiNotifyHandle)
		{
			(handle as MultiNotifyHandle).setParams(params);
		}
	}
	/**
	 * 获取某种类型的数量
	 */
	public static getCount(type: NotifyType, params?: any): number
	{
		let handle: BaseNotifyHandle = NotifyManager._notifyMap.getValue(type);
		if (handle)
		{
			if (handle instanceof MultiNotifyHandle)
			{
				if (params != undefined)
				{
					return handle.getCountByParams(params);
				}
				else
				{
					return handle.totalCount;
				}
			}
			else
			{
				return handle.count;
			}
		}
		return 0;
	}
	/**
	 * 清除带有附加参数的通知
	 */
	public static clearMultiParams()
	{
		if (NotifyManager._notifyMap == null)
		{
			return;
		}
		let values: Array<BaseNotifyHandle> = NotifyManager._notifyMap.getValues();
		for (let kv of values)
		{
			if (kv instanceof MultiNotifyHandle)
			{
				(kv as MultiNotifyHandle).clearParams();
			}
		}
	}
	/**
	 * 清除指定类型的通知
	 */
	public static clear(type: NotifyType)
	{
		let handle: BaseNotifyHandle = NotifyManager._notifyMap.getValue(type);
		if (handle)
		{
			handle.reset();
		}
	}
	/**
	 * 重置清除所有handle总保存的临时变量
	 */
	public static reset()
	{
		let values: Array<BaseNotifyHandle> = NotifyManager._notifyMap.getValues();
		for (let kv of values)
		{
			kv.reset();
		}
	}
}