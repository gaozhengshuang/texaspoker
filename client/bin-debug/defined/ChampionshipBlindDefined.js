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
 * 锦标赛盲注定义
*/
var ChampionshipBlindDefined = (function (_super) {
    __extends(ChampionshipBlindDefined, _super);
    function ChampionshipBlindDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionshipBlindDefined.GetInstance = function () {
        if (!ChampionshipBlindDefined._instance) {
            ChampionshipBlindDefined._instance = new ChampionshipBlindDefined();
        }
        if (DefinedManager.IsParsed(ChampionshipBlindDefined.championshipBlindConfig) == false) {
            ChampionshipBlindDefined._instance.initialize();
        }
        return ChampionshipBlindDefined._instance;
    };
    ChampionshipBlindDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(ChampionshipBlindDefined.championshipBlindConfig);
    };
    /**
     * 根据blindId获取盲注信息数组
    */
    ChampionshipBlindDefined.prototype.getBlindListByBlindId = function (blindId) {
        if (this.dataList != null) {
            var blindList = new Array();
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].blindId == blindId) {
                    blindList.push(this.dataList[i]);
                }
            }
            return blindList;
        }
        return null;
    };
    /**
     * 获得盲注信息通过level和blindId
    */
    ChampionshipBlindDefined.prototype.getBlindInfoByLevel = function (level, blindId) {
        var blindList = this.getBlindListByBlindId(blindId);
        if (blindList != null) {
            for (var i = 0; i < blindList.length; i++) {
                if (this.dataList[i].level == level) {
                    return blindList[i];
                }
            }
        }
        return null;
    };
    ChampionshipBlindDefined.prototype.getDefByBlind = function (typeId, sBlind, bBlind) {
        if (this.dataList != null) {
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].blindId == typeId && this.dataList[i].sBlind == sBlind && this.dataList[i].bBlind == bBlind) {
                    return this.dataList[i];
                }
            }
        }
        return null;
    };
    ChampionshipBlindDefined.championshipBlindConfig = "championshipBlind";
    return ChampionshipBlindDefined;
}(BaseDefined));
__reflect(ChampionshipBlindDefined.prototype, "ChampionshipBlindDefined");
/**
 * 锦标赛盲注定义
 * */
var ChampionshipBlindDefinition = (function () {
    function ChampionshipBlindDefinition() {
    }
    return ChampionshipBlindDefinition;
}());
__reflect(ChampionshipBlindDefinition.prototype, "ChampionshipBlindDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=ChampionshipBlindDefined.js.map