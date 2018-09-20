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
* alpha动画渐变
*/
var AlphaChangeAnimation = (function (_super) {
    __extends(AlphaChangeAnimation, _super);
    function AlphaChangeAnimation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlphaChangeAnimation.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    AlphaChangeAnimation.prototype.run = function (initAlpha, toalpha, delay, time, callBack, thisObj) {
        if (delay === void 0) { delay = 0; }
        if (time === void 0) { time = 1000; }
        _super.prototype.run.call(this, initAlpha, toalpha, delay, time, callBack, thisObj);
        this.callBack = null;
        if (callBack) {
            this.callBack = qin.Delegate.getOut(callBack, thisObj);
        }
        this.target.alpha = initAlpha;
        var tween = egret.Tween.get(this.target);
        tween.wait(delay).to({ alpha: toalpha }, time, egret.Ease.sineIn).call(this.runOver, this);
    };
    AlphaChangeAnimation.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        if (this.callBack) {
            this.callBack.invoke();
        }
        qin.Delegate.putIn(this.callBack);
        this.callBack = null;
    };
    return AlphaChangeAnimation;
}(BaseAnimation));
__reflect(AlphaChangeAnimation.prototype, "AlphaChangeAnimation");
//# sourceMappingURL=AlphaChangeAnimation.js.map