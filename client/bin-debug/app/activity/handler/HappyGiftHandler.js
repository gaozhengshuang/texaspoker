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
 * 欢乐豪礼管理
 */
var HappyGiftHandler = (function (_super) {
    __extends(HappyGiftHandler, _super);
    function HappyGiftHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 排名列表
         */
        _this.rankList = new qin.Dictionary();
        /**
         * 兑换奖励完成事件
         */
        _this.takePrizeCompleteEvent = new qin.DelegateDispatcher();
        return _this;
    }
    HappyGiftHandler.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.rankList.clear();
    };
    HappyGiftHandler.prototype.initialize = function (info) {
        _super.prototype.initialize.call(this, info);
        ActivityManager.onReqSingleActivityEvent.addListener(this.refreshActivityInfo, this);
        var def;
        var pInfo;
        for (var i = 0; i < ActivityHappyGiftDefined.GetInstance().dataList.length; i++) {
            def = ActivityHappyGiftDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, HappyGiftItemInfo, def);
            if (pInfo) {
                pInfo.buyTime = 0;
            }
        }
        ;
    };
    /**
     * 拉取单个活动信息后，刷新操作
     */
    HappyGiftHandler.prototype.refreshActivityInfo = function (id) {
        _super.prototype.refreshActivityInfo.call(this, id);
        var info = this.getInfo(id);
        if (InfoUtil.checkAvailable(info) && info.definition.type == ActivityType.HappyGift) {
            this.setJson(info);
        }
    };
    /**
     * 设置Json
     */
    HappyGiftHandler.prototype.setJson = function (info) {
        _super.prototype.setJson.call(this, info);
        if (info) {
            for (var key in info.gotJsonObj) {
                var subInfo = this.getSubInfo(info.id, parseInt(key));
                if (subInfo) {
                    subInfo.buyTime = info.gotJsonObj[key];
                }
            }
        }
    };
    /**
     * 获取已兑换的奖品列表
     */
    HappyGiftHandler.prototype.getHaveTakenPrizeList = function (id) {
        var result = new Array();
        var info = this.getInfo(id);
        if (info && info.subList) {
            for (var _i = 0, _a = info.subList; _i < _a.length; _i++) {
                var subInfo = _a[_i];
                var happyGiftinfo = subInfo;
                if (happyGiftinfo.buyTime > 0) {
                    result.push(happyGiftinfo);
                }
            }
        }
        return result;
    };
    /**
     * 兑换完成操作
     */
    HappyGiftHandler.prototype.onGetAwardComplete = function (id, subId) {
        _super.prototype.onGetAwardComplete.call(this, id, subId);
        var itemInfo = this.getSubInfo(id, subId);
        if (InfoUtil.checkAvailable(itemInfo)) {
            var activityInfo = this.getInfo(id);
            if (activityInfo) {
                activityInfo.step -= itemInfo.definition.cost;
            }
            itemInfo.buyTime++;
        }
        this.takePrizeCompleteEvent.dispatch();
    };
    return HappyGiftHandler;
}(BaseActivitySubHandler));
__reflect(HappyGiftHandler.prototype, "HappyGiftHandler");
//# sourceMappingURL=HappyGiftHandler.js.map