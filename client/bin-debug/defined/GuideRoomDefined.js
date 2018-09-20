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
 * 引导房间配置
 */
var GuideRoomDefined = (function (_super) {
    __extends(GuideRoomDefined, _super);
    function GuideRoomDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideRoomDefined.GetInstance = function () {
        if (!GuideRoomDefined._instance) {
            GuideRoomDefined._instance = new GuideRoomDefined();
        }
        if (DefinedManager.IsParsed(GuideRoomDefined.config) == false) {
            GuideRoomDefined._instance.initialize();
        }
        return GuideRoomDefined._instance;
    };
    GuideRoomDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(GuideRoomDefined.config);
    };
    GuideRoomDefined.config = "guideRoom";
    return GuideRoomDefined;
}(BaseDefined));
__reflect(GuideRoomDefined.prototype, "GuideRoomDefined");
/**
 * 引导房间配置
 */
var GuideRoomDefinition = (function () {
    function GuideRoomDefinition() {
    }
    return GuideRoomDefinition;
}());
__reflect(GuideRoomDefinition.prototype, "GuideRoomDefinition", ["IBaseDefintion"]);
/**
 * 引导房间中玩家配置
 */
var GuideRoomPlayerDefinition = (function () {
    function GuideRoomPlayerDefinition() {
    }
    return GuideRoomPlayerDefinition;
}());
__reflect(GuideRoomPlayerDefinition.prototype, "GuideRoomPlayerDefinition");
//# sourceMappingURL=GuideRoomDefined.js.map