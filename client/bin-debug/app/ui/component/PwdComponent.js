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
 * 密码组件(6位)/使用时注意:若传入{isNotMaskKeyPanel:true}时要时刻注意关闭UIModuleName.KeyBoardPanel
 * 本组件的可点击部件只能是this
 */
var PwdComponent = (function (_super) {
    __extends(PwdComponent, _super);
    function PwdComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pwdInput = new qin.DelegateDispatcher();
        _this._isOpenKeyPanel = false;
        _this._isSelect = false;
        _this._isInit = false;
        return _this;
    }
    PwdComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._numComList = new Array();
        for (var i = 1; i <= 6; i++) {
            var com = new NumComponent(UIComponentSkinName.NumComponent);
            this._numComList.push(com);
            this.numGroup.addChild(com);
        }
        if (this._isInit) {
            this.refresh();
        }
        //一定要有,本组件的可点击部件只能是this,其余都不能设为可点击
        this.touchChildren = false;
    };
    PwdComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        this._isInit = true;
        this._isNotMaskKeyPanel = false;
        this._isSelect = false;
        if (data) {
            if (data.isNotMaskKeyPanel) {
                this._isNotMaskKeyPanel = data.isNotMaskKeyPanel;
            }
            if (data.isSelect) {
                this._isSelect = true;
            }
        }
        if (this.isLoadComplete) {
            this.refresh();
        }
    };
    PwdComponent.prototype.refresh = function () {
        if (this._numComList && this._numComList.length > 0) {
            this.inputSelectLabel.size = this._numComList[0].label1.size;
        }
        if (this._isOpenKeyPanel) {
            this.setInputSelectLabel();
        }
        else {
            this.inputSelectLabel.visible = false;
            egret.Tween.removeTweens(this.inputSelectLabel);
        }
        if (this.bindData) {
            if (!this.bindData.numList) {
                this.resetLabel();
            }
        }
        else {
            this.resetLabel();
        }
        if (this._isSelect) {
            this.openPwdPanel();
        }
    };
    PwdComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openPwdPanel, this);
        UIManager.onPanelCloseEvent.addListener(this.panelClose, this);
        UIManager.addEventListener(UIModuleName.KeyBoardPanel, UIModuleEvent.OnCallTargetInit, this.onKeyTargetInit, this);
    };
    PwdComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openPwdPanel, this);
        UIManager.onPanelCloseEvent.removeListener(this.panelClose, this);
        UIManager.removeEventListener(UIModuleName.KeyBoardPanel, UIModuleEvent.OnCallTargetInit, this.onKeyTargetInit, this);
        egret.Tween.removeTweens(this.inputSelectLabel);
    };
    PwdComponent.prototype.panelClose = function (name) {
        if (name == UIModuleName.KeyBoardPanel) {
            this._isOpenKeyPanel = false;
            egret.Tween.removeTweens(this.inputSelectLabel);
            this.inputSelectLabel.visible = false;
        }
    };
    PwdComponent.prototype.onKeyTargetInit = function (data) {
        if (data != this && this._isOpenKeyPanel) {
            this._isOpenKeyPanel = false;
            egret.Tween.removeTweens(this.inputSelectLabel);
            this.inputSelectLabel.visible = false;
        }
    };
    PwdComponent.prototype.openPwdPanel = function () {
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.enterPwd, target: this, isNotHasMask: this._isNotMaskKeyPanel });
        this._isOpenKeyPanel = true;
        this.setInputSelectLabel();
    };
    /**-
     * 重置密码框内容
    */
    PwdComponent.prototype.resetLabel = function () {
        if (this._numComList) {
            for (var _i = 0, _a = this._numComList; _i < _a.length; _i++) {
                var childLabel = _a[_i];
                childLabel.refresh();
            }
        }
    };
    /**
     * 输入密码
    */
    PwdComponent.prototype.enterPwd = function (type, num) {
        if (type == 1) {
            if (num) {
                var label = this.getUnWriteLabel();
                if (label) {
                    label.refresh(parseInt(num));
                }
                this.setInputSelectLabel();
            }
        }
        else if (type == 2) {
            var delLabel = this.getWirteLabel();
            if (delLabel) {
                delLabel.refresh();
            }
            this.setInputSelectLabel();
        }
        else if (type == 3) {
            this.resetLabel();
            this.setInputSelectLabel();
        }
        else if (type == 4) {
            egret.Tween.removeTweens(this.inputSelectLabel);
            this.inputSelectLabel.visible = false;
            this._isOpenKeyPanel = false;
        }
        this.pwdInput.dispatch();
    };
    /**
     * 设置交点效果
     */
    PwdComponent.prototype.setInputSelectLabel = function () {
        if (!this.inputSelectLabel) {
            return;
        }
        var index = this.getPwd().length;
        if (index < 0) {
            index = 0;
        }
        if (this._numComList && this._numComList.length > index) {
            var pos = this._numComList[index];
            this.inputSelectLabel.visible = true;
            pos.addChild(this.inputSelectLabel);
            egret.Tween.removeTweens(this.inputSelectLabel);
            var tween = egret.Tween.get(this.inputSelectLabel, { loop: true });
            this.inputSelectLabel.alpha = 1;
            this.inputSelectLabel.x = pos.width / 2 - this.inputSelectLabel.width / 2;
            this.inputSelectLabel.y = pos.height / 2 - this.inputSelectLabel.height / 2;
            tween.to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
            tween.play();
        }
        else {
            this.inputSelectLabel.visible = false;
            egret.Tween.removeTweens(this.inputSelectLabel);
        }
    };
    PwdComponent.prototype.getUnWriteLabel = function () {
        var label;
        for (var i = 0; i < this._numComList.length; i++) {
            label = this._numComList[i];
            if (label.label1 && !label.label1.text) {
                return label;
            }
        }
        return null;
    };
    PwdComponent.prototype.getWirteLabel = function () {
        var label;
        for (var i = this._numComList.length - 1; i >= 0; i--) {
            label = this._numComList[i];
            if (label.label1 && label.label1.text) {
                return label;
            }
        }
        return null;
    };
    /**
     * 获得密码
    */
    PwdComponent.prototype.getPwd = function () {
        var str = qin.StringConstants.Empty;
        if (!this._numComList) {
            return str;
        }
        for (var i = 0; i < this._numComList.length; i++) {
            if (!qin.StringUtil.isNullOrEmpty(this._numComList[i].label1.text)) {
                str += this._numComList[i].label1.text;
            }
            else {
                return str;
            }
        }
        return str;
    };
    PwdComponent.prototype.isTarget = function (target) {
        if (target == this) {
            return true;
        }
        return false;
    };
    return PwdComponent;
}(BaseComponent));
__reflect(PwdComponent.prototype, "PwdComponent");
//# sourceMappingURL=PwdComponent.js.map