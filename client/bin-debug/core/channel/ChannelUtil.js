var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChannelUtil = (function () {
    function ChannelUtil() {
    }
    /**
     * 订单是否是非法的
     */
    ChannelUtil.IsOrderIlleg = function (orderId) {
        if (qin.StringUtil.isNullOrEmpty(orderId)) {
            return true;
        }
        var split = orderId.split('-');
        return split.length != ChannelUtil.OrderLength;
    };
    /**
     * 生成订单
     * [账号ID]-[角色ID]-[角色所在服务器ID]-[商品ID(如果没有传0)]-[是否是测试，1是测试，0是正式]-[商品数量，默认1]
     */
    ChannelUtil.GenerateOrder = function (productId, isTest) {
        var t = isTest ? "1" : "0";
        var timeStr = TimeManager.GetServerUtcTimestamp().toString();
        var result = LoginManager.loginInfo.userid + "-" + UserManager.userInfo.roleId + "-" + UserManager.serverInfo.id + "-" + productId + "-" + t + "-" + timeStr.substring(4);
        if (result.length > 32) {
            result = result.substring(0, 32); //订单号不超过32个字符
        }
        return result;
    };
    /**
     * 获取渠道类型+"_"+登录类型的完整标识
     */
    ChannelUtil.GetLoginChannel = function (channel, loginType) {
        if (qin.StringUtil.isNullOrEmpty(loginType)) {
            return channel;
        }
        else {
            return qin.StringUtil.format("{0}_{1}", channel, loginType);
        }
    };
    /**
     * 执行网页支付
     */
    ChannelUtil.openWebPay = function (serverId, orderId, price, productName, awardId) {
        var url = ChannelUtil.getWebPayUrl(serverId, orderId, price, productName, awardId);
        ChannelManager.openURL(url);
    };
    ChannelUtil.iframeWebPay = function (serverId, orderId, price, productName, awardId) {
        qin.WebView.getInstance().width = GameManager.stage.stageWidth;
        qin.WebView.getInstance().height = GameManager.stage.stageHeight;
        qin.WebView.getInstance().backgroundColor = '#ffffff';
        qin.WebView.getInstance().closeButton = true;
        qin.WebView.getInstance().src = ChannelUtil.getWebPayUrl(serverId, orderId, price, productName, awardId);
        GameManager.stage.addChild(qin.WebView.getInstance());
        UIManager.pushResizeDom(qin.WebView.getInstance(), 0, 0);
    };
    ChannelUtil.getWebPayUrl = function (serverId, orderId, price, productName, awardId) {
        var url = ProjectDefined.GetInstance().getPayIndexUrl();
        var appId = GameSetting.AppId;
        var platform = qin.RuntimeTypeName.getCurrentName();
        var roleId = UserManager.userInfo.roleId;
        var roleName = encodeURIComponent(UserManager.userInfo.name);
        var appName = encodeURIComponent(ChannelManager.appName);
        productName = encodeURIComponent(productName);
        var bundleId = encodeURIComponent(ChannelManager.bundleId); //这个bid要传的是安装包的bundleId,不是映射给游戏服的数字包ID
        var bagId = BundleManager.getBid(); //数字包ID
        var test = VersionManager.isServerTest ? 1 : 0;
        var op = OperatePlatform.getCurrent();
        url = url + '?serverId=' + serverId + '&roleId=' + roleId + '&price=' + price +
            '&appid=' + appId + '&platform=' + platform + '&bagid=' + bagId + '&bid=' +
            bundleId + '&test=' + test + '&payDes=' + productName + '&roleName=' + roleName + '&appName=' + appName + '&awardid=' + awardId + '&op=' + op;
        return url;
    };
    /**
     * 微信jsapi支付
     */
    ChannelUtil.wxJsapiPay = function (openId, serverId, price, productName, awardId) {
        if (window['WeixinJSBridge']) {
            //微信公众号支付
            ChannelUtil.wxUnifiedOrder(function (data) {
                window['WeixinJSBridge'].invoke('getBrandWCPayRequest', {
                    appId: data.appId,
                    timeStamp: data.timeStamp + '',
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign
                });
            }, this, openId, serverId, price, productName, awardId, WxTradeType.JSAPI);
        }
        else {
            UIManager.showFloatTips("没有找到微信支付接口");
        }
    };
    /**
     * 微信统一下单
     */
    ChannelUtil.wxUnifiedOrder = function (func, thisObject, openId, serverId, price, productName, awardId, tradeType) {
        if (tradeType === void 0) { tradeType = ''; }
        var appId = GameSetting.AppId;
        var roleId = UserManager.userInfo.roleId;
        var uourl = ProjectDefined.GetInstance().getWxpayUnifiedOrderUrl();
        var bagId = BundleManager.getBid();
        var test = VersionManager.isServerTest ? 1 : 0;
        var op = OperatePlatform.getCurrent();
        productName = encodeURIComponent(productName);
        uourl += '?appid=' + appId + '&openId=' + openId + '&serverId=' + serverId + '&roleId=' + roleId + '&price=' + price +
            '&bagid=' + bagId + '&test=' + test + '&payDes=' + productName + '&awardid=' + awardId + '&op=' + op + '&tradeType=' + tradeType;
        URLLoader.downloadContent(uourl, this, function (data) {
            var obj;
            try {
                obj = JSON.parse(data);
            }
            catch (exception) { }
            if (obj) {
                if (obj['return_code']) {
                    AlertManager.showAlertByString(obj['return_msg']);
                }
                else {
                    qin.FuncUtil.invoke(func, thisObject, obj);
                }
            }
            else {
                AlertManager.showAlertByString('请求支付数据返回错误');
            }
        }, function (event) {
            AlertManager.showAlertByString('请求支付失败，请检查网络是否正常');
        });
    };
    ChannelUtil.OrderLength = 6; //订单截取长度
    return ChannelUtil;
}());
__reflect(ChannelUtil.prototype, "ChannelUtil");
//# sourceMappingURL=ChannelUtil.js.map