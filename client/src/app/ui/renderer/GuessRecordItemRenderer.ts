/**
 * 手牌竞猜购买记录项面板
*/
class GuessRecordItemRenderer extends BaseItemRenderer<GuessRecordInfo>
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
     * 购买记录
    */
    public recordLabel: eui.Label;
    /**
     * 总注数
    */
    public anteLabel: eui.Label;
    /**
     * 中奖金额
    */
    public goldLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GuessRecordItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            let date = game.DateTimeUtil.formatTimestamp(this.bindData.time, game.DateTimeUtil.Format_Standard_NoSecond)
            this.timeLabel.text = date.split(" ")[1];
            this.recordLabel.text = this.bindData.record;
            this.anteLabel.text = this.bindData.ante.toString();
            this.goldLabel.text = this.bindData.gold.toString();
            this.card1.init(this.bindData.card1);
            this.card1.initElementsShow2();
            this.card2.init(this.bindData.card2);
            this.card2.initElementsShow2();
        }
    }
}