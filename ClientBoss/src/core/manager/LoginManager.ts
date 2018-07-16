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

        public async wxlogin(msg) {
            let gwResult: msg.IL2C_RetLogin;
            gwResult = await this.connectWxLoginGW(msg);
            if (gwResult.result == 1) {
                NotificationCenter.once(this, () => {
                    NotificationCenter.postNotification(LoginManager.LOGIN_STATE, true);
                    createGameScene();
                }, "msg.GW2C_SendUserInfo");

                let loginResult: msg.IGW2C_RetLogin = await this.connectLoginGate(gwResult, msg.openid);
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

        private async reqLoginFunc(verifykey: string) {

        }

        private connectLoginGate(gwResult: msg.IL2C_RetLogin, account: string = "") {
            let d = defer();
            ClientNet.getInstance().onConnectClose();
            NotificationCenter.once(this, () => {
                ClientNet.getInstance().onConnectByUrl(`ws://${gwResult.gatehost.ip}:${gwResult.gatehost.port}/ws_handler`);
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

        private connectWxLoginGW(m: msg.C2L_ReqLoginWechat) {
            let d = defer();
            ClientNet.getInstance().onConnectByUrl($netIp);
            NotificationCenter.once(this, () => {
                sendMessage("msg.C2L_ReqLoginWechat", msg.C2L_ReqLoginWechat.encode(m));
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

    export function Login() {
        NotificationCenter.postNotification("closeLoadingSkin");
        SceneManager.changeScene(SceneType.login, false);
    }

    function wxTouchGw(openid) {
        platform.getUserInfo().then((res) => {
            console.log(res)
            let nickName = res.nickName;
            let avatarUrl = res.avatarUrl;
            let gender = res.gender;
            let country = res.country;
            let province = res.province

            DataManager.playerModel.userInfo.face = avatarUrl;

            //TODO:使用这些获取的数据
            console.log("openid: ", openid)

            LoginManager.getInstance().wxlogin({
                openid: openid,
                face: avatarUrl,
                nickname: nickName
            })
        })
    }

    export function wxAutoLogin() {
        platform.login().then((res) => {
            wxCode = res.code;

            wx.request({
                url: $registIp,
                data: { "gmcmd": "wx_login", "tempauthcode": wxCode },
                header: { 'content-type': 'application/json' },
                method: "POST",
                dataType: "",
                success: (res) => {
                    console.log('登录服务器返回：', res);
                    if (res.data.status == 0) {
                        wxTouchGw(res.data.msg);
                    } else {
                        showDialog("登陆失败 " + res.data.msg, "确定", null);
                    }
                },
                fail: (res) => console.log("请求失败", res),
                complete: null
            });

            // Pay.get_open_id_and_session_key(res.code, (openid, session_key) => {
            //    wxTouchGw(openid)
            // });
        });
    }

    export var loginUserInfo: msg.IC2L_ReqLogin;
}