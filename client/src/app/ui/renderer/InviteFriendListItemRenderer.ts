/**
 * 邀请好友项列表
*/
class InviteFriendListItemRenderer extends BaseItemRenderer<InviteInfo>
{
    public userHeadCom: CircleHeadComponent;//头像
    public nameLabel: eui.Label;//用户名；
    public isOnlineLabel: eui.Label;//是否在线
    public vipCountBtn: eui.Button;//钻石（元）；
    public isCheckedBtn: eui.CheckBox;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.InviteFriendItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        if (this.bindData && this.bindData.friendInfo != null)
        {
            this.isCheckedBtn.selected = this.bindData.state;
            this.userHeadCom.init(this.bindData.friendInfo, 90);
            this.nameLabel.text = this.bindData.friendInfo.name;
            if (this.bindData.friendInfo.offlineTime)
            {
                this.isOnlineLabel.text = "离线";
                this.isOnlineLabel.textColor = ColorEnum.OutlineGray;
            }
            else
            {
                this.isOnlineLabel.text = "在线";
                this.isOnlineLabel.textColor = ColorEnum.InviteOnlineGreen;
            }
        }
    }
    public setChecked(flag: boolean)
    {
        if (this.isCheckedBtn)
        {
            this.isCheckedBtn.selected = flag;
        }
    }
}