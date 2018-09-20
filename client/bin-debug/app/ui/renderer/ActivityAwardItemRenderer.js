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
 * 活动奖励渲染项
 */
var ActivityAwardItemRenderer = (function (_super) {
    __extends(ActivityAwardItemRenderer, _super);
    function ActivityAwardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ActivityAwardItemRenderer;
        return _this;
    }
    ActivityAwardItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    };
    ActivityAwardItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
        }
    };
    ActivityAwardItemRenderer.prototype.onClick = function () {
        ActivityManager.showPanelInActivityCenter(this.bindData);
    };
    ActivityAwardItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return ActivityAwardItemRenderer;
}(BaseItemRenderer));
__reflect(ActivityAwardItemRenderer.prototype, "ActivityAwardItemRenderer");
//# sourceMappingURL=ActivityAwardItemRenderer.js.map