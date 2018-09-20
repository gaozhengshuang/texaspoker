var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var URLOption = (function () {
    function URLOption() {
    }
    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------
    URLOption.getString = function (key) {
        return egret.getOption(key);
    };
    URLOption.getBoolean = function (key) {
        return qin.StringUtil.toBoolean(egret.getOption(key));
    };
    URLOption.getNumber = function (key) {
        return parseFloat(egret.getOption(key));
    };
    /**
     * 应用ID
     */
    URLOption.AppId = 'appid';
    /**
     * 渠道标识
     */
    URLOption.Channel = 'channel';
    /**
     * 是否连接测试服
     */
    URLOption.ServerTest = 'server_test';
    /**
     * 调试登录类型
     */
    URLOption.DebugLoginType = 'debug_logintype';
    /**
     * 调试登录的token
     */
    URLOption.DebugToken = 'debug_token';
    /**
     * 数字的包id（用于区分这个包是谁的）
     */
    URLOption.Bid = 'bid';
    /**
     * 是否输出日志
     */
    URLOption.Log = 'log';
    /**
     * 邀请码
     */
    URLOption.InviteCode = 'invite_code';
    /**
     *
     */
    URLOption.State = 'state';
    return URLOption;
}());
__reflect(URLOption.prototype, "URLOption");
//# sourceMappingURL=URLOption.js.map