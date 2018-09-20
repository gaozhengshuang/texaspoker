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
 *百人大战信息
*/
var HundredWarDefined = (function (_super) {
    __extends(HundredWarDefined, _super);
    function HundredWarDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HundredWarDefined.GetInstance = function () {
        if (!HundredWarDefined._instance) {
            HundredWarDefined._instance = new HundredWarDefined();
        }
        if (DefinedManager.IsParsed(HundredWarDefined.hundredWarConfig) == false) {
            HundredWarDefined._instance.initialize();
        }
        return HundredWarDefined._instance;
    };
    HundredWarDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(HundredWarDefined.hundredWarConfig);
    };
    HundredWarDefined.hundredWarConfig = "hundredWar";
    return HundredWarDefined;
}(BaseDefined));
__reflect(HundredWarDefined.prototype, "HundredWarDefined");
/**
* 百人大战定义
*/
var HundredWarDefinition = (function () {
    function HundredWarDefinition() {
    }
    return HundredWarDefinition;
}());
__reflect(HundredWarDefinition.prototype, "HundredWarDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=HundredWarDefined.js.map