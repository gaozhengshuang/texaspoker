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
 * 操作按钮的动画
 */
var ActionButtonAppear = (function (_super) {
    __extends(ActionButtonAppear, _super);
    function ActionButtonAppear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRunOver = true;
        return _this;
    }
    ActionButtonAppear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.scaleX = this.target.scaleY = 0.1;
        this.target.rotation = -90;
        this.target.alpha = 0;
        this.target.visible = true;
    };
    ActionButtonAppear.prototype.run = function (startPoint, targetPoint) {
        if (this.isRunOver) {
            _super.prototype.run.call(this, startPoint, targetPoint);
            var tween = egret.Tween.get(this.target);
            this.target.x = startPoint.x;
            this.target.y = startPoint.y;
            this.target.touchEnabled = false;
            this.isRunOver = false;
            tween.to({ alpha: 0.9, rotation: 10, x: targetPoint.x, y: targetPoint.y, scaleX: 1.05, scaleY: 1.05 }, 200).to({ rotation: 0, alpha: 1, scaleX: 1, scaleY: 1 }, 50).call(this.runOver, this);
        }
    };
    ActionButtonAppear.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.touchEnabled = true;
        this.isRunOver = true;
    };
    ActionButtonAppear.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return ActionButtonAppear;
}(BaseAnimation));
__reflect(ActionButtonAppear.prototype, "ActionButtonAppear");
//# sourceMappingURL=ActionButtonAppear.js.map