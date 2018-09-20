/**
 * 商城金币渲染项
*/
class ShopGoldItemRenderer extends BaseItemRenderer<ShopInfo[]>{
    public item0: GoldItemComponent;
    public item1: GoldItemComponent;
    public item2: GoldItemComponent;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ShopGoldItemRenderer;

    }
    protected dataChanged(): void
    {
        super.dataChanged();
        let list: GoldItemComponent[] = [this.item0, this.item1, this.item2];
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