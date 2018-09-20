var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 累充活动管理
 */
var PilePrizeHandler = (function (_super) {
    __extends(PilePrizeHandler, _super);
    function PilePrizeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 兑换奖励完成事件
         */
        _this.takePrizeCompleteEvent = new qin.DelegateDispatcher();
        return _this;
    }
    PilePrizeHandler.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    PilePrizeHandler.prototype.initialize = function (info) {
        _super.prototype.initialize.call(this, info);
        ActivityManager.onReqSingleActivityEvent.addListener(this.refreshActivityInfo, this);
        UserManager.levelUpgrade.addListener(this.updateLevelProcess, this);
        ChampionshipManager.OnMTTOverPushEvent.addListener(this.updateMttProcess, this);
        var def;
        var pInfo;
        for (var i = 0; i < ActivityPilePrizeDefined.GetInstance().dataList.length; i++) {
            def = ActivityPilePrizeDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, PilePrizeItemInfo, def);
            if (pInfo) {
                pInfo.process = 0;
                pInfo.isTaken = false;
            }
        }
        ;
        this.setProcess(info);
    };
    /**
     * 拉取单个活动信息后，刷新操作
     */
    PilePrizeHandler.prototype.refreshActivityInfo = function (id) {
        _super.prototype.refreshActivityInfo.call(this, id);
        var info = this.getInfo(id);
        if (InfoUtil.checkAvailable(info) && info.definition.type == ActivityType.HappyGift) {
            this.setJson(info);
        }
    };
    /**
     * 设置Json
     */
    PilePrizeHandler.prototype.setJson = function (info) {
        _super.prototype.setJson.call(this, info);
        var subInfo;
        if (info) {
            for (var key in info.jsonObj) {
                subInfo = this.getSubInfo(info.id, parseInt(key));
                if (InfoUtil.checkAvailable(subInfo)) {
                    subInfo.process = info.jsonObj[key] > subInfo.definition.para1 ? subInfo.definition.para1 : info.jsonObj[key];
                }
            }
            for (var key in info.gotJsonObj) {
                subInfo = this.getSubInfo(info.id, info.gotJsonObj[key]);
                if (subInfo) {
                    subInfo.isTaken = true;
                }
            }
        }
    };
    PilePrizeHandler.prototype.updateMttProcess = function (record) {
        if (record.rank) {
            this.updateProcess(AchieveType.PlayMtt);
        }
    };
    PilePrizeHandler.prototype.updateLevelProcess = function () {
        this.updateProcess(AchieveType.Level);
    };
    /**
     * 更新进度
     */
    PilePrizeHandler.prototype.updateProcess = function (type) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info && info.subList && ActivityUtil.getActivityOpenState(info) == ActivityOpenState.Open) {
                for (var _b = 0, _c = info.subList; _b < _c.length; _b++) {
                    var item = _c[_b];
                    var subInfo = item;
                    if (subInfo.definition.type == type) {
                        if (type == AchieveType.Level) {
                            subInfo.process = UserManager.userInfo.level;
                        }
                        else {
                            subInfo.process++;
                        }
                    }
                }
            }
        }
    };
    PilePrizeHandler.prototype.getInfoBySubType = function (subType) {
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (InfoUtil.checkAvailable(info) && info.definition.subType == subType) {
                return info;
            }
        }
        return null;
    };
    /**
     * 设置进度
     */
    PilePrizeHandler.prototype.setProcess = function (info) {
        for (var _i = 0, _a = info.subList; _i < _a.length; _i++) {
            var item = _a[_i];
            var subInfo = item;
            switch (subInfo.definition.type) {
                case AchieveType.Register:
                    subInfo.process = 1;
                    break;
                case AchieveType.DownLoadApp:
                    subInfo.process = subInfo.definition.para2.indexOf(BundleManager.getBid()) < 0 ? 0 : 1;
                    break;
                case AchieveType.Level:
                    subInfo.process = UserManager.userInfo.level > subInfo.definition.para1 ? subInfo.definition.para1 : UserManager.userInfo.level;
                    break;
                case AchieveType.PlayMtt:
                    break;
            }
        }
    };
    /**
     * 兑换完成操作
     */
    PilePrizeHandler.prototype.onGetAwardComplete = function (id, subId) {
        _super.prototype.onGetAwardComplete.call(this, id, subId);
        var itemInfo = this.getSubInfo(id, subId);
        if (InfoUtil.checkAvailable(itemInfo)) {
            itemInfo.isTaken = true;
        }
        this.takePrizeCompleteEvent.dispatch(id);
    };
    /**
     * 是否完成并领取所有奖励
     */
    PilePrizeHandler.prototype.isTakeAllAward = function (id) {
        var info = this.getInfo(id);
        if (info) {
            for (var _i = 0, _a = info.subList; _i < _a.length; _i++) {
                var item = _a[_i];
                var subInfo = item;
                if (subInfo.definition.type != AchieveType.BindInviteExtra && !subInfo.isTaken) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     * 是否有可领取的奖励
     */
    PilePrizeHandler.prototype.isHavePrize = function (id) {
        var info = this.getInfo(id);
        if (info) {
            for (var _i = 0, _a = info.subList; _i < _a.length; _i++) {
                var item = _a[_i];
                var subInfo = item;
                if (subInfo.definition.type != AchieveType.BindInviteExtra && !subInfo.isTaken && subInfo.isCanTake) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 获得显示的子项列表
     */
    PilePrizeHandler.prototype.getShowSubList = function (id) {
        var result = new Array();
        var info = this.getInfo(id);
        if (info) {
            for (var _i = 0, _a = info.subList; _i < _a.length; _i++) {
                var item = _a[_i];
                var subInfo = item;
                if (!subInfo.definition.isHide) {
                    result.push(subInfo);
                }
            }
        }
        return result;
    };
    /**
     * 获得额外奖励信息
     */
    PilePrizeHandler.prototype.getExtraAward = function (id) {
        var info = this.getInfo(id);
        if (info) {
            for (var _i = 0, _a = info.subList; _i < _a.length; _i++) {
                var item = _a[_i];
                var subInfo = item;
                if (subInfo.definition.type == AchieveType.BindInviteExtra) {
                    return subInfo;
                }
            }
        }
        return null;
    };
    return PilePrizeHandler;
}(BaseActivitySubHandler));
__reflect(PilePrizeHandler.prototype, "PilePrizeHandler");
//# sourceMappingURL=PilePrizeHandler.js.map