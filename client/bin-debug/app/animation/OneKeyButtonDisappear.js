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
 * 快捷加注按钮动画消失
 */
var OneKeyButtonDisappear = (function (_super) {
    __extends(OneKeyButtonDisappear, _super);
    function OneKeyButtonDisappear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRunOver = true;
        return _this;
    }
    OneKeyButtonDisappear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.alpha = 1;
        this.target.scaleX = 1;
        this.target.scaleY = 1;
        this.target.visible = true;
    };
    OneKeyButtonDisappear.prototype.run = function (time, parent) {
        if (this.isRunOver == true) {
            _super.prototype.run.call(this);
            this._parent = parent;
            var tween = egret.Tween.get(this.target);
            tween.wait(time).to({ alpha: 0, scaleX: 0.1, scaleY: 0.1 }, 250).call(this.runOver, this);
            this.target.touchEnabled = false;
            this.isRunOver = false;
        }
    };
    OneKeyButtonDisappear.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.visible = false;
        this.target.touchEnabled = true;
        if (this._parent) {
            this._parent.visible = false;
        }
        this.isRunOver = true;
    };
    OneKeyButtonDisappear.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return OneKeyButtonDisappear;
}(BaseAnimation));
__reflect(OneKeyButtonDisappear.prototype, "OneKeyButtonDisappear");
//# sourceMappingURL=OneKeyButtonDisappear.js.map