var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景信息
 */
var SceneInfo = (function () {
    function SceneInfo(type, extendData) {
        this.type = type;
        this.extendData = extendData;
    }
    return SceneInfo;
}());
__reflect(SceneInfo.prototype, "SceneInfo");
//# sourceMappingURL=SceneInfo.js.map