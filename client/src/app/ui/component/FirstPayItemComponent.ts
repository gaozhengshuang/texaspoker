/**
 * 首充组件
 */
class FirstPayItemComponent extends BaseComponent<AwardInfoDefinition>
{
    public nameLabel: eui.Label;
    public countLabel: eui.Label;
    public itemComp: CommonIcon;

    public init(info: AwardInfoDefinition)
    {
        super.init(info);
    }
    protected rendererStart(event: egret.Event)
    {
        super.rendererStart(event);
        if (this.bindData)
        {
            let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(this.bindData.id);
            if (itemDef)
            {
                this.nameLabel.text = itemDef.name;
                this.itemComp.init(itemDef.icon + ResSuffixName.PNG, 130, null, false, true);
            }
            this.countLabel.text = qin.MathUtil.numAddSpace(this.bindData.count);
        }
    }
}