/**
 * 活动工具 
 */
class ActivityUtil
{
	/**
	 * 是否已经存在子活动信息
	 */
	public static isExistSubInfo(activityInfo: any, subId: number)
	{
		if (activityInfo && activityInfo.subList)
		{
			for (let info of activityInfo.subList)
			{
				if (info.subId == subId)
				{
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 是否可以参与某项活动
	 */
	public static isInJoinTime(info: ActivityInfo)
	{
		if (!InfoUtil.checkAvailable(info) || info.startDateTime == undefined)
		{
			return false;
		}
		if (info.definition.joinTime == undefined)
		{//没有配
			return true;
		}
		if (ActivityUtil.getActivityOpenState(info) != ActivityOpenState.Open)
		{
			return false;
		}
		let dt: Date = TimeManager.GetServerLocalDateTime();
		let outOfTime: number = Math.round(dt.getTime() - info.startDateTime.getTime() / 1000);
		if (info.definition.joinTime <= outOfTime)
		{
			return false;
		}
		return true;
	}
	/**
	* 根据配置表数据获取活动状态
    */
	public static getActivityOpenState(info: ActivityInfo)
	{
		if (!InfoUtil.checkAvailable(info))
		{
			return ActivityOpenState.None;
		}
		let dt: Date = TimeManager.GetServerLocalDateTime();
		if (info.definition.isByServerTime)
		{
			if (dt >= info.severStartDateTime && dt < info.severEndDateTime)
			{
				return ActivityOpenState.Open;
			}
			return ActivityOpenState.End;
		}
		if (dt < info.startDateTime)
		{
			return ActivityOpenState.UnOpen;
		}
		if (dt > info.endDateTime)
		{
			return ActivityOpenState.End;
		}
		if (dt >= info.startDateTime && dt < info.endDateTime)
		{
			return ActivityOpenState.Open;
		}
		return ActivityOpenState.None;
	}
	/**
	 * 设置活动信息的开始时间
	 */
	public static setStartTime(info: ActivityInfo)
	{
		info.startDateTime = info.definition.startDt;
		if (ActivityUtil.IsOpenServerActivity(info.definition) && UserManager.userInfo.openServerTime > 0) 
		{
			if (info.definition.openServerTimeStart > 0)
			{
				info.startDateTime = game.DateTimeUtil.secondes2Date(UserManager.userInfo.openServerTime + info.definition.openServerTimeStart);
			}
			else
			{
				info.startDateTime = game.DateTimeUtil.secondes2Date(UserManager.userInfo.openServerTime);
			}
		}
		else if (ActivityUtil.IsCreateRoleActivity(info.definition) && UserManager.userInfo.createdTime > 0)
		{
			if (info.definition.keepDayStart > 0)
			{
				info.startDateTime = game.DateTimeUtil.secondes2Date(UserManager.userInfo.createdTime + info.definition.keepDayStart);
			}
			else
			{

				info.startDateTime = game.DateTimeUtil.secondes2Date(UserManager.userInfo.createdTime);
			}
		}
	}
	/**
	 * 设置活动信息的结束时间
	 */
	public static setEndTime(info: ActivityInfo)
	{
		info.endDateTime = info.definition.endDt;
		if (ActivityUtil.IsOpenServerActivity(info.definition))
		{
			if (info.definition.openServerTimeEnd > 0 && UserManager.userInfo.openServerTime > 0)
			{
				info.endDateTime = game.DateTimeUtil.secondes2Date(UserManager.userInfo.openServerTime + info.definition.openServerTimeEnd);
			}
		}
		else if (ActivityUtil.IsCreateRoleActivity(info.definition))
		{
			if (info.definition.keepDayEnd > 0 && UserManager.userInfo.createdTime > 0)
			{
				info.endDateTime = game.DateTimeUtil.secondes2Date(UserManager.userInfo.createdTime + info.definition.keepDayEnd);
			}
		}
	}
	/**
  	 * 是否是开服型活动，开服型活动完成统一不消失
   	 */
	public static IsOpenServerActivity(def: ActivityDefintion): boolean
	{
		if (def)
		{
			return def.openServerTimeStart > 0 || def.openServerTimeEnd > 0;
		}
		return false;
	}
    /**
     * 活动是否是创号型活动
     */
	public static IsCreateRoleActivity(def: ActivityDefintion): boolean
	{
		if (def != null)
		{
			return def.keepDayStart > 0 || def.keepDayEnd > 0;
		}
		return false;
	}
}