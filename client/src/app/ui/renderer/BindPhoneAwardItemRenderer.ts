/**
 *绑定手机奖励项面板
*/
class BindPhoneAwardItemRenderer extends BaseItemRenderer<AwardInfoDefinition>
{
    /**
     * icon
    */
    public comIcon: CommonIcon;
    /**
     * 奖励数量描述
    */
    public numDesLabel: eui.Label;
    /**
     * 名字
    */
    public nameLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.BindPhoneAwardItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.comIcon.init(this.bindData.id, 120, null, false, true);
            let definition: table.IItemBaseDataDefine = table.ItemBaseDataById[this.bindData.id];
            if (definition)
            {
                this.numDesLabel.text = this.bindData.count.toString();
                this.nameLabel.text = definition.Name;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }
}