/**
 * 游戏大厅幸运任务逻辑
 */
class GameHallLuckyTask
{
	public target: GameHallPanel;
	constructor(target: GameHallPanel)
	{
		this.target = target;
	}

	public init()
	{
		if (this.isSatisfyReq)
		{
			AchievementManager.reqTakeOtherTask(DynamicTaskType.Lucky);
		}
	}
	private get isSatisfyReq(): boolean
	{
		let timeSection = 3600 * 1000;
		for (let info of table.LuckyTask) //已存在任务检测
		{
			let achieveInfo: AchievementInfo = AchievementManager.getAchieveInfo(info.TaskId);
			if (achieveInfo.isActive)
			{
				// return false; //todo 临时测试
			}
		}
		for (let info of table.LuckyTask)
		{
			let timeIsEnough = false;
			for (let oclock of info.Time) //时间是否满足
			{
				let serverDate = TimeManager.GetServerLocalDateTime();
				let timestart = new Date(serverDate.getFullYear(), serverDate.getMonth(), serverDate.getDate(), oclock);
				let timeend = new Date(timestart.getMilliseconds() + timeSection);
				if (serverDate >= timestart && serverDate <= timeend)
				{
					timeIsEnough = true;
					break;
				}
			}
			let goldIsEnougth = false;
			if (info.Gold.length > 1) //金币是否满足
			{
				if (UserManager.userInfo.gold >= info.Gold[0] && UserManager.userInfo.gold <= info.Gold[1])
				{
					goldIsEnougth = true;
				}
			}
			if (timeIsEnough && goldIsEnougth)
			{
				return true;
			}
		}
		return true;
		// return false; //todo 临时测试
	}
	public onEnable()
	{
		AchievementManager.TakeOtherTaskEvent.addListener(this.takeOtherTaskEventHandler, this);
	}

	public onDisable()
	{
		AchievementManager.TakeOtherTaskEvent.removeListener(this.takeOtherTaskEventHandler, this);
	}
	private takeOtherTaskEventHandler(info: AchievementInfo)
	{
		if (info)
		{
			UIManager.showPanel(UIModuleName.LuckyTaskPanel, info.id);
		}
	}
}