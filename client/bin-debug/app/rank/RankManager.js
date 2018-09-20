var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 排行榜管理
 */
var RankManager = (function () {
    function RankManager() {
    }
    /**
     * 初始化总表
     */
    RankManager.initialize = function () {
        RankManager.allRankList = new Array();
        for (var _i = 0, _a = RankDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            var listInfo = new RankListInfo();
            listInfo.definition = def;
            listInfo.lastTime = 0;
            RankManager.allRankList.push(listInfo);
        }
    };
    /**
    * 重置数据
    */
    RankManager.reset = function () {
        qin.ArrayUtil.Clear(RankManager.allRankList);
    };
    /**
     * 计算排行榜的type类型
     */
    RankManager.getListType = function (rankType, listType) {
        if (rankType == RankTabType.Vip) {
            return RankType.Vip;
        }
        else {
            return rankType * 2 + listType + 1;
        }
    };
    /**
     * 获取排行信息
     */
    RankManager.getRankListInfo = function (type, param1, param2, param3) {
        for (var _i = 0, _a = RankManager.allRankList; _i < _a.length; _i++) {
            var listInfo = _a[_i];
            var def = listInfo.definition;
            if (def) {
                if (param3) {
                    if (def.type == type && def.param1 == param1 && def.param2 == param2 && def.param3 == param3) {
                        return listInfo;
                    }
                }
                else if (param2) {
                    if (def.type == type && def.param1 == param1 && def.param2 == param2) {
                        return listInfo;
                    }
                }
                else if (param1) {
                    if (def.type == type && def.param1 == param1) {
                        return listInfo;
                    }
                }
                else {
                    if (def.type == type) {
                        return listInfo;
                    }
                }
            }
        }
        qin.Console.log("排行榜表配置异常！" + " type:" + type + " param1:" + param1 + " param2:" + param2 + " param3:" + param3);
        return null;
    };
    /**
     * 拉取排行榜列表
     */
    RankManager.reqRankList = function (type, isGetMyRank, param1, param2, param3) {
        if (isGetMyRank === void 0) { isGetMyRank = 1; }
        var callback = function (result) {
            if (result.data) {
                var list = new Array();
                if (result.data["rankList"]) {
                    for (var _i = 0, _a = result.data["rankList"]; _i < _a.length; _i++) {
                        var def = _a[_i];
                        var rank = new RankInfo();
                        rank.reset();
                        rank.copyValueFrom(def);
                        rank.type = type;
                        list.push(rank);
                    }
                }
                var rankListInfo = RankManager.getRankListInfo(type, param1, param2, param3);
                if (rankListInfo) {
                    rankListInfo.list = list;
                    rankListInfo.lastTime = TimeManager.GetServerUtcTimestamp();
                }
                RankManager.getRankListEvent.dispatch(result.data.myRank);
            }
        };
        var sendObj;
        if (param3) {
            sendObj = { type: type, rank: isGetMyRank, param1: param1, param2: param2, param3: param3 };
        }
        else if (param2) {
            sendObj = { type: type, rank: isGetMyRank, param1: param1, param2: param2 };
        }
        else if (param1) {
            sendObj = { type: type, rank: isGetMyRank, param1: param1 };
        }
        else {
            sendObj = { type: type, rank: isGetMyRank };
        }
        SocketManager.call(Command.Req_RankList_3110, sendObj, callback, null, this);
    };
    /**
     * 根据roleId获得排名信息
    */
    RankManager.getRankInfoByRoleId = function (list, roleId) {
        if (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var info = list_1[_i];
                if (info.roleId == roleId) {
                    return info;
                }
            }
        }
        return null;
    };
    /**
     * 是否排行榜超过刷新时间
     */
    RankManager.isRefreshRank = function (info) {
        if (InfoUtil.checkAvailable(info)) {
            var time = TimeManager.GetServerUtcTimestamp() - info.lastTime;
            if (time > info.definition.cd) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取排名描述
     */
    RankManager.getRankDes = function (rank, suffix) {
        var result = qin.StringConstants.Empty;
        switch (rank) {
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
        if (suffix) {
            result += "军";
        }
        return result;
    };
    /**
     * 拉取排行榜事件
     */
    RankManager.getRankListEvent = new qin.DelegateDispatcher();
    return RankManager;
}());
__reflect(RankManager.prototype, "RankManager");
//# sourceMappingURL=RankManager.js.map