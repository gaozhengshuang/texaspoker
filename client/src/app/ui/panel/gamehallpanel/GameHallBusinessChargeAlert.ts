/**
 * 大厅运营活动充值
 */
class GameHallBusinessChargeAlert
{
	public target: GameHallPanel;
	constructor(target: GameHallPanel)
	{
		this.target = target;
	}

	public init()
	{
		BusinessActivityManager.chargeAlertHandler.reqGetBankruptInfo();
	}

	public onEnable()
	{
		BusinessActivityManager.chargeAlertHandler.OnGetBankruptInfoEvent.addListener(this.onTryChargeAlert, this);
	}

	public onDisable()
	{
		BusinessActivityManager.chargeAlertHandler.OnGetBankruptInfoEvent.removeListener(this.onTryChargeAlert, this);
	}

	/**
 	* 处理弹窗消息
 	*/
	private onTryChargeAlert()
	{
		this.tryBrankruptHighField();
	}

	/**
	 * 尝试显示高级破产
	 */
	private tryBrankruptHighField()
	{
		let time = PrefsManager.getValue(PrefsManager.BankruptHighFieldAlert);
		if (time)
		{
			let nowTime = BusinessActivityManager.chargeAlertHandler.data.time;
			let str = nowTime.toString();
			if (time != str)
			{
				UIManager.showPanel(UIModuleName.BankrupHighSubsidyPanel);
				PrefsManager.setValue(PrefsManager.BankruptHighFieldAlert, str);
			}
		}
		else
		{
			UIManager.showPanel(UIModuleName.BankrupHighSubsidyPanel);
		}
	}

	/**
	 * 尝试跳转到直通车
	 */
	private tryGoAheadHighField()
	{
		let nowTime = game.longToNumber(BusinessActivityManager.chargeAlertHandler.data.time);
		let serverTime = TimeManager.GetServerUtcSecondstamp();
		let isShowAlert: boolean = false;
		let localTimeStr: string;
		let nowTimeStr = nowTime.toString();
		if (serverTime - nowTime <= 24 * 3600)
		{
			if (BusinessActivityManager.chargeAlertHandler.data.count == 1)
			{
				localTimeStr = PrefsManager.getValue(PrefsManager.GoAheadtHighFieldAlertOneDay);
				if (localTimeStr != nowTimeStr)
				{
					isShowAlert = true;
					PrefsManager.setValue(PrefsManager.GoAheadtHighFieldAlertOneDay, nowTimeStr);
				}
			}
		}
		if (serverTime - nowTime <= 24 * 3600 * 3)
		{
			if (BusinessActivityManager.chargeAlertHandler.data.count == 2)
			{
				localTimeStr = PrefsManager.getValue(PrefsManager.GoAheadtHighFieldAlertThreeDay);
				if (localTimeStr != nowTimeStr)
				{
					isShowAlert = true;
					PrefsManager.setValue(PrefsManager.GoAheadtHighFieldAlertThreeDay, nowTimeStr);
				}
			}
		}
		if (isShowAlert)
		{
			UIManager.showPanel(UIModuleName.GoAheadHigherFieldPanel, BusinessType.GoAheadHighField);
		}
	}

	/**
	 * 尝试跳转重返巅峰
	 */
	private tryPeakedness()
	{
		let nowTime = game.longToNumber(BusinessActivityManager.chargeAlertHandler.data.time);
		let serverTime = TimeManager.GetServerUtcSecondstamp();
		let isShowAlert: boolean = false;
		if (serverTime - nowTime <= 24 * 3600)
		{
			if (BusinessActivityManager.chargeAlertHandler.data.play >= 1 && UserManager.userInfo.gold < 100000000)
			{
				isShowAlert = true;
			}
		}
		if (isShowAlert)
		{
			UIManager.showPanel(UIModuleName.GoAheadHigherFieldPanel, BusinessType.ReturnPeakedness);
		}
	}
}