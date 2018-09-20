var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 好友面板
*/
var FriendPanel = (function (_super) {
    __extends(FriendPanel, _super);
    function FriendPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.FriendPanel);
        return _this;
    }
    FriendPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        this.searchText.maxChars = 15;
        UIUtil.listRenderer(this.list, this.scroller, FriendItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.giftList, this.giftScroller, GiftItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.requestList, this.requestScroller, FriendRequestItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.bindRender(this.addList, AddFriendItemRenderer, null);
        UIUtil.bindRender(this.recList, AddFriendItemRenderer, null);
        this.addList.useVirtualLayout = true;
        this.recList.useVirtualLayout = true;
        this.addScroller.viewport = this.addViewportGroup;
        this.addScroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
        this.addScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.scroller.scrollPolicyH = this.giftScroller.scrollPolicyH = this.requestScroller.scrollPolicyH = this.addScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.hasFriendGroup.visible = false;
        this.noFriendGroup.visible = false;
        this.hasGiftGroup.visible = false;
        this.noGiftGroup.visible = false;
        this.hasRequestGroup.visible = false;
        this.noRequestGroup.visible = false;
        var array = new Array();
        array.push(this.tabGroup);
        array.push(this.giftTabGroup);
        array.push(this.requestTabGroup);
        array.push(this.addTabGroup);
        this.friendTabCompontent.build(TabComponent.CreatData(["好友", "收到礼物", "好友请求", "添加"], array, TabButtonType.BigOf4));
        egret.callLater(this.addRedPoint, this);
        UIManager.pushResizeGroup(this.actionBtnGroup);
        UIManager.pushResizeScroller(this.scroller, 1070);
        UIManager.pushResizeScroller(this.giftScroller, 880);
        UIManager.pushResizeScroller(this.requestScroller, 1070);
        UIManager.pushResizeScroller(this.noFriendGroup, 1070);
        UIManager.pushResizeScroller(this.noGiftGroup, 880);
        UIManager.pushResizeScroller(this.noRequestGroup, 1070);
        UIManager.pushResizeScroller(this.addScroller, 940);
    };
    FriendPanel.prototype.addRedPoint = function () {
        var btn = this.friendTabCompontent.getBtnByLabel("收到礼物");
        UIUtil.addSingleNotify(btn, NotifyType.Friend_ReceivePrize, 8, 10);
        btn = this.friendTabCompontent.getBtnByLabel("好友请求");
        UIUtil.addSingleNotify(btn, NotifyType.Friend_HaveNew, 8, 10);
    };
    FriendPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this._tabFlag = FriendUIType.FriendList;
        if (appendData && appendData.tabFlag) {
            this._tabFlag = appendData.tabFlag;
        }
        this.friendTabCompontent.init(0);
        if (this._tabFlag) {
            this.friendTabCompontent.setSelectIndex(this._tabFlag - 1);
        }
        this.inviteGroup.visible = (qin.System.isWeChat || qin.System.isMicro) && !VersionManager.isSafe;
        this.setFriendListInfo();
        this.setFriendRequestList();
        this.setGiftListInfo();
    };
    FriendPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClickHandler, this);
        this.addList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onAddListClickHandler, this);
        this.recList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRecListClickHandler, this);
        this.inviteLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteFriend, this);
        this.friendTabCompontent.tabChangeEvent.addListener(this.onTabClickHandler, this);
        FriendManager.onReceiveGiftEvent.addListener(this.receiveGiftSuccess, this);
        this.fastReceiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fastReceive, this);
        FriendManager.onFriendRequestEvent.addListener(this.setFriendRequestList, this);
        FriendManager.onReceiveFriendRequestEvent.addListener(this.refreshFriendRequestList, this);
        this.searchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.searchPlayer, this);
        this.searchText.addEventListener(eui.UIEvent.CHANGE, this.searchTextChange, this);
        FriendManager.onSearchPlayerEvent.addListener(this.setAddList, this);
        FriendManager.onRemovePlayerEvent.addListener(this.removePlayerSuccess, this);
        FriendManager.onRefreshInfoEvent.addListener(this.refreshUI, this);
        FriendManager.onGetFriendListEvent.addListener(this.setFriendListInfo, this);
        FriendManager.allowFriendJumpEvent.addListener(this.jumpFriendTab, this);
    };
    FriendPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClickHandler, this);
        this.addList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onAddListClickHandler, this);
        this.recList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRecListClickHandler, this);
        this.inviteLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteFriend, this);
        this.friendTabCompontent.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        FriendManager.onReceiveGiftEvent.removeListener(this.receiveGiftSuccess, this);
        this.fastReceiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fastReceive, this);
        FriendManager.onFriendRequestEvent.removeListener(this.setFriendRequestList, this);
        FriendManager.onReceiveFriendRequestEvent.removeListener(this.refreshFriendRequestList, this);
        this.searchBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.searchPlayer, this);
        this.searchText.removeEventListener(eui.UIEvent.CHANGE, this.searchTextChange, this);
        FriendManager.onSearchPlayerEvent.removeListener(this.setAddList, this);
        FriendManager.onRemovePlayerEvent.removeListener(this.removePlayerSuccess, this);
        FriendManager.onRefreshInfoEvent.removeListener(this.refreshUI, this);
        FriendManager.onGetFriendListEvent.removeListener(this.setFriendListInfo, this);
        FriendManager.allowFriendJumpEvent.removeListener(this.jumpFriendTab, this);
    };
    FriendPanel.prototype.jumpFriendTab = function () {
        this.friendTabCompontent.setSelectIndex(2);
    };
    /**
     * 刷新UI
    */
    FriendPanel.prototype.refreshUI = function (refreshUIFlag) {
        if (refreshUIFlag == FriendUIType.FriendList) {
            this.setFriendListInfo();
            this.setGiftListInfo();
        }
        else if (refreshUIFlag == FriendUIType.GiftList) {
            this.setGiftListInfo();
        }
        else if (refreshUIFlag == FriendUIType.RequestList) {
            this.setFriendRequestList();
        }
    };
    /**
     * 删除好友成功
    */
    FriendPanel.prototype.removePlayerSuccess = function () {
        if (FriendManager.friendList.length <= 0) {
            this.hasFriendGroup.visible = false;
            this.noFriendGroup.visible = true;
        }
        UIUtil.writeListInfo(this.list, FriendManager.friendList, "roleId", false, SortUtil.friendSort);
    };
    /**
     * 监听搜索框内容改变
    */
    FriendPanel.prototype.searchTextChange = function (event) {
        if (this.searchText.text.trim().length <= 0) {
            this.searchBtn.visible = false;
        }
        else {
            this.searchBtn.visible = true;
        }
    };
    /**
     * 设置添加查询列表的数据
    */
    FriendPanel.prototype.setAddList = function (text) {
        if (text) {
            if (FriendManager.searchList && FriendManager.searchList.length > 0) {
                UIUtil.writeListInfo(this.addList, FriendManager.searchList, "roleId");
            }
        }
        else {
            this.setRecFriendInfo();
        }
    };
    /**
     * 搜索按钮事件
    */
    FriendPanel.prototype.searchPlayer = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (this.searchText.text.trim().length > 0) {
            FriendManager.reqSearchPlayer(this.searchText.text.trim());
        }
    };
    /**
     * 接受或拒绝好友请求成功接受广播后续执行事件
    */
    FriendPanel.prototype.refreshFriendRequestList = function () {
        if (FriendManager.requestFriendList.length > 0) {
            UIUtil.writeListInfo(this.requestList, FriendManager.requestFriendList, "roleId");
        }
        else {
            this.noRequestGroup.visible = true;
            this.hasRequestGroup.visible = false;
        }
    };
    /**
     * 获取好友请求列表成功后接受广播后续执行事件
    */
    FriendPanel.prototype.setFriendRequestList = function () {
        if (FriendManager.requestFriendList && FriendManager.requestFriendList.length > 0) {
            UIUtil.writeListInfo(this.requestList, FriendManager.requestFriendList, "roleId");
            this.hasRequestGroup.visible = true;
            this.noRequestGroup.visible = false;
        }
        else {
            this.noRequestGroup.visible = true;
            this.hasRequestGroup.visible = false;
        }
    };
    /**
     * 快速领取好友金币按钮的操作
    */
    FriendPanel.prototype.fastReceive = function (event) {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveGift(0);
    };
    /**
     * 领取好友金币成功后续执行事件
    */
    FriendPanel.prototype.receiveGiftSuccess = function () {
        if (FriendManager.giftList.length <= 0) {
            this.hasGiftGroup.visible = false;
            this.noGiftGroup.visible = true;
            this.fastReceiveBtn.enabled = false;
        }
        UIUtil.writeListInfo(this.giftList, FriendManager.giftList, "roleId");
        PropertyManager.ShowItemList();
    };
    /**
     * 设置推荐的好友信息
    */
    FriendPanel.prototype.setRecFriendInfo = function () {
        if (FriendManager.recList) {
            var recListClone = FriendManager.recList.concat();
            UIUtil.writeListInfo(this.recList, recListClone);
            if (FriendManager.recList.length > 0) {
                this.recDesGroup.visible = true;
            }
            else {
                this.recDesGroup.visible = false;
            }
        }
        else {
            this.recDesGroup.visible = false;
        }
    };
    /**
     * 选项卡按钮点击事件
    */
    FriendPanel.prototype.onTabClickHandler = function (index) {
        if (index == 3) {
            this.searchText.text = "";
            FriendManager.searchList = [];
            UIUtil.writeListInfo(this.addList, FriendManager.searchList, "roleId");
            this.searchBtn.visible = false;
            this.addScroller.viewport.scrollV = 0;
            if (!FriendManager.recList) {
                FriendManager.reqSearchPlayer();
            }
            else {
                this.setRecFriendInfo();
            }
        }
        else if (index == 0) {
            this.setFriendListInfo();
        }
    };
    /**
     * 邀请好友按钮点击事件
    */
    FriendPanel.prototype.inviteFriend = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (qin.System.isMicro && ChannelManager.hasWeixin == false) {
            AlertManager.showAlert("您未安装微信，分享失败。");
        }
        else {
            UIManager.showPanel(UIModuleName.ChooseShareWayPanel, { wxMsgTitle: ChannelManager.appName, wxTimeLineTitle: qin.StringUtil.format("一直听说你的牌技不错，快来和我较量较量。我已经在玩{0}，你不来吗？", ChannelManager.appName), msg: qin.StringUtil.format("一直听说你的牌技不错，快来和我较量较量。我已经在玩{0}，你不来吗？", ChannelManager.appName) });
        }
    };
    /**
     * 好友列表点击事件
    */
    FriendPanel.prototype.onListClickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.list.selectedItem) {
            UserManager.reqShowOtherUserInfoPanel(this.list.selectedItem.roleId);
        }
    };
    /**
     * 搜索到的用户列表点击事件
    */
    FriendPanel.prototype.onAddListClickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.addList.selectedItem) {
            UserManager.reqShowOtherUserInfoPanel(this.addList.selectedItem.roleId);
        }
    };
    /**
     * 推荐的用户列表点击事件
    */
    FriendPanel.prototype.onRecListClickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.recList.selectedItem) {
            UserManager.reqShowOtherUserInfoPanel(this.recList.selectedItem.roleId);
        }
    };
    FriendPanel.prototype.setFriendListInfo = function () {
        if (FriendManager.friendList && FriendManager.friendList.length > 0) {
            UIUtil.writeListInfo(this.list, FriendManager.friendList, "roleId", false, SortUtil.friendSort);
            this.hasFriendGroup.visible = true;
            this.noFriendGroup.visible = false;
        }
        else {
            this.noFriendGroup.visible = true;
            this.hasFriendGroup.visible = false;
        }
    };
    FriendPanel.prototype.setGiftListInfo = function () {
        if (FriendManager.giftList && FriendManager.giftList.length > 0) {
            UIUtil.writeListInfo(this.giftList, FriendManager.giftList, "roleId");
            this.hasGiftGroup.visible = true;
            this.fastReceiveBtn.enabled = true;
            this.noGiftGroup.visible = false;
        }
        else {
            this.noGiftGroup.visible = true;
            this.hasGiftGroup.visible = false;
            this.fastReceiveBtn.enabled = false;
        }
    };
    FriendPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return FriendPanel;
}(BasePanel));
__reflect(FriendPanel.prototype, "FriendPanel");
//# sourceMappingURL=FriendPanel.js.map