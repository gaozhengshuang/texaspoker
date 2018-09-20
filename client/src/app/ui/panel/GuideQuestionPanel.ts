/**
 * 引导问答面板
*/
class GuideQuestionPanel extends BasePanel
{
    /**
     * 问题描述
    */
    public titleLabel: eui.Label;
    /**
     * 答案list
    */
    public answerList: eui.List;
    /**
     * 答案scroller
    */
    public answerScroller: eui.Scroller;

    public constructor()
    {
        super();
        this.isIgnoreAdaptation = true;
        this.panelAlignType = PanelAlignType.Center_Top;
        this.offsetV = 105;
        this.setSkinName(UIModuleName.GuideQuestionPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.answerList, this.answerScroller, GuideQueItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, false);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.getQuestionInfo();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.answerList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.getChoiceResult, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.answerList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.getChoiceResult, this);
    }

    /**
     * 获得选择的答案
    */
    private getChoiceResult(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.answerList.selectedItem)
        {
            let cardList1: Array<CardInfo> = new Array<CardInfo>();
            GamblingUtil.cardArr2CardInfoList(this.panelData.cardList1, cardList1);
            CardTypeMatchUtil.matchCardType(cardList1);
            if (this.answerList.selectedItem.id == CardTypeMatchUtil.cardType)
            {
                if (this.panelData.self > 0)
                {
                    GuideExecutor.guideProcessComplete(this.panelData.self);
                }
            } else
            {
                UIManager.showPanel(UIModuleName.GuideAnswerErrorPanel, this.panelData);
            }
            this.onCloseBtnClickHandler(null);
        }
    }
    /**
     * 获得答案数据
    */
    private getQuestionInfo()
    {
        let def: GuideQuestionDefinition = GuideQuestionDefined.GetInstance().getDefinition(this.panelData.question);
        if (def)
        {
            if (def.title)
            {
                this.titleLabel.text = def.title;
            }
            if (def.answer)
            {
                UIUtil.writeListInfo(this.answerList, def.answer, "id", true);
            }
        }
    }
}