module game {
    export class LoginManager {
        static LOGIN_STATE = "LoginManager_LOGIN_STATE";

        public async login() {
            let gwResult: msg.IL2C_RetLogin;
            gwResult = await this.connectLoginGW();
            if (gwResult.result == 1) {
                NotificationCenter.once(this, () => {
                    NotificationCenter.postNotification(LoginManager.LOGIN_STATE, true);
                    createGameScene();
                }, "msg.GW2C_SendUserInfo");
                let loginResult: msg.IGW2C_RetLogin = await this.connectLoginGate(gwResult, loginUserInfo.account);
                if (loginResult.errcode == "") {

                } else {
                    NotificationCenter.removeObserver(this, "msg.GW2C_SendUserInfo");
                    NetFailed.getInstance().show(loginResult.errcode);
                    NotificationCenter.postNotification(LoginManager.LOGIN_STATE, false);
                }
            } else {
                NetFailed.getInstance().show(gwResult.reason);
                NotificationCenter.postNotification(LoginManager.LOGIN_STATE, false);
            }
        }

        private connectLoginGate(gwResult: msg.IL2C_RetLogin, account: string = "") {
            let d = defer();
            ClientNet.getInstance().onConnectClose();
            NotificationCenter.once(this, () => {
                ClientNet.getInstance().onConnectByUrl($gameNetIp.replace("{gamePort}", `${gwResult.gatehost.port}`));
                NotificationCenter.once(this, async () => {
                    NotificationCenter.once(this, (data: msg.IGW2C_RetLogin) => {
                        d.resolve(data);
                    }, "msg.GW2C_RetLogin");

                    sendMessage("msg.C2GW_ReqLogin", msg.C2GW_ReqLogin.encode({
                        account: account,
                        verifykey: gwResult.verifykey,
                    }));
                }, ClientNet.SOCKET_CONNECT_SUCCESS);
            }, ClientNet.SOCKET_CONNECT_CLOSE);
            return d.promise();
        }

        private connectLoginGW() {
            let d = defer();
            ClientNet.getInstance().onConnectByUrl($netIp);
            NotificationCenter.once(this, () => {
                sendMessage("msg.C2L_ReqLogin", msg.C2L_ReqLogin.encode(loginUserInfo));
                NotificationCenter.once(this, (data: msg.IL2C_RetLogin) => {
                    d.resolve(data);
                }, "msg.L2C_RetLogin");
            }, ClientNet.SOCKET_CONNECT_SUCCESS);
            return d.promise();
        }

        private static _instance: LoginManager;

        public static getInstance(): LoginManager {
            if (!LoginManager._instance) {
                LoginManager._instance = new LoginManager();
            }
            return LoginManager._instance;
        }
    }

    var tvmTimeout: number;

    export async function Login() {
        await RES.loadGroup(gameConfig.ResGroupEnum.Preload);
        NotificationCenter.postNotification("closeLoadingSkin");
        SceneManager.changeScene(SceneType.login, false);
    }

    export var loginUserInfo: msg.IC2L_ReqLogin;
    export var loginOs: string = egret.Capabilities.os;
}