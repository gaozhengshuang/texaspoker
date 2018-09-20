/**
 * 游戏牌型面板
 */
class GuideCardTypeIntroPanel extends BasePanel
{
    /**
     * 下一步按钮
    */
    public nextStepBtn: eui.Button;
    /**
     * 牌型group
    */
    public desGroup: eui.Group;
    /**
     * scroller
    */
    public desScroller: eui.Scroller;
    public bgImg: eui.Image;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.GuideCardTypeIntroPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.desScroller.viewport = this.desGroup;
        this.desScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        UIUtil.loadBg(ResFixedFileName.Guide_Bg_1, this.bgImg);
        UIManager.pushResizeScroller(this.desScroller, 915);
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
        UIManager.showPanel(this.panelData.panelName, this.panelData);
        this.onCloseBtnClickHandler(null);
    }
}