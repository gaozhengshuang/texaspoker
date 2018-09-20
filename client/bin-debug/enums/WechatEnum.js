var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 微信交易类型
 */
var WxTradeType = (function () {
    function WxTradeType() {
    }
    WxTradeType.JSAPI = 'JSAPI';
    WxTradeType.NATIVE = 'NATIVE';
    WxTradeType.MWEB = 'MWEB';
    return WxTradeType;
}());
__reflect(WxTradeType.prototype, "WxTradeType");
/**
 * 微信授权类型
 */
var WxAuthorizeType = (function () {
    function WxAuthorizeType() {
    }
    /**
     * 应用
     */
    WxAuthorizeType.App = 'app';
    /**
     * 公众号
     */
    WxAuthorizeType.Public = 'public';
    /**
     * 网站
     */
    WxAuthorizeType.Web = 'web';
    return WxAuthorizeType;
}());
__reflect(WxAuthorizeType.prototype, "WxAuthorizeType");
//# sourceMappingURL=WechatEnum.js.map