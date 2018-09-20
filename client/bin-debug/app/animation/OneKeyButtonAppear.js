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
 * 快捷加注按钮动画出现
 */
var OneKeyButtonAppear = (function (_super) {
    __extends(OneKeyButtonAppear, _super);
    function OneKeyButtonAppear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OneKeyButtonAppear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.scaleX = this.target.scaleY = 0.1;
        this.target.alpha = 0;
        this.target.visible = true;
    };
    OneKeyButtonAppear.prototype.run = function (time) {
        _super.prototype.run.call(this);
        var tween = egret.Tween.get(this.target);
        tween.wait(time).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.backIn).call(this.runOver, this);
        this.target.touchEnabled = false;
    };
    OneKeyButtonAppear.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.touchEnabled = true;
    };
    OneKeyButtonAppear.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return OneKeyButtonAppear;
}(BaseAnimation));
__reflect(OneKeyButtonAppear.prototype, "OneKeyButtonAppear");
//# sourceMappingURL=OneKeyButtonAppear.js.map