/**
 * 排行榜渲染项
 */
class RankItemRenderer extends BaseItemRenderer<RankInfo>
{
    public head: HeadComponent;//用户头像
    public rankLabel: eui.Label;//排名
    public rankImg: eui.Image;
    public nameLabel: eui.Label;//用户名字
    public numLabel: eui.Label;//数值（财富，等级，vip等）
    public upImage: eui.Image;//上升标识
    public downImage: eui.Image;//下降标识
    public noChangeImage: eui.Image;//无变化标识
    //public gotoImage: eui.Image;//查看详情

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.RankItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    }

    private refresh()
    {
        if (this.bindData)
        {
            this.head.init(this.bindData, 80);
            if (this.bindData.rank <= 3)
            {
                this.rankImg.visible = true;
                this.rankLabel.visible = false;
                this.rankImg.source = ResPrefixName.RankImage + this.bindData.rank + ResSuffixName.PNG;
            }
            else
            {
                this.rankImg.visible = false;
                this.rankLabel.visible = true;
                this.rankLabel.text = RankManager.getRankDes(this.bindData.rank);
            }

            this.nameLabel.text = this.bindData.name;
            if (this.bindData.score == undefined || this.bindData.score == 0)
            {
                this.numLabel.visible = false;
            }
            else
            {
                this.numLabel.visible = true;
                switch (this.bindData.type)
                {
                    case RankType.Gold:
                    case RankType.FriendGold:
                        this.numLabel.text = "$ " + game.MathUtil.numAddSpace(this.bindData.score);
                        break;
                    case RankType.Level:
                    case RankType.FriendLevel:
                        this.numLabel.text = "等级：" + game.MathUtil.formatNum(this.bindData.score);
                        break;
                    case RankType.Vip:
                        this.numLabel.text = "成长值：" + game.MathUtil.formatNum(this.bindData.score);
                        break;
                }
            }
            this.showUpOrDown();
            if (this.bindData.change)
            {
                switch (this.bindData.change)
                {
                    case RankChange.Up:
                        this.showUpOrDown(this.upImage);
                        break;
                    case RankChange.Down:
                        this.showUpOrDown(this.downImage);
                        break;
                    case RankChange.NoChange:
                        this.showUpOrDown(this.noChangeImage);
                        break;
                }
            }
        }
    }

    private gotoUserInfo()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
    }

    private showUpOrDown(show?: egret.DisplayObject)
    {
        this.upImage.visible = false;
        this.downImage.visible = false;
        this.noChangeImage.visible = false;
        if (show)
        {
            show.visible = true;
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    }
}