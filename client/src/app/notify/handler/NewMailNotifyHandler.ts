/**
 * 新邮件/未领取邮件红点通知处理
 */
class NewMailNotifyHandler extends BaseNotifyHandle
{
    protected init()
    {
        super.init();
        MailManager.getMailListEvent.addListener(this.refresh, this);
        MailManager.getMailPrizeEvent.addListener(this.refresh, this);
    }
    public get count(): number
    {
        if (this.type == NotifyType.Mail_HaveNewSystem)
        {
            return MailManager.isHaveNotTakeMailByType(0) ? 1 : 0;
        }
        else if (this.type == NotifyType.Mail_HaveNewPlayer)
        {
            return MailManager.isHaveNotTakeMailByType(1) ? 1 : 0;
        }
        return 0;
    }
    private refresh()
    {
        this.dispatchNotify();
    }
    public destroy()
    {
        MailManager.getMailListEvent.removeListener(this.refresh, this);
        MailManager.getMailPrizeEvent.removeListener(this.refresh, this);
    }
}