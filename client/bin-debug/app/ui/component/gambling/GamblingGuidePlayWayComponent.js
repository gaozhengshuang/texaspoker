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
 * 引导玩法组件
 */
var GamblingGuidePlayWayComponent = (function (_super) {
    __extends(GamblingGuidePlayWayComponent, _super);
    function GamblingGuidePlayWayComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingGuidePlayWayComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.touchEnabled = false;
        this.left = this.right = this.top = this.bottom = 0;
    };
    return GamblingGuidePlayWayComponent;
}(BaseGamblingSlotComponent));
__reflect(GamblingGuidePlayWayComponent.prototype, "GamblingGuidePlayWayComponent");
//# sourceMappingURL=GamblingGuidePlayWayComponent.js.map