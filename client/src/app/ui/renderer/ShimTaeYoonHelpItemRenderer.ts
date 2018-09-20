/**
 * 德州转转转帮助列表项面板
*/
class ShimTaeYoonHelpItemRenderer extends BaseItemRenderer<ShimTaeYoonHelpInfo>
{
    public iconImg0: eui.Image;
    public iconImg1: eui.Image;
    public iconImg2: eui.Image;
    public oddLabel: eui.Label;
    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ShimTaeYoonHelpItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.oddLabel.text = this.bindData.coefficientDes;
            this.iconImg0.source = this.bindData.img1;
            this.iconImg1.source = this.bindData.img2;
            this.iconImg2.source = this.bindData.img3;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }
}