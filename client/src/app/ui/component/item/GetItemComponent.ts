/**
 * 获得道具渲染项
 */
class GetItemComponent extends BaseComponent<ItemGetInfo>
{
    public nameLabel: eui.Label;
    public itemComp: CommonIcon;

    public initInfo(info: ItemGetInfo)
    {
        this.itemComp.init(info.id, 100, SheetSubName.GetItemBg);
        let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(info.id);
        if (itemDef)
        {
            this.nameLabel.text = itemDef.name + " * " + info.count;
        }
    }
}