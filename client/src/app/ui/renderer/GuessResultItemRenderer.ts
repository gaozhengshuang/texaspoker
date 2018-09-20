/**
 * 手牌竞猜开奖信息项面板
*/
class GuessResultItemRenderer extends BaseItemRenderer<GuessResultInfo>
{
    /**
     * 时间
    */
    public timeLabel: eui.Label;
    /**
     * 手牌
    */
    public card1: CardFaceComponent;
    public card2: CardFaceComponent;
    /**
     * 中奖注数
    */
    public anteLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GuessResultItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            let date = game.DateTimeUtil.formatTimestamp(this.bindData.time, game.DateTimeUtil.Format_Standard_NoSecond)
            this.timeLabel.text = date.split(" ")[1];
            this.anteLabel.text = this.bindData.ante.toString();
            this.card1.init(this.bindData.card1);
            this.card1.initElementsShow2();
            this.card2.init(this.bindData.card2);
            this.card2.initElementsShow2();
        }
    }
}