var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AccountUtil = (function () {
    function AccountUtil() {
    }
    AccountUtil.ResultToHashtable = function (data, url) {
        try {
            var obj = JSON.parse(data);
            return obj;
        }
        catch (e) {
            qin.Console.logError("账号系统接收数据错误！" + url);
        }
        return null;
    };
    /// <summary>
    /// 错误码漂浮提示
    /// </summary>
    /// <param name="code"></param>
    AccountUtil.ShowCodeFloatTips = function (code, message) {
        var des = AccountCode.GetDescription(code);
        if (qin.StringUtil.isNullOrEmpty(des)) {
            if (!qin.StringUtil.isNullOrEmpty(message)) {
                try {
                    des = decodeURIComponent(message);
                }
                catch (e) {
                    qin.Console.logError("转义失败！" + message);
                }
            }
        }
        UIManager.showFloatTips(des);
    };
    /// <summary>
    /// 密码修改成功漂浮提示
    /// </summary>
    AccountUtil.ShowModifyPwFloatTips = function () {
        UIManager.showFloatTips("密码修改成功");
    };
    /// <summary>
    /// 绑定手机成功漂浮提示
    /// </summary>
    AccountUtil.ShowPhoneBindFloatTips = function (isBind) {
        if (isBind) {
            UIManager.showFloatTips("绑定手机成功");
        }
        else {
            UIManager.showFloatTips("解绑手机成功，为了您的帐号安全请尽快绑定手机");
        }
    };
    AccountUtil.VerifyRegisterAccount = function (text) {
        if (qin.RegexUtil.IsNumeric(text)) {
            UIManager.showFloatTips("帐号至少包含一个英文字母");
            return false;
        }
        return true;
    };
    AccountUtil.VerifyAccount = function (text) {
        if (qin.StringUtil.isNullOrEmpty(text)) {
            UIManager.showFloatTips("请输入帐号");
            return false;
        }
        if (text.length < AccountConfig.InputCharMin) {
            UIManager.showFloatTips(qin.StringUtil.format("帐号不能小于{0}个字符", AccountConfig.InputCharMin));
            return false;
        }
        else if (text.length > AccountConfig.InputCharMax) {
            UIManager.showFloatTips(qin.StringUtil.format("帐号不能大于{0}个字符", AccountConfig.InputCharMax));
            return false;
        }
        if (qin.RegexUtil.IsEnglishAndNumber(text) == false) {
            UIManager.showFloatTips("帐号只能使用英文和数字");
            return false;
        }
        return true;
    };
    AccountUtil.VerifyPassword = function (text) {
        if (qin.StringUtil.isNullOrEmpty(text)) {
            UIManager.showFloatTips("请输入密码");
            return false;
        }
        if (text.length < AccountConfig.InputCharMin) {
            UIManager.showFloatTips(qin.StringUtil.format("密码不能小于{0}个字符", AccountConfig.InputCharMin));
            return false;
        }
        else if (text.length > AccountConfig.InputCharMax) {
            UIManager.showFloatTips(qin.StringUtil.format("密码不能大于{0}个字符", AccountConfig.InputCharMax));
            return false;
        }
        if (qin.RegexUtil.IsEnglishAndNumber(text) == false) {
            UIManager.showFloatTips("密码只能使用英文和数字");
            return false;
        }
        return true;
    };
    /// <summary>
    /// 验证2次输入密码是否一致
    /// </summary>
    /// <param name="pw"></param>
    /// <param name="pw2"></param>
    /// <returns></returns>
    AccountUtil.VerifyDualPassword = function (pw, pw2) {
        if (pw != pw2) {
            UIManager.showFloatTips("两次输入的密码不匹配，请重新输入");
            return false;
        }
        return true;
    };
    /// <summary>
    /// 验证手机号码
    /// </summary>
    /// <param name="text"></param>
    /// <returns></returns>
    AccountUtil.VerifyMobileNo = function (text) {
        if (qin.StringUtil.isNullOrEmpty(text) || text.length < AccountConfig.MobileNoMin || text.length > AccountConfig.MobileNoMax || qin.RegexUtil.IsUInt(text) == false) {
            UIManager.showFloatTips("请输入手机号码");
            return false;
        }
        return true;
    };
    /// <summary>
    /// 验证短信验证码
    /// </summary>
    /// <param name="text"></param>
    /// <returns></returns>
    AccountUtil.VerifyMobileCode = function (text) {
        if (qin.StringUtil.isNullOrEmpty(text) || text.length > AccountConfig.InputCharMax || qin.RegexUtil.IsUInt(text) == false) {
            UIManager.showFloatTips("请输入短信验证码");
            return false;
        }
        return true;
    };
    AccountUtil.ToStringArray = function (content, separator) {
        if (separator === void 0) { separator = ','; }
        if (qin.StringUtil.isNullOrEmpty(content)) {
            return null;
        }
        return content.split(separator);
    };
    return AccountUtil;
}());
__reflect(AccountUtil.prototype, "AccountUtil");
//# sourceMappingURL=AccountUtil.js.map