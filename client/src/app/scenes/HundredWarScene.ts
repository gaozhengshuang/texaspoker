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
        SceneManager.switchClosePanels();
        UIManager.showPanel(UIModuleName.HundredWarRoomPanel);
        this.LoadCompleteEvent.dispatch(this);
    }
}
