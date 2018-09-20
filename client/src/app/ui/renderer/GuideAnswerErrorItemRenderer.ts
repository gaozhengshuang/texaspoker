/**
 * 引导回答错误项面板
*/
class GuideAnswerErrorItemRenderer extends BaseItemRenderer<any>
{
    /**
     * 牌组件
    */
    public card: CardFaceComponent;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GuideAnswerErrorItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            if (this.bindData.scale != undefined)
            {
                this.card.scaleX = this.card.scaleY = this.bindData.scale;
            }
            this.card.init(this.bindData.info);
            this.card.initElementsShow2();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }
    public showMask()
    {
        if (this.card)
        {
            this.card.showMask(true);
        }
    }
}