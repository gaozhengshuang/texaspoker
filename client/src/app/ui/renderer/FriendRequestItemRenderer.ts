/**
 * 好友请求项面板
*/
class FriendRequestItemRenderer extends BaseItemRenderer<BaseFriendInfo>
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
     * id
    */
    private idLabel: eui.Label;
    /**
     * 接受按钮
    */
    private receiveBtn: eui.Button;
    /**
     * 拒绝按钮
    */
    private refuseBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.FriendRequestItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.userHeadCom.init(this.bindData, 110);
            this.nameLabel.text = this.bindData.name;
            this.idLabel.text = this.bindData.roleId.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
            this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.refuseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onrefuseBtnClick, this);
            this.refuseBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onreceiveBtnClick, this);
        this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.refuseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onrefuseBtnClick, this);
        this.refuseBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
    }
    /**
     *接受按钮点击事件
    */
    private onreceiveBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveFriendRequest(this.bindData.roleId, FriendReceiveType.Receive);
    }
    /**
     * 拒绝按钮点击事件
    */
    private onrefuseBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveFriendRequest(this.bindData.roleId, FriendReceiveType.Reject);
    }
    private cancelBubble(event: egret.TouchEvent)
    {
        event.stopImmediatePropagation();
    }
}