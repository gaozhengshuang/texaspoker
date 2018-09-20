/**
 * 邀请活动领取金币渲染项
 */
class InviteGoldItemRenderer extends BaseItemRenderer<InviteBindInfo>
{
    public timeLabel: eui.Label;//时间
    public nameLabel: eui.Label;//用户名字
    public getNumLabel: eui.Label;//获得的金币数
    public payNumLabel: eui.Label;//充值的金币

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.InviteGoldItemRenderer;
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
            this.payNumLabel.text = qin.MathUtil.formatNum(this.bindData.gold);
            this.getNumLabel.text = qin.MathUtil.formatNum(this.bindData.gold * 0.1);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }
}