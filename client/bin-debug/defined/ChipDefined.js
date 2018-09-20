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
 * 筹码的定义
 * */
var ChipsDefined = (function (_super) {
    __extends(ChipsDefined, _super);
    function ChipsDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChipsDefined.GetInstance = function () {
        if (!ChipsDefined._instance) {
            ChipsDefined._instance = new ChipsDefined();
        }
        if (DefinedManager.IsParsed(ChipsDefined.chipsConfig) == false) {
            ChipsDefined._instance.initialize();
        }
        return ChipsDefined._instance;
    };
    ChipsDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ChipsDefined.chipsConfig);
    };
    ChipsDefined.chipsConfig = "chips";
    return ChipsDefined;
}(BaseDefined));
__reflect(ChipsDefined.prototype, "ChipsDefined");
/**
 * 筹码选项的定义
 * */
var ChipsDefinition = (function () {
    function ChipsDefinition() {
    }
    return ChipsDefinition;
}());
__reflect(ChipsDefinition.prototype, "ChipsDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ChipDefined.js.map