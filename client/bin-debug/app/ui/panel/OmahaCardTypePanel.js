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
 * 奥马哈牌型面板
 */
var OmahaCardTypePanel = (function (_super) {
    __extends(OmahaCardTypePanel, _super);
    function OmahaCardTypePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.OmahaCardTypePanel);
        return _this;
    }
    OmahaCardTypePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0;
        this.scroller.viewport = this.scrollGroup;
        UIManager.pushResizeScroller(this.scrollGroup, 886);
    };
    OmahaCardTypePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData != null) {
            this.setLight(appendData);
        }
    };
    OmahaCardTypePanel.prototype.setLight = function (type) {
        for (var i = 0; i < this.lightGroup.numChildren; i++) {
            this.lightGroup.getChildAt(i).visible = (i == this.lightGroup.numChildren - type);
        }
    };
    return OmahaCardTypePanel;
}(BasePanel));
__reflect(OmahaCardTypePanel.prototype, "OmahaCardTypePanel");
//# sourceMappingURL=OmahaCardTypePanel.js.map