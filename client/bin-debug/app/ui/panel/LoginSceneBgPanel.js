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
 * 登录场景背景界面
 */
var LoginSceneBgPanel = (function (_super) {
    __extends(LoginSceneBgPanel, _super);
    function LoginSceneBgPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.LoginSceneBgPanel);
        return _this;
    }
    LoginSceneBgPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.logoImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Logo_png);
    };
    LoginSceneBgPanel.prototype.showVersion = function () {
        if (this.versionLabel) {
            this.versionLabel.text = VersionManager.getVersionStr();
        }
    };
    return LoginSceneBgPanel;
}(BasePanel));
__reflect(LoginSceneBgPanel.prototype, "LoginSceneBgPanel");
//# sourceMappingURL=LoginSceneBgPanel.js.map