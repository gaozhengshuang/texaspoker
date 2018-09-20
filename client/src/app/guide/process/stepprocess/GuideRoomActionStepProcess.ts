/**
 * 引导房间行为处理器
 */
class GuideRoomActionStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		super.run();
		if (this.definition.stepParams.cd > 0)
		{
			game.Tick.AddTimeoutInvoke(this.cdOper, this.definition.stepParams.cd, this);
		}
		else
		{
			this.cdOper();
		}
	}
	private cdOper()
	{
		game.Tick.RemoveTimeoutInvoke(this.cdOper, this);
		if (this.definition)
		{
			//底池筹码变更
			GuideGamblingProcess.chipsChange(this.definition.target, this.definition);
			//状态变更
			GuideGamblingProcess.playerStateChange(this.definition.target, this.definition.stepParams.state, this.definition.stepParams.num);
			//位置变更
			GuideGamblingProcess.acitionPosChange(this.definition);
		}
		this.complete();
	}

	public complete()
	{
		super.complete();
	}
	public clear()
	{
		super.clear();
		game.Tick.RemoveTimeoutInvoke(this.cdOper, this);
	}
}