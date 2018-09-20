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
 * 新手引导支持
 */
var GamblingPanelGuideSupport = (function (_super) {
    __extends(GamblingPanelGuideSupport, _super);
    function GamblingPanelGuideSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelGuideSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._animation = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.Alpha);
        var state = this.target.panelState;
        var component = state.getCompoent(GamblingGuideComponent);
        this._animation.target = component.guideTipsBar;
        this._animation.run(0, 1, 500, 1000, this.disapear, this);
    };
    GamblingPanelGuideSupport.prototype.disapear = function () {
        this._animation.run(1, 0, 2000, 1000, this.disapearOver, this);
    };
    GamblingPanelGuideSupport.prototype.disapearOver = function () {
        this.clear();
    };
    GamblingPanelGuideSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    GamblingPanelGuideSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        this.clear();
    };
    GamblingPanelGuideSupport.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._animation.clear();
        this._animation.target = null;
        this._animation = null;
    };
    return GamblingPanelGuideSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelGuideSupport.prototype, "GamblingPanelGuideSupport");
//# sourceMappingURL=GamblingPanelGuideSupport.js.map