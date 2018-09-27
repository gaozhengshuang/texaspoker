/**
 *邀请活动分享id项面板
*/
class InviteItemRenderer extends BaseItemRenderer<InviteItemInfo>
{
    public titleLabel: eui.Label;  //标题
    public iconImg0: eui.Image;  //奖励icon
    public iconImg1: eui.Image;
    public selfAwardLabel: eui.Label;  //自己的奖励
    public friendAwardLabel: eui.Label;  //好友的奖励

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.InviteItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.titleLabel.text = this.bindData.des;
            let itemDef: table.IItemBaseDataDefine = table.ItemBaseDataById[this.bindData.rewardId];
            if (itemDef)
            {
                this.iconImg0.source = this.iconImg1.source = itemDef.Icon + ResSuffixName.PNG;
                if (this.bindData.rewardId == ItemFixedId.gold)
                {
                    this.iconImg0.scaleX = this.iconImg0.scaleY = this.iconImg1.scaleX = this.iconImg1.scaleY = 0.7;
                } else
                {
                    this.iconImg0.scaleX = this.iconImg0.scaleY = this.iconImg1.scaleX = this.iconImg1.scaleY = 1;
                }
            }
            //自己的奖励信息
            this.selfAwardLabel.text = this.bindData.inviterAward.toString();
            //好友的奖励信息
            this.friendAwardLabel.text = this.bindData.inviteesAward.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }
}