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
 *百人大战牌型赔率信息
*/
var HundredWarCardTypeDefined = (function (_super) {
    __extends(HundredWarCardTypeDefined, _super);
    function HundredWarCardTypeDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HundredWarCardTypeDefined.GetInstance = function () {
        if (!HundredWarCardTypeDefined._instance) {
            HundredWarCardTypeDefined._instance = new HundredWarCardTypeDefined();
        }
        if (DefinedManager.IsParsed(HundredWarCardTypeDefined.hundredWarCardTypeConfig) == false) {
            HundredWarCardTypeDefined._instance.initialize();
        }
        return HundredWarCardTypeDefined._instance;
    };
    HundredWarCardTypeDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(HundredWarCardTypeDefined.hundredWarCardTypeConfig);
    };
    /**
     * 根据类型获得赔率
    */
    HundredWarCardTypeDefined.prototype.getOddsByType = function (type) {
        if (this.dataList != null) {
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].type == type) {
                    return this.dataList[i].odds;
                }
            }
        }
        return null;
    };
    HundredWarCardTypeDefined.hundredWarCardTypeConfig = "hundredWarCardType";
    return HundredWarCardTypeDefined;
}(BaseDefined));
__reflect(HundredWarCardTypeDefined.prototype, "HundredWarCardTypeDefined");
/**
* 百人大战牌型赔率定义
*/
var HundredWarCardTypeDefinition = (function () {
    function HundredWarCardTypeDefinition() {
    }
    return HundredWarCardTypeDefinition;
}());
__reflect(HundredWarCardTypeDefinition.prototype, "HundredWarCardTypeDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=HundredWarCardTypeDefined.js.map