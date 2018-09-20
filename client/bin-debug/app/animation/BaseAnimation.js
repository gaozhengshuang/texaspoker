var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 动画基类
 */
var BaseAnimation = (function () {
    function BaseAnimation() {
    }
    BaseAnimation.prototype.setTarget = function (target) {
        this.target = target;
    };
    BaseAnimation.prototype.reset = function () {
        this.clear();
    };
    BaseAnimation.prototype.run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.reset();
    };
    BaseAnimation.prototype.runOver = function () {
        this.clear();
    };
    BaseAnimation.prototype.clear = function () {
        egret.Tween.removeTweens(this.target);
    };
    return BaseAnimation;
}());
__reflect(BaseAnimation.prototype, "BaseAnimation");
//# sourceMappingURL=BaseAnimation.js.map