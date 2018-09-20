var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 初始化模块服务器消息逻辑（主要与服务器通信）
 */
var InitServerHandler = (function () {
    function InitServerHandler() {
        this._isComplete = false;
        //------------------------------------------------------------------
        // 有顺序的，必须加载才能进游戏的
        //------------------------------------------------------------------
        this._isGeting = false;
    }
    Object.defineProperty(InitServerHandler.prototype, "isComplete", {
        get: function () {
            return this._isComplete;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// 进游戏前初始化调用
    /// </summary>
    /// <param name="loginInfo"></param>
    /// <param name="serverInfo"></param>
    /// <param name="complete"></param>
    /// <param name="error"></param>
    InitServerHandler.prototype.Invoke = function (loginInfo, serverInfo, complete, error) {
        this._isComplete = false;
        this._complete = complete;
        this._error = error;
        UserManager.serverInfo = serverInfo;
        SocketManager.Close();
        SocketManager.Initialize(loginInfo.userid, serverInfo.roleId, serverInfo.id, loginInfo.secret, loginInfo.session);
        this.RemoveEvents();
        SocketManager.OnConnect.addListener(this.OnSocketConnect, this);
        SocketManager.OnEnterError.addListener(this.OnEnterError, this);
        SocketManager.isEntering = true;
        SocketManager.pollingConnect(loginInfo.domain, loginInfo.port, true);
    };
    /// <summary>
    /// 当发送给服务器成功，在服务器返回之前断线，然后重连请求一样的session时候，重新拉数据
    /// </summary>
    InitServerHandler.prototype.AfreshGetInfo = function () {
        if (this._isGeting == false) {
            this._isGeting = true;
            if (!UIManager.isShowPanel(UIModuleName.LoadingSwitchPanel)) {
                UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
            }
            SocketManager.ImplCall(Command.Role_GetInfo_3000, null, this.OnRoleInfo, null, this);
        }
    };
    InitServerHandler.prototype.RemoveEvents = function () {
        SocketManager.OnConnect.removeListener(this.OnSocketConnect, this);
        SocketManager.OnEnterError.removeListener(this.OnEnterError, this);
    };
    InitServerHandler.prototype.OnSocketConnect = function () {
        if (!UIManager.isShowPanel(UIModuleName.LoadingSwitchPanel)) {
            UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
        }
        SocketManager.ImplCall(Command.Role_GetInfo_3000, null, this.OnRoleInfo, null, this);
    };
    InitServerHandler.prototype.OnEnterError = function () {
        this.DispatchError();
    };
    InitServerHandler.prototype.OnRoleInfo = function (result) {
        if (LoginManager.loginInfo.hasAlreadyCreateRole == false) {
            LoginManager.loginInfo.hasAlreadyCreateRole = true;
        }
        if (UserManager.serverInfo.roleId == 0) {
            //创建角色后，从socket里获取角色id
            UserManager.serverInfo.roleId = SocketManager.roleId;
        }
        //
        // LoggerManager.emailLogger.SetRoleId(SocketManager.roleId, _serverInfo.id);
        qin.Console.roleId = SocketManager.roleId;
        TimeManager.initialize(result.data);
        UserManager.initialize(SocketManager.roleId, result.data); //一定要用socket返回的roleId
        this.reqAwardInfo();
    };
    /**
     * 拉取兑换信息
     */
    InitServerHandler.prototype.reqAwardInfo = function () {
        SocketManager.ImplCall(Command.Award_GetInfo_3112, null, this.onReqAwardInfo, null, this);
    };
    InitServerHandler.prototype.onReqAwardInfo = function (result) {
        AwardManager.Initialize(result);
        this.reqItemList();
    };
    /**
     * 拉取物品列表
     */
    InitServerHandler.prototype.reqItemList = function () {
        SocketManager.ImplCall(Command.Req_ItemList_3020, null, this.onGetItemList, null, this);
    };
    InitServerHandler.prototype.onGetItemList = function (result) {
        ItemManager.initialize(result);
        this.reqFriendListInfo();
    };
    /**
    * 发送好友列表信息获取请求
    */
    InitServerHandler.prototype.reqFriendListInfo = function () {
        SocketManager.ImplCall(Command.Friend_GetList_3156, null, this.FriendListInfoResponse, null, this);
    };
    InitServerHandler.prototype.FriendListInfoResponse = function (result) {
        FriendManager.Initialize(result);
        this.reqAddFriendListInfo();
    };
    /**
     * 拉取好友申请列表
    */
    InitServerHandler.prototype.reqAddFriendListInfo = function () {
        SocketManager.ImplCall(Command.Friend_RequestList_3157, null, this.addFriendListInfoResponse, null, this);
    };
    InitServerHandler.prototype.addFriendListInfoResponse = function (result) {
        FriendManager.FriendRequestResponse(result);
        this.reqAchievementList();
    };
    /**
     * 拉取成就
     */
    InitServerHandler.prototype.reqAchievementList = function () {
        SocketManager.ImplCall(Command.Achievement_GetList_3090, { "roleId": UserManager.userInfo.roleId }, this.OnAchievementListInfo, null, this);
    };
    InitServerHandler.prototype.OnAchievementListInfo = function (result) {
        AchievementManager.initialize(result);
        AchieveProcessManager.Initialize(result);
        this.reqGetInsideRoomIdList();
    };
    InitServerHandler.prototype.reqGetInsideRoomIdList = function () {
        //拉取锦标赛赛事所在房间信息列表
        SocketManager.ImplCall(Command.InsideRoomInfoList_Req_3614, null, this.onGetInsideRoomListInfo, null, this);
    };
    InitServerHandler.prototype.onGetInsideRoomListInfo = function (result) {
        InsideRoomManager.initialize(result);
        this.reqGetMTTListInfo();
    };
    /**
     * 拉取锦标赛赛事列表信息
    */
    InitServerHandler.prototype.reqGetMTTListInfo = function () {
        SocketManager.ImplCall(Command.MTTList_Req_3611, null, this.onGetMTTListInfo, null, this);
    };
    InitServerHandler.prototype.onGetMTTListInfo = function (result) {
        ChampionshipManager.initialize(result);
        this.reqInviteAwardInfo();
    };
    /**
     * 拉取邀请奖励信息
    */
    InitServerHandler.prototype.reqInviteAwardInfo = function () {
        SocketManager.ImplCall(Command.InviteAward_Req_3714, null, this.onInviteAwardInfo, null, this);
    };
    InitServerHandler.prototype.onInviteAwardInfo = function (result) {
        InviteManager.initialize(result);
        this.reqGetMailList();
    };
    /**
     * 拉取邮件列表
     */
    InitServerHandler.prototype.reqGetMailList = function () {
        SocketManager.ImplCall(Command.Mail_GetList_3097, { "StartId": 0, "Count": GameSetting.MaxMailNum }, this.onGetMailList, null, this);
    };
    InitServerHandler.prototype.onGetMailList = function (result) {
        MailManager.Reset();
        MailManager.initialize(result, true);
        this.reqGetActivityList();
    };
    /**
     * 拉取活动列表 最后拉取
     */
    InitServerHandler.prototype.reqGetActivityList = function () {
        ActivityManager.OnActivityGetListEvent.addListener(this.onGetreqGetActivityList, this);
        ActivityManager.reqActivityInfo(0);
    };
    InitServerHandler.prototype.onGetreqGetActivityList = function (result) {
        ActivityManager.OnActivityGetListEvent.removeListener(this.onGetreqGetActivityList, this);
        ActivityManager.initialize(result);
        this.requestNotice();
    };
    /// <summary>
    /// 请求服务器推送 在所有拉取协议之后调用
    /// </summary>
    InitServerHandler.prototype.requestNotice = function () {
        //发送3004开启推送通知
        SocketManager.ImplCall(Command.System_GetNotice_3004, { sessionId: SocketManager.requestSessionMax }, this.onGetNotice, null, this);
    };
    InitServerHandler.prototype.onGetNotice = function () {
        SocketManager.isEntering = false; //进游戏结束,开启重连，提示正常处理
        this.DispatchComplete();
    };
    InitServerHandler.prototype.DispatchComplete = function () {
        // UIManager.closePanel(UIModuleName.LoadingSwitchPanel); //为了登录体验流畅
        this.RemoveEvents();
        this._isGeting = false;
        this._isComplete = true;
        if (this._complete != null) {
            this._complete();
            this._complete = null;
        }
    };
    InitServerHandler.prototype.DispatchError = function () {
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
        this.RemoveEvents();
        this._isGeting = false;
        if (this._error != null) {
            this._error();
            this._error = null;
        }
    };
    return InitServerHandler;
}());
__reflect(InitServerHandler.prototype, "InitServerHandler");
//# sourceMappingURL=InitServerHandler.js.map