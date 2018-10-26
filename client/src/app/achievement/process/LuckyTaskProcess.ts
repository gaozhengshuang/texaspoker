/**
 * 幸运任务进度处理
 */
class LuckyTaskProcess extends BaseAchieveProcess
{
	public init(process: number)
	{
		super.init(process);
	}

	public onProcessUpdate()
	{
		super.onProcessUpdate();
		AchieveProcessManager.onWinOfPlayField(this, AchieveShowPattern.PrimaryPattern);
		AchieveProcessManager.onWinOfPlayField(this, AchieveShowPattern.MiddlePattern);
		AchieveProcessManager.onWinOfPlayField(this, AchieveShowPattern.HighPattern);
	}

	public destroy()
	{
		super.destroy();
	}
}