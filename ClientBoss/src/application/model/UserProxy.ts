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
			NotificationCenter.addObserver(this, this.OnGW2C_NotifyAddRobCountTime, "msg.GW2C_NotifyAddRobCountTime");
        }
		private OnUpdateUser() {
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_USER_INFO,DataManager.playerModel.getUserInfo());
		}
		private OnGW2C_NotifyRobCount(data: msg.GW2C_NotifyRobCount) {
			DataManager.playerModel.getUserInfo().robcount=data.value;
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_USER_INFO,DataManager.playerModel.getUserInfo());
		}
		private OnGW2C_NotifyAddRobCountTime(data: msg.GW2C_NotifyAddRobCountTime) {
			DataManager.playerModel.getUserInfo().tmaddrobcount=Number(data.time);
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_TILI_TIME,DataManager.playerModel.getUserInfo());
		}
		public getUserInfo():IUserInfo
		{
			return DataManager.playerModel.getUserInfo();
		}

		public renameTime: number = 5;

		public isGaming:boolean = false;

	}
}