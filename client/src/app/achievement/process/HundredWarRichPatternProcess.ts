/**
 * 百人大战富豪场对局进度信息
 */
class HundredWarRichPatternProcess extends BaseAchieveProcessInfo 
{
    public init(process: number)
    {
        super.init(process);
        HundredWarManager.onCardPushEvent.addListener(this.onProcessUpdate, this);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        AchieveProcessManager.onPlayHWField(this, HundredWarType.RichPattern);
    }

    public destroy()
    {
        super.destroy();
    }

}