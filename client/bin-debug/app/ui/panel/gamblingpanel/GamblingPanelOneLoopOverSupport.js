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
 * 一轮押注圈结束
 */
var GamblingPanelOneLoopOverSupport = (function (_super) {
    __extends(GamblingPanelOneLoopOverSupport, _super);
    function GamblingPanelOneLoopOverSupport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 本轮计算过的牌型
         */
        _this._lastCardType = CardType.None;
        return _this;
    }
    GamblingPanelOneLoopOverSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.clear();
        if (GamblingUtil.isOnProcess(GamblingManager.self) && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.publicCard && GamblingManager.roomInfo.publicCard.length > 0) {
            this.target.cardTypeGroup.visible = true;
        }
        else {
            this.target.cardTypeGroup.visible = false;
            if (GamblingUtil.isOmaha) {
                this.target.cardTypeComp.init(CardType.None);
            }
        }
        if (GamblingManager.roomInfo) {
            if (GamblingManager.roomInfo.publicCard) {
                this._lastCardLen = GamblingManager.roomInfo.publicCard.length;
                var cardFace = void 0;
                var point = void 0;
                var matrix = GamblingPanelSetting.boardCardMatrix.clone();
                for (var i = 0; i < this._lastCardLen; i++) {
                    cardFace = this.target.cardList[i];
                    cardFace.visible = true;
                    cardFace.init(GamblingManager.roomInfo.publicCard[i]);
                    // cardFace.init(CardTypeMatchUtil.testBoardList[i]);
                    cardFace.initElementsShow2();
                    //重置位置缩放和大小
                    point = GamblingPanelSetting.boardPosList[i];
                    cardFace.horizontalCenter = point.x;
                    cardFace.verticalCenter = point.y;
                    cardFace.alpha = 1;
                    matrix.tx = cardFace.x;
                    matrix.ty = cardFace.y;
                    cardFace.matrix = matrix;
                }
            }
            else {
                this._lastCardLen = 0;
            }
            if (GamblingManager.roomInfo.handCard) {
                this._cardList = GamblingManager.roomInfo.handCard.concat();
            }
            if (GamblingManager.roomInfo.publicCard) {
                this._publicCardList = GamblingManager.roomInfo.publicCard.concat();
            }
            this.runBoardCardOVerHandler();
            this.setPotChips();
            this.showPotChips(this._potList);
        }
        // this.oneLoopOverHandler();
    };
    GamblingPanelOneLoopOverSupport.prototype.setPotChips = function () {
        if (GamblingManager.roomInfo.potChips) {
            this._potList = GamblingManager.roomInfo.potChips.concat();
        }
        else {
            this._potList = undefined;
        }
    };
    GamblingPanelOneLoopOverSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.OneLoopOverEvent.addListener(this.oneLoopOverHandler, this);
        GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
        GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
        // GamblingManager.HandCardComeEvent.addListener(this.handCardComHandler, this);
        GamblingManager.PlayerStateChangeEvent.addListener(this.playerStateChange, this);
        GamblingManager.SitOrStandEvent.addListener(this.sitOrStandHandler, this);
        qin.Tick.addFrameInvoke(this.tryStartNext, this);
    };
    GamblingPanelOneLoopOverSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.OneLoopOverEvent.removeListener(this.oneLoopOverHandler, this);
        GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
        GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
        // GamblingManager.HandCardComeEvent.removeListener(this.handCardComHandler, this);
        GamblingManager.PlayerStateChangeEvent.removeListener(this.playerStateChange, this);
        GamblingManager.SitOrStandEvent.removeListener(this.sitOrStandHandler, this);
        qin.Tick.removeFrameInvoke(this.tryStartNext, this);
        qin.Tick.RemoveTimeoutInvoke(this.showOneLoop, this);
        qin.Tick.RemoveTimeoutInvoke(this.showRoundOver, this);
        this._cardList = undefined;
        this._publicCardList = undefined;
    };
    GamblingPanelOneLoopOverSupport.prototype.oneLoopOverHandler = function (cardArr) {
        this._cardList = cardArr[0];
        this._publicCardList = cardArr[1];
        this._isOneLoopShowChips = true;
        this._isBoardCardAnimOver = false;
        this._isPotChipsAnimOver = false;
        if (this.onBoardCardApearComplete) {
            this.onBoardCardApearComplete.invoke({ isBoardOver: false, isRoundOver: this._isOnRoundOVer });
        }
        this.setPotChips();
        this.target.hideSateGroup(true);
        qin.Tick.AddTimeoutInvoke(this.showOneLoop, 450, this);
    };
    GamblingPanelOneLoopOverSupport.prototype.showOneLoop = function () {
        if (this.isDisabled) {
            return;
        }
        // GamblingManager.roomInfo.cardList = new Array<CardInfo>();
        // let cardInfo:CardInfo;
        // for(let i:number = 0; i < 4; i++)
        // {
        // 	cardInfo = new CardInfo();
        // 	cardInfo.card = new Array<number>();
        // 	cardInfo.card.push(1, 2);
        // 	GamblingManager.roomInfo.cardList.push(cardInfo);
        // }
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
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && this._publicCardList) {
            if (GamblingManager.self) {
                this.target.actionGroup.raiseGroup.visible = false;
                this.target.actionGroup.actionGroup.visible = false;
            }
            var nowLen = this._publicCardList.length;
            var offset = nowLen - this._lastCardLen;
            if (offset > 1) {
                for (var i = this._lastCardLen; i < nowLen; i++) {
                    card = this.target.cardList[i];
                    card.visible = true;
                    card.init(this._publicCardList[i]);
                    if (i == nowLen - 1) {
                        this.runBoardAppearAnim(card, GamblingPanelSetting.boardPosList[i], i * 350, this.onRunBoardCardOver, this);
                    }
                    else {
                        this.runBoardAppearAnim(card, GamblingPanelSetting.boardPosList[i], i * 350, null, null);
                    }
                }
            }
            else {
                if (nowLen == 4) {
                    card = this.target.cardList[3];
                    card.visible = true;
                    card.init(this._publicCardList[3]);
                    this.runBoardAppearAnim(card, GamblingPanelSetting.boardPosList[3], 0, this.onRunBoardCardOver, this);
                }
                else if (nowLen == 5) {
                    card = this.target.cardList[4];
                    card.visible = true;
                    card.init(this._publicCardList[4]);
                    card.initElementsShow2();
                    this.runBoardAppearAnim(card, GamblingPanelSetting.boardPosList[4], 0, this.onRunBoardCardOver, this);
                }
            }
            this._lastCardLen = nowLen;
            this.showPotChips(this._potList);
            for (var _b = 0, _c = this.target.pitList; _b < _c.length; _b++) {
                var pitInfo = _c[_b];
                pitInfo.headComponent.showChipsComponent();
                // pitInfo.headComponent.changeState();
            }
        }
    };
    /**
     * 一局结束
     */
    GamblingPanelOneLoopOverSupport.prototype.roundOverHandler = function () {
        this.target.hideSateGroup();
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.potList) {
            var isAllEqual = true;
            var list = new Array();
            var potAwardInfo = void 0;
            if (!GamblingManager.roomInfo.potChips) {
                isAllEqual = false;
                for (var i = 0; i < GamblingManager.roundOverInfo.potList.length; i++) {
                    potAwardInfo = GamblingManager.roundOverInfo.potList[i];
                    list.push(potAwardInfo.num);
                }
            }
            else {
                for (var i = 0; i < GamblingManager.roundOverInfo.potList.length; i++) {
                    potAwardInfo = GamblingManager.roundOverInfo.potList[i];
                    list.push(potAwardInfo.num);
                    if (GamblingManager.roomInfo.potChips && GamblingManager.roomInfo.potChips[i] != potAwardInfo.num) {
                        isAllEqual = false;
                    }
                }
            }
            if (!isAllEqual) {
                this._isPotChipsAnimOver = false;
                if (list.length == 0) {
                    qin.Console.log("兼容异常情况_isOnRoundOVer");
                    this._isOnRoundOVer = true;
                }
                else {
                    this.showPotChips(list);
                }
            }
            if (this._isOneLoopShowChips == false && this._isPotChipsAnimOver == true) {
                qin.Tick.AddTimeoutInvoke(this.showRoundOver, 300, this);
            }
            else {
                this._isOnRoundOVer = true;
            }
        }
        else {
            if (!GamblingManager.roundOverInfo) {
                qin.Console.log("结算异常，结算信息为空！");
            }
            if (GamblingManager.roundOverInfo && !GamblingManager.roundOverInfo.potList) {
                qin.Console.log("结算异常，结算底池列表为空");
            }
            this._isOnRoundOVer = true;
        }
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            pitInfo.headComponent.roundOverHandler(); //牌局结束立即显示各自的手牌 
        }
        this._lastCardType = CardType.None;
    };
    GamblingPanelOneLoopOverSupport.prototype.showRoundOver = function () {
        if (this.isDisabled) {
            return;
        }
        this._isOnRoundOVer = true;
        if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.potList) {
            for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
                var pitInfo = _a[_i];
                pitInfo.headComponent.showChipsComponent();
            }
        }
    };
    GamblingPanelOneLoopOverSupport.prototype.showPotChips = function (list) {
        if (!this._dataList) {
            this._dataList = new Array();
            this.target.potChipsGroup["dataList"] = this._dataList;
        }
        var callBack;
        if (list) {
            this.target.potChipsGroup.visible = true;
            var lastLen = this._lastChips ? this._lastChips.length : 0;
            var nowLen = list.length;
            var chipsShowComponentBg = void 0;
            var chipsShowComponentNum = void 0;
            var obj = void 0;
            var isRunNow = void 0;
            if (lastLen < nowLen && this.target.chipsBgGroup.numChildren > 0) {
                var posType = void 0;
                for (var i = 0; i < nowLen; i++) {
                    if (i == nowLen - 1) {
                        callBack = this.runChipsBetAnimOver;
                    }
                    else {
                        callBack = undefined;
                    }
                    if (i < this._dataList.length) {
                        obj = this._dataList[i];
                        obj.callback = callBack;
                        obj.thisObject = this;
                        obj.isTween = false;
                        if (obj.num != list[i]) {
                            var showIndex = this.target.chipsNumGroup.numChildren - i - 1;
                            if (showIndex < 0) {
                                showIndex = 0;
                            }
                            chipsShowComponentNum = this.target.chipsNumGroup.getChildAt(showIndex);
                            chipsShowComponentBg = this.target.chipsBgGroup.getChildAt(showIndex);
                            obj.isTween = true;
                            obj.num = list[i];
                            this.showImgChips(obj, chipsShowComponentNum, chipsShowComponentBg);
                            // obj.num = list[i];
                            // obj.isTween = true; //重写组件1的数据
                            // obj.isNum = true;
                            // if (chipsShowComponentNum)
                            // {
                            // 	chipsShowComponentNum.bindData.num = list[i];
                            // 	chipsShowComponentNum.bindData.isTween = true;
                            // }
                        }
                    }
                    else {
                        if (i % 2 == 0) {
                            posType = ChipsPosType.Left;
                        }
                        else {
                            posType = ChipsPosType.Right;
                        }
                        obj = { num: list[i], type: posType, isTween: true, isFixedWidth: true, callback: callBack, thisObject: this };
                        this._dataList.push(obj);
                        // this.showImgChips(obj);
                    }
                }
            }
            else {
                var posType = void 0;
                var potChipsNum = void 0;
                var isTween = void 0;
                // this._dataList.length = 0;
                for (var i = 0; i < list.length; i++) {
                    if (i % 2 == 0) {
                        posType = ChipsPosType.Left;
                    }
                    else {
                        posType = ChipsPosType.Right;
                    }
                    potChipsNum = list[i];
                    chipsShowComponentBg = null;
                    chipsShowComponentNum = null;
                    if (i < this.target.chipsBgGroup.numChildren) {
                        chipsShowComponentBg = this.target.chipsBgGroup.getChildAt(this.target.chipsBgGroup.numChildren - i - 1);
                        chipsShowComponentNum = this.target.chipsNumGroup.getChildAt(this.target.chipsNumGroup.numChildren - i - 1);
                    }
                    if (chipsShowComponentBg) {
                        if (chipsShowComponentBg.bindData) {
                            if (chipsShowComponentBg.bindData.num != potChipsNum) {
                                chipsShowComponentBg.bindData.num = potChipsNum;
                                chipsShowComponentBg.bindData.isTween = true;
                                chipsShowComponentNum.bindData.num = potChipsNum;
                                chipsShowComponentNum.bindData.isTween = true;
                            }
                            else {
                                chipsShowComponentBg.bindData.isTween = false;
                                chipsShowComponentNum.bindData.isTween = false;
                            }
                            if (i == list.length - 1) {
                                if (chipsShowComponentBg.bindData.isTween) {
                                    // chipsShowComponent2.bindData.callback = this.runChipsBetAnimOver;
                                    chipsShowComponentNum.bindData.thisObject = this;
                                    // chipsShowComponent1.bindData.callback = this.runChipsBetAnimOver;
                                    chipsShowComponentBg.bindData.thisObject = this;
                                }
                                else {
                                    isRunNow = true;
                                }
                            }
                        }
                    }
                    else {
                        if (i == list.length - 1) {
                            callBack = this.runChipsBetAnimOver;
                        }
                        else {
                            callBack = undefined;
                        }
                        this._dataList.push({ num: potChipsNum, type: posType, isTween: true, isFixedWidth: true, callback: callBack, thisObject: this });
                    }
                }
            }
            // this.target.chipsGroup.removeChildren();
            // this.target.chipsNumGroup.removeChildren();
            qin.Console.log("底池数量_dataList：" + this._dataList.length);
            var comp1 = void 0;
            var comp2 = void 0;
            // for (let i: number = this._dataList.length - 1; i >= 0; i--)
            for (var i = 0; i < this._dataList.length; i++) {
                if (i < this.target.chipsBgGroup.numChildren) {
                    comp2 = this.target.chipsNumGroup.getChildAt(i);
                    comp2.init(comp2.bindData); //顺序不能调换
                    comp1 = this.target.chipsBgGroup.getChildAt(i);
                    comp1.init(comp1.bindData);
                }
                else {
                    this.showImgChips(this._dataList[i]); //显示新增
                }
            }
            if (isRunNow) {
                // this.runChipsBetAnimOver();
                // this._isPotChipsAnimOver = true;
            }
            this._lastChips = list.concat();
        }
        else {
            this.target.clearPotChips();
        }
    };
    /**
     * 押注动画结束
     */
    GamblingPanelOneLoopOverSupport.prototype.runChipsBetAnimOver = function (target) {
        if (this.isDisabled) {
            return;
        }
        this._isPotChipsAnimOver = true;
        if (this._isOnRoundOVer && this._isBoardCardAnimOver) {
            // this.showRoundOver();
            qin.Tick.AddTimeoutInvoke(this.showRoundOver, 300, this);
        }
    };
    /**
     * 显示筹码图片
     */
    GamblingPanelOneLoopOverSupport.prototype.showImgChips = function (obj, numChips, bgChips) {
        //显示数字
        if (!numChips) {
            numChips = ChipsPot.popComponent();
        }
        obj["isChip"] = false;
        obj["isNum"] = true;
        numChips.init(obj);
        this.target.chipsNumGroup.addChildAt(numChips, 0); //group的布局问题，垂直布局先显示的在上面 ,所以后面显示的，就显示在最小索引
        //显示筹码
        if (!bgChips) {
            bgChips = ChipsPot.popComponent();
        }
        var objClone = bgChips.bindData; //不用克隆，两个组件的数据会相互影响，导致问题的出现
        if (!objClone) {
            objClone = {};
        }
        objClone["isChip"] = true;
        objClone["isNum"] = false;
        objClone.num = obj.num;
        objClone.type = obj.type;
        objClone.isTween = obj.isTween;
        objClone.isFixedWidth = obj.isFixedWidth;
        bgChips.init(objClone);
        this.target.chipsBgGroup.addChildAt(bgChips, 0);
    };
    /**
    * 跑公共牌动画
    */
    GamblingPanelOneLoopOverSupport.prototype.runBoardAppearAnim = function (target, point, delay, callBack, thisObj) {
        if (delay === void 0) { delay = 0; }
        if (this.isDisabled) {
            return;
        }
        if (!this._actionList1) {
            this._actionList1 = new qin.Dictionary();
            this._actionList2 = new qin.Dictionary();
        }
        var run = this._actionList1.getValue(target);
        var run2 = this._actionList2.getValue(target);
        if (!run) {
            run = AnimationFactory.getCardFaceAnimation(AnimationType.CardFaceBoardAppear);
            run.setTarget(target);
            this._actionList1.add(target, run);
        }
        if (!run2) {
            run2 = AnimationFactory.getCardFaceAnimation(AnimationType.CardFaceTurnToFace);
            run2.setTarget(target);
            run2.scale = 1.23;
            run2.time = 80;
            run2.isSound = true;
            this._actionList2.add(target, run2);
        }
        run.nextAnimation = run2;
        run.nextAnimation.callback = new qin.Delegate(callBack, thisObj);
        run.run(point, delay);
    };
    /**
     * 跑卡牌结束触发
     */
    GamblingPanelOneLoopOverSupport.prototype.onRunBoardCardOver = function () {
        if (this.isDisabled) {
            return;
        }
        this.runBoardCardOVerHandler();
        this._isBoardCardAnimOver = true;
        if (this._isOnRoundOVer && this._isPotChipsAnimOver) {
            // this.showRoundOver();
            qin.Tick.AddTimeoutInvoke(this.showRoundOver, 300, this);
        }
        // if (this._isBetAnimOver && this.onLoopOverCallback && this._isOnRoundOVer)
        // {
        // 	this._isOnRoundOVer = false;
        // 	this.onLoopOverCallback.invoke();
        // }
    };
    /**
     * 跑卡牌结束处理
     */
    GamblingPanelOneLoopOverSupport.prototype.runBoardCardOVerHandler = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.self && this._cardList && this._cardList.length > 0 && this._publicCardList && this._publicCardList.length > 0) {
            this.target.cardTypeGroup.visible = true;
            var result = void 0;
            if (GamblingUtil.isOmaha) {
                result = CardTypeMatchUtil.OmahaMatchCardInRoom(this._cardList);
            }
            else {
                result = CardTypeMatchUtil.matchCardInRoom(this._cardList);
            }
            if (result && CardTypeMatchUtil.resultList && CardTypeMatchUtil.resultList.length > 0) {
                /**
                 * 牌型显示
                 */
                this.target.cardDeslabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
                if (GamblingUtil.isOmaha) {
                    this.target.cardTypeComp.init(CardTypeMatchUtil.cardType);
                }
                if (this._lastCardType != CardTypeMatchUtil.cardType) {
                    SoundManager.playCardTypeSoundEffect(CardTypeMatchUtil.cardType);
                }
                this._lastCardType = CardTypeMatchUtil.cardType;
                var len = this.target.cardList.length;
                var card = void 0;
                for (var i = 0; i < len; i++) {
                    card = this.target.cardList[i];
                    if (card.visible && card.bindData) {
                        for (var _i = 0, _a = CardTypeMatchUtil.resultList; _i < _a.length; _i++) {
                            var resultInfo = _a[_i];
                            if (resultInfo.card[3] == 1 && resultInfo.card[0] == card.bindData.card[0] && resultInfo.card[1] == card.bindData.card[1]) {
                                card.showMaxFlag(true);
                                break;
                            }
                        }
                    }
                }
                if (GamblingUtil.isOmaha && GamblingManager.self) {
                    var headComponent = this.target.getHeadComponent(GamblingManager.self.pos);
                    if (headComponent) {
                        for (var j = 1; j <= GamblingManager.OmahaHandCardNum; j++) {
                            var cardCom = headComponent['cardFace' + j];
                            if (cardCom && cardCom.bindData) {
                                for (var _b = 0, _c = CardTypeMatchUtil.resultList; _b < _c.length; _b++) {
                                    var resultInfo = _c[_b];
                                    if (resultInfo.card[3] == 1 && resultInfo.card[0] == cardCom.bindData.card[0] && resultInfo.card[1] == cardCom.bindData.card[1]) {
                                        cardCom.showMaxFlag(true);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.onBoardCardApearComplete) {
            this.onBoardCardApearComplete.invoke({ isBoardOver: true, isRoundOver: this._isOnRoundOVer });
        }
    };
    GamblingPanelOneLoopOverSupport.prototype.nextRoundStartHandler = function () {
        this.clear();
    };
    GamblingPanelOneLoopOverSupport.prototype.handCardComHandler = function () {
        //this.runBoardCardOVerHandler();
    };
    GamblingPanelOneLoopOverSupport.prototype.playerStateChange = function () {
        this._isOneLoopShowChips = false;
    };
    /**
     * 坐下站起处理
     */
    GamblingPanelOneLoopOverSupport.prototype.sitOrStandHandler = function (obj) {
        // let pInfo: PlayerInfo = obj.pInfo;
        // if (pInfo.roleId == UserManager.userInfo.roleId && obj.state == BuyInGameState.Stand)
        // {
        // this.clear();
        // }
    };
    GamblingPanelOneLoopOverSupport.prototype.tryStartNext = function () {
        if (this._isBoardCardAnimOver && this._isPotChipsAnimOver && this.onLoopOverCallback && this._isOnRoundOVer) {
            if (this._lastTime == undefined) {
                this._lastTime = egret.getTimer();
            }
            if (egret.getTimer() - this._lastTime >= 700) {
                this._lastTime = undefined;
                this._isOnRoundOVer = false;
                this.onLoopOverCallback.invoke();
            }
        }
    };
    /**
     * 玩家下注完毕
     * @param pInfo
     */
    // private onPlayerBetOver(pInfo: PlayerInfo)
    // {
    // 	if (pInfo && pInfo.pos == GamblingManager.lastCallPos) //最后跟注的玩家
    // 	{
    // 		if (this._isOneLoopShowChips)
    // 		{
    // 			qin.Tick.AddTimeoutInvoke(this.showOneLoop, 150, this);
    // 		}
    // 		else if (this._isOnRoundOVer)
    // 		{
    // 			// this._isPotChipsAnimOver = false;
    // 			qin.Tick.AddTimeoutInvoke(this.showRoundOver, 150, this);
    // 		}
    // 		//播放收集筹码动画
    // 	}
    // }
    GamblingPanelOneLoopOverSupport.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._isPotChipsAnimOver = true;
        this._isBoardCardAnimOver = true;
        this._isOnRoundOVer = false;
        this._isOneLoopShowChips = false;
        this._lastCardLen = 0;
        this.target.hideCard();
        if (this._lastChips) {
            this._lastChips.length = 0;
        }
        this.target.clearPotChips();
        this.target.chipsBgGroup.removeChildren();
        this.target.chipsNumGroup.removeChildren();
        this._lastCardType = CardType.None;
        this._cardList = undefined;
        this._publicCardList = undefined;
    };
    return GamblingPanelOneLoopOverSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelOneLoopOverSupport.prototype, "GamblingPanelOneLoopOverSupport");
//# sourceMappingURL=GamblingPanelOneLoopOverSupport.js.map