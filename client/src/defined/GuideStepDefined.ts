/**
 * 引导步定义
 */
class GuideStepDefined extends BaseDefined<GuideStepDefinition>
{
	private static readonly config: string = "guideStep";
	private static _instance: GuideStepDefined;
	public static GetInstance(): GuideStepDefined
	{
		if (!GuideStepDefined._instance)
		{
			GuideStepDefined._instance = new GuideStepDefined();
		}
		if (DefinedManager.IsParsed(GuideStepDefined.config) == false)
		{
			GuideStepDefined._instance.initialize();
		}
		return GuideStepDefined._instance;
	}

	private initialize()
	{
		this.dataList = DefinedManager.GetData(GuideStepDefined.config) as Array<GuideStepDefinition>;
	}
}

/**
* 引导单步定义
* */
class GuideStepDefinition implements IBaseDefintion
{
	public Id: number;
	/**
	 * 单步类型
	 */
	public type: GuideStepType;
	/**
	 * 数据
	 */
	public data: any;
	/**
	 * 面板名
	 */
	public panelName: string;
	/**
	 * 目标组件名
	 */
	public component: Array<string>;
	/**
	 * x坐标偏移
	 */
	public xoffset: number;
	/**
	 * y坐标偏移
	 */
	public yoffset: number;
	/**
	 * 箭头的横向坐标
	 */
	public ax: number;
	/**
	 * 箭头的纵向坐标
	 */
	public ay: number;
	/**
	 * tips方向
	 */
	public orientation: number;
	/**
	 * 延迟时间显示
	 */
	public delay: number;
	/**
	 * 显示持续时间
	 */
	public showTime: number;
	/**
	 * tips显示序号
	 */
	public num: number;
	/**
	 * 是否是不清理的tips
	 */
	public isNotClear:number;
}