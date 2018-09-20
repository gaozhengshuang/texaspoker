/**
 * 奖池信息面板
 */
class HundredWarPoolInfoPanel extends BasePanel
{
    /**
     * 当前奖池
     */
    public poolNumComp: HundredWarNumComponent;

    /**
     * 上轮信息
     */
    public lastGroup: eui.Group;
    /**
     * 上轮牌型
     */
    public cardGroup: eui.Group;
    public cardList: Array<CardFaceComponent>;
    /**
     * 上轮奖池
     */
    public poolLastLabel: eui.Label;
    /**
     * 日期
     */
    public dateLabel: eui.Label;
    /**
     * 暂未开奖
     */
    public noPoolLabel: eui.Label;
    /**
     * 排行组
     */
    public rankGroup: eui.Group;

    public rankList: eui.List;

    public rankScroller: eui.Scroller;
    /**
     * 无排名
     */
    public noUserLabel: eui.Label;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.HundredWarPoolInfoPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        UIUtil.listRenderer(this.rankList, this.rankScroller, HundredWarPoolPrizeItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        HundredWarManager.panelHandler.reqPoolInfo();
        this.poolNumComp.init("$" + qin.MathUtil.numAddSpace(HundredWarManager.roomInfo.pool));
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        HundredWarManager.panelHandler.OnGetHundredWarPoolInfoEvent.addListener(this.refreshReqInfo, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        HundredWarManager.panelHandler.OnGetHundredWarPoolInfoEvent.removeListener(this.refreshReqInfo, this);
    }

    public refreshReqInfo()
    {
        if (HundredWarManager.panelHandler.lastPoolInfo.cards && HundredWarManager.panelHandler.lastPoolInfo.cards.length > 0)
        {
            this.lastGroup.visible = true;
            this.noPoolLabel.visible = false;
            if (!this.cardList)
            {
                this.cardList = new Array<CardFaceComponent>();
                for (let i: number = 0; i < this.cardGroup.numChildren; i++)
                {
                    let card: CardFaceComponent = this.cardGroup.getChildAt(i) as CardFaceComponent;
                    this.cardList.push(card);
                }
                this.cardList.reverse();
            }
            for (let item of this.cardList)
            {
                item.visible = false;
            }
            let list: Array<CardInfo> = HundredWarManager.panelHandler.lastPoolInfo.cards;
            if (list)
            {
                for (let i: number = 0; i < list.length; i++)
                {
                    if (i < this.cardList.length)
                    {
                        let card: CardFaceComponent = this.cardList[i];
                        card.visible = true;
                        card.init(list[i]);
                        card.initElementsShow2();
                    }
                }
            }
            this.poolLastLabel.text = "$" + qin.MathUtil.formatNum(HundredWarManager.panelHandler.lastPoolInfo.gold);
            this.dateLabel.text = qin.DateTimeUtil.formatDate(new Date(HundredWarManager.panelHandler.lastPoolInfo.time * 1000), qin.DateTimeUtil.Format_Standard_NoSecondAndYear);
        }
        else
        {
            this.lastGroup.visible = false;
            this.noPoolLabel.visible = true;
        }

        if (HundredWarManager.panelHandler.lastPoolInfo.prizeList && HundredWarManager.panelHandler.lastPoolInfo.prizeList.length > 0)
        {
            this.rankGroup.visible = true;
            this.noUserLabel.visible = false;
            UIUtil.writeListInfo(this.rankList, HundredWarManager.panelHandler.lastPoolInfo.prizeList, "roleId", false);
        }
        else
        {
            this.rankGroup.visible = false;
            this.noUserLabel.visible = true;
        }
    }
}