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
 * 锦标赛定义
*/
var ChampionshipDefined = (function (_super) {
    __extends(ChampionshipDefined, _super);
    function ChampionshipDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionshipDefined.GetInstance = function () {
        if (!ChampionshipDefined._instance) {
            ChampionshipDefined._instance = new ChampionshipDefined();
        }
        if (DefinedManager.IsParsed(ChampionshipDefined.championshipConfig) == false) {
            ChampionshipDefined._instance.initialize();
        }
        return ChampionshipDefined._instance;
    };
    ChampionshipDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ChampionshipDefined.championshipConfig);
    };
    /**
     * 获得坐满即玩赛事列表
    */
    ChampionshipDefined.prototype.getSitAndPlayMatchList = function () {
        if (this.dataList != null) {
            var matchList = new Array();
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.type == MatchType.SNG) {
                    matchList.push(info);
                }
            }
            return matchList;
        }
        return null;
    };
    ChampionshipDefined.championshipConfig = "championship";
    return ChampionshipDefined;
}(BaseDefined));
__reflect(ChampionshipDefined.prototype, "ChampionshipDefined");
/**
 * 锦标赛定义
 * */
var ChampionshipDefinition = (function () {
    function ChampionshipDefinition() {
    }
    return ChampionshipDefinition;
}());
__reflect(ChampionshipDefinition.prototype, "ChampionshipDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ChampionshipDefined.js.map