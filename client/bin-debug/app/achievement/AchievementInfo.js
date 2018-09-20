var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就信息
 */
var AchievementInfo = (function () {
    function AchievementInfo() {
    }
    Object.defineProperty(AchievementInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = AchieveDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AchievementInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            this._definition = value;
        },
        enumerable: true,
        configurable: true
    });
    return AchievementInfo;
}());
__reflect(AchievementInfo.prototype, "AchievementInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=AchievementInfo.js.map