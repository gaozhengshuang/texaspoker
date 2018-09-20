var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 微信头像处理
 */
var WxHeadHandler = (function () {
    function WxHeadHandler() {
    }
    WxHeadHandler.prototype.tryUpLoadHead = function () {
        if (qin.StringUtil.isNullOrEmpty(this.headUrl) == false) {
            this.upLoadHead();
        }
    };
    WxHeadHandler.prototype.upLoadHead = function () {
        RES.getResByUrl(this.headUrl, function (data, url) {
            var img = data;
            if (img instanceof egret.Texture) {
                var headData = qin.StringConstants.Empty;
                try {
                    headData = img.toDataURL("image/jpeg");
                    if (qin.StringUtil.isNullOrEmpty(headData)) {
                        headData = img.toDataURL("image/png");
                    }
                    if (!headData) {
                        qin.Console.log("微信头像转base64失败！");
                    }
                }
                catch (e) {
                    qin.Console.log("微信头像转base64出错！");
                }
                if (headData) {
                    UserManager.onWxHeadLoadCompleteEvent.dispatch(headData);
                }
            }
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    WxHeadHandler.prototype.clear = function () {
        this.headUrl = undefined;
    };
    return WxHeadHandler;
}());
__reflect(WxHeadHandler.prototype, "WxHeadHandler");
//# sourceMappingURL=WxHeadHandler.js.map