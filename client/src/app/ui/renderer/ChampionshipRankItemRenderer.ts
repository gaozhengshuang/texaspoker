/**
 * 锦标赛赛事信息排名项
 */
class ChampionshipRankItemRenderer extends BaseItemRenderer<ChampionshipRankInfo>
{
    /**
     * 头像组件
    */
    public headComponent: CircleHeadComponent;
    /**
     * 排名
    */
    public rankLabel: eui.Label;
    /**
     * 排名背景
    */
    public rankBgImg: eui.Image;
    /**
     * 昵称
    */
    public nameLabel: eui.Label;
    /**
     * 筹码
    */
    public numLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ChampionshipRankItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.rankLabel.text = this.bindData.rank.toString();
            if (this.bindData.rank <= 3)
            {
                this.rankBgImg.visible = true;
                this.rankBgImg.source = ResPrefixName.MTTRankImage + this.bindData.rank + ResSuffixName.PNG;
            } else
            {
                this.rankBgImg.visible = false;
            }
            this.headComponent.init(this.bindData, 50);
            this.nameLabel.text = this.bindData.name;
            this.numLabel.text = game.MathUtil.formatNum(this.bindData.chips);
            if (this.bindData.roleId == UserManager.userInfo.id)
            {
                if (this.bindData.rank > 3)
                {
                    this.rankLabel.textColor = ColorEnum.Golden;
                }
                this.nameLabel.textColor = this.numLabel.textColor = ColorEnum.Golden;
            } else
            {
                this.rankLabel.textColor = this.nameLabel.textColor = this.numLabel.textColor = ColorEnum.White;
            }
        }
    }
}