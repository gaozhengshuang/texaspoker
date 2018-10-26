/**
 * 赢得百人大战进度信息
 */
class WinHundredWarProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
        HundredWarManager.onCardPushEvent.addListener(this.onProcessUpdate, this);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        if (HundredWarManager.hundredWarOverInfo.isWin)
        {
            this.process++;
        }
    }
    public destroy()
    {
        super.destroy();
    }
}