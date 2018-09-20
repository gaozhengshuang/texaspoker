var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Channel_ios = (function (_super) {
    __extends(Channel_ios, _super);
    function Channel_ios() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Channel_ios.prototype.Login = function (loginType, isAutoLogin) {
        if (loginType == ChannelLoginType.Weixin) {
            //微信登录
            if (isAutoLogin) {
                var token = PrefsManager.getLoginToken();
                if (token) {
                    ChannelManager.OnTokenLoginSucceed.dispatch(WxAuthorizeType.App + '###2###' + token);
                    return;
                }
            }
            qin.ExternalInterface.call(ExtFuncName.Login, loginType);
        }
        else if (loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount) {
            this.accountLogin(isAutoLogin);
        }
    };
    Channel_ios.prototype.accountLogin = function (isAutoLogin) {
        var account = PrefsManager.getValue(PrefsManager.Login_Account);
        var password = PrefsManager.getValue(PrefsManager.Login_Password);
        if (isAutoLogin && account && password) {
            ChannelManager.DispatchAccountLoginSucceed(account, password);
        }
        else {
            if (!UIManager.isShowPanel(UIModuleName.LoginLocalPanel)) {
                UIManager.showPanel(UIModuleName.LoginLocalPanel);
            }
        }
    };
    Channel_ios.prototype.PaySend = function (payState, awardId, serverId, orderId, price, productName) {
        var bagId;
        var data;
        if (payState == PayState.Normal || VersionManager.isSafe) {
            UIManager.showPanel(UIModuleName.PayMaskPanel);
            bagId = BundleManager.getBid(); //数字包ID
            data = { "awardId": awardId, "passData": { "orderId": orderId, "bagId": bagId }, "price": price, "name": productName };
            qin.ExternalInterface.call(ExtFuncName.Pay, JSON.stringify(data));
        }
        else if (payState == PayState.Mixed) {
            bagId = BundleManager.getBid(); //数字包ID
            ChannelManager.OnPayModelSelectEvent.addListener(this.onSelectPayModelHandler, this);
            data = { "awardId": awardId, "passData": { "orderId": orderId, "bagId": bagId }, "price": price, "name": productName };
            UIManager.showPanel(UIModuleName.PayModePanel, data);
        }
        else if (payState == PayState.Third) {
            ChannelUtil.openWebPay(serverId, orderId, price, productName, awardId);
        }
        else {
            AlertManager.showAlertByString('支付状态错误');
        }
    };
    Channel_ios.prototype.onSelectPayModelHandler = function (data) {
        this.PaySend(data.payState, data.awardId, UserManager.serverInfo.id, data.passData.orderId, data.price, data.name);
        ChannelManager.OnPayModelSelectEvent.removeListener(this.onSelectPayModelHandler, this);
    };
    Channel_ios.prototype.share = function (type, title, message, inviteCode) {
        var data = {};
        data['type'] = type;
        data['title'] = title;
        data['message'] = message;
        data['url'] = ProjectDefined.GetInstance().getShareWebUrl(GameSetting.AppId, inviteCode);
        qin.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
    };
    /**
     * 检查支付订单
     */
    Channel_ios.prototype.checkUnFinishedPayList = function () {
        qin.ExternalInterface.call(ExtFuncName.CheckUnFinishedPayList, qin.StringConstants.Empty);
    };
    /// <summary>
    /// 支付成功（sdk -> unity）
    /// </summary>
    /// <param name="data"></param>
    Channel_ios.prototype.sdkPaySucceed = function (data) {
        UIManager.closePanel(UIModuleName.PayModePanel);
        //购买成功后，通知服务器
        //通过post发送数据给服务器
        if (data) {
            var awardId = this.ParseAwardId(data.productId);
            var def = ShopDefined.GetInstance().getDefinitionByAwardId(awardId);
            if (def != null) {
                this.PostDataToServer(data.passData, data.receipt, awardId);
            }
            else {
                UIManager.closePanel(UIModuleName.PayMaskPanel);
            }
        }
        else {
            UIManager.closePanel(UIModuleName.PayMaskPanel);
        }
    };
    /// <summary>
    /// 将商品名转化为product id
    /// </summary>
    /// <param name="productId"></param>
    /// <returns></returns>
    Channel_ios.prototype.ParseAwardId = function (productId) {
        var reg = new RegExp(/\d+$/);
        var result = productId.match(reg);
        if (result && result.length > 0) {
            return parseInt(result[0]);
        }
        return 0;
    };
    /// <summary>
    /// 发送服务器给数据
    /// receipt
    //  orderid 订单号
    //fee 金额
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    Channel_ios.prototype.PostDataToServer = function (passData, receipt, payId) {
        var _this = this;
        var passDataObj;
        try {
            passDataObj = JSON.parse(passData);
        }
        catch (e) {
            qin.Console.log("苹果支付转换透传数据失败！");
        }
        var orderId;
        var bagId;
        if (!passDataObj) {
            orderId = ChannelUtil.GenerateOrder(payId, VersionManager.isServerTest);
            bagId = BundleManager.getBid();
        }
        else {
            orderId = passDataObj.orderId;
            bagId = passDataObj.bagId;
        }
        if (ChannelUtil.IsOrderIlleg(orderId)) {
            orderId = ChannelUtil.GenerateOrder(payId, VersionManager.isServerTest);
        }
        var params = "orderid=" + orderId + "&receipt=" + receipt + '&bagid=' + bagId;
        var path = ProjectDefined.GetInstance().getPayCallbackUrl(VersionManager.isServerTest);
        URLLoader.downloadContent(path, this, function (data) {
            if (data != "21005") {
                if (data != "0") {
                    var message = (data == '-1') ? '非法支付' : '支付失败';
                    qin.Console.log("服务器验证支付失败" + data);
                    AlertManager.showAlert(message, null, null, null, null, data);
                }
                else {
                    qin.Console.log("服务器验证支付成功" + orderId);
                    qin.ExternalInterface.call(ExtFuncName.DeleteOrder, receipt);
                }
            }
            qin.Tick.AddTimeoutInvoke(function () {
                UIManager.closePanel(UIModuleName.PayMaskPanel);
            }, 1000, _this);
        }, function (data) {
            qin.Console.log("服务器验证支付失败" + orderId);
            UIManager.closePanel(UIModuleName.PayMaskPanel);
        }, params, 1);
    };
    /**
     * 选择图片
     */
    Channel_ios.prototype.imageSelect = function (size, quality) {
        var obj = { size: size, quality: quality };
        qin.ExternalInterface.call(ExtFuncName.ImageSelect, JSON.stringify(obj));
    };
    Channel_ios.prototype.openURL = function (url) {
        qin.ExternalInterface.call(ExtFuncName.OpenURL, url);
    };
    Channel_ios.prototype.copyToPastboard = function (data) {
        qin.ExternalInterface.call(ExtFuncName.CopyToPastboard, data);
    };
    return Channel_ios;
}(ChannelBase));
__reflect(Channel_ios.prototype, "Channel_ios");
//# sourceMappingURL=Channel_ios.js.map