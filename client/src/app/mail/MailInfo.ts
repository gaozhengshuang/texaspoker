/**
 * 邮件信息
 */
class MailInfo extends BaseServerValueInfo
{
    public reset()
    {
        this.Id = 0;
        this.IsRead = false;
        this.Type = 0;
        this.Title = game.StringConstants.Empty;
        // this.SubType = 0;
        this.Content = game.StringConstants.Empty;
        this.Sender = game.StringConstants.Empty;
        this.SenderId = 0;
        this.Date = 0;
        this.items = null;
        this.IsGot = false;
        this.mtttid = 0;
        this.mttrank = 0;
        this.mttawardtid = 0;
    }
    /**
     * 邮件id
     */
    public Id: number;
    /**
     * 是否已读
     */
    public IsRead: boolean;
    /**
     * 邮件类型0系统邮件，1是通知，2是玩家邮件
     */
    public Type: number;
    /**
     * 邮件标题
     */
    public Title: string;
    /**
     * 当type为0的时候的子类型，如果有这个值，则不传递Title
     */
    // public SubType: number;
    /**
     * 邮件内容
     */
    public Content: string;
    /**
     * 发送日期
     */
    public Date: number;
    /**
     * 	发送人名字
     */
    public Sender: string;
    /**
     * 发送人Id
     */
    public SenderId: number;
    /**
     * 附件列表
     */
    public items:msg.MailItem[];
    /**
     * 是否领取
     */
    public IsGot: boolean;

    //---------------锦标赛邮件字段---------------
    /**
     * 锦标赛表id
     */
    public mtttid:number;
    /**
     * 锦标赛排名
     */
    public mttrank:number;
    /**
     * 锦标赛奖励award表id
     */
    public mttawardtid:number;

    /**
    * 是否有附件
    */
    public get isHavePrize(): boolean
    {
        return this.items && this.items.length > 0 || this.mttawardtid > 0;
    }
}