/**
 * 锦标赛赛事信息盲注项
 */
class BlindItemRenderer extends BaseItemRenderer<table.IChampionshipBlindDefine>
{
    /**
     * 增购图标
    */
    public addonImg: eui.Image;
    /**
     * 重购图标
    */
    public rebuyImg: eui.Image;
    /**
     * 级别
    */
    public rankLabel: eui.Label;
    /**
     * 盲注
    */
    public blindLabel: eui.Label;
    /**
     * 前注
    */
    public anteLabel: eui.Label;
    /**
     * 升盲时间
    */
    public timeLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.BlindItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.rebuyImg.visible = this.addonImg.visible = false;
            this.rankLabel.text = this.bindData.Level.toString();
            this.blindLabel.text = game.MathUtil.formatNum(this.bindData.SBlind) + "/" + game.MathUtil.formatNum(this.bindData.BBlind);
            if (ChampionshipManager.nowBlindRank && this.bindData.Level == ChampionshipManager.nowBlindRank)
            {
                this.rankLabel.textColor = ColorEnum.Golden;
                this.blindLabel.textColor = ColorEnum.Golden;
                this.anteLabel.textColor = ColorEnum.Golden;
                this.timeLabel.textColor = ColorEnum.Golden;
                ChampionshipManager.nowBlindItem = this;
            } else
            {
                this.rankLabel.textColor = ColorEnum.White;
                this.blindLabel.textColor = ColorEnum.White;
                this.anteLabel.textColor = ColorEnum.White;
                this.timeLabel.textColor = ColorEnum.White;
            }
            if (!this.bindData.PreBet)
            {
                this.anteLabel.text = "0";
            } else
            {
                this.anteLabel.text = game.MathUtil.formatNum(this.bindData.PreBet);
            }
            this.timeLabel.text = this.bindData.UpTime + "秒";
            if (this.bindData.Addon)
            {
                this.addonImg.visible = true;
            }
            if (this.bindData.Rebuy)
            {
                this.rebuyImg.visible = true;
            }
        }
    }
}