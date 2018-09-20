/**
 * 百人大战欢乐场对局进度信息
 */
class HundredWarFunPatternProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
        HundredWarManager.onCardPushEvent.addListener(this.onProcessUpdate, this);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onPlayHWField(this, HundredWarType.FunPattern);
    }

    public destroy()
    {
        super.destroy();
    }

}