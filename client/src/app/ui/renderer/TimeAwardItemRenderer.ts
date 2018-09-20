/**
 * 计时奖励项面板
*/
class TimeAwardItemRenderer extends BaseItemRenderer<TimeAwardInfo>
{
    /**
     * icon
    */
    public iconImg: eui.Image;
    /**
     * 数量
    */
    public numLabel: eui.Label;
    /**
     * 是否领取奖励标记
    */
    public flagImg: eui.Image;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.TimeAwardItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.flagImg.visible = false;
            if (this.bindData.isBring == 1)
            {
                this.flagImg.visible = true;
                this.numLabel.textColor = ColorEnum.TimeAward_Finish_Yellow;
            }
            this.iconImg.source = this.bindData.icon;
            this.numLabel.text = game.MathUtil.formatNum(this.bindData.num);
        }
    }
}