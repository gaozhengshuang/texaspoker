/**
 * 百人大战奖池中奖列表项
*/
class HundredWarPoolPrizeItemRenderer extends BaseItemRenderer<SimpleUserInfo>
{
    /**
     * 头像组件
    */
    public userHeadCom: CircleHeadComponent;
    /**
     * 昵称
    */
    public nameLabel: eui.Label;
    /**
     * 金币
    */
    public goldNumLabel: eui.Label;

    public rankLabel: eui.Label;

    public rankBgImg: eui.Image;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HundredWarPoolPrizeItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    }

    private refreshUI()
    {
        if (this.bindData)
        {
            let rank: number = HundredWarManager.panelHandler.lastPoolInfo.prizeList.indexOf(this.bindData) + 1;
            if (rank < 4)
            {
                this.rankBgImg.visible = true;
                this.rankBgImg.source = ResPrefixName.MTTRankImage + rank + ResSuffixName.PNG;
            }
            else
            {
                this.rankBgImg.visible = true;
            }
            this.rankLabel.text = rank.toString();
            this.userHeadCom.init(this.bindData, 60);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = "$" + qin.MathUtil.formatNum(this.bindData.gold);
        }
    }


    private gotoUserInfo()
    {
        if (!HundredWarManager.isSysBanker(this.bindData.roleId))
        {
            UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
        }
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    }
}
