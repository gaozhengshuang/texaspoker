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
 * 充值活动管理
 */
var PayPrizeHandler = (function (_super) {
    __extends(PayPrizeHandler, _super);
    function PayPrizeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 领取奖励完成事件
         */
        _this.onGetAwardCompleteEvent = new qin.DelegateDispatcher();
        return _this;
    }
    /**
     * 判断是否充值过
     */
    PayPrizeHandler.prototype.isPay = function (subType) {
        var activityInfo = this.getInfoBySubType(subType);
        if (activityInfo && ActivityUtil.getActivityOpenState(activityInfo) == ActivityOpenState.Open) {
            return activityInfo.step > 0;
        }
        return false;
    };
    /**
     *  是否显示首充（登录满5分钟或者从未充过时显示）
     */
    PayPrizeHandler.prototype.isShowFirstPay = function () {
        if (VersionManager.isSafe) {
            return false;
        }
        var time = TimeManager.loginTimestamp - UserManager.userInfo.createdTime;
        return time > 300 && !this.isPay(ActivitySubType.firstPay);
    };
    /**
     * 根据子类型获取活动
     */
    PayPrizeHandler.prototype.getInfoBySubType = function (subType) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition.subType == subType) {
                return info;
            }
        }
        return null;
    };
    PayPrizeHandler.prototype.initialize = function (info) {
        _super.prototype.initialize.call(this, info);
        var def;
        var pInfo;
        for (var i = 0; i < ActivityPayPrizeDefined.GetInstance().dataList.length; i++) {
            def = ActivityPayPrizeDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, PayPrizeInfo, def);
        }
        ;
    };
    /**
     * 领取奖励完成回调
     */
    PayPrizeHandler.prototype.onGetAwardComplete = function (id, subId) {
        var info = this.getInfo(id);
        if (info) {
            info.step++;
        }
        this.onGetAwardCompleteEvent.dispatch(id);
    };
    return PayPrizeHandler;
}(BaseActivitySubHandler));
__reflect(PayPrizeHandler.prototype, "PayPrizeHandler");
//# sourceMappingURL=PayPrizeHandler.js.map