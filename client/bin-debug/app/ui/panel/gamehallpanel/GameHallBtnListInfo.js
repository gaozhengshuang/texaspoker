var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 大厅面板按钮列表信息
 */
var GameHallBtnListInfo = (function () {
    function GameHallBtnListInfo(priority, btn) {
        this.priority = priority;
        this.btn = btn;
        this.isShow = true;
    }
    return GameHallBtnListInfo;
}());
__reflect(GameHallBtnListInfo.prototype, "GameHallBtnListInfo");
//# sourceMappingURL=GameHallBtnListInfo.js.map