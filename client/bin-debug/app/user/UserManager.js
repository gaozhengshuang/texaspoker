var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户信息管理
 */
var UserManager = (function () {
    function UserManager() {
    }
    /**
     * 重新登录
     */
    UserManager.resetByReLogin = function () {
        UserManager.userInfo = null;
        //qin.ArrayUtil.Clear(UserManager.achievementInfoList);
        UserManager.otherUserInfoClear();
    };
    UserManager.otherUserInfoClear = function () {
        if (UserManager.otherUserInfo) {
            UserManager.otherUserInfo.reset();
        }
    };
    UserManager.initialize = function (roleId, data) {
        UserManager.otherUserInfoClear();
        UserManager.userInfo = new UserInfo();
        UserManager.userInfo.copyValueFrom(data);
        if (data["lastGoldTime"] == undefined && data["createdTime"]) {
            UserManager.userInfo.lastGoldTime = data["createdTime"];
        }
        UserManager.playerNameOper(UserManager.userInfo);
        SocketManager.AddCommandListener(Command.Role_Push_ExpChange_2028, UserManager.onExpChangeResult, this);
        SocketManager.AddCommandListener(Command.Role_Push_PropertyChange_2000, UserManager.onPropetyChangeHandler, this);
        SocketManager.AddCommandListener(Command.Role_Push_HeadReviewPass_2120, UserManager.onHeadReviewPass, this);
        UserManager.setIsFirstLoginToday();
    };
    /**
     * 用户经验更改
     */
    UserManager.onExpChangeResult = function (result) {
        if (result.data) {
            if (UserManager.userInfo.level < ExpDefined.GetInstance().dataList[ExpDefined.GetInstance().dataList.length - 1].level && UserManager.userInfo.level != result.data["level"]) {
                UserManager.userInfo.level = result.data["level"];
                SoundManager.playEffect(MusicAction.levelup);
                TalkingDataManager.setLevel(UserManager.userInfo.level);
                UserManager.levelUpgrade.dispatch();
            }
            UserManager.userInfo.exp = result.data["exp"];
        }
    };
    UserManager.onPropetyChangeHandler = function (result) {
        if (result.data && UserManager.userInfo) {
            UserManager.setNumProperty("gold", result.data);
            UserManager.setNumProperty("diamond", result.data);
            UserManager.setNumProperty("safeGold", result.data);
            UserManager.propertyChangeEvent.dispatch();
        }
    };
    /**
     * 头像上传完毕推送
     */
    UserManager.onHeadReviewPass = function (result) {
        if (result.data && result.data["head"]) {
            UserManager.userInfo.head = result.data["head"];
            UserManager.headImageUpdateEvent.dispatch();
        }
    };
    /**
     * 仅限于number类型
     */
    UserManager.setNumProperty = function (name, source) {
        if (source[name]) {
            UserManager.userInfo[name] = source[name];
        }
        else {
            UserManager.userInfo[name] = 0;
        }
    };
    UserManager.reqGetOtherUserInfo = function (roleId, flag) {
        var callback = function (result) {
            if (!UserManager.otherUserInfo) {
                UserManager.otherUserInfo = new UserInfo();
            }
            if (result.data) {
                UserManager.playerNameOper(result.data);
                UserManager.otherUserInfo.copyValueFrom(result.data);
                AchievementManager.reqUserAchieveList(UserManager.otherUserInfo);
                if (flag == FriendUIType.FriendList || flag == FriendUIType.GiftList) {
                    FriendManager.getUserInfoResult(result, flag);
                }
                else {
                    UserManager.otherUserInfo.vipType = VipManager.getVipType(UserManager.otherUserInfo.vipTime, UserManager.otherUserInfo.yearVipTime);
                    UserManager.otherUserInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.otherUserInfo.vipType).speed;
                    UserManager.getOtherUserInfoEa.dispatch();
                }
            }
        };
        UserManager.sendGetUserInfo(roleId, callback);
    };
    UserManager.reqShowOtherUserInfoPanel = function (roleId) {
        var callback = function (result) {
            UserManager.otherUserInfo = new UserInfo();
            if (result.data) {
                UserManager.playerNameOper(result.data);
                UserManager.otherUserInfo.copyValueFrom(result.data);
                AchievementManager.reqUserAchieveList(UserManager.otherUserInfo);
                UserManager.otherUserInfo.vipType = VipManager.getVipType(UserManager.otherUserInfo.vipTime, UserManager.otherUserInfo.yearVipTime);
                UserManager.otherUserInfo.vipSpeed = ProjectDefined.GetInstance().getVipSpeedDefinition(UserManager.otherUserInfo.vipType).speed;
                UserManager.getOtherUserInfoEa.dispatch();
            }
            if (FriendManager.isFriend(UserManager.otherUserInfo.roleId)) {
                UIManager.showPanel(UIModuleName.UserInfoPanel);
            }
            else {
                UIManager.showPanel(UIModuleName.UserInfoPanel, { type: FriendInfoType.Send });
            }
        };
        UserManager.sendGetUserInfo(roleId, callback);
    };
    /**
     * 获取其他用户信息
     */
    UserManager.sendGetUserInfo = function (roleId, callback, errorCallBack) {
        SocketManager.call(Command.Friend_GetRoleInfo_3023, { "roleId": roleId }, callback, errorCallBack, this);
    };
    UserManager.reqSimpleUserInfo = function (roleId) {
        var callback = function (result) {
            UserManager.OnGetSimpleUserInfoEvent.dispatch(result.data);
        };
        SocketManager.call(Command.SimpleUserInfo_Req_3025, { roleId: roleId }, callback, null, this);
    };
    /**
     * 发送创建角色信息请求
    */
    UserManager.reqCreateRole = function (name, sex) {
        var callback = function (result) {
            if (name != null) {
                UserManager.userInfo.name = name;
            }
            if (sex != null) {
                UserManager.userInfo.sex = sex;
            }
            UserManager.onCreateRoleEvent.dispatch();
        };
        var obj = {};
        if (name != null) {
            obj["name"] = name;
        }
        if (sex != null) {
            obj["sex"] = sex;
        }
        SocketManager.call(Command.Role_Create_3012, obj, callback, null, this);
    };
    /**
     * 设置昵称
     */
    UserManager.editUserName = function (name) {
        UserManager.reqCreateRole(name, null);
    };
    /**
     * 设置用户基础信息
     */
    UserManager.reqSetUserInfo = function (sign, sex, age) {
        if (sign != null || sex != undefined || age != undefined) {
            var callBack = function (result) {
                if (obj_1["sign"] != null) {
                    UserManager.userInfo.sign = obj_1["sign"];
                }
                if (obj_1["sex"] != undefined) {
                    UserManager.userInfo.sex = obj_1["sex"];
                }
                if (obj_1["age"] != undefined) {
                    UserManager.userInfo.age = obj_1["age"];
                }
                UserManager.playerNameOper(UserManager.userInfo);
                UserManager.onSetUserInfoComplete.dispatch();
            };
            var obj_1 = {};
            if (sign != null) {
                obj_1["sign"] = sign;
            }
            if (sex != undefined) {
                obj_1["sex"] = sex;
            }
            if (age != undefined) {
                obj_1["age"] = age;
            }
            SocketManager.call(Command.Role_SetInfo_3609, obj_1, callBack, null, this);
        }
    };
    UserManager.playerNameOper = function (pInfo, propertyName, propertyId) {
        if (propertyName === void 0) { propertyName = "name"; }
        if (propertyId === void 0) { propertyId = "roleId"; }
        if (pInfo && pInfo.hasOwnProperty(propertyId)) {
            var tmpObj = pInfo;
            var pre = qin.StringConstants.Empty;
            if ((ChannelManager.loginType == ChannelLoginType.Guest || ChannelManager.loginType == ChannelLoginType.IntranetGuest) && tmpObj[propertyName] != "游客") {
                pre = "游客";
            }
            if (!tmpObj[propertyName]) {
                tmpObj[propertyName] = pre + "";
            }
            else {
                tmpObj[propertyName] = pre + tmpObj[propertyName];
            }
        }
    };
    /**
     * 获得用户状态
     */
    UserManager.getUserState = function (info) {
        if (info === UserManager.otherUserInfo) {
            if (info.isOffline != undefined && info.isOffline) {
                return UserState.Offline;
            }
            else if (info.stateId == 0) {
                return UserState.InGamehall;
            }
            else {
                var roomType = InsideRoomManager.getRoomType(info.stateId);
                switch (roomType) {
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
        else {
            if (SceneManager.sceneType == SceneType.Hall) {
                return UserState.InGamehall;
            }
            else if (SceneManager.sceneType == SceneType.Game) {
                if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
                    info.stateId = GamblingManager.roomInfo.id;
                    info.stateConfId = GamblingManager.roomInfo.definition.id;
                    if (GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
                        var matchRoomInfo = ChampionshipManager.getMatchRoomInfoByRoomId(GamblingManager.roomInfo.id);
                        if (InfoUtil.checkAvailable(matchRoomInfo)) {
                            UserManager.userInfo.stateConfId = matchRoomInfo.definition.id;
                        }
                        return UserState.InMatch;
                    }
                    else {
                        var roomType = InsideRoomManager.getRoomType(info.stateId);
                        switch (roomType) {
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
            else if (SceneManager.sceneType == SceneType.HundredWar) {
                return UserState.InHundredWar;
            }
            else {
                return UserState.InGamehall;
            }
        }
    };
    /**
     * 请求领取活动金币
     */
    UserManager.reqGetFreeGold = function () {
        PropertyManager.OpenGet();
        SocketManager.call(Command.Req_GetFreeGold_3024, null, this.onGetFreeGold, null, this);
    };
    UserManager.onGetFreeGold = function (result) {
        if (result.data) {
            PropertyManager.ShowItemList();
            UserManager.userInfo.lastGoldTime = result.data["lastGoldTime"];
            UserManager.getFreeGoldEvent.dispatch();
        }
    };
    /**
     * 请求绑定手机号
     */
    UserManager.reqBindPhone = function (mno) {
        SocketManager.callAsync(Command.PhoneBind_3688, { mno: mno }, function (result) {
            UserManager.userInfo.mno = mno;
            UIManager.showFloatTips("绑定手机成功");
            UserManager.bindPhoneEvent.dispatch();
        }, null, this);
    };
    Object.defineProperty(UserManager, "isBust", {
        /**
         * 是否破产
         */
        get: function () {
            if (UserManager.userInfo.gold <= 0 && UserManager.userInfo.safeGold <= 0) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager, "isFirstLoginToday", {
        /**
         * 是否为本日首次登录
         */
        get: function () {
            return UserManager._isFirstLoginToday;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置登录时间
     */
    UserManager.setIsFirstLoginToday = function () {
        var lastTime = PrefsManager.getNumber(PrefsManager.User_LastLoginTime, 0, true);
        if (lastTime == 0) {
            UserManager._isFirstLoginToday = true;
        }
        else {
            var now = TimeManager.GetServerLocalDateTime();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var lastDateTime = new Date(lastTime * 1000);
            if (lastDateTime < today) {
                UserManager._isFirstLoginToday = true;
            }
            else {
                UserManager._isFirstLoginToday = false;
            }
        }
        PrefsManager.setNumber(PrefsManager.User_LastLoginTime, TimeManager.GetServerUtcTimestamp(), true);
    };
    /**
     * 尝试上传微信头像
     */
    UserManager.tryUpLoadWxHead = function (url) {
        if (!UserManager._wxHeadHandler) {
            UserManager._wxHeadHandler = new WxHeadHandler();
        }
        UserManager._wxHeadHandler.headUrl = url;
        UserManager._wxHeadHandler.tryUpLoadHead();
    };
    /**
     * 等级升级事件
     */
    UserManager.levelUpgrade = new qin.DelegateDispatcher();
    /**
     * 资产变更事件
     */
    UserManager.propertyChangeEvent = new qin.DelegateDispatcher();
    /**
    * 创建角色成功事件/修改昵称事件
    */
    UserManager.onCreateRoleEvent = new qin.DelegateDispatcher();
    //---------------------------------------------
    // event
    //---------------------------------------------
    /**
     * 拉取用户信息事件
     */
    UserManager.getOtherUserInfoEa = new qin.DelegateDispatcher();
    /**
     * 设置用户信息完毕
     */
    UserManager.onSetUserInfoComplete = new qin.DelegateDispatcher();
    /**
     * 领取免费金币成功事件
     */
    UserManager.getFreeGoldEvent = new qin.DelegateDispatcher();
    /**
     * 头像更新事件
     */
    UserManager.headImageUpdateEvent = new qin.DelegateDispatcher();
    /**
     * 绑定手机事件
     */
    UserManager.bindPhoneEvent = new qin.DelegateDispatcher();
    /**
     * 拉取某个角色信息（简单）成功广播
    */
    UserManager.OnGetSimpleUserInfoEvent = new qin.DelegateDispatcher();
    /**
     * 微信登录，微信头像加载完毕事件
     */
    UserManager.onWxHeadLoadCompleteEvent = new qin.DelegateDispatcher();
    return UserManager;
}());
__reflect(UserManager.prototype, "UserManager");
//# sourceMappingURL=UserManager.js.map