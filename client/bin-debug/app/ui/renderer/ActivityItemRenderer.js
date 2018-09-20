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
 * 活动列表渲染项
 */
var ActivityItemRenderer = (function (_super) {
    __extends(ActivityItemRenderer, _super);
    function ActivityItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ActivityItemRenderer;
        return _this;
    }
    ActivityItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.addRedPoint();
        this.refresh();
    };
    ActivityItemRenderer.prototype.refresh = function () {
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.itemTitleLabel.text = this.bindData.definition.name;
            this.itemDesLabel.text = this.bindData.definition.des;
            this.activityIcon.source = this.bindData.definition.icon + ResSuffixName.PNG;
        }
    };
    ActivityItemRenderer.prototype.addRedPoint = function () {
        if (this.bindData.definition.type == ActivityType.BankruptSubsidy) {
            UIUtil.addMultiNotify(this.iconGroup, NotifyType.BankruptSubsidy, this.bindData.id, 0, 0);
        }
    };
    ActivityItemRenderer.prototype.onClick = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        // ActivityManager.showPanelInActivityCenter(this.bindData);
        ActivityPanelJumpManager.JumpToPanel(this.bindData);
    };
    ActivityItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return ActivityItemRenderer;
}(BaseItemRenderer));
__reflect(ActivityItemRenderer.prototype, "ActivityItemRenderer");
//# sourceMappingURL=ActivityItemRenderer.js.map