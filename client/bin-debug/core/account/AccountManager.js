var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <summary>
/// 帐号系统管理类
/// </summary>
var AccountManager = (function () {
    function AccountManager() {
    }
    //------------------------------------------------------------------
    // ui
    //------------------------------------------------------------------
    /// <summary>
    /// 用户中心
    /// </summary>
    AccountManager.ShowUserCenter = function () {
        UIManager.showPanel(UIModuleName.BindAccountPanel);
    };
    /// <summary>
    /// 登录
    /// </summary>
    /// <param name="isAuto">是否自动登录</param>
    AccountManager.ShowLogin = function (isAuto, isBind) {
        if (isBind === void 0) { isBind = false; }
        //显示登录界面
        if (isAuto) {
            var account = AccountManager.AutoLogin();
            if (qin.StringUtil.isNullOrEmpty(account) == false) {
                UIManager.showPanel(UIModuleName.AutoLoginPanel);
            }
            else {
                UIManager.showPanel(UIModuleName.LoginTelPanel);
            }
        }
        else {
            if (!isBind) {
                UIManager.showPanel(UIModuleName.LoginTelPanel);
            }
        }
    };
    /**
     * 显示绑定面板
     */
    AccountManager.showBind = function () {
        UIManager.showPanel(UIModuleName.BindAccountPanel);
    };
    Object.defineProperty(AccountManager, "account", {
        /// <summary>
        /// 帐号
        /// </summary>
        get: function () {
            return AccountManager._account;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountManager, "uid", {
        /// <summary>
        /// 帐号id
        /// </summary>
        get: function () {
            return AccountManager._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountManager, "mno", {
        /// <summary>
        /// 手机号码
        /// </summary>
        get: function () {
            return AccountManager._mno;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountManager, "formatMno", {
        /// <summary>
        /// 获取格式化显示的手机号码
        /// </summary>
        get: function () {
            if (qin.StringUtil.isNullOrEmpty(AccountManager._mno)) {
                return AccountManager._startStr;
            }
            if (AccountManager._mno.length < 4) {
                return AccountManager._startStr + AccountManager._mno;
            }
            return AccountManager._startStr + AccountManager._mno.substring(AccountManager._mno.length - 4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountManager, "isBindPhone", {
        /// <summary>
        /// 是否绑定手机
        /// </summary>
        get: function () {
            return qin.StringUtil.isNullOrEmpty(AccountManager._mno) == false;
        },
        enumerable: true,
        configurable: true
    });
    AccountManager.Logout = function () {
        AccountManager._account = null;
        AccountManager._uid = null;
        AccountManager._mno = null;
        AccountManager._token = null;
    };
    Object.defineProperty(AccountManager, "isUsePhone", {
        /// <summary>
        /// 是否使用手机
        /// </summary>
        get: function () {
            return AccountManager._usePhone;
        },
        enumerable: true,
        configurable: true
    });
    AccountManager.addField = function (key, value, connectSymbol) {
        if (connectSymbol === void 0) { connectSymbol = "&"; }
        return connectSymbol + key + "=" + value;
    };
    /// <summary>
    /// 初始化
    /// </summary>
    /// <param name="appId"></param>
    /// <param name="channel"></param>
    /// <param name="deviceId"></param>
    /// <param name="usePhone"></param>
    AccountManager.Initialize = function (appId, channel, deviceId, usePhone) {
        if (usePhone === void 0) { usePhone = true; }
        AccountManager._appId = appId;
        AccountManager._channel = channel;
        AccountManager._deviceId = deviceId;
        AccountManager._usePhone = usePhone;
    };
    /// <summary>
    /// 自动登录
    /// </summary>
    /// <returns></returns>
    AccountManager.AutoLogin = function () {
        var list = AccountPlayerPrefs.GetAccountList();
        if (list != null && list.length > 0) {
            var info = list[0];
            if (info.type == AccountPwdType.token) {
                AccountManager.TokenLogin(info.token, info.account);
            }
            else {
                AccountManager.LoginCoroutine(true, AccountHttpUrl.login, info.account, info.pw, true);
            }
            return info.account;
        }
        return null;
    };
    AccountManager.parseData = function (account, data, md5pw, type) {
        if (type === void 0) { type = AccountPwdType.pw; }
        AccountManager._account = account;
        AccountManager._uid = data["uid"];
        AccountManager._mno = data["mno"];
        AccountManager._token = data["token"];
        AccountPlayerPrefs.InsertAccount(AccountManager._account, md5pw, type);
    };
    AccountManager.getRequestData = function (account, md5pw) {
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("appid", AccountManager._appId, qin.StringConstants.Empty);
        data += AccountManager.addField("account", account);
        data += AccountManager.addField("pw", md5pw);
        data += AccountManager.addField("did", AccountManager._deviceId);
        data += AccountManager.addField("channel", AccountManager._channel);
        return data;
    };
    /// <summary>
    /// 登录
    /// </summary>
    /// <param name="account"></param>
    /// <param name="pw"></param>
    AccountManager.Login = function (account, pw, isMd5, isBind) {
        if (isBind === void 0) { isBind = false; }
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.LoginCoroutine(false, AccountHttpUrl.login, account, pw, isMd5, isBind);
    };
    AccountManager.LoginCoroutine = function (isAuto, url, account, pw, isMd5, isBind) {
        if (isBind === void 0) { isBind = false; }
        var md5pw = isMd5 ? pw : qin.Crypt.hex_md5(pw);
        var data = AccountManager.getRequestData(account, md5pw);
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    AccountManager.parseData(account, table, md5pw);
                    AccountManager.OnLoginSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid });
                }
                else if (code == AccountCode.NoPw) {
                    AccountManager.OnNoPw.dispatch();
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                    AccountManager.ShowLogin(false, isBind);
                }
            }
            else {
                AccountManager.ShowLogin(false, isBind);
            }
        }, function () {
            AccountManager.ShowLogin(false, isBind);
        }, data);
    };
    /// <summary>
    /// 帐号注册 没用到
    /// </summary>
    /// <param name="account"></param>
    /// <param name="pw"></param>
    AccountManager.Register = function (account, pw) {
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.RegisterCoroutine(AccountHttpUrl.register, account, pw);
    };
    /**
     * 没用到
     */
    AccountManager.RegisterCoroutine = function (url, account, pw) {
        var md5pw = qin.Crypt.hex_md5(pw);
        var data = AccountManager.getRequestData(account, md5pw);
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    AccountManager.parseData(account, table, md5pw);
                    AccountManager.OnRegisterSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid, account: AccountManager._account, pw: pw });
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /// <summary>
    /// 手机注册
    /// </summary>
    /// <param name="mno"></param>
    /// <param name="again"></param>
    AccountManager.PhoneRegister = function (mno, again) {
        if (again === void 0) { again = false; }
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.PhoneRegisterCoroutine(mno, again);
    };
    AccountManager.PhoneRegisterCoroutine = function (mno, again) {
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("mno", mno, qin.StringConstants.Empty);
        data += AccountManager.addField("appid", AccountManager._appId);
        var url = AccountHttpUrl.phone_register;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    if (again) {
                        AccountManager.OnAgainMobileCode.dispatch();
                    }
                    else {
                        AccountManager.OnPhoneRegister.dispatch(mno);
                    }
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /// <summary>
    /// 手机注册验证
    /// </summary>
    /// <param name="mno"></param>
    /// <param name="vcode"></param>
    /// <param name="pw"></param>
    AccountManager.PhoneRegisterVerify = function (mno, vcode, pw) {
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.PhoneRegisterVerifyCoroutine(mno, vcode, pw);
    };
    AccountManager.PhoneRegisterVerifyCoroutine = function (mno, vcode, pw) {
        var md5pw = qin.Crypt.hex_md5(pw);
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("appid", AccountManager._appId, qin.StringConstants.Empty);
        data += AccountManager.addField("mno", mno);
        data += AccountManager.addField("vcode", vcode);
        data += AccountManager.addField("pw", md5pw);
        data += AccountManager.addField("did", AccountManager._deviceId);
        data += AccountManager.addField("channel", AccountManager._channel);
        var url = AccountHttpUrl.phone_register_verify;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    AccountManager.parseData(mno, table, md5pw);
                    AccountManager.OnRegisterSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid, pw: pw });
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /// <summary>
    /// 绑定/解绑手机(账号系统的绑定手机，如原来的账号系统并不是手机号，需要绑定手机号) 没用到
    /// </summary>
    /// <param name="mno"></param>
    AccountManager.PhoneBind = function (mno, again) {
        if (again === void 0) { again = false; }
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.PhoneBindCoroutine(AccountManager._account, mno, again);
    };
    /**
     * 没用到
     */
    AccountManager.PhoneBindCoroutine = function (account, mno, again) {
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("account", account, qin.StringConstants.Empty);
        data += AccountManager.addField("mno", mno);
        data += AccountManager.addField("appid", AccountManager._appId);
        var url = AccountHttpUrl.phone_bind;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    if (again) {
                        AccountManager.OnAgainMobileCode.dispatch();
                    }
                    else {
                        //isBindPhone == false 为绑定手机，反之为解绑手机
                        AccountManager.OnPhoneBind.dispatch({ mno: mno, isBindPhone: AccountManager.isBindPhone == false });
                    }
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /// <summary>
    /// 绑定手机验证 没用到
    /// </summary>
    /// <param name="vcode"></param>
    /// <param name="pw"></param>
    AccountManager.PhoneBindVerify = function (vcode, pw) {
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.PhoneBindVerifyCoroutine(vcode, AccountManager._account, pw);
    };
    /**
     * 没用到
     */
    AccountManager.PhoneBindVerifyCoroutine = function (vcode, account, pw) {
        var md5pw = qin.Crypt.hex_md5(pw);
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("vcode", vcode, qin.StringConstants.Empty);
        data += AccountManager.addField("account", account);
        data += AccountManager.addField("pw", md5pw);
        data += AccountManager.addField("appid", AccountManager._appId);
        var url = AccountHttpUrl.phone_bind_verify;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    AccountManager._mno = table["mno"];
                    AccountManager.OnPhoneBindVerify.dispatch(true);
                    AccountUtil.ShowPhoneBindFloatTips(true);
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /// <summary>
    /// 解绑手机验证 没用到
    /// </summary>
    /// <param name="vcode"></param>
    AccountManager.PhoneUnbindVerify = function (vcode) {
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.PhoneUnbindVerifyCoroutine(vcode, AccountManager._account);
    };
    /**
     * 没用到
     */
    AccountManager.PhoneUnbindVerifyCoroutine = function (vcode, account) {
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("vcode", vcode, qin.StringConstants.Empty);
        data += AccountManager.addField("account", account);
        data += AccountManager.addField("appid", AccountManager._appId);
        var url = AccountHttpUrl.phone_unbind_verify;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    AccountManager._mno = null;
                    AccountManager.OnPhoneBindVerify.dispatch();
                    AccountUtil.ShowPhoneBindFloatTips(false);
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /// <summary>
    /// 修改密码 没用到
    /// </summary>
    /// <param name="pw">旧密码</param>
    /// <param name="pw2">新密码</param>
    AccountManager.ModifyPassword = function (oldpw, pw) {
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.ModifyPasswordCoroutine(AccountManager._account, oldpw, pw);
    };
    /**
     * 没用到
     */
    AccountManager.ModifyPasswordCoroutine = function (account, oldpw, pw) {
        var md5pw = qin.Crypt.hex_md5(pw);
        var md5oldpw = qin.Crypt.hex_md5(oldpw);
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("account", account, qin.StringConstants.Empty);
        data += AccountManager.addField("pw", md5oldpw);
        data += AccountManager.addField("pw2", md5pw);
        data += AccountManager.addField("appid", AccountManager._appId);
        var url = AccountHttpUrl.modify_password;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    AccountPlayerPrefs.InsertAccount(account, md5pw);
                    AccountManager.OnModifyPassword.dispatch();
                    AccountUtil.ShowModifyPwFloatTips();
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /// <summary>
    /// 手机找回密码
    /// </summary>
    /// <param name="account"></param>
    /// <param name="mno"></param>
    /// <param name="again"></param>
    AccountManager.PhoneFindPassword = function (account, mno, again) {
        if (again === void 0) { again = false; }
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.PhoneFindPasswordCoroutine(account, mno, again);
    };
    AccountManager.PhoneFindPasswordCoroutine = function (account, mno, again) {
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("account", account, qin.StringConstants.Empty);
        data += AccountManager.addField("mno", mno);
        data += AccountManager.addField("appid", AccountManager._appId);
        var url = AccountHttpUrl.phone_find_password;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    if (again) {
                        AccountManager.OnAgainMobileCode.dispatch();
                    }
                    else {
                        AccountManager.OnPhoneFindPassword.dispatch({ account: account, mno: mno });
                    }
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /// <summary>
    /// 手机修改密码
    /// </summary>
    /// <param name="vcode"></param>
    /// <param name="account"></param>
    /// <param name="pw"></param>
    AccountManager.PhoneModifyPassword = function (vcode, account, pw) {
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.PhoneModifyPasswordCoroutine(vcode, account, pw);
    };
    AccountManager.PhoneModifyPasswordCoroutine = function (vcode, account, pw) {
        var md5pw = qin.Crypt.hex_md5(pw);
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("vcode", vcode, qin.StringConstants.Empty);
        data += AccountManager.addField("account", account);
        data += AccountManager.addField("pw", md5pw);
        data += AccountManager.addField("appid", AccountManager._appId);
        var url = AccountHttpUrl.phone_modify_password;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    AccountPlayerPrefs.InsertAccount(account, md5pw);
                    AccountManager.OnPhoneModifyPassword.dispatch();
                    AccountUtil.ShowModifyPwFloatTips();
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /**
     * 手机验证码登录
    */
    AccountManager.PhoneSmsLogin = function (mno) {
        AccountManager.OnLoadingStart.dispatch();
        AccountManager.PhoneSmsLoginCoroutine(mno);
    };
    AccountManager.PhoneSmsLoginCoroutine = function (mno) {
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("mno", mno, qin.StringConstants.Empty);
        data += AccountManager.addField("appid", AccountManager._appId);
        var url = AccountHttpUrl.phone_sms_login;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    AccountManager.OnPhoneSmsLogin.dispatch(mno);
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                }
            }
        }, null, data);
    };
    /**
     * 手机验证码登录验证
    */
    AccountManager.PhoneSmsLoginVerify = function (vcode, mno) {
        AccountManager.OnLoadingStart.dispatch();
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("mno", mno, qin.StringConstants.Empty);
        data += AccountManager.addField("vcode", vcode);
        data += AccountManager.addField("appid", AccountManager._appId);
        data += AccountManager.addField("did", AccountManager._deviceId);
        data += AccountManager.addField("channel", AccountManager._channel);
        var url = AccountHttpUrl.phone_sms_login_verify;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    var md5pw = table["app_token"];
                    AccountManager.parseData(mno, table, md5pw, AccountPwdType.token);
                    AccountManager.OnLoginSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid });
                }
                else {
                    AccountUtil.ShowCodeFloatTips(code, table["msg"]);
                    AccountManager.ShowLogin(false);
                }
            }
            else {
                AccountManager.ShowLogin(false);
            }
        }, function () {
            AccountManager.ShowLogin(false);
        }, data);
    };
    /**
     *token登录
    */
    AccountManager.TokenLogin = function (app_token, account) {
        AccountManager.OnLoadingStart.dispatch();
        var data = qin.StringConstants.Empty;
        data += AccountManager.addField("account", account, qin.StringConstants.Empty);
        data += AccountManager.addField("app_token", app_token);
        data += AccountManager.addField("appid", AccountManager._appId);
        data += AccountManager.addField("did", AccountManager._deviceId);
        data += AccountManager.addField("channel", AccountManager._channel);
        var url = AccountHttpUrl.phone_token_login;
        URLLoader.downloadContent(url, this, function (result) {
            AccountManager.OnLoadingFinish.dispatch();
            var table = AccountUtil.ResultToHashtable(result, url);
            if (table != null) {
                var code = table["code"];
                if (code == AccountCode.Success) {
                    var md5pw = data["app_token"];
                    AccountManager.parseData(account, table, md5pw, AccountPwdType.token);
                    AccountManager.OnLoginSuccess.dispatch({ token: AccountManager._token, uid: AccountManager._uid });
                }
                else {
                    AccountManager.ShowLogin(false);
                }
            }
            else {
                AccountManager.ShowLogin(false);
            }
        }, function () {
            AccountManager.ShowLogin(false);
        }, data);
    };
    AccountManager._startStr = "*******";
    //------------------------------------------------------------------
    // event
    //------------------------------------------------------------------
    AccountManager.OnLoadingStart = new qin.DelegateDispatcher();
    AccountManager.OnLoadingFinish = new qin.DelegateDispatcher();
    /// <summary>
    /// 选择页面
    /// </summary>
    AccountManager.OnSelectTab = new qin.DelegateDispatcher();
    /// <summary>
    /// 重新获取验证码
    /// </summary>
    AccountManager.OnAgainMobileCode = new qin.DelegateDispatcher();
    /// <summary>
    /// 登录成功
    /// </summary>
    AccountManager.OnLoginSuccess = new qin.DelegateDispatcher();
    /// <summary>
    /// 注册成功
    /// </summary>
    AccountManager.OnRegisterSuccess = new qin.DelegateDispatcher();
    /// <summary>
    /// 取消登录
    /// </summary>
    AccountManager.OnLoginCancel = new qin.DelegateDispatcher();
    /// <summary>
    /// 手机注册
    /// </summary>
    AccountManager.OnPhoneRegister = new qin.DelegateDispatcher();
    /// <summary>
    /// 绑定/解绑手机
    /// </summary>
    AccountManager.OnPhoneBind = new qin.DelegateDispatcher();
    /// <summary>
    /// 手机绑定/解绑验证成功
    /// </summary>
    AccountManager.OnPhoneBindVerify = new qin.DelegateDispatcher();
    /// <summary>
    /// 密码修改成功
    /// </summary>
    AccountManager.OnModifyPassword = new qin.DelegateDispatcher();
    /// <summary>
    /// 手机找回密码
    /// </summary>
    AccountManager.OnPhoneFindPassword = new qin.DelegateDispatcher();
    /// <summary>
    /// 手机修改密码成功
    /// </summary>
    AccountManager.OnPhoneModifyPassword = new qin.DelegateDispatcher();
    /// <summary>
    /// 手机验证码登录发送验证码成功
    /// </summary>
    AccountManager.OnPhoneSmsLogin = new qin.DelegateDispatcher();
    /// <summary>
    /// 账号没有密码广播
    /// </summary>
    AccountManager.OnNoPw = new qin.DelegateDispatcher();
    return AccountManager;
}());
__reflect(AccountManager.prototype, "AccountManager");
//# sourceMappingURL=AccountManager.js.map