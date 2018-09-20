var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <summary>
/// 帐号系统配置
/// </summary>
var AccountConfig = (function () {
    function AccountConfig() {
    }
    /// <summary>
    /// 输入字符最小限制
    /// </summary>
    AccountConfig.InputCharMin = 6;
    /// <summary>
    /// 输入字符最大限制
    /// </summary>
    AccountConfig.InputCharMax = 32;
    /// <summary>
    /// 手机号码最小长度
    /// </summary>
    AccountConfig.MobileNoMin = 11;
    /// <summary>
    /// 手机号码最大长度
    /// </summary>
    AccountConfig.MobileNoMax = 13;
    /// <summary>
    /// 短信验证码超时时间
    /// </summary>
    AccountConfig.MobileCodeTimeout = 600;
    return AccountConfig;
}());
__reflect(AccountConfig.prototype, "AccountConfig");
/// <summary>
/// 帐号系统状态码
/// </summary>
var AccountCode = (function () {
    function AccountCode() {
    }
    AccountCode.GetDescription = function (code) {
        if (qin.StringUtil.isNullOrEmpty(code)) {
            return "状态码为空";
        }
        switch (code) {
            case AccountCode.Success:
                return qin.StringConstants.Empty; //成功返回空
            case "-1"://系统
                return "帐号系统错误";
            case "-2":
                return "服务器维护";
            case "1001"://客户端
                return "参数错误";
            case "1002":
                return "帐号不存在";
            case "1003":
                return "帐号已存在";
            case "1004":
                return "帐号信息校验失败";
            case "1006":
                return "登录失败";
            case "1007":
                return "应用不存在";
            case "1008":
                return "签名验证失败";
            case "1009":
                return "帐号或密码错误";
            case "1010":
                return "短信验证码发送失败";
            case "1011":
                return "短信验证码验证失败";
            case "1012":
                return "手机号码未绑定";
            case "1013":
                return "手机号码已绑定";
            case "1018":
                return "帐号已禁用";
            case "1019":
                return "该手机号码发送次数超过当天限制";
            case "1020":
                return "该手机号码发送次数超过每小时限制";
            case "1021":
                return "短信发送次数过于频繁，请一分钟后再试";
            case "1022":
                return "手机账号不能绑定/解绑";
            case "1023":
                return "请求过于频繁，请稍后再试";
            case "2001"://服务器
                return "token验证失败";
            case "2002":
                return "应用不存在";
            case "2003":
                return "签名校验失败";
            case "2004":
                return "应用已禁用";
        }
        return qin.StringConstants.Empty;
    };
    AccountCode.Success = "0";
    AccountCode.NoPw = "1024";
    return AccountCode;
}());
__reflect(AccountCode.prototype, "AccountCode");
var AccountHttpUrl = (function () {
    function AccountHttpUrl() {
    }
    /// <summary>
    /// 正式地址
    /// </summary>
    AccountHttpUrl.API_URL = "http://api.istar9.com/oauth1/";
    /// <summary>
    /// 测试地址
    /// </summary>
    // private static readonly API_URL = "http://10.0.0.186:8002/oauth1/";
    //
    AccountHttpUrl.login = AccountHttpUrl.API_URL + "login";
    AccountHttpUrl.register = AccountHttpUrl.API_URL + "register";
    AccountHttpUrl.phone_register = AccountHttpUrl.API_URL + "phone_register2";
    AccountHttpUrl.phone_register_verify = AccountHttpUrl.API_URL + "phone_register_verify";
    AccountHttpUrl.phone_bind = AccountHttpUrl.API_URL + "phone_bind2";
    AccountHttpUrl.phone_bind_verify = AccountHttpUrl.API_URL + "phone_bind_verify";
    AccountHttpUrl.phone_unbind_verify = AccountHttpUrl.API_URL + "phone_unbind_verify";
    AccountHttpUrl.modify_password = AccountHttpUrl.API_URL + "modify_password";
    AccountHttpUrl.phone_find_password = AccountHttpUrl.API_URL + "phone_find_password2";
    AccountHttpUrl.phone_modify_password = AccountHttpUrl.API_URL + "phone_modify_password";
    AccountHttpUrl.sq_modify_password = AccountHttpUrl.API_URL + "sq_modify_password";
    AccountHttpUrl.sq_set = AccountHttpUrl.API_URL + "sq_set";
    AccountHttpUrl.phone_sms_login = AccountHttpUrl.API_URL + "sms_login2";
    AccountHttpUrl.phone_sms_login_verify = AccountHttpUrl.API_URL + "sms_login_verify";
    AccountHttpUrl.phone_token_login = AccountHttpUrl.API_URL + "token_login";
    return AccountHttpUrl;
}());
__reflect(AccountHttpUrl.prototype, "AccountHttpUrl");
/**
 * 登录类型密码
*/
var AccountPwdType = (function () {
    function AccountPwdType() {
    }
    /**
     * 密码登录
    */
    AccountPwdType.pw = "pw";
    /**
     * token登录
    */
    AccountPwdType.token = "token";
    return AccountPwdType;
}());
__reflect(AccountPwdType.prototype, "AccountPwdType");
//# sourceMappingURL=AccountEnum.js.map