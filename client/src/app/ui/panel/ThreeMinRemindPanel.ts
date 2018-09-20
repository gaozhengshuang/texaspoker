/**
 * 比赛3分钟开始倒计时提醒面板
 */
class ThreeMinRemindPanel extends BaseBannerRemindPanel
{
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ThreeMinRemindPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        ChampionshipManager.mttRemindStartHandler.ResetThreeMinFlagEvent.addListener(this.resetThreeMinFlag, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        ChampionshipManager.mttRemindStartHandler.ResetThreeMinFlagEvent.removeListener(this.resetThreeMinFlag, this);
    }
    /**
	 * 重置3分钟横幅打开开关
	*/
    private resetThreeMinFlag()
    {
        ChampionshipManager.mttRemindStartHandler.resetThreeMinFlag();
    }
}