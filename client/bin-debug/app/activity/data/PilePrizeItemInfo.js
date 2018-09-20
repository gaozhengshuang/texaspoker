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
var PilePrizeItemInfo = (function (_super) {
    __extends(PilePrizeItemInfo, _super);
    function PilePrizeItemInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PilePrizeItemInfo.prototype.trySetDefinition = function () {
        _super.prototype.trySetDefinition.call(this);
        this._definition = ActivityPilePrizeDefined.GetInstance().getSubDefinition(this._id, this._subId);
    };
    Object.defineProperty(PilePrizeItemInfo.prototype, "awardInfoDef", {
        get: function () {
            if (this.definition) {
                var awardDef = AwardDefined.GetInstance().getDefinition(this.definition.awardId);
                if (awardDef) {
                    return awardDef;
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PilePrizeItemInfo.prototype, "isCanTake", {
        /**
         * 是否可领取
         */
        get: function () {
            if (this.process && this.definition.para1) {
                return this.process >= this.definition.para1;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return PilePrizeItemInfo;
}(BaseActivitySubInfo));
__reflect(PilePrizeItemInfo.prototype, "PilePrizeItemInfo");
//# sourceMappingURL=PilePrizeItemInfo.js.map