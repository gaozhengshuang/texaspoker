var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 运营平台（值要全小写和配置表对应,登录服务器、版本管理、充值列表用到）
 */
var OperatePlatform = (function () {
    function OperatePlatform() {
    }
    /**
     * 获取当前运营平台
     */
    OperatePlatform.getCurrent = function () {
        //todo 不支持条件编译，只能一个个写死
        return OperatePlatform.cn;
    };
    /**
     * 当前运营平台支持的语言列表
     */
    OperatePlatform.getLangs = function () {
        switch (OperatePlatform.getCurrent()) {
            case OperatePlatform.na:
            case OperatePlatform.sea:
                return ['en', 'zh-cn'];
            case OperatePlatform.hmt:
                return ['zh-tw', 'zh-cn', 'en'];
        }
        return ['zh-cn'];
    };
    /**
     * 中国
     */
    OperatePlatform.cn = 'cn';
    /**
     * 港澳台
     */
    OperatePlatform.hmt = 'hmt';
    /**
     * 北美
     */
    OperatePlatform.na = 'na';
    /**
     * 东南亚
     */
    OperatePlatform.sea = 'sea';
    return OperatePlatform;
}());
__reflect(OperatePlatform.prototype, "OperatePlatform");
/**
 * 渠道类型(唯一的)
 */
var ChannelType = (function () {
    function ChannelType() {
    }
    /**
     * 游客渠道标识，所有平台的游客都是这个标识
     */
    ChannelType.guest = "guest";
    /**
     * 沁游
     */
    ChannelType.qin = "qin";
    return ChannelType;
}());
__reflect(ChannelType.prototype, "ChannelType");
/**
 * 渠道登录类型
 */
var ChannelLoginType = (function () {
    function ChannelLoginType() {
    }
    ChannelLoginType.IsViewAccount = function (loginType) {
        switch (loginType) {
            case ChannelLoginType.Qin:
            case ChannelLoginType.Guest:
            case ChannelLoginType.Account:
            case ChannelLoginType.IntranetGuest:
            case ChannelLoginType.IntranetAccount:
                return true;
        }
        return false;
    };
    /**
     * 获取登录类型的token有效期(秒)
     */
    ChannelLoginType.getTokenExpire = function (loginType) {
        if (loginType == ChannelLoginType.Weixin) {
            return 3600 * 24 * 30; //30天
        }
        return 0;
    };
    /**
     * 获取渠道登录列表
     */
    ChannelLoginType.GetChannelLoginList = function (op, channelType, isTest, isSafe) {
        var list = [];
        if (true || qin.System.isLocalhost) {
            if (qin.System.isMicro || qin.System.isWeChat || qin.System.isLocalhost == false) {
                list.push(ChannelLoginType.Weixin);
            }
            list.push(ChannelLoginType.Qin);
            list.push(ChannelLoginType.Account);
            list.push(ChannelLoginType.Guest);
            list.push(ChannelLoginType.IntranetAccount);
            list.push(ChannelLoginType.IntranetGuest);
            if (qin.System.isWeb) {
                //debug的web版有token登录调试用
                list.push(ChannelLoginType.Normal);
            }
        }
        else {
            if (qin.System.isMicro) {
                //安装包
                if (isTest == false || isSafe == false) {
                    list.push(ChannelLoginType.Weixin);
                }
                list.push(ChannelLoginType.Qin);
            }
            else {
                //非安装包
                list.push(ChannelLoginType.Weixin);
                list.push(ChannelLoginType.Qin);
            }
        }
        if (list.length <= 0) {
            qin.Console.logError("登录类型列表长度不可能为0");
        }
        return list;
    };
    /**
     * 沁游互动登录
     */
    ChannelLoginType.Qin = "qin";
    /**
     * 游客
     */
    ChannelLoginType.Guest = "guest";
    /**
     * 内网游客登录
     */
    ChannelLoginType.IntranetGuest = "intranetGuest";
    /**
     *  内网账号登录
     */
    ChannelLoginType.IntranetAccount = "intranetAccount";
    /**
     * 微信登录
     */
    ChannelLoginType.Weixin = "weixin";
    /**
     * 外网游戏账号登录
     */
    ChannelLoginType.Account = "account";
    /**
     * 客户端标识的渠道登录,Token登录
     */
    ChannelLoginType.Normal = "";
    return ChannelLoginType;
}());
__reflect(ChannelLoginType.prototype, "ChannelLoginType");
/**
 * 分享类型
 */
var ChannelShareType = (function () {
    function ChannelShareType() {
    }
    ChannelShareType.WxTimeLine = "WxTimeLine";
    ChannelShareType.WxMessage = "WxMessage";
    ChannelShareType.QQZone = "QQZone";
    ChannelShareType.QQMessage = "QQMessage";
    return ChannelShareType;
}());
__reflect(ChannelShareType.prototype, "ChannelShareType");
//# sourceMappingURL=ChannelEnum.js.map