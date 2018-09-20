/**
 * 引导游戏介绍面板
 */
class GuideGameDescriptionPanel extends TextInfoPanel
{
    /**
     * 下一步按钮
    */
    public nextStepBtn: eui.Button;

    public bgImg: eui.Image;

    public constructor()
    {
        super(true);
        this.setSkinName(UIModuleName.GuideGameDescriptionPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.isMaskClickClose = false;
        UIUtil.loadBg(ResFixedFileName.Guide_Bg_1, this.bgImg);
    }
    public init(appendData: any)
    {
        super.init(TextFixedId.GuidePlayWay);

        this.panelData = appendData;
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.nextStepBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextStepBtnClick, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.nextStepBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextStepBtnClick, this);
    }
    private nextStepBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        // UIManager.showPanel(this.panelData.panelName, this.panelData);
        if (this.panelData && this.panelData.self)
        {
            GuideExecutor.guideProcessComplete(this.panelData.self);
        }
        this.onCloseBtnClickHandler(null);
    }
}