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
 * 引导提示组件
 */
var GuidePromptComponent = (function (_super) {
    __extends(GuidePromptComponent, _super);
    function GuidePromptComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._roUp = 180;
        _this._roDown = 0;
        _this._roLeft = 90;
        _this._roRight = 270;
        _this._moveGap = 15;
        return _this;
    }
    GuidePromptComponent.get = function () {
        var component;
        if (GuidePromptComponent.cacheList.length > 0) {
            component = GuidePromptComponent.cacheList.pop();
        }
        else {
            component = new GuidePromptComponent(UIComponentSkinName.GuidePromptComponent);
        }
        return component;
    };
    GuidePromptComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.touchEnabled = this.touchChildren = false;
        this.maxWidth = 47;
        this.maxHeight = 48;
        this.arrowImg.horizontalCenter = this.arrowImg.verticalCenter = 0;
    };
    GuidePromptComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        var offsetV = 20;
        if (this.bindData.data.offsetV > 0) {
            offsetV = this.bindData.data.offsetV;
        }
        var tween = egret.Tween.get(this, { loop: true });
        this.arrowImg.alpha = 1;
        switch (this.bindData.data.orientation) {
            case GuideTipsOrientation.Up:
                this.arrowImg.rotation = this._roUp;
                this.horizontalCenter = 0;
                this.verticalCenter = offsetV;
                tween.to({ verticalCenter: offsetV - this._moveGap, alpha: 0.5 }, 1000).to({ verticalCenter: offsetV, alpha: 1 }, 1000);
                break;
            case GuideTipsOrientation.Down:
                this.arrowImg.rotation = this._roDown;
                this.horizontalCenter = 0;
                this.verticalCenter = -offsetV;
                tween.to({ verticalCenter: -offsetV + this._moveGap, alpha: 0.5 }, 1000).to({ verticalCenter: -offsetV, alpha: 1 }, 1000);
                break;
            case GuideTipsOrientation.Left:
                this.arrowImg.rotation = this._roLeft;
                this.verticalCenter = 0;
                this.horizontalCenter = offsetV;
                tween.to({ horizontalCenter: offsetV - this._moveGap, alpha: 0.5 }, 1000).to({ horizontalCenter: offsetV, alpha: 1 }, 1000);
                break;
            case GuideTipsOrientation.Right:
                this.arrowImg.rotation = this._roRight;
                this.verticalCenter = 0;
                this.horizontalCenter = -offsetV;
                tween.to({ horizontalCenter: -offsetV + this._moveGap, alpha: 0.5 }, 1000).to({ horizontalCenter: -offsetV, alpha: 1 }, 1000);
                break;
        }
        if (data.parent) {
            data.parent.addChild(this);
        }
    };
    GuidePromptComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.bindData = undefined;
        egret.Tween.removeTweens(this.arrowImg);
        GuidePromptComponent.cacheList.push(this);
    };
    GuidePromptComponent.clear = function () {
        GuidePromptComponent.cacheList.length = 0;
    };
    GuidePromptComponent.cacheList = new Array();
    return GuidePromptComponent;
}(BaseComponent));
__reflect(GuidePromptComponent.prototype, "GuidePromptComponent");
//# sourceMappingURL=GuidePromptComponent.js.map