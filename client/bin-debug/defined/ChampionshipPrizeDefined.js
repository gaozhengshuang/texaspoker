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
 * 锦标赛赛事奖品的定义
 * */
var ChampionshipPrizeDefined = (function (_super) {
    __extends(ChampionshipPrizeDefined, _super);
    function ChampionshipPrizeDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionshipPrizeDefined.GetInstance = function () {
        if (!ChampionshipPrizeDefined._instance) {
            ChampionshipPrizeDefined._instance = new ChampionshipPrizeDefined();
        }
        if (DefinedManager.IsParsed(ChampionshipPrizeDefined.championshipPrizeConfig) == false) {
            ChampionshipPrizeDefined._instance.initialize();
        }
        return ChampionshipPrizeDefined._instance;
    };
    ChampionshipPrizeDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ChampionshipPrizeDefined.championshipPrizeConfig);
    };
    /**
     * 根据type类型获得championshipPrize的集合数组
    */
    ChampionshipPrizeDefined.prototype.getChampionshipPrizeList = function (prizeId) {
        if (this.dataList != null) {
            var championshipPrizeList = new Array();
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.prizeId == prizeId) {
                    if (def.start != def.end) {
                        for (var i = def.start; i <= def.end - def.start; i++) {
                            var info = new ChampionshipPrizeDefinition();
                            info.id = def.id;
                            info.start = i;
                            info.end = i;
                            info.prizeId = def.prizeId;
                            info.awardId = def.awardId;
                            championshipPrizeList.push(def);
                        }
                    }
                    else {
                        championshipPrizeList.push(def);
                    }
                }
            }
            return championshipPrizeList;
        }
    };
    ChampionshipPrizeDefined.championshipPrizeConfig = "championshipPrize";
    return ChampionshipPrizeDefined;
}(BaseDefined));
__reflect(ChampionshipPrizeDefined.prototype, "ChampionshipPrizeDefined");
/**
 * 奖品的定义
 * */
var ChampionshipPrizeDefinition = (function () {
    function ChampionshipPrizeDefinition() {
    }
    return ChampionshipPrizeDefinition;
}());
__reflect(ChampionshipPrizeDefinition.prototype, "ChampionshipPrizeDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ChampionshipPrizeDefined.js.map