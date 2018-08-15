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
            NotificationCenter.addObserver(this, this.OnUpdateUser, PlayerModel.PLAYERMODEL_UPDATE);
			NotificationCenter.addObserver(this, this.OnGW2C_NotifyRobCount, "msg.GW2C_NotifyRobCount");
        }
		private OnUpdateUser() {
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_USER_INFO,DataManager.playerModel.getUserInfo());
		}
		private OnGW2C_NotifyRobCount(data: msg.GW2C_NotifyRobCount) {
			DataManager.playerModel.getUserInfo().robcount=data.value;
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