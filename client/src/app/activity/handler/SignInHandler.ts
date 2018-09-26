/**
 * 签到管理
 */
class SignInHandler extends BaseActivitySubHandler<SignInInfo>
{
	/**
	 * 签到成功事件
	 */
	public signInCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();

	public initialize(info: ActivityInfo)
	{
		super.initialize(info);

		let def: SignInDefinition;
		for (let i: number = 0; i < SignInDefined.GetInstance().dataList.length; i++) //填充子列表信息
		{
			def = SignInDefined.GetInstance().dataList[i];
			this.addSubInfo(info, SignInInfo, def);
		};
	}

	/**
	 * 发送签到请求
	 */
	public reqSignIn(id: number, subId: number)
	{
		ActivityManager.ReqGetActivityAward(id, subId + 1);
	}

	public onGetAwardComplete(id: number, subId: number)
	{
		super.onGetAwardComplete(id, subId);
		let info: ActivityInfo = this.getInfo(id);
		if (info)
		{
			info.jsonObj.isSignIn = true;
			info.jsonObj.SignTime = TimeManager.GetServerUtcTimestamp();
			info.step++;
		}
		this.signInCompleteEvent.dispatch();
	}
	/**
	 * 今天是否签到 不传则是需要默认找一个签到活动类型 
	*/
	public isSignToday(id?: number): boolean
	{
		let info: ActivityInfo = this.getInfo(id);
		if (id == undefined)
		{
			info = ActivityManager.getOpenAchivityByType(ActivityType.Signin);
		}
		else
		{
			info = this.getInfo(id);
		}
		if (info)
		{
			if (info.jsonObj == undefined || info.jsonObj.SignTime == undefined)
			{
				return false;
			}
			let now: Date = TimeManager.GetServerLocalDateTime();
			let today: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			let signTime: Date = new Date(info.jsonObj.SignTime * 1000);
			if (signTime < today)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 生成获得物品的描述
	 */
	public getAwardDes(awardDef: table.IAwardDefine): string
	{
		let result: string = game.StringConstants.Empty;
		if (awardDef && awardDef.RewardId)
		{
			for (let i: number = 0; i < awardDef.RewardId.length; i++)
			{
				result += ItemDefined.GetInstance().getDefinition(awardDef.RewardId[i]).name + "*" + awardDef.RewardNum[i];
				if (i < awardDef.RewardId.length - 1)
				{
					result += ",";
				}
			}
		}
		return result;
	}
}
