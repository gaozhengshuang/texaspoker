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
 * 基于初始点移动到某点
 */
var CardFaceMoveToPoint = (function (_super) {
    __extends(CardFaceMoveToPoint, _super);
    function CardFaceMoveToPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardFaceMoveToPoint.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.initElementsShow();
        this.target.matrix = this.target.initMatrix;
        if (!this._defaultMatrix) {
            this._defaultMatrix = new egret.Matrix();
        }
        this.target.backFace.matrix = this._defaultMatrix;
    };
    CardFaceMoveToPoint.prototype.run = function (point, initx, delay, rotation, y) {
        if (initx === void 0) { initx = 0; }
        if (delay === void 0) { delay = 0; }
        if (rotation === void 0) { rotation = 0; }
        if (y === void 0) { y = 0; }
        // if (this.nextAnimation)
        // {
        // 	this.runNext();
        // }
        // else
        // {
        // 	this.runOver();
        // }
        // return;
        _super.prototype.run.call(this, point, delay, rotation, y);
        this._moveToPoint = point;
        this._nextDelay = delay;
        this._nextRotaion = rotation;
        this._nextY = y;
        this.target.x = initx;
        this.target.y = point.y;
        var moveTween = egret.Tween.get(this.target);
        moveTween.to({ x: point.x, y: this.target.initMatrix.ty + point.y }, 100).wait(10).call(this.runOver, this);
        moveTween.play();
    };
    CardFaceMoveToPoint.prototype.runOver = function () {
        if (this.nextAnimation && this._nextDelay >= 0) {
            this._timeId = egret.setTimeout(this.runNext, this, this._nextDelay);
        }
        else {
            this.clear();
        }
    };
    CardFaceMoveToPoint.prototype.runNext = function () {
        this.clear();
        if (this.nextAnimation) {
            this.nextAnimation.run(this._nextRotaion, this._nextY);
        }
    };
    CardFaceMoveToPoint.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._nextDelay = undefined;
        clearTimeout(this._timeId);
        this._moveToPoint = null;
    };
    return CardFaceMoveToPoint;
}(BaseAnimation));
__reflect(CardFaceMoveToPoint.prototype, "CardFaceMoveToPoint");
//# sourceMappingURL=CardFaceMoveToPoint.js.map