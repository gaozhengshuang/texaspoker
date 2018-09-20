/**
 * 新手引导训练营答题答错面板
*/
class GuideAnswerErrorPanel extends BasePanel
{
    public cardGroup: eui.Group;
    public cardGroup0: eui.Group;
    public cardList: eui.List;
    public cardList0: eui.List;
    public cardScroller: eui.Scroller;
    public cardScroller0: eui.Scroller;

    public desLabel: eui.Label;
    public confirmBtn: eui.Button;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.GuideAnswerErrorPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.cardList, this.cardScroller, GuideAnswerErrorItemRenderer, ScrollViewDirection.Horizontal_L_R, eui.ScrollPolicy.ON, null, false);
        UIUtil.listRenderer(this.cardList0, this.cardScroller0, GuideAnswerErrorItemRenderer, ScrollViewDirection.Horizontal_L_R, eui.ScrollPolicy.ON, null, false);
        this.cardScroller.scrollPolicyV = this.cardScroller0.scrollPolicyV = eui.ScrollPolicy.OFF;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.setCardInfo();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        //显示列表2的卡牌灰色遮罩
        let maskCardList: Array<CardInfo> = new Array<CardInfo>();
        GamblingUtil.cardArr2CardInfoList(this.panelData.mask2, maskCardList);

        let layout: eui.HorizontalLayout = <eui.HorizontalLayout>this.cardList.layout;
        layout.gap = this.panelData.gap;

        layout = <eui.HorizontalLayout>this.cardList0.layout;
        layout.gap = this.panelData.gap;

        for (let i: number = 0; i < this.cardList0.numChildren; i++)
        {
            let render: GuideAnswerErrorItemRenderer = this.cardList0.getChildAt(i) as GuideAnswerErrorItemRenderer;
            for (let maskCard of maskCardList)
            {
                if (maskCard.card[0] == render.bindData.info.card[0] && maskCard.card[1] == render.bindData.info.card[1])
                {
                    render.showMask();
                }
            }
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmBtnClick, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmBtnClick, this);
    }

    /**
     * 确认按钮点击执行事件
    */
    private onConfirmBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData && this.panelData.self)
        {
            GuideExecutor.guideProcessComplete(this.panelData.self);
        }
        this.onCloseBtnClickHandler(null);
    }
    /**
     * 写入数据
     */
    private setCardInfo()
    {

        let cardList1: Array<CardInfo> = new Array<CardInfo>();
        let cardList2: Array<CardInfo> = new Array<CardInfo>();

        GamblingUtil.cardArr2CardInfoList(this.panelData.cardList1, cardList1);
        GamblingUtil.cardArr2CardInfoList(this.panelData.cardList2, cardList2);

        CardTypeMatchUtil.matchCardType(cardList1);
        if (CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType))
        {
            this.desLabel.text = "您的牌型为" + CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
        }

        let list1: Array<any> = new Array<any>();
        let id: number = 0;
        for (let info1 of cardList1)
        {
            id++;
            list1.push({ id: id, scale: this.panelData.scale, info: info1 });
        }
        this.cardInit(this.cardList, list1);


        let list2: Array<any> = new Array<any>();
        id = 0;
        for (let info2 of cardList2)
        {
            id++;
            list2.push({ id: id, scale: this.panelData.scale, info: info2 });
        }
        this.cardInit(this.cardList0, list2);
    }
    /**
     * 写入卡牌信息
    */
    private cardInit(cardList: eui.List, cardListInfo: Array<any>)
    {
        if (cardListInfo)
        {
            UIUtil.writeListInfo(cardList, cardListInfo, "id");
        }
    }
}