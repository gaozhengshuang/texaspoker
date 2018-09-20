/**
 * 锦标赛最近赛况折叠项面板
*/
class OutsChildItemRenderer extends BaseItemRenderer<ChampionshipRankInfo>
{
    /**
     * 名次
    */
    private rankLabel: eui.Label;
    /**
     * 用户昵称
    */
    private userNameLabel: eui.Label;
    /**
     * 获得的奖励
    */
    private awardLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.OutsChildItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.rankLabel.text = RankManager.getRankDes(this.bindData.rank, true);
            this.userNameLabel.text = this.bindData.name;
            this.awardLabel.text = this.bindData.award;
        }
    }
}