/**
 * 邮件管理
 */
class MailManager
{
    public static mailList: Array<MailInfo> = new Array<MailInfo>();

    /**
     * 未读邮件数量
     */
    public static unReadCount: number = 0;
    /**
     * 重置数据
     */
    public static Reset()
    {
        MailManager.unReadCount = 0;
        qin.ArrayUtil.Clear(MailManager.mailList);
        SocketManager.AddCommandListener(Command.Mail_Push_New_2024, MailManager.OnMailNewNofityFromServer, this);
    }

    /**
     * 新邮件的通知协议
     */
    private static OnMailNewNofityFromServer(result: qin.SpRpcResult)
    {
        MailManager.unReadCount++;
        MailManager.RequestMailList(0, 1);
    }

    public static initialize(result: qin.SpRpcResult, isPush: boolean)
    {
        if (result.data["MailList"])
        {
            for (let def of result.data["MailList"])
            {
                let mail: MailInfo = new MailInfo();
                mail.copyValueFrom(def);
                if (mail.attaJson)
                {
                    mail.attaList = new Array<AwardInfoDefinition>();
                    try
                    {
                        let obj: any = JSON.parse(mail.attaJson);
                        for (let atta of obj)
                        {
                            let award: AwardInfoDefinition = new AwardInfoDefinition();
                            award.id = atta["Id"];
                            award.type = atta["Type"];
                            award.count = atta["Count"];
                            mail.attaList.push(award);
                        }
                    }
                    catch (e)
                    {
                        qin.Console.logError("解析邮件json失败！    mailId：" + mail.Id);
                    }
                }
                if (mail.SubType)
                {
                    let def: MailDefintion = MailDefined.GetInstance().getDefinition(mail.SubType);
                    if (def)
                    {
                        mail.Title = def.title;
                        let content: string = def.content;
                        if (def.type == MailResolveType.RosolveAnnex)
                        {
                            if (mail.attaList && mail.attaList.length > 0)
                            {
                                let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(mail.attaList[0].id);
                                content = content.replace("{" + 0 + "}", itemDef.name);
                            }
                        }
                        else if (def.type == MailResolveType.RosolveServer)
                        {
                            if (mail.Content)
                            {
                                let paramStr: Array<string> = mail.Content.split(qin.StringConstants.VerticalLine);
                                for (let i: number = 0; i < paramStr.length; i++)
                                {
                                    content = content.replace("{" + i + "}", paramStr[i]);
                                }
                            }
                        }
                        else if (def.type == MailResolveType.MixRosolve)
                        {
                            if (mail.attaJson && mail.attaJson.length > 0)
                            {
                                if (mail.attaList[0].id == ItemFixedId.gold)
                                {
                                    content = content.replace("{" + 0 + "}", mail.attaList[0].count.toString());
                                }
                                else if (mail.attaList[0].id == ItemFixedId.vip)
                                {
                                    content = content.replace("{" + 0 + "}", mail.attaList[0].count + "个月VIP");
                                }
                                else if (mail.attaList[0].id == ItemFixedId.yearVip)
                                {
                                    content = content.replace("{" + 0 + "}", "年费VIP");
                                }
                                else
                                {
                                    let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(mail.attaList[0].id);
                                    let itemDes: string = " * " + mail.attaList[0].count;
                                    content = content.replace("{" + 0 + "}", itemDef.name + itemDes);
                                }
                            }
                            if (mail.Content)
                            {
                                let paramStr: Array<string> = mail.Content.split(qin.StringConstants.VerticalLine);
                                for (let i: number = 0; i < paramStr.length; i++)
                                {
                                    let index: number = i + 1;
                                    content = content.replace("{" + index + "}", paramStr[i]);
                                }
                            }
                        }
                        mail.Content = content;
                    }
                }
                MailManager.addOneMail(mail, isPush);
            }

            MailManager.getMailListEvent.dispatch();
        }
    }

    public static unshiftList(result: qin.SpRpcResult)
    {
        MailManager.initialize(result, false);
    }
    /**
     * 添加一封邮件（isPush：true为向后添加，false为向前添加）
     */
    private static addOneMail(info: MailInfo, isPush: boolean)
    {
        if (isPush)
        {
            MailManager.mailList.push(info);
            if (MailManager.mailList.length > GameSetting.MaxMailNum)
            {
                MailManager.mailList.shift();
            }
        }
        else
        {
            MailManager.mailList.unshift(info);
            if (MailManager.mailList.length > GameSetting.MaxMailNum)
            {
                MailManager.mailList.pop();
            }
        }

    }
    /**
     * 请求邮件列表
     */
    public static RequestMailList(startId: number, count: number)
    {
        SocketManager.call(Command.Mail_GetList_3097, { "StartId": startId, "Count": count }, MailManager.unshiftList, null, this);
    }

    /**
     *  获取列表中最大邮件id
     */
    public static getMaxMailId(): number
    {
        if (MailManager.mailList)
        {
            let maxId: number = 0;
            for (let i: number = 0; i < MailManager.mailList.length; i++)
            {
                if (MailManager.mailList[i].Id > maxId)
                {
                    maxId = MailManager.mailList[i].Id;
                }
            }
            return maxId;
        }
        return undefined;
    }

    /**
     * 根据类型获取列表
     */
    public static getListByType(type: number): Array<MailInfo> 
    {
        if (MailManager.mailList)
        {
            let list: Array<MailInfo> = new Array<MailInfo>();
            for (let mailInfo of MailManager.mailList)
            {
                if (mailInfo.Type == type)
                {
                    list.push(mailInfo);
                }
            }
            return list;
        }
        return null;
    }
    /**
     * 某种类型是否存在未领取邮件
     */
    public static isHaveNotTakeMailByType(type: number): boolean
    {
        let list: MailInfo[] = MailManager.getListByType(type);
        if (list)
        {
            for (let mailInfo of list)
            {
                if (mailInfo.isHavePrize && !mailInfo.IsGot)
                {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    /**
	 * 拉取邮件完成事件
	 */
    public static getMailListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 领取邮件附件事件
     */
    public static getMailPrizeEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}