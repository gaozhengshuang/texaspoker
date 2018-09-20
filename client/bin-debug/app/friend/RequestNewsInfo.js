var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 好友请求信息
*/
var RequestNewsInfo = (function () {
    function RequestNewsInfo(type, info) {
        this.type = type;
        this.info = info;
        this.time = TimeManager.GetServerUtcTimestamp();
    }
    return RequestNewsInfo;
}());
__reflect(RequestNewsInfo.prototype, "RequestNewsInfo");
//# sourceMappingURL=RequestNewsInfo.js.map