/**
 * 奖励兑换管理
 */
class AwardManager
{
    public static OnExchanged: game.DelegateDispatcher = new game.DelegateDispatcher();
    public static OnAwardValueChanged: game.DelegateDispatcher = new game.DelegateDispatcher();

    private static _map: game.Dictionary<msg.IAwardGetInfo> = {};
    private static _awardInfoMap: game.Map<number, AwardInfoDefinition[]> = new game.Map<number, AwardInfoDefinition[]>();
    private static _costInfoMap: game.Map<number, AwardInfoDefinition[]> = new game.Map<number, AwardInfoDefinition[]>();

    public static Initialize(result: game.SpRpcResult)
    {
        AwardManager.Reset();
        SocketManager.AddCommandListener(Command.GW2C_PushExchangeTimeRefresh, this.refreshExchangeTime, this);
        let data: msg.GW2C_RetAwardGetInfo = result.data;
        if (data.datalist)
        {
            for (let i: number = 0; i < data.datalist.length; i++)
            {
                this.refreshMapInfo(data.datalist[i]);
            }
        }
        for (let def of table.Award)
        {
            if (def.RewardId)
            {
                let list = [];
                for (let i: number = 0; i < def.RewardId.length; i++)
                {
                    let awInfo = new AwardInfoDefinition();
                    awInfo.id = def.RewardId[i];
                    awInfo.count = def.RewardNum[i];
                    awInfo.type = def.RewardType[i];
                    list[i] = awInfo;
                }
                AwardManager._awardInfoMap.add(def.Id, list);
            }
            if (def.CostType)
            {
                let list = [];
                for (let i: number = 0; i < def.CostType.length; i++)
                {
                    let awInfo = new AwardInfoDefinition();
                    awInfo.id = def.CostId[i];
                    awInfo.count = def.CostNum[i];
                    awInfo.type = def.CostType[i];
                    list[i] = awInfo;
                }
                AwardManager._costInfoMap.add(def.Id, list);
            }
        }
        AwardManager.getExChangeInfoEa.dispatch();
    }
    /**
     * 兑换次数更新
    */
    private static refreshExchangeTime(result: game.SpRpcResult)
    {
        let data: msg.GW2C_PushExchangeTimeRefresh = result.data;
        if (data)
        {
            this.refreshMapInfo(data);
            let info: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(data.id);
            if (info)
            {
                AwardStatistics.Invoke(info);
            }
            AwardManager.OnAwardValueChanged.dispatch(data.id);
        }
    }
    /**
    * 更新_map数据
    */
    private static refreshMapInfo(data: msg.IAwardGetInfo)
    {
        if (data)
        {
            let info: msg.IAwardGetInfo = AwardManager._map[data.id];
            if (!info)
            {
                AwardManager._map[data.id] = data;
            }
            else
            {
                info.count = data.count;
                info.time = data.time;
            }
        }
    }
    /**
     * 发送兑换id
     */
    public static Exchange(id: number, count: number = 1, needAlert: boolean = true)
    {
        let type: AwardExchangeErrorType = AwardManager.GetNotFitErrorType(id);
        if (type != AwardExchangeErrorType.NoError)
        {
            game.Console.log("[兑换错误，错误id]：" + type.toString());
            return;
        }
        if (needAlert)
        {
            PropertyManager.OpenGet();
        }
        if (count < 1)
        {
            count = 1;
        }
        let callback: Function = function (result: game.SpRpcResult)
        {
            AwardManager.OnExchangeFromServer(id, count, needAlert);
        }
        SocketManager.call(Command.C2GW_ReqAwardExchange, { "id": id, "count": count }, callback, null, this);
    }

    private static OnExchangeFromServer(id: number, count: number, needAlert: boolean)
    {
        AwardManager.OnExchanged.dispatch(id);
        if (needAlert)
        {
            PropertyManager.ShowItemList();
        }
    }
    /**
     * 获取不满足条件的错误信息
     */
    public static GetNotFitErrorType(id: number): AwardExchangeErrorType
    {
        let result: AwardExchangeErrorType = AwardExchangeErrorType.NoError;
        let info: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(id);
        if (info)
        {
            let limit: number = AwardManager.GetAwardLimit(id);
            if (limit != 0 && info.count >= limit) //次数达到上限
            {
                result = result | AwardExchangeErrorType.OverTimes;
            }
            let serverTime: Date = TimeManager.GetServerLocalDateTime();
            // if (info.definition.level > UserManager.userInfo.level) //用户等级不满足 //move todo
            // {
            //     result = result | AwardExchangeErrorType.LevelNotEnough;
            // }
            if (!AwardDefined.GetInstance().getPrevIdIsNull(id))
            {
                let def = table.AwardById[info.id];
                if (def)
                {
                    let preInfo: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(def.PreId);
                    limit = AwardManager.GetAwardLimit(def.PreId);
                    if (preInfo && preInfo.count < limit) //前置未完成
                    {
                        result = result | AwardExchangeErrorType.PreNotComplete;
                    }
                }
            }
            return result;
        }
        else
        {
            result = result | AwardExchangeErrorType.NullAward;
            return result;
        }

    }

    /**
     * 客户端判断是否已经达到兑换上限
     */
    public static IsToLimitClient(awardId: number): boolean
    {
        let limit: number = AwardManager.GetAwardLimit(awardId);
        let times: number = AwardManager.GetTimes(awardId);
        if (times >= limit && limit != 0)
        {
            return true;
        }
        return false;
    }

    /**
     * 获取当前兑换的次数
     */
    public static GetTimes(id: number): number
    {
        let info: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(id);
        if (info)
        {
            return info.count;
        }
        return 0;
    }
    public static GetAwardLimit(awardId: number): number
    {
        let def: table.IAwardDefine = table.AwardById[awardId];
        if (def)
        {
            // if (game.StringUtil.isNullOrEmpty(def.costName))  //move todo
            // {
            return def.Limit;
            // } //move todo
            // return 0; //move todo
        }
    }
    /**
     * 获取最近一次的修改时间
     */
    public static GetLastAlterDate(id: number): number
    {
        let info: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(id);
        if (info)
        {
            return info.time;
        }
        return 0;
    }
    /**
     * 获得兑换信息
     */
    public static GetExchangeInfo(id: number): msg.IAwardGetInfo
    {
        let info: msg.IAwardGetInfo = AwardManager._map[id];
        return info;
    }
    /**
     * 判断某个奖励是否达到限制次数上限
    */
    public static isToLimit(awardDef: table.IAwardDefine): boolean
    {
        if (awardDef)
        {
            let info: msg.IAwardGetInfo = AwardManager.GetExchangeInfo(awardDef.Id);
            if (info && info.count >= awardDef.Limit)
            {
                return true;
            }
        }
        return false;
    }

    private static Reset()
    {
        AwardManager._awardInfoMap.clear();
        AwardManager._costInfoMap.clear();
        AwardManager._map = {};
        for (let def of table.Award)
        {
            let info: msg.IAwardGetInfo = { id: def.Id, count: 0, time: TimeManager.Utc1970.getTime()};
            AwardManager._map[def.Id] = info;
        }
    }

    /**
     * 拉取兑换记录
     */
    public static reqAwardRecord(logId: number, startId: number, count: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let recordList: Array<AwardRecordInfo> = new Array<AwardRecordInfo>();
            if (result.data["loglist"])
            {
                for (let info of result.data["loglist"])
                {
                    let awardRecordInfo: AwardRecordInfo = new AwardRecordInfo();

                    awardRecordInfo.copyValueFromIgnoreCase(info);
                    recordList.push(awardRecordInfo);
                }
            }
            AwardManager.getAwardRecordEvent.dispatch(recordList);
        }
        SocketManager.call(Command.C2GW_ReqAwardRecord, { "logid": logId, "startid": startId, "count": count }, callback, null, this);
    }

    public static getAwardInfoDefinitionList(id: number): AwardInfoDefinition[]
    {
        return this._awardInfoMap.getValue(id);
    }
    public static getCostInfoDefinitionList(id: number): AwardInfoDefinition[]
    {
        return this._costInfoMap.getValue(id);
    }

    /**
     * 拉取兑换数据成功广播
    */
    public static getExChangeInfoEa: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 拉取兑换记录事件
     */
    public static getAwardRecordEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}