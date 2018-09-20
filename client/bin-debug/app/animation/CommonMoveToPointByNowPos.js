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
 * 基于当前位置移动到某点(通用)
 */
var CommonMoveToPointByNowPos = (function (_super) {
    __extends(CommonMoveToPointByNowPos, _super);
    function CommonMoveToPointByNowPos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonMoveToPointByNowPos.prototype.run = function (x, y, callBack, thisObj) {
        _super.prototype.run.call(this, x, y, callBack, thisObj);
        this.callBack = qin.Delegate.getOut(callBack, thisObj);
        var tween = egret.Tween.get(this.target);
        var dis = egret.Point.distance(new egret.Point(x, y), new egret.Point(this.target.x, this.target.y));
        tween.to({ x: x, y: y }, dis * 1.2, egret.Ease.circOut).call(this.runOver, this);
        tween.play();
    };
    CommonMoveToPointByNowPos.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        if (this.callBack) {
            this.callBack.invoke();
            qin.Delegate.putIn(this.callBack);
        }
        this.callBack = null;
    };
    return CommonMoveToPointByNowPos;
}(BaseAnimation));
__reflect(CommonMoveToPointByNowPos.prototype, "CommonMoveToPointByNowPos");
//# sourceMappingURL=CommonMoveToPointByNowPos.js.map