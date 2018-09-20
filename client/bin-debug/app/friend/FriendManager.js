var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 好友管理
*/
var FriendManager = (function () {
    function FriendManager() {
    }
    /**
     * 重置数据
    */
    FriendManager.reset = function () {
        qin.ArrayUtil.Clear(FriendManager.friendList);
        qin.ArrayUtil.Clear(FriendManager.requestFriendList);
        qin.ArrayUtil.Clear(FriendManager.giftList);
        qin.ArrayUtil.Clear(FriendManager.searchList);
        FriendManager._requestAdd = 0;
        FriendManager._addFriendsRequestInfo = null;
        qin.ArrayUtil.Clear(FriendManager.requestNewsList);
    };
    FriendManager.addRecListener = function () {
        SocketManager.AddCommandListener(Command.Friend_Push_AddSuccess_2036, FriendManager.onAddFriendSuccessRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_BeDel_2035, FriendManager.onDelFriendSuccessRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_OnlineState_2064, FriendManager.onOnlineStateChangeRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_GiveGold_2037, FriendManager.onGiveGoldRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_RequestFriend_2038, FriendManager.onRequestFriendRec, this);
        SocketManager.AddCommandListener(Command.Friend_Push_Invite_2111, FriendManager.pushInviteMsgHandler, this);
        SocketManager.AddCommandListener(Command.Friend_Push_Reset_2015, FriendManager.onResetPush, this);
    };
    /**
     * 初始化好友列表信息
     */
    FriendManager.Initialize = function (result) {
        FriendManager.reset();
        FriendManager.addRecListener();
        FriendManager.friendList = new Array();
        if (!FriendManager.giftList) {
            FriendManager.giftList = new Array();
        }
        if (!FriendManager._givenGoldRoleIdList) {
            FriendManager._givenGoldRoleIdList = new Array();
        }
        if (result.data["friendList"]) {
            for (var _i = 0, _a = result.data["friendList"]; _i < _a.length; _i++) {
                var friendInfo = _a[_i];
                var info = new FriendInfo();
                info.copyValueFrom(friendInfo);
                FriendManager.friendList.push(info);
                if (friendInfo.getGold == 1) {
                    FriendManager.giftList.push(info);
                }
                if (friendInfo.giveGold) {
                    FriendManager._givenGoldRoleIdList.push(friendInfo.roleId);
                }
            }
        }
    };
    /**
     * 发送获取好友列表请求
    */
    FriendManager.reqFriendListInfo = function () {
        SocketManager.call(Command.Friend_GetList_3156, null, FriendManager.FriendListInfoResponse, null, this);
    };
    FriendManager.FriendListInfoResponse = function (result) {
        if (result.data && result.data["friendList"]) {
            qin.ArrayUtil.Clear(FriendManager.friendList);
            for (var _i = 0, _a = result.data["friendList"]; _i < _a.length; _i++) {
                var friendInfo = _a[_i];
                var info = new FriendInfo();
                info.copyValueFrom(friendInfo);
                FriendManager.friendList.push(info);
            }
            FriendManager.onGetFriendListEvent.dispatch();
        }
    };
    /**
     * 发送赠送好友金币请求
    */
    FriendManager.reqGiveFriendGold = function (id) {
        var callback = function (result) {
            SoundManager.playEffect(MusicAction.gift_send);
            FriendManager.onGiveFriendGoldEvent.dispatch(id);
            for (var _i = 0, _a = FriendManager.friendList; _i < _a.length; _i++) {
                var friendInfo = _a[_i];
                if (friendInfo.roleId == id) {
                    friendInfo.giveGold = 1;
                    break;
                }
            }
            if (!FriendManager.isExitInRoleIdList(id)) {
                FriendManager._givenGoldRoleIdList.push(id);
            }
        };
        SocketManager.call(Command.Friend_GiveGold_3151, { roleId: id }, callback, null, this);
    };
    /**
     * 判断roleId是否已经存在在当天赠送过金币的用户id数组中
    */
    FriendManager.isExitInRoleIdList = function (roleId) {
        var flag = false;
        for (var _i = 0, _a = FriendManager._givenGoldRoleIdList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info == roleId) {
                flag = true;
            }
        }
        return flag;
    };
    /**
     * 发送领取好友赠送的金币请求
    */
    FriendManager.reqReceiveGift = function (id) {
        var callback = function (result) {
            if (id == 0) {
                FriendManager.giftList = [];
            }
            else {
                for (var i = 0; i < FriendManager.giftList.length; i++) {
                    if (id == FriendManager.giftList[i].roleId) {
                        FriendManager.giftList.splice(i, 1);
                        break;
                    }
                }
            }
            SoundManager.playEffect(MusicAction.gift_recv);
            FriendManager.onReceiveGiftEvent.dispatch();
        };
        PropertyManager.OpenGet();
        SocketManager.call(Command.Friend_ReceiveGift_3150, { roleId: id }, callback, null, this);
    };
    /**
    * 发送获取好友请求列表的请求
   */
    FriendManager.reqFriendRequest = function () {
        SocketManager.call(Command.Friend_RequestList_3157, null, FriendManager.FriendRequestResponse, null, this);
    };
    FriendManager.FriendRequestResponse = function (result) {
        if (result.data.Array) {
            qin.ArrayUtil.Clear(FriendManager.requestFriendList);
            if (!FriendManager.requestFriendList) {
                FriendManager.requestFriendList = new Array();
            }
            for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                var requestInfo = _a[_i];
                var info = new BaseFriendInfo();
                info.copyValueFrom(requestInfo);
                FriendManager.requestFriendList.push(info);
            }
            FriendManager.onFriendRequestEvent.dispatch();
        }
    };
    /**
     * 发送接受或拒绝好友请求的请求
    */
    FriendManager.reqReceiveFriendRequest = function (id, isReceive) {
        var callback = function (result) {
            if (isReceive) {
                UIManager.showFloatTips("您已成功添加此好友。");
            }
            else {
                UIManager.showFloatTips("您已拒绝此条好友申请。");
            }
            for (var i = 0; i < FriendManager.requestFriendList.length; i++) {
                if (FriendManager.requestFriendList[i].roleId == id) {
                    FriendManager.requestFriendList.splice(i, 1);
                    break;
                }
            }
            FriendManager.onReceiveFriendRequestEvent.dispatch();
        };
        var IsAccept = (isReceive == 1) ? true : false;
        SocketManager.call(Command.Friend_Receive_3154, { roleId: id, IsAccept: IsAccept }, callback, null, this);
    };
    /**
     * 发送查询好友的请求
    */
    FriendManager.reqSearchPlayer = function (text) {
        var callback = function (result) {
            if (result.data.Array) {
                if (text) {
                    qin.ArrayUtil.Clear(FriendManager.searchList);
                    if (!FriendManager.searchList) {
                        FriendManager.searchList = new Array();
                    }
                    for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                        var searchInfo = _a[_i];
                        var info = new BaseFriendInfo();
                        info.copyValueFrom(searchInfo);
                        FriendManager.searchList.push(info);
                    }
                }
                else {
                    if (!FriendManager.recList) {
                        FriendManager.recList = new Array();
                        for (var _b = 0, _c = result.data.Array; _b < _c.length; _b++) {
                            var rec = _c[_b];
                            var recInfo = new BaseFriendInfo();
                            recInfo.copyValueFrom(rec);
                            FriendManager.recList.push(recInfo);
                        }
                    }
                }
                FriendManager.onSearchPlayerEvent.dispatch(text);
            }
            else {
                AlertManager.showAlert("此用户名或者ID不存在");
            }
        };
        SocketManager.call(Command.Friend_SearchPlayer_3153, { Val: text }, callback, null, this);
    };
    /**
     * 发送添加好友的请求
    */
    FriendManager.reqAddPlayer = function (id) {
        var callback = function (result) {
            UIManager.showFloatTips("已向对方发送好友申请。");
            if (FriendManager.recList && FriendManager.recList.length > 0) {
                for (var i = 0; i < FriendManager.recList.length; i++) {
                    if (FriendManager.recList[i].roleId == id) {
                        FriendManager.recList.splice(i, 1);
                        break;
                    }
                }
            }
            FriendManager.onAddPlayerEvent.dispatch(id);
        };
        if (!FriendManager.isFriend(id)) {
            if (FriendManager.isFriendFull(true)) {
                SocketManager.call(Command.Friend_AddPlayer_3152, { roleId: id }, callback, null, this);
            }
        }
        else {
            AlertManager.showAlertByString("该用户已是您的好友");
        }
    };
    /**
     * 发送删除好友的请求
    */
    FriendManager.reqRemovePlayer = function (id) {
        var callback = function (result) {
            for (var i = 0; i < FriendManager.friendList.length; i++) {
                if (id == FriendManager.friendList[i].roleId) {
                    FriendManager.friendList.splice(i, 1);
                    break;
                }
            }
            FriendManager.refreshGiftList(id);
            UIManager.closePanel(UIModuleName.UserInfoPanel);
            FriendManager.onRemovePlayerEvent.dispatch();
        };
        if (FriendManager.isFriend(id)) {
            SocketManager.call(Command.Friend_DelPlayer_3155, { roleId: id }, callback, null, this);
        }
        else {
            qin.Console.log("删除的用户不是您的好友,id:" + id);
        }
    };
    /**
     * 拉取用户信息返回
     */
    FriendManager.getUserInfoResult = function (result, flag) {
        if (flag == FriendUIType.FriendList) {
            var newFriendInfo = new FriendInfo();
            newFriendInfo.copyValueFrom(result.data);
            if (FriendManager.isExitInRoleIdList(result.data.roleId)) {
                newFriendInfo.giveGold = 1;
            }
            FriendManager.friendList.push(newFriendInfo);
            FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.FriendList);
        }
        else if (flag == FriendUIType.GiftList) {
            if (!FriendManager.giftList) {
                FriendManager.giftList = new Array();
            }
            if (FriendManager.isExistInGiftList(result.data.roleId) == false) {
                var newGiveGoldFriendIndo = new BaseFriendInfo();
                newGiveGoldFriendIndo.copyValueFrom(result.data);
                FriendManager.giftList.push(newGiveGoldFriendIndo);
                FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.GiftList);
            }
        }
    };
    /**
     * 请求邀请好友
     */
    FriendManager.reqInviteFriend = function (roomId, roleIds) {
        var callback = function (result) {
            FriendManager.InviteFriendEvent.dispatch();
        };
        SocketManager.call(Command.Req_SendGameInvite_3608, { "id": roomId, "roleId": roleIds }, callback, null, this);
    };
    /**********服务器推送通知的相应操作****************/
    /**
     * 0点定时重置推送对应的操作
    */
    FriendManager.onResetPush = function (result) {
        if (FriendManager.friendList) {
            for (var _i = 0, _a = FriendManager.friendList; _i < _a.length; _i++) {
                var friendInfo = _a[_i];
                friendInfo.giveGold = 0;
            }
        }
        qin.ArrayUtil.Clear(FriendManager._givenGoldRoleIdList);
    };
    /**
     * 对方同意好友添加请求的推送对应的操作
    */
    FriendManager.onAddFriendSuccessRec = function (result) {
        if (result.data['roleId']) {
            UserManager.reqGetOtherUserInfo(result.data['roleId'], FriendUIType.FriendList);
        }
    };
    /**
     * 被好友删除的推送对应的操作
    */
    FriendManager.onDelFriendSuccessRec = function (result) {
        if (result.data) {
            for (var i = 0; i < FriendManager.friendList.length; i++) {
                if (result.data["roleId"] == FriendManager.friendList[i].roleId) {
                    FriendManager.friendList.splice(i, 1);
                    FriendManager.refreshGiftList(result.data["roleId"]);
                    break;
                }
            }
        }
    };
    /**
     * 当被好友删除时刷新收到的礼物数据
    */
    FriendManager.refreshGiftList = function (roleId) {
        if (FriendManager.giftList && FriendManager.giftList.length > 0) {
            for (var i = 0; i < FriendManager.giftList.length; i++) {
                if (FriendManager.giftList[i].roleId == roleId) {
                    FriendManager.giftList.splice(i, 1);
                    break;
                }
            }
        }
        FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.FriendList);
    };
    /**
     * 好友在线状态改变推送对应的操作
    */
    FriendManager.onOnlineStateChangeRec = function (result) {
        if (result.data) {
            for (var i = 0; i < FriendManager.friendList.length; i++) {
                if (result.data["roleId"] == FriendManager.friendList[i].roleId) {
                    FriendManager.friendList[i].offlineTime = result.data["offlineTime"];
                    FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.FriendList);
                    break;
                }
            }
        }
    };
    /**
     * 好友赠送金币推送对应的操作
    */
    FriendManager.onGiveGoldRec = function (result) {
        if (result.data["roleId"]) {
            UserManager.reqGetOtherUserInfo(result.data['roleId'], FriendUIType.GiftList);
        }
    };
    /**
     * 好友申请推送对应的操作
    */
    FriendManager.onRequestFriendRec = function (result) {
        if (result.data) {
            var info = new BaseFriendInfo();
            info.copyValueFrom(result.data);
            if (!FriendManager.requestFriendList) {
                FriendManager.requestFriendList = new Array();
            }
            for (var i = 0; i < FriendManager.requestFriendList.length; i++) {
                if (info["roleId"] == FriendManager.requestFriendList[i].roleId) {
                    return;
                }
            }
            FriendManager.requestFriendList.push(info);
            if (FriendManager.requestNewsList) {
                FriendManager._requestAdd = FriendManager.requestNewsList.length;
            }
            else {
                FriendManager._requestAdd = 0;
            }
            FriendManager._addFriendsRequestInfo = new RequestNewsInfo(FriendMsgType.RequireMsg, result.data);
            UIManager.showPanel(UIModuleName.FriendMsgPanel, FriendManager._addFriendsRequestInfo);
            FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.RequestList);
        }
    };
    /**
     * 好友邀请信息推送
    */
    FriendManager.pushInviteMsgHandler = function (result) {
        if (result.data) {
            if (!FriendManager.requestNewsList) {
                FriendManager.requestNewsList = new Array();
            }
            FriendManager.requestNewsList.push(new RequestNewsInfo(FriendMsgType.InviteMsg, result.data));
            var requestInfo = FriendManager.getFriendMsgInfo();
            if (requestInfo) {
                UIManager.showPanel(UIModuleName.FriendMsgPanel, requestInfo);
            }
        }
    };
    FriendManager.removeFriendMsgInfo = function (rInfo) {
        if (rInfo) {
            if (rInfo.type == FriendMsgType.InviteMsg) {
                if (FriendManager.requestNewsList) {
                    for (var i = FriendManager.requestNewsList.length - 1; i >= 0; i--) {
                        var info = FriendManager.requestNewsList[i];
                        if (rInfo == info) {
                            FriendManager.requestNewsList.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            else if (rInfo.type == FriendMsgType.RequireMsg) {
                FriendManager._addFriendsRequestInfo = null;
            }
        }
    };
    FriendManager.getFriendMsgInfo = function () {
        var nowTime = TimeManager.GetServerUtcTimestamp();
        if (FriendManager._addFriendsRequestInfo) {
            if (nowTime - FriendManager._addFriendsRequestInfo.time > FriendManager.msgTime) {
                FriendManager._addFriendsRequestInfo = null;
            }
            else if (!FriendManager.requestNewsList || FriendManager._requestAdd >= FriendManager.requestNewsList.length) {
                return FriendManager._addFriendsRequestInfo;
            }
        }
        if (FriendManager.requestNewsList && FriendManager.requestNewsList.length > 0) {
            for (var i = FriendManager.requestNewsList.length - 1; i >= 0; i--) {
                var info = FriendManager.requestNewsList[i];
                if (nowTime - info.time > FriendManager.msgTime) {
                    FriendManager.requestNewsList.splice(0, i + 1);
                    break;
                }
            }
            if (FriendManager.requestNewsList.length > 0) {
                return FriendManager.requestNewsList[FriendManager.requestNewsList.length - 1];
            }
        }
        return null;
    };
    /**
     * 判断是不是好友
    */
    FriendManager.isFriend = function (id) {
        if (FriendManager.friendList && FriendManager.friendList.length > 0) {
            for (var _i = 0, _a = FriendManager.friendList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.roleId == id) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 查找好友
     */
    FriendManager.getFriendInfoById = function (id) {
        for (var _i = 0, _a = FriendManager.friendList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.roleId == id) {
                return info;
            }
        }
        return null;
    };
    /**
     * 判断好友数量是否已达上限
    */
    FriendManager.isFriendFull = function (isShowAlert) {
        if (isShowAlert === void 0) { isShowAlert = false; }
        var maxNum;
        var vipDef;
        if (VipManager.isVip(UserManager.userInfo)) {
            vipDef = VipDefined.GetInstance().getVipDefinitionByLevel(UserManager.userInfo.vipLevel);
        }
        else {
            vipDef = VipDefined.GetInstance().getVipDefinitionByLevel(0);
        }
        if (vipDef) {
            maxNum = vipDef.friendLimit;
        }
        if (maxNum && FriendManager.friendList && maxNum > FriendManager.friendList.length) {
            return true;
        }
        else {
            if (isShowAlert) {
                AlertManager.showAlertByString("您的好友数量已达到上限");
            }
            return false;
        }
    };
    /**
     * 判断收到的礼物是否已存在
    */
    FriendManager.isExistInGiftList = function (roleId) {
        if (FriendManager.giftList && FriendManager.giftList.length > 0) {
            for (var _i = 0, _a = FriendManager.giftList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.roleId == roleId) {
                    return true;
                }
            }
        }
        return false;
    };
    FriendManager.msgTime = 10;
    /**
     * 请求消息(请求添加好友)序号
     */
    FriendManager._requestAdd = 0;
    /**
     * 赠送好友金币成功广播
    */
    FriendManager.onGiveFriendGoldEvent = new qin.DelegateDispatcher();
    /**
     * 领取好友赠送的礼物成功广播
    */
    FriendManager.onReceiveGiftEvent = new qin.DelegateDispatcher();
    /**
     * 获取好友请求列表成功广播
    */
    FriendManager.onFriendRequestEvent = new qin.DelegateDispatcher();
    /**
     * 接受或拒绝好友请求成功广播
    */
    FriendManager.onReceiveFriendRequestEvent = new qin.DelegateDispatcher();
    /**
     * 查询好友请求成功广播
    */
    FriendManager.onSearchPlayerEvent = new qin.DelegateDispatcher();
    /**
     * 添加好友请求成功广播
    */
    FriendManager.onAddPlayerEvent = new qin.DelegateDispatcher();
    /**
     * 删除好友请求成功广播
    */
    FriendManager.onRemovePlayerEvent = new qin.DelegateDispatcher();
    /**
     * 刷新UI的推送
    */
    FriendManager.onRefreshInfoEvent = new qin.DelegateDispatcher();
    /**
     * 好友邀请
     */
    FriendManager.InviteFriendEvent = new qin.DelegateDispatcher();
    /**
     * 获取好友列表成功广播
     */
    FriendManager.onGetFriendListEvent = new qin.DelegateDispatcher();
    /**
     * 接受好友跳转事件
     */
    FriendManager.allowFriendJumpEvent = new qin.DelegateDispatcher();
    return FriendManager;
}());
__reflect(FriendManager.prototype, "FriendManager");
var FriendMsgType;
(function (FriendMsgType) {
    /**
     * 请求加好友信息
    */
    FriendMsgType[FriendMsgType["RequireMsg"] = 1] = "RequireMsg";
    /**
     * 邀请好友信息
    */
    FriendMsgType[FriendMsgType["InviteMsg"] = 2] = "InviteMsg";
})(FriendMsgType || (FriendMsgType = {}));
//# sourceMappingURL=FriendManager.js.map