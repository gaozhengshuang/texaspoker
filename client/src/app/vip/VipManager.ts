/**
 * 会员管理
 */
class VipManager
{
    /**
    * vip时间变更事件
    */
    public static vipUpgradeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 计算vip类型
     */
    public static getVipType(vipTime: number, yearVipTime: number): VipType
    {
        let serverTimeNow: number = TimeManager.GetServerUtcTimestamp();
        if (yearVipTime && yearVipTime > serverTimeNow)
        {
            return VipType.YearVip;
        }
        else if (vipTime && vipTime > serverTimeNow)
        {
            return VipType.Vip;
        }
        else
        {
            return VipType.NoVip;
        }
    }

    public static initialize()
    {
        SocketManager.AddCommandListener(Command.Vip_GetVipTime_2001, this.onGetVipTime, this);
        this.refreshVipInfo();
    }
    /**
     * 是否开启过vip(无论是否过期,开通过就算)
     */
    private static isOpenEverVip(): boolean
    {
        if (!UserManager.userInfo.vipTime && !UserManager.userInfo.yearVipTime)
        {
            return false;
        }
        return true;
    }
    private static onGetVipTime(result: game.SpRpcResult)
    {
        let flag = VipManager.isOpenEverVip();
        if (result.data["vipTime"])
        {
            UserManager.userInfo.vipTime = result.data["vipTime"];
        }
        if (result.data["yearVipTime"])
        {
            UserManager.userInfo.yearVipTime = result.data["yearVipTime"];
        }
        //UserManager.userInfo.vipLevel = VipManager.getVipLevel(UserManager.userInfo.vipExp);
        UserManager.userInfo.vipType = VipManager.getVipType(UserManager.userInfo.vipTime, UserManager.userInfo.yearVipTime);
        UserManager.userInfo.vipSpeed = ProjectDefined.getVipSpeedDefinition(UserManager.userInfo.vipType).speed;
        if (flag == false && VipManager.isVip() && !UserManager.userInfo.isSafePwd)
        {
            let goSavePanel: Function = function ()
            {
                UIManager.showPanel(UIModuleName.BindPhonePanel, { isShowCreatePwd: true });
            }
            AlertManager.showConfirm("您开通了VIP，保险箱已为您免费开放，请尽快设定您的保险箱密码!", goSavePanel, null, null, null, null, "前往设定");
        }
        VipManager.vipUpgradeEvent.dispatch();
    }

    private static refreshVipInfo()
    {
        UserManager.userInfo.vipType = VipManager.getVipType(UserManager.userInfo.vipTime, UserManager.userInfo.yearVipTime);
        UserManager.userInfo.vipSpeed = ProjectDefined.getVipSpeedDefinition(UserManager.userInfo.vipType).speed;
    }

    public static isVip(info?: UserInfo): boolean
    {
        let tempInfo: UserInfo;
        if (info)
        {
            tempInfo = info;
        }
        else
        {
            tempInfo = UserManager.userInfo;
        }
        if (tempInfo.vipType == null || tempInfo.vipType == VipType.NoVip)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    /**
     * 获取vip到期时间
     */
    public static GetVipTime(info: UserInfo = UserManager.userInfo): number
    {
        let serverTimeNow: number = TimeManager.GetServerUtcTimestamp();
        switch (info.vipType)
        {
            case VipType.NoVip:
                return 0;
            case VipType.YearVip:
                if (info.vipTime > serverTimeNow)
                {
                    return info.vipTime;
                }
                else
                {
                    return info.yearVipTime;
                }
            case VipType.Vip:
                return info.vipTime;
            default:
                return 0;
        }
    }
    /**
     * 获得激活了的月卡信息
    */
    public static getActiveMonthCard(): Array<ShopInfo>
    {
        let monthCardsList: Array<ShopInfo> = new Array<ShopInfo>();
        let activiteMonthCardList: Array<ShopInfo> = new Array<ShopInfo>();
        let info: ShopInfo;
        for (let i: number = 0; i < ShopDefined.GetInstance().dataList.length; i++)
        {
            info = new ShopInfo();
            info.id = ShopDefined.GetInstance().dataList[i].Id;
            if (info.definition && info.definition.type == ShopType.MonthCard)
            {
                monthCardsList.push(info);
            }
        }
        for (let monthCard of monthCardsList)
        {
            if (monthCard.definition)
            {
                let info: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(monthCard.definition.awardId);
                if (info)
                {
                    let left: number = info.time - TimeManager.GetServerUtcTimestamp();
                    if (left > 0)
                    {
                        activiteMonthCardList.push(monthCard);
                    }
                }
            }
            else
            {
                game.Console.log("月卡配置异常！");
            }

        }
        return activiteMonthCardList;
    }
    /**
     * 判断是否激活了月卡
    */
    public static isActiveMonthCard(): boolean
    {
        let infoList: Array<ShopInfo> = VipManager.getActiveMonthCard();
        if (infoList && infoList.length > 0)
        {
            return true;
        }
        return false;
    }
    /**
     * 是否领取了月卡奖励
    */
    public static isBringMonthCardAward()
    {
        let bringAwardDef: table.IAwardDefine;
        let activiteMonthCardList: Array<ShopInfo> = VipManager.getActiveMonthCard();
        if (activiteMonthCardList)
        {
            for (let monthCard of activiteMonthCardList)
            {
                if (monthCard.definition)
                {
                    let info: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(monthCard.definition.awardId);
                    if (info)
                    {
                        bringAwardDef = table.AwardById[info.id];
                        if (bringAwardDef)
                        {
                            let info1: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(bringAwardDef.Id);
                            if (!info1)
                            {
                                return false;
                            } else
                            {
                                if (info1.count < bringAwardDef.Limit)
                                {
                                    return false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    game.Console.log("月卡配置异常！");
                }
            }
        }
        return true;
    }
}