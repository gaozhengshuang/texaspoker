/**
 * 锦标赛赛事信息奖励项
 */
class AwardItemRenderer extends BaseItemRenderer<ChampionshipAwardInfo>
{
    /**
     * 名次
    */
    public rankLabel: eui.Label;
    /**
     * 奖励
    */
    public awardDesLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.AwardItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.rankLabel.text = this.bindData.rank.toString();
            this.awardDesLabel.text = this.bindData.des;
        }
    }
}