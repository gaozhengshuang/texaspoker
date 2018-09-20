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
 * 成就的定义
 * */
var AchieveDefined = (function (_super) {
    __extends(AchieveDefined, _super);
    function AchieveDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AchieveDefined.GetInstance = function () {
        if (!AchieveDefined._instance) {
            AchieveDefined._instance = new AchieveDefined();
        }
        if (DefinedManager.IsParsed(AchieveDefined.achieveConfig) == false) {
            AchieveDefined._instance.initialize();
        }
        return AchieveDefined._instance;
    };
    AchieveDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(AchieveDefined.achieveConfig);
    };
    AchieveDefined.prototype.getAchieveDefintionByGroup = function (group) {
        for (var _i = 0, _a = AchieveDefined.GetInstance().dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.group == group) {
                return def;
            }
        }
        return null;
    };
    /**
     * 获取某一兑换ID前置ID列表是否空
     */
    AchieveDefined.prototype.getPrevIdIsNull = function (id) {
        var def = this.getDefinition(id);
        if (def) {
            return def.preId == null;
        }
        return false;
    };
    /**
     * 获取所有任务组id
     */
    AchieveDefined.prototype.getAchieveGroup = function () {
        var result = new Array();
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            if (result.indexOf(def.group) == -1) {
                result.push(def.group);
            }
        }
        return result;
    };
    AchieveDefined.achieveConfig = "achieve";
    return AchieveDefined;
}(BaseDefined));
__reflect(AchieveDefined.prototype, "AchieveDefined");
/**
 * 成就/任务的定义
 * */
var AchieveDefintion = (function () {
    function AchieveDefintion() {
    }
    return AchieveDefintion;
}());
__reflect(AchieveDefintion.prototype, "AchieveDefintion", ["IBaseDefintion"]);
//# sourceMappingURL=AchieveDefined.js.map