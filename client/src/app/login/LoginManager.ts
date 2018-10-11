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
        public static AccountLogin(account: string, passwd: string)
        {
            LoginManager.loginUserInfo = { account: account, passwd: passwd };
            LoginManager.login();
        }

        public static async login()
        {
            let gwResult: msg.IL2C_RetLogin;
            gwResult = await LoginManager.connectLoginGW();
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
                    TimeManager.initialize(msg.base.statics);
                    NotificationCenter.postNotification(LoginManager.LOGIN_STATE, true);
                }, "msg.GW2C_PushUserInfo");
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
                SocketManager.pollingConnect($gameNetIp.replace("{gamePort}", `${gwResult.gatehost.port}`));
                NotificationCenter.once(LoginManager, async () =>
                {
                    NotificationCenter.once(LoginManager, (data: msg.IGW2C_RetLogin) =>
                    {
                        d.resolve(data);
                    }, "msg.C2GW_ReqLogin");

                    SocketManager.Send("msg.C2GW_ReqLogin", {
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
            SocketManager.pollingConnect($netIp);
            NotificationCenter.once(LoginManager, () =>
            {
                SocketManager.Send("msg.C2L_ReqLogin", LoginManager.loginUserInfo);
                NotificationCenter.once(LoginManager, (data: msg.IL2C_RetLogin) =>
                {
                    d.resolve(data);
                }, "msg.C2L_ReqLogin");
            }, BaseSocket.SOCKET_CONNECT_SUCCESS);
            return d.promise();
        }
    }
}