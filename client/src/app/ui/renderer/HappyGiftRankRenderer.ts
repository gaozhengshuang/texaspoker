/**
 * 欢乐豪礼排行项
*/
class HappyGiftRankRenderer extends BaseItemRenderer<RankInfo>
{
    public rankLabel: eui.Label;
    public head: CircleHeadComponent;
    public userNameLabel: eui.Label;
    public goldLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HappyGiftRankRenderer;
    }

    protected dataChanged()
    {
        super.dataChanged();
        this.refreshUI();
    }

    private refreshUI()
    {
        if (this.bindData)
        {
            this.rankLabel.text = this.bindData.rank.toString();
            this.head.init(this.bindData, 40);
            this.userNameLabel.text = this.bindData.name;
            this.goldLabel.text = game.MathUtil.numAddSpace(this.bindData.score);
            this.setColor();
        }
    }

    private setColor()
    {
        if (this.bindData.roleId == UserManager.userInfo.id)
        {
            this.rankLabel.textColor = ColorEnum.Golden;
            this.userNameLabel.textColor = ColorEnum.Golden;
            this.goldLabel.textColor = ColorEnum.Golden;
        }
        else
        {
            this.rankLabel.textColor = ColorEnum.White;
            this.userNameLabel.textColor = ColorEnum.White;
            this.goldLabel.textColor = ColorEnum.White;
        }
    }
}
