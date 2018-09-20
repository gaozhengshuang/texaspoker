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
 *房间信息
*/
var RoomDefined = (function (_super) {
    __extends(RoomDefined, _super);
    function RoomDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoomDefined.GetInstance = function () {
        if (!RoomDefined._instance) {
            RoomDefined._instance = new RoomDefined();
        }
        if (DefinedManager.IsParsed(RoomDefined.forbiddenConfig) == false) {
            RoomDefined._instance.initialize();
        }
        return RoomDefined._instance;
    };
    RoomDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(RoomDefined.forbiddenConfig);
    };
    /**
     * 通过type获得数据
    */
    RoomDefined.prototype.getInfoByType = function (type) {
        if (this.dataList != null) {
            var infoList = new Array();
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.type == type) {
                    infoList.push(def);
                }
            }
            return infoList;
        }
        return null;
    };
    RoomDefined.forbiddenConfig = "room";
    return RoomDefined;
}(BaseDefined));
__reflect(RoomDefined.prototype, "RoomDefined");
/**
* 房间信息定义
*/
var RoomDefinition = (function () {
    function RoomDefinition() {
    }
    return RoomDefinition;
}());
__reflect(RoomDefinition.prototype, "RoomDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=RoomDefined.js.map