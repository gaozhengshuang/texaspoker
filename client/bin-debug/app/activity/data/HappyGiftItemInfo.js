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
var HappyGiftItemInfo = (function (_super) {
    __extends(HappyGiftItemInfo, _super);
    function HappyGiftItemInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HappyGiftItemInfo.prototype.trySetDefinition = function () {
        _super.prototype.trySetDefinition.call(this);
        this._definition = ActivityHappyGiftDefined.GetInstance().getSubDefinition(this._id, this._subId);
    };
    Object.defineProperty(HappyGiftItemInfo.prototype, "awardInfoDef", {
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
    return HappyGiftItemInfo;
}(BaseActivitySubInfo));
__reflect(HappyGiftItemInfo.prototype, "HappyGiftItemInfo");
//# sourceMappingURL=HappyGiftItemInfo.js.map