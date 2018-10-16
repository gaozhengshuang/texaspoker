/**
 * 成就的定义
 * */
class AchieveDefined
{
	private static _instance: AchieveDefined;
	public static GetInstance(): AchieveDefined
	{
		if (!AchieveDefined._instance)
		{
			AchieveDefined._instance = new AchieveDefined();
		}
		return AchieveDefined._instance;
	}

	public getAchieveDefintionByGroup(group: number)
	{
		for (let def of table.Achieve)
		{
			if (def.Group == group)
			{
				return def;
			}
		}
		return null;
	}

	/**
	 * 获取某一兑换ID前置ID列表是否空
	 */
	public getPrevIdIsNull(id: number): boolean
	{
		let def: table.IAchieveDefine = table.AchieveById[id];
		if (def)
		{
			return def.PreId == null;
		}
		return false;
	}
	/**
	 * 获取所有任务组id
	 */
	public getAchieveGroup(): Array<number>
	{
		let result: Array<number> = new Array<number>();
		for (let def of table.Achieve)
		{
			if (result.indexOf(def.Group) == -1)
			{
				result.push(def.Group);
			}
		}
		return result;
	}

}