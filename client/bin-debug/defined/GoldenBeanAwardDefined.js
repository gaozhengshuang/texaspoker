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
 * 金豆兑换奖品定义
 * */
var GoldenBeanAwardDefined = (function (_super) {
    __extends(GoldenBeanAwardDefined, _super);
    function GoldenBeanAwardDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoldenBeanAwardDefined.GetInstance = function () {
        if (!GoldenBeanAwardDefined._instance) {
            GoldenBeanAwardDefined._instance = new GoldenBeanAwardDefined();
        }
        if (DefinedManager.IsParsed(GoldenBeanAwardDefined.goldenBeanAwardConfig) == false) {
            GoldenBeanAwardDefined._instance.initialize();
        }
        return GoldenBeanAwardDefined._instance;
    };
    GoldenBeanAwardDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(GoldenBeanAwardDefined.goldenBeanAwardConfig);
    };
    GoldenBeanAwardDefined.goldenBeanAwardConfig = "goldenBeanAward";
    return GoldenBeanAwardDefined;
}(BaseDefined));
__reflect(GoldenBeanAwardDefined.prototype, "GoldenBeanAwardDefined");
/**
* 金豆兑换奖品定义
* */
var GoldenBeanAwardDefinition = (function () {
    function GoldenBeanAwardDefinition() {
    }
    return GoldenBeanAwardDefinition;
}());
__reflect(GoldenBeanAwardDefinition.prototype, "GoldenBeanAwardDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=GoldenBeanAwardDefined.js.map