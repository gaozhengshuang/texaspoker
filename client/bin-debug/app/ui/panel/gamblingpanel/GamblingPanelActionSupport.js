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
 * 行为操作支持 仅自己
 */
var GamblingPanelActionSupport = (function (_super) {
    __extends(GamblingPanelActionSupport, _super);
    function GamblingPanelActionSupport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // private _panelShowStateList: qin.Dictionary<string, boolean> = new qin.Dictionary<string, boolean>();
        _this._excludePanel = [UIModuleName.GamblingPanel, UIModuleName.MarqueePanel, UIModuleName.AlertInfoPanel, UIModuleName.ChatPanel, UIModuleName.GuideChoosePanel, UIModuleName.GuideAnswerErrorPanel, UIModuleName.GuideQuestionPanel];
        return _this;
    }
    GamblingPanelActionSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._isBoardCardOver = true;
        this._isTimeOut = false;
        this.target.cancelTrusteeshipButton0.visible = this.target.cancelTrusteeshipButton.visible = false;
        this.clearPanelState();
        this.target.waitNextImg.visible = false;
        if (GamblingManager.self) {
            this.target.actionGroup.brightCardBtn.visible = false;
            this.target.actionGroup.immediatelyBrightCardBtn.visible = false;
            if (GamblingManager.self.state == PlayerState.WaitNext) {
                this.target.waitNextImg.visible = true;
            }
            this.changeState(GamblingManager.self.state, false);
            this.tryShowPreActionGroup(false);
        }
        this.refreshStiDownState();
        this.actionPosChangeHandler(true); //顺序不能倒过来
        if (!this._numContentInfo) {
            this._numContentInfo = new NumContentInfo();
        }
        this._numContentInfo.gap = 0;
        this._numContentInfo.limtiWidth = 80;
        this._numContentInfo.setImgWidHei(10, 15, 5, 13);
        this._numContentInfo.preFix = ResPrefixName.CountDown_Num;
        var time = GamblingManager.timeAwardHandler.time;
        if (time == undefined) {
            time = 0;
        }
        this._numContentInfo.content = qin.DateTimeUtil.countDownFormat(time, false);
        this.target.onlineAwardBtn["numComponent"].init(this._numContentInfo);
    };
    GamblingPanelActionSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.SitOrStandEvent.addListener(this.sitOrStandHandler, this);
        GamblingManager.PlayerStateChangeEvent.addListener(this.playerStateChangeHandler, this);
        GamblingManager.ActionPosChangeEvent.addListener(this.actionPosChangeHandler, this);
        GamblingManager.OneLoopOverEvent.addListener(this.boardCardChangeHandler, this);
        GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
        GamblingManager.timeAwardHandler.TimeAwardCountDownEvent.addListener(this.refreshTimeAwardTime, this);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.addListener(this.setNextTimeAwardInfo, this);
        GamblingManager.InTrusteeshipEvent.addListener(this.onInTrusteeshipEvent, this);
        GamblingManager.ActionOverEvent.addListener(this.onActionOverEvent, this);
        GamblingManager.TimeOutEvent.addListener(this.actionTimeOut, this);
        GamblingManager.FlopCardOverEvent.addListener(this.flopCardOverHandler, this);
        UIManager.onPanelCloseEvent.addListener(this.onPanelCloseHandler, this);
        UIManager.onPanelOpenEvent.addListener(this.onPanelOpenHandler, this);
        this.target.cancelTrusteeshipButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelTrusteeship, this);
        GamblingManager.timeAwardHandler.TimeAwardInfoEvent.addListener(this.setTimeAwardTime, this);
    };
    GamblingPanelActionSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.SitOrStandEvent.removeListener(this.sitOrStandHandler, this);
        GamblingManager.PlayerStateChangeEvent.removeListener(this.playerStateChangeHandler, this);
        GamblingManager.ActionPosChangeEvent.removeListener(this.actionPosChangeHandler, this);
        GamblingManager.OneLoopOverEvent.removeListener(this.boardCardChangeHandler, this);
        GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
        GamblingManager.timeAwardHandler.TimeAwardCountDownEvent.removeListener(this.refreshTimeAwardTime, this);
        GamblingManager.timeAwardHandler.GetTimeAwardInfoEvent.removeListener(this.setNextTimeAwardInfo, this);
        GamblingManager.InTrusteeshipEvent.removeListener(this.onInTrusteeshipEvent, this);
        GamblingManager.ActionOverEvent.removeListener(this.onActionOverEvent, this);
        GamblingManager.TimeOutEvent.removeListener(this.actionTimeOut, this);
        GamblingManager.FlopCardOverEvent.addListener(this.flopCardOverHandler, this);
        UIManager.onPanelCloseEvent.removeListener(this.onPanelCloseHandler, this);
        UIManager.onPanelOpenEvent.removeListener(this.onPanelOpenHandler, this);
        this.target.cancelTrusteeshipButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelTrusteeship, this);
        GamblingManager.timeAwardHandler.TimeAwardInfoEvent.removeListener(this.setTimeAwardTime, this);
        // let panels: Array<string> = UIManager.panelDict.getKeys();
        // for (let panel of panels)
        // {
        // 	UIManager.showPanelByVisible(panel, true);
        // }
    };
    GamblingPanelActionSupport.prototype.setTimeAwardTime = function () {
        this._numContentInfo.content = qin.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false);
        this.target.onlineAwardBtn["numComponent"].init(this._numContentInfo);
    };
    GamblingPanelActionSupport.prototype.onCancelTrusteeship = function (event) {
        GamblingManager.cancelTrusteeship();
    };
    GamblingPanelActionSupport.prototype.onActionOverEvent = function (state) {
        // this.target.actionGroup.visible = true;
        // this.target.actionGroup.showActionGroup(false);
        this.target.cancelTrusteeshipButton0.visible = this.target.cancelTrusteeshipButton.visible = false;
        if (state == PlayerState.Trusteeship) {
            if (GamblingManager.isOnRoundOverIng) {
                this.tryShowImmediatelyBrightBtn();
            }
            else {
                this.tryShowAction();
                this.tryShowFoldGroup();
            }
        }
    };
    GamblingPanelActionSupport.prototype.onInTrusteeshipEvent = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship) {
            // this.target.actionGroup.visible = false;
            this.target.actionGroup.showActionGroup(false);
            this.target.cancelTrusteeshipButton0.visible = this.target.cancelTrusteeshipButton.visible = true;
        }
    };
    GamblingPanelActionSupport.prototype.playerStateChangeHandler = function (obj) {
        var pInfo = GamblingManager.getPlayerInfo(obj.roleId);
        if (pInfo) {
            //qin.QinLog.log("状态变更：" + pInfo.userInfo.name + PlayerInfo.getStateDes(pInfo.state) + pInfo.state);
            var headComponent = this.target.getHeadComponent(pInfo.pos);
            if (headComponent) {
                if (pInfo.state == PlayerState.Blind || pInfo.state == PlayerState.Call
                    || pInfo.state == PlayerState.Raise || pInfo.state == PlayerState.AllIn) {
                    if (pInfo.state == PlayerState.AllIn) {
                        SoundManager.playEffect(MusicAction.bet_allin);
                    }
                    else if (pInfo.state == PlayerState.Blind) {
                        SoundManager.playEffect(MusicAction.blind);
                    }
                    else {
                        SoundManager.playEffect(MusicAction.bet_no_allin);
                    }
                }
                if (pInfo.state != PlayerState.Fold && pInfo.state != PlayerState.WaitNext && pInfo.state != PlayerState.Check) {
                    if (pInfo.state == PlayerState.WaitAction) {
                        if (GamblingManager.roomInfo.ante > 0) {
                            headComponent.showChipsComponent(pInfo.num, true);
                        }
                    }
                    else {
                        headComponent.showChipsComponent(pInfo.num, true);
                    }
                }
                headComponent.changeState();
                var sex = Sex.Unknown;
                if (pInfo.userInfo) {
                    sex = pInfo.userInfo.sex;
                }
                if (pInfo.state == PlayerState.Fold) {
                    GamblingPanelSetting.FoldPosPoint.x = this.target.foldPointImg.x;
                    GamblingPanelSetting.FoldPosPoint.y = this.target.foldPointImg.y;
                    headComponent.runFoldAnim(GamblingPanelSetting.FoldPosPoint);
                    SoundManager.playEffect(MusicAction.fold, sex);
                    SoundManager.playEffect(MusicAction.foldpai);
                }
                else if (pInfo.state == PlayerState.AllIn) {
                    SoundManager.playEffect(MusicAction.allin, sex);
                    ;
                }
                else if (pInfo.state == PlayerState.Call) {
                    SoundManager.playEffect(MusicAction.call, sex);
                }
                else if (pInfo.state == PlayerState.Check) {
                    SoundManager.playEffect(MusicAction.check, sex);
                }
                else if (pInfo.state == PlayerState.Raise) {
                    SoundManager.playEffect(MusicAction.raise, sex);
                }
            }
        }
        if (obj.roleId == UserManager.userInfo.roleId) {
            if (obj.state == PlayerState.WaitNext) {
                this.target.waitNextImg.visible = true;
            }
            else {
                this.target.waitNextImg.visible = false;
            }
            if (obj.state == PlayerState.AllIn) {
                this.target.allinAnime.playAllinAnime();
            }
            this.changeState(GamblingManager.getPlayerStateByRoleId(obj.roleId));
        }
        else {
            if (obj.state == PlayerState.Raise && GamblingUtil.isOnProcess(GamblingManager.self)) {
                if (this.target.actionGroup.preActionGroup.visible) {
                    if (this.target.actionGroup.preCallBtn.selected) {
                        GamblingManager.isCallAny = !GamblingManager.isCallAny;
                        this.target.actionGroup.preCallBtn.selected = GamblingManager.isCallAny;
                    }
                    else if (this.target.actionGroup.autoCheckBtn.selected) {
                        GamblingManager.isCallAny = !GamblingManager.isCallAny;
                        this.target.actionGroup.autoCheckBtn.selected = GamblingManager.isCallAny;
                    }
                }
                else {
                    this.target.actionGroup.checkOrDropBtn.selected = false;
                    this.target.actionGroup.callAnyBtn.selected = false;
                    this.target.actionGroup.preCallBtn.selected = false;
                    this.target.actionGroup.autoCheckBtn.selected = false;
                    this.tryShowPreActionGroup(true);
                }
            }
        }
    };
    /**
     * 公共牌翻牌动画结束
     */
    GamblingPanelActionSupport.prototype.setBoardCardOverFlag = function (obj) {
        this._isBoardCardOver = obj.isBoardOver;
        if (this._isBoardCardOver && !obj.isRoundOver) {
            this.actionPosChangeHandler();
            //公共牌翻牌结束 显示预处理按钮 自己在行牌中，且非自己说话
            if (GamblingManager.self && GamblingUtil.isOnProcess(GamblingManager.self) && GamblingManager.roomInfo && GamblingManager.roomInfo.pos != GamblingManager.self.pos) {
                if (GamblingManager.self.state != PlayerState.AllIn) {
                    this.tryShowPreActionGroup(true, true);
                }
            }
        }
    };
    /**
     * 位置变更
     */
    GamblingPanelActionSupport.prototype.actionPosChangeHandler = function (isInit) {
        if (GamblingManager.roomInfo) {
            //初始化||发牌完毕||非枪口位说话||有公共牌发出----->都说明可以操作
            var isCanOpera = void 0;
            isCanOpera = isInit === true || GamblingManager.roomInfo.isFlopCardOver || GamblingManager.roomInfo.pos != GamblingUtil.utgPos || (GamblingManager.roomInfo.publicCard && GamblingManager.roomInfo.publicCard.length > 0);
            if (this._isBoardCardOver && isCanOpera) {
                this.showPanelState();
                var headComponent = this.target.getHeadComponent(GamblingManager.roomInfo.pos);
                if (headComponent) {
                    headComponent.changeState(GamblingHeadStateType.OnAction, true);
                }
                if (GamblingManager.self && GamblingManager.roomInfo.pos == GamblingManager.self.pos) {
                    this._isTimeOut = false;
                    SoundManager.playEffect(MusicAction.on_turn);
                    this.target.actionGroup.showPreActionGroup(false);
                    if (GamblingManager.isCheckOrFold) {
                        if (GamblingUtil.isCanCheck) {
                            GamblingManager.reqAction(PlayerState.Check);
                        }
                        else {
                            GamblingManager.reqAction(PlayerState.Fold);
                        }
                    }
                    else if (GamblingManager.isCallAny) {
                        GamblingManager.doDefaultAction();
                    }
                    else {
                        if (GamblingManager.roomInfo.definition.pattern != GamblingPattern.AllIn) {
                            // this.target.actionGroup.raiseGroup.visible = true;
                            // this.target.actionGroup.actionGroup.visible = true;
                            this.target.actionGroup.showActionGroup(true);
                            this.target.actionGroup.showRaiseGroup(true);
                            // this.target.actionGroup.raiseBtn.visible = true;
                        }
                        else {
                            this.target.actionGroup.showActionGroup(true);
                            this.target.actionGroup.raiseBtn.visible = false;
                            // this.target.actionGroup.actionGroup.visible = true;
                        }
                        this.showCallCheckBtn();
                    }
                }
                else {
                    this.timeOutCloseAddchipsPanel();
                    this.tryShowPreActionGroup(true); //位置变更
                }
            }
        }
    };
    GamblingPanelActionSupport.prototype.showCallCheckBtn = function () {
        this.target.actionGroup.checkBtn.visible = false;
        this.target.actionGroup.callBtn.visible = false;
        if (GamblingUtil.isCanCheck) {
            this.target.actionGroup.checkBtn.visible = true;
            // this.target.actionGroup.runActionChild(this.target.actionGroup.checkBtn, true);
        }
        else if (GamblingUtil.isNeedAllIn) {
            this.target.actionGroup.callBtn.visible = true;
            // this.target.actionGroup.runActionChild(this.target.actionGroup.callBtn, true);
            this.target.actionGroup.raiseGroup.visible = false;
            this.target.actionGroup.raiseBtn.visible = false;
            this.target.actionGroup.callBtn.label = qin.MathUtil.formatNum(GamblingManager.self.bankRoll);
            //this.target.actionGroup.callBtn["callLabel"].text = "全下";
        }
        else if (GamblingUtil.callNum > 0) {
            this.target.actionGroup.callBtn.visible = true;
            this.target.actionGroup.callBtn.label = qin.MathUtil.formatNum(GamblingUtil.callNum);
            //this.target.actionGroup.callBtn["callLabel"].text = "跟注";
        }
    };
    /**
     * 坐下站起处理
     */
    GamblingPanelActionSupport.prototype.sitOrStandHandler = function (obj) {
        this.target.hideDownEffect();
        var pInfo = obj.pInfo;
        if (pInfo.roleId == UserManager.userInfo.roleId) {
            if (obj.state == BuyInGameState.Stand) {
                this.target.actionGroup.showBrightButton(false);
                this.target.actionGroup.showImmediatelyBrightCardBtn(false);
                this.target.actionGroup.hideAll(true);
                this.target.actionGroup.hidePreActionGroup(true);
                this.target.cardTypeGroup.visible = false;
                if (GamblingUtil.isOmaha) {
                    this.target.cardTypeComp.init(CardType.None);
                }
                for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
                    var pitInfo = _a[_i];
                    pitInfo.index = pitInfo.headComponent.posIndex;
                }
                this.target.setPit();
                this.target.waitNextRoundComponent.show(false);
                this.target.waitNextImg.visible = false;
            }
            else {
                this.target.initActionGroup();
                if (pInfo.state == PlayerState.WaitNext) {
                    this.target.waitNextImg.visible = true;
                }
            }
        }
        var headComponent = this.target.getHeadComponent(pInfo.pos);
        if (headComponent) {
            if (obj.state == BuyInGameState.Sit) {
                headComponent.sitDownInit(pInfo); //因为等待下一局的状态切换问题
                headComponent.changeState(GamblingHeadStateType.SitDown);
                SoundManager.playEffect(MusicAction.sit);
            }
            else if (obj.state == BuyInGameState.Stand) {
                headComponent.init(null);
                headComponent.changeState(GamblingHeadStateType.Empty);
                SoundManager.playEffect(MusicAction.sit_out);
            }
        }
        this.refreshStiDownState();
    };
    /**
     * 刷新坐下邀请状态
     */
    GamblingPanelActionSupport.prototype.refreshStiDownState = function () {
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            pitInfo.headComponent.canSitDownLabel.visible = false;
            pitInfo.headComponent.inviteImg.visible = false;
            if (GamblingManager.self) {
                pitInfo.headComponent.inviteImg.visible = true;
            }
            else {
                pitInfo.headComponent.canSitDownLabel.visible = true;
            }
        }
    };
    /**
     * 结算信息 切换到比牌状态
     */
    GamblingPanelActionSupport.prototype.roundOverHandler = function () {
        // this.target.actionGroup.brightCardBtn.visible = false;
        var card;
        for (var _i = 0, _a = this.target.cardList; _i < _a.length; _i++) {
            card = _a[_i];
            card.showMaxFlag(false);
        }
        if (GamblingUtil.isOmaha && GamblingManager.self) {
            var headComponent = this.target.getHeadComponent(GamblingManager.self.pos);
            if (headComponent) {
                for (var j = 1; j <= GamblingManager.OmahaHandCardNum; j++) {
                    var cardCom = headComponent['cardFace' + j];
                    if (cardCom) {
                        cardCom.showMaxFlag(false);
                    }
                }
            }
        }
        for (var _b = 0, _c = this.target.pitList; _b < _c.length; _b++) {
            var pitInfo = _c[_b];
            pitInfo.headComponent.hideCdComponent(); //结算隐藏CD
            // pitInfo.headComponent.showChipsComponent();
            // pitInfo.headComponent.roundOverHandler();
        }
        this.timeOutCloseAddchipsPanel();
        if (GamblingManager.self) {
            this.target.actionGroup.showBrightButton(false);
            this.tryShowImmediatelyBrightBtn();
            this.target.actionGroup.hideAll(true);
            this.target.actionGroup.hidePreActionGroup(true);
            this.clearPanelState();
        }
    };
    /**
     * 显示立即亮牌
     */
    GamblingPanelActionSupport.prototype.tryShowImmediatelyBrightBtn = function () {
        if (!GamblingManager.roomInfo.isShowCard) {
            var isThanCard = false;
            if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.handCardList && GamblingManager.roundOverInfo.potList) {
                var len = GamblingManager.roundOverInfo.handCardList.length;
                var handCardInfo = void 0;
                for (var i = 0; i < len; i++) {
                    handCardInfo = GamblingManager.roundOverInfo.handCardList[i];
                    if (GamblingManager.self.roleId == handCardInfo.roleId && handCardInfo.cardList && handCardInfo.cardList.length > 1) {
                        if (GamblingManager.self.state != PlayerState.Fold) {
                            if (GamblingManager.self.roleId == UserManager.userInfo.roleId) {
                                isThanCard = true;
                                break; //参与了比牌，不显示点击亮牌
                            }
                        }
                    }
                }
            }
            var isWaitNext = GamblingManager.self && GamblingManager.self.state == PlayerState.WaitNext;
            if (!isThanCard && !isWaitNext) {
                this.target.actionGroup.showImmediatelyBrightCardBtn(true);
            }
        }
    };
    /**
    * 公共牌推送 下一轮开始
     */
    GamblingPanelActionSupport.prototype.boardCardChangeHandler = function () {
        // for (let pitInfo of this.target.pitList)
        // {
        // 	pitInfo.headComponent.showChipsComponent();
        // 	pitInfo.headComponent.changeState();
        // }
        this.timeOutCloseAddchipsPanel();
    };
    /**
     * 状态变更
     */
    GamblingPanelActionSupport.prototype.changeState = function (state, isTween) {
        if (isTween === void 0) { isTween = true; }
        switch (state) {
            case PlayerState.Blind:
                break;
            case PlayerState.Empty:
            case PlayerState.WaitNext:
            case PlayerState.Check:
            case PlayerState.Raise:
            case PlayerState.AllIn:
            case PlayerState.Call:
            case PlayerState.WaitAction:
                this.target.actionGroupHideAll(isTween);
                break;
            case PlayerState.Fold://弃牌
                this.tryShowFoldGroup();
                break;
        }
    };
    /**
     * 显示面板状态
     */
    GamblingPanelActionSupport.prototype.showPanelState = function () {
        var isTrusteeship = false;
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship) {
            isTrusteeship = true;
        }
        if (GamblingUtil.getIsOnAction(GamblingManager.self) && !isTrusteeship) {
            var panels = UIManager.panelDict.getKeys();
            var state = void 0;
            for (var _i = 0, panels_1 = panels; _i < panels_1.length; _i++) {
                var panel = panels_1[_i];
                state = UIManager.isShowPanel(panel);
                if (this._excludePanel.indexOf(panel) == -1 && state) {
                    // this._panelShowStateList.add(panel, state);
                    UIManager.closePanel(panel);
                    // UIManager.showPanelByVisible(panel, false);
                }
            }
            this._toNum = this.target.gameGroup.x;
            if (this._toNum > 0) {
                this.target.gameGroupMove();
            }
        }
        else {
            this.clearPanelState();
        }
    };
    /**
     * 清除面板显示状态
     */
    GamblingPanelActionSupport.prototype.clearPanelState = function () {
        // if (this._panelShowStateList.count > 0)
        // {
        // let panels: Array<string> = this._panelShowStateList.getKeys();
        // for (let panel of panels) //切换状态则显示之前关闭的面板
        // {
        // 	UIManager.showPanelByVisible(panel, true);
        // }
        // this._panelShowStateList.clear();
        if (this._toNum > 0) {
            // this.target.gameGroupMove();
        }
    };
    /**
     * 显示预处理
     */
    GamblingPanelActionSupport.prototype.tryShowPreActionGroup = function (isTween, isLoopOver) {
        if (GamblingManager.self && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.pos > 0) {
            if (GamblingManager.self.pos != GamblingManager.roomInfo.pos) {
                var bool = false;
                switch (GamblingManager.self.state) {
                    case PlayerState.WaitAction://等待状态，第一圈注直接显示,非第一圈注第一个说完话显示
                        bool = !GamblingManager.roomInfo.publicCard || GamblingManager.roomInfo.pos != GamblingUtil.earliestActionPos;
                        break;
                    case PlayerState.Blind://盲注状态直接显示
                        bool = true;
                        break;
                    case PlayerState.Call:
                    case PlayerState.Check:
                    case PlayerState.Raise://已说话状态 下注额有差异
                        bool = GamblingManager.self.num < GamblingManager.roomInfo.maxAnte;
                        break;
                }
                if (bool || isLoopOver) {
                    this.target.actionGroup.showPreActionGroup(true);
                }
            }
        }
    };
    /**
     * 尝试显示弃牌状态处理
     */
    GamblingPanelActionSupport.prototype.tryShowFoldGroup = function () {
        if (GamblingManager.self && GamblingManager.self.state == PlayerState.Fold && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.pos > 0) {
            this.target.actionGroup.hideAll(true);
            this.target.cardTypeGroup.visible = false;
            if (GamblingUtil.isOmaha) {
                this.target.cardTypeComp.init(CardType.None);
            }
            // this.target.actionGroup.brightCardBtn.visible = true;
            this.target.actionGroup.showBrightButton(true);
        }
    };
    /**
     * 设置下一个计时奖励数据
    */
    GamblingPanelActionSupport.prototype.setNextTimeAwardInfo = function () {
        if (GamblingManager.timeAwardHandler.round < TimeAwardDefined.GetInstance().dataList.length) {
            this._numContentInfo.content = qin.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false);
            this.target.onlineAwardBtn["numComponent"].init(this._numContentInfo);
            GamblingManager.timeAwardHandler.startTimeFlag = true;
            GamblingManager.timeAwardHandler.isGetTimeAward = false;
            if (GamblingManager.self && GamblingManager.timeAwardHandler.isEffectTime) {
                GamblingManager.timeAwardHandler.startCountDown();
            }
        }
    };
    /**
     * 倒计时时刷新计时数据
    */
    GamblingPanelActionSupport.prototype.refreshTimeAwardTime = function () {
        this._numContentInfo.content = qin.DateTimeUtil.countDownFormat(GamblingManager.timeAwardHandler.time, false);
        this.target.onlineAwardBtn["numComponent"].init(this._numContentInfo);
    };
    /**
     * 面板关闭
     * @param panelName 面板名
     */
    GamblingPanelActionSupport.prototype.onPanelCloseHandler = function (panelName) {
        if (panelName == UIModuleName.AddChipsPanel) {
            this.tryShowAction();
        }
    };
    GamblingPanelActionSupport.prototype.tryShowAction = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self && this._isTimeOut == false) {
            // this.target.actionGroup.actionGroup.visible = true;
            // this.target.actionGroup.raiseGroup.visible = true;
            if (GamblingManager.roomInfo.pos == GamblingManager.self.pos) {
                this.target.actionGroup.showRaiseGroup(true);
                this.target.actionGroup.showActionGroup(true);
                this.showCallCheckBtn();
            }
            else {
                this.tryShowPreActionGroup(true);
            }
        }
    };
    GamblingPanelActionSupport.prototype.onPanelOpenHandler = function (panelName) {
        if (panelName == UIModuleName.AddChipsPanel && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self) {
            if (GamblingManager.roomInfo.pos == GamblingManager.self.pos) {
                this.target.actionGroup.showActionGroup(false);
                this.target.actionGroup.showRaiseGroup(false);
            }
        }
    };
    GamblingPanelActionSupport.prototype.timeOutCloseAddchipsPanel = function () {
        if (UIManager.isShowPanel(UIModuleName.AddChipsPanel)) {
            this._isTimeOut = true;
            UIManager.closePanel(UIModuleName.AddChipsPanel);
        }
    };
    GamblingPanelActionSupport.prototype.actionTimeOut = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self && GamblingManager.roomInfo.pos == GamblingManager.self.pos) {
            // GamblingManager.reqTimeOut();
            /**
             * 关闭加注面板
             */
            // UIManager.closePanel(UIModuleName.AddChipsPanel);
            // this.target.actionGroup.actionGroup.visible = false;
            // this.target.actionGroup.raiseGroup.visible = false;
        }
    };
    /**
     * 发牌结束
     */
    GamblingPanelActionSupport.prototype.flopCardOverHandler = function () {
        this.actionPosChangeHandler();
    };
    return GamblingPanelActionSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelActionSupport.prototype, "GamblingPanelActionSupport");
//# sourceMappingURL=GamblingPanelActionSupport.js.map