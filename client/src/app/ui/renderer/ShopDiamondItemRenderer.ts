/**
 * 商城钻石渲染项
*/
class ShopDiamondItemRenderer extends BaseItemRenderer<ShopInfo[]>{
    public item0: DiamondItemComponent;
    public item1: DiamondItemComponent;
    public item2: DiamondItemComponent;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ShopDiamondItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        let list: DiamondItemComponent[] = [this.item0, this.item1, this.item2];
        for (let item of list)
        {
            item.visible = false;
        }
        if (this.bindData)
        {
            for (let i: number = 0; i < this.bindData.length; i++)
            {
                if (this.bindData[i])
                {
                    list[i].visible = true;
                    list[i].init(this.bindData[i]);
                }
            }
        }
    }
}