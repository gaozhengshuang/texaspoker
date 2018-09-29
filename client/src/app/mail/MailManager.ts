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
        game.ArrayUtil.Clear(MailManager.mailList);
        SocketManager.AddCommandListener(Command.GW2C_PushNewMail, MailManager.OnMailNewNofityFromServer, this);
    }

    /**
     * 新邮件的通知协议
     */
    private static OnMailNewNofityFromServer(result: game.SpRpcResult)
    {
        MailManager.unReadCount++;
        // MailManager.RequestMailList(0, 1);
        let data: msg.GW2C_PushNewMail = result.data;
        MailManager.analyzeMail(data.mail);
        MailManager.mailList.sort((a, b) => { return b.Id - a.Id });
        MailManager.tryRemoveMove();
        MailManager.getMailListEvent.dispatch();
    }

    public static initialize(result: game.SpRpcResult)
    {
        let data: msg.GW2C_RetMailList = result.data;
        if (data && data.maillist)
        {
            for (let info of data.maillist)
            {
                MailManager.analyzeMail(info);
            }
            MailManager.mailList.sort((a, b) => { return b.Id - a.Id });
            MailManager.tryRemoveMove();
            MailManager.getMailListEvent.dispatch();
        }
    }

    public static analyzeMail(data: msg.IMailDetail)
    {
        let mail: MailInfo = new MailInfo();
        mail.copyValueFromIgnoreCase(data);
        if (mail.SubType)
        {
            let def: table.IMailDefine = table.MailById[mail.SubType];
            if (def)
            {
                mail.Title = def.Title;
                // let content: string = def.Content; //move todo
                // if (def.Type == MailResolveType.RosolveAnnex)
                // {
                //     if (mail.items && mail.items.length > 0)
                //     {
                //         let itemDef: table.IItemBaseDataDefine = table.ItemBaseDataById[mail.items[0].id];
                //         content = content.replace("{" + 0 + "}", itemDef.Name);
                //     }
                // }
                // else if (def.Type == MailResolveType.RosolveServer)
                // {
                //     if (mail.Content)
                //     {
                //         let paramStr: Array<string> = mail.Content.split(game.StringConstants.VerticalLine);
                //         for (let i: number = 0; i < paramStr.length; i++)
                //         {
                //             content = content.replace("{" + i + "}", paramStr[i]);
                //         }
                //     }
                // }
                // else if (def.Type == MailResolveType.MixRosolve)
                // {
                //     if (mail.items && mail.items.length > 0)
                //     {
                //         if (mail.items[0].id == ItemFixedId.gold)
                //         {
                //             content = content.replace("{" + 0 + "}", mail.items[0].num.toString());
                //         }
                //         else if (mail.items[0].id == ItemFixedId.vip)
                //         {
                //             content = content.replace("{" + 0 + "}", mail.items[0].num + "个月VIP");
                //         }
                //         else if (mail.items[0].id == ItemFixedId.yearVip)
                //         {
                //             content = content.replace("{" + 0 + "}", "年费VIP");
                //         }
                //         else
                //         {
                //             let itemDef: table.IItemBaseDataDefine = table.ItemBaseDataById[mail.items[0].id];
                //             let itemDes: string = " * " + mail.items[0].num;
                //             content = content.replace("{" + 0 + "}", itemDef.Name + itemDes);
                //         }
                //     }
                //     if (mail.Content)
                //     {
                //         let paramStr: Array<string> = mail.Content.split(game.StringConstants.VerticalLine);
                //         for (let i: number = 0; i < paramStr.length; i++)
                //         {
                //             let index: number = i + 1;
                //             content = content.replace("{" + index + "}", paramStr[i]);
                //         }
                //     }
                // }
                // mail.Content = content;
            }
        }
        MailManager.addOneMail(mail);
    }
    public static newMailPush(result: game.SpRpcResult)
    {
        let data: msg.GW2C_PushNewMail = result.data;
        MailManager.analyzeMail(data.mail);
    }
    /**
     * 添加一封邮件
     */
    private static addOneMail(info: MailInfo)
    {
        MailManager.mailList.unshift(info);
    }
    private static tryRemoveMove()
    {
        if (MailManager.mailList.length > GameSetting.MaxMailNum)
        {
            MailManager.mailList.pop()
        }
    }
    /**
     * 请求邮件列表
     */
    public static RequestMailList(startId: number, count: number)
    {
        SocketManager.call(Command.C2GW_ReqMailList, { "startid": startId, "count": count }, MailManager.newMailPush, null, this);
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
    public static getMailListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 领取邮件附件事件
     */
    public static getMailPrizeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}