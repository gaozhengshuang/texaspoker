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
 * 用户等级的定义
 * */
var ExpDefined = (function (_super) {
    __extends(ExpDefined, _super);
    function ExpDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpDefined.GetInstance = function () {
        if (!ExpDefined._instance) {
            ExpDefined._instance = new ExpDefined();
        }
        if (DefinedManager.IsParsed(ExpDefined.expConfig) == false) {
            ExpDefined._instance.initialize();
        }
        return ExpDefined._instance;
    };
    ExpDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ExpDefined.expConfig);
    };
    ExpDefined.expConfig = "exp";
    return ExpDefined;
}(BaseDefined));
__reflect(ExpDefined.prototype, "ExpDefined");
/**
* 用户等级的定义
* */
var ExpDefinition = (function () {
    function ExpDefinition() {
    }
    return ExpDefinition;
}());
__reflect(ExpDefinition.prototype, "ExpDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ExpDefined.js.map