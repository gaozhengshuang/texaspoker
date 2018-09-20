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
 * 游戏按钮
 */
var GameButton = (function (_super) {
    __extends(GameButton, _super);
    function GameButton() {
        var _this = _super.call(this) || this;
        _this._offset = 0.05;
        _this.btnProxy = _this;
        _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onEnable, _this);
        return _this;
    }
    GameButton.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._isTweenOver = true;
        this._initSx = this.scaleX;
        this._initSy = this.scaleY;
        this._initX = this.x;
        this._initY = this.y;
        this.btnProxy.x = this._initX + this.btnProxy.width / 2;
        this.btnProxy.y = this._initY + this.btnProxy.height / 2;
        this.btnProxy.anchorOffsetX = this.btnProxy.width / 2;
        this.btnProxy.anchorOffsetY = this.btnProxy.height / 2; //居中按钮
    };
    GameButton.prototype.onTouchBegin = function (event) {
        _super.prototype.onTouchBegin.call(this, event);
        this._isTweenOver = false;
        egret.Tween.removeTweens(this.btnProxy);
        var tween = egret.Tween.get(this.btnProxy);
        tween.to({ scaleX: this._initSx + this._offset, scaleY: this._initSy + this._offset }, 255).call(this.tweenComplete.bind(this));
        UIUtil.setGlowerFilter(this.btnProxy);
    };
    GameButton.prototype.tweenComplete = function () {
        this._isTweenOver = true;
    };
    GameButton.prototype.onTouchCancle = function (event) {
        _super.prototype.onTouchCancle.call(this, event);
        this.buttonReleased();
    };
    GameButton.prototype.buttonReleased = function () {
        egret.Tween.removeTweens(this.btnProxy);
        var tween = egret.Tween.get(this.btnProxy);
        tween.to({ scaleX: this._initSx, scaleY: this._initSy }, 255);
        UIUtil.clearFilters(this.btnProxy);
    };
    GameButton.prototype.onEnable = function (event) {
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
        this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    GameButton.prototype.onDisable = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
        this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
        // this.btnProxy.x = this.btnProxy.y = 0;
        // this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    return GameButton;
}(eui.Button));
__reflect(GameButton.prototype, "GameButton");
//# sourceMappingURL=GameButton.js.map