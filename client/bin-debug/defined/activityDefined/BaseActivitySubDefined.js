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
 * 子活动定义
 */
var BaseActivitySubDefined = (function (_super) {
    __extends(BaseActivitySubDefined, _super);
    function BaseActivitySubDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取
     */
    BaseActivitySubDefined.prototype.getSubDefinition = function (id, subId) {
        if (this.dataList) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.id == id && def.subId == subId) {
                    return def;
                }
            }
        }
        qin.Console.log("获取活动子表定义异常！Id:" + id + " " + "subId:" + subId);
        return null;
    };
    return BaseActivitySubDefined;
}(BaseDefined));
__reflect(BaseActivitySubDefined.prototype, "BaseActivitySubDefined");
//# sourceMappingURL=BaseActivitySubDefined.js.map