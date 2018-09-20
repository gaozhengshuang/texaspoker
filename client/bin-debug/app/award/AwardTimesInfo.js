var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 奖励次数信息
 */
var AwardTimesInfo = (function () {
    function AwardTimesInfo() {
    }
    Object.defineProperty(AwardTimesInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = AwardDefined.GetInstance().getDefinition(this._id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwardTimesInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    AwardTimesInfo.prototype.setInfo = function (id, times, lastTime) {
        this.id = id;
        this.times = times;
        this.lastTime = lastTime;
    };
    return AwardTimesInfo;
}());
__reflect(AwardTimesInfo.prototype, "AwardTimesInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=AwardTimesInfo.js.map