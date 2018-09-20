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
 * 排行榜的定义
 * */
var RankDefined = (function (_super) {
    __extends(RankDefined, _super);
    function RankDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankDefined.GetInstance = function () {
        if (!RankDefined._instance) {
            RankDefined._instance = new RankDefined();
        }
        if (DefinedManager.IsParsed(RankDefined.rankConfig) == false) {
            RankDefined._instance.initialize();
        }
        return RankDefined._instance;
    };
    RankDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(RankDefined.rankConfig);
    };
    RankDefined.rankConfig = "rank";
    return RankDefined;
}(BaseDefined));
__reflect(RankDefined.prototype, "RankDefined");
/**
* 用户等级的定义
* */
var RankDefinition = (function () {
    function RankDefinition() {
    }
    return RankDefinition;
}());
__reflect(RankDefinition.prototype, "RankDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=RankDefined.js.map