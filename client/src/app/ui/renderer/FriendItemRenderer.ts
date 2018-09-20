/**
 * 好友列表项面板
*/
class FriendItemRenderer extends BaseItemRenderer<FriendInfo>
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
     * 金币数量
    */
    private goldNumLabel: eui.Label;
    /**
     * 是否在线
    */
    private isOnlinetoggleBtn: eui.ToggleButton;
    /**
     * 赠送按钮
    */
    private giveBtn: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.FriendItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (this.bindData)
        {
            this.isOnlinetoggleBtn.touchEnabled = false;
            this.userHeadCom.init(this.bindData, 110);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = qin.MathUtil.formatNum(this.bindData.gold);
            if (this.bindData.offlineTime)
            {
                this.isOnlinetoggleBtn.selected = false;
                this.isOnlinetoggleBtn["desLabel"].text = "离线";
                this.isOnlinetoggleBtn["desLabel"].textColor = ColorEnum.OutlineGray;
            } else
            {
                this.isOnlinetoggleBtn.selected = true;
                this.isOnlinetoggleBtn["desLabel"].text = "在线";
                this.isOnlinetoggleBtn["desLabel"].textColor = ColorEnum.OnlineGreen;
            }
            if (this.bindData.giveGold == 1)
            {
                this.giveBtn.enabled = false;
            } else
            {
                this.giveBtn.enabled = true;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.giveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ongiveBtnClick, this);
            this.giveBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            FriendManager.onGiveFriendGoldEvent.addListener(this.changeGiveButtonState, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.giveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ongiveBtnClick, this);
        this.giveBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        FriendManager.onGiveFriendGoldEvent.removeListener(this.changeGiveButtonState, this);
    }
    /**
     *赠送按钮点击事件
    */
    private ongiveBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqGiveFriendGold(this.bindData.roleId);
    }
    /**
     * 赠送好友金币成功后续执行事件
    */
    private changeGiveButtonState(id: number)
    {
        if (this.bindData.roleId == id)
        {
            this.giveBtn.enabled = false;
            UIManager.showFloatTips("您已成功赠送给此好友" + ProjectDefined.giveOnceGoldNum + "金币！");
        }
    }
    private cancelBubble(event: TouchEvent)
    {
        event.stopImmediatePropagation();
    }
}