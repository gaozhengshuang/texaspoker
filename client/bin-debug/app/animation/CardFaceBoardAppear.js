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
 * 公共牌出现
 */
var CardFaceBoardAppear = (function (_super) {
    __extends(CardFaceBoardAppear, _super);
    function CardFaceBoardAppear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardFaceBoardAppear.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.alpha = 0.1;
        this.target.visible = true;
        this.target.initElementsShow();
        this.target.backFace.matrix = this.target.frontFaceImg.matrix = new egret.Matrix();
        this.target.scaleX = this.target.scaleY = 0.1;
        if (this._initH == undefined) {
            this._initH = GamblingPanelSetting.BoardCardPoint.x;
            this._initV = GamblingPanelSetting.BoardCardPoint.y;
        }
        this.target.horizontalCenter = this._initH;
        this.target.verticalCenter = this._initV;
    };
    CardFaceBoardAppear.prototype.run = function (point, delay) {
        if (delay === void 0) { delay = 0; }
        // if (this.nextAnimation)
        // {
        // 	this.runNext();
        // }
        // else
        // {
        // 	this.runOver();
        // }
        // return;
        _super.prototype.run.call(this, point, delay);
        this._nextDelay = delay;
        this._moveToPoint = point;
        var moveTween = egret.Tween.get(this.target);
        moveTween.to({ horizontalCenter: point.x, verticalCenter: point.y, alpha: 1, scaleX: 1.23, scaleY: 1.23 }, 300, egret.Ease.circOut).wait(10).call(this.runOver, this);
        moveTween.play();
    };
    CardFaceBoardAppear.prototype.runOver = function () {
        if (this.nextAnimation && this._nextDelay >= 0) {
            this._timeId = egret.setTimeout(this.runNext, this, this._nextDelay);
        }
        else {
            this.clear();
        }
    };
    CardFaceBoardAppear.prototype.runNext = function () {
        this.clear();
        if (this.nextAnimation) {
            this.nextAnimation.run();
        }
    };
    CardFaceBoardAppear.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._nextDelay = undefined;
        this._moveToPoint = null;
        clearTimeout(this._timeId);
    };
    return CardFaceBoardAppear;
}(BaseAnimation));
__reflect(CardFaceBoardAppear.prototype, "CardFaceBoardAppear");
//# sourceMappingURL=CardFaceBoardAppear.js.map