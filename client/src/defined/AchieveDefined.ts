/**
 * 成就的定义
 * */
class AchieveDefined extends BaseDefined<AchieveDefintion>
{
	private static readonly achieveConfig: string = "achieve";
	private static _instance: AchieveDefined;
	public static GetInstance(): AchieveDefined
	{
		if (!AchieveDefined._instance)
		{
			AchieveDefined._instance = new AchieveDefined();
		}
		if (DefinedManager.IsParsed(AchieveDefined.achieveConfig) == false)
		{
			AchieveDefined._instance.initialize();
		}
		return AchieveDefined._instance;
	}

	private initialize()
	{
		this.dataList = DefinedManager.GetData(AchieveDefined.achieveConfig) as Array<AchieveDefintion>;
	}

	public getAchieveDefintionByGroup(group: number)
	{
		for (let def of AchieveDefined.GetInstance().dataList)
		{
			if (def.group == group)
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
		let def: AchieveDefintion = this.getDefinition(id);
		if (def)
		{
			return def.preId == null;
		}
		return false;
	}
	/**
	 * 获取所有任务组id
	 */
	public getAchieveGroup(): Array<number>
	{
		let result: Array<number> = new Array<number>();
		for (let def of this.dataList)
		{
			if (result.indexOf(def.group) == -1)
			{
				result.push(def.group);
			}
		}
		return result;
	}

}
/**
 * 成就/任务的定义
 * */
class AchieveDefintion implements IBaseDefintion
{
    /**
     * id
     */
	public id: number;
	/**
	 * 组编号
	 */
	public group: number;
    /**
     * 名称
     */
	public name: string;
    /**
     * 描述
     */
	public description: string;
	/**
	 * 跳转界面1.初级场 2.中级场 3.高级场
	 */
	public tran: number;
	/**
	 * 任务大类 0.成就 1.任务
	 */
	public tag: number;
	/**
	 * 任务类型 1.每日任务（0点重置） 2.每周任务（周一0点重置） 3.成长任务
	 */
	public dailyQuest: number;
    /**
     * 前置id
     */
	public preId: number;
    /**
     * 类型
	 * 1，拥有金币 
	 * 2，拥有好友 
	 * 3，等级成长     参数1：等级 
	 * 4，牌型         参数1：获取牌型数 参数2：牌型
	 * 101，初级场对局 参数1：次数 参数2：1
 	 * 101，中级场对局 参数1：次数 参数2：2
	 * 101，高级场对局 参数1：次数 参数2：3
	 * 201，德州胜利   参数1：胜利次数
     */
	public type: number;
    /**
     * 参数1
     */
	public para1: number;
	/**
	 * 参数2
	 */
	public para2: number
	/**
 	* icon
 	*/
	public icon: string;
	/**
	 * icon2
	 */
	public icon2: string;
	/**
	 * 是否显示进度
	 */
	public grade: boolean;
    /**
     * 奖励id(待用)
     */
	public awardId: number;
	/**
	 * 奖励类型
	 */
	public rewardType: number;
	/**
	 * 奖励id
	 */
	public rewardId: number;
	/**
	* 奖励数量
 	*/
	public rewardNum: number;
	/**
	 * 任务显示位置 0，全部；1，初级场；2，中级场；3，高级场；4，全部场；
	 */
	public playingFieldPattern: number;
	/**
	 * 是否在提审版本显示
	 */
	public isSafe: boolean;

}