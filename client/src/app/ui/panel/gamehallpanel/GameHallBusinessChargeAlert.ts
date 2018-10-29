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
		if (SceneManager.currentScene && SceneManager.currentScene.sceneInfo && SceneManager.currentScene.sceneInfo.extendData)
		{
			let type = SceneManager.currentScene.sceneInfo.extendData.playFieldType;
			if (type > 0)
			{
				if (UserManager.isBust)
				{
					switch (type)
					{
						case PlayingFieldType.Primary:
						case PlayingFieldType.Middle:
							BusinessActivityManager.chargeAlertHandler.reqGetBankruptInfo(ChargeAlertReqType.GoAheadCar);
							break;
						case PlayingFieldType.High:
							BusinessActivityManager.chargeAlertHandler.reqGetBankruptInfo(ChargeAlertReqType.Bankrupt);
							break;
					}
				}
				else
				{
					switch (type)
					{
						case PlayingFieldType.Primary:
						case PlayingFieldType.Middle:
							let def: table.ITPayBagDefine = table.TPayBagById[ChargeAlertType.ReturnPeakedness];
							if (UserManager.userInfo.gold <= def.GoldNum)
							{
								BusinessActivityManager.chargeAlertHandler.reqGetBankruptInfo(ChargeAlertReqType.ReturnPeakedness);
							}
							break;
					}
				}
			}
		}
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
		let def: table.ITPayBagDefine = table.TPayBagById[BusinessActivityManager.chargeAlertHandler.data.pushid];
		switch (def.Id)
		{
			case ChargeAlertType.Bankrupt:
				UIManager.showPanel(UIModuleName.BankrupHighSubsidyPanel, def);
				break;
			case ChargeAlertType.GoAheadCar1:
			case ChargeAlertType.GoAheadCar2:
				UIManager.showPanel(UIModuleName.GoAheadHigherFieldPanel, { def: def, type: BusinessType.GoAheadHighField });
				break;
			case ChargeAlertType.ReturnPeakedness:
				UIManager.showPanel(UIModuleName.GoAheadHigherFieldPanel, { def: def, type: BusinessType.ReturnPeakedness });
				break;
		}
	}

	/**
	 * 尝试显示高级破产
	 */
	private tryBrankruptHighField()
	{
		// let nowTime = game.longToNumber(BusinessActivityManager.chargeAlertHandler.data.time);
		// if (nowTime > 0)
		// {
		// 	let time = PrefsManager.getValue(PrefsManager.BankruptHighFieldAlert);
		// 	if (time)
		// 	{
		// 		let str = nowTime.toString();
		// 		if (time != str)
		// 		{
		// 			UIManager.showPanel(UIModuleName.BankrupHighSubsidyPanel);
		// 			PrefsManager.setValue(PrefsManager.BankruptHighFieldAlert, str);
		// 		}
		// 	}
		// 	else
		// 	{
		// 		PrefsManager.setValue(PrefsManager.BankruptHighFieldAlert, TimeManager.GetServerUtcSecondstamp().toString());
		// 		UIManager.showPanel(UIModuleName.BankrupHighSubsidyPanel);
		// 	}
		// }
	}

	/**
	 * 尝试跳转到直通车
	 */
	private tryGoAheadHighField()
	{
		// let nowTime = game.longToNumber(BusinessActivityManager.chargeAlertHandler.data.time);
		// let serverTime = TimeManager.GetServerUtcSecondstamp();
		// let isShowAlert: boolean = false;
		// let localTimeStr: string;
		// let nowTimeStr = nowTime.toString();
		// if (serverTime - nowTime <= 24 * 3600)
		// {
		// 	if (BusinessActivityManager.chargeAlertHandler.data.count == 1)
		// 	{
		// 		localTimeStr = PrefsManager.getValue(PrefsManager.GoAheadtHighFieldAlertOneDay);
		// 		if (localTimeStr != nowTimeStr)
		// 		{
		// 			isShowAlert = true;
		// 			PrefsManager.setValue(PrefsManager.GoAheadtHighFieldAlertOneDay, nowTimeStr);
		// 		}
		// 	}
		// }
		// if (serverTime - nowTime <= 24 * 3600 * 3)
		// {
		// 	if (BusinessActivityManager.chargeAlertHandler.data.count == 2)
		// 	{
		// 		localTimeStr = PrefsManager.getValue(PrefsManager.GoAheadtHighFieldAlertThreeDay);
		// 		if (localTimeStr != nowTimeStr)
		// 		{
		// 			isShowAlert = true;
		// 			PrefsManager.setValue(PrefsManager.GoAheadtHighFieldAlertThreeDay, nowTimeStr);
		// 		}
		// 	}
		// }
		// if (isShowAlert)
		// {
		// 	UIManager.showPanel(UIModuleName.GoAheadHigherFieldPanel, BusinessType.GoAheadHighField);
		// }
	}

	/**
	 * 尝试跳转重返巅峰
	 */
	private tryPeakedness()
	{
		// let nowTime = game.longToNumber(BusinessActivityManager.chargeAlertHandler.data.time);
		// let serverTime = TimeManager.GetServerUtcSecondstamp();
		// let isShowAlert: boolean = false;
		// if (serverTime - nowTime <= 24 * 3600)
		// {
		// 	if (BusinessActivityManager.chargeAlertHandler.data.play >= 1 && UserManager.userInfo.gold < 100000000)
		// 	{
		// 		isShowAlert = true;
		// 	}
		// }
		// if (isShowAlert)
		// {
		// 	UIManager.showPanel(UIModuleName.GoAheadHigherFieldPanel, BusinessType.ReturnPeakedness);
		// }
	}
}