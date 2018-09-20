class MailInfo extends BaseServerValueInfo
{
    public reset()
    {

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
    public SubType: number;
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
     * 附件json
     */
    public attaJson: string;
    public attaList: Array<AwardInfoDefinition>;
    /**
     * 是否领取
     */
    public IsGot: boolean;
    /**
    * 是否有附件
    */
    public get isHavePrize(): boolean
    {
        return this.attaList != null && this.attaList.length > 0
    }
}