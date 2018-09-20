/**
 * 百人大战庄家项
*/
class HundredWarBankerItemRenderer extends BaseItemRenderer<SimpleUserInfo>
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
    /**
     * 庄家标识
     */
    public bankImg: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HundredWarBankerItemRenderer;
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
            this.userHeadCom.init(this.bindData, 70);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = "$" + qin.MathUtil.formatNum(this.bindData.gold);
            this.setBankerImg();
        }
    }

    /**
    * 设置庄家标识
    */
    private setBankerImg()
    {
        if (HundredWarManager.panelHandler.HundredWarBankerList.indexOf(this.bindData) == 0)
        {
            this.bankImg.visible = true;
        }
        else
        {
            this.bankImg.visible = false;
        }
    }

    private gotoUserInfo()
    {
        if (!HundredWarManager.isSysBanker(this.bindData.roleId))
        {
            SoundManager.playEffect(MusicAction.buttonClick);
            UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
        }
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    }
}
