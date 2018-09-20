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
 * 牌局引导组件
 */
var GamblingGuideComponent = (function (_super) {
    __extends(GamblingGuideComponent, _super);
    function GamblingGuideComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingGuideComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.touchEnabled = false;
        this.left = this.right = this.top = this.bottom = 0;
    };
    return GamblingGuideComponent;
}(BaseGamblingSlotComponent));
__reflect(GamblingGuideComponent.prototype, "GamblingGuideComponent");
//# sourceMappingURL=GamblingGuideComponent.js.map