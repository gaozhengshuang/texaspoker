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
 * 分享面板
 */
var ShareGamePromptPanel = (function (_super) {
    __extends(ShareGamePromptPanel, _super);
    function ShareGamePromptPanel() {
        var _this = _super.call(this) || this;
        _this.isTween = false;
        _this.setSkinName(UIModuleName.ShareGamePromptPanel);
        return _this;
    }
    ShareGamePromptPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0.7;
        this.isMaskClickClose = true;
    };
    ShareGamePromptPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    ShareGamePromptPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    ShareGamePromptPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    ShareGamePromptPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    return ShareGamePromptPanel;
}(BasePanel));
__reflect(ShareGamePromptPanel.prototype, "ShareGamePromptPanel");
//# sourceMappingURL=ShareGamePromptPanel.js.map