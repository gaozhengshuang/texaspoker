/**
 * 兑换奖品的定义
 * */
class AwardDefined
{
	private static _instance: AwardDefined;
	public static GetInstance(): AwardDefined
	{
		if (!AwardDefined._instance)
		{
			AwardDefined._instance = new AwardDefined();
		}
		return AwardDefined._instance;
	}
	/**
	 * 获取某一兑换ID前置ID列表是否空
	 */
	public getPrevIdIsNull(id: number): boolean
	{
		let def: table.IAwardDefine = table.AwardById[id];
		if (def)
		{
			return !def.PreId;
		}
		return false;
	}
	/**
	 * 根据awardid获得奖励名字
	*/
	public getAwardNameById(id: number, isShowquantifier: boolean = false): string
	{
		let award: table.IAwardDefine = table.AwardById[id];
		if (award && award.RewardId)
		{
			let len: number = award.RewardId.length;
			let str: string = "";
			for (let i: number = 0; i < len; i++)
			{
				let itemDef: table.IItemBaseDataDefine = table.ItemBaseDataById[award.RewardId[i]];
				let name: string;
				if (itemDef)
				{
					name = itemDef.Name;
				}
				let count: number = game.longToNumber(award.RewardNum[i]);
				if (name && count)
				{
					if (count < 100)
					{
						if (isShowquantifier)
						{
							str += name + game.MathUtil.formatNum(count) + "个";
						} else
						{
							str += name;
						}
					} else
					{
						str += game.MathUtil.formatNum(count) + name;
					}
					if (i < len - 1)
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
		let award: table.IAwardDefine = table.AwardById[id];
		let num: number = 0;
		if (award && award.RewardId)
		{
			for (let i: number = 0; i < award.RewardId.length; i++)
			{
				let count: number = game.longToNumber(award.RewardNum[i]);
				num += count;
			}
		}
		return num;
	}
	/**
	 * 根据preId获得award信息
	*/
	public getAwardInfoByPreId(preId: number): table.IAwardDefine
	{
		let len = table.Award.length;
		for (let i: number = 0; i < len; i++)
		{
			if (table.Award[i].PreId == preId)
			{
				return table.Award[i];
			}
		}
		return null;
	}
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