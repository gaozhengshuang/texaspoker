/**
 * 表情项面板
*/
class FaceItemRenderer extends BaseItemRenderer<Emoji>
{
    /**
     * 表情图片
    */
    public faceImg: eui.Image;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.FaceItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.loadFace();
    }
    private async loadFace()
    {
        if (this.bindData)
        {
            let data = await RES.getResAsync(this.bindData.source);
            this.faceImg.texture = data;
        }
    }
}