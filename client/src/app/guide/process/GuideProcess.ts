/**
 * 引导单步处理
 */
class GuideProcess extends BaseGuideProcess<GuideDefinition>
{
	private _step: number = 0;

	public steps: Array<BaseGuideProcess<GuideControllerDefinition>> = new Array<BaseGuideProcess<GuideControllerDefinition>>();

	public run()
	{
		let step: BaseGuideProcess<GuideControllerDefinition>;
		this._step = 0;
		qin.Console.log("引导步骤ID：" + this.definition.id);
		let i: number = 0;
		let len: number = this.steps.length; //一定要这样处理，有个想不到的问题
		for (let i: number = 0; i < len; i++)
		{
			step = this.steps[i];
			step.comleteEvent.addListener(this.stepComplete, this);
			step.run();
		}
	}
	public addStep(step: BaseGuideProcess<GuideControllerDefinition>)
	{
		if (step)
		{
			this.steps.push(step);
		}
	}
	public removeStep(step: BaseGuideProcess<GuideControllerDefinition>)
	{
		qin.ArrayUtil.RemoveItem(step, this.steps);
	}
	private stepComplete(target: BaseGuideProcess<GuideControllerDefinition>)
	{
		target.comleteEvent.removeListener(this.stepComplete, this);
		if (this._step == undefined)
		{
			this._step = 0;
		}
		this._step++;
		if (this._step == this.steps.length)
		{
			this.complete();
		}
	}
	public complete()
	{
		super.complete();
	}
	public clear()
	{
		this.comleteEvent.clear();
		this.parent = undefined;
		let step: BaseGuideProcess<GuideControllerDefinition>;
		for (let i: number = 0; i < this.steps.length; i++)
		{
			step = this.steps[i];
			step.comleteEvent.removeListener(this.stepComplete, this);
			let stepDef: GuideStepDefinition = GuideStepDefined.GetInstance().getDefinition(step.definition.stepId);
			if (stepDef)
			{
				if (stepDef.isNotClear == 1)
				{
					GuideExecutor.addNotClearStep(this.definition.id, step);
				}
				else
				{
					step.clear();
					GuideExecutor.pushStepProcess(stepDef.type, step);
				}
			}

		}
		this._step = 0;
		this.steps.length = 0;
	}
}