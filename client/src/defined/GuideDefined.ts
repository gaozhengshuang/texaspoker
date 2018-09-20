/**
 * 引导定义
 */
class GuideDefined extends BaseDefined<GuideDefinition>
{
	private static readonly config: string = "guide";
	private static _instance: GuideDefined;

	public static GetInstance(): GuideDefined
	{
		if (!GuideDefined._instance)
		{
			GuideDefined._instance = new GuideDefined();
		}
		if (DefinedManager.IsParsed(GuideDefined.config) == false)
		{
			GuideDefined._instance.initialize();
		}
		return GuideDefined._instance;
	}
	private initialize()
	{
		this.dataList = DefinedManager.GetData(GuideDefined.config) as Array<GuideDefinition>;
	}
	/**
	 * 获取引导配置数据
	 */
	public getGuideDefinition(type: GuideType, phase: number): GuideDefinition
	{
		let def: GuideDefinition;
		if (this.dataList)
		{
			let len: number = this.dataList.length;
			for (let i: number = 0; i < len; i++)
			{
				def = this.dataList[i];
				if (def.type == type && def.phase == phase)
				{
					return def;
				}
			}
		}
		qin.Console.log("未找到引导配置数据---->type:" + type + "phase:" + phase);
		return def;
	}
	/**
	 * 获取引导类型的最大引导阶段
	 */
	public getMaxPhase(type: GuideType): number
	{
		if (this.dataList)
		{
			for (let def of this.dataList)
			{
				if (def.type == type && def.typeEndFlag == 1)
				{
					return def.phase;
				}
			}
		}
		return 0;
	}
}
/**
 * 引导
 */
class GuideDefinition implements IBaseDefintion
{
	public id: number;
	/**
	 * 引导类型
	 */
	public type: GuideType;
	/**
	 * 引导阶段 同一个引导阶段有N多步骤
	 */
	public phase: number;
	/**
	 * 步骤列表
	 */
	public steps: Array<GuideControllerDefinition>;
	/**
	 * 下一步引导
	 */
	public next: number;
	/**
	 * 显示下一步延迟 该步骤完成的停留时间
	 */
	public delay: number;
	/**
	 * 超时自动触发 (处理异常情况)
	 */
	public timeOut: number;
	/**
	 * 奖励ID
	 */
	public awardId: number;
	/**
	 * 引导步骤描述用于辅助调试
	 */
	public des: string;
	/**
	 * 当前类型引导结束标记
	 */
	public typeEndFlag: number;
	/**
	 * 当前阶段引导结束标记
	 */
	public phaseEndFlag: number;
	/**
	 * 清理指定步骤的执行
	 */
	public clear: Array<number>;
}
/**
 * 引导控制
 */
class GuideControllerDefinition implements IBaseDefintion
{
	public id: number;
	/**
	 * 步骤ID
	 */
	public stepId: number;
	/**
 	* 该步骤的目标
 	*/
	public target: any;
	/**
	 * 步骤参数
	 */
	public stepParams: any;
}