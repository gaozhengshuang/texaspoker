var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 奖励兑换管理
 */
var AwardManager = (function () {
    function AwardManager() {
    }
    AwardManager.Initialize = function (data) {
        AwardManager.Reset();
        SocketManager.AddCommandListener(Command.ExchangeTimeRefresh_Push_2031, this.refreshExchangeTime, this);
        var objs = data.data["DataList"];
        if (objs) {
            var data_1;
            for (var i = 0; i < objs.length; i++) {
                data_1 = objs[i];
                this.refreshMapInfo(data_1);
            }
        }
        AwardManager.getExChangeInfoEa.dispatch();
    };
    /**
     * 兑换次数更新
    */
    AwardManager.refreshExchangeTime = function (result) {
        if (result.data) {
            this.refreshMapInfo(result.data);
            var info = AwardManager.GetExchangeInfo(result.data.Id);
            if (info) {
                AwardStatistics.Invoke(info);
            }
            AwardManager.OnAwardValueChanged.dispatch(result.data.Id);
        }
    };
    /**
    * 更新_map数据
    */
    AwardManager.refreshMapInfo = function (data) {
        if (data) {
            if (AwardManager._map.containsKey(data.Id)) {
                var info = AwardManager._map.getValue(data.Id);
                info.times = parseInt(data.Count);
                if (data.Time != null) {
                    info.lastTime = parseInt(data.Time);
                }
                else {
                    info.lastTime = 0;
                }
            }
        }
    };
    /**
     * 发送兑换id
     */
    AwardManager.Exchange = function (id, count, needAlert) {
        if (count === void 0) { count = 1; }
        if (needAlert === void 0) { needAlert = true; }
        var type = AwardManager.GetNotFitErrorType(id);
        if (type != AwardExchangeErrorType.NoError) {
            qin.Console.log("[兑换错误，错误id]：" + type.toString());
            return;
        }
        if (needAlert) {
            PropertyManager.OpenGet();
        }
        if (count < 1) {
            count = 1;
        }
        var callback = function (result) {
            AwardManager.OnExchangeFromServer(id, count, needAlert);
        };
        SocketManager.call(Command.Award_Exchange_3113, { "Id": id, "Count": count }, callback, null, this);
    };
    AwardManager.OnExchangeFromServer = function (id, count, needAlert) {
        AwardManager.OnExchanged.dispatch(id);
        if (needAlert) {
            PropertyManager.ShowItemList();
        }
    };
    /**
     * 获取不满足条件的错误信息
     */
    AwardManager.GetNotFitErrorType = function (id) {
        var result = AwardExchangeErrorType.NoError;
        var info = AwardManager.GetExchangeInfo(id);
        if (InfoUtil.checkAvailable(info)) {
            var limit = AwardManager.GetAwardLimit(id);
            if (limit != 0 && info.times >= limit) {
                result = result | AwardExchangeErrorType.OverTimes;
            }
            var serverTime = TimeManager.GetServerLocalDateTime();
            if (info.definition.level > UserManager.userInfo.level) {
                result = result | AwardExchangeErrorType.LevelNotEnough;
            }
            if (!AwardDefined.GetInstance().getPrevIdIsNull(id)) {
                var preInfo = AwardManager.GetExchangeInfo(info.definition.preId);
                limit = AwardManager.GetAwardLimit(info.definition.preId);
                if (preInfo.times < limit) {
                    result = result | AwardExchangeErrorType.PreNotComplete;
                }
            }
            return result;
        }
        else {
            result = result | AwardExchangeErrorType.NullAward;
            return result;
        }
    };
    /**
     * 客户端判断是否已经达到兑换上限
     */
    AwardManager.IsToLimitClient = function (awardId) {
        var limit = AwardManager.GetAwardLimit(awardId);
        var times = AwardManager.GetTimes(awardId);
        if (times >= limit && limit != 0) {
            return true;
        }
        return false;
    };
    /**
     * 获取当前兑换的次数
     */
    AwardManager.GetTimes = function (id) {
        var info = AwardManager.GetExchangeInfo(id);
        if (info) {
            return info.times;
        }
        return 0;
    };
    AwardManager.GetAwardLimit = function (awardId) {
        var def = AwardDefined.GetInstance().getDefinition(awardId);
        if (def) {
            if (qin.StringUtil.isNullOrEmpty(def.costName)) {
                return def.limit;
            }
            return 0;
        }
    };
    /**
     * 获取最近一次的修改时间
     */
    AwardManager.GetLastAlterDate = function (id) {
        var info = AwardManager.GetExchangeInfo(id);
        if (info) {
            return info.lastTime;
        }
        return 0;
    };
    /**
     * 获得兑换信息
     */
    AwardManager.GetExchangeInfo = function (id) {
        var info;
        if (AwardManager._map.getValue(id)) {
            info = AwardManager._map.getValue(id);
        }
        return info;
    };
    /**
     * 判断某个奖励是否达到限制次数上限
    */
    AwardManager.isToLimit = function (awardDef) {
        if (awardDef) {
            var info = AwardManager.GetExchangeInfo(awardDef.id);
            if (info && info.times >= awardDef.limit) {
                return true;
            }
        }
        return false;
    };
    AwardManager.Reset = function () {
        AwardManager._map.clear();
        var defDic = AwardDefined.GetInstance().awardDefinitionDic;
        var keys = defDic.getKeys();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var info = new AwardTimesInfo();
            info.id = key;
            info.times = 0;
            info.lastTime = TimeManager.Utc1970.getTime();
            AwardManager._map.add(info.id, info);
        }
    };
    /**
     * 拉取兑换记录
     */
    AwardManager.reqAwardRecord = function (logId, startId, count) {
        var callback = function (result) {
            var recordList = new Array();
            if (result.data["logList"]) {
                for (var _i = 0, _a = result.data["logList"]; _i < _a.length; _i++) {
                    var info = _a[_i];
                    var awardRecordInfo = new AwardRecordInfo();
                    awardRecordInfo.copyValueFrom(info);
                    recordList.push(awardRecordInfo);
                }
            }
            AwardManager.getAwardRecordEvent.dispatch(recordList);
        };
        SocketManager.call(Command.Award_Record_3713, { "logId": logId, "startId": startId, "count": count }, callback, null, this);
    };
    AwardManager.OnExchanged = new qin.DelegateDispatcher();
    AwardManager.OnAwardValueChanged = new qin.DelegateDispatcher();
    AwardManager._map = new qin.Dictionary();
    /**
     * 拉取兑换数据成功广播
    */
    AwardManager.getExChangeInfoEa = new qin.DelegateDispatcher();
    /**
     * 拉取兑换记录事件
     */
    AwardManager.getAwardRecordEvent = new qin.DelegateDispatcher();
    return AwardManager;
}());
__reflect(AwardManager.prototype, "AwardManager");
//# sourceMappingURL=AwardManager.js.map