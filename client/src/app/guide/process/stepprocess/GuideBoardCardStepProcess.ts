/**
 * 公共牌步骤处理器
 */
class GuideBoardCardStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		super.run();
		if (this.definition)
		{
			GuideGamblingProcess.oneLoopOver(this.definition); //一轮圈注结束

			let pInfo: PlayerInfo;
			for (let i: number = 0; i < GamblingManager.roomInfo.playerList.length; i++) //状态变更
			{
				pInfo = GamblingManager.roomInfo.playerList[i];
				GuideGamblingProcess.playerStateChange(pInfo.pos, PlayerState.WaitAction, 0);
			}
			//位置变更
			GuideGamblingProcess.acitionPosChange(this.definition);
		}
		this.complete();
	}

	public complete()
	{
		super.complete();
	}
}