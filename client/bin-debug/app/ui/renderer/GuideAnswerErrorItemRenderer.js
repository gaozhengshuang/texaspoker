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
 * 引导回答错误项面板
*/
var GuideAnswerErrorItemRenderer = (function (_super) {
    __extends(GuideAnswerErrorItemRenderer, _super);
    function GuideAnswerErrorItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GuideAnswerErrorItemRenderer;
        return _this;
    }
    GuideAnswerErrorItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            if (this.bindData.scale != undefined) {
                this.card.scaleX = this.card.scaleY = this.bindData.scale;
            }
            this.card.init(this.bindData.info);
            this.card.initElementsShow2();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    };
    GuideAnswerErrorItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    GuideAnswerErrorItemRenderer.prototype.showMask = function () {
        if (this.card) {
            this.card.showMask(true);
        }
    };
    return GuideAnswerErrorItemRenderer;
}(BaseItemRenderer));
__reflect(GuideAnswerErrorItemRenderer.prototype, "GuideAnswerErrorItemRenderer");
//# sourceMappingURL=GuideAnswerErrorItemRenderer.js.map