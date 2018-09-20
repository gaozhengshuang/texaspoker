/**
 * 网页版(浏览器、微端、微信)专有配置，包括html、js、css里的
 */
class WebConfig
{
    /**
     * 资源URL
     */
    public static get resUrl(): string
    {
        return (window['web_config_resUrl'] ? window['web_config_resUrl'] : '') + (window['web_config_subPath'] ? window['web_config_subPath'] : '');
    }
    /**
     * default.res.json
     */
    public static get defaultResJson(): string
    {
        return window['web_config_defaultResJson'] ? window['web_config_defaultResJson'] : '';
    }
    /**
     * default.thm.json
     */
    public static get defaultThmJson(): string
    {
        return window['web_config_defaultThmJson'] ? window['web_config_defaultThmJson'] : '';
    }
    /**
     * 客户端版本号，微端用的
     */
    public static get clientVersion(): string
    {
        return window['web_config_clientVersion'] ? window['web_config_clientVersion'] : '';
    }
    /**
     * 服务器上的客户端版本号，微端用的
     */
    public static get serverVersion(): string
    {
        return window['web_config_serverVersion'] ? window['web_config_serverVersion'] : '';
    }
    /**
     * 安全开关
     */
    public static get isSafe(): boolean
    {
        return window['web_config_isSafe'] == true && game.RuntimeTypeName.getCurrentName() == game.RuntimeTypeName.Ios;
    }
    /**
     * 微信用户的openid，微信里打开有效
     */
    public static get wxOpenId():string
    {
        return window['web_config_wxOpenId'] ? window['web_config_wxOpenId'] : '';
    }
    /**
     * 微信用户的RefreshToken，微信里打开有效
     */
    public static get wxRefreshToken():string
    {
        return window['web_config_wxRefreshToken'] ? window['web_config_wxRefreshToken'] : '';
    }
    /**
     * 微信授权类型
     */
    public static get wxAuthorizeType():string
    {
        return window['web_config_wxAuthorizeType'] ? window['web_config_wxAuthorizeType'] : '';
    }
    /**
     * 是否是微信网页授权回来
     */
    public static get isWxWebAuthorize():boolean
    {
        return game.System.isWeb && WebConfig.wxAuthorizeType == WxAuthorizeType.Web && game.StringUtil.isNullOrEmpty(WebConfig.wxRefreshToken) == false;
    }
}