/**
 * 游戏引导选择面板
 */
class GuideChoosePanel extends BasePanel
{
    /**
     * group
    */
    public chooseGroup1: eui.Group;  //是否进入新手引导
    public chooseGroup2: eui.Group;  //是否进入训练营
    public goldGroup: eui.Group;
    /**
     * 选择按钮
    */
    public passBtn1: eui.Group;
    public enterBtn1: eui.Group;
    public passBtn2: eui.Group;
    public enterBtn2: eui.Group;
    /**
     * 标题
    */
    public titleLabel: eui.Label;

    private _guideTipsComponent: GuideTipsComponent;

    public dealerImg: eui.Image;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.GuideChoosePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.dealerImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Dealer_Png);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (this.panelData)
        {
            if (this.panelData.type == GuideChooseType.IsEnterGuide)
            {
                this.chooseGroup2.visible = false;
                this.chooseGroup1.visible = true;
                this.titleLabel.text = "您熟悉德州扑克吗？";
                this.goldGroup.visible = false;
            } else if (this.panelData.type == GuideChooseType.IsEnterTrainingCamp)
            {
                this.chooseGroup2.visible = true;
                this.chooseGroup1.visible = false;
                this.titleLabel.text = "是否进入训练营？";
                this.goldGroup.visible = true;
                if (!this._guideTipsComponent)
                {
                    this._guideTipsComponent = new GuideTipsComponent(UIComponentSkinName.GuideTipsComponent);
                }
                this._guideTipsComponent.init({ parent: this.goldGroup, data: { orientation: GuideTipsOrientation.Down, delay: 10, ax: 75, xoffset: -35, yoffset: -35, data: "可获得额外金币奖励" } });
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
        this.passBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.passBtnClick, this);
        this.enterBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtnClick, this);
        this.passBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.passBtn0Click, this);
        this.enterBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtn0Click, this);
        GuideManager.onSetGuideStepEvent.addListener(this.changGuideStepSuccess, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.passBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.passBtnClick, this);
        this.enterBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtnClick, this);
        this.passBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.passBtn0Click, this);
        this.enterBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtn0Click, this);
        GuideManager.onSetGuideStepEvent.removeListener(this.changGuideStepSuccess, this);
    }

    /**
     * 是否进入新手引导跳过按钮点击执行事件
    */
    private passBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData)
        {
            GuideExecutor.guideProcessComplete(this.panelData.self, this.panelData.skip);
        }
    }
    /**
     * 是否进入新手引导进入按钮点击执行事件
    */
    private enterBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData)
        {
            GuideExecutor.guideProcessComplete(this.panelData.self, this.panelData.next);
        }
    }
    /**
     * 是否进入训练营跳过按钮点击执行事件
    */
    private passBtn0Click(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData)
        {
            GuideExecutor.guideProcessComplete(this.panelData.self, this.panelData.skip);
        }
    }
    /**
     * 是否进入训练营进入按钮点击执行事件
    */
    private enterBtn0Click(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData)
        {
            GuideExecutor.guideProcessComplete(this.panelData.self, this.panelData.next);
        }
    }
    /**
     * 收到改变引导步数成功广播后执行事件
    */
    private changGuideStepSuccess(data: any)
    {
        if (this.panelData && data.uid == this.panelData.skip)
        {
            this.finishGuide();
        }
    }
    /**
    * 跳过按钮点击后触发广播成功执行事件
    */
    private finishGuide()
    {
        this.onCloseBtnClickHandler(null);
    }
}