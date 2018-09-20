var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 网页版(浏览器、微端、微信)专有配置，包括html、js、css里的
 */
var WebConfig = (function () {
    function WebConfig() {
    }
    Object.defineProperty(WebConfig, "resUrl", {
        /**
         * 资源URL
         */
        get: function () {
            return (window['web_config_resUrl'] ? window['web_config_resUrl'] : '') + (window['web_config_subPath'] ? window['web_config_subPath'] : '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "defaultResJson", {
        /**
         * default.res.json
         */
        get: function () {
            return window['web_config_defaultResJson'] ? window['web_config_defaultResJson'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "defaultThmJson", {
        /**
         * default.thm.json
         */
        get: function () {
            return window['web_config_defaultThmJson'] ? window['web_config_defaultThmJson'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "clientVersion", {
        /**
         * 客户端版本号，微端用的
         */
        get: function () {
            return window['web_config_clientVersion'] ? window['web_config_clientVersion'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "serverVersion", {
        /**
         * 服务器上的客户端版本号，微端用的
         */
        get: function () {
            return window['web_config_serverVersion'] ? window['web_config_serverVersion'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "isSafe", {
        /**
         * 安全开关
         */
        get: function () {
            return window['web_config_isSafe'] == true && qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "wxOpenId", {
        /**
         * 微信用户的openid，微信里打开有效
         */
        get: function () {
            return window['web_config_wxOpenId'] ? window['web_config_wxOpenId'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "wxRefreshToken", {
        /**
         * 微信用户的RefreshToken，微信里打开有效
         */
        get: function () {
            return window['web_config_wxRefreshToken'] ? window['web_config_wxRefreshToken'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "wxAuthorizeType", {
        /**
         * 微信授权类型
         */
        get: function () {
            return window['web_config_wxAuthorizeType'] ? window['web_config_wxAuthorizeType'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebConfig, "isWxWebAuthorize", {
        /**
         * 是否是微信网页授权回来
         */
        get: function () {
            return qin.System.isWeb && WebConfig.wxAuthorizeType == WxAuthorizeType.Web && qin.StringUtil.isNullOrEmpty(WebConfig.wxRefreshToken) == false;
        },
        enumerable: true,
        configurable: true
    });
    return WebConfig;
}());
__reflect(WebConfig.prototype, "WebConfig");
//# sourceMappingURL=WebConfig.js.map