var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChannelBase = (function () {
    function ChannelBase() {
    }
    /**
     * 登录
     */
    ChannelBase.prototype.Login = function (loginType, isAutoLogin) {
    };
    /**
     * 支付
     */
    ChannelBase.prototype.PaySend = function (payState, awardId, serverId, orderId, price, productName) {
    };
    /**
     * 分享
     */
    ChannelBase.prototype.share = function (type, title, message, inviteCode) {
    };
    /**
     * 选择图片
     */
    ChannelBase.prototype.imageSelect = function (size, quality) {
    };
    /**
     * 使用浏览器打开url
     */
    ChannelBase.prototype.openURL = function (url) {
        window.open(url, '_blank');
    };
    /**
     * 拷贝内容到粘贴板
     */
    ChannelBase.prototype.copyToPastboard = function (data) {
    };
    //------------------------------------------------------------------
    // sdk回调执行方法
    //------------------------------------------------------------------
    /**
     * 支付成功
     */
    ChannelBase.prototype.sdkPaySucceed = function (data) {
    };
    /**
     * 支付失败
     */
    ChannelBase.prototype.sdkPayFailed = function () {
    };
    /**
     * 检查有没有未完成的订单
     */
    ChannelBase.prototype.checkUnFinishedPayList = function () {
    };
    return ChannelBase;
}());
__reflect(ChannelBase.prototype, "ChannelBase");
//# sourceMappingURL=ChannelBase.js.map