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
 * 修改昵称面板
 */
var ChangeUserNamePanel = (function (_super) {
    __extends(ChangeUserNamePanel, _super);
    function ChangeUserNamePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ChangeUserNamePanel);
        return _this;
    }
    ChangeUserNamePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    ChangeUserNamePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        this.nameTextLabel.text = UserManager.userInfo.name;
    };
    ChangeUserNamePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        UserManager.onCreateRoleEvent.addListener(this.onChangeComplete, this);
    };
    ChangeUserNamePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        UserManager.onCreateRoleEvent.removeListener(this.onChangeComplete, this);
    };
    /**
     * 点击面板按钮事件处理
    */
    ChangeUserNamePanel.prototype.clickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (event.target == this.randomBtn) {
            this.nameTextLabel.text = NameDefined.GetInstance().getRandomNickName(UserManager.userInfo.sex);
        }
        else if (event.target == this.changeNameBtn) {
            if (this.nameTextLabel.text == UserManager.userInfo.name) {
                UIManager.showFloatTips("请输入一个新的昵称");
                return;
            }
            if (UserUtil.isLegalNickName(this.nameTextLabel.text)) {
                UserManager.editUserName(this.nameTextLabel.text);
            }
        }
    };
    ChangeUserNamePanel.prototype.onChangeComplete = function () {
        this.tweenClose();
        UIManager.showFloatTips("修改成功");
    };
    return ChangeUserNamePanel;
}(BasePanel));
__reflect(ChangeUserNamePanel.prototype, "ChangeUserNamePanel");
//# sourceMappingURL=ChangeUserNamePanel.js.map