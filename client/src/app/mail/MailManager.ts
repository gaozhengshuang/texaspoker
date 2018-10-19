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
        let def: table.IMailDefine = table.MailById[data.tid];
        let content = def.Content;
        if (def)
        {
            switch (def.Type)
            {
                case MailTempletType.MTT:
                    content = MailManager.analyzeMtt(data, content);
                    break;
            }
        }
        mail.Content = content;
        MailManager.addOneMail(mail);
    }
    /**
     * 解析锦标赛邮件
     */
    private static analyzeMtt(data: msg.IMailDetail, content:string): string
    {
        let name = game.StringConstants.Empty;
        let mttDef: table.IChampionshipDefine = table.ChampionshipById[data.mtttid];
        if (mttDef)
        {
            name = mttDef.Name;
        }
        let rankStr = game.StringConstants.Empty;
        switch (data.mttrank)
        {
            case 1:
                rankStr = "冠军";
                break;
            default:
                rankStr = "第" + data.mttrank + "名";
                break;
        }
        let awardStr = MailManager.getAwardDes(data.mttawardtid);
        game.StringUtil.format(content, [name, rankStr, awardStr]);
        return content;
    }
    /**
     * 获取奖励描述
     */
    private static getAwardDes(id: number): string
    {
        let awardStr = game.StringConstants.Empty;

        let awardDef = table.AwardById[id];
        if (awardDef && awardDef.RewardId)
        {
            for (let i: number = 0; i < awardDef.RewardId.length; i++)
            {
                let itemDef = table.ItemBaseDataById[awardDef.RewardId[i]];
                if (itemDef)
                {
                    awardStr += itemDef.Name;
                }
                awardStr += "*" + awardDef.RewardNum[i] + "、";
            }
            awardStr = awardStr.replace(/、$/g, "");
        }
        return awardStr;
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