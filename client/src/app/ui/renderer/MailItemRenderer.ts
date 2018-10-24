/**
 * 邮件渲染项
 */
class MailItemRenderer extends BaseItemRenderer<MailInfo>
{
    public itemTitleLabel: eui.Label//邮件标题
    public itemDesLabel: eui.Label;//邮件描述
    public takePrizeBtn: eui.Button//领取附件
    public takeDesLabel: eui.Label//附件状态
    public dateLabel: eui.Label;//邮件日期
    public itemComp: CommonIcon;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.MailItemRenderer;
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.takePrize, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    }

    private refresh()
    {
        if (this.bindData)
        {
            this.itemTitleLabel.text = this.bindData.Title;
            this.itemDesLabel.textFlow = game.TextUtil.parse(this.bindData.Content);
            this.dateLabel.text = game.DateTimeUtil.formatDate(new Date(this.bindData.Date * 1000), game.DateTimeUtil.Format_China_MonthDay);
            if (this.bindData.isHavePrize)
            {
                if (this.bindData.items && this.bindData.items.length > 0)
                {
                    this.itemComp.init(this.bindData.items[0].id, 88);
                }
                else if (this.bindData.mttawardtid > 0)
                {
                    let awardDef: table.IAwardDefine = table.AwardById[this.bindData.mttawardtid];
                    if (awardDef && awardDef.RewardId.length > 0)
                    {
                        this.itemComp.init(awardDef.RewardId[0], 88);
                    }
                }
                if (this.bindData.IsGot)
                {
                    this.takePrizeBtn.visible = false;
                    this.takeDesLabel.visible = true;
                }
                else
                {
                    this.takePrizeBtn.visible = true;
                    this.takeDesLabel.visible = false;
                }
            }
            else
            {
                this.itemComp.init(SheetSubName.DefaultMail, 88);
                this.takePrizeBtn.visible = false;
                this.takeDesLabel.visible = false;
            }
        }
    }

    //领取附件
    private takePrize()
    {
        PropertyManager.OpenGet();
        SocketManager.call(Command.C2GW_ReqTakeMailItem, { "uid": this.bindData.Id }, this.onTakePrize, null, this);
    }
    private onTakePrize(result: game.SpRpcResult)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        this.bindData.IsGot = true;
        PropertyManager.ShowItemList();
        this.refresh();
        MailManager.getMailPrizeEvent.dispatch();
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.takePrizeBtn)
        {
            this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.takePrize, this);
        }
    }
}