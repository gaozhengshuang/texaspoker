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
 * 手牌竞猜投注定义
*/
var HoleCardsDefined = (function (_super) {
    __extends(HoleCardsDefined, _super);
    function HoleCardsDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HoleCardsDefined.GetInstance = function () {
        if (!HoleCardsDefined._instance) {
            HoleCardsDefined._instance = new HoleCardsDefined();
        }
        if (DefinedManager.IsParsed(HoleCardsDefined.holeCardsConfig) == false) {
            HoleCardsDefined._instance.initialize();
        }
        return HoleCardsDefined._instance;
    };
    HoleCardsDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(HoleCardsDefined.holeCardsConfig);
    };
    HoleCardsDefined.prototype.getHoleCardsInfoByType = function (type) {
        if (this.dataList != null) {
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].type == type) {
                    return this.dataList[i];
                }
            }
        }
        return null;
    };
    HoleCardsDefined.holeCardsConfig = "holeCards";
    return HoleCardsDefined;
}(BaseDefined));
__reflect(HoleCardsDefined.prototype, "HoleCardsDefined");
/**
 * 手牌竞猜投注定义
 * */
var HoleCardsDefinition = (function () {
    function HoleCardsDefinition() {
    }
    return HoleCardsDefinition;
}());
__reflect(HoleCardsDefinition.prototype, "HoleCardsDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=HoleCardsDefined.js.map