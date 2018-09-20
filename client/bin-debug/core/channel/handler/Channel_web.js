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
/**
 * web版
 */
var Channel_web = (function (_super) {
    __extends(Channel_web, _super);
    function Channel_web() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isWxConfig = false;
        return _this;
    }
    Channel_web.prototype.setWxConfig = function (callback, debug) {
        if (debug === void 0) { debug = false; }
        if (window['wx']) {
            if (this._isWxConfig == false) {
                var dUrl = ProjectDefined.GetInstance().getWxTicketUrl() + '?url=' + encodeURIComponent(window.location.href);
                URLLoader.downloadContent(dUrl, this, function (data) {
                    var _this = this;
                    var obj = JSON.parse(data);
                    if (obj['errcode'] && obj['errcode'] != 0) {
                        UIManager.showFloatTips(obj['errmsg']);
                    }
                    else {
                        obj['debug'] = debug;
                        obj['jsApiList'] = ['chooseImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'onMenuShareTimeline', 'onMenuShareAppMessage'];
                        obj["nonceStr"] = obj["noncestr"];
                        delete obj["noncestr"];
                        window['wx'].config(obj);
                        window['wx'].ready(function () {
                            _this._isWxConfig = true;
                            callback();
                        });
                        window['wx'].error(function (res) {
                            var resStr = JSON.stringify(res);
                            UIManager.showFloatTips(resStr);
                        });
                    }
                }, null);
            }
            else {
                callback();
            }
        }
        else {
            AlertManager.showAlertByString('微信支付接口不存在');
        }
    };
    Channel_web.prototype.Login = function (loginType, isAutoLogin) {
        if (loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount) {
            this.accountLogin(isAutoLogin);
        }
        else if (loginType == ChannelLoginType.Weixin) {
            //微信登录
            this.weixinLogin();
        }
        else {
            UIManager.showFloatTips("登录类型错误");
            ChannelManager.OnLoginFailed.dispatch();
        }
    };
    Channel_web.prototype.accountLogin = function (isAutoLogin) {
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
    Channel_web.prototype.weixinLogin = function () {
        var token = WebConfig.wxRefreshToken;
        if (token) {
            ChannelManager.OnTokenLoginSucceed.dispatch(WebConfig.wxAuthorizeType + '###2###' + token);
        }
        else if (qin.System.isWeChat == false) {
            token = PrefsManager.getLoginToken();
            if (PrefsManager.getValue(PrefsManager.Login_LoginType) == ChannelLoginType.Weixin && token) {
                ChannelManager.OnTokenLoginSucceed.dispatch(WxAuthorizeType.Web + '###2###' + token);
            }
            else {
                //跳转到微信二维码登录
                var url = ProjectDefined.GetInstance().getWxQrconnectUrl();
                window.location.href = url + '?return_url=' + encodeURIComponent(window.location.href);
            }
        }
        else {
            AlertManager.showAlertByString('微信授权token为空');
        }
    };
    Channel_web.prototype.PaySend = function (payState, awardId, serverId, orderId, price, productName) {
        if (VersionManager.isServerTest && (ChannelManager.loginType == ChannelLoginType.Account || ChannelManager.loginType == ChannelLoginType.IntranetAccount)) {
            AwardManager.Exchange(awardId, 1, false); //直接兑换
        }
        else if (qin.System.isWeChat) {
            //微信里打开使用jsapi支付
            var openId = WebConfig.wxOpenId;
            if (openId) {
                ChannelUtil.wxJsapiPay(openId, serverId, price, productName, awardId);
            }
            else {
                AlertManager.showAlertByString('微信授权openid为空');
            }
        }
        else {
            ChannelUtil.iframeWebPay(serverId, orderId, price, productName, awardId);
        }
    };
    Channel_web.prototype.share = function (type, title, message, inviteCode) {
        var _this = this;
        if (qin.System.isWeChat) {
            this.setWxConfig(function () {
                var url = ProjectDefined.GetInstance().getShareWebUrl(GameSetting.AppId, inviteCode);
                var imgUrl = ProjectDefined.GetInstance().getWebAppRootUrl(GameSetting.AppId) + "/" + BundleManager.getAppIconPng();
                UIManager.showPanel(UIModuleName.ShareGamePromptPanel);
                window['wx'].onMenuShareTimeline({
                    title: title,
                    link: url,
                    imgUrl: imgUrl,
                    success: _this.onShareTimeLineSuccess,
                    fail: _this.onShareFail
                });
                window['wx'].onMenuShareAppMessage({
                    title: title,
                    desc: message,
                    link: url,
                    imgUrl: imgUrl,
                    success: _this.onShareMessageSuccess,
                    fail: _this.onShareFail
                });
            }, false);
        }
        else {
            UIManager.showFloatTips('当前打开方式不支持分享，请在微信里打开或使用App版本');
        }
    };
    Channel_web.prototype.onShareTimeLineSuccess = function () {
        ChannelManager.OnShareSucceed.dispatch(ChannelShareType.WxTimeLine);
        UIManager.closePanel(UIModuleName.ShareGamePromptPanel);
    };
    Channel_web.prototype.onShareMessageSuccess = function () {
        ChannelManager.OnShareSucceed.dispatch(ChannelShareType.WxMessage);
        UIManager.closePanel(UIModuleName.ShareGamePromptPanel);
    };
    Channel_web.prototype.onShareFail = function (res) {
        UIManager.closePanel(UIModuleName.ShareGamePromptPanel);
        UIManager.showFloatTips(JSON.stringify(res));
    };
    Channel_web.prototype.imageSelect = function (size, quality) {
        var _this = this;
        if (qin.System.isWeChat) {
            this.setWxConfig(function () {
                window['wx'].chooseImage({
                    count: 1,
                    success: function (res) {
                        _this.upload(res);
                    }
                });
            });
        }
        else {
            qin.WebImageSelect.browse(this, function (data) {
                ChannelManager.OnImageSelect.dispatch({ type: HeadUploadSystemType.web, data: data });
            }, function (msg) {
                AlertManager.showAlertByString(msg);
            });
        }
    };
    Channel_web.prototype.upload = function (res) {
        var target = this;
        window['wx'].uploadImage({
            localId: res.localIds[0],
            success: function (res) {
                target.downLoad(res.serverId);
            }
        });
    };
    Channel_web.prototype.downLoad = function (serverId) {
        var _this = this;
        window['wx'].downloadImage({
            serverId: serverId,
            success: function (res) {
                _this.getImgLocal(res.localId); // 返回图片下载后的本地ID
            }
        });
    };
    Channel_web.prototype.getImgLocal = function (localId) {
        window['wx'].getLocalImgData({
            localId: localId,
            success: function (res) {
                ChannelManager.OnImageSelect.dispatch({ type: HeadUploadSystemType.web, data: res.localData }); // localData是图片的base64数据，可以用img标签显示
            }
        });
    };
    Channel_web.prototype.copyToPastboard = function (data) {
        var input = document.createElement("input");
        input.value = data;
        document.body.appendChild(input);
        input.readOnly = true;
        input.select();
        input.setSelectionRange(0, input.value.length);
        document.execCommand('Copy');
        document.body.removeChild(input);
        UIManager.showFloatTips("邀请码复制成功");
    };
    return Channel_web;
}(ChannelBase));
__reflect(Channel_web.prototype, "Channel_web");
//# sourceMappingURL=Channel_web.js.map