/**
 * 快捷输入项面板
*/
class FastChatItemRenderer extends BaseItemRenderer<FastChatDefinition>
{
    /**
     * 快捷输入内容
    */
    public desLabel: eui.Label;
    /**
     * 背景图片
    */
    public bgImage: eui.Image;
    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.FastChatItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
             this.desLabel.text = this.bindData.des;
        }
    }
}