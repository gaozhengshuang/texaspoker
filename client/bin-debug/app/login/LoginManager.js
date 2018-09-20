var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 登录管理
 */
var LoginManager = (function () {
    function LoginManager() {
    }
    Object.defineProperty(LoginManager, "loginMode", {
        /**
         * 登录模式
         */
        get: function () {
            return LoginManager._loginMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager, "loginInfo", {
        /**
         * 登录信息
         */
        get: function () {
            return LoginManager._loginInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager, "account", {
        /**
         * 游戏帐号名 或 渠道帐号id（对于游戏来说，渠道的帐号id就是游戏帐号名）
         */
        get: function () {
            return LoginManager._account;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginManager, "channelToken", {
        /**
         * 渠道返回的token
         */
        get: function () {
            return LoginManager._channelToken;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 销毁
     */
    LoginManager.Dispose = function () {
        LoginManager.OnComplete.clear();
        if (LoginManager._socket != null) {
            LoginManager.RemoveAllListener();
            LoginManager._socket.dispose();
            LoginManager._socket = null;
        }
    };
    /**
     * 关闭
     */
    LoginManager.Close = function () {
        if (LoginManager._socket != null) {
            LoginManager.RemoveAllListener();
            LoginManager._socket.close();
        }
    };
    LoginManager.RemoveAllListener = function () {
        UIManager.removeEventListener(UIModuleName.LoadingSwitchPanel, UIModuleEvent.OnTimeout, LoginManager.OnLoadingTimeout, this);
        LoginManager._socket.RemoveMessageListener(LoginManager.OnLoginMessage, this);
        LoginManager._socket.RemoveCommandListener(Command.Login_login, LoginManager.OnLogin, this);
        LoginManager._socket.RemoveCommandListener(Command.Login_exchange, LoginManager.OnExchange, this);
        LoginManager._socket.RemoveCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
        LoginManager._socket.RemoveResultListener(LoginManager.OnResult, this);
    };
    /**
     * 游客登录
     */
    LoginManager.GuestLogin = function (channel) {
        LoginManager._loginMode = LoginMode.Guest;
        LoginManager._isLogin = 1;
        LoginManager._channel = channel;
        LoginManager._account = "游客";
        LoginManager._password = qin.StringConstants.Empty;
        LoginManager.pollingConnect();
    };
    /**
     * 游戏账号登录
     */
    LoginManager.AccountLogin = function (channel, account, pwd) {
        LoginManager._loginMode = LoginMode.Account;
        LoginManager._isLogin = 1;
        LoginManager._channel = channel;
        LoginManager._account = account;
        LoginManager._password = pwd;
        LoginManager.pollingConnect();
    };
    /**
     * token调试登录,除了_loginMode和TokenLogin不一样，其它都一样
     */
    LoginManager.TokenDebug = function (loginChannel, token) {
        LoginManager._loginMode = LoginMode.TokenDebug;
        LoginManager._isLogin = 1;
        LoginManager._channel = loginChannel;
        LoginManager._tokenCode = token;
        LoginManager.pollingConnect();
    };
    /**
     * 平台token登录
     */
    LoginManager.TokenLogin = function (loginChannel, token) {
        LoginManager._loginMode = LoginMode.Token;
        LoginManager._isLogin = 1;
        LoginManager._channel = loginChannel;
        LoginManager._tokenCode = token;
        LoginManager.pollingConnect();
    };
    /**
     * 游戏账号注册
     */
    LoginManager.AccountRegister = function (channel, account, pwd) {
        LoginManager._loginMode = LoginMode.Account;
        LoginManager._isLogin = 611;
        LoginManager._channel = channel;
        LoginManager._account = account;
        LoginManager._password = pwd;
        LoginManager.pollingConnect();
    };
    //------------------------------------------------------------------
    // private
    //------------------------------------------------------------------
    LoginManager.pollingConnect = function () {
        if (!LoginManager._connectHandler) {
            LoginManager._connectHandler = new PollingSocket(1, qin.Delegate.getOut(LoginManager.Connect, this), qin.Delegate.getOut(LoginManager.OnLoadingTimeout, this));
        }
        LoginManager._connectHandler.loginConnect();
    };
    LoginManager.Connect = function () {
        if (LoginManager._socket == null) {
            LoginManager._socket = new qin.LoginSocket();
            LoginManager._socket.initialize(ProtocolManager.LoginBin);
        }
        //
        LoginManager.Close();
        if (!LoginManager._connectHandler.isPolling) {
            UIManager.addEventListener(UIModuleName.LoadingSwitchPanel, UIModuleEvent.OnTimeout, LoginManager.OnLoadingTimeout, this);
        }
        UIManager.showPanel(UIModuleName.LoadingSwitchPanel, true);
        LoginManager._socket.AddMessageListener(LoginManager.OnLoginMessage, this);
        LoginManager._socket.AddResultListener(LoginManager.OnResult, this);
        LoginManager._socket.Connect(LoginManager._connectHandler.address, LoginManager._connectHandler.port);
    };
    LoginManager.OnLoadingTimeout = function () {
        LoginManager.Close();
        AlertManager.showAlert("网络连接超时！", LoginManager.OnErrorConfirm, null, null, "网络超时");
    };
    LoginManager.OnLogin = function (result) {
        LoginManager._socket.RemoveCommandListener(Command.Login_login, LoginManager.OnLogin, this);
        var serverVersion = result.data["Version"];
        if (VersionManager.VerifyGameServer(serverVersion)) {
            var challenge = result.data["challenge"];
            var serverkey = result.data["serverkey"];
            // serverkey = qin.Crypt.lb64decode(serverkey);
            // let secret: string = qin.Crypt.ldhsecret(serverkey, LoginManager._clientKey);
            // LoginManager._hexsecret = qin.Crypt.ltohex(secret);
            //
            LoginManager._hexsecret = "266f889930929ff7";
            var hmac = qin.Crypt.HmacSha1(LoginManager._hexsecret, challenge);
            //交换
            LoginManager._socket.AddCommandListener(Command.Login_exchange, LoginManager.OnExchange, this);
            LoginManager._socket.SimpleSend(Command.Login_exchange, { "hmac": hmac });
        }
        else {
            UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
            LoginManager.RemoveAllListener();
            LoginManager.OnVersionError.dispatch();
        }
    };
    LoginManager.OnExchange = function (result) {
        LoginManager._socket.RemoveCommandListener(Command.Login_exchange, LoginManager.OnExchange, this);
        //
        var deviceId = ChannelManager.deviceId;
        var token = qin.StringConstants.Empty;
        if (LoginManager._loginMode == LoginMode.Account) {
            token = qin.StringUtil.format("{0}@{1}:{2}", qin.Crypt.lb64encode(LoginManager._account), qin.Crypt.lb64encode(LoginManager._password), LoginManager._isLogin);
        }
        else if (LoginManager._loginMode == LoginMode.Guest) {
            token = deviceId;
        }
        else {
            token = LoginManager._tokenCode;
        }
        token = qin.Crypt.AESEncrypt(token, LoginManager._hexsecret);
        LoginManager._socket.AddCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
        //
        var bid = BundleManager.getBid();
        if (bid) {
            //一定要有包ID
            LoginManager._socket.SimpleSend(Command.Login_auth, { "token": token, "channel": LoginManager._channel, "device": deviceId, "bid": bid });
        }
    };
    LoginManager.OnAuth = function (result) {
        LoginManager._socket.RemoveCommandListener(Command.Login_auth, LoginManager.OnAuth, this);
        LoginManager.Close();
        if (true || qin.System.isLocalhost) {
            UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
        }
        //
        LoginManager._loginInfo = LoginInfo.CreateFromProto(result.data);
        LoginManager._loginInfo.secret = LoginManager._hexsecret;
        if (LoginManager._loginMode == LoginMode.Token) {
            if (LoginManager._loginInfo.channeldata != null) {
                var channeldata = LoginManager._loginInfo.channeldata;
                if (channeldata.hasOwnProperty("account")) {
                    LoginManager._account = channeldata["account"]; //_account不能设置默认为空，因为登录时候有赋值
                }
                LoginManager._channelToken = channeldata.hasOwnProperty("token") ? channeldata["token"] : qin.StringConstants.Empty;
                //
                PrefsManager.setLoginToken(LoginManager._channelToken, ChannelLoginType.getTokenExpire(ChannelManager.loginType)); //登录完成把sdk返回的token记录本地，下次登录如果有直接使用登录
                ChannelManager.SetChannelData(LoginManager._account, LoginManager._channelToken); //设置回sdk，因为有些sdk需要用到服务器的sdk数据
            }
        }
        else if (LoginManager._loginMode == LoginMode.Account) {
            if (LoginManager._account) {
                PrefsManager.setValue(PrefsManager.Login_Account, LoginManager._account);
                PrefsManager.setValue(PrefsManager.Login_Password, LoginManager._password);
            }
        }
        SocketManager.Dispose(); //登录过，要销毁游戏Socket，保证都是重新开始的
        //游戏登录成功设置保存登录类型
        PrefsManager.setValue(PrefsManager.Login_LoginType, ChannelManager.loginType);
        LoginManager.OnComplete.dispatch();
    };
    LoginManager.OnLoginMessage = function (msg) {
        qin.Console.logSocket(msg);
        switch (msg.type) {
            case qin.SocketMessageType.Connect:
                qin.Console.log("Login服务器连接成功");
                LoginManager._connectHandler.stop();
                //握手
                //LoginManager._clientKey = qin.Crypt.lrandomkey();
                //let tmpkey: string = LoginManager._clientKey;
                //tmpkey = qin.Crypt.lb64encode(qin.Crypt.ldhexchange(LoginManager._clientKey));
                LoginManager._clientKey = "xuEaV3HSKms=";
                //tmpkey = LoginManager._clientKey;
                LoginManager._socket.AddCommandListener(Command.Login_login, LoginManager.OnLogin, this);
                LoginManager._socket.SimpleSend(Command.Login_login, { "clientkey": LoginManager._clientKey, "Version": ProjectDefined.GetInstance().codeVersion });
                // LoginManager._socket.SendAsync(Command.Login_login, { "clientkey": qin.Crypt.lb64encode(qin.Crypt.ldhexchange(LoginManager._clientKey)), "Version": "0.1.0" });//VersionManager.clientVersion
                break;
            case qin.SocketMessageType.NetworkError:
                LoginManager._connectHandler.errorConnectHandler();
                if (LoginManager._connectHandler.isTimeout) {
                    LoginManager.onErrorOccured(msg);
                }
                break;
            case qin.SocketMessageType.Failing:
                LoginManager._connectHandler.stop();
                LoginManager.onErrorOccured(msg);
                break;
            case qin.SocketMessageType.SendError:
                UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
                LoginManager.Close();
                //
                var alertInfo = new AlertInfo();
                alertInfo.title = "发送协议出错";
                alertInfo.subTitle = msg.errorCode;
                alertInfo.message = msg.message;
                alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
                AlertManager.showAlertInfo(alertInfo);
                break;
            case qin.SocketMessageType.NotInitialized:
                UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
                LoginManager.Close();
                //
                alertInfo = new AlertInfo();
                alertInfo.title = "协议初始化异常";
                alertInfo.subTitle = msg.errorCode;
                alertInfo.message = msg.message;
                alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
                AlertManager.showAlertInfo(alertInfo);
                break;
        }
    };
    LoginManager.onErrorOccured = function (msg) {
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
        LoginManager.Close();
        //
        var alertInfo = new AlertInfo();
        alertInfo.title = "网络异常";
        alertInfo.subTitle = msg.errorCode;
        alertInfo.message = "连接服务器失败";
        alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
        AlertManager.showAlertInfo(alertInfo);
    };
    /// <summary>
    /// 客户端主动请求的才执行
    /// </summary>
    /// <param name="result"></param>
    LoginManager.OnResult = function (result) {
        if (result.op == qin.SpRpcOp.Response) {
            if (result.error != 0) {
                LoginManager.Close();
                UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
                var isWebReload = false;
                //406错误，抛出验证失败的事件
                if (result.error == LoginManager.TokenErrorCode) {
                    PrefsManager.clearLoginInfo();
                    isWebReload = qin.System.isWeb && ChannelManager.loginType == ChannelLoginType.Weixin;
                    LoginManager.OnValiateFail.dispatch();
                }
                var alertInfo = new AlertInfo();
                alertInfo.title = "提示";
                alertInfo.subTitle = "protocol:" + result.cmdId + ",code:" + result.error;
                alertInfo.message = isWebReload ? '平台验证失败，请重新登录' : ErrorDefined.GetInstance().getDetails(result.error);
                alertInfo.OnConfirm = LoginManager.OnErrorConfirm;
                alertInfo.confirmParam = isWebReload;
                console.warn(qin.StringUtil.format("{0},描述：{1}", alertInfo.subTitle, alertInfo.message));
                AlertManager.showAlertInfo(alertInfo);
            }
        }
    };
    LoginManager.OnErrorConfirm = function (obj) {
        if (obj) {
            GameManager.reload();
        }
        else {
            LoginManager.OnError.dispatch();
        }
    };
    LoginManager.TokenErrorCode = 406; //token登录错误码
    //------------------------------------------------------------------
    // event
    //------------------------------------------------------------------
    /**
     * 登录完成
     */
    LoginManager.OnComplete = new qin.DelegateDispatcher();
    /**
     * 登录错误
     */
    LoginManager.OnError = new qin.DelegateDispatcher();
    /**
     * 406错误，验证token失败
     */
    LoginManager.OnValiateFail = new qin.DelegateDispatcher();
    /**
     * 和登录服务器版本验证错误
     */
    LoginManager.OnVersionError = new qin.DelegateDispatcher();
    return LoginManager;
}());
__reflect(LoginManager.prototype, "LoginManager");
//# sourceMappingURL=LoginManager.js.map