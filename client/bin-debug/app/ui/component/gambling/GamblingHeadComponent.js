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
 * 牌局玩家头像组件
 */
var GamblingHeadComponent = (function (_super) {
    __extends(GamblingHeadComponent, _super);
    function GamblingHeadComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._chipsShowState = ChipsShowState.LeftDown;
        return _this;
    }
    Object.defineProperty(GamblingHeadComponent.prototype, "cardFace1", {
        /**
         * 卡牌1
         */
        get: function () {
            return this._cardFace1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "cardFace2", {
        /**
         * 卡牌2
         */
        get: function () {
            return this._cardFace2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "cardFace3", {
        /**
         * 卡牌3
         */
        get: function () {
            return this._cardFace3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "cardFace4", {
        /**
         * 卡牌4
         */
        get: function () {
            return this._cardFace4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "cdComponent", {
        /**
         * CD效果组件
         */
        get: function () {
            if (!this._cdComponent) {
                this._cdComponent = new GamblingCdComponent(UIComponentSkinName.GamblingCdComponent);
                this._cdComponent.touchEnabled = this._cdComponent.touchChildren = false;
            }
            return this._cdComponent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "nowState", {
        /**
         * 当前状态
         */
        get: function () {
            return this._nowState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "cardAnimationSpt", {
        get: function () {
            return this._cardAnimationSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "pitIndex", {
        get: function () {
            return this._pitIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingHeadComponent.prototype, "flopIndex", {
        /**
         * 发牌索引
         */
        get: function () {
            return this._flopIndex;
        },
        set: function (value) {
            this.showHaveCardImg(false);
            if (GamblingUtil.isOmaha) {
                if (value == 1) {
                    this.haveCard1.visible = true;
                }
                else if (value == 2) {
                    this.haveCard1.visible = this.haveCard2.visible = true;
                }
                else if (value == 3) {
                    this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = true;
                }
                else if (value == 4) {
                    this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = this.haveCard4.visible = true;
                }
            }
            else {
                if (value == 1) {
                    this.haveCard2.visible = true;
                }
                else if (value == 2) {
                    this.haveCard2.visible = this.haveCard3.visible = true;
                }
            }
            this._flopIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    GamblingHeadComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maxWidth = 96;
        this.maxHeight = 150;
        this.stateGroup.visible = false;
        /**
         * 坐下转动动画
         */
        this.turnAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.CommonMoveToRelativelyPos);
        this.turnAnim.setTarget(this);
        this._emptyState = new GamblingHeadEmptyState(this);
        this._waitNextState = new GamblingHeadWiatNextState(this);
        this._foldState = new GamblingHeadFoldState(this);
        this._actionedState = new GamblingHeadActionedState(this);
        this._waitActionState = new GamblingHeadWaitActionState(this);
        this._onActionState = new GamblingHeadOnActionState(this);
        this._sitDownState = new GamblingHeadSitDownState(this);
        this._roundStartState = new GamblingHeadRoundStartState(this);
        this._thanTheCard = new GamblingHeadThanTheCardState(this);
        this._cardAnimationSpt = new GamblingHeadCardAnimationSupport(this);
        this._headChatSpt = new GamblingHeadChatSupport(this);
        // this._cdComponent.scaleX = 1.14;
        // this._cdComponent.scaleY = 1.14;
        // this.haveCard2.matrix = new egret.Matrix(0.498, 0.042, -0.042, 0.498, this.haveCard2.x, this.haveCard2.y);
        // this.haveCard3.matrix = new egret.Matrix(0.497, -0.05, 0.05, 0.497, this.haveCard3.x, this.haveCard3.y);
        this.maskImg.touchEnabled = false;
        this._cardFace1 = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
        this._cardFace2 = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
        this._cardFace3 = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
        this._cardFace4 = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
        var index = this.getChildIndex(this.maskImg);
        if (index < 0) {
            index = 0;
        }
        var showIndex = index - 2;
        this.addChildAt(this._cardFace1, showIndex);
        this.addChildAt(this._cardFace2, this.getChildIndex(this._cardFace1) + 1);
        this.addChildAt(this._cardFace3, this.getChildIndex(this._cardFace2) + 1);
        this.addChildAt(this._cardFace4, this.getChildIndex(this._cardFace3) + 1);
        this.dispatchEvent(new UIModuleEvent(UIModuleEvent.COMPLETE, qin.StringConstants.Empty));
    };
    /**
     * 默认初始化
     */
    GamblingHeadComponent.prototype.init = function (data) {
        this.realInit(data, true);
    };
    /**
     * 坐下初始化
     */
    GamblingHeadComponent.prototype.sitDownInit = function (data) {
        this.realInit(data, false);
    };
    /**
     * 执行初始化
     */
    GamblingHeadComponent.prototype.realInit = function (data, isChangeState) {
        _super.prototype.init.call(this, data);
        this.chatGroup.visible = false;
        this.emojiImg.visible = false;
        this.voiceGroup.visible = false;
        if (data) {
            this.playerGroup.visible = true;
            this.emptyGroup.visible = false;
            this.lastRoleId = data.roleId;
        }
        else {
            this.setEmpty();
            this.playerGroup.visible = false;
            this._cardAnimationSpt.clear();
            this.headIcon.clear();
        }
        //断线重连的问题 是自己且有手牌
        if (data) {
            if (data.roleId == UserManager.userInfo.roleId) {
                if (data.state == PlayerState.WaitNext) {
                    //刚坐下来算自己，如果有刚好两个玩家则请求下一局
                    if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
                        if (GamblingManager.roomInfo.playerList.length == 2) {
                            if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.definition.type == MatchType.SNG) {
                                this.sngReqNextRound();
                            }
                            else {
                                qin.Tick.AddTimeoutInvoke(this.tryReqNextRound, 2000, this);
                            }
                        }
                        else {
                            var isAllWaitNext = true;
                            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                                var sitPlayer = _a[_i];
                                if (sitPlayer.state != PlayerState.WaitNext) {
                                    isAllWaitNext = false;
                                }
                            }
                            if (isAllWaitNext) {
                                if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.definition.type == MatchType.SNG) {
                                    this.sngReqNextRound();
                                }
                                else {
                                    qin.Tick.AddTimeoutInvoke(this.tryReqNextRound, 2000, this);
                                }
                            }
                        }
                    }
                }
                // this.scaleX = this.scaleY = 1;
                if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.handCard) {
                    this.showSelfHandlerCard();
                }
                else {
                    qin.Console.log("自己无手牌");
                    this.showCardFace(false);
                }
            }
            else {
                this.showCardFace(false);
            }
        }
        else {
            // this.scaleX = this.scaleY = 0.885;
            this.showCardFace(false);
        }
        //显示有牌的逻辑处理
        if (data && data.roleId != UserManager.userInfo.roleId && GamblingUtil.isOnProcess(data)) {
            //断线重连的问题 在牌桌上肯定手里有2张牌(奥马哈4张)
            if (GamblingUtil.isOmaha) {
                this.flopIndex = 4;
            }
            else {
                this.flopIndex = 2;
            }
            this.showHaveCardImg(true);
        }
        else {
            this.showHaveCardImg(false);
        }
        if (isChangeState) {
            var tmpState = void 0;
            if (GamblingUtil.getIsOnAction(this.bindData)) {
                tmpState = GamblingHeadStateType.OnAction;
                this.changeState(tmpState, false);
            }
            else {
                tmpState = this.getHeadStateByPlayerState();
                this.changeState(tmpState);
            }
        }
        this.showHead();
        this.showChipsComponent();
        this.showCardTypeBgFilter(0);
        this.chipsAnimLabel.visible = false;
        this._headChatSpt.initialize();
        this.refreshVip();
    };
    GamblingHeadComponent.prototype.setEmpty = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
            this.emptyGroup.visible = false;
        }
        else {
            if (this.bindData) {
                this.emptyGroup.visible = false;
            }
            else {
                this.emptyGroup.visible = true;
            }
        }
    };
    GamblingHeadComponent.prototype.tryReqNextRound = function () {
        GamblingManager.reqNextRoundStart();
    };
    GamblingHeadComponent.prototype.sngReqNextRound = function () {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
            var time = TimeManager.GetServerUtcTimestamp() - GamblingManager.matchRoomInfo.startTime;
            if (GamblingManager.matchRoomInfo.definition.type == MatchType.SNG && time <= GamblingManager.matchRoomInfo.definition.waitingTime) {
                GamblingManager.sngNextRoundStart(GamblingManager.matchRoomInfo.definition.waitingTime - time);
            }
            else {
                GamblingManager.reqNextRoundStart();
            }
        }
    };
    //头像信息
    GamblingHeadComponent.prototype.showHead = function () {
        if (this.bindData) {
            this.headIcon.init(this.bindData, 90);
            this.headIcon.visible = true;
            this.borderImg.visible = true;
            if (this.bindData.userInfo) {
                if (this.bindData.userInfo.name) {
                    if (this.bindData.userInfo.name.length > 3) {
                        var size = qin.CodeUtil.getStringByteLength(this.bindData.userInfo.name);
                        if (size <= 9) {
                            this.infoLabel.text = this.bindData.userInfo.name;
                        }
                        else {
                            this.infoLabel.text = this.bindData.userInfo.name.substr(0, 3) + "...";
                        }
                    }
                    else {
                        this.infoLabel.text = this.bindData.userInfo.name;
                    }
                }
                else {
                    this.infoLabel.text = qin.StringConstants.Empty;
                }
                this.refreshVip();
            }
            else {
                this.infoLabel.text = qin.StringConstants.Empty;
            }
        }
        else {
            this.headIcon.visible = false;
            this.borderImg.visible = false;
            this.infoLabel.text = qin.StringConstants.Empty;
        }
    };
    GamblingHeadComponent.prototype.refreshChipsShow = function (pitIndex, seatMode) {
        switch (seatMode) {
            case SeatMode.Three:
                if (pitIndex <= 2) {
                    this._chipsShowState = ChipsShowState.RightDown;
                }
                else {
                    this._chipsShowState = ChipsShowState.LeftDown;
                }
                break;
            case SeatMode.Five:
                if (pitIndex <= 3) {
                    this._chipsShowState = ChipsShowState.RightDown;
                }
                else {
                    this._chipsShowState = ChipsShowState.LeftDown;
                }
                break;
            case SeatMode.Nine:
                if (pitIndex <= 5) {
                    this._chipsShowState = ChipsShowState.RightDown;
                }
                else {
                    this._chipsShowState = ChipsShowState.LeftDown;
                }
                break;
            case SeatMode.Six:
                if (pitIndex <= 3) {
                    this._chipsShowState = ChipsShowState.RightDown;
                }
                else if (pitIndex == 4) {
                    this._chipsShowState = ChipsShowState.LeftDown;
                }
                else if (pitIndex > 4) {
                    this._chipsShowState = ChipsShowState.LeftDown;
                }
                break;
        }
        this.chipsSingleShowComponent.top = undefined;
        this.chipsSingleShowComponent.horizontalCenter = undefined;
        this.chipsSingleShowComponent.left = undefined;
        this.chipsSingleShowComponent.right = undefined;
        this.chipsSingleShowComponent.bottom = undefined;
        switch (this._chipsShowState) {
            case ChipsShowState.Top:
                this.chipsSingleShowComponent.horizontalCenter = 0;
                this.chipsSingleShowComponent.top = -94;
                break;
            case ChipsShowState.Left:
                this.chipsSingleShowComponent.right = this.width - 1;
                this.chipsSingleShowComponent.bottom = 7;
                break;
            case ChipsShowState.Right:
                this.chipsSingleShowComponent.left = this.width - 1;
                this.chipsSingleShowComponent.bottom = 7;
                break;
            case ChipsShowState.LeftDown:
                this.chipsSingleShowComponent.left = -55;
                this.chipsSingleShowComponent.bottom = 0;
                break;
            case ChipsShowState.RightDown:
                this.chipsSingleShowComponent.right = -55;
                this.chipsSingleShowComponent.bottom = 5;
                break;
        }
        this.showChipsComponent();
    };
    /**
     * 设置坑位
     */
    GamblingHeadComponent.prototype.setPit = function (pit) {
        this._pitIndex = pit;
    };
    /**
     * 外部控制状态改变
     */
    GamblingHeadComponent.prototype.changeState = function (headState, params) {
        if (headState == undefined) {
            headState = this.getHeadStateByPlayerState();
        }
        var state = this.getHeadState(headState);
        this._nowState = state;
        this._nowState.run(params);
    };
    GamblingHeadComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
    };
    GamblingHeadComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this._headChatSpt.onEnable();
    };
    GamblingHeadComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.headIcon.clear();
        this._headChatSpt.onDisable();
        qin.Tick.RemoveTimeoutInvoke(this.hideWinEffect, this);
        qin.Tick.RemoveTimeoutInvoke(this.tryReqNextRound, this);
        this._cardAnimationSpt.clear();
    };
    /**
    * 隐藏全部
    */
    GamblingHeadComponent.prototype.hideAll = function () {
        // this.infoLabel.visible = false;
        // this.chipsLabel.visible = false;
        // this.winEffectImg.visible = false;
        this.showMask(false);
        this.foldBackCard.visible = false;
        this.hideCdComponent();
    };
    GamblingHeadComponent.prototype.hideCdComponent = function () {
        if (this.cdComponent.parent) {
            this.cdComponent.parent.removeChild(this.cdComponent);
        }
    };
    /**
     * 显示卡牌牌面
     */
    GamblingHeadComponent.prototype.showCardFace = function (flag) {
        this.cardFace1.visible = flag;
        this.cardFace2.visible = flag;
        this.cardFace3.visible = false;
        this.cardFace4.visible = false;
        if (GamblingUtil.isOmaha) {
            this.cardFace3.visible = flag;
            this.cardFace4.visible = flag;
        }
        if (this.bindData && this.bindData.roleId == UserManager.userInfo.roleId) {
            qin.Console.log("显示隐藏自己的手牌：" + flag);
        }
    };
    /**
     * 显示有牌状态
     */
    GamblingHeadComponent.prototype.showHaveCardImg = function (flag) {
        if (flag) {
            this.showHaveCardImg(false);
            if (GamblingUtil.isOmaha) {
                if (this.flopIndex == 1) {
                    this.haveCard1.visible = true;
                }
                else if (this.flopIndex == 2) {
                    this.haveCard1.visible = this.haveCard2.visible = true;
                }
                else if (this.flopIndex == 3) {
                    this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = true;
                }
                else if (this.flopIndex == 4) {
                    this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = this.haveCard4.visible = true;
                }
            }
            else {
                if (this.flopIndex == 1) {
                    this.haveCard2.visible = true;
                }
                else if (this.flopIndex == 2) {
                    this.haveCard2.visible = this.haveCard3.visible = true;
                }
            }
        }
        else {
            this.haveCard1.visible = this.haveCard2.visible = this.haveCard3.visible = this.haveCard4.visible = flag;
        }
    };
    /**
     * 显示基本的元素
     */
    GamblingHeadComponent.prototype.showBase = function () {
        this.setEmpty();
        // this.infoLabel.visible = true;
        // this.chipsLabel.visible = true;
    };
    /**
     * 赢取筹码动画
     */
    GamblingHeadComponent.prototype.runWinChipsAnim = function (num) {
        if (!this._winChipsAnim) {
            this._winChipsAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.WinChips);
            this._winChipsAnim.setTarget(this.chipsAnimLabel);
        }
        this.chipsAnimLabel.text = "+" + qin.MathUtil.formatNum(num);
        this.chipsAnimLabel.visible = true;
        this._winChipsAnim.run();
        SoundManager.playEffect(MusicAction.chipfly);
    };
    /**
     * 弃牌动画
     */
    GamblingHeadComponent.prototype.runFoldAnim = function (point) {
        if (!this._foldCardAnim) {
            this._foldCardAnim = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FoldCard);
            this._foldCardAnim.setTarget(this.foldBackCard);
        }
        this._foldCardAnim.run(point);
    };
    /**
    * 获取头像状态 根据人物状态
    */
    GamblingHeadComponent.prototype.getHeadStateByPlayerState = function () {
        if (!this.bindData) {
            return GamblingHeadStateType.Empty;
        }
        switch (this.bindData.state) {
            case PlayerState.WaitNext://等待下一局
                return GamblingHeadStateType.WaitNext;
            case PlayerState.Fold://弃牌
                return GamblingHeadStateType.FoldCard;
            case PlayerState.Check:
            case PlayerState.Raise:
            case PlayerState.Call:
            case PlayerState.AllIn://已说话
                return GamblingHeadStateType.Actioned;
            case PlayerState.Blind:
            case PlayerState.WaitAction://等待说话
                return GamblingHeadStateType.WaitAction;
            default://都没有则为等待下一局状态
                return GamblingHeadStateType.WaitNext;
        }
    };
    /**
     * 获取头像的状态
     */
    GamblingHeadComponent.prototype.getHeadState = function (state) {
        switch (state) {
            case GamblingHeadStateType.Empty:
                return this._emptyState;
            case GamblingHeadStateType.SitDown:
                return this._sitDownState;
            case GamblingHeadStateType.WaitNext:
                return this._waitNextState;
            case GamblingHeadStateType.RoundStart:
                return this._roundStartState;
            case GamblingHeadStateType.WaitAction:
                return this._waitActionState;
            case GamblingHeadStateType.OnAction:
                return this._onActionState;
            case GamblingHeadStateType.Actioned:
                return this._actionedState;
            case GamblingHeadStateType.FoldCard:
                return this._foldState;
            case GamblingHeadStateType.ThanTheCard:
                return this._thanTheCard;
        }
    };
    /**
    * 显示自己的手牌
    */
    GamblingHeadComponent.prototype.showSelfHandlerCard = function () {
        this.showCardFace(true);
        this.cardFace1.init(GamblingManager.roomInfo.handCard[0]);
        this.cardFace2.init(GamblingManager.roomInfo.handCard[1]);
        this.cardFace1.initElementsShow2();
        this.cardFace2.initElementsShow2();
        if (GamblingManager.self.state == PlayerState.Fold) {
            this.cardFace1.maskImg.visible = true;
            this.cardFace2.maskImg.visible = true;
        }
        else {
            this.cardFace1.maskImg.visible = false;
            this.cardFace2.maskImg.visible = false;
        }
        if (GamblingUtil.isOmaha) {
            this.cardFace3.init(GamblingManager.roomInfo.handCard[2]);
            this.cardFace4.init(GamblingManager.roomInfo.handCard[3]);
            this.cardFace3.initElementsShow2();
            this.cardFace4.initElementsShow2();
            this.cardFace1.matrix = GamblingPanelSetting.handCardMatrix3;
            this.cardFace2.matrix = GamblingPanelSetting.handCardMatrix4;
            this.cardFace3.matrix = GamblingPanelSetting.handCardMatrix5;
            this.cardFace4.matrix = GamblingPanelSetting.handCardMatrix6;
            if (GamblingManager.self.state == PlayerState.Fold) {
                this.cardFace3.maskImg.visible = true;
                this.cardFace4.maskImg.visible = true;
            }
            else {
                this.cardFace3.maskImg.visible = false;
                this.cardFace4.maskImg.visible = false;
            }
        }
        else {
            this.cardFace1.matrix = GamblingPanelSetting.handCardMatrix1;
            this.cardFace2.matrix = GamblingPanelSetting.handCardMatrix2;
        }
    };
    GamblingHeadComponent.prototype.showChipsComponent = function (reNum, isShowTween) {
        if (!reNum && this.bindData) {
            reNum = this.bindData.num;
        }
        if (reNum > 0 && reNum != this.chipsSingleShowComponent.bindData) {
            this.chipsSingleShowComponent.init({ num: reNum, state: this._chipsShowState, isShowTween: isShowTween });
        }
        if (this.bindData && this.bindData.num > 0) {
            this.chipsSingleShowComponent.visible = true;
        }
        else {
            this.chipsSingleShowComponent.visible = false;
        }
    };
    /**
    * 一局结束看看是否比牌或者亮牌
    */
    GamblingHeadComponent.prototype.roundOverHandler = function () {
        this.showHaveCardImg(false);
        if (this.bindData && GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.handCardList && GamblingManager.roundOverInfo.potList) {
            var len = GamblingManager.roundOverInfo.handCardList.length;
            var handCardInfo = void 0;
            for (var i = 0; i < len; i++) {
                handCardInfo = GamblingManager.roundOverInfo.handCardList[i];
                if (this.bindData.roleId == handCardInfo.roleId && handCardInfo.cardList && handCardInfo.cardList.length > 1) {
                    if (this.bindData.state != PlayerState.Fold) {
                        if (this.bindData.roleId != UserManager.userInfo.roleId) {
                            //比牌
                            this.cardFace1.init(handCardInfo.cardList[0]);
                            this.cardFace2.init(handCardInfo.cardList[1]);
                            this.cardFace1.showMask(true);
                            this.cardFace2.showMask(true);
                            if (GamblingUtil.isOmaha) {
                                this.cardFace3.init(handCardInfo.cardList[2]);
                                this.cardFace4.init(handCardInfo.cardList[3]);
                                this.cardFace3.showMask(true);
                                this.cardFace4.showMask(true);
                            }
                            this.changeState(GamblingHeadStateType.ThanTheCard);
                        }
                    }
                    else {
                        this.runBrightCard(handCardInfo.cardList); //弃牌状态收到了手牌信息
                    }
                    break;
                }
            }
        }
    };
    /**
     * 切换到亮牌
     */
    GamblingHeadComponent.prototype.runBrightCard = function (list) {
        this.showMask(false);
        this.chipsLabel.text = PlayerInfo.getStateDes(PlayerState.ShowCard);
        this.showCardTypeBgFilter(3);
        this.showBase();
        this.chipsSingleShowComponent.visible = false;
        if (this.parent) {
            this.parent.addChildAt(this, GamblingManager.maxSeats);
        }
        //let cardInfo: CardInfo = new CardInfo();
        //cardInfo.card = new Array<number>();
        //cardInfo.card.push(1, 4);
        //this.cardFace1.init(cardInfo);
        //cardInfo = new CardInfo();
        //cardInfo.card = new Array<number>();
        //cardInfo.card.push(1, 7);
        //this.cardFace2.init(cardInfo);
        // this.cardAnimationSpt.runBrightCard(this.waitNext, this);
        this.cardFace1.init(list[0]);
        this.cardFace2.init(list[1]);
        if (GamblingUtil.isOmaha) {
            this.cardFace3.init(list[2]);
            this.cardFace4.init(list[3]);
        }
        this.cardAnimationSpt.runBrightCard(this.waitNext, this, this.bindData.roleId);
    };
    GamblingHeadComponent.prototype.waitNext = function () {
    };
    /**
     * 部分状态不需要立即更新的显示筹码
     */
    GamblingHeadComponent.prototype.showBankRoll = function () {
        if (this.bindData) {
            if (this.bindData.lastBankRoll != undefined) {
                if (this.bindData.bankRoll <= this.bindData.lastBankRoll) {
                    this.chipsLabel.text = qin.MathUtil.formatNum(this.bindData.bankRoll);
                    //	qin.QinLog.log("showBankRoll小于显示筹码：" + this.bindData.bankRoll + this.bindData.userInfo.name);
                }
            }
            else {
                this.chipsLabel.text = qin.MathUtil.formatNum(this.bindData.bankRoll);
                //qin.QinLog.log("showBankRoll显示筹码：" + this.bindData.bankRoll + this.bindData.userInfo.name);
            }
        }
    };
    /**
     * 显示半透明黑色遮罩
     */
    GamblingHeadComponent.prototype.showMask = function (flag) {
        if (this.maskImg) {
            this.maskImg.visible = flag;
        }
        else {
            qin.Console.log("遮罩图片是空");
        }
    };
    /**
     * 坐下转动完毕之后显示
     */
    GamblingHeadComponent.prototype.showGroupAuto = function (isOffline) {
        this.showStateGroupAuto(isOffline);
        this.refreshChatGroup(); //刷新聊天位置
    };
    GamblingHeadComponent.prototype.showStateGroupAuto = function (isOffline) {
        if (this.bindData) {
            switch (this.bindData.state) {
                case PlayerState.Call:
                case PlayerState.Raise:
                case PlayerState.Check:
                case PlayerState.AllIn:
                case PlayerState.Fold:
                    this.refreshState(); //刷新状态组
                    break;
                case PlayerState.WaitAction:
                case PlayerState.Blind:
                    if (isOffline) {
                        this.showStateGroup(false); //在一局结束和一圈结束延迟隐藏
                    }
                    break;
            }
        }
    };
    /**
     * 显示状态组
     */
    GamblingHeadComponent.prototype.showStateGroup = function (flag) {
        this.stateGroup.visible = flag;
        if (flag) {
            this.refreshStateGroupPos();
        }
        qin.Console.log("状态组的visible:" + flag);
    };
    GamblingHeadComponent.prototype.refreshStateGroupPos = function () {
        if (this.posIndex <= GamblingPanelSetting.centerNum) {
            this.stateGroup.scaleX = this.stateLabel.scaleX = 1;
            this.stateGroup.x = 60;
            // this.stateLabel.x = 40.25;
        }
        else {
            this.stateGroup.scaleX = this.stateLabel.scaleX = -1;
            this.stateGroup.x = 32;
            // this.stateLabel.x = 91;
        }
    };
    /**
     * 刷新状态显示
     */
    GamblingHeadComponent.prototype.refreshState = function () {
        this.stateLabel.text = PlayerInfo.getStateDes(this.bindData.state);
        this.stateImg.source = PlayerInfo.getStateImgRes(this.bindData.state);
        this.showStateGroup(true);
    };
    /**
     * 旋转完毕重新设置聊天气泡的位置
     */
    GamblingHeadComponent.prototype.refreshChatGroup = function () {
        this._headChatSpt.setChatGroupPos();
    };
    GamblingHeadComponent.prototype.showCardTypeBgFilter = function (type) {
        switch (type) {
            case 1://显示牌型 未赢牌
                this.cardTypeBg.alpha = 1;
                this.chipsLabel.textColor = 0x000000;
                this.cardTypeBg.source = SheetSubName.Gambling_Head_BgType_Normal;
                break;
            case 2://显示牌型 赢牌
                this.cardTypeBg.alpha = 1;
                this.chipsLabel.textColor = 0x000000;
                this.cardTypeBg.source = SheetSubName.Gambline_Head_BgType_Win;
                break;
            case 3://显示亮牌
                this.cardTypeBg.alpha = 1;
                this.chipsLabel.textColor = 0x000000;
                this.cardTypeBg.source = SheetSubName.Gambling_Head_BgType_Normal;
                break;
            default://显示筹码
                this.cardTypeBg.alpha = 0.4;
                this.chipsLabel.textColor = 0xffffff;
                this.cardTypeBg.source = SheetSubName.Gambline_Head_BgType_Chips;
                this.hideWinEffect();
                break;
        }
    };
    /**
     * 显示赢牌特效
     */
    GamblingHeadComponent.prototype.showWinEffect = function () {
        var _this = this;
        AnimationFactory.getParticleEffect(AnimationType.WinCard, this, function (ptc) {
            _this._winEffect = ptc;
        });
    };
    /**
     * 隐藏赢牌特效
     */
    GamblingHeadComponent.prototype.hideWinEffect = function () {
        if (this._winEffect && this._winEffect.parent) {
            this._winEffect.stop();
            this._winEffect.parent.removeChild(this._winEffect);
        }
    };
    /**
     * 刷新vip
     */
    GamblingHeadComponent.prototype.refreshVip = function () {
        this.vipGroup.visible = false;
        if (this.bindData && this.bindData.userInfo && this.bindData.userInfo.vipLevel > 0) {
            this.vipGroup.visible = true;
            this.vipLabel.text = "VIP" + this.bindData.userInfo.vipLevel.toString();
        }
    };
    return GamblingHeadComponent;
}(BaseComponent));
__reflect(GamblingHeadComponent.prototype, "GamblingHeadComponent");
//# sourceMappingURL=GamblingHeadComponent.js.map