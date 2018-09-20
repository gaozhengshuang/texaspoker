/**
 * 好用赠送礼物项面板
*/
class GiftItemRenderer extends BaseItemRenderer<BaseFriendInfo>
{
    /**
     * 头像组件
    */
    public userHeadCom: CircleHeadComponent
    /**
     * 昵称
    */
    private nameLabel: eui.Label;
    /**
     * 被赠送的金币数量提醒
    */
    private goldNumLabel: eui.Label;
    /**
     * 领取按钮
    */
    private receiveBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GiftItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.userHeadCom.init(this.bindData, 110);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = "赠送给您" + ProjectDefined.giveOnceGoldNum + "好友金币";
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
    }
    /**
     *领取按钮点击事件
    */
    private onreceiveBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveGift(this.bindData.roleId);
    }
}