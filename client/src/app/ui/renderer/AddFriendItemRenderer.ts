/**
 * 添加好友项面板
*/
class AddFriendItemRenderer extends BaseItemRenderer<BaseFriendInfo>
{
    /**
     * 头像组件
    */
    public userHeadCom: CircleHeadComponent;
    /**
     * 昵称
    */
    private nameLabel: eui.Label;
    /**
     * id
    */
    private idLabel: eui.Label;
    /**
     * 添加按钮
    */
    private addBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.AddFriendItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.addBtn.enabled = true;
            this.userHeadCom.init(this.bindData, 110);
            this.nameLabel.text = this.bindData.name;
            this.idLabel.text = this.bindData.roleId.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
            this.addBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            FriendManager.onAddPlayerEvent.addListener(this.setGrayBtn, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtnClick, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        FriendManager.onAddPlayerEvent.removeListener(this.setGrayBtn, this);
    }
    /**
     *添加按钮点击事件
    */
    private onAddBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqAddPlayer(this.bindData.roleId);
    }
    /**
     * 请求成功后
    */
    private setGrayBtn(roleId: number)
    {
        if (this.bindData.roleId == roleId)
        {
            this.addBtn.enabled = false;
        }
    }
    private cancelBubble(event: egret.TouchEvent)
    {
        event.stopImmediatePropagation();
    }
}