/**
 * 手牌竞猜本周榜单项面板
*/
class GuessWeekItemRenderer extends BaseItemRenderer<msg.IGuessRankInfo>
{
    /**
     * 排名
    */
    public rankLabel: eui.Label;
    /**
     * 名字
    */
    public nameLabel: eui.Label;
    /**
     * 中奖注数
    */
    public anteLabel: eui.Label;
    /**
     * 中奖金币
    */
    public numLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GuessWeekItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.rankLabel.text = this.bindData.rank.toString();
            this.nameLabel.text = this.bindData.name;
            this.anteLabel.text = this.bindData.ante.toString();
            this.numLabel.text = this.bindData.gold.toString();
        }
    }
}