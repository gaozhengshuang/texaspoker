/**
 * 用户代理
 * @author sunboy
 */
module game {

	export class UserProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "UserProxy";
		public constructor() {
			super(UserProxy.NAME);
			this.RegisterEvent();
		}

		public RegisterEvent() {
			NotificationCenter.addObserver(this, this.OnUpdateUser, PlayerModel.PLAYERMODEL_UPDATE);
			NotificationCenter.addObserver(this, this.OnGW2C_NotifyRobCount, "msg.GW2C_NotifyRobCount");
			NotificationCenter.addObserver(this, this.OnGW2C_NotifyAddRobCountTime, "msg.GW2C_NotifyAddRobCountTime");
			NotificationCenter.addObserver(this, this.OnGW2C_UpdateUserDataByKey, "msg.GW2C_UpdateUserDataByKey");
		}
		private OnUpdateUser() {
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_USER_INFO, DataManager.playerModel.getUserInfo());
		}
		private OnGW2C_NotifyRobCount(data: msg.GW2C_NotifyRobCount) {
			DataManager.playerModel.getUserInfo().robcount = data.value;
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_USER_INFO, DataManager.playerModel.getUserInfo());
		}
		private OnGW2C_NotifyAddRobCountTime(data: msg.GW2C_NotifyAddRobCountTime) {
			DataManager.playerModel.getUserInfo().tmaddrobcount = Number(data.time);
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_TILI_TIME, DataManager.playerModel.getUserInfo());
		}
		private OnGW2C_UpdateUserDataByKey(data: msg.GW2C_UpdateUserDataByKey) {
			switch (data.key) {
				case msg.UserInfoType.Name:
						DataManager.playerModel.getUserInfo().name = data.valuestring;
					break;
					case msg.UserInfoType.UserSex:
						DataManager.playerModel.getUserInfo().sex = Number(data.valueint);
					break;
					case msg.UserInfoType.Age:
						DataManager.playerModel.getUserInfo().age=Number(data.valueint);
					break;
					case msg.UserInfoType.Sign:
						DataManager.playerModel.getUserInfo().sign=data.valuestring;
					break;
					case msg.UserInfoType.Constellation:
						DataManager.playerModel.getUserInfo().constellation=Number(data.valueint);
					break;
					case msg.UserInfoType.Face:
						DataManager.playerModel.getUserInfo().face=data.valuestring;
					break;
					case msg.UserInfoType.Baseprovince:
						DataManager.playerModel.getUserInfo().baseprovince=Number(data.valueint);
					break;
					case msg.UserInfoType.Basecity:
						DataManager.playerModel.getUserInfo().basecity=Number(data.valueint);
					break;
					case msg.UserInfoType.Level:
						DataManager.playerModel.getUserInfo().level=Number(data.valueint);
					break;
					case msg.UserInfoType.NewPlayerStep: //更新引导步骤
						DataManager.playerModel.getUserInfo().newplayerstep=Number(data.valueint);
					break;
					case msg.UserInfoType.Exp:
						//DataManager.playerModel.getUserInfo().=Number(data.valueint);
					break;
					
			}
			ApplicationFacade.getInstance().sendNotification(CommandName.UPDATE_USER_INFO, DataManager.playerModel.getUserInfo());
			NotificationCenter.postNotification(CommandName.UPDATE_USER_INFO);
		}

		public getUserInfo(): IUserInfo {
			return DataManager.playerModel.getUserInfo();
		}

		public renameTime: number = 5;

		public isGaming: boolean = false;

	}
}