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
 * 百人大战房间列表信息
*/
var HundredWarListInfo = (function (_super) {
    __extends(HundredWarListInfo, _super);
    function HundredWarListInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HundredWarListInfo.prototype, "hwId", {
        get: function () {
            return this._hwId;
        },
        set: function (value) {
            this._hwId = value;
            this._definition = HundredWarDefined.GetInstance().getDefinition(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HundredWarListInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    HundredWarListInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return HundredWarListInfo;
}(BaseServerValueInfo));
__reflect(HundredWarListInfo.prototype, "HundredWarListInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=HundredWarInfo.js.map