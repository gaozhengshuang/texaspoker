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
 * 发牌动画
 */
var FlopCardAnimation = (function (_super) {
    __extends(FlopCardAnimation, _super);
    function FlopCardAnimation() {
        var _this = _super.call(this) || this;
        _this._runTime = 400;
        _this._isCallBackIsRuned = false;
        //发牌轨迹向上弯曲角度
        _this._flopAngle = 18;
        _this._movePoint = new egret.Point();
        _this._p0 = new egret.Point();
        _this._p1 = new egret.Point();
        _this._p2 = new egret.Point();
        _this._vecotr = new qin.Vector2D(0, 0);
        _this._angleVec = new qin.Vector2D(0, 0);
        return _this;
    }
    FlopCardAnimation.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (!this._initMatrix) {
            this._initMatrix = this.target.matrix;
        }
        this.target.alpha = 1;
        this.target.matrix = this._initMatrix;
        this.target.y = GameManager.stage.stageHeight / 2 + GamblingPanelSetting.FlopCardVerticalCenter; //计算相对布局 -57.5为初始的verticalcenter属性
    };
    FlopCardAnimation.prototype.run = function (point, callBack, thisObj, params) {
        // this.callBack = new qin.Delegate(callBack, thisObj);
        // this._params = params;
        // this.runOver();
        // return;
        _super.prototype.run.call(this, point);
        this._angleVec.x = point.x - this._initMatrix.tx;
        this._angleVec.y = point.y - this.target.y;
        this._params = params;
        this.callBack = new qin.Delegate(callBack, thisObj);
        var angle = this._angleVec.angle;
        angle = angle * qin.MathUtil.Radian2Angle;
        angle += 270;
        this._p0.x = this.target.x;
        this._p0.y = this.target.y;
        this._vecotr.x = point.x - this.target.x;
        this._vecotr.y = point.y - this.target.y;
        this._vecotr = this._vecotr.multiply(0.5);
        var oppLen = Math.tan(this._flopAngle * qin.MathUtil.Angle2Radian) * Math.sqrt(this._vecotr.lengthSQ);
        var len = Math.sqrt(this._vecotr.lengthSQ + oppLen * oppLen);
        this._vecotr.distance = len;
        this._vecotr.angle = this._vecotr.angle - this._flopAngle * qin.MathUtil.Angle2Radian;
        this._p1.x = this._vecotr.x + GameManager.stage.stageWidth / GameSetting.StageWidth * this._initMatrix.tx;
        this._p1.y = this._vecotr.y + GameManager.stage.stageHeight / GameSetting.StageHeight * this._initMatrix.ty;
        this._p2.x = point.x;
        this._p2.y = point.y;
        var tween = egret.Tween.get(this.target);
        tween.to({ scaleX: 0.5, scaleY: 0.5, alpha: 0.5, rotation: angle }, this._runTime).call(this.runOver, this);
        this._factor = 0;
        tween = egret.Tween.get(this);
        tween.to({ factor: 1 }, this._runTime); //, egret.Ease.circOut
        this._runStart = egret.getTimer();
        this.target.visible = true;
        this._isCallBackIsRuned = false;
        this.runNext();
        qin.Tick.addFrameInvoke(this.runNext, this);
        tween.play();
    };
    Object.defineProperty(FlopCardAnimation.prototype, "factor", {
        get: function () {
            return this._factor;
        },
        set: function (value) {
            this._factor = value;
            qin.MathUtil.besselPoint(this._factor, this._p0, this._p1, this._p2, this._movePoint);
            this.target.x = this._movePoint.x;
            this.target.y = this._movePoint.y;
        },
        enumerable: true,
        configurable: true
    });
    FlopCardAnimation.prototype.runNext = function () {
        if (egret.getTimer() - this._runStart > this._runTime / 2 + 30 && this.callBack) {
            this.callBack.invoke(this._params);
            this._isCallBackIsRuned = true;
            qin.Tick.removeFrameInvoke(this.runNext, this);
            this.callBack = null;
        }
    };
    FlopCardAnimation.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.visible = false;
        egret.Tween.removeTweens(this);
        if (this._isCallBackIsRuned == false && this.callBack) {
            this.callBack.invoke(this._params);
        }
        this.callBack = null;
    };
    FlopCardAnimation.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return FlopCardAnimation;
}(BaseAnimation));
__reflect(FlopCardAnimation.prototype, "FlopCardAnimation");
//# sourceMappingURL=FlopCardAnimation.js.map