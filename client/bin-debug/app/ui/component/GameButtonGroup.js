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
 * 有按钮效果的组
 */
var GameButtonGroup = (function (_super) {
    __extends(GameButtonGroup, _super);
    function GameButtonGroup() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onEnable, _this);
        return _this;
    }
    GameButtonGroup.prototype.createChildren = function () {
        this._isTweenOver = true;
        this._initSx = this.scaleX;
        this._initSy = this.scaleY;
        if (this.numChildren > 0) {
            this.btnGroup = this.getChildAt(0);
        }
    };
    GameButtonGroup.prototype.onTouchBegin = function (event) {
        this._isTweenOver = false;
        egret.Tween.removeTweens(this.btnGroup);
        var tween = egret.Tween.get(this.btnGroup, { onChange: this.update.bind(this) });
        tween.to({ scaleX: 1.05, scaleY: 1.05 }, 255).call(this.tweenComplete.bind(this));
        var component;
        for (var i = 0; i < this.btnGroup.numChildren; i++) {
            component = this.btnGroup.getChildAt(i);
            if (component instanceof eui.Button) {
                continue;
            }
            UIUtil.setGlowerFilter(component);
        }
        UIUtil.setGlowerFilter(this.btnGroup);
    };
    GameButtonGroup.prototype.tweenComplete = function () {
        this._isTweenOver = true;
    };
    GameButtonGroup.prototype.onTouchCancle = function (event) {
        this.buttonReleased(event);
    };
    GameButtonGroup.prototype.buttonReleased = function (event) {
        egret.Tween.removeTweens(this.btnGroup);
        var tween = egret.Tween.get(this.btnGroup, { onChange: this.update.bind(this) });
        tween.to({ scaleX: 1, scaleY: 1 }, 255);
        for (var i = 0; i < this.btnGroup.numChildren; i++) {
            UIUtil.clearFilters(this.btnGroup.getChildAt(i));
        }
        UIUtil.clearFilters(this.btnGroup);
    };
    GameButtonGroup.prototype.update = function () {
        if (this._initW != undefined && this._initH != undefined) {
            var nowW = this.btnGroup.scaleX * this._initW;
            var nowH = this.btnGroup.scaleY * this._initH;
            var nowX = -(nowW - this._initW) / 2;
            var nowY = -(nowH - this._initH) / 2;
            this.btnGroup.x = nowX;
            this.btnGroup.y = nowY;
            // qin.QinLog.log(this._initW, nowW, nowX, nowY);
        }
    };
    GameButtonGroup.prototype.rendererStart = function (event) {
        this._initW = this.btnGroup.width;
        this._initH = this.btnGroup.height;
        this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
    };
    GameButtonGroup.prototype.onEnable = function (event) {
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
        this.addEventListener(egret.Event.RENDER, this.rendererStart, this);
        this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.buttonReleased, this);
    };
    GameButtonGroup.prototype.onDisable = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
        this.removeEventListener(egret.Event.RENDER, this.rendererStart, this);
        this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.buttonReleased, this);
        if (this.btnGroup) {
            this.btnGroup.x = this.btnGroup.y = 0;
        }
        // this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    return GameButtonGroup;
}(eui.Group));
__reflect(GameButtonGroup.prototype, "GameButtonGroup");
//# sourceMappingURL=GameButtonGroup.js.map