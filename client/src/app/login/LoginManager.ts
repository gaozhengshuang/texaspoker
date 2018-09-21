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
                    UserManager.userInfo = <any>msg;
                    NotificationCenter.postNotification(LoginManager.LOGIN_STATE, true);
                }, "msg.GW2C_SendUserInfo");
                let loginResult: msg.IGW2C_RetLogin = await LoginManager.connectLoginGate(gwResult, LoginManager.loginUserInfo.account);
                if (loginResult.errcode == "")
                {

                } else
                {
                    NotificationCenter.removeObserver(LoginManager, "msg.GW2C_SendUserInfo");
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
        private static connectLoginGate(gwResult: msg.IL2C_RetLogin, account: string = "")
        {
            let d = defer();
            SocketManager.Close();
            NotificationCenter.once(LoginManager, () =>
            {
                SocketManager.pollingConnect($gameNetIp.replace("{gamePort}", `${gwResult.gatehost.port}`));
                NotificationCenter.once(LoginManager, async () =>
                {
                    NotificationCenter.once(LoginManager, (data: msg.IGW2C_RetLogin) =>
                    {
                        d.resolve(data);
                    }, "msg.GW2C_RetLogin");

                    SocketManager.Send("msg.C2GW_ReqLogin", msg.C2GW_ReqLogin.encode({
                        account: account,
                        verifykey: gwResult.verifykey,
                    }));
                }, BaseSocket.SOCKET_CONNECT_SUCCESS);
            }, BaseSocket.SOCKET_CONNECT_CLOSE);
            return d.promise();
        }

        private static connectLoginGW()
        {
            let d = defer();
            SocketManager.pollingConnect($netIp);
            NotificationCenter.once(LoginManager, () =>
            {
                SocketManager.Send("msg.C2L_ReqLogin", msg.C2L_ReqLogin.encode(LoginManager.loginUserInfo));
                NotificationCenter.once(LoginManager, (data: msg.IL2C_RetLogin) =>
                {
                    d.resolve(data);
                }, "msg.L2C_RetLogin");
            }, BaseSocket.SOCKET_CONNECT_SUCCESS);
            return d.promise();
        }
    }
}