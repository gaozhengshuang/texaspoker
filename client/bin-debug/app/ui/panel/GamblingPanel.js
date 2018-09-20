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
 * 牌局面板
 */
var GamblingPanel = (function (_super) {
    __extends(GamblingPanel, _super);
    function GamblingPanel() {
        var _this = _super.call(this) || this;
        _this._isNextRoundStart = false;
        _this._isOnAwaked = false;
        _this.isTween = false;
        _this.setSkinName(UIModuleName.GamblingPanel);
        return _this;
    }
    Object.defineProperty(GamblingPanel.prototype, "card1", {
        get: function () {
            if (!this._card1) {
                this.createCard(1);
            }
            return this._card1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingPanel.prototype, "card2", {
        get: function () {
            if (!this._card2) {
                this.createCard(2);
            }
            return this._card2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingPanel.prototype, "card3", {
        get: function () {
            if (!this._card3) {
                this.createCard(3);
            }
            return this._card3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingPanel.prototype, "card4", {
        get: function () {
            if (!this._card4) {
                this.createCard(4);
            }
            return this._card4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingPanel.prototype, "card5", {
        get: function () {
            if (!this._card5) {
                this.createCard(5);
            }
            return this._card5;
        },
        enumerable: true,
        configurable: true
    });
    GamblingPanel.prototype.createCard = function (index) {
        this["_card" + index.toString()] = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
        this["_card" + index.toString()].scaleX = this["_card" + index.toString()].scaleY = 0.1;
        this["_card" + index.toString()].horizontalCenter = 0;
        this["_card" + index.toString()].verticalCenter = -183.5;
        this["_card" + index.toString()].visible = false;
        var showIndex = this.currencyGroup.getChildIndex(this.anteGroup);
        this.currencyGroup.addChildAt(this["_card" + index.toString()], showIndex);
    };
    Object.defineProperty(GamblingPanel.prototype, "cardList", {
        get: function () {
            if (!this._cardList) {
                this._cardList = new Array();
                for (var i = 1; i <= GamblingManager.MaxBoardNum; i++) {
                    this._cardList.push(this["card" + i.toString()]);
                }
            }
            return this._cardList;
        },
        enumerable: true,
        configurable: true
    });
    GamblingPanel.prototype.hideCard = function () {
        if (this._cardList) {
            var len = this.cardList.length;
            for (var i = 0; i < len; i++) {
                this.cardList[i].visible = false;
            }
        }
    };
    Object.defineProperty(GamblingPanel.prototype, "actionGroup", {
        get: function () {
            if (!this._actionGroup) {
                this._actionGroup = new GamblingActionComponent(UIComponentSkinName.GamblingActionComponent);
                this.addChildActionGroup();
            }
            return this._actionGroup;
        },
        enumerable: true,
        configurable: true
    });
    GamblingPanel.prototype.actionGroupHideAll = function (isTween) {
        if (this._actionGroup) {
            this._actionGroup.hideAll(isTween);
        }
    };
    GamblingPanel.prototype.addChildActionGroup = function () {
        var index = this.currencyGroup.getChildIndex(this.buttonPosFlagImg);
        this._actionGroup.horizontalCenter = 0;
        this._actionGroup.bottom = 171;
        this.currencyGroup.addChildAt(this._actionGroup, index);
    };
    Object.defineProperty(GamblingPanel.prototype, "waitNextRoundComponent", {
        get: function () {
            if (!this._waitNextRoundComponent) {
                this._waitNextRoundComponent = new WaitNextRoundComponent(UIComponentSkinName.WaitNextRoundComponent);
                this._waitNextRoundComponent.horizontalCenter = 0;
                this._waitNextRoundComponent.verticalCenter = -152;
                this._waitNextRoundComponent.init(null);
                this.currencyGroup.addChild(this._waitNextRoundComponent);
            }
            return this._waitNextRoundComponent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingPanel.prototype, "panelState", {
        get: function () {
            return this._panelState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingPanel.prototype, "stateIndex", {
        get: function () {
            return this._stateIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingPanel.prototype, "sptCreater", {
        get: function () {
            return this._sptCreater;
        },
        enumerable: true,
        configurable: true
    });
    GamblingPanel.prototype.onAwake = function (event) {
        var _this = this;
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.tweenGroup.visible = false;
        var createIndex = 1;
        var func = function () {
            if (createIndex > GamblingPanelSetting.MaxPitIndex) {
                _this.delayAwake();
            }
            else {
                _this["pit" + createIndex.toString()] = new GamblingHeadComponent(UIComponentSkinName.GamblingHeadComponent);
                qin.Tick.AddTimeoutInvoke(func, 100, _this);
            }
            createIndex++;
        };
        this.ordinaryRoomGroup.removeChild(this.allInAnimeGroup);
        qin.Tick.AddTimeoutInvoke(func, 100, this);
        VersionManager.setComponentVisibleBySafe(this.safeBtn, this.activityBtn);
        if (qin.System.isMicro) {
            this.recordBtn = new AudioRecordButton(this.audioRecordBtn, this);
        }
    };
    GamblingPanel.prototype.delayAwake = function () {
        this.tweenGroup.visible = true;
        this.pitList = new Array();
        var pitInfo;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingPanelSetting.MaxPitIndex; i++) {
            pitInfo = new GamblingPitInfo();
            pitInfo.index = i;
            pitInfo.headComponent = this["pit" + i.toString()];
            pitInfo.headComponent.parentPanel = this;
            pitInfo.headComponent.posIndex = i;
            this.pitList.push(pitInfo);
        }
        this.setPit();
        this.allinAnime = new GamblingPanelAllinAnime(this);
        var showIndex = this.currencyGroup.getChildIndex(this.buttonPosFlagImg);
        //显示头像
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingPanelSetting.MaxPitIndex; i++) {
            this.currencyGroup.addChildAt(this["pit" + i.toString()], showIndex - 1);
        }
        this.initShow();
        this.addRedPoint();
        this.currencyGroup.touchEnabled = false;
        this.ordinaryRoomGroup.touchEnabled = false;
        this._sptCreater = new GamblingSupportCreater(this);
        this._isOnAwaked = true;
        this.onEnable(null);
        this.init(this.panelData);
    };
    /**
     * 加入红点提示
    */
    GamblingPanel.prototype.addRedPoint = function () {
        UIUtil.addSingleNotify(this.onlineAwardBtn, NotifyType.Gambling_TimeAward, -7, -5);
        UIUtil.addSingleNotify(this.chatBtn, NotifyType.HundredWar_Chat, -7, -5);
        UIUtil.addMultiNotify(this.activityBtn, NotifyType.ActivityRedPoint, UIModuleName.GamblingPanel, 0, 0);
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
            switch (GamblingManager.roomInfo.definition.type) {
                case PlayingFieldType.Primary:
                    UIUtil.addSingleNotify(this.achieveBtn, NotifyType.Achieve_PrimaryPattern, -7, -5);
                    break;
                case PlayingFieldType.Middle:
                    UIUtil.addSingleNotify(this.achieveBtn, NotifyType.Achieve_MiddlePattern, -7, -5);
                    break;
                case PlayingFieldType.High:
                    UIUtil.addSingleNotify(this.achieveBtn, NotifyType.Achieve_HighPattern, -7, -5);
                    break;
            }
        }
    };
    GamblingPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (this._isOnAwaked) {
            this.initPanel();
        }
    };
    GamblingPanel.prototype.initPanel = function () {
        this._stateIndex = GamblingUtil.gamblingPanelStateIndex;
        if (!this._stateIndex) {
            this._stateIndex = GamblingPanelStateIndex.Normal;
        }
        this.initShow();
        if (!this._actionGroup && GamblingManager.self) {
            this.initActionGroup();
        }
        if (this._actionGroup && !GamblingManager.self) {
            this.initActionGroup();
        }
        if (GamblingManager.isQuicklyEnter) {
            GamblingManager.reqQuicklyBuyInGame();
        }
        this.switchState();
        ChannelManager.checkUnFinishedPayList();
        this._isNextRoundStart = false;
        //牌局面板初始化完毕
        UIManager.dispatchEvent(UIModuleName.GamblingPanel, UIModuleEvent.COMPLETE);
    };
    /**
     * 初始化行动组件 坐下来执行
     */
    GamblingPanel.prototype.initActionGroup = function () {
        this.actionGroup.init(null);
        this.actionGroup.brightCardBtn.visible = false;
        this.actionGroup.immediatelyBrightCardBtn.visible = false;
        this.actionGroup.hideAll(false);
        this.actionGroup.hidePreActionGroup(false);
        this.actionGroup.visible = true;
    };
    /**
     * 显示操作组
     */
    GamblingPanel.prototype.tryAddChildActionGroup = function () {
        if (this._actionGroup) {
            this.addChildActionGroup();
            this._actionGroup.addChild(this._actionGroup.preActionGroup);
        }
    };
    GamblingPanel.prototype.switchState = function () {
        if (this._panelState) {
            this._panelState.clear();
        }
        this._panelState = this.getState();
        this._panelState.onEnable();
        this._panelState.initialize();
        this._panelState.run();
    };
    GamblingPanel.prototype.getState = function () {
        switch (this._stateIndex) {
            case GamblingPanelStateIndex.Normal:
                if (!this._normalState) {
                    this._sptCreater.createNormal();
                    this._normalState = new GamblingPanelNormalState(this, this._sptCreater.supportNormalList);
                    this._normalState.onAwake();
                }
                return this._normalState;
            case GamblingPanelStateIndex.MatchWait:
                if (!this._matchWaitState) {
                    this._sptCreater.createMttWait();
                    this._matchWaitState = new GamblingPanelMatchWaitState(this, this._sptCreater.supportMatchWaitList);
                    this._matchWaitState.onAwake();
                }
                return this._matchWaitState;
            case GamblingPanelStateIndex.Match:
                if (!this._matchState) {
                    this._sptCreater.createMtt();
                    this._matchState = new GamblingPanelMatchState(this, this._sptCreater.supportMatchList);
                    this._matchState.onAwake();
                }
                return this._matchState;
            case GamblingPanelStateIndex.Omaha:
                if (!this._omahaState) {
                    this._sptCreater.createOmaha();
                    this._omahaState = new GamblingPanelOmahaState(this, this._sptCreater.supportOmahaList);
                    this._omahaState.onAwake();
                }
                return this._omahaState;
            case GamblingPanelStateIndex.Guide:
                if (!this._guidState) {
                    this._sptCreater.createGuide();
                    this._guidState = new GamblingPanelGuideState(this, this._sptCreater.supportGuideList);
                    this._guidState.onAwake();
                }
                return this._guidState;
            case GamblingPanelStateIndex.GuidePlayWay:
                if (!this._guidePlayWayState) {
                    this._sptCreater.createGuidePlayWay();
                    this._guidePlayWayState = new GamblingPanelGuidePlayWayState(this, this._sptCreater.supportGuidePlayWayList);
                    this._guidePlayWayState.onAwake();
                }
                return this._guidePlayWayState;
            default:
                qin.Console.logError("牌局面板状态异常！" + this._stateIndex);
                return null;
        }
    };
    /**
     * 锦标赛 换房间调用
     */
    GamblingPanel.prototype.switchToGameSceneInRoom = function () {
        if (this._isOnAwaked) {
            this.onDisable(null);
            this.onEnable(null);
            this.initPanel();
        }
    };
    GamblingPanel.prototype.initShow = function () {
        if (this._waitNextRoundComponent) {
            this._waitNextRoundComponent.show(false);
        }
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingPanelSetting.MaxPitIndex; i++) {
            this["pit" + i.toString()].visible = false;
        }
        this.buttonPosFlagImg.visible = false;
        this.winAnimeGroup.visible = false;
    };
    GamblingPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GamblingPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        if (this._isOnAwaked) {
            GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
        }
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onReconnectHandler, this);
    };
    GamblingPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        if (this._isOnAwaked) {
            if (this._panelState) {
                this._panelState.onDisable();
            }
            this.resetPitIndex();
            qin.Tick.RemoveTimeoutInvoke(this.delayHideGroup, this);
            GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
            if (this._actionGroup && this.sptCreater.funcSupport) {
                this.sptCreater.funcSupport.removeActionGroupClickEvent();
            }
        }
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onReconnectHandler, this);
    };
    GamblingPanel.prototype.onReconnectHandler = function (isReconnect) {
        if (isReconnect && this._isOnAwaked) {
            this.initPanel();
        }
    };
    /**
    * 隐藏头像的状态组
    */
    GamblingPanel.prototype.hideSateGroup = function (isOneLoopOver) {
        if (isOneLoopOver === void 0) { isOneLoopOver = false; }
        this._isNextRoundStart = false;
        qin.Tick.RemoveTimeoutInvoke(this.delayHideGroup, this);
        qin.Tick.AddTimeoutInvoke(this.delayHideGroup, 500, this, isOneLoopOver);
    };
    GamblingPanel.prototype.nextRoundStartHandler = function () {
        this._isNextRoundStart = true;
    };
    GamblingPanel.prototype.delayHideGroup = function (isOneLoopOver) {
        if (isOneLoopOver === void 0) { isOneLoopOver = false; }
        if (this._isNextRoundStart == false) {
            for (var _i = 0, _a = this.pitList; _i < _a.length; _i++) {
                var pitInfo = _a[_i];
                //弃牌状态在一轮圈注之后不隐藏
                if (isOneLoopOver) {
                    if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.state == PlayerState.WaitAction) {
                        pitInfo.headComponent.showStateGroup(false);
                    }
                }
                else {
                    pitInfo.headComponent.showStateGroup(false);
                }
            }
        }
    };
    GamblingPanel.prototype.resetPitIndex = function () {
        var pitInfo;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingPanelSetting.MaxPitIndex; i++) {
            pitInfo = this.pitList[i - 1];
            pitInfo.index = i;
            pitInfo.headComponent.posIndex = i;
        }
    };
    /**
     * 清理底池显示
     */
    GamblingPanel.prototype.clearPotChips = function () {
        this.potChipsGroup.visible = false;
        if (this.potChipsGroup["dataList"]) {
            this.potChipsGroup["dataList"].length = 0;
        }
        for (var i = 0; i < this.chipsBgGroup.numChildren; i++) {
            var chipsShowComponent1 = this.chipsBgGroup.getChildAt(i);
            var chipsShowComponent2 = this.chipsNumGroup.getChildAt(i);
            chipsShowComponent1.clear();
            chipsShowComponent2.clear();
        }
        this.chipsBgGroup.removeChildren();
        this.chipsNumGroup.removeChildren();
    };
    GamblingPanel.prototype.onClose = function () {
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    /**
     * 设置头像的坑位信息
     */
    GamblingPanel.prototype.setPit = function () {
        if (this.pitList) {
            var len = this.pitList.length;
            var pitInfo = void 0;
            for (var i = 0; i < len; i++) {
                pitInfo = this.pitList[i];
                if (pitInfo) {
                    pitInfo.headComponent.setPit(pitInfo.index);
                }
            }
        }
    };
    /**
     * 获取当前坑位的playerpos
     */
    GamblingPanel.prototype.getPlayerPos = function (pit) {
        return this._sptCreater.pitDataSupport.getPlayerPos(pit);
    };
    /**
     * 根据玩家位置获取坑位信息
     */
    GamblingPanel.prototype.getPitInfo = function (playerPos) {
        return this._sptCreater.pitDataSupport.getPitInfo(playerPos);
    };
    /**
     * 根据索引获取坑位信息
     */
    GamblingPanel.prototype.getPitInfoByIndex = function (index) {
        return this._sptCreater.pitDataSupport.getPitInfoByIndex(index);
    };
    /**
     * 获取头像组件，根据玩家位置
     */
    GamblingPanel.prototype.getHeadComponent = function (playerPos) {
        return this._sptCreater.pitDataSupport.getHeadComponent(playerPos);
    };
    /**
     * 根据角色信息获取角色所在的头像组件
     */
    GamblingPanel.prototype.getHeadComponentByRole = function (role) {
        if (role instanceof PlayerInfo) {
            return this._sptCreater.pitDataSupport.getHeadComponent(role.pos);
        }
        else {
            var pInfo = GamblingManager.getPlayerInfo(role);
            if (pInfo) {
                return this._sptCreater.pitDataSupport.getHeadComponent(pInfo.pos);
            }
        }
        return null;
    };
    /**
     * 根据上一次的roleID获取头像组件 由于玩家在结算之前离开，但是又赢牌了的情况（只有两家同时allin）
     */
    GamblingPanel.prototype.getHeadComponentByLastRoleId = function (roleId) {
        for (var _i = 0, _a = this.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            if (pitInfo.headComponent.lastRoleId == roleId) {
                return pitInfo.headComponent;
            }
        }
        return null;
    };
    /**
     * 获取下一个有玩家的坑位信息 如果都没有则返回null
     */
    GamblingPanel.prototype.getNextPlayerPitInfo = function (pit) {
        return this._sptCreater.pitDataSupport.getNextPlayerPitInfo(pit);
    };
    /**
     * 获取下一个位置的玩家信息
     */
    GamblingPanel.prototype.getNextPlayerInfo = function (playerPos) {
        return this._sptCreater.pitDataSupport.getNextPlayerInfo(playerPos);
    };
    /**
     * 根据玩家信息获取坑位信息
     */
    GamblingPanel.prototype.getPitInfoByPlayerInfo = function (playerInfo) {
        return this._sptCreater.pitDataSupport.getPitInfoByPlayerInfo(playerInfo);
    };
    Object.defineProperty(GamblingPanel.prototype, "downEffect", {
        get: function () {
            if (!this._downEffect) {
                this._downEffect = new DownEfffectComponent(UIComponentSkinName.DownEfffectComponent);
                this._downEffect.init();
            }
            return this._downEffect;
        },
        enumerable: true,
        configurable: true
    });
    GamblingPanel.prototype.showDownEffect = function (parent) {
        this.downEffect.run(parent);
    };
    GamblingPanel.prototype.hideDownEffect = function () {
        this.downEffect.init();
    };
    /**
     * 刷新按钮位置
     */
    GamblingPanel.prototype.refreshButtonPos = function () {
        this._sptCreater.buttonPosSpt.initialize();
    };
    /**
     * 移动牌局
     */
    GamblingPanel.prototype.gameGroupMove = function () {
        this._sptCreater.moveSpt.move();
    };
    GamblingPanel.prototype.moveTouchEnd = function (event) {
        if (this.gameGroup.x > 0) {
            this._sptCreater.moveSpt.onTouchBegin(event);
            this._sptCreater.moveSpt.onTouchEnd(event, true);
            return true;
        }
        return false;
    };
    /**
     * 锦标赛结束处理
     */
    GamblingPanel.prototype.checkRebuyAddon = function () {
        this._sptCreater.championshipSupport.checkRebuyAddon();
    };
    return GamblingPanel;
}(BasePanel));
__reflect(GamblingPanel.prototype, "GamblingPanel");
//# sourceMappingURL=GamblingPanel.js.map