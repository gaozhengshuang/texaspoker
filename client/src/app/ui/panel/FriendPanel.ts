/**
 * 好友面板
*/
class FriendPanel extends BasePanel
{
    /**
     * 邀请按钮
    */
    public inviteLabel: eui.Label;
    public inviteGroup: eui.Group;
    /**
     * 快速领取按钮
    */
    public fastReceiveBtn: eui.Button;
    /**
     * 查询按钮
    */
    public searchBtn: eui.Button;
    /**
     * 选项卡内容group
    */
    public tabGroup: eui.Group;
    public giftTabGroup: eui.Group;
    public requestTabGroup: eui.Group;
    public addTabGroup: eui.Group;
    /**
     * 有内容显示的group
    */
    public hasFriendGroup: eui.Group;
    public hasGiftGroup: eui.Group;
    public hasRequestGroup: eui.Group;
    /**
     * 无内容显示的group
    */
    public noFriendGroup: eui.Group;
    public noGiftGroup: eui.Group;
    public noRequestGroup: eui.Group;
    /**
     * 搜索输入框
    */
    public searchText: eui.EditableText;

    public friendTabCompontent: TabComponent;
    public scroller: eui.Scroller;
    public giftScroller: eui.Scroller;
    public requestScroller: eui.Scroller;
    public addScroller: eui.Scroller;
    public list: eui.List;
    public giftList: eui.List;
    public requestList: eui.List;
    public addList: eui.List;
    public recList: eui.List;
    public addViewportGroup: eui.Group;
    public recDesGroup: eui.Group;

    public actionBtnGroup: eui.Group;

    private _tabFlag: FriendUIType;
    private _anime: PanelAnime;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.FriendPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true
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
        let array: Array<eui.Group> = new Array<eui.Group>();
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
    }

    private addRedPoint()
    {
        let btn: eui.RadioButton = this.friendTabCompontent.getBtnByLabel("收到礼物");
        UIUtil.addSingleNotify(btn, NotifyType.Friend_ReceivePrize, 8, 10);
        btn = this.friendTabCompontent.getBtnByLabel("好友请求");
        UIUtil.addSingleNotify(btn, NotifyType.Friend_HaveNew, 8, 10);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this._tabFlag = FriendUIType.FriendList;
        if (appendData && appendData.tabFlag)
        {
            this._tabFlag = appendData.tabFlag;
        }
        this.friendTabCompontent.init(0);
        if (this._tabFlag)
        {
            this.friendTabCompontent.setSelectIndex(this._tabFlag - 1);
        }
        this.inviteGroup.visible = (game.System.isWeChat || game.System.isMicro) && !VersionManager.isSafe;
        this.setFriendListInfo();
        this.setFriendRequestList();
        this.setGiftListInfo();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
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
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
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
    }

    private jumpFriendTab()
    {
        this.friendTabCompontent.setSelectIndex(2);
    }
    /**
     * 刷新UI
    */
    private refreshUI(refreshUIFlag: FriendUIType)
    {
        if (refreshUIFlag == FriendUIType.FriendList)
        {
            this.setFriendListInfo();
            this.setGiftListInfo();
        } else if (refreshUIFlag == FriendUIType.GiftList)
        {
            this.setGiftListInfo();
        } else if (refreshUIFlag == FriendUIType.RequestList)
        {
            this.setFriendRequestList();
        }
    }
    /**
     * 删除好友成功
    */
    private removePlayerSuccess()
    {
        if (FriendManager.friendList.length <= 0)
        {
            this.hasFriendGroup.visible = false;
            this.noFriendGroup.visible = true;
        }
        UIUtil.writeListInfo(this.list, FriendManager.friendList, "roleId", false, SortUtil.friendSort);

    }
    /**
     * 监听搜索框内容改变
    */
    private searchTextChange(event: eui.UIEvent)
    {
        if (this.searchText.text.trim().length <= 0)
        {
            this.searchBtn.visible = false;
        } else
        {
            this.searchBtn.visible = true;
        }
    }
    /**
     * 设置添加查询列表的数据
    */
    private setAddList(text)
    {
        if (text)
        {
            if (FriendManager.searchList && FriendManager.searchList.length > 0)
            {
                UIUtil.writeListInfo(this.addList, FriendManager.searchList, "roleId");
            }
        } else
        {
            this.setRecFriendInfo();
        }
    }
    /**
     * 搜索按钮事件
    */
    private searchPlayer(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (this.searchText.text.trim().length > 0)
        {
            FriendManager.reqSearchPlayer(this.searchText.text.trim());
        }
    }
    /**
     * 接受或拒绝好友请求成功接受广播后续执行事件
    */
    private refreshFriendRequestList()
    {
        if (FriendManager.requestFriendList.length > 0)
        {
            UIUtil.writeListInfo(this.requestList, FriendManager.requestFriendList, "roleId");
        } else
        {
            this.noRequestGroup.visible = true;
            this.hasRequestGroup.visible = false;
        }
    }
    /**
     * 获取好友请求列表成功后接受广播后续执行事件
    */
    private setFriendRequestList()
    {
        if (FriendManager.requestFriendList && FriendManager.requestFriendList.length > 0)
        {
            UIUtil.writeListInfo(this.requestList, FriendManager.requestFriendList, "roleId");
            this.hasRequestGroup.visible = true;
            this.noRequestGroup.visible = false;
        } else
        {
            this.noRequestGroup.visible = true;
            this.hasRequestGroup.visible = false;
        }
    }
    /**
     * 快速领取好友金币按钮的操作
    */
    private fastReceive(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        FriendManager.reqReceiveGift(0);
    }
    /**
     * 领取好友金币成功后续执行事件
    */
    private receiveGiftSuccess()
    {
        if (FriendManager.giftList.length <= 0)
        {
            this.hasGiftGroup.visible = false;
            this.noGiftGroup.visible = true;
            this.fastReceiveBtn.enabled = false;
        }
        UIUtil.writeListInfo(this.giftList, FriendManager.giftList, "roleId");
        PropertyManager.ShowItemList();
    }
    /**
     * 设置推荐的好友信息
    */
    private setRecFriendInfo()
    {
        if (FriendManager.recList)
        {
            let recListClone: Array<BaseFriendInfo> = FriendManager.recList.concat();
            UIUtil.writeListInfo(this.recList, recListClone);
            if (FriendManager.recList.length > 0)
            {
                this.recDesGroup.visible = true;
            } else
            {
                this.recDesGroup.visible = false;
            }
        } else
        {
            this.recDesGroup.visible = false;
        }
    }
    /**
     * 选项卡按钮点击事件
    */
    private onTabClickHandler(index: number): void
    {
        if (index == 3)
        {
            this.searchText.text = "";
            FriendManager.searchList = [];
            UIUtil.writeListInfo(this.addList, FriendManager.searchList, "roleId");
            this.searchBtn.visible = false;
            this.addScroller.viewport.scrollV = 0;
            if (!FriendManager.recList)
            {
                FriendManager.reqSearchPlayer();
            } else
            {
                this.setRecFriendInfo();
            }
        } else if (index == 0)
        {
            this.setFriendListInfo();
        }
    }
    /**
     * 邀请好友按钮点击事件
    */
    private inviteFriend()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (game.System.isMicro && ChannelManager.hasWeixin == false)
        {
            AlertManager.showAlert("您未安装微信，分享失败。");
        }
        else
        {
            UIManager.showPanel(UIModuleName.ChooseShareWayPanel, { wxMsgTitle: ChannelManager.appName, wxTimeLineTitle: game.StringUtil.format("一直听说你的牌技不错，快来和我较量较量。我已经在玩{0}，你不来吗？", ChannelManager.appName), msg: game.StringUtil.format("一直听说你的牌技不错，快来和我较量较量。我已经在玩{0}，你不来吗？", ChannelManager.appName) });
        }
    }
    /**
     * 好友列表点击事件
    */
    private onListClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.list.selectedItem)
        {
            UserManager.reqShowOtherUserInfoPanel(this.list.selectedItem.roleId);
        }
    }
    /**
     * 搜索到的用户列表点击事件
    */
    private onAddListClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.addList.selectedItem)
        {
            UserManager.reqShowOtherUserInfoPanel(this.addList.selectedItem.roleId);
        }
    }
    /**
     * 推荐的用户列表点击事件
    */
    private onRecListClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.recList.selectedItem)
        {
            UserManager.reqShowOtherUserInfoPanel(this.recList.selectedItem.roleId);
        }
    }
    private setFriendListInfo()
    {
        if (FriendManager.friendList && FriendManager.friendList.length > 0)
        {
            UIUtil.writeListInfo(this.list, FriendManager.friendList, "roleId", false, SortUtil.friendSort);
            this.hasFriendGroup.visible = true;
            this.noFriendGroup.visible = false;
        } else
        {
            this.noFriendGroup.visible = true;
            this.hasFriendGroup.visible = false;
        }
    }
    private setGiftListInfo()
    {
        if (FriendManager.giftList && FriendManager.giftList.length > 0)
        {
            UIUtil.writeListInfo(this.giftList, FriendManager.giftList, "roleId");
            this.hasGiftGroup.visible = true;
            this.fastReceiveBtn.enabled = true;
            this.noGiftGroup.visible = false;
        } else
        {
            this.noGiftGroup.visible = true;
            this.hasGiftGroup.visible = false;
            this.fastReceiveBtn.enabled = false;
        }
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}