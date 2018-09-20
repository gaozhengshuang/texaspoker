/**
 * 奖励兑换管理
 */
class AwardManager
{
    public static OnExchanged: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    public static OnAwardValueChanged: qin.DelegateDispatcher = new qin.DelegateDispatcher();

    private static _map: qin.Dictionary<number, AwardTimesInfo> = new qin.Dictionary<number, AwardTimesInfo>();

    public static Initialize(data: qin.SpRpcResult)
    {
        AwardManager.Reset();
        SocketManager.AddCommandListener(Command.ExchangeTimeRefresh_Push_2031, this.refreshExchangeTime, this);
        let objs: Array<qin.SpRpcResult> = data.data["DataList"] as Array<qin.SpRpcResult>;
        if (objs)
        {
            let data: qin.SpRpcResult;
            for (let i: number = 0; i < objs.length; i++)
            {
                data = objs[i];
                this.refreshMapInfo(data);
            }
        }
        AwardManager.getExChangeInfoEa.dispatch();
    }
    /**
     * 兑换次数更新
    */
    private static refreshExchangeTime(result: qin.SpRpcResult)
    {
        if (result.data)
        {
            this.refreshMapInfo(result.data);
            let info: AwardTimesInfo = AwardManager.GetExchangeInfo(result.data.Id);
            if (info)
            {
                AwardStatistics.Invoke(info);
            }
            AwardManager.OnAwardValueChanged.dispatch(result.data.Id);
        }
    }
    /**
    * 更新_map数据
    */
    private static refreshMapInfo(data: any)
    {
        if (data)
        {
            if (AwardManager._map.containsKey(data.Id))
            {
                let info: AwardTimesInfo = AwardManager._map.getValue(data.Id);
                info.times = parseInt(data.Count);
                if (data.Time != null)
                {
                    info.lastTime = parseInt(data.Time);
                }
                else
                {
                    info.lastTime = 0;
                }
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
            qin.Console.log("[兑换错误，错误id]：" + type.toString());
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
        let callback: Function = function (result: qin.SpRpcResult)
        {
            AwardManager.OnExchangeFromServer(id, count, needAlert);
        }
        SocketManager.call(Command.Award_Exchange_3113, { "Id": id, "Count": count }, callback, null, this);
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
        let info: AwardTimesInfo = AwardManager.GetExchangeInfo(id);
        if (InfoUtil.checkAvailable(info))
        {
            let limit: number = AwardManager.GetAwardLimit(id);
            if (limit != 0 && info.times >= limit) //次数达到上限
            {
                result = result | AwardExchangeErrorType.OverTimes;
            }
            let serverTime: Date = TimeManager.GetServerLocalDateTime();
            if (info.definition.level > UserManager.userInfo.level) //用户等级不满足
            {
                result = result | AwardExchangeErrorType.LevelNotEnough;
            }
            if (!AwardDefined.GetInstance().getPrevIdIsNull(id))
            {
                let preInfo: AwardTimesInfo = AwardManager.GetExchangeInfo(info.definition.preId);
                limit = AwardManager.GetAwardLimit(info.definition.preId);
                if (preInfo.times < limit) //前置未完成
                {
                    result = result | AwardExchangeErrorType.PreNotComplete;
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
        let info: AwardTimesInfo = AwardManager.GetExchangeInfo(id);
        if (info)
        {
            return info.times;
        }
        return 0;
    }
    public static GetAwardLimit(awardId: number): number
    {
        let def: AwardDefinition = AwardDefined.GetInstance().getDefinition(awardId);
        if (def)
        {
            if (qin.StringUtil.isNullOrEmpty(def.costName))
            {
                return def.limit;
            }
            return 0;
        }
    }
    /**
     * 获取最近一次的修改时间
     */
    public static GetLastAlterDate(id: number): number
    {
        let info: AwardTimesInfo = AwardManager.GetExchangeInfo(id);
        if (info)
        {
            return info.lastTime;
        }
        return 0;
    }
    /**
     * 获得兑换信息
     */
    public static GetExchangeInfo(id: number): AwardTimesInfo
    {
        let info: AwardTimesInfo;
        if (AwardManager._map.getValue(id))
        {
            info = AwardManager._map.getValue(id);
        }
        return info;
    }
    /**
     * 判断某个奖励是否达到限制次数上限
    */
    public static isToLimit(awardDef: AwardDefinition): boolean
    {
        if (awardDef)
        {
            let info: AwardTimesInfo = AwardManager.GetExchangeInfo(awardDef.id);
            if (info && info.times >= awardDef.limit)
            {
                return true;
            }
        }
        return false;
    }

    private static Reset()
    {
        AwardManager._map.clear();
        let defDic: qin.Dictionary<number, AwardDefinition> = AwardDefined.GetInstance().awardDefinitionDic;
        let keys: Array<number> = defDic.getKeys();
        for (let i: number = 0; i < keys.length; i++)
        {
            let key = keys[i];
            let info: AwardTimesInfo = new AwardTimesInfo();
            info.id = key;
            info.times = 0;
            info.lastTime = TimeManager.Utc1970.getTime();
            AwardManager._map.add(info.id, info);
        }
    }

    /**
     * 拉取兑换记录
     */
    public static reqAwardRecord(logId: number, startId: number, count: number)
    {
        let callback: Function = function (result: qin.SpRpcResult)
        {
            let recordList: Array<AwardRecordInfo> = new Array<AwardRecordInfo>();
            if (result.data["logList"])
            {
                for (let info of result.data["logList"])
                {
                    let awardRecordInfo: AwardRecordInfo = new AwardRecordInfo();
                    awardRecordInfo.copyValueFrom(info);
                    recordList.push(awardRecordInfo);
                }
            }
            AwardManager.getAwardRecordEvent.dispatch(recordList);
        }
        SocketManager.call(Command.Award_Record_3713, { "logId": logId, "startId": startId, "count": count }, callback, null, this);
    }

    /**
     * 拉取兑换数据成功广播
    */
    public static getExChangeInfoEa: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    /**
     * 拉取兑换记录事件
     */
    public static getAwardRecordEvent: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}