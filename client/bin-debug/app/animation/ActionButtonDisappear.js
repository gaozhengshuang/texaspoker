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
 * 操作按钮的消失动画
 */
var ActionButtonDisappear = (function (_super) {
    __extends(ActionButtonDisappear, _super);
    function ActionButtonDisappear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRunOver = true;
        return _this;
    }
    ActionButtonDisappear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.alpha = 1;
        this.target.rotation = 0;
    };
    ActionButtonDisappear.prototype.run = function (startPoint, targetPoint, parent) {
        if (this.isRunOver == true) {
            _super.prototype.run.call(this, targetPoint);
            var tween = egret.Tween.get(this.target);
            this.target.x = startPoint.x;
            this.target.y = startPoint.y;
            this._parent = parent;
            this.target.touchEnabled = false;
            tween.to({ rotation: -90, alpha: 0, x: targetPoint.x, y: targetPoint.y, scaleX: 0.1, scaleY: 0.1 }, 250).call(this.runOver, this); //to({ rotation: 5, x: phase1X }, 550).
            this.isRunOver = false;
        }
    };
    ActionButtonDisappear.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.visible = false;
        this.target.touchEnabled = true;
        if (this._parent) {
            this._parent.visible = false;
        }
        this.isRunOver = true;
    };
    ActionButtonDisappear.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return ActionButtonDisappear;
}(BaseAnimation));
__reflect(ActionButtonDisappear.prototype, "ActionButtonDisappear");
//# sourceMappingURL=ActionButtonDisappear.js.map