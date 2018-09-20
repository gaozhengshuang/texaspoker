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
 * 赢取筹码动画
 */
var WinChipsAnim = (function (_super) {
    __extends(WinChipsAnim, _super);
    function WinChipsAnim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WinChipsAnim.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (this._initV == undefined) {
            this._initV = this.target.verticalCenter;
        }
        this.target.verticalCenter = this._initV;
        this.target.alpha = 1;
    };
    WinChipsAnim.prototype.run = function () {
        _super.prototype.run.call(this);
        var tween = egret.Tween.get(this.target);
        tween.to({ verticalCenter: this._initV - 60 }, 300, egret.Ease.backOut).wait(1000).to({ alpha: 0 }, 300).call(this.runOver, this);
        tween.play();
    };
    WinChipsAnim.prototype.runOver = function () {
        this.target.visible = false;
        _super.prototype.runOver.call(this);
    };
    return WinChipsAnim;
}(BaseAnimation));
__reflect(WinChipsAnim.prototype, "WinChipsAnim");
//# sourceMappingURL=WinChipsAnim.js.map