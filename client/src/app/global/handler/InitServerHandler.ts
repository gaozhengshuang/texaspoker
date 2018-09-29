/**
 * 初始化模块服务器消息逻辑（主要与服务器通信）
 */
class InitServerHandler
{
	private _isComplete: boolean = false;
	public get isComplete(): boolean
	{
		return this._isComplete;
	}

	//------------------------------------------------------------------
	// 有顺序的，必须加载才能进游戏的
	//------------------------------------------------------------------

	private _isGeting: boolean = false;
	private _complete: Function;
	private _error: Function;


	/// <summary>
	/// 进游戏前初始化调用
	/// </summary>
	/// <param name="loginInfo"></param>
	/// <param name="serverInfo"></param>
	/// <param name="complete"></param>
	/// <param name="error"></param>
	public Invoke(complete: Function, error: Function)
	{
		this._isComplete = false;
		this._complete = complete;
		this._error = error;
		this.startReqHandler();
	}
	/// <summary>
	/// 当发送给服务器成功，在服务器返回之前断线，然后重连请求一样的session时候，重新拉数据
	/// </summary>
	public AfreshGetInfo()
	{
		// if (this._isGeting == false) //move todo
		// {
		// 	this._isGeting = true;
		// 	if (!UIManager.isShowPanel(UIModuleName.LoadingSwitchPanel))
		// 	{
		// 		UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
		// 	}
		// 	SocketManager.ImplCall(Command.Role_GetInfo_3000, null, this.OnRoleInfo, null, this);
		// }
	}
	/**
	 * 拉去列表系统数据
	 */
	private startReqHandler()
	{
		if (!UIManager.isShowPanel(UIModuleName.LoadingSwitchPanel))
		{
			UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
		}
		game.Console.roleId = UserManager.userInfo.roleId;
		UserManager.initialize();
		// this.reqAwardInfo();
		this.reqGetInsideRoomIdList();
	}
	/**
	 * 拉取兑换信息
	 */
	private reqAwardInfo()
	{
		SocketManager.ImplCall(Command.Award_GetInfo_3112, null, this.onReqAwardInfo, null, this);
	}

	private onReqAwardInfo(result: game.SpRpcResult)
	{
		AwardManager.Initialize(result);
		this.reqItemList();
	}
	/**
	 * 拉取物品列表
	 */
	private reqItemList()
	{
		SocketManager.ImplCall(Command.Req_ItemList_3020, null, this.onGetItemList, null, this);
	}
	private onGetItemList(result: game.SpRpcResult)
	{
		ItemManager.initialize(result);
		this.reqFriendListInfo();
	}
	/**
	* 发送好友列表信息获取请求
	*/
	private reqFriendListInfo()
	{
		SocketManager.ImplCall(Command.Friend_GetList_3156, null, this.FriendListInfoResponse, null, this);
	}
	private FriendListInfoResponse(result: game.SpRpcResult)
	{
		FriendManager.Initialize(result);
		this.reqAddFriendListInfo();
	}
	/**
	 * 拉取好友申请列表
	*/
	private reqAddFriendListInfo()
	{
		SocketManager.ImplCall(Command.Friend_RequestList_3157, null, this.addFriendListInfoResponse, null, this);
	}
	private addFriendListInfoResponse(result: game.SpRpcResult)
	{
		FriendManager.FriendRequestResponse(result);
		this.reqAchievementList();
	}
	/**
	 * 拉取成就
	 */
	private reqAchievementList()
	{
		SocketManager.ImplCall(Command.Achievement_GetList_3090, { "roleId": UserManager.userInfo.roleId }, this.OnAchievementListInfo, null, this);
	}

	private OnAchievementListInfo(result: game.SpRpcResult)
	{
		AchievementManager.initialize(result);
		AchieveProcessManager.Initialize(result);
		this.reqGetInsideRoomIdList();
	}
	private reqGetInsideRoomIdList()
	{
		//拉取锦标赛赛事所在房间信息列表
		SocketManager.ImplCall(Command.C2GW_ReqUserRoomInfo, {}, this.onGetInsideRoomListInfo, null, this);
	}
	private onGetInsideRoomListInfo(result: game.SpRpcResult)
	{
		InsideRoomManager.initialize(result);
		//活动列表数据 move todo 不应该在这边拉，活动的数据需要最后拉去
		this.reqGetMailList();
		// this.reqGetMTTListInfo();
	}
	/**
	 * 拉取锦标赛赛事列表信息
	*/
	private reqGetMTTListInfo()
	{
		SocketManager.ImplCall(Command.MTTList_Req_3611, null, this.onGetMTTListInfo, null, this);
	}
	private onGetMTTListInfo(result: game.SpRpcResult)
	{
		ChampionshipManager.initialize(result);
		this.reqInviteAwardInfo();
	}
	/**
	 * 拉取邀请奖励信息
	*/
	private reqInviteAwardInfo()
	{
		SocketManager.ImplCall(Command.InviteAward_Req_3714, null, this.onInviteAwardInfo, null, this);
	}
	private onInviteAwardInfo(result: game.SpRpcResult)
	{
		InviteManager.initialize(result);
		// this.reqGetMailList();
	}
	/**
	 * 拉取邮件列表
	 */
	private reqGetMailList()
	{
		SocketManager.ImplCall(Command.C2GW_ReqMailList, { "startId": 0, "count": GameSetting.MaxMailNum }, this.onGetMailList, null, this);
	}
	private onGetMailList(result: game.SpRpcResult)
	{
		MailManager.Reset();
		MailManager.initialize(result);
		this.reqGetActivityList();
	}
	/**
	 * 拉取活动列表 最后拉取
	 */
	private reqGetActivityList()
	{
		ActivityManager.OnActivityGetListEvent.addListener(this.onGetreqGetActivityList, this);
		ActivityManager.reqActivityInfo(0);
	}
	private onGetreqGetActivityList(result: game.SpRpcResult)
	{
		ActivityManager.OnActivityGetListEvent.removeListener(this.onGetreqGetActivityList, this);
		ActivityManager.initialize(result);
		this.requestNotice();
	}

	private requestNotice()
	{
		SocketManager.isEntering = false;//进游戏结束,开启重连，提示正常处理
		this.DispatchComplete();
	}

	private DispatchComplete()
	{
		// UIManager.closePanel(UIModuleName.LoadingSwitchPanel); //为了登录体验流畅
		this._isGeting = false;
		this._isComplete = true;
		if (this._complete != null) 
		{
			this._complete();
			this._complete = null;
		}
	}
	private DispatchError()
	{
		UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
		this._isGeting = false;
		if (this._error != null)
		{
			this._error();
			this._error = null;
		}
	}
}
