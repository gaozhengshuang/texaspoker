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
 * 保险箱密码创建面板
 */
var SafeCreatePanel = (function (_super) {
    __extends(SafeCreatePanel, _super);
    function SafeCreatePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.SafeCreatePanel);
        return _this;
    }
    SafeCreatePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.setTips("");
        this.pwdFrist = new PwdComponent(UIComponentSkinName.PwdComponent);
        this.pwdGroup.addChild(this.pwdFrist);
        this.pwdSecond = new PwdComponent(UIComponentSkinName.PwdComponent);
        this.pwdGroup.addChild(this.pwdSecond);
        this.maskAlpha = 0;
    };
    SafeCreatePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
    };
    SafeCreatePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.pwdFrist.init({ isNotMaskKeyPanel: true, isSelect: true });
        this.pwdSecond.init({ isNotMaskKeyPanel: true });
    };
    SafeCreatePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPanel, this);
        this.createPwdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createPwdHandle, this);
        this.pwdFrist.pwdInput.addListener(this.pwdInput, this);
        this.pwdSecond.pwdInput.addListener(this.pwdInput, this);
        SafeBoxManager.pwdSuccessEvent.addListener(this.pwdSuccessEvent, this);
    };
    SafeCreatePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPanel, this);
        this.createPwdBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.createPwdHandle, this);
        this.pwdFrist.pwdInput.removeListener(this.pwdInput, this);
        this.pwdSecond.pwdInput.removeListener(this.pwdInput, this);
        SafeBoxManager.pwdSuccessEvent.removeListener(this.pwdSuccessEvent, this);
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    };
    SafeCreatePanel.prototype.onClickPanel = function (event) {
        if (!this.pwdFrist.isTarget(event.target) && !this.pwdSecond.isTarget(event.target)) {
            UIManager.closePanel(UIModuleName.KeyBoardPanel);
        }
    };
    SafeCreatePanel.prototype.pwdSuccessEvent = function () {
        if (UserManager.userInfo.isSafePwd) {
            JumpUtil.JumpToSafeBox(UIModuleName.SafeCreatePanel);
            this.onCloseBtnClickHandler(null);
        }
    };
    SafeCreatePanel.prototype.pwdInput = function () {
        var pwd1 = this.pwdFrist.getPwd();
        var pwd2 = this.pwdSecond.getPwd();
        if (pwd1.length > 0 && pwd2.length > 0) {
            var min = Math.min(pwd1.length, pwd2.length);
            if (pwd1.substring(0, min) != pwd2.substring(0, min)) {
                this.setTips("*两次密码不一致");
            }
            else {
                this.setTips("");
            }
        }
    };
    /*
    * 创建密码操作
    */
    SafeCreatePanel.prototype.createPwdHandle = function () {
        var pwd1 = this.pwdFrist.getPwd();
        var pwd2 = this.pwdSecond.getPwd();
        if (pwd1.length == 0 || pwd2.length == 0) {
            this.setTips("*密码不能为空");
        }
        else if (pwd1.length < 6) {
            this.setTips("*密码长度为6位");
        }
        else if (pwd1 == pwd2) {
            SafeBoxManager.reqCreatePwd(pwd1);
        }
        else {
            this.setTips("*两次密码不一致");
        }
    };
    /**
      * 设置提示
     */
    SafeCreatePanel.prototype.setTips = function (tipName) {
        this.tipPwd.text = tipName;
    };
    SafeCreatePanel.prototype.onCloseBtnClickHandler = function (event) {
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
        _super.prototype.onCloseBtnClickHandler.call(this, event);
    };
    return SafeCreatePanel;
}(BasePanel));
__reflect(SafeCreatePanel.prototype, "SafeCreatePanel");
//# sourceMappingURL=SafeCreatePanel.js.map