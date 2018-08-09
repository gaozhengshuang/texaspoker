/**
 * 游戏代理
 * @author sunboy
 */
module app {

	export class ServerProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "ServerProxy";

		public constructor() {
			super(ServerProxy.NAME);
		}

		private loginUserInfo: msg.IC2L_ReqLogin;
		private loginOs: string = egret.Capabilities.os;
		private loginSuss:Function=null;
		private loginSussBody:Function=null;
		public async login(userInfo: any,successFun:Function, body:any) {
			this.loginUserInfo = { account: userInfo.name, passwd: userInfo.pass };
			this.loginSuss=successFun;
			this.loginSussBody=body;
			let gwResult: msg.IL2C_RetLogin;
			gwResult = await this.connectLoginGW();
			if (gwResult.result == 1) {
				game.NotificationCenter.once(this, () => {
					//game.NotificationCenter.postNotification(LoginManager.LOGIN_STATE, true);
					this.createGameScene();
					egret.log(gwResult);
				}, "msg.GW2C_SendUserInfo");
				let loginResult: msg.IGW2C_RetLogin = await this.connectLoginGate(gwResult, this.loginUserInfo.account);
				if (loginResult.errcode == "") {

				} else {
					game.NotificationCenter.removeObserver(this, "msg.GW2C_SendUserInfo");
					game.NetFailed.getInstance().show(loginResult.errcode);
					//game.NotificationCenter.postNotification(LoginManager.LOGIN_STATE, false);
				}
			} else {
				game.NetFailed.getInstance().show(gwResult.reason);
				//game.NotificationCenter.postNotification(LoginManager.LOGIN_STATE, false);
			}
		}

		private connectLoginGate(gwResult: msg.IL2C_RetLogin, account: string = "") {
			let d = game.defer();
			ClientNet.getInstance().onConnectClose();
			game.NotificationCenter.once(this, () => {
				ClientNet.getInstance().onConnectByUrl($gameNetIp.replace("{gamePort}", `${gwResult.gatehost.port}`));
				game.NotificationCenter.once(this, async () => {
					game.NotificationCenter.once(this, (data: msg.IGW2C_RetLogin) => {
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
			let d = game.defer();
			console.log($netIp);
			ClientNet.getInstance().onConnectByUrl($netIp);
			game.NotificationCenter.once(this, () => {
				sendMessage("msg.C2L_ReqLogin", msg.C2L_ReqLogin.encode(this.loginUserInfo));
				game.NotificationCenter.once(this, (data: msg.IL2C_RetLogin) => {
					d.resolve(data);
				}, "msg.L2C_RetLogin");
			}, ClientNet.SOCKET_CONNECT_SUCCESS);
			return d.promise();
		}

		private createGameScene() {
			//SceneManager.changeScene(SceneType.main);
			if(this.loginSuss!=null){
				this.loginSuss(this.loginSussBody);
			}
			//登录完成关闭loading界面
			game.NotificationCenter.postNotification("closeLoadingSkin");
			game.NotificationCenter.once(this, this.connectFailed, ClientNet.SOCKET_CONNECT_CLOSE);
			this.startHeart();
			window.onbeforeunload = () => {
				this.stopHeart();
				ClientNet.getInstance().onConnectClose();
				return;
			}

		}
		private connectFailed() {
			this.stopHeart();
			game.NetFailed.getInstance().show();
		}

		private heartTimeout: number;

		private stopHeart() {
			if (this.heartTimeout) {
				clearTimeout(this.heartTimeout);
				this.heartTimeout = null;
			}
		}

		private async startHeart() {
			if (this.heartTimeout) return;
			if (game.leaveTime) {
				let now = new Date().getTime();
				if ((now - game.leaveTime) >= 300000) {
					this.stopHeart();
					return;
				}
			}

			sendMessage("msg.C2GW_HeartBeat", msg.C2GW_HeartBeat.encode({}));
			this.heartTimeout = setTimeout(() => {
				// showTips("测试心跳", true);
				this.heartTimeout = null;
				this.startHeart();
			}, 3000);
		}
	}
}