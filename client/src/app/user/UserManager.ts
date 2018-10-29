/**
 * 用户信息管理
 */
class UserManager
{
	/**
	 * 玩家资料
	 */
	public static userInfo: UserInfo;
	/**
	 * 其他用户资料缓存
	 */
	public static otherUserInfo: UserInfo;
	/**
     * 等级升级事件
     */
	public static levelUpgrade: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 资产变更事件
	 */
	public static propertyChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();

	/**
 	* 创建角色成功事件/修改昵称事件
	*/
	public static onCreateRoleEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 微信头像处理
	 */
	private static _wxHeadHandler: WxHeadHandler;
	/**
	 * 重新登录
	 */
	public static resetByReLogin()
	{
		UserManager.userInfo = null;
		//game.ArrayUtil.Clear(UserManager.achievementInfoList);
		UserManager.otherUserInfoClear();
	}
	private static otherUserInfoClear()
	{
		if (UserManager.otherUserInfo)
		{
			UserManager.otherUserInfo.reset();
		}
	}
	public static initialize()
	{
		UserManager.otherUserInfoClear();
		// UserManager.userInfo = new UserInfo();
		// UserManager.userInfo.copyValueFrom(data); //move todo

		if (UserManager.userInfo.lastGoldTime == undefined) //move todo
		{
			UserManager.userInfo.lastGoldTime = UserManager.userInfo.tmlogin;
		}
		UserManager.playerNameOper(UserManager.userInfo);
		SocketManager.AddCommandListener(Command.Role_Push_ExpChange_2028, UserManager.onExpChangeResult, this);
		SocketManager.AddCommandListener(Command.RS2C_RolePushPropertyChange, UserManager.onPropetyChangeHandler, this);
		SocketManager.AddCommandListener(Command.Role_Push_HeadReviewPass_2120, UserManager.onHeadReviewPass, this);
		SocketManager.AddCommandListener(Command.GW2C_PushMsgNotify, UserManager.GW2C_PushMsgNotify, this);
		UserManager.setIsFirstLoginToday();
	}
	/**
	 * 用户经验更改
	 */
	public static onExpChangeResult(result: game.SpRpcResult)
	{
		if (result.data)
		{
			if (UserManager.userInfo.level < ExpDefined.GetInstance().dataList[ExpDefined.GetInstance().dataList.length - 1].level && UserManager.userInfo.level != result.data["level"])
			{
				UserManager.userInfo.level = result.data["level"];
				SoundManager.playEffect(MusicAction.levelup);
				TalkingDataManager.setLevel(UserManager.userInfo.level);
				UserManager.levelUpgrade.dispatch();
			}
			UserManager.userInfo.exp = result.data["exp"];
		}
	}
	public static onPropetyChangeHandler(result: game.SpRpcResult)
	{
		if (result.data && UserManager.userInfo)
		{
			UserManager.setNumProperty("gold", result.data);
			UserManager.setNumProperty("diamond", result.data);
			UserManager.setNumProperty("safeGold", result.data);
			UserManager.setNumProperty("yuanbao", result.data);
			UserManager.setNumProperty("silvercardtime", result.data);
			UserManager.setNumProperty("goldcardtime", result.data);
			UserManager.propertyChangeEvent.dispatch();
		}
	}
	/**
	 * 头像上传完毕推送
	 */
	public static onHeadReviewPass(result: game.SpRpcResult)
	{
		if (result.data && result.data["head"])
		{
			UserManager.userInfo.head = result.data["head"];
			UserManager.headImageUpdateEvent.dispatch();
		}
	}
	private static GW2C_PushMsgNotify(result: game.SpRpcResult)
	{
		let data: msg.GW2C_PushMsgNotify = result.data;
		AlertManager.showAlertByString(JianTFanTTranser.tryTraditionalized(data.text));
	}
	/**
	 * 仅限于number类型
	 */
	private static setNumProperty(name: string, source: any)
	{
		if (source[name])
		{
			UserManager.userInfo[name] = source[name];
		}
		else
		{
			UserManager.userInfo[name] = 0;
		}
	}
	public static reqGetOtherUserInfo(roleId: number, flag?: number)
	{
		let callback: Function = function (result: game.SpRpcResult)
		{
			if (!UserManager.otherUserInfo)
			{
				UserManager.otherUserInfo = new UserInfo();
			}
			if (result.data)
			{
				UserManager.otherUserInfo.copyValueFromIgnoreCase(result.data);
				UserManager.playerNameOper(UserManager.otherUserInfo);
				AchievementManager.reqUserAchieveList(UserManager.otherUserInfo);
				if (flag == FriendUIType.FriendList || flag == FriendUIType.GiftList)
				{
					FriendManager.getUserInfoResult(result, flag);
				}
				else
				{
					UserManager.otherUserInfo.vipType = VipManager.getVipType(UserManager.otherUserInfo.vipTime, UserManager.otherUserInfo.yearVipTime);
					UserManager.otherUserInfo.vipSpeed = ProjectDefined.getVipSpeedDefinition(UserManager.otherUserInfo.vipType).speed;
					UserManager.getOtherUserInfoEa.dispatch();
				}
			}
		}
		UserManager.sendGetUserInfo(roleId, callback);
	}
	public static reqShowOtherUserInfoPanel(roleId: number)
	{
		let callback: Function = function (result: game.SpRpcResult)
		{
			UserManager.otherUserInfo = new UserInfo();
			let data: msg.GW2C_RetPlayerRoleInfo = result.data;
			if (data)
			{
				UserManager.otherUserInfo.copyValueFromIgnoreCase(data);
				// UserManager.otherUserInfo.copyValueFromIgnoreCase(data.entity);
				// UserManager.otherUserInfo.copyValueFromIgnoreCase(data.vip);
				// UserManager.otherUserInfo.copyValueFromIgnoreCase(data.statistics);

				UserManager.playerNameOper(UserManager.otherUserInfo);

				AchievementManager.reqUserAchieveList(UserManager.otherUserInfo);
				UserManager.otherUserInfo.vipType = VipManager.getVipType(UserManager.otherUserInfo.vipTime, UserManager.otherUserInfo.yearVipTime);
				UserManager.otherUserInfo.vipSpeed = ProjectDefined.getVipSpeedDefinition(UserManager.otherUserInfo.vipType).speed;
				UserManager.getOtherUserInfoEa.dispatch();
			}
			if (FriendManager.isFriend(UserManager.otherUserInfo.roleId))
			{
				UIManager.showPanel(UIModuleName.UserInfoPanel);
			}
			else
			{
				UIManager.showPanel(UIModuleName.UserInfoPanel, { type: FriendInfoType.Send });
			}
		}
		UserManager.sendGetUserInfo(roleId, callback);
	}

	/**
	 * 获取其他用户信息
	 */
	public static sendGetUserInfo(roleId: number, callback: Function, errorCallBack?: Function, isShowTips: boolean = true)
	{
		// if (isInRoom)
		// {
		// 	MsgTransferSend.sendRoomProto(Command.C2GW_ReqPlayerRoleInfo, { roleid: roleId }, callback, errorCallBack, this);
		// }
		// else
		// {

		// if (roleId > 200)
		// {
		SocketManager.call(Command.C2GW_ReqPlayerRoleInfo, { roleid: roleId }, callback, errorCallBack, this);
		// }
		// else if (isShowTips)
		// {
		// 	UIManager.showFloatTips("玩家信息为私密！");
		// }

		// }
	}

	public static reqSimpleUserInfo(roleId: number)
	{
		// let callback: Function = function (result: game.SpRpcResult)
		// {
		// 	UserManager.OnGetSimpleUserInfoEvent.dispatch(result.data);
		// }
		// SocketManager.call(Command.SimpleUserInfo_Req_3025, { roleId: roleId }, callback, null, this);
	}
	/**
	 * 发送创建角色信息请求
	*/
	public static reqCreateRole(name: string, sex: number)
	{
		let callback: Function = function (result: game.SpRpcResult)
		{
			if (name != null)
			{
				UserManager.userInfo.name = name;
			}
			if (sex != null)
			{
				UserManager.userInfo.sex = sex;
			}
			UserManager.onCreateRoleEvent.dispatch();
		};
		let obj: Object = {};
		if (name != null)
		{
			obj["name"] = name;
		}
		if (sex != null)
		{
			obj["sex"] = sex;
		}
		SocketManager.call(Command.Role_Create_3012, obj, callback, null, this);
	}

	/**
	 * 设置昵称
	 */
	public static editUserName(name: string)
	{
		UserManager.reqCreateRole(name, null);
	}
	/**
	 * 设置用户基础信息
	 */
	public static reqSetUserInfo(sign: string, sex: number, age: number)
	{
		if (sign != null || sex != undefined || age != undefined)
		{
			let callBack: Function = function (result: game.SpRpcResult)
			{
				if (obj["sign"] != null)
				{
					UserManager.userInfo.sign = obj["sign"];
				}
				if (obj["sex"] != undefined)
				{
					UserManager.userInfo.sex = obj["sex"];
				}
				if (obj["age"] != undefined)
				{
					UserManager.userInfo.age = obj["age"];
				}
				UserManager.playerNameOper(UserManager.userInfo);
				UserManager.onSetUserInfoComplete.dispatch();
			};
			let obj: Object = {};
			if (sign != null)
			{
				obj["sign"] = sign;
			}
			if (sex != undefined)
			{
				obj["sex"] = sex;
			}
			if (age != undefined)
			{
				obj["age"] = age;
			}
			SocketManager.call(Command.Role_SetInfo_3609, obj, callBack, null, this);
		}
	}
	public static playerNameOper(pInfo: Object, propertyName: string = "name", propertyId: string = "roleId")
	{
		if (pInfo && pInfo.hasOwnProperty(propertyId))
		{
			let tmpObj: any = pInfo;
			let pre: string = game.StringConstants.Empty;
			if ((ChannelManager.loginType == ChannelLoginType.Guest || ChannelManager.loginType == ChannelLoginType.IntranetGuest) && tmpObj[propertyName] != "游客")
			{
				pre = "游客";
			}
			if (!tmpObj[propertyName])
			{
				tmpObj[propertyName] = pre + "";
			}
			else
			{
				tmpObj[propertyName] = pre + tmpObj[propertyName];
			}
		}
	}
	/**
	 * 获得用户状态
	 */
	public static getUserState(info: UserInfo): UserState
	{
		if (info === UserManager.otherUserInfo)
		{
			if (info.isOffline != undefined && info.isOffline)
			{
				return UserState.Offline;
			}
			else if (info.stateId == 0)
			{
				return UserState.InGamehall;
			}
			else
			{
				let roomType: InsideRoomType = InsideRoomManager.getRoomType(info.stateId);
				switch (roomType)
				{
					case InsideRoomType.Game:
						return UserState.InGame;
					case InsideRoomType.GamePerson:
						return UserState.InGamePerson;
					case InsideRoomType.HundredWar:
						return UserState.InHundredWar;
					case InsideRoomType.Match:
						return UserState.InMatch;
					case InsideRoomType.Omaha:
						return UserState.InOmaha;
					case InsideRoomType.OmahaPerson:
						return UserState.InOmahaPerson;
				}
				return UserState.InGamehall;
			}
		}
		else
		{
			if (SceneManager.sceneType == SceneType.Hall)
			{
				return UserState.InGamehall;
			}
			else if (SceneManager.sceneType == SceneType.Game)
			{
				if (InfoUtil.checkAvailable(GamblingManager.roomInfo))
				{
					info.stateId = GamblingManager.roomInfo.id;
					info.stateConfId = GamblingManager.roomInfo.definition.Id;
					if (GamblingManager.roomInfo.gamblingType == GamblingType.Match)
					{
						let matchRoomInfo: MatchRoomInfo = ChampionshipManager.getMatchRoomInfoByRoomId(GamblingManager.roomInfo.id);
						if (InfoUtil.checkAvailable(matchRoomInfo))
						{
							UserManager.userInfo.stateConfId = matchRoomInfo.definition.Id;
						}
						return UserState.InMatch;
					}
					else
					{
						let roomType: InsideRoomType = InsideRoomManager.getRoomType(info.stateId);
						switch (roomType)
						{
							case InsideRoomType.Game:
								return UserState.InGame;
							case InsideRoomType.GamePerson:
								return UserState.InGamePerson;
							case InsideRoomType.Omaha:
								return UserState.InOmaha;
							case InsideRoomType.OmahaPerson:
								return UserState.InOmahaPerson;
						}
						return UserState.InGame;
					}
				}
			}
			else if (SceneManager.sceneType == SceneType.HundredWar)
			{
				return UserState.InHundredWar;
			}
			else
			{
				return UserState.InGamehall;
			}
		}
	}
	/**
	 * 请求领取活动金币
	 */
	public static reqGetFreeGold()
	{
		PropertyManager.OpenGet();
		SocketManager.call(Command.C2GW_ReqGetFreeGold, {}, this.onGetFreeGold, null, this);
	}
	private static onGetFreeGold(result: game.SpRpcResult)
	{
		if (result.data)
		{
			PropertyManager.ShowItemList();
			UserManager.userInfo.lastGoldTime = result.data["lastgoldtime"];
			UserManager.getFreeGoldEvent.dispatch();
		}
	}
	/**
	 * 请求绑定手机号
	 */
	public static reqBindPhone(mno: string)
	{
		SocketManager.callAsync(Command.PhoneBind_3688, { mno: mno }, (result: game.SpRpcResult) =>
		{
			UserManager.userInfo.mno = mno;
			UIManager.showFloatTips("绑定手机成功");
			UserManager.bindPhoneEvent.dispatch();
		}, null, this);
	}
	/**
	 * 是否破产
	 */
	public static get isBust(): boolean
	{
		if (UserManager.userInfo.gold <= 0 && UserManager.userInfo.safeGold <= 0)
		{
			return true;
		}
		return false;
	}

	private static _isFirstLoginToday: boolean;
	/**
	 * 是否为本日首次登录
	 */
	public static get isFirstLoginToday(): boolean
	{
		return UserManager._isFirstLoginToday;
	}
	/**
	 * 设置登录时间
	 */
	private static setIsFirstLoginToday()
	{
		let lastTime: number = PrefsManager.getNumber(PrefsManager.User_LastLoginTime, 0, true);
		if (lastTime == 0)
		{
			UserManager._isFirstLoginToday = true;
		}
		else
		{
			let now: Date = TimeManager.GetServerLocalDateTime();
			let today: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			let lastDateTime: Date = new Date(lastTime * 1000);
			if (lastDateTime < today)
			{
				UserManager._isFirstLoginToday = true;
			}
			else
			{
				UserManager._isFirstLoginToday = false;
			}
		}
		PrefsManager.setNumber(PrefsManager.User_LastLoginTime, TimeManager.GetServerUtcSecondstamp(), true);
	}
	/**
	 * 尝试上传微信头像
	 */
	public static tryUpLoadWxHead(url: string)
	{
		if (!UserManager._wxHeadHandler)
		{
			UserManager._wxHeadHandler = new WxHeadHandler();
		}
		UserManager._wxHeadHandler.headUrl = url;
		UserManager._wxHeadHandler.tryUpLoadHead();
	}
	//---------------------------------------------
	// event
	//---------------------------------------------
	/**
	 * 拉取用户信息事件
	 */
	public static getOtherUserInfoEa: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 设置用户信息完毕
	 */
	public static onSetUserInfoComplete: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 领取免费金币成功事件
	 */
	public static getFreeGoldEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 头像更新事件
	 */
	public static headImageUpdateEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 绑定手机事件
	 */
	public static bindPhoneEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
     * 拉取某个角色信息（简单）成功广播
    */
	// public static OnGetSimpleUserInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
	/**
	 * 微信登录，微信头像加载完毕事件
	 */
	public static onWxHeadLoadCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}
