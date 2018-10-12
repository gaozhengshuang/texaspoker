/**
 * 好友管理
*/
class FriendManager
{
    public static msgTime = 10;
    /**
     * 好友信息列表
    */
    public static friendList: Array<FriendInfo>;
    /**
     * 好友请求列表
    */
    public static requestFriendList: Array<BaseFriendInfo>;
    /**
     * 礼物列表
    */
    public static giftList: Array<BaseFriendInfo>;
    /**
     * 查询列表
    */
    public static searchList: Array<BaseFriendInfo>;
    /**
     * 推荐好友列表
    */
    public static recList: Array<BaseFriendInfo>;
    /**
     * 请求消息列表(邀请进入房间)
     */
    public static requestNewsList: Array<RequestNewsInfo>;
    /**
     * 请求消息(请求添加好友)序号
     */
    private static _requestAdd: number = 0;
    private static _addFriendsRequestInfo: RequestNewsInfo;
    /**
     * 当天赠送过金币的用户id数组
    */
    private static _givenGoldRoleIdList: Array<number>;
    /**
     * 重置数据
    */
    public static reset()
    {
        game.ArrayUtil.Clear(FriendManager.friendList);
        game.ArrayUtil.Clear(FriendManager.requestFriendList);
        game.ArrayUtil.Clear(FriendManager.giftList);
        game.ArrayUtil.Clear(FriendManager.searchList);
        FriendManager._requestAdd = 0;
        FriendManager._addFriendsRequestInfo = null;
        game.ArrayUtil.Clear(FriendManager.requestNewsList);
    }
    public static addRecListener()
    {
        SocketManager.AddCommandListener(Command.GW2C_PushFriendAddSuccess, FriendManager.onAddFriendSuccessRec, this);
        SocketManager.AddCommandListener(Command.GW2C_PushRemoveFriend, FriendManager.onDelFriendSuccessRec, this);
        SocketManager.AddCommandListener(Command.GW2C_PushFriendLogin, FriendManager.onOnlineStateChangeRec, this);
        SocketManager.AddCommandListener(Command.GW2C_PushFriendPresent, FriendManager.onGiveGoldRec, this);
        SocketManager.AddCommandListener(Command.GW2C_PushAddYouFriend, FriendManager.onRequestFriendRec, this);
        SocketManager.AddCommandListener(Command.RS2C_PushFriendInvitation, FriendManager.pushInviteMsgHandler, this)
        SocketManager.AddCommandListener(Command.Friend_Push_Reset_2015, FriendManager.onResetPush, this)
    }
    /**
     * 拉取好友列表信息
     */
    public static reqFriendList()
    {
        SocketManager.ImplCall(Command.C2GW_ReqFriendsList, null, FriendManager.FriendListInfoResponse, null, this);
    }
    /**
     * 初始化好友列表信息
     */
    public static Initialize(result: game.SpRpcResult)
    {
        FriendManager.reset();
        FriendManager.addRecListener();
        FriendManager.friendList = new Array<FriendInfo>();
        if (!FriendManager.giftList)
        {
            FriendManager.giftList = new Array<FriendInfo>();
        }
        if (!FriendManager._givenGoldRoleIdList)
        {
            FriendManager._givenGoldRoleIdList = new Array<number>();
        }
        FriendManager.FriendListInfoResponse(result);
    }
    public static FriendListInfoResponse(result: game.SpRpcResult)
    {
        let data: msg.GW2C_RetFriendsList = result.data;
        FriendManager.friendList = [];
        if (data.friendlist)
        {
            for (let friendInfo of data.friendlist)
            {
                let info: FriendInfo = new FriendInfo();
                info.copyValueFromIgnoreCase(friendInfo);
                info.copyValueFromIgnoreCase(friendInfo.base);
                FriendManager.friendList.push(info);
                if (info.getGold == 1)  //可领取
                {
                    FriendManager.giftList.push(info);
                }
                if (info.giveGold)
                {
                    FriendManager._givenGoldRoleIdList.push(info.roleId);
                }
            }
        }
        FriendManager.onGetFriendListEvent.dispatch();
    }
    /**
     * 发送赠送好友金币请求
    */
    public static reqGiveFriendGold(id: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            SoundManager.playEffect(MusicAction.gift_send);
            FriendManager.onGiveFriendGoldEvent.dispatch(id);
            for (let friendInfo of FriendManager.friendList)
            {
                if (friendInfo.roleId == id)
                {
                    friendInfo.giveGold = 1;
                    break;
                }
            }
            if (!FriendManager.isExitInRoleIdList(id))
            {
                FriendManager._givenGoldRoleIdList.push(id);
            }
        };
        SocketManager.call(Command.C2GW_ReqPresentToFriend, { roleid: id }, callback, null, this);
    }
    /**
     * 判断roleId是否已经存在在当天赠送过金币的用户id数组中
    */
    private static isExitInRoleIdList(roleId): boolean
    {
        let flag: boolean = false;
        for (let info of FriendManager._givenGoldRoleIdList)
        {
            if (info == roleId)
            {
                flag = true;
            }
        }
        return flag;
    }
    /**
     * 发送领取好友赠送的金币请求
    */
    public static reqReceiveGift(id: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            if (id == 0)
            {
                FriendManager.giftList = [];
            } else
            {
                for (let i: number = 0; i < FriendManager.giftList.length; i++)
                {
                    if (id == FriendManager.giftList[i].roleId)
                    {
                        FriendManager.giftList.splice(i, 1);
                        break;
                    }
                }
            }
            SoundManager.playEffect(MusicAction.gift_recv);
            FriendManager.onReceiveGiftEvent.dispatch();
        }
        PropertyManager.OpenGet();
        SocketManager.call(Command.C2GW_ReqGetFriendPresent, { roleid: id }, callback, null, this);
    }
    public static FriendRequestResponse(result: game.SpRpcResult)
    {
        let data: msg.GW2C_RetFriendRequestList = result.data;

        if (data.array)
        {
            game.ArrayUtil.Clear(FriendManager.requestFriendList);
            if (!FriendManager.requestFriendList)
            {
                FriendManager.requestFriendList = new Array<BaseFriendInfo>();
            }
            for (let requestInfo of data.array)
            {
                let info: BaseFriendInfo = new BaseFriendInfo();
                info.copyValueFromIgnoreCase(requestInfo);
                FriendManager.requestFriendList.push(info);
            }
            FriendManager.onFriendRequestEvent.dispatch();
        }
    }
    /**
     * 发送接受或拒绝好友请求的请求
    */
    public static reqReceiveFriendRequest(id: number, isReceive: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            if (isReceive)
            {
                UIManager.showFloatTips("您已成功添加此好友。");
            } else
            {
                UIManager.showFloatTips("您已拒绝此条好友申请。");
            }
            for (let i: number = 0; i < FriendManager.requestFriendList.length; i++)
            {
                if (FriendManager.requestFriendList[i].roleId == id)
                {
                    FriendManager.requestFriendList.splice(i, 1);
                    break;
                }
            }
            FriendManager.onReceiveFriendRequestEvent.dispatch();
        };
        let IsAccept: Boolean = (isReceive == 1) ? true : false;
        SocketManager.call(Command.C2GW_ReqProcessFriendRequest, { roleid: id, isaccept: IsAccept }, callback, null, this);
    }
    /**
     * 发送查询好友的请求
    */
    public static reqSearchPlayer(text?: string)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            let data: msg.GW2C_RetFriendSearch = result.data;
            if (data.brief)
            {
                if (text)
                {
                    game.ArrayUtil.Clear(FriendManager.searchList);
                    if (!FriendManager.searchList)
                    {
                        FriendManager.searchList = new Array<BaseFriendInfo>();
                    }
                    for (let searchInfo of data.brief)
                    {
                        let info: BaseFriendInfo = new BaseFriendInfo();
                        info.copyValueFromIgnoreCase(searchInfo);
                        FriendManager.searchList.push(info);
                    }
                } else
                {
                    if (!FriendManager.recList)
                    {
                        FriendManager.recList = new Array<BaseFriendInfo>();
                        for (let rec of data.brief)
                        {
                            let recInfo: BaseFriendInfo = new BaseFriendInfo();
                            recInfo.copyValueFromIgnoreCase(rec);
                            FriendManager.recList.push(recInfo);
                        }
                    }
                }
                FriendManager.onSearchPlayerEvent.dispatch(text);
            } else
            {
                AlertManager.showAlert("此用户名或者ID不存在");
            }
        };
        SocketManager.call(Command.C2GW_ReqFriendSearch, { val: text }, callback, null, this);
    }
    /**
     * 发送添加好友的请求
    */
    public static reqAddPlayer(id: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            UIManager.showFloatTips("已向对方发送好友申请。");
            if (FriendManager.recList && FriendManager.recList.length > 0)  //将添加的好友从推荐列表中删除
            {
                for (let i: number = 0; i < FriendManager.recList.length; i++)
                {
                    if (FriendManager.recList[i].roleId == id)
                    {
                        FriendManager.recList.splice(i, 1);
                        break;
                    }
                }
            }
            FriendManager.onAddPlayerEvent.dispatch(id);
        };
        if (!FriendManager.isFriend(id))
        {
            if (FriendManager.isFriendFull(true))
            {
                SocketManager.call(Command.C2GW_ReqAddFriend, { roleid: id }, callback, null, this);
            }
        } else
        {
            AlertManager.showAlertByString("该用户已是您的好友");
        }
    }
    /**
     * 发送删除好友的请求
    */
    public static reqRemovePlayer(id: number)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            for (let i: number = 0; i < FriendManager.friendList.length; i++)
            {
                if (id == FriendManager.friendList[i].roleId)
                {
                    FriendManager.friendList.splice(i, 1);
                    break;
                }
            }
            FriendManager.refreshGiftList(id);
            UIManager.closePanel(UIModuleName.UserInfoPanel);
            FriendManager.onRemovePlayerEvent.dispatch();
        };
        if (FriendManager.isFriend(id))
        {
            SocketManager.call(Command.C2GW_ReqRemoveFriend, { roleid: id }, callback, null, this);
        } else
        {
            game.Console.log("删除的用户不是您的好友,id:" + id);
        }
    }
    /**
     * 拉取用户信息返回
     */
    public static getUserInfoResult(result: any, flag: number)
    {
        if (flag == FriendUIType.FriendList)
        {
            let newFriendInfo: FriendInfo = new FriendInfo();
            newFriendInfo.copyValueFromIgnoreCase(result);
            if (FriendManager.isExitInRoleIdList(result.roleId))
            {
                newFriendInfo.giveGold = 1;
            }
            FriendManager.friendList.push(newFriendInfo);
            FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.FriendList);
        }
        else if (flag == FriendUIType.GiftList)
        {
            if (!FriendManager.giftList)
            {
                FriendManager.giftList = new Array<FriendInfo>();
            }
            if (FriendManager.isExistInGiftList(result.data.roleId) == false)
            {
                let newGiveGoldFriendIndo: BaseFriendInfo = new BaseFriendInfo();
                newGiveGoldFriendIndo.copyValueFrom(result.data);
                FriendManager.giftList.push(newGiveGoldFriendIndo);
                FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.GiftList);
            }
        }
    }

    /**
     * 请求邀请好友
     */
    public static reqInviteFriend(roomId: number, roleIds: Array<number>)
    {
        let callback: Function = function (result: game.SpRpcResult)
        {
            FriendManager.InviteFriendEvent.dispatch();
        };
        SocketManager.call(Command.Req_SendGameInvite_3608, { "id": roomId, "roleId": roleIds }, callback, null, this);
    }
    /**********服务器推送通知的相应操作****************/
    /**
     * 0点定时重置推送对应的操作
    */
    public static onResetPush(result: game.SpRpcResult)
    {
        if (FriendManager.friendList)
        {
            for (let friendInfo of FriendManager.friendList)
            {
                friendInfo.giveGold = 0;
            }
        }
        game.ArrayUtil.Clear(FriendManager._givenGoldRoleIdList);
    }
    /**
     * 对方同意好友添加请求的推送对应的操作
    */
    public static onAddFriendSuccessRec(result: game.SpRpcResult)
    {
        let data: msg.GW2C_PushFriendAddSuccess = result.data;
        if (data.friend)
        {
            FriendManager.getUserInfoResult(data.friend, FriendUIType.FriendList);
            // UserManager.reqGetOtherUserInfo(game.longToNumber(data.friend.roleid), FriendUIType.FriendList);
        }
    }
    /**
     * 被好友删除的推送对应的操作
    */
    public static onDelFriendSuccessRec(result: game.SpRpcResult)
    {
        let data: msg.GW2C_PushRemoveFriend = result.data;
        if (data)
        {
            for (let i: number = 0; i < FriendManager.friendList.length; i++)
            {
                if (data.roleid == FriendManager.friendList[i].roleId)
                {
                    FriendManager.friendList.splice(i, 1);
                    FriendManager.refreshGiftList(data.roleid);
                    break;
                }
            }
        }
    }
    /**
     * 当被好友删除时刷新收到的礼物数据
    */
    public static refreshGiftList(roleId: number)
    {
        if (FriendManager.giftList && FriendManager.giftList.length > 0)
        {
            for (let i: number = 0; i < FriendManager.giftList.length; i++)
            {
                if (FriendManager.giftList[i].roleId == roleId)
                {
                    FriendManager.giftList.splice(i, 1);
                    break;
                }
            }
        }
        FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.FriendList);
    }
    /**
     * 好友在线状态改变推送对应的操作
    */
    public static onOnlineStateChangeRec(result: game.SpRpcResult)
    {
        let data: msg.GW2C_PushFriendLogin = result.data;
        if (data)
        {
            for (let i: number = 0; i < FriendManager.friendList.length; i++)
            {
                if (data.roleid == FriendManager.friendList[i].roleId)
                {
                    FriendManager.friendList[i].offlineTime = game.longToNumber(data.offlinetime);
                    FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.FriendList);
                    break;
                }
            }
        }
    }
    /**
     * 好友赠送金币推送对应的操作
    */
    public static onGiveGoldRec(result: game.SpRpcResult)
    {
        if (result.data["roleId"])
        {
            UserManager.reqGetOtherUserInfo(result.data['roleId'], FriendUIType.GiftList);
        }
    }
    /**
     * 好友申请推送对应的操作
    */
    public static onRequestFriendRec(result: game.SpRpcResult)
    {
        let data: msg.GW2C_PushAddYouFriend = result.data;
        if (data)
        {
            let info: BaseFriendInfo = new BaseFriendInfo();
            info.copyValueFromIgnoreCase(data.friend);
            if (!FriendManager.requestFriendList)
            {
                FriendManager.requestFriendList = new Array<BaseFriendInfo>();
            }
            for (let i: number = 0; i < FriendManager.requestFriendList.length; i++)
            {
                if (info.roleId == FriendManager.requestFriendList[i].roleId)
                {
                    return;
                }
            }
            FriendManager.requestFriendList.push(info);
            if (FriendManager.requestNewsList)
            {
                FriendManager._requestAdd = FriendManager.requestNewsList.length;
            }
            else
            {
                FriendManager._requestAdd = 0
            }
            FriendManager._addFriendsRequestInfo = new RequestNewsInfo(FriendMsgType.RequireMsg, result.data);
            UIManager.showPanel(UIModuleName.FriendMsgPanel, FriendManager._addFriendsRequestInfo);
            FriendManager.onRefreshInfoEvent.dispatch(FriendUIType.RequestList);
        }
    }

    /**
     * 好友邀请信息推送
    */
    private static pushInviteMsgHandler(result: game.SpRpcResult)
    {
        let data: msg.GW2C_PushFriendInvitation = result.data;
        if (data)
        {
            if (!FriendManager.requestNewsList)
            {
                FriendManager.requestNewsList = new Array<RequestNewsInfo>();
            }
            FriendManager.requestNewsList.push(new RequestNewsInfo(FriendMsgType.InviteMsg, data));
            let requestInfo = FriendManager.getFriendMsgInfo();
            if (requestInfo)
            {
                UIManager.showPanel(UIModuleName.FriendMsgPanel, requestInfo);
            }
        }
    }
    public static removeFriendMsgInfo(rInfo: RequestNewsInfo)
    {
        if (rInfo)
        {
            if (rInfo.type == FriendMsgType.InviteMsg)
            {
                if (FriendManager.requestNewsList)
                {
                    for (let i: number = FriendManager.requestNewsList.length - 1; i >= 0; i--)
                    {
                        let info: RequestNewsInfo = FriendManager.requestNewsList[i];
                        if (rInfo == info)
                        {
                            FriendManager.requestNewsList.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            else if (rInfo.type == FriendMsgType.RequireMsg)
            {
                FriendManager._addFriendsRequestInfo = null;
            }
        }
    }
    public static getFriendMsgInfo(): RequestNewsInfo
    {
        let nowTime: number = TimeManager.GetServerUtcTimestamp();
        if (FriendManager._addFriendsRequestInfo)
        {
            if (nowTime - FriendManager._addFriendsRequestInfo.time > FriendManager.msgTime)
            {
                FriendManager._addFriendsRequestInfo = null;
            }
            else if (!FriendManager.requestNewsList || FriendManager._requestAdd >= FriendManager.requestNewsList.length)
            {
                return FriendManager._addFriendsRequestInfo;
            }
        }
        if (FriendManager.requestNewsList && FriendManager.requestNewsList.length > 0)
        {
            for (let i: number = FriendManager.requestNewsList.length - 1; i >= 0; i--)
            {
                let info: RequestNewsInfo = FriendManager.requestNewsList[i];
                if (nowTime - info.time > FriendManager.msgTime)
                {
                    FriendManager.requestNewsList.splice(0, i + 1);
                    break;
                }
            }
            if (FriendManager.requestNewsList.length > 0)
            {
                return FriendManager.requestNewsList[FriendManager.requestNewsList.length - 1];
            }
        }
        return null
    }

    /**
     * 判断是不是好友
    */
    public static isFriend(id: number): boolean
    {
        if (FriendManager.friendList && FriendManager.friendList.length > 0)
        {
            for (let def of FriendManager.friendList)
            {
                if (def.roleId == id)
                {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 查找好友
     */
    public static getFriendInfoById(id: number): FriendInfo
    {
        for (let info of FriendManager.friendList)
        {
            if (info.roleId == id)
            {
                return info;
            }
        }
        return null;
    }
    /**
     * 判断好友数量是否已达上限
    */
    public static isFriendFull(isShowAlert: boolean = false): boolean
    {
        return true; //move todo
        let maxNum: number;
        let vipDef: VipDefinition;
        if (VipManager.isVip(UserManager.userInfo))
        {
            vipDef = VipDefined.GetInstance().getVipDefinitionByLevel(UserManager.userInfo.vipLevel);
        } else
        {
            vipDef = VipDefined.GetInstance().getVipDefinitionByLevel(0);
        }
        if (vipDef)
        {
            maxNum = vipDef.friendLimit;
        }
        if (maxNum && FriendManager.friendList && maxNum > FriendManager.friendList.length)
        {
            return true;
        } else
        {
            if (isShowAlert)
            {
                AlertManager.showAlertByString("您的好友数量已达到上限");
            }
            return false;
        }
    }
    /**
     * 判断收到的礼物是否已存在
    */
    public static isExistInGiftList(roleId: number): boolean
    {
        if (FriendManager.giftList && FriendManager.giftList.length > 0)
        {
            for (let info of FriendManager.giftList)
            {
                if (info.roleId == roleId)
                {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 赠送好友金币成功广播
    */
    public static onGiveFriendGoldEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 领取好友赠送的礼物成功广播
    */
    public static onReceiveGiftEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取好友请求列表成功广播
    */
    public static onFriendRequestEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 接受或拒绝好友请求成功广播
    */
    public static onReceiveFriendRequestEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 查询好友请求成功广播
    */
    public static onSearchPlayerEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 添加好友请求成功广播
    */
    public static onAddPlayerEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 删除好友请求成功广播
    */
    public static onRemovePlayerEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 刷新UI的推送
    */
    public static onRefreshInfoEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 好友邀请
     */
    public static InviteFriendEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 获取好友列表成功广播
     */
    public static onGetFriendListEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    /**
     * 接受好友跳转事件
     */
    public static allowFriendJumpEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}

enum FriendMsgType
{
	/**
	 * 请求加好友信息
	*/
    RequireMsg = 1,
	/**
	 * 邀请好友信息
	*/
    InviteMsg = 2

}