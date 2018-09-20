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
 * 游戏场面板
 */
var PlayingFieldPanel = (function (_super) {
    __extends(PlayingFieldPanel, _super);
    function PlayingFieldPanel() {
        var _this = _super.call(this) || this;
        /**
         * 升降序排序标记
        */
        _this.blindIsUpSort = true;
        _this.playNumIsUpSort = true;
        _this.roomIdIsUpSort = true;
        _this.buyIsUpSort = true;
        _this.setSkinName(UIModuleName.PlayingFieldPanel);
        return _this;
    }
    PlayingFieldPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._anime = new PanelAnime(this);
        this.maskAlpha = 0;
        this.isCloseButtonTween = true;
        UIUtil.listRenderer(this.list, this.scroller, PlayingFieldItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.searchLable.type = egret.TextFieldType.DYNAMIC;
        this.searchLable.touchEnabled = true;
        this.playingFieldTabCompontent.build(TabComponent.CreatData(["初级场", "中级场", "高级场"], [this.tabGroup, this.tabGroup, this.tabGroup], TabButtonType.BigOf3));
        UIManager.pushResizeGroup(this.actionBtnGroup);
        UIManager.pushResizeScroller(this.scroller, 780);
        VersionManager.setComponentVisibleBySafe(this.createPrivateRoomBtn);
    };
    PlayingFieldPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.playingFieldTabCompontent.init(0);
        //重置
        this.resetSearchLabel();
        if (this.panelData && this.panelData.playWay && this.panelData.playWay == PlayWayType.Omaha) {
            this._playWay = this.panelData.playWay;
            this.titleImg.source = SheetSubName.OmahaTitle;
            this.leftImg.horizontalCenter = -150;
            this.rightImg.horizontalCenter = 150;
        }
        else {
            this._playWay = PlayWayType.PlayField;
            this.titleImg.source = SheetSubName.PlayFieldTitle;
            this.leftImg.horizontalCenter = -108;
            this.rightImg.horizontalCenter = 108;
        }
        if (this.panelData && this.panelData.enterIndex) {
            this.playingFieldTabCompontent.setSelectIndex(this.panelData.enterIndex);
            if (this._playWay == PlayWayType.Omaha) {
                PlayingFieldManager.reqRoomListInfo(this.panelData.enterIndex + 4);
            }
            else {
                PlayingFieldManager.reqRoomListInfo(this.panelData.enterIndex + 1);
            }
        }
        else {
            this.playingFieldTabCompontent.setSelectIndex(0);
            this.reqPrimaryRoom();
        }
    };
    PlayingFieldPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._anime.onEnable();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRoomClickHandler, this);
        this.searchLable.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showKeyboard, this);
        this.playingFieldTabCompontent.tabChangeEvent.addListener(this.onTabClickHandler, this);
        PlayingFieldManager.onGetRoomListEvent.addListener(this.setRoomListInfo, this);
        PlayingFieldManager.onKeyBoardCloseEvent.addListener(this.setsearchImgVisible, this);
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
    };
    PlayingFieldPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this._anime.onDisable();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRoomClickHandler, this);
        this.searchLable.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showKeyboard, this);
        this.playingFieldTabCompontent.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        PlayingFieldManager.onGetRoomListEvent.removeListener(this.setRoomListInfo, this);
        PlayingFieldManager.onKeyBoardCloseEvent.removeListener(this.setsearchImgVisible, this);
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
    };
    /**
     * 失去焦点搜索图标显示隐藏设置
    */
    PlayingFieldPanel.prototype.setsearchImgVisible = function () {
        if (this.searchLable.text.length < 1) {
            this.focuseOutGroup.visible = true;
        }
    };
    /**
     * tabBar切换事件
    */
    PlayingFieldPanel.prototype.onTabClickHandler = function (index) {
        this.resetSearchLabel();
        if (index == 0) {
            this.reqPrimaryRoom();
        }
        else if (index == 1) {
            if (this._playWay == PlayWayType.Omaha) {
                PlayingFieldManager.reqRoomListInfo(PlayingFieldType.OmahaMiddle);
            }
            else {
                PlayingFieldManager.reqRoomListInfo(PlayingFieldType.Middle);
            }
        }
        else {
            if (this._playWay == PlayWayType.Omaha) {
                PlayingFieldManager.reqRoomListInfo(PlayingFieldType.OmahaHigh);
            }
            else {
                PlayingFieldManager.reqRoomListInfo(PlayingFieldType.High);
            }
        }
    };
    /**
     * 请求初级场房间
    */
    PlayingFieldPanel.prototype.reqPrimaryRoom = function () {
        if (this._playWay == PlayWayType.Omaha) {
            PlayingFieldManager.reqRoomListInfo(PlayingFieldType.OmahaPrimary);
        }
        else {
            PlayingFieldManager.reqRoomListInfo(PlayingFieldType.Primary);
        }
    };
    /**
     * 重置搜索框数据
    */
    PlayingFieldPanel.prototype.resetSearchLabel = function () {
        this.searchLable.text = "";
        this.focuseOutGroup.visible = true;
    };
    /**
     * 写入列表默认数据
    */
    PlayingFieldPanel.prototype.setRoomListInfo = function () {
        if (PlayingFieldManager.roomList.length > 0) {
            UIUtil.writeListInfo(this.list, PlayingFieldManager.roomList, "id", true, SortUtil.blindUpSort);
        }
    };
    PlayingFieldPanel.prototype.onGetRoomInfoHandler = function () {
        SceneManager.switcScene(SceneType.Game);
        // UIManager.closePanel(UIModuleName.PlayingFieldPanel);
    };
    /**
     * 搜索框获得焦点触发的操作
    */
    PlayingFieldPanel.prototype.showKeyboard = function (event) {
        this.focuseOutGroup.visible = false;
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.searchRoom, target: this });
    };
    /**
     * 点击房间ID触发的操作
    */
    PlayingFieldPanel.prototype.roomIdSort = function () {
        if (this.roomIdIsUpSort) {
            UIUtil.setListDpInfo(this.list.dataProvider, PlayingFieldManager.roomList, "id", SortUtil.roomIdUpSort);
        }
        else {
            UIUtil.setListDpInfo(this.list.dataProvider, PlayingFieldManager.roomList, "id", SortUtil.roomIdDownSort);
        }
        this.roomIdIsUpSort = !this.roomIdIsUpSort;
    };
    /**
     * 点击在玩人数触发的操作
    */
    PlayingFieldPanel.prototype.playerNumSort = function () {
        if (this.playNumIsUpSort) {
            UIUtil.setListDpInfo(this.list.dataProvider, PlayingFieldManager.roomList, "id", SortUtil.roomPlayNumUpSort);
        }
        else {
            UIUtil.setListDpInfo(this.list.dataProvider, PlayingFieldManager.roomList, "id", SortUtil.roomPlayNumDownSort);
        }
        this.playNumIsUpSort = !this.playNumIsUpSort;
    };
    /**
     * 点击小、大盲注触发的操作
    */
    PlayingFieldPanel.prototype.blindSort = function () {
        if (this.blindIsUpSort) {
            UIUtil.setListDpInfo(this.list.dataProvider, PlayingFieldManager.roomList, "id", SortUtil.blindUpSort);
        }
        else {
            UIUtil.setListDpInfo(this.list.dataProvider, PlayingFieldManager.roomList, "id", SortUtil.blindDownSort);
        }
        this.blindIsUpSort = !this.blindIsUpSort;
    };
    /**
     * 点击最小、最大买入触发的操作
    */
    PlayingFieldPanel.prototype.buySort = function () {
        if (this.buyIsUpSort) {
            UIUtil.setListDpInfo(this.list.dataProvider, PlayingFieldManager.roomList, "id", SortUtil.blindUpSort);
        }
        else {
            UIUtil.setListDpInfo(this.list.dataProvider, PlayingFieldManager.roomList, "id", SortUtil.blindDownSort);
        }
        this.buyIsUpSort = !this.buyIsUpSort;
    };
    /**
     * 刷新页面
    */
    PlayingFieldPanel.prototype.refreshUI = function () {
        this.list.dataProvider = this._dp;
    };
    /**
     * 面板按钮事件处理
    */
    PlayingFieldPanel.prototype.clickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.target) {
            case this.roomIdLable:
                this.roomIdSort();
                break;
            case this.playerNumLable:
                this.playerNumSort();
                break;
            case this.blindLable:
                this.blindSort();
                break;
            case this.buyLable:
                this.buySort();
                break;
            case this.startGameBtn:
                this.fastJoinGame();
                break;
            case this.createPrivateRoomBtn:
                this.createPrivateRoom();
                break;
        }
    };
    /**
     * 快速加入游戏
    */
    PlayingFieldPanel.prototype.fastJoinGame = function () {
        if (PlayingFieldManager.roomList) {
            var nearest = Infinity;
            var minbuy = Infinity;
            var roomId = void 0;
            var backupNearest = Infinity;
            var backupRoomId = void 0;
            for (var _i = 0, _a = PlayingFieldManager.roomList; _i < _a.length; _i++) {
                var roomInfo = _a[_i];
                if (roomInfo.definition.sBuyin < minbuy) {
                    minbuy = roomInfo.definition.sBuyin;
                }
                if (roomInfo.definition.seat > roomInfo.player && roomInfo.player > 0) {
                    if (Math.abs(UserManager.userInfo.gold - roomInfo.definition.bBuyin) < nearest) {
                        nearest = Math.abs(UserManager.userInfo.gold - roomInfo.definition.bBuyin);
                        roomId = roomInfo.id;
                    }
                }
                else {
                    if (Math.abs(UserManager.userInfo.gold - roomInfo.definition.bBuyin) < backupNearest) {
                        backupNearest = Math.abs(UserManager.userInfo.gold - roomInfo.definition.bBuyin);
                        backupRoomId = roomInfo.id;
                    }
                }
            }
            if (UserManager.userInfo.gold == 0) {
                UIManager.showPanel(UIModuleName.GoldShortagePanel, { goldShortage: minbuy, isBankruptcy: true });
                return;
            }
            if (UserManager.userInfo.gold < minbuy) {
                AlertManager.showAlert("对不起，您的金币不足最小买入");
                return;
            }
            if (roomId) {
                GamblingManager.reqEnterRoom(roomId, null, true);
            }
            else {
                GamblingManager.reqEnterRoom(backupRoomId, null, true);
            }
        }
    };
    /**
     * 创建私人房
    */
    PlayingFieldPanel.prototype.createPrivateRoom = function () {
        //判断是不是vip,来确定是否具有创建私人房的权限
        // if (!VipManager.isVip())
        // {
        //     let type: ShopGroupIndex = ShopGroupIndex.Vip;
        //     AlertManager.showConfirm("私人房仅对VIP开放，您现在还不是VIP，是否马上开通？", this.openShoppingPanel, null, type, null, null, "立即开通VIP");
        // } else
        // {
        UIManager.showPanel(UIModuleName.CreateRoomPwdPanel, { playWay: this._playWay });
        // }
    };
    /**
     * 搜索房间
    */
    PlayingFieldPanel.prototype.searchRoom = function (type, num) {
        if (type == KeyBoardKeyType.Number) {
            if (this.searchLable.text.length < 5) {
                this.searchLable.text = this.searchLable.text + num;
            }
        }
        else if (type == KeyBoardKeyType.Del) {
            if (this.searchLable.text.length > 0) {
                this.searchLable.text = this.searchLable.text.slice(0, this.searchLable.text.length - 1);
            }
        }
        else if (type == KeyBoardKeyType.Reset) {
            this.resetSearchLabel();
        }
        else if (type == KeyBoardKeyType.Close) {
            return;
        }
        else {
            return;
        }
        var str = this.searchLable.text;
        if (str.length > 0) {
            this.focuseOutGroup.visible = false;
            var result = new Array();
            if (PlayingFieldManager.roomList.length > 0) {
                for (var _i = 0, _a = PlayingFieldManager.roomList; _i < _a.length; _i++) {
                    var def = _a[_i];
                    if (PlayingFieldManager.roomIdAddZero(def.id).indexOf(str) >= 0) {
                        result.push(def);
                    }
                }
                this._dp = new eui.ArrayCollection(result.sort(SortUtil.blindUpSort));
            }
        }
        else {
            this.focuseOutGroup.visible = true;
            this._dp = new eui.ArrayCollection(PlayingFieldManager.roomList.sort(SortUtil.blindUpSort));
        }
        this.refreshUI();
    };
    /**
     * 房间信息列表点击触发事件
    */
    PlayingFieldPanel.prototype.onRoomClickHandler = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.list.selectedItem) {
            if (UserManager.userInfo.gold >= this.list.selectedItem.definition.sBuyin) {
                if ((this.list.selectedItem.definition.type == PlayingFieldType.PlayFieldPersonal || this.list.selectedItem.definition.type == PlayingFieldType.OmahaPersonal) && this.list.selectedItem.hasPwd) {
                    UIManager.showPanel(UIModuleName.EnterRoomPwdPanel, this.list.selectedItem.id);
                }
                else {
                    //进入房间
                    GamblingManager.reqEnterRoom(this.list.selectedItem.id);
                }
            }
            else {
                var minNum = this.list.selectedItem.definition.sBuyin;
                UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { minNum: minNum, isGoldInsufficient: true });
            }
        }
    };
    /**
     * 打开商城面板
    */
    PlayingFieldPanel.prototype.openShoppingPanel = function (type) {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: type });
        UIManager.closePanel(UIModuleName.PlayingFieldPanel);
    };
    PlayingFieldPanel.prototype.onCloseBtnClickHandler = function (event) {
        this._anime.onCloseBtnClickHandler(event);
    };
    return PlayingFieldPanel;
}(BasePanel));
__reflect(PlayingFieldPanel.prototype, "PlayingFieldPanel");
//# sourceMappingURL=PlayingFieldPanel.js.map