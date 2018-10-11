/**
 * 百人大战场景
 */
class HundredWarScene extends BaseScene
{
    public constructor()
    {
        super();
        this.resGroupName = [ResGroupName.HundredWar, ResGroupName.Gambling, ResGroupName.Common];
    }
    public clear()
    {
        UIManager.closePanel(UIModuleName.HundredWarRoomPanel);
    }
    public async initialize()
    {
        super.initialize();
    }
    protected onAllResLoadComplete()
    {
        this.LoadCompleteEvent.dispatch(this);
        UIManager.showPanel(UIModuleName.HundredWarRoomPanel);
    }
}
