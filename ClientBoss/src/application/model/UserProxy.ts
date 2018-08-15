/**
 * 用户代理
 * @author sunboy
 */
module game {

	export class UserProxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = "UserProxy";
		public constructor(){
			super(UserProxy.NAME);
			this.RegisterEvent();
		}

		public RegisterEvent() {
            NotificationCenter.addObserver(this, this.OnGW2C_UpdateGold, "msg.GW2C_UpdateGold");
			NotificationCenter.addObserver(this, this.OnGW2C_NotifyRobCount, "msg.GW2C_NotifyRobCount");
        }
		private OnGW2C_UpdateGold(data: msg.GW2C_UpdateGold) {
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_USER_INFO,DataManager.playerModel.getUserInfo());
		}
		private OnGW2C_NotifyRobCount(data: msg.GW2C_NotifyRobCount) {
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_USER_INFO,DataManager.playerModel.getUserInfo());
		}
		public getUserInfo():IUserInfo
		{
			return DataManager.playerModel.getUserInfo();
		}

		public renameTime: number = 5;

		public isGaming:boolean = false;

	}
}