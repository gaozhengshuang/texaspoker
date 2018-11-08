module game
{
    export class LoginManager
    {
        private static loginUserInfo: msg.IC2L_ReqLogin;
        public static loginOs: string = egret.Capabilities.os;
        static LOGIN_STATE = "LoginManager_LOGIN_STATE";

        /**
         * 账号密码登录
         */
        public static async AccountLogin(account: string, passwd: string)
        {
            LoginManager.loginUserInfo = { account: account, passwd: passwd };
            let gwResult: msg.IL2C_RetLogin;
            gwResult = await LoginManager.connectLoginGW();
            LoginManager.login(gwResult);
        }

        /**
         * facebook登录
         */
        public static async faceBookLogin(token: string, openId: string)
        {
            let cb = () =>
            {
                let d = defer();
                SocketManager.pollingConnect(game.serverInfo.$netIp);
                NotificationCenter.once(LoginManager, () =>
                {
                    let data = new msg.C2L_ReqLoginFaceBook();
                    data.openid = openId;
                    data.token = token;
                    SocketManager.Send(Command.C2L_ReqLoginFaceBook, data);
                    NotificationCenter.once(LoginManager, (data) =>
                    {
                        d.resolve(data);
                    }, Command.C2L_ReqLoginFaceBook);
                }, BaseSocket.SOCKET_CONNECT_SUCCESS);
                return d.promise();
            };
            let gwResult: msg.IL2C_RetLogin;
            gwResult = await cb();
            LoginManager.login(gwResult);
        }

        /**
         * google 登录
         */
        public static async googlePlayLogin()
        {
            let cb = () =>
            {
                let d = defer();
                SocketManager.pollingConnect(game.serverInfo.$netIp);
                NotificationCenter.once(LoginManager, () =>
                {
                    let data = new msg.C2L_ReqLoginGoogle();
                    SocketManager.Send(Command.C2L_ReqLoginGoogle, data);
                    NotificationCenter.once(LoginManager, (data) =>
                    {
                        d.resolve(data);
                    }, Command.C2L_ReqLoginGoogle);
                }, BaseSocket.SOCKET_CONNECT_SUCCESS);
                return d.promise();
            };
            let gwResult: msg.IL2C_RetLogin;
            gwResult = await cb();
            LoginManager.login(gwResult);
        }
        
        /**
         * 苹果游戏中心登录
         */
        public static async gameCenterLogin(openid: string, keyurl: string, signature: string, timestamp: number, salt: string)
        {
            let cb = () =>
            {
                let d = defer();
                SocketManager.pollingConnect(game.serverInfo.$netIp);
                NotificationCenter.once(LoginManager, () =>
                {
                    let data = new msg.C2L_ReqLoginApple();
                    data.openid = openid;
                    data.keyurl = keyurl;
                    data.signature = signature;
                    data.timestamp = timestamp;
                    data.salt = salt;
                    SocketManager.Send(Command.C2L_ReqLoginApple, data);
                    NotificationCenter.once(LoginManager, (data) =>
                    {
                        d.resolve(data);
                    }, Command.C2L_ReqLoginApple);
                }, BaseSocket.SOCKET_CONNECT_SUCCESS);
                return d.promise();
            };
            let gwResult: msg.IL2C_RetLogin;
            gwResult = await cb();
            LoginManager.login(gwResult);
        }

        public static async login(gwResult: msg.IL2C_RetLogin)
        {
            if (gwResult.result == 1)
            {
                NotificationCenter.once(LoginManager, (msg: msg.GW2C_PushUserInfo) =>
                {
                    PrefsManager.setValue(PrefsManager.Login_Account, LoginManager.loginUserInfo.account);
                    PrefsManager.setValue(PrefsManager.Login_Password, LoginManager.loginUserInfo.passwd);
                    if (!UserManager.userInfo)
                    {
                        UserManager.userInfo = new UserInfo();
                    }
                    else
                    {
                        UserManager.userInfo.reset();
                    }
                    for (let key in msg.base)
                    {
                        UserManager.userInfo.copyValueFromIgnoreCase(msg.base[key]);
                    }
                    UserManager.userInfo.copyValueFromIgnoreCase(msg.entity);
                    UserManager.userInfo.vipTime = game.longToNumber(msg.entity.viptime1);
                    UserManager.userInfo.yearVipTime = game.longToNumber(msg.entity.viptime2);
                    TimeManager.initialize(msg.base.statics);
                    NotificationCenter.postNotification(LoginManager.LOGIN_STATE, true);
                }, "msg.GW2C_PushUserInfo");

                let pushItemCallback: Function = function (result: game.SpRpcResult)
                {
                    SocketManager.RemoveCommandListener(Command.GW2C_PushItemList, pushItemCallback, this);
                    ItemManager.initialize(result);
                };
                SocketManager.AddCommandListener(Command.GW2C_PushItemList, pushItemCallback, this);

                let loginResult: msg.IGW2C_RetLogin = await LoginManager.connectLoginGate(gwResult, LoginManager.loginUserInfo.account);
                if (loginResult.errcode == "")
                {
                    PrefsManager.setValue(PrefsManager.Login_Account, LoginManager.loginUserInfo.account);
                    PrefsManager.setValue(PrefsManager.Login_Password, LoginManager.loginUserInfo.passwd);
                } else
                {
                    NotificationCenter.removeObserver(LoginManager, "msg.GW2C_PushUserInfo");
                    LoginManager.showLoginFault("errcode:" + loginResult.errcode);
                    NotificationCenter.postNotification(LoginManager.LOGIN_STATE, false);
                }
            } else
            {
                LoginManager.showLoginFault("reason:" + gwResult.reason);
                NotificationCenter.postNotification(LoginManager.LOGIN_STATE, false);
            }
        }
        private static showLoginFault(reason: string)
        {
            AlertManager.showAlertByString("登录失败！" + reason);
        }
        private static async connectLoginGate(gwResult: msg.IL2C_RetLogin, account: string = "")
        {
            let d = defer();
            NotificationCenter.once(LoginManager, () =>
            {
                SocketManager.pollingConnect(game.serverInfo.$gameNetIp.replace("{gamePort}", `${gwResult.gatehost.port}`));
                NotificationCenter.once(LoginManager, async () =>
                {
                    NotificationCenter.once(LoginManager, (data: msg.IGW2C_RetLogin) =>
                    {
                        d.resolve(data);
                    }, Command.C2L_ReqLogin);

                    SocketManager.Send(Command.C2L_ReqLogin, {
                        account: account,
                        verifykey: gwResult.verifykey,
                    });
                }, BaseSocket.SOCKET_CONNECT_SUCCESS);
            }, BaseSocket.SOCKET_CONNECT_CLOSE);
            SocketManager.Close();
            return d.promise();
        }

        private static connectLoginGW()
        {
            let d = defer();
            SocketManager.pollingConnect(game.serverInfo.$netIp);
            NotificationCenter.once(LoginManager, () =>
            {
                SocketManager.Send(Command.C2L_ReqLogin, LoginManager.loginUserInfo);
                NotificationCenter.once(LoginManager, (data: msg.IL2C_RetLogin) =>
                {
                    d.resolve(data);
                }, Command.C2L_ReqLogin);
            }, BaseSocket.SOCKET_CONNECT_SUCCESS);
            return d.promise();
        }
    }
}