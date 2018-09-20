/**
 * 添加好友项面板
*/
class MyTicketItemRenderer extends BaseItemRenderer<ItemInfo>
{
    /**
     * 门票icon
    */
    public commonItem: CommonIcon;
    /**
     * 名字
    */
    private nameLabel: eui.Label;
    /**
     * 描述
    */
    private desLabel: eui.Label;
    /**
     * 数量
    */
    private numLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.MyTicketItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.commonItem.init(this.bindData.definition.icon + ResSuffixName.PNG, 100);
            this.nameLabel.text = this.bindData.definition.name;
            this.desLabel.text = this.bindData.definition.des;
            this.numLabel.text = this.bindData.count.toString();
        }
    }
}