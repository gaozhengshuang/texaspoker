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
 * 牌局移动面板
 */
var GamblingGameGroupMove = (function (_super) {
    __extends(GamblingGameGroupMove, _super);
    function GamblingGameGroupMove() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingGameGroupMove.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    GamblingGameGroupMove.prototype.run = function (x, callBack, thisObject) {
        _super.prototype.run.call(this, x);
        if (callBack) {
            this.callBack = qin.Delegate.getOut(callBack, thisObject);
        }
        var tween = egret.Tween.get(this.target);
        tween.to({ x: x }, 200, egret.Ease.sineIn).call(this.runOver, this);
        tween.play();
    };
    GamblingGameGroupMove.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        if (this.callBack) {
            this.callBack.invoke();
            qin.Delegate.putIn(this.callBack);
        }
        this.callBack = null;
    };
    return GamblingGameGroupMove;
}(BaseAnimation));
__reflect(GamblingGameGroupMove.prototype, "GamblingGameGroupMove");
//# sourceMappingURL=GamblingGameGroupMove.js.map