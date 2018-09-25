/**
 * 游戏场面板
 */
class PlayingFieldPanel extends BasePanel
{
    /**
     * 房间ID
    */
    private roomIdLable: eui.Label;
    /**
     * 在玩人数
    */
    private playerNumLable: eui.Label;
    /**
     * 小大盲
    */
    private blindLable: eui.Label;
    /**
     * 最小最大买入
    */
    private buyLable: eui.Label;
    /**
     * 创建私人房按钮
    */
    private createPrivateRoomBtn: eui.Button;
    /**
     * 关闭私人房输入密码按钮
    */
    private closePrivateRoomGroupBtn: eui.Button;
    /**
     * 开始游戏按钮
    */
    private startGameBtn: eui.Button;
    /**
     * 选项卡内容group
    */
    private tabGroup: eui.Group;

    private scroller: eui.Scroller;
    private list: eui.List;
    private _dp: eui.ArrayCollection;
    public playingFieldTabCompontent: TabComponent;

    /**
     * 升降序排序标记
    */
    private blindIsUpSort: boolean = true;
    private playNumIsUpSort: boolean = true;
    private roomIdIsUpSort: boolean = true;
    private buyIsUpSort: boolean = true;
    /**
     * 搜索框
    */
    private searchLable: eui.EditableText;
    /**
     * 搜索group
    */
    public focuseOutGroup: eui.Group;
    /**
     * 标题
    */
    public titleImg: eui.Image;
    public leftImg: eui.Image;
    public rightImg: eui.Image;

    public actionBtnGroup: eui.Group;
    private _anime: PanelAnime;
    private _playWay: PlayWayType;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.PlayingFieldPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
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

    }

    public init(appendData: any)
    {
        super.init(appendData);
        this.playingFieldTabCompontent.init(0);
        //重置
        this.resetSearchLabel();

        if (this.panelData && this.panelData.playWay && this.panelData.playWay == PlayWayType.Omaha)
        {
            this._playWay = this.panelData.playWay;
            this.titleImg.source = SheetSubName.OmahaTitle;
            this.leftImg.horizontalCenter = -150;
            this.rightImg.horizontalCenter = 150;
        } else
        {
            this._playWay = PlayWayType.PlayField;
            this.titleImg.source = SheetSubName.PlayFieldTitle;
            this.leftImg.horizontalCenter = -108;
            this.rightImg.horizontalCenter = 108;
        }

        if (this.panelData && this.panelData.enterIndex)
        {
            this.playingFieldTabCompontent.setSelectIndex(this.panelData.enterIndex);
            if (this._playWay == PlayWayType.Omaha)
            {
                PlayingFieldManager.reqRoomListInfo(this.panelData.enterIndex + 4);

            } else
            {
                PlayingFieldManager.reqRoomListInfo(this.panelData.enterIndex + 1);
            }
        }
        else
        {
            // this.playingFieldTabCompontent.setSelectIndex(0); //move modified 默认已经发送，这里是多余发送
            // this.reqPrimaryRoom();
        }
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this._anime.onEnable();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRoomClickHandler, this);
        this.searchLable.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showKeyboard, this);
        this.playingFieldTabCompontent.tabChangeEvent.addListener(this.onTabClickHandler, this);
        PlayingFieldManager.onGetRoomListEvent.addListener(this.setRoomListInfo, this);
        PlayingFieldManager.onKeyBoardCloseEvent.addListener(this.setsearchImgVisible, this);

        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this._anime.onDisable();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRoomClickHandler, this);
        this.searchLable.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showKeyboard, this);
        this.playingFieldTabCompontent.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        PlayingFieldManager.onGetRoomListEvent.removeListener(this.setRoomListInfo, this);
        PlayingFieldManager.onKeyBoardCloseEvent.removeListener(this.setsearchImgVisible, this);

        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
    }

    /**
     * 失去焦点搜索图标显示隐藏设置
    */
    private setsearchImgVisible()
    {
        if (this.searchLable.text.length < 1)
        {
            this.focuseOutGroup.visible = true;
        }
    }
    /**
     * tabBar切换事件
    */
    private onTabClickHandler(index: number): void
    {
        this.resetSearchLabel();
        if (index == 0)
        {
            this.reqPrimaryRoom();
        } else if (index == 1)
        {
            if (this._playWay == PlayWayType.Omaha)
            {
                PlayingFieldManager.reqRoomListInfo(PlayingFieldType.OmahaMiddle);
            } else
            {
                PlayingFieldManager.reqRoomListInfo(PlayingFieldType.Middle);
            }
        } else
        {
            if (this._playWay == PlayWayType.Omaha)
            {
                PlayingFieldManager.reqRoomListInfo(PlayingFieldType.OmahaHigh);
            } else
            {
                PlayingFieldManager.reqRoomListInfo(PlayingFieldType.High);
            }
        }
    }
    /**
     * 请求初级场房间
    */
    private reqPrimaryRoom()
    {
        if (this._playWay == PlayWayType.Omaha)
        {
            PlayingFieldManager.reqRoomListInfo(PlayingFieldType.OmahaPrimary);
        } else
        {
            PlayingFieldManager.reqRoomListInfo(PlayingFieldType.Primary);
        }
    }
    /**
     * 重置搜索框数据
    */
    private resetSearchLabel()
    {
        this.searchLable.text = "";
        this.focuseOutGroup.visible = true;
    }
    /**
     * 写入列表默认数据
    */
    private setRoomListInfo()
    {
        if (PlayingFieldManager.roomList.length > 0)
        {
            UIUtil.writeListInfo(this.list, PlayingFieldManager.roomList, "id", true, SortUtil.blindUpSort);
        }
    }

    private onGetRoomInfoHandler()
    {
        SceneManager.switcScene(SceneType.Game);
        // UIManager.closePanel(UIModuleName.PlayingFieldPanel);
    }

    /**
     * 搜索框获得焦点触发的操作
    */
    private showKeyboard(event: egret.Event)
    {
        this.focuseOutGroup.visible = false;
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.searchRoom, target: this });
    }
    /**
     * 点击房间ID触发的操作
    */
    private roomIdSort()
    {
        if (this.roomIdIsUpSort)
        {
            UIUtil.setListDpInfo(this.list.dataProvider as eui.ArrayCollection, PlayingFieldManager.roomList, "id", SortUtil.roomIdUpSort);
        } else
        {
            UIUtil.setListDpInfo(this.list.dataProvider as eui.ArrayCollection, PlayingFieldManager.roomList, "id", SortUtil.roomIdDownSort);
        }
        this.roomIdIsUpSort = !this.roomIdIsUpSort;
    }
    /**
     * 点击在玩人数触发的操作
    */
    private playerNumSort()
    {
        if (this.playNumIsUpSort)
        {
            UIUtil.setListDpInfo(this.list.dataProvider as eui.ArrayCollection, PlayingFieldManager.roomList, "id", SortUtil.roomPlayNumUpSort);
        } else
        {
            UIUtil.setListDpInfo(this.list.dataProvider as eui.ArrayCollection, PlayingFieldManager.roomList, "id", SortUtil.roomPlayNumDownSort);
        }
        this.playNumIsUpSort = !this.playNumIsUpSort;
    }
    /**
     * 点击小、大盲注触发的操作
    */
    private blindSort()
    {
        if (this.blindIsUpSort)
        {
            UIUtil.setListDpInfo(this.list.dataProvider as eui.ArrayCollection, PlayingFieldManager.roomList, "id", SortUtil.blindUpSort);
        } else
        {
            UIUtil.setListDpInfo(this.list.dataProvider as eui.ArrayCollection, PlayingFieldManager.roomList, "id", SortUtil.blindDownSort);
        }
        this.blindIsUpSort = !this.blindIsUpSort;
    }
    /**
     * 点击最小、最大买入触发的操作
    */
    private buySort()
    {
        if (this.buyIsUpSort)
        {
            UIUtil.setListDpInfo(this.list.dataProvider as eui.ArrayCollection, PlayingFieldManager.roomList, "id", SortUtil.blindUpSort);
        } else
        {
            UIUtil.setListDpInfo(this.list.dataProvider as eui.ArrayCollection, PlayingFieldManager.roomList, "id", SortUtil.blindDownSort);
        }
        this.buyIsUpSort = !this.buyIsUpSort;
    }
    /**
     * 刷新页面
    */
    private refreshUI()
    {
        this.list.dataProvider = this._dp;
    }
    /**
     * 面板按钮事件处理
    */
    private clickHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.target)
        {
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
    }
    /**
     * 快速加入游戏
    */
    private fastJoinGame()
    {
        if (PlayingFieldManager.roomList)
        {
            let nearest: number = Infinity;
            let minbuy: number = Infinity;
            let roomId: number;
            let backupNearest: number = Infinity;
            let backupRoomId: number;
            for (let roomInfo of PlayingFieldManager.roomList)
            {
                if (roomInfo.definition.SBuyin < minbuy)
                {
                    minbuy = roomInfo.definition.SBuyin;
                }
                if (roomInfo.definition.Seat > roomInfo.player && roomInfo.player > 0)
                {
                    if (Math.abs(UserManager.userInfo.gold - roomInfo.definition.BBuyin) < nearest)
                    {
                        nearest = Math.abs(UserManager.userInfo.gold - roomInfo.definition.BBuyin);
                        roomId = roomInfo.id;
                    }
                } else
                {
                    if (Math.abs(UserManager.userInfo.gold - roomInfo.definition.BBuyin) < backupNearest)
                    {
                        backupNearest = Math.abs(UserManager.userInfo.gold - roomInfo.definition.BBuyin);
                        backupRoomId = roomInfo.id;
                    }
                }
            }
            if (UserManager.userInfo.gold == 0)
            {
                UIManager.showPanel(UIModuleName.GoldShortagePanel, { goldShortage: minbuy, isBankruptcy: true });
                return;
            }
            if (UserManager.userInfo.gold < minbuy)
            {
                AlertManager.showAlert("对不起，您的金币不足最小买入");
                return;
            }
            if (roomId)
            {
                GamblingManager.reqEnterRoom(roomId, null, true);
            } else
            {
                GamblingManager.reqEnterRoom(backupRoomId, null, true);
            }
        }
    }
    /**
     * 创建私人房
    */
    private createPrivateRoom()
    {
        //判断是不是vip,来确定是否具有创建私人房的权限
        // if (!VipManager.isVip())
        // {
        //     let type: ShopGroupIndex = ShopGroupIndex.Vip;
        //     AlertManager.showConfirm("私人房仅对VIP开放，您现在还不是VIP，是否马上开通？", this.openShoppingPanel, null, type, null, null, "立即开通VIP");
        // } else
        // {
        UIManager.showPanel(UIModuleName.CreateRoomPwdPanel, { playWay: this._playWay });
        // }
    }
    /**
     * 搜索房间
    */
    private searchRoom(type: KeyBoardKeyType, num?: string)
    {
        if (type == KeyBoardKeyType.Number)
        {
            if (this.searchLable.text.length < 5)
            {
                this.searchLable.text = this.searchLable.text + num;
            }
        } else if (type == KeyBoardKeyType.Del)
        {
            if (this.searchLable.text.length > 0)
            {
                this.searchLable.text = this.searchLable.text.slice(0, this.searchLable.text.length - 1);
            }
        } else if (type == KeyBoardKeyType.Reset)
        {
            this.resetSearchLabel();
        } else if (type == KeyBoardKeyType.Close)
        {
            return;
        } else
        {
            return;
        }
        let str: string = this.searchLable.text;
        if (str.length > 0)
        {
            this.focuseOutGroup.visible = false;
            let result: Array<PlayingFieldRoomInfo> = new Array<PlayingFieldRoomInfo>();
            if (PlayingFieldManager.roomList.length > 0)
            {
                for (let def of PlayingFieldManager.roomList)
                {
                    if (PlayingFieldManager.roomIdAddZero(def.id).indexOf(str) >= 0)
                    {
                        result.push(def);
                    }
                }
                this._dp = new eui.ArrayCollection(result.sort(SortUtil.blindUpSort));
            }
        } else
        {
            this.focuseOutGroup.visible = true;
            this._dp = new eui.ArrayCollection(PlayingFieldManager.roomList.sort(SortUtil.blindUpSort));
        }
        this.refreshUI();
    }
    /**
     * 房间信息列表点击触发事件
    */
    private onRoomClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.list.selectedItem)
        {
            if (UserManager.userInfo.gold >= this.list.selectedItem.definition.SBuyin)
            {
                if ((this.list.selectedItem.definition.type == PlayingFieldType.PlayFieldPersonal || this.list.selectedItem.definition.type == PlayingFieldType.OmahaPersonal) && this.list.selectedItem.hasPwd)
                {
                    UIManager.showPanel(UIModuleName.EnterRoomPwdPanel, this.list.selectedItem.id);
                } else
                {
                    //进入房间
                    GamblingManager.reqEnterRoom(this.list.selectedItem.id);
                }
            } else
            {
                let minNum: number = this.list.selectedItem.definition.SBuyin;
                UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { minNum: minNum, isGoldInsufficient: true });
            }
        }
    }
    /**
     * 打开商城面板
    */
    private openShoppingPanel(type: ShopGroupIndex)
    {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { tab: type });
        UIManager.closePanel(UIModuleName.PlayingFieldPanel);
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        this._anime.onCloseBtnClickHandler(event);
    }
}