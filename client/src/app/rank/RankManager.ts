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
        for (let def of table.Rank)
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
        game.ArrayUtil.Clear(RankManager.allRankList);
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
            let def: table.IRankDefine = listInfo.definition;
            if (def)
            {
                if (param3)
                {
                    if (def.Type == type && def.Param1 == param1 && def.Param2 == param2 && def.Param3 == param3)
                    {
                        return listInfo;
                    }
                }
                else if (param2)
                {
                    if (def.Type == type && def.Param1 == param1 && def.Param2 == param2)
                    {
                        return listInfo;
                    }
                }
                else if (param1)
                {
                    if (def.Type == type && def.Param1 == param1)
                    {
                        return listInfo;
                    }
                }
                else
                {
                    if (def.Type == type)
                    {
                        return listInfo;
                    }
                }
            }
        }
        game.Console.log("排行榜表配置异常！" + " type:" + type + " param1:" + param1 + " param2:" + param2 + " param3:" + param3);
        return null;
    }

    /**
     * 获取好友排行榜
     */
    public static getFriendRankList(type: RankType, rankListInfo: RankListInfo, cb: Function, target: any)
    {
        let callBack = function ()
        {
            FriendManager.onGetFriendListEvent.removeListener(callBack, this);
            rankListInfo.list = [];
            let rankInfo: RankInfo;
            if (FriendManager.friendList)
            {
                let list = FriendManager.friendList.concat();
                switch (type)
                {
                    case RankType.FriendGold:
                        list.sort((a, b) => { return b.gold - a.gold });
                        break;
                    case RankType.FriendLevel:
                        list.sort((a, b) => { return b.level - a.level });
                        break;
                }
                for (let i: number = 0; i < list.length; i++)
                {
                    let info: FriendInfo = list[i];
                    rankInfo = new RankInfo();
                    rankInfo.type = type;
                    rankInfo.head = info.head;
                    rankInfo.name = info.name
                    rankInfo.rank = i + 1;
                    rankInfo.roleId = info.roleId;
                    rankInfo.sex = info.sex;
                    switch (type)
                    {
                        case RankType.FriendGold:
                            rankInfo.score = info.gold;
                            break;
                        case RankType.FriendLevel:
                            rankInfo.score = info.level;
                            break;
                    }
                    rankListInfo.list.push(rankInfo);
                }
                game.FuncUtil.invoke(cb, target);
            }
        };
        FriendManager.onGetFriendListEvent.addListener(callBack, this);
        FriendManager.reqFriendList();
    }

    /**
     * 拉取排行榜列表
     */
    public static reqRankList(type: RankType, isGetMyRank: number = 1, param1?: number, param2?: number, param3?: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data: msg.GW2C_RetRankList = result.data;
            if (result.data)
            {
                let list: Array<RankInfo> = new Array<RankInfo>();
                if (data.ranklist)
                {
                    for (let info of data.ranklist)
                    {
                        let rank: RankInfo = new RankInfo();
                        rank.reset();
                        rank.copyValueFromIgnoreCase(info);
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
        SocketManager.call(Command.C2GW_ReqRankList, sendObj, callback, null, this);
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
            if (time > info.definition.Cd)
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
        let result: string = game.StringConstants.Empty;
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
    public static getRankListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
