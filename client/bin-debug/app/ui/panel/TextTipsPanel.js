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
 * 文本tips面板
 */
var TextTipsPanel = (function (_super) {
    __extends(TextTipsPanel, _super);
    function TextTipsPanel() {
        var _this = _super.call(this) || this;
        _this.layer = UILayerType.Tips;
        _this.setSkinName(UIModuleName.TextTipsPanel);
        return _this;
    }
    TextTipsPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.setTouchChildren(false);
        this.setTouchEnable(false);
    };
    TextTipsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (this.panelData) {
            this.label.text = this.panelData;
            this.bgImage.width = this.label.width + 60;
            this.bgImage.height = this.label.height + 30;
            this.removeTweenEvents();
            this.createTween();
        }
    };
    TextTipsPanel.prototype.createTween = function () {
        this.removeTweenEvents();
        this.alpha = 1;
        egret.Tween.get(this).wait(1500).to({ alpha: 0 }, 500, egret.Ease.quadOut).call(this.onPlayOver, this);
    };
    TextTipsPanel.prototype.onPlayOver = function (thisObject) {
        this.onCloseBtnClickHandler(null);
    };
    TextTipsPanel.prototype.removeTweenEvents = function () {
        egret.Tween.removeTweens(this);
    };
    return TextTipsPanel;
}(BasePanel));
__reflect(TextTipsPanel.prototype, "TextTipsPanel");
//# sourceMappingURL=TextTipsPanel.js.map