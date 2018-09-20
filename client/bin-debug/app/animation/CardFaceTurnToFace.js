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
 * 翻牌
 */
var CardFaceTurnToFace = (function (_super) {
    __extends(CardFaceTurnToFace, _super);
    function CardFaceTurnToFace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scale = 1;
        _this.time = 120;
        /**
         * 动画是否显示音效
         */
        _this.isSound = false;
        return _this;
    }
    CardFaceTurnToFace.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.target.visible = true;
        this._backFaceMatrix = new egret.Matrix(1, 0, 0, 1);
        this._frontFaceMatrix = new egret.Matrix(0.122, 0.047);
        this.target.initElementsShow();
        this.target.backFace.matrix = this.target.frontFaceImg.matrix = new egret.Matrix();
    };
    CardFaceTurnToFace.prototype.run = function (scale) {
        // this.runOver();
        // return;
        _super.prototype.run.call(this);
        this.target.scaleX = this.target.scaleY = this.scale;
        var backFaceTween = egret.Tween.get(this._backFaceMatrix, { onChange: this.onBackFaceChange.bind(this) });
        backFaceTween.to({ a: 0.0243, b: -0.023 }, this.time).wait(10).call(this.onBackFaceChangeOver, this);
        backFaceTween.play();
        if (this.isSound) {
            SoundManager.playEffect(MusicAction.light_card);
        }
    };
    CardFaceTurnToFace.prototype.onBackFaceChange = function () {
        this.target.backFace.matrix = this._backFaceMatrix;
    };
    CardFaceTurnToFace.prototype.onBackFaceChangeOver = function () {
        this.target.backFace.visible = false;
        this.target.frontFaceImg.matrix = this._frontFaceMatrix;
        this.target.frontFaceImg.visible = true;
        var frontFaceTween = egret.Tween.get(this._frontFaceMatrix, { onChange: this.onFrontFaceChange.bind(this) });
        frontFaceTween.to({ a: 0.9, b: 0.1 }, this.time - 20).wait(10).call(this.runOver, this);
        frontFaceTween.play();
    };
    CardFaceTurnToFace.prototype.onFrontFaceChange = function () {
        this.target.frontFaceImg.matrix = this._frontFaceMatrix;
    };
    CardFaceTurnToFace.prototype.runOver = function () {
        _super.prototype.runOver.call(this);
        this.target.frontFaceImg.visible = false;
        this.target.cardGroup.visible = true;
        if (this.callback) {
            this.callback.invoke();
        }
    };
    CardFaceTurnToFace.prototype.clear = function () {
        if (this._frontFaceMatrix) {
            egret.Tween.removeTweens(this._frontFaceMatrix);
        }
        if (this._backFaceMatrix) {
            egret.Tween.removeTweens(this._backFaceMatrix);
        }
    };
    return CardFaceTurnToFace;
}(BaseAnimation));
__reflect(CardFaceTurnToFace.prototype, "CardFaceTurnToFace");
//# sourceMappingURL=CardFaceTurnToFace.js.map