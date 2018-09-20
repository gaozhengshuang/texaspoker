/**
 * 游戏引导领取金币面板
 */
class GuideBringGoldPanel extends BasePanel
{
    public bringBtn: eui.Button;
    public iconImg: CommonIcon;
    public goldNumLabel: eui.Label;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.GuideBringGoldPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        let guideDef: GuideDefinition = GuideDefined.GetInstance().getDefinition(appendData.self);
        if (guideDef)
        {
            let awardDef: AwardDefinition = AwardDefined.GetInstance().getDefinition(guideDef.awardId);
            if (awardDef && awardDef.rewardList.length > 0)
            {
                this.iconImg.init(awardDef.rewardList[0].id, 48, game.StringConstants.Empty);
                this.goldNumLabel.text = awardDef.rewardList[0].count.toString();
            }
        }
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.bringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bringBtnClick, this);
        GuideManager.onSetGuideStepEvent.addListener(this.setGuideStepHandler, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.bringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bringBtnClick, this);
        GuideManager.onSetGuideStepEvent.removeListener(this.setGuideStepHandler, this);
    }
    /**
     * 领取金币按钮点击执行事件
    */
    private bringBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this.panelData.self > 0)
        {
            GuideExecutor.guideProcessComplete(this.panelData.self);
        }
    }
    /**
     * 设置引导步骤完毕
     */
    private setGuideStepHandler(data: any)
    {
        if (data && this.panelData && data.uid == this.panelData.self)
        {
            this.onCloseBtnClickHandler(null);
        }
    }
}