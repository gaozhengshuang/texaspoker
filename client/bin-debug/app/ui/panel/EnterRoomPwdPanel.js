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
 * 进入私人房输入密码面板
*/
var EnterRoomPwdPanel = (function (_super) {
    __extends(EnterRoomPwdPanel, _super);
    function EnterRoomPwdPanel(flag) {
        var _this = _super.call(this) || this;
        _this._isShowKeyBoardPanel = true;
        for (var i = 1; i <= 6; i++) {
            _this["label" + i.toString()] = new NumComponent(UIComponentSkinName.NumComponent);
        }
        if (!flag) {
            _this.setSkinName(UIModuleName.EnterRoomPwdPanel);
        }
        return _this;
    }
    EnterRoomPwdPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this._labelList = new Array();
        for (var i = 1; i <= 6; i++) {
            this._labelList.push(this["label" + i.toString()]);
            this.labelGroup.addChild(this["label" + i.toString()]);
        }
        this.setAlignInfo(PanelAlignType.Center_Center, 0, -100);
        this.callback = this.enterPwd;
    };
    EnterRoomPwdPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        //重置
        this.resetLabel();
        if (this._isShowKeyBoardPanel) {
            UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.callback, target: this, isbgNotCanClick: true, isNotHasMask: true });
        }
    };
    EnterRoomPwdPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onCloseBtnClickHandler, this);
    };
    EnterRoomPwdPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onCloseBtnClickHandler, this);
    };
    Object.defineProperty(EnterRoomPwdPanel.prototype, "isShowKeyBoardPanel", {
        /**
         * 设置是否默认打开键盘面板
        */
        set: function (value) {
            this._isShowKeyBoardPanel = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 关闭面板
    */
    EnterRoomPwdPanel.prototype.onCloseBtnClickHandler = function (event) {
        PlayingFieldManager.onCloseKeyboardEvent.dispatch();
        this.resetLabel();
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    /**
     * 重置密码框内容
    */
    EnterRoomPwdPanel.prototype.resetLabel = function () {
        for (var _i = 0, _a = this._labelList; _i < _a.length; _i++) {
            var childLabel = _a[_i];
            childLabel.refresh();
        }
    };
    /**
     * 输入密码
    */
    EnterRoomPwdPanel.prototype.enterPwd = function (type, num) {
        if (num) {
            var label = this.getUnWriteLabel();
            if (label) {
                label.refresh(parseInt(num));
            }
        }
        if (type == KeyBoardKeyType.Number) {
            var str = this.getRoomPwd();
            if (str.length > 5) {
                GamblingManager.reqEnterRoom(parseInt(this.panelData), str);
            }
        }
        else if (type == KeyBoardKeyType.Del) {
            var delLabel = this.getWirteLabel();
            if (delLabel) {
                delLabel.refresh();
            }
        }
        else if (type == KeyBoardKeyType.Reset) {
            this.resetLabel();
        }
    };
    EnterRoomPwdPanel.prototype.getUnWriteLabel = function () {
        var label;
        for (var i = 0; i < this._labelList.length; i++) {
            label = this._labelList[i];
            if (label.label1 && !label.label1.text) {
                return label;
            }
        }
        return null;
    };
    EnterRoomPwdPanel.prototype.getWirteLabel = function () {
        var label;
        for (var i = this._labelList.length - 1; i >= 0; i--) {
            label = this._labelList[i];
            if (label.label1 && label.label1.text) {
                return label;
            }
        }
        return null;
    };
    /**
     * 获得密码
    */
    EnterRoomPwdPanel.prototype.getRoomPwd = function () {
        var str = qin.StringConstants.Empty;
        for (var i = 0; i < this._labelList.length; i++) {
            str += this._labelList[i].label1.text;
        }
        return str;
    };
    return EnterRoomPwdPanel;
}(BasePanel));
__reflect(EnterRoomPwdPanel.prototype, "EnterRoomPwdPanel");
//# sourceMappingURL=EnterRoomPwdPanel.js.map