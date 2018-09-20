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
 * 礼物信息面板
 */
var GiftItemPanel = (function (_super) {
    __extends(GiftItemPanel, _super);
    function GiftItemPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.AchievementItemPanel);
        return _this;
    }
    GiftItemPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
    };
    GiftItemPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            this.info = appendData;
        }
    };
    GiftItemPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.wearGiftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.wearGift, this);
    };
    GiftItemPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.wearGiftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.wearGift, this);
    };
    GiftItemPanel.prototype.wearGift = function (event) {
    };
    return GiftItemPanel;
}(BasePanel));
__reflect(GiftItemPanel.prototype, "GiftItemPanel");
//# sourceMappingURL=GiftItemPanel.js.map