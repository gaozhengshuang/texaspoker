/**
 * 德州转转转排行榜渲染项
 */
class ShimTaeYoonRankItemRenderer extends BaseItemRenderer<RankInfo>
{
    public head: CircleHeadComponent;//用户头像
    public rankLabel: eui.Label;//排名
    public rankImg: eui.Image;
    public nameLabel: eui.Label;//用户名字
    public numLabel: eui.Label;//获得奖励

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ShimTaeYoonRankItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    }

    private refresh()
    {
        if (this.bindData)
        {
            this.head.init(this.bindData, 50);
            if (this.bindData.rank <= 3)
            {
                this.rankImg.visible = true;
                this.rankLabel.visible = false;
                this.rankImg.source = ResPrefixName.LaBaRankImage + this.bindData.rank + ResSuffixName.PNG;
            }
            else
            {
                this.rankImg.visible = false;
                this.rankLabel.visible = true;
                this.rankLabel.text = this.bindData.rank.toString();
            }

            this.nameLabel.text = this.bindData.name;
            this.numLabel.text = qin.MathUtil.formatNum(this.bindData.score);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }
}