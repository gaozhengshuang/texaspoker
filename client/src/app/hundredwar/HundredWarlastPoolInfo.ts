
class HundredWarlastPoolInfo extends BaseServerValueInfo
{
    public copyValueFrom(data: any)
    {
        super.copyValueFrom(data);
        if (data["prizeList"])
        {
            this.prizeList = new Array<SimpleUserInfo>();
            for (let info of data["prizeList"])
            {
                let userinfo: SimpleUserInfo;
                if (HundredWarManager.isSysBanker(info.roleId))
                {
                    userinfo = new SimpleUserInfo(HundredWarManager.sysBanker);
                }
                else
                {
                    userinfo = new SimpleUserInfo();
                    userinfo.copyValueFrom(info);
                }
                this.prizeList.push(userinfo);
            }
        }
        if (data["cards"])
        {
            this.cards = new Array<CardInfo>();
            GamblingUtil.cardArr2CardInfoList(data["cards"], this.cards);
        }
    }
    public cards: Array<CardInfo>;
    /**
     * 分到的总额
     */
    public gold: number;
    /**
     * 	日期 时间戳
     */
    public time: number;
    /**
     * 获奖列表
     */
    public prizeList: Array<SimpleUserInfo>;
}