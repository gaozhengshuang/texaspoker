/**
 * 德州转转转列表项面板
*/
class ShimTaeYoonItemRenderer extends BaseItemRenderer<any>
{
    public iconImg: eui.Image;
    public bgImg: eui.Image;
    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ShimTaeYoonItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.iconImg.source = ResPrefixName.LaBaResult + this.bindData + ResSuffixName.PNG;
            this.bgImg.source = ResPrefixName.LaBaResultBg + this.bindData + ResSuffixName.PNG;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }
}