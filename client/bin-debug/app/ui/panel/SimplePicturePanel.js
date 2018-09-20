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
 * 活动页面（只有一张图片）
 */
var SimplePicturePanel = (function (_super) {
    __extends(SimplePicturePanel, _super);
    function SimplePicturePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.SimplePicturePanel);
        return _this;
    }
    SimplePicturePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.activityScroller.viewport = this.imgGroup;
    };
    SimplePicturePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.activityScroller.viewport.scrollV = 0;
        if (InfoUtil.checkAvailable(this.activityInfo)) {
            this.activityImg.source = this.activityInfo.definition.icon;
            this.titleLabel.text = this.activityInfo.definition.name;
        }
    };
    SimplePicturePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
    };
    SimplePicturePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
    };
    SimplePicturePanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return SimplePicturePanel;
}(BaseActivityPanel));
__reflect(SimplePicturePanel.prototype, "SimplePicturePanel");
//# sourceMappingURL=SimplePicturePanel.js.map