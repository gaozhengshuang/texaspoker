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
 * 绑定大礼包管理
 */
var BindPhoneAwardHandler = (function (_super) {
    __extends(BindPhoneAwardHandler, _super);
    function BindPhoneAwardHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 领取奖励成功
        */
        _this.bringSuccessEvent = new qin.DelegateDispatcher();
        return _this;
    }
    BindPhoneAwardHandler.prototype.initialize = function (info) {
        _super.prototype.initialize.call(this, info);
        var def;
        var pInfo;
        for (var i = 0; i < ActivityPhoneDefined.GetInstance().dataList.length; i++) {
            def = ActivityPhoneDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, BindPhoneAwardInfo, def);
        }
        ;
    };
    /**
     *兑换完成操作
     */
    BindPhoneAwardHandler.prototype.onGetAwardComplete = function (id, subId) {
        this.bringSuccessEvent.dispatch(id);
    };
    return BindPhoneAwardHandler;
}(BaseActivitySubHandler));
__reflect(BindPhoneAwardHandler.prototype, "BindPhoneAwardHandler");
//# sourceMappingURL=BindPhoneAwardHandler.js.map