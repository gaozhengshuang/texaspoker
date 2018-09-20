/**
 * 邀请活动领取金豆渲染项
 */
class InviteImazamoxItemRenderer extends BaseItemRenderer<InviteBindInfo>
{
    public timeLabel: eui.Label;//时间
    public nameLabel: eui.Label;//用户名字
    public desLabel: eui.Label;//是否完成描述
    public idLabel: eui.Label;//用户id

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.InviteImazamoxItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.bindData)
        {
            let date: Date = new Date(this.bindData.time * 1000);
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
            this.nameLabel.text = this.bindData.name;
            this.setDes();
            this.idLabel.text = this.bindData.roleId.toString();
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }

    /**
     *设置是否完成描述文字
    */
    private setDes()
    {
        let str: string;
        if (this.bindData.done)
        {
            str = "已完成";
            this.desLabel.textColor = ColorEnum.Invite_Finish_Blue;
        } else
        {
            str = "未完成";
            this.desLabel.textColor = ColorEnum.Invite_NotFinish_Red;
        }
        this.desLabel.text = str;
    }
}