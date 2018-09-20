var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 本地存储管理
 */
var PrefsManager = (function () {
    function PrefsManager() {
    }
    PrefsManager.setValue = function (key, value, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        if (isPrivate) {
            egret.localStorage.setItem(PrefsManager.getUserId() + key, value);
        }
        else {
            egret.localStorage.setItem(key, value);
        }
    };
    PrefsManager.getValue = function (key, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        if (isPrivate) {
            return egret.localStorage.getItem(PrefsManager.getUserId() + key);
        }
        else {
            return egret.localStorage.getItem(key);
        }
    };
    /**
     * 清除本地缓存
     */
    PrefsManager.removeData = function (key, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        if (isPrivate) {
            return egret.localStorage.removeItem(PrefsManager.getUserId() + key);
        }
        else {
            return egret.localStorage.removeItem(key);
        }
    };
    PrefsManager.setBoolean = function (key, value, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        PrefsManager.setValue(key, value.toString(), isPrivate);
    };
    PrefsManager.getBoolean = function (key, defaultValue, isPrivate) {
        if (defaultValue === void 0) { defaultValue = false; }
        if (isPrivate === void 0) { isPrivate = false; }
        var value = PrefsManager.getValue(key, isPrivate);
        if (qin.StringUtil.isNullOrEmpty(value)) {
            return defaultValue;
        }
        return qin.StringUtil.toBoolean(value);
    };
    PrefsManager.setNumber = function (key, value, isPrivate) {
        if (isPrivate === void 0) { isPrivate = false; }
        PrefsManager.setValue(key, value.toString(), isPrivate);
    };
    PrefsManager.getNumber = function (key, defaultValue, isPrivate) {
        if (defaultValue === void 0) { defaultValue = 0; }
        if (isPrivate === void 0) { isPrivate = false; }
        var value = PrefsManager.getValue(key, isPrivate);
        if (qin.StringUtil.isNullOrEmpty(value)) {
            return defaultValue;
        }
        return parseFloat(value);
    };
    PrefsManager.getUserId = function () {
        if (LoginManager.loginInfo) {
            return LoginManager.loginInfo.userid.toString();
        }
        return qin.StringConstants.Empty;
    };
    PrefsManager.clearLoginInfo = function () {
        PrefsManager.setValue(PrefsManager.Login_LoginType, qin.StringConstants.Empty);
        PrefsManager.setValue(PrefsManager.Login_Token, qin.StringConstants.Empty);
        PrefsManager.setNumber(PrefsManager.Login_Token_Expire, 0);
    };
    PrefsManager.getLoginToken = function () {
        var token = PrefsManager.getValue(PrefsManager.Login_Token);
        if (token) {
            var expire = PrefsManager.getNumber(PrefsManager.Login_Token_Expire);
            if (expire == 0 || expire > Math.floor(Date.now() / 1000)) {
                return token;
            }
        }
        return qin.StringConstants.Empty;
    };
    PrefsManager.setLoginToken = function (token, expire) {
        if (expire === void 0) { expire = 0; }
        PrefsManager.setValue(PrefsManager.Login_Token, token);
        PrefsManager.setNumber(PrefsManager.Login_Token_Expire, expire + Math.floor(Date.now() / 1000));
    };
    /**
     * 第三方登录返回的token，如果有直接使用登录
     */
    PrefsManager.Login_Token = "login_token";
    /**
     * 第三方登录返回的token的有效期
     */
    PrefsManager.Login_Token_Expire = "login_token_expire";
    //
    /**
     * 游戏内置的帐号系统登录帐号(不对用户使用)
     */
    PrefsManager.Login_Account = "login_account";
    /**
     * 游戏内置的帐号系统登录密码(不对用户使用)
     */
    PrefsManager.Login_Password = "login_password";
    /**
     * 当前登录类型
     */
    PrefsManager.Login_LoginType = "login_loginType";
    //声音
    PrefsManager.Sound_Bg_Volume = "sound_bg_volume";
    PrefsManager.Sound_Bg_Enable = "sound_bg_enable";
    PrefsManager.Sound_Effect_Volume = "sound_effect_volume";
    PrefsManager.Sound_Effect_Enable = "sound_effect_enable";
    //震动
    PrefsManager.Shake_Enable = "shake_enable";
    /**
     * 自动语音
     */
    PrefsManager.AutoVocie_Enable = "autovocie_enable";
    /**
     * 语言
     */
    PrefsManager.Language = 'language';
    /**
     * 上次登录时间
     */
    PrefsManager.User_LastLoginTime = "user_lastLoginTime";
    /**
     * 登录文本通知
     */
    PrefsManager.LoginTextNotify = "logintextnotify";
    return PrefsManager;
}());
__reflect(PrefsManager.prototype, "PrefsManager");
//# sourceMappingURL=PrefsManager.js.map