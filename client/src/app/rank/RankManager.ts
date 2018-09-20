/**
 * 排行榜管理
 */
class RankManager
{
    /**
     * 排行榜总表
     */
    public static allRankList: Array<RankListInfo>;
    /**
     * 初始化总表
     */
    public static initialize()
    {
        RankManager.allRankList = new Array<RankListInfo>();
        for (let def of RankDefined.GetInstance().dataList)
        {
            let listInfo: RankListInfo = new RankListInfo();
            listInfo.definition = def;
            listInfo.lastTime = 0;
            RankManager.allRankList.push(listInfo);
        }
    }

    /**
    * 重置数据
    */
    public static reset()
    {
        qin.ArrayUtil.Clear(RankManager.allRankList);
    }

	/**
	 * 计算排行榜的type类型
	 */
    public static getListType(rankType: number, listType: number): number
    {
        if (rankType == RankTabType.Vip)
        {
            return RankType.Vip;
        }
        else
        {
            return rankType * 2 + listType + 1;
        }
    }
    /**
     * 获取排行信息
     */
    public static getRankListInfo(type: RankType, param1?: number, param2?: number, param3?: number): RankListInfo
    {
        for (let listInfo of RankManager.allRankList)
        {
            let def: RankDefinition = listInfo.definition;
            if (def)
            {
                if (param3)
                {
                    if (def.type == type && def.param1 == param1 && def.param2 == param2 && def.param3 == param3)
                    {
                        return listInfo;
                    }
                }
                else if (param2)
                {
                    if (def.type == type && def.param1 == param1 && def.param2 == param2)
                    {
                        return listInfo;
                    }
                }
                else if (param1)
                {
                    if (def.type == type && def.param1 == param1)
                    {
                        return listInfo;
                    }
                }
                else
                {
                    if (def.type == type)
                    {
                        return listInfo;
                    }
                }
            }
        }
        qin.Console.log("排行榜表配置异常！" + " type:" + type + " param1:" + param1 + " param2:" + param2 + " param3:" + param3);
        return null;
    }

    /**
     * 拉取排行榜列表
     */
    public static reqRankList(type: RankType, isGetMyRank: number = 1, param1?: number, param2?: number, param3?: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            if (result.data)
            {
                let list: Array<RankInfo> = new Array<RankInfo>();
                if (result.data["rankList"])
                {
                    for (let def of result.data["rankList"])
                    {
                        let rank: RankInfo = new RankInfo();
                        rank.reset();
                        rank.copyValueFrom(def);
                        rank.type = type;
                        list.push(rank);
                    }
                }
                let rankListInfo: RankListInfo = RankManager.getRankListInfo(type, param1, param2, param3);
                if (rankListInfo)
                {
                    rankListInfo.list = list;
                    rankListInfo.lastTime = TimeManager.GetServerUtcTimestamp();
                }
                RankManager.getRankListEvent.dispatch(result.data.myRank);
            }
        };
        let sendObj: any;
        if (param3)
        {
            sendObj = { type: type, rank: isGetMyRank, param1: param1, param2: param2, param3: param3 };
        }
        else if (param2)
        {
            sendObj = { type: type, rank: isGetMyRank, param1: param1, param2: param2 };
        }
        else if (param1)
        {
            sendObj = { type: type, rank: isGetMyRank, param1: param1 };
        }
        else
        {
            sendObj = { type: type, rank: isGetMyRank };
        }
        SocketManager.call(Command.Req_RankList_3110, sendObj, callback, null, this);
    }
    /**
     * 根据roleId获得排名信息
    */
    public static getRankInfoByRoleId(list: Array<RankInfo>, roleId: number): RankInfo
    {
        if (list)
        {
            for (let info of list)
            {
                if (info.roleId == roleId)
                {
                    return info;
                }
            }
        }
        return null;
    }
    /**
     * 是否排行榜超过刷新时间
     */
    public static isRefreshRank(info: RankListInfo): boolean
    {
        if (InfoUtil.checkAvailable(info))
        {
            let time: number = TimeManager.GetServerUtcTimestamp() - info.lastTime;
            if (time > info.definition.cd)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取排名描述
     */
    public static getRankDes(rank: number, suffix?: boolean): string
    {
        let result: string = qin.StringConstants.Empty;
        switch (rank)
        {
            case 1:
                result += "冠";
                break;
            case 2:
                result += "亚";
                break;
            case 3:
                result += "季";
                break;
            default:
                return rank.toString();
        }
        if (suffix)
        {
            result += "军";
        }
        return result;
    }
    /**
     * 拉取排行榜事件
     */
    public static getRankListEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}
