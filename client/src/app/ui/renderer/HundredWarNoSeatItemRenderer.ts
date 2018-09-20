/**
 * 百人大战无座玩家项面板
*/
class HundredWarNoSeatItemRenderer extends BaseItemRenderer<SimpleUserInfo>
{
    /**
     * 头像组件
    */
    public userHeadCom: CircleHeadComponent;
    /**
     * 昵称
    */
    public nameLabel: eui.Label;
    /**
     * 金币
    */
    public goldNumLabel: eui.Label;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HundredWarNoSeatItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    }

    private refreshUI()
    {
        if (this.bindData)
        {
            this.userHeadCom.init(this.bindData, 80);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = "$" + qin.MathUtil.formatNum(this.bindData.gold);
        }
    }

    private gotoUserInfo()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    }
}
