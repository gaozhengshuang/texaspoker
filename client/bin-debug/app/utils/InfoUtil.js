var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InfoUtil = (function () {
    function InfoUtil() {
    }
    /**
     * 检查定义是否合法
     */
    InfoUtil.checkAvailable = function (info) {
        if (info && info.definition) {
            return true;
        }
        return false;
    };
    return InfoUtil;
}());
__reflect(InfoUtil.prototype, "InfoUtil");
//# sourceMappingURL=InfoUtil.js.map