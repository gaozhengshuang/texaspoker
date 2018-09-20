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
 * 用户协议面板
 */
var UserAngreementPanel = (function (_super) {
    __extends(UserAngreementPanel, _super);
    function UserAngreementPanel() {
        var _this = _super.call(this) || this;
        _this._showIndex = 0;
        _this._speed = 50;
        _this.setSkinName(UIModuleName.UserAngreementPanel);
        return _this;
    }
    UserAngreementPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        this._txtScroller = new eui.Scroller();
        this._txtScroller.width = 600;
        this._txtScroller.height = 600;
        this._txtScroller.viewport = this.txtGroup;
        this._txtScroller.x = 34;
        this._txtScroller.y = 130;
        this.tweenGroup.addChild(this._txtScroller);
    };
    UserAngreementPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    UserAngreementPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._txtScroller.stopAnimation();
        this.agreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeBtnClickHandler, this);
    };
    UserAngreementPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        if (this.isOver == false) {
            this.infoTxt.text = qin.StringConstants.Empty;
            this._showIndex = 0;
        }
        egret.clearInterval(this._timeId);
        this.agreeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeBtnClickHandler, this);
    };
    UserAngreementPanel.prototype.tryClearInterval = function () {
        if (this._angreeText && this.isOver) {
            egret.clearInterval(this._timeId);
        }
    };
    Object.defineProperty(UserAngreementPanel.prototype, "isOver", {
        get: function () {
            var len;
            if (this._angreeText) {
                len = this._angreeText.length;
            }
            return this._showIndex * this._speed + this._speed >= len;
        },
        enumerable: true,
        configurable: true
    });
    UserAngreementPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        //需要在scroller添加到舞台上面之后再访问verticalScrollBar
        UIUtil.hideScrollerBar(this._txtScroller);
        this._txtScroller.viewport.scrollV = 0;
        UIUtil.hideScrollerBar(this._txtScroller, true);
        if (!this._angreeText || (this._angreeText && this.isOver == false)) {
            UIManager.showPanel(UIModuleName.LoadingPanel);
            RES.getResByUrl(ProjectDefined.GetInstance().userAgreementUrl + "?" + Date.now().toString() + Math.random().toString(), this.setUserAgreeInfo, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    UserAngreementPanel.prototype.setUserAgreeInfo = function (text) {
        var _this = this;
        UIManager.closePanel(UIModuleName.LoadingPanel);
        if (text) {
            var reg = /\\n/g;
            this._angreeText = text.replace(reg, "\n");
            if (this._angreeText && this.isOver == false) {
                this._timeId = egret.setInterval(function () {
                    _this.infoTxt.text += _this._angreeText.substr(_this._showIndex * _this._speed, _this._speed);
                    _this.tryClearInterval();
                    _this._showIndex++;
                }, this, 500);
            }
        }
    };
    UserAngreementPanel.prototype.agreeBtnClickHandler = function (event) {
        GameSetting.IsAgreeUserAgreement = true;
        UIManager.dispatchEvent(UIModuleName.UserAngreementPanel, UIModuleEvent.CHANGE);
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    return UserAngreementPanel;
}(BasePanel));
__reflect(UserAngreementPanel.prototype, "UserAngreementPanel");
//# sourceMappingURL=UserAngreementPanel.js.map