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
 * 键盘面板
 */
var KeyBoardPanel = (function (_super) {
    __extends(KeyBoardPanel, _super);
    function KeyBoardPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.KeyBoardPanel);
        return _this;
    }
    KeyBoardPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0.1;
        this._btnList = new Array();
        for (var i = 0; i <= 9; i++) {
            this._btnList.push(this["numBtn" + i.toString()]);
        }
        UIManager.pushResizeGroup(this.panelBottom);
    };
    KeyBoardPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (this.panelData && this.panelData.target) {
            UIManager.dispatchEvent(UIModuleName.KeyBoardPanel, UIModuleEvent.OnCallTargetInit, this.panelData.target);
        }
        this.isbgNotCanClick = false;
        this.isNotHasMask = false;
        this.searchLabelFlag = "";
        if (this.panelData.isbgNotCanClick == true) {
            this.isbgNotCanClick = true;
        }
        if (this.panelData.isNotHasMask == true) {
            this.isNotHasMask = true;
        }
        if (this.isNotHasMask) {
            this.setGrayMask(false);
        }
        else {
            this.maskAlpha = 0;
        }
        if (this.panelData.searchLabelFlag) {
            this.searchLabelFlag = this.panelData.searchLabelFlag;
        }
        this.anmGroup.bottom = -502;
        egret.Tween.removeTweens(this.anmGroup);
        var enter = egret.Tween.get(this.anmGroup);
        enter.to({ bottom: 0 }, 200);
    };
    KeyBoardPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.keyboardClickHandler, this);
        PlayingFieldManager.onCloseKeyboardEvent.addListener(this.immediatelyClose, this);
    };
    KeyBoardPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.keyboardClickHandler, this);
        PlayingFieldManager.onCloseKeyboardEvent.removeListener(this.immediatelyClose, this);
    };
    /**
     * 直接关闭
    */
    KeyBoardPanel.prototype.immediatelyClose = function () {
        this.anmGroup.bottom = -502;
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    };
    /**
     * 退场动画
    */
    KeyBoardPanel.prototype.outAnime = function () {
        var enter = egret.Tween.get(this.anmGroup);
        this.anmGroup.bottom = 0;
        enter.to({ bottom: -502 }, 200).call(this.onCloseAnmComplete, this);
    };
    KeyBoardPanel.prototype.onCloseAnmComplete = function () {
        PlayingFieldManager.onKeyBoardCloseEvent.dispatch();
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    };
    /**
     * 数字键盘按钮事件处理
    */
    KeyBoardPanel.prototype.keyboardClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        this.type = undefined;
        var index = this._btnList.indexOf(event.target);
        if (index >= 0) {
            this.type = KeyBoardKeyType.Number; //数字键按下
            if (this.panelData.callback) {
                if (this.panelData.target) {
                    if (!this.searchLabelFlag) {
                        this.panelData.callback.call(this.panelData.target, this.type, index.toString());
                    }
                    else {
                        this.panelData.callback.call(this.panelData.target, this.type, this.searchLabelFlag, index.toString());
                    }
                }
                else {
                    if (!this.searchLabelFlag) {
                        this.panelData.callback(this.type, index.toString());
                    }
                    else {
                        this.panelData.callback(this.type, this.searchLabelFlag, index.toString());
                    }
                }
            }
        }
        else {
            switch (event.target) {
                case this.resetBtn:
                    this.type = KeyBoardKeyType.Reset; //清除键按下
                    break;
                case this.delBtn:
                    this.type = KeyBoardKeyType.Del; //删除键按下
                    break;
                case this.anmGroup:
                    break;
                case this.bgImg:
                    break;
                default:
                    this.type = KeyBoardKeyType.Close; //点击遮罩
                    if (!this.isbgNotCanClick) {
                        this.outAnime();
                    }
                    break;
            }
            if (this.panelData.callback) {
                if (this.panelData.target) {
                    if (!this.searchLabelFlag) {
                        this.panelData.callback.call(this.panelData.target, this.type);
                    }
                    else {
                        this.panelData.callback.call(this.panelData.target, this.type, this.searchLabelFlag);
                    }
                }
                else {
                    if (!this.searchLabelFlag) {
                        this.panelData.callback(this.type);
                    }
                    else {
                        this.panelData.callback(this.type, this.searchLabelFlag);
                    }
                }
            }
        }
    };
    return KeyBoardPanel;
}(BasePanel));
__reflect(KeyBoardPanel.prototype, "KeyBoardPanel");
/**
 * 键盘按下类型
*/
var KeyBoardKeyType;
(function (KeyBoardKeyType) {
    /**
     * 数字键
    */
    KeyBoardKeyType[KeyBoardKeyType["Number"] = 1] = "Number";
    /**
     * 删除
    */
    KeyBoardKeyType[KeyBoardKeyType["Del"] = 2] = "Del";
    /**
     * 重输
    */
    KeyBoardKeyType[KeyBoardKeyType["Reset"] = 3] = "Reset";
    /**
     * 关闭
    */
    KeyBoardKeyType[KeyBoardKeyType["Close"] = 4] = "Close";
})(KeyBoardKeyType || (KeyBoardKeyType = {}));
//# sourceMappingURL=KeyBoardPanel.js.map