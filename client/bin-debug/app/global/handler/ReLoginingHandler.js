var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 重新登录处理
 */
var ReLoginingHandler = (function () {
    function ReLoginingHandler() {
    }
    ReLoginingHandler.prototype.invoke = function () {
        SocketManager.Dispose();
        UserManager.resetByReLogin();
        ShopManager.clearList();
        GamblingManager.resetByReLogin();
        HundredWarManager.resetByReLogin();
        NotifyManager.clearMultiParams();
        PopupManager.reset();
    };
    return ReLoginingHandler;
}());
__reflect(ReLoginingHandler.prototype, "ReLoginingHandler");
//# sourceMappingURL=ReLoginingHandler.js.map