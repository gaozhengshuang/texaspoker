/**
 * 百人大战牌局面板支持
 */
abstract class BaseHWPanelSupport
{
    public target: HundredWarRoomPanel;
	/**
	 * 是否已经离开了房间
	 */
    protected isDisabled: boolean;

    public constructor(panel: HundredWarRoomPanel)
    {
        this.target = panel;
    }
    public initialize()
    {
        this.isDisabled = false;
    }
    public onEnable()
    {
        this.isDisabled = false;
    }
    public onDisable()
    {
        this.isDisabled = true;
    }
    public clear()
    {

    }
}