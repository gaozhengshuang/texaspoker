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
 * 礼物renderer
 */
var UserGiftItemRenderer = (function (_super) {
    __extends(UserGiftItemRenderer, _super);
    function UserGiftItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AchievementItemRenderer;
        return _this;
    }
    UserGiftItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    };
    UserGiftItemRenderer.prototype.refreshiUI = function () {
    };
    UserGiftItemRenderer.prototype.onClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        UIManager.showPanel(UIModuleName.GiftItemPanel, this.bindData);
    };
    UserGiftItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return UserGiftItemRenderer;
}(BaseItemRenderer));
__reflect(UserGiftItemRenderer.prototype, "UserGiftItemRenderer");
//# sourceMappingURL=UserGiftItemRenderer.js.map