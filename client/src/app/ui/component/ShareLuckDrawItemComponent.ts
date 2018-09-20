/**
 * 分享抽奖物品组件
 */
class ShareLuckDrawItemComponent extends BaseComponent<any>
{
    public bgImg: eui.Image;
    public itemImg: eui.Image;
    public highLightImg: eui.Image;
    public numLabel: eui.Label;  //物品数量
    private readonly _defaultItemSize = 0.85;

    public init(itemId: number, num?: number)
    {
        let def: ItemDefinition = ItemDefined.GetInstance().getDefinition(itemId);
        if (def)
        {
            this.itemImg.source = def.icon + ResSuffixName.PNG;
        }

        if (num && num > 1)
        {
            this.numLabel.text = qin.MathUtil.formatNum(num);
            this.numLabel.visible = true;
        } else
        {
            this.numLabel.visible = false;
        }
    }
    /**
     * 设置是否显示高亮
    */
    public setHighLightImgVisible(value: boolean)
    {
        this.highLightImg.visible = value;
    }
    /**
     * 设置高亮的透明度
    */
    public setHighLightAlpha(value: number)
    {
        this.highLightImg.alpha = value;
    }
}