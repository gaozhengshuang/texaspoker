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
 * 分享抽奖管理
 */
var ShareLuckDrawHandler = (function (_super) {
    __extends(ShareLuckDrawHandler, _super);
    function ShareLuckDrawHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 请求增加分享成功次数成功
        */
        _this.OnShareSuccessEvent = new qin.DelegateDispatcher();
        return _this;
    }
    ShareLuckDrawHandler.prototype.initialize = function (info) {
        _super.prototype.initialize.call(this, info);
        var def;
        var pInfo;
        for (var i = 0; i < ActivityShareDefined.GetInstance().dataList.length; i++) {
            def = ActivityShareDefined.GetInstance().dataList[i];
            pInfo = this.addSubInfo(info, ShareLuckDrawInfo, def);
        }
        ;
    };
    /**
     * 分享成功
    */
    ShareLuckDrawHandler.prototype.reqShareSuccess = function (type) {
        var callback = function (result) {
            ActivityManager.shareLuckDrawHandler.OnShareSuccessEvent.dispatch();
        };
        SocketManager.call(Command.ShareSuccess_Req_3715, { type: type }, callback, null, this);
    };
    return ShareLuckDrawHandler;
}(BaseActivitySubHandler));
__reflect(ShareLuckDrawHandler.prototype, "ShareLuckDrawHandler");
//# sourceMappingURL=ShareLuckDrawHandler.js.map