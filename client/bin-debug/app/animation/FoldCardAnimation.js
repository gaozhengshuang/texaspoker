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
 * 弃牌动画
 */
var FoldCardAnimation = (function (_super) {
    __extends(FoldCardAnimation, _super);
    function FoldCardAnimation() {
        var _this = _super.call(this) || this;
        _this._runTime = 400;
        _this._angleVec = new qin.Vector2D(0, 0);
        return _this;
    }
    FoldCardAnimation.prototype.reset = function () {
        _super.prototype.reset.call(this);
        var img = this.target;
        if (!this._initMatrix) {
            this.target.scaleX = this.target.scaleY = 0.5;
            this._initMatrix = this.target.matrix;
        }
        this.target.alpha = 1;
        this.target.matrix = this._initMatrix;
    };
    FoldCardAnimation.prototype.run = function (point) {
        _super.prototype.run.call(this, point);
        var parent = this.target.parent.parent;
        this._angleVec.x = point.x - parent.x;
        this._angleVec.y = point.y - parent.y;
        var angle = this._angleVec.angle;
        angle = angle * qin.MathUtil.Radian2Angle;
        var tween = egret.Tween.get(this.target);
        this.target.visible = true;
        tween.to({ x: this._angleVec.x, y: this._angleVec.y, scaleX: 0.4, scaleY: 0.4, alpha: 0.3, rotation: angle }, this._runTime, egret.Ease.circOut).call(this.runOver, this);
        tween.play();
    };
    FoldCardAnimation.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.visible = false;
    };
    return FoldCardAnimation;
}(BaseAnimation));
__reflect(FoldCardAnimation.prototype, "FoldCardAnimation");
//# sourceMappingURL=FoldCardAnimation.js.map