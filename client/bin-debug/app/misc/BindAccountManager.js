var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <summary>
/// 绑定帐号系统处理
/// </summary>
var BindAccountManager = (function () {
    function BindAccountManager() {
    }
    Object.defineProperty(BindAccountManager, "bindedList", {
        /**
         * 绑定的渠道标识列表
         */
        get: function () {
            return BindAccountManager._bindedList;
        },
        enumerable: true,
        configurable: true
    });
    BindAccountManager.clear = function () {
        if (BindAccountManager._bindedList) {
            BindAccountManager._bindedList.length = 0;
        }
    };
    /**
     * 获取绑定的渠道列表
     */
    BindAccountManager.reqGetList = function () {
        var callBack = function (result) {
            BindAccountManager._bindedList.length = 0;
            if (result.data && result.data.Array) {
                BindAccountManager._bindedList = result.data.Array;
            }
            BindAccountManager.bindListEvent.dispatch();
        };
        SocketManager.call(Command.Bind_GetList_3705, null, callBack, null, this);
    };
    BindAccountManager.reqBind = function (token, logintype) {
        var channel = ChannelUtil.GetLoginChannel(ChannelManager.channelType, logintype);
        var callBack = function (result) {
            var info = new BindAccountInfo();
            info.channel = channel;
            info.time = TimeManager.GetServerUtcTimestamp();
            BindAccountManager._bindedList.push(info);
            switch (logintype) {
                case ChannelLoginType.Qin:
                    AlertManager.showAlert("您的手机账号绑定成功，请牢记您的账号和登录密码，如有遗忘，可通过“忘记密码”找回。");
                    break;
                case ChannelLoginType.Weixin:
                    AlertManager.showAlert("绑定微信成功，可用绑定的微信登录！");
                    break;
            }
            BindAccountManager.bindSuccessEvent.dispatch(logintype);
        };
        SocketManager.callAsync(Command.Bind_Account_3597, { "Token": token, "Channel": channel }, callBack, null, this);
    };
    /**
     * 获取账号是否绑定某一渠道
     */
    BindAccountManager.getIsBinding = function (loginType) {
        var channel = ChannelUtil.GetLoginChannel(ChannelManager.channelType, loginType);
        for (var _i = 0, _a = BindAccountManager._bindedList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.channel == channel) {
                return true;
            }
        }
        return false;
    };
    //--------------沁游内置账号绑定-------------
    BindAccountManager.startBindQin = function (prevPanelName) {
        AccountManager.Initialize(GameSetting.AppId, ChannelManager.channelType, ChannelManager.deviceId, ProjectDefined.GetInstance().getValue(ProjectDefined.usePhone));
        BindAccountManager.RemoveQinEvents();
        AccountManager.OnLoginCancel.addListener(BindAccountManager.OnQinLoginCancel, this);
        AccountManager.OnLoginSuccess.addListener(BindAccountManager.OnQinLoginSuccess, this);
        UIManager.showPanel(UIModuleName.BindPhoneAccountPanel, { prevPanelName: prevPanelName });
    };
    BindAccountManager.RemoveQinEvents = function () {
        AccountManager.OnLoginCancel.removeListener(BindAccountManager.OnQinLoginCancel, this);
        AccountManager.OnLoginSuccess.removeListener(BindAccountManager.OnQinLoginSuccess, this);
    };
    BindAccountManager.OnQinLoginSuccess = function (data) {
        BindAccountManager.RemoveQinEvents();
        BindAccountManager.reqBind(data.token, ChannelLoginType.Qin);
    };
    BindAccountManager.OnQinLoginCancel = function () {
        BindAccountManager.RemoveQinEvents();
    };
    BindAccountManager.IsHaveChannelQin = function () {
        var channelList = ChannelLoginType.GetChannelLoginList(OperatePlatform.getCurrent(), ChannelManager.channelType, VersionManager.isServerTest, VersionManager.isSafe);
        if (channelList == null || channelList.length <= 0) {
            return false;
        }
        else if (channelList.indexOf(ChannelLoginType.Qin) != -1) {
            return true;
        }
        return false;
    };
    //--------------------weix绑定----------------------------
    /**
    * 尝试绑定微信
    */
    BindAccountManager.tryBindWx = function () {
        if (qin.System.isMicro) {
            if (ChannelManager.hasWeixin == false) {
                AlertManager.showAlert("您未安装微信，绑定失败。");
            }
            else {
                ChannelManager.OnTokenLoginSucceed.addListener(BindAccountManager.OnTokenLoginSucceed, this);
                ChannelManager.OnLoginFailed.addListener(BindAccountManager.onLoginFaildHandler, this);
                ChannelManager.login(ChannelLoginType.Weixin);
            }
        }
        else {
            var token = WebConfig.wxRefreshToken;
            if (token) {
                token = WebConfig.wxAuthorizeType + '###2###' + token;
                BindAccountManager.reqBind(token, ChannelLoginType.Weixin);
            }
            else {
                AlertManager.showAlert("token不能为空，绑定失败!");
            }
        }
    };
    /**
     * 微信登录回来
     */
    BindAccountManager.OnTokenLoginSucceed = function (token) {
        ChannelManager.OnTokenLoginSucceed.removeListener(BindAccountManager.OnTokenLoginSucceed, this);
        ChannelManager.OnLoginFailed.removeListener(BindAccountManager.onLoginFaildHandler, this);
        if (token) {
            BindAccountManager.reqBind(token, ChannelLoginType.Weixin);
        }
        else {
            AlertManager.showAlert("token不能为空，绑定失败!");
        }
    };
    BindAccountManager.onLoginFaildHandler = function () {
        ChannelManager.OnTokenLoginSucceed.removeListener(BindAccountManager.OnTokenLoginSucceed, this);
        ChannelManager.OnLoginFailed.removeListener(BindAccountManager.onLoginFaildHandler, this);
        AlertManager.showAlert("绑定失败！");
    };
    BindAccountManager._bindedList = new Array();
    /**
     * 绑定成功事件
     */
    BindAccountManager.bindSuccessEvent = new qin.DelegateDispatcher();
    /**
     * 获取绑定的渠道列表事件
     */
    BindAccountManager.bindListEvent = new qin.DelegateDispatcher();
    return BindAccountManager;
}());
__reflect(BindAccountManager.prototype, "BindAccountManager");
//# sourceMappingURL=BindAccountManager.js.map