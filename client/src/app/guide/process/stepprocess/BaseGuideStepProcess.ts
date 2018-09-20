/**
 * 子步骤处理器基类
 */
abstract class BaseGuideStepProcess extends BaseGuideProcess<GuideControllerDefinition>
{
	public stepDef: GuideStepDefinition;
	public init(definition: GuideControllerDefinition, par: BaseGuideProcess<IBaseDefintion>)
	{
		super.init(definition, par);
		if (definition)
		{
			this.stepDef = GuideStepDefined.GetInstance().getDefinition(definition.stepId);
			if (!this.stepDef)
			{
				qin.Console.logError("未找到子步骤数据：stepId" + definition.stepId + "params" + definition.stepParams);
			}
		}
	}
	public run()
	{

	}
	public clear()
	{
		this.comleteEvent.clear();
		this.parent = undefined;
		this.definition = undefined;
		this.stepDef = undefined;
	}
}