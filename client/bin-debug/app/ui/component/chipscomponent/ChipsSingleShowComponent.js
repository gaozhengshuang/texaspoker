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
 * 只显示一单张图片的筹码组件
 */
var ChipsSingleShowComponent = (function (_super) {
    __extends(ChipsSingleShowComponent, _super);
    function ChipsSingleShowComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._radius = 45;
        _this._yRadius = 25;
        _this._time = 300;
        return _this;
    }
    ChipsSingleShowComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.touchChildren = false;
    };
    ChipsSingleShowComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        egret.Tween.removeTweens(this.bgImg);
        this.numLabel.horizontalCenter = 0;
        this.bgImg.horizontalCenter = 0;
        this.bgImg.alpha = 1;
        this.refreshNum(data.num);
        this.numLabel.y = this.numLabel.height + 12;
        this._initX = this.bgImg.x;
        this._initY = this.bgImg.y = 0;
        if (this.bindData.isShowTween) {
            this.showTweens();
        }
    };
    ChipsSingleShowComponent.prototype.showTweens = function () {
        this.bgImg.horizontalCenter = this.numLabel.horizontalCenter = undefined;
        this.numLabel.visible = false;
        this.bgImg.alpha = 0.1;
        var tween = egret.Tween.get(this.bgImg, { onChange: this.onTweenHandler.bind(this) });
        switch (this.bindData.state) {
            case ChipsShowState.LeftDown:
            case ChipsShowState.Left:
                this.bgImg.y -= this._yRadius;
                this.bgImg.x += this._radius;
                tween.to({ x: this._initX, y: this._initY, alpha: 1 }, this._time).call(this.tweenOver.bind(this));
                break;
            case ChipsShowState.RightDown:
            case ChipsShowState.Right:
                this.bgImg.y -= this._yRadius;
                this.bgImg.x -= this._radius;
                tween.to({ x: this._initX, y: this._initY, alpha: 1 }, this._time).call(this.tweenOver.bind(this));
                break;
            case ChipsShowState.Top:
                this.bgImg.y = this._initY + this._yRadius * 2;
                tween.to({ y: this._initY, alpha: 1 }, this._time).call(this.tweenOver.bind(this));
                break;
        }
    };
    ChipsSingleShowComponent.prototype.onTweenHandler = function () {
    };
    ChipsSingleShowComponent.prototype.tweenOver = function () {
        egret.Tween.removeTweens(this.bgImg);
        this.numLabel.visible = true;
        this.bgImg.horizontalCenter = this.numLabel.horizontalCenter = 0;
    };
    ChipsSingleShowComponent.prototype.refreshNum = function (num) {
        this.numLabel.text = qin.MathUtil.formatNum(num);
    };
    return ChipsSingleShowComponent;
}(BaseComponent));
__reflect(ChipsSingleShowComponent.prototype, "ChipsSingleShowComponent");
//# sourceMappingURL=ChipsSingleShowComponent.js.map