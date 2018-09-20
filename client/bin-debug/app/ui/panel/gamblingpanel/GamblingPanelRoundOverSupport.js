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
 * 牌局结算支持
 */
var GamblingPanelRoundOverSupport = (function (_super) {
    __extends(GamblingPanelRoundOverSupport, _super);
    function GamblingPanelRoundOverSupport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._runIndex = 0;
        _this._isNextRoundStart = false;
        _this._isClientOver = false;
        _this._rebuyAddonTimeGap = 4000;
        _this._isChecedkRebuyAddon = false;
        return _this;
    }
    GamblingPanelRoundOverSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._isNextRoundStart = false;
        this._isClientOver = false;
        this._isChecedkRebuyAddon = false;
    };
    GamblingPanelRoundOverSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
        GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
        GamblingManager.SomeBodyBrightCardEvent.addListener(this.brightCardHandler, this);
    };
    GamblingPanelRoundOverSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        qin.Tick.RemoveTimeoutInvoke(this.reqNextRoundStart, this);
        qin.Tick.RemoveTimeoutInvoke(this.delayRunNext, this);
        qin.Tick.RemoveTimeoutInvoke(this.delayRoundOver, this);
        qin.Tick.RemoveTimeoutInvoke(this.checkRebuyAddon, this);
        GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
        GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
        GamblingManager.SomeBodyBrightCardEvent.removeListener(this.brightCardHandler, this);
    };
    GamblingPanelRoundOverSupport.prototype.roundOverHandler = function () {
        qin.Tick.AddTimeoutInvoke(this.checkRebuyAddon, this._rebuyAddonTimeGap, this);
        this._isClientOver = false;
        this._isNextRoundStart = false;
    };
    GamblingPanelRoundOverSupport.prototype.brightCardHandler = function (info) {
        if (info && this._isNextRoundStart == false) {
            var headCom = this.target.getHeadComponentByRole(info.roleId);
            if (headCom && info.cardList && info.cardList.length > 1) {
                headCom.runBrightCard(info.cardList);
            }
            else {
                qin.Console.log("推送玩家主动亮牌异常！未找到玩家所在的位子的头像组件，roleId:" + info.roleId + "---card:" + info.cardList);
            }
        }
    };
    GamblingPanelRoundOverSupport.prototype.checkRebuyAddon = function () {
        if (GamblingUtil.isMtt && this._isChecedkRebuyAddon == false) {
            qin.Console.log("超时检查重构增购");
            this._isChecedkRebuyAddon = true;
            this.target.checkRebuyAddon();
        }
    };
    GamblingPanelRoundOverSupport.prototype.nextRoundStartHandler = function (cardList) {
        this._isNextRoundStart = true;
        if (GamblingManager.self && GamblingManager.self.state != PlayerState.WaitNext) {
            this.target.actionGroup.showImmediatelyBrightCardBtn(false);
        }
        if (this._isClientOver == false) {
            qin.Console.log("服务器推送下一局开始，执行清理!");
            this.readyStart();
            this._isClientOver = true;
        }
        this._isChecedkRebuyAddon = false;
        this.target.waitNextRoundComponent.show(false);
    };
    GamblingPanelRoundOverSupport.prototype.startRunRoundOverOper = function () {
        if (this.isDisabled) {
            return;
        }
        qin.Console.log("开始跑结算筹码动画");
        // this.target.actionGroup.hideAll(true);
        if (GamblingManager.roundOverInfo && GamblingManager.roundOverInfo.potList) {
            this.showAllCardType();
            this._runIndex = 0;
            this.runNext();
        }
    };
    GamblingPanelRoundOverSupport.prototype.runNext = function () {
        if (this.isDisabled) {
            return;
        }
        if (!GamblingManager.roundOverInfo || !GamblingManager.roundOverInfo.potList) {
            if (!GamblingManager.roundOverInfo) {
                qin.Console.log("结算异常：结算信息空");
            }
            if (GamblingManager.roundOverInfo && !GamblingManager.roundOverInfo.potList) {
                qin.Console.log("结算异常：结算底池空");
            }
            return;
        }
        if (GamblingUtil.isOmaha) {
            for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                var player = _a[_i];
                var headCom = this.target.getHeadComponent(player.pos);
                if (headCom) {
                    for (var j = 1; j <= GamblingManager.OmahaHandCardNum; j++) {
                        var cardCom = headCom['cardFace' + j];
                        if (cardCom) {
                            cardCom.showMaxFlag(false);
                        }
                    }
                }
            }
        }
        var headComponent;
        var pInfo;
        var pointList = new Array();
        var potAwardInfo = GamblingManager.roundOverInfo.potList[this._runIndex];
        if (potAwardInfo && potAwardInfo.roleId) {
            for (var _b = 0, _c = potAwardInfo.roleId; _b < _c.length; _b++) {
                var roleId = _c[_b];
                pInfo = GamblingManager.getPlayerInfo(roleId);
                if (pInfo) {
                    headComponent = this.target.getHeadComponent(pInfo.pos); //先通过用户信息找
                }
                if (!headComponent) {
                    headComponent = this.target.getHeadComponentByLastRoleId(roleId); //找不到则找最后一个roleid缓存容错
                }
                if (headComponent) {
                    if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.publicCard && GamblingManager.roomInfo.publicCard.length >= GamblingManager.MaxBoardNum) {
                        this.showCardMaskImg(roleId, headComponent); //公共牌有最后一张尝试显示牌型
                    }
                    else {
                        if (GamblingUtil.isWin(roleId)) {
                            if (roleId == UserManager.userInfo.roleId) {
                                SoundManager.playEffect(MusicAction.win);
                            }
                            headComponent.chipsLabel.text = "赢";
                            headComponent.showCardTypeBgFilter(2);
                            headComponent.showWinEffect();
                            if (roleId == UserManager.userInfo.roleId) {
                                this.target.winAnimeGroup.visible = true;
                                this.showWinAnime();
                                this.showWinEffect();
                            }
                        }
                    }
                    // if (roleId == UserManager.userInfo.roleId)
                    // {
                    // 	pointList.push(new egret.Point(headComponent.x + headComponent.maxWidth / 2, headComponent.y + headComponent.maxHeight / 2));
                    // }
                    // else
                    // {
                    //30为一个筹码的宽度 15为30/2
                    pointList.push(new egret.Point(headComponent.x + headComponent.headIcon.maxWidth / 2 - 15, headComponent.y + headComponent.playerGroup.y + headComponent.headIcon.maxHeight / 2 - 15));
                    // }
                }
            }
        }
        var dataList = this.target.potChipsGroup["dataList"];
        if (dataList && dataList.length > 0 && pointList.length > 0) {
            var chipsShowComponent1 = void 0;
            var chipsShowComponent2 = void 0;
            // for (let i: number = this.target.chipsBgGroup.numChildren - 1 - this._runIndex; i >= 0; i--)
            // {
            var index = this.target.chipsBgGroup.numChildren - 1 - this._runIndex;
            if (index < 0) {
                index = 0;
            }
            chipsShowComponent1 = this.target.chipsBgGroup.getChildAt(index);
            chipsShowComponent2 = this.target.chipsNumGroup.getChildAt(index);
            // if (chipsShowComponent2.bindData.num == potAwardInfo.num)
            // {
            for (var _d = 0, pointList_1 = pointList; _d < pointList_1.length; _d++) {
                var targetPoint = pointList_1[_d];
                targetPoint.x -= this.target.potChipsGroup.x + chipsShowComponent1.x;
                targetPoint.y -= this.target.potChipsGroup.y + chipsShowComponent1.y;
            }
            chipsShowComponent1.winChipsTween(pointList, this.runOver, this);
            chipsShowComponent2.winChipsTween(pointList, undefined, undefined);
            // qin.QinLog.log("唯一编码：", chipsShowComponent1.hashCode, "chipsShowComponent2", chipsShowComponent2.hashCode);
            // }
            // }
        }
        else {
            this.runOver();
        }
    };
    GamblingPanelRoundOverSupport.prototype.runOver = function () {
        if (this.isDisabled) {
            return;
        }
        if (GamblingManager.roundOverInfo) {
            var potAwardInfo = GamblingManager.roundOverInfo.potList[this._runIndex];
            if (potAwardInfo) {
                var roleId = potAwardInfo.roleId;
                if (!roleId) {
                    roleId = [-1];
                }
                var wiNum = Math.floor(potAwardInfo.num / roleId.length);
                var headComponent = void 0;
                var roleIdNum = void 0;
                for (var i = 0; i < roleId.length; i++) {
                    roleIdNum = roleId[i];
                    if (roleIdNum == -1) {
                        headComponent = this.target.getHeadComponent(1);
                    }
                    else {
                        headComponent = this.target.getHeadComponentByRole(roleId[i]);
                    }
                    if (!headComponent) {
                        headComponent = this.target.getHeadComponentByLastRoleId(roleId[i]);
                    }
                    if (headComponent) {
                        headComponent.runWinChipsAnim(wiNum);
                        // headComponent.winEffectImg.visible = true;
                        if (headComponent.bindData && headComponent.bindData.bankRoll > 0) {
                            // headComponent.chipsLabel.text = qin.MathUtil.formatNum(headComponent.bindData.bankRoll);
                            qin.Console.log("结算结束显示筹码" + headComponent.bindData.bankRoll + headComponent.bindData.userInfo.name);
                        }
                    }
                }
            }
        }
        qin.Tick.AddTimeoutInvoke(this.delayRunNext, 1500, this);
    };
    GamblingPanelRoundOverSupport.prototype.delayRunNext = function () {
        if (GamblingManager.roundOverInfo) {
            this._runIndex++;
            if (this._runIndex < GamblingManager.roundOverInfo.potList.length) {
                this.runNext();
            }
            else {
                this.target.waitNextRoundComponent.show(true);
                qin.Tick.AddTimeoutInvoke(this.delayRoundOver, 1200, this);
            }
        }
    };
    GamblingPanelRoundOverSupport.prototype.delayRoundOver = function (data) {
        if (this._isNextRoundStart == false) {
            qin.Console.log("客户端请求下一局!执行清理");
            this._isClientOver = true;
            this.readyStart();
            qin.Tick.AddTimeoutInvoke(this.reqNextRoundStart, 1000, this);
        }
    };
    /**
     * 准备开始
     */
    GamblingPanelRoundOverSupport.prototype.readyStart = function () {
        this.nextStartClear();
        if (GamblingManager.self && GamblingManager.self.state != PlayerState.WaitNext) {
            this.target.actionGroup.showImmediatelyBrightCardBtn(false);
        }
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            pitInfo.headComponent.showCardFace(false);
            pitInfo.headComponent.showBankRoll(); //显示筹码
            pitInfo.headComponent.showHaveCardImg(false);
            //pitInfo.headComponent.showCardTypeBgFilter(0);
            if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.state == PlayerState.WaitNext && GamblingUtil.isMtt) {
                pitInfo.headComponent.changeState(GamblingHeadStateType.WaitNext); //锦标赛中重构等待下一局的玩家状态是等待下一局
            }
            else {
                pitInfo.headComponent.changeState(GamblingHeadStateType.RoundStart);
            }
        }
        if (GamblingUtil.isMtt) {
            if (this._isChecedkRebuyAddon == false) {
                this._isChecedkRebuyAddon = true;
                this.target.checkRebuyAddon();
            }
        }
        else {
            GamblingManager.checkBust();
        }
    };
    GamblingPanelRoundOverSupport.prototype.reqNextRoundStart = function () {
        if (this.isDisabled) {
            return;
        }
        // for (let i: number = 0; i < this.target.chipsBgGroup.numChildren; i++)
        // {
        // 	let chipsShowComponent1: ChipsShowComponent = this.target.chipsBgGroup.getChildAt(i) as ChipsShowComponent;
        // 	let chipsShowComponent2: ChipsShowComponent = this.target.chipsNumGroup.getChildAt(i) as ChipsShowComponent;
        // 	chipsShowComponent1.clear();
        // 	chipsShowComponent2.clear();
        // }
        GamblingManager.reqNextRoundStart(); //请求3601
    };
    GamblingPanelRoundOverSupport.prototype.nextStartClear = function () {
        this.target.clearPotChips();
        var len = this.target.cardList.length;
        for (var i = 0; i < len; i++) {
            this.target.cardList[i].visible = false;
        }
        this.target.cardTypeGroup.visible = false;
        if (GamblingUtil.isOmaha) {
            this.target.cardTypeComp.init(CardType.None);
        }
        this.target.potLabel.text = qin.MathUtil.formatNum(0); //清理底池显示
        this.hideWinEffect();
    };
    /**
     * 显示灰暗
     */
    GamblingPanelRoundOverSupport.prototype.showCardMaskImg = function (roleId, headComponent) {
        var matchResult;
        // matchResult = CardTypeMatchUtil.matchCardInRoom(GamblingManager.roomInfo.handCardList);
        // headComponent.infoLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
        if (GamblingManager.roundOverInfo.handCardList) {
            for (var _i = 0, _a = GamblingManager.roundOverInfo.handCardList; _i < _a.length; _i++) {
                var cardInfo = _a[_i];
                if (cardInfo.roleId == roleId) {
                    qin.Console.log("显示牌型!");
                    if (GamblingUtil.isOmaha) {
                        matchResult = CardTypeMatchUtil.OmahaMatchCardInRoom(cardInfo.cardList);
                    }
                    else {
                        matchResult = CardTypeMatchUtil.matchCardInRoom(cardInfo.cardList);
                    }
                    if (GamblingUtil.isWin(cardInfo.roleId)) {
                        headComponent.showWinEffect();
                        if (cardInfo.roleId == UserManager.userInfo.roleId) {
                            this.target.winAnimeGroup.visible = true;
                            this.showWinAnime();
                            this.showWinEffect();
                        }
                    }
                    //headComponent.infoLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
                    // headComponent.chipsLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
                    // if (GamblingUtil.isWin(cardInfo.roleId))
                    // {
                    // 	headComponent.showCardTypeBgFilter(2);
                    // }
                    // else
                    // {
                    // 	headComponent.showCardTypeBgFilter(1);
                    // }
                    // headComponent.chipsBgImg.filters //变更滤镜颜色 做个非自己判断
                    break;
                }
            }
        }
        if (!matchResult) {
            if (GamblingUtil.isWin(UserManager.userInfo.roleId)) {
                SoundManager.playEffect(MusicAction.win);
                headComponent.showWinEffect();
                this.target.winAnimeGroup.visible = true;
                this.showWinAnime();
                this.showWinEffect();
            }
            return;
        }
        if (GamblingUtil.isWin(UserManager.userInfo.roleId)) {
            SoundManager.playWinSoundEffect(CardTypeMatchUtil.cardType);
        }
        var len = this.target.cardList.length;
        var card;
        headComponent.cardFace1.showMask(true);
        headComponent.cardFace2.showMask(true);
        if (GamblingUtil.isOmaha) {
            headComponent.cardFace3.showMask(true);
            headComponent.cardFace4.showMask(true);
        }
        for (var i = 0; i < len; i++) {
            card = this.target.cardList[i];
            if (card.visible) {
                card.showMask(true);
                card.showMaxFlag(false);
            }
        }
        for (var _b = 0, _c = CardTypeMatchUtil.resultList; _b < _c.length; _b++) {
            var resultInfo = _c[_b];
            for (var i = 0; i < len; i++) {
                card = this.target.cardList[i];
                if (card.visible && card.bindData) {
                    if (resultInfo.card[2] == 1 && resultInfo.card[0] == card.bindData.card[0] && resultInfo.card[1] == card.bindData.card[1]) {
                        card.showMask(false);
                        if (GamblingUtil.isOmaha) {
                            card.showMaxFlag(true);
                        }
                        break;
                    }
                }
            }
            if (resultInfo.card[2] == 1 && headComponent.cardFace1.bindData &&
                resultInfo.card[0] == headComponent.cardFace1.bindData.card[0] && resultInfo.card[1] == headComponent.cardFace1.bindData.card[1]) {
                headComponent.cardFace1.showMask(false);
                if (GamblingUtil.isOmaha) {
                    headComponent.cardFace1.showMaxFlag(true);
                }
            }
            if (resultInfo.card[2] == 1 && headComponent.cardFace2.bindData &&
                resultInfo.card[0] == headComponent.cardFace2.bindData.card[0] && resultInfo.card[1] == headComponent.cardFace2.bindData.card[1]) {
                headComponent.cardFace2.showMask(false);
                if (GamblingUtil.isOmaha) {
                    headComponent.cardFace2.showMaxFlag(true);
                }
            }
            if (GamblingUtil.isOmaha) {
                if (resultInfo.card[2] == 1 && headComponent.cardFace3.bindData &&
                    resultInfo.card[0] == headComponent.cardFace3.bindData.card[0] && resultInfo.card[1] == headComponent.cardFace3.bindData.card[1]) {
                    headComponent.cardFace3.showMask(false);
                    headComponent.cardFace3.showMaxFlag(true);
                }
                if (resultInfo.card[2] == 1 && headComponent.cardFace4.bindData &&
                    resultInfo.card[0] == headComponent.cardFace4.bindData.card[0] && resultInfo.card[1] == headComponent.cardFace4.bindData.card[1]) {
                    headComponent.cardFace4.showMask(false);
                    headComponent.cardFace4.showMaxFlag(true);
                }
            }
        }
    };
    /**
     * 结算立即显示所有人的牌型
     */
    GamblingPanelRoundOverSupport.prototype.showAllCardType = function () {
        if (GamblingManager.roundOverInfo.handCardList) {
            var headComponent = void 0;
            for (var _i = 0, _a = GamblingManager.roundOverInfo.handCardList; _i < _a.length; _i++) {
                var cardInfo = _a[_i];
                if (GamblingUtil.isOmaha) {
                    CardTypeMatchUtil.OmahaMatchCardInRoom(cardInfo.cardList);
                }
                else {
                    CardTypeMatchUtil.matchCardInRoom(cardInfo.cardList);
                }
                headComponent = this.target.getHeadComponentByRole(cardInfo.roleId);
                if (headComponent) {
                    if (GamblingUtil.isWin(cardInfo.roleId)) {
                        headComponent.showCardTypeBgFilter(2);
                        headComponent.chipsLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
                    }
                    else {
                        if (headComponent.bindData && headComponent.bindData.state != PlayerState.Fold) {
                            headComponent.showCardTypeBgFilter(1);
                            headComponent.chipsLabel.text = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
                        }
                    }
                }
                else {
                    qin.Console.log("显示牌型失败！未找到roleid：", cardInfo.roleId, "的头像组件！");
                }
            }
        }
    };
    /**
     * 显示赢牌特效
     */
    GamblingPanelRoundOverSupport.prototype.showWinEffect = function () {
        var _this = this;
        AnimationFactory.getParticleEffect(AnimationType.WinCard2, this.target.winAnimeGroup, function (ptc) {
            _this._winEffect1 = ptc;
        });
        qin.Tick.AddTimeoutInvoke(this.showWinEffect2, 150, this);
        qin.Tick.AddTimeoutInvoke(this.showWinEffect3, 300, this);
    };
    GamblingPanelRoundOverSupport.prototype.showWinEffect2 = function () {
        var _this = this;
        AnimationFactory.getParticleEffect(AnimationType.WinCard3, this.target.winAnimeGroup, function (ptc) {
            _this._winEffect2 = ptc;
        });
    };
    GamblingPanelRoundOverSupport.prototype.showWinEffect3 = function () {
        var _this = this;
        AnimationFactory.getParticleEffect(AnimationType.WinCard4, this.target.winAnimeGroup, function (ptc) {
            _this._winEffect3 = ptc;
        });
    };
    /**
     * 隐藏赢牌特效
     */
    GamblingPanelRoundOverSupport.prototype.hideWinEffect = function () {
        if (this._winEffect1 && this._winEffect1.parent) {
            this._winEffect1.stop();
            this._winEffect1.parent.removeChild(this._winEffect1);
        }
        if (this._winEffect2 && this._winEffect2.parent) {
            this._winEffect2.stop();
            this._winEffect2.parent.removeChild(this._winEffect2);
        }
        if (this._winEffect3 && this._winEffect3.parent) {
            this._winEffect3.stop();
            this._winEffect3.parent.removeChild(this._winEffect3);
        }
    };
    /**
     * 显示赢牌动画
     */
    GamblingPanelRoundOverSupport.prototype.showWinAnime = function () {
        egret.Tween.removeTweens(this.target.winImg1);
        egret.Tween.removeTweens(this.target.winImg2);
        egret.Tween.removeTweens(this.target.winImg3);
        egret.Tween.get(this.target.winImg1).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        egret.Tween.get(this.target.winImg2).set({ scaleX: 0, scaleY: 0 }).wait(150).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        egret.Tween.get(this.target.winImg3).set({ scaleX: 0, scaleY: 0 }).wait(300).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        qin.Tick.AddTimeoutInvoke(this.hideWinAnime, 2000, this);
    };
    /**
     * 赢牌隐藏动画
     */
    GamblingPanelRoundOverSupport.prototype.hideWinAnime = function () {
        egret.Tween.removeTweens(this.target.winAnimeGroup);
        var callback = function () {
            this.target.winAnimeGroup.y = 770;
            this.target.winAnimeGroup.alpha = 1;
            this.target.winAnimeGroup.visible = false;
        };
        egret.Tween.get(this.target.winAnimeGroup).set({ y: 770, alpha: 1 }).to({ y: 750, alpha: 0 }, 300).call(callback, this);
    };
    return GamblingPanelRoundOverSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelRoundOverSupport.prototype, "GamblingPanelRoundOverSupport");
//# sourceMappingURL=GamblingPanelRoundOverSupport.js.map