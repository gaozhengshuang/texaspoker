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
 *  活动页面（具有图文内容的活动）
 */
var NormalActivityPanel = (function (_super) {
    __extends(NormalActivityPanel, _super);
    function NormalActivityPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.NormalActivityPanel);
        return _this;
    }
    NormalActivityPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        UIUtil.listRenderer(this.activityList, this.activityScroller, ActivityAwardItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
    };
    NormalActivityPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (InfoUtil.checkAvailable(this.activityInfo)) {
            //this.activityImg.source = this.info.definition.imgId
            this.titleLabel.text = this.activityInfo.definition.name;
            // this.desLabel.text = this.info.definition.des2;
        }
    };
    NormalActivityPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
    };
    NormalActivityPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
    };
    NormalActivityPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return NormalActivityPanel;
}(BaseActivityPanel));
__reflect(NormalActivityPanel.prototype, "NormalActivityPanel");
//# sourceMappingURL=NormalActivityPanel.js.map