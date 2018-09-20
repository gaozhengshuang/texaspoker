var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 弹窗数据信息
 */
var PopupInfo = (function () {
    function PopupInfo() {
        /**
         * 触发类型
         */
        this.triggerType = new Array();
        /**
         * 触发参数
         */
        this.triggerParams = new Array();
    }
    return PopupInfo;
}());
__reflect(PopupInfo.prototype, "PopupInfo");
//# sourceMappingURL=PopupInfo.js.map