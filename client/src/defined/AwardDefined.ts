/**
 * 兑换奖品的定义
 * */
class AwardDefined extends BaseDefined<AwardDefinition>
{
	private static readonly awardConfig: string = "award";
	private static _instance: AwardDefined;
	public static GetInstance(): AwardDefined
	{
		if (!AwardDefined._instance)
		{
			AwardDefined._instance = new AwardDefined();
		}
		if (DefinedManager.IsParsed(AwardDefined.awardConfig) == false)
		{
			AwardDefined._instance.initialize();
		}
		return AwardDefined._instance;
	}
	public awardDefinitionDic: game.Map<number, AwardDefinition>;

	private initialize()
	{
		this.awardDefinitionDic = new game.Map<number, AwardDefinition>();
		this.dataList = DefinedManager.GetData(AwardDefined.awardConfig) as Array<AwardDefinition>;
		for (let def of this.dataList)
		{
			this.setAwardInfoDefinitionList(def);
			this.awardDefinitionDic.add(def.id, def);
		}
	}

	private setAwardInfoDefinitionList(awardDef: AwardDefinition)
	{
		if (awardDef["costType"])
		{
			awardDef.costList = new Array<AwardInfoDefinition>();
			for (let i: number = 0; i < awardDef["costType"].length; i++)
			{
				let cost: AwardInfoDefinition = new AwardInfoDefinition();
				cost.type = awardDef["costType"][i];
				if (awardDef["costId"])
				{
					cost.id = awardDef["costId"][i];
				}
				if (awardDef["costNum"])
				{
					cost.count = awardDef["costNum"][i];
				}
				awardDef.costList.push(cost);
			}
		}
		if (awardDef["rewardType"])
		{
			awardDef.rewardList = new Array<AwardInfoDefinition>();
			for (let i: number = 0; i < awardDef["rewardType"].length; i++)
			{
				let reward: AwardInfoDefinition = new AwardInfoDefinition();
				reward.type = awardDef["rewardType"][i];
				if (awardDef["rewardId"])
				{
					reward.id = awardDef["rewardId"][i];
				}
				if (awardDef["rewardNum"])
				{
					reward.count = awardDef["rewardNum"][i];
				}
				awardDef.rewardList.push(reward);
			}
		}
	}

	/**
	 * 获取某一兑换ID前置ID列表是否空
	 */
	public getPrevIdIsNull(id: number): boolean
	{
		let def: AwardDefinition = this.getDefinition(id);
		if (def)
		{
			return def.preId == null;
		}
		return false;
	}
	/**
	 * 根据awardid获得奖励名字
	*/
	public getAwardNameById(id: number, isShowquantifier: boolean = false): string
	{
		let award: AwardDefinition = AwardDefined.GetInstance().getDefinition(id);
		if (award && award.rewardList)
		{
			let len: number = award.rewardList.length;
			let str: string = "";
			for (let i: number = 0; i < len; i++)
			{
				let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(award.rewardList[i].id)
				let name: string;
				if (itemDef)
				{
					name = itemDef.name;
				}
				let count: number = award.rewardList[i].count;
				if (name && count)
				{
					if (count < 100)
					{
						if (isShowquantifier)
						{
							str += name + count + "个";
						} else
						{
							str += name;
						}
					} else
					{
						str += game.MathUtil.formatNum(count) + name;
					}
					if (award.rewardList && i < len - 1)
					{
						str += "、";
					}
				}
			}
			return str;
		}
		return null;
	}
	/**
	 * 根据awardId获得奖励数量
	*/
	public getAwardNumByAwardId(id: number): number
	{
		let award: AwardDefinition = AwardDefined.GetInstance().getDefinition(id);
		let num: number = 0;
		if (award && award.rewardList)
		{
			for (let i: number = 0; i < award.rewardList.length; i++)
			{
				let count: number = award.rewardList[i].count;
				num += count;
			}
		}
		return num;
	}
	/**
	 * 根据preId获得award信息
	*/
	public getAwardInfoByPreId(preId: number): AwardDefinition
	{
		if (this.dataList != null)
		{
			for (let i: number = 0; i < this.dataList.length; i++)
			{
				if (this.dataList[i].preId == preId)
				{
					return this.dataList[i];
				}
			}
		}
		return null;
	}
}
/**
 * 奖品的定义
 * */
class AwardDefinition implements IBaseDefintion
{
    /**
     * 奖品id
     */
	public id: number;
	/**
	 * 奖品类型
	 */
	public type: number;
	/**
	 * 消耗列表
	 */
	public costList: Array<AwardInfoDefinition>;
    /**
     * 是否消耗
     */
	public isCost: boolean;
    /**
     * 消耗名称
     */
	public costName: string;
	/**
	 * 奖励列表
	 */
	public rewardList: Array<AwardInfoDefinition>;
	/**
	 * 时间编号
	 */
	public timeId: number;
	/**
	 * 用户等级
	 */
	public level: number;
	/**
	 * 前置奖励
	 */
	public preId: number;
	/**
	 * 限制次数
	 */
	public limit: number;
	/**
	 * vip等级要求
	 */
	public vipLevel: number;
	/**
	 * 名字
	 */
	public name: string;
	/**
	 * 描述
	 */
	public des: string;
	/**
	 * 不能通过兑换协议直接兑换
	 */
	public nacr: boolean;
	/**
	 * 邮件id
	 */
	public mailId: number;
}

/**
 *  配表中奖励的结构体封装
 */
class AwardInfoDefinition
{
	/**
	 * 物品id
	 */
	public id: number;
    /**
     * 数量
     */
	public count: number;
    /**
     * 物品的类型
     */
	public type: number;
}