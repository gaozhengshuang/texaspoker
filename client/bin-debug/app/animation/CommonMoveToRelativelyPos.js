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
 * 通用基于当前相对位置移动
 */
var CommonMoveToRelativelyPos = (function (_super) {
    __extends(CommonMoveToRelativelyPos, _super);
    function CommonMoveToRelativelyPos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonMoveToRelativelyPos.prototype.run = function (x, y, callBack, thisObj) {
        _super.prototype.run.call(this, x, y, callBack, thisObj);
        this.callBack = null;
        if (callBack) {
            this.callBack = qin.Delegate.getOut(callBack, thisObj);
        }
        var tween = egret.Tween.get(this.target);
        tween.to({ x: x, y: y }, 300, egret.Ease.sineIn).call(this.runOver, this);
        tween.play();
    };
    CommonMoveToRelativelyPos.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        if (this.callBack) {
            this.callBack.invoke();
        }
    };
    return CommonMoveToRelativelyPos;
}(BaseAnimation));
__reflect(CommonMoveToRelativelyPos.prototype, "CommonMoveToRelativelyPos");
//# sourceMappingURL=CommonMoveToRelativelyPos.js.map