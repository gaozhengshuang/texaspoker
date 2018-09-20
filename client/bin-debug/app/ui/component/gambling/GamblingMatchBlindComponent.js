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
 * 比赛盲注涨幅通知组件
 */
var GamblingMatchBlindComponent = (function (_super) {
    __extends(GamblingMatchBlindComponent, _super);
    function GamblingMatchBlindComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GamblingMatchBlindComponent;
}(BaseGamblingSlotComponent));
__reflect(GamblingMatchBlindComponent.prototype, "GamblingMatchBlindComponent");
//# sourceMappingURL=GamblingMatchBlindComponent.js.map