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
 * 百人大战结算支持
 */
var HWPanelRoundOverSupport = (function (_super) {
    __extends(HWPanelRoundOverSupport, _super);
    function HWPanelRoundOverSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWPanelRoundOverSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.hwResultsCardInfo = new Array();
        this.target.poolDesGroup.visible = false;
        this.target.poolDesGroup.scaleX = this.target.poolDesGroup.scaleY = 0;
        this.setPoolInfo();
    };
    HWPanelRoundOverSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        HundredWarManager.onCardPushEvent.addListener(this.setHundredWarOverInfo, this);
        HundredWarManager.onShowCardsEvent.addListener(this.showCardsInfo, this);
        HundredWarManager.OnGetRoomInfoEvent.addListener(this.setPoolInfo, this);
        HundredWarManager.onShowCardsAnimOverEvent.addListener(this.refreshInfo, this);
    };
    HWPanelRoundOverSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        HundredWarManager.onCardPushEvent.removeListener(this.setHundredWarOverInfo, this);
        HundredWarManager.onShowCardsEvent.removeListener(this.showCardsInfo, this);
        HundredWarManager.OnGetRoomInfoEvent.removeListener(this.setPoolInfo, this);
        HundredWarManager.onShowCardsAnimOverEvent.removeListener(this.refreshInfo, this);
        qin.Tick.RemoveTimeoutInvoke(this.hidePoolDes, this);
        qin.Tick.RemoveTimeoutInvoke(this.showBankerLoseAccountAnim, this);
        qin.Tick.RemoveTimeoutInvoke(this.showPlayerAccounfAnim, this);
        qin.Tick.RemoveTimeoutInvoke(this.onShowCardsOver, this);
        qin.Tick.RemoveTimeoutInvoke(this.hideCards, this);
    };
    /**
     * 结算处理
    */
    HWPanelRoundOverSupport.prototype.setHundredWarOverInfo = function () {
        if (HundredWarManager.hundredWarOverInfo) {
            qin.ArrayUtil.Clear(this.hwResultsCardInfo);
            var cardsCom = void 0;
            var hundredWarCardsInfo = void 0;
            var hwResult = void 0;
            var str = "";
            for (var i = 0; i < HundredWarManager.hundredWarOverInfo.betList.length; i++) {
                var betInfo = HundredWarManager.hundredWarOverInfo.betList[i];
                hundredWarCardsInfo = this.target.getCardsInfoByIndex(betInfo.pos);
                if (hundredWarCardsInfo) {
                    cardsCom = hundredWarCardsInfo.cardsComponent;
                    hwResult = new HWResultCardsInfo();
                    hwResult.cardList = betInfo.cards;
                    CardTypeMatchUtil.matchCardType(betInfo.cards);
                    hwResult.cardTypeDes = this.getCardImgTypeByType(CardTypeMatchUtil.cardType, betInfo.pos);
                    hwResult.cardType = CardTypeMatchUtil.cardType;
                    hwResult.pos = betInfo.pos;
                    var odds = HundredWarCardTypeDefined.GetInstance().getOddsByType(CardTypeMatchUtil.cardType);
                    if (HundredWarManager.getSelfPoolGoldByPos(betInfo.pos)) {
                        if (odds) {
                            str = "X " + odds + "  ";
                            if (betInfo.win == HundredWarResultType.Win) {
                                str = str + "+" + qin.MathUtil.formatNum(HundredWarManager.getSelfPoolGoldByPos(betInfo.pos));
                            }
                            else if (betInfo.win == HundredWarResultType.Lose) {
                                str = str + "-" + qin.MathUtil.formatNum(HundredWarManager.getSelfPoolGoldByPos(betInfo.pos));
                            }
                            else if (betInfo.win == HundredWarResultType.Dogfall) {
                                str = "";
                                str = str + "X 0" + "  平局";
                            }
                        }
                    }
                    else {
                        if (betInfo.pos == 0) {
                            str = "X " + odds;
                        }
                        else {
                            str = "没有下注";
                        }
                    }
                    hwResult.resultDes = str;
                    this.hwResultsCardInfo.push(hwResult);
                    if (i == HundredWarManager.hundredWarOverInfo.betList.length - 1) {
                        this.target.cardsAnim.createCardGroup(hwResult.cardList, this.target.dealGroup, i, i * 500, true, 45);
                    }
                    else {
                        this.target.cardsAnim.createCardGroup(hwResult.cardList, this.target.dealGroup, i, i * 500, false, 45);
                    }
                }
            }
            if (this.target.cardsComponentList) {
                for (var i = 0; i < this.target.cardsComponentList.length; i++) {
                    this.target.cardsGroup.setChildIndex(this.target["cardsComponent" + i], this.target.cardsGroup.numChildren);
                }
            }
            HundredWarManager.roomInfo.pool = HundredWarManager.hundredWarOverInfo.pool;
            this.target.refreshPreBetList();
        }
    };
    HWPanelRoundOverSupport.prototype.refreshInfo = function () {
        this.setPoolInfo();
        this.target.goldChange();
    };
    /**
     * 显示奖池信息
    */
    HWPanelRoundOverSupport.prototype.setPoolInfo = function () {
        this.target.potLabel.text = qin.MathUtil.formatNum(HundredWarManager.roomInfo.pool);
    };
    /**
     * 切换牌和筹码的层级
    */
    HWPanelRoundOverSupport.prototype.changeCardsAndCoinsIndex = function () {
        this.target.cardsComponentGroup.swapChildren(this.target.cardsGroup, this.target.coinsGroup);
    };
    /**
     * 显示牌型和输赢描述
    */
    HWPanelRoundOverSupport.prototype.showCardsInfo = function (pos) {
        this.changeCardsAndCoinsIndex();
        if (this.target.cardsComponentList && this.hwResultsCardInfo) {
            for (var i = 0; i < this.target.cardsComponentList.length; i++) {
                if (i == pos) {
                    this.target.cardsComponentList[i].showFront(this.hwResultsCardInfo[i], i);
                    break;
                }
            }
            if (pos == 4) {
                if (this.isShowPoolAnim()) {
                    this.showPoolDes();
                }
                else {
                    this.showBankerWinAccountCoinAnim();
                }
            }
        }
    };
    HWPanelRoundOverSupport.prototype.showPoolAnim = function () {
        if (this.hwResultsCardInfo) {
            for (var _i = 0, _a = this.hwResultsCardInfo; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.cardType == CardType.FourOfAKind || info.cardType == CardType.RoyalFlush || info.cardType == CardType.StraightFlush) {
                    if (info.pos != 0 && HundredWarManager.getIsHasBetByPos(info.pos)) {
                        this.target.hwAnim.setCoinToBet(this.target.potGroup, info.pos, 20, 100, 10);
                    }
                    else if (info.pos == 0) {
                        this.target.hwAnim.setCoinFromToByNum(this.target.potGroup, this.target.pit0, 10, 500, 10, 100, 10, -25, -35);
                    }
                }
            }
        }
    };
    /**
     * 隐藏赢牌特效
     */
    HWPanelRoundOverSupport.prototype.hideWinEffect = function () {
        if (this._poolDesEffect && this._poolDesEffect.parent) {
            this._poolDesEffect.stop();
            this._poolDesEffect.parent.removeChild(this._poolDesEffect);
        }
    };
    /**
     * 显示爆奖池
    */
    HWPanelRoundOverSupport.prototype.showPoolDes = function () {
        var _this = this;
        this.target.poolDesGroup.visible = true;
        egret.Tween.get(this.target.poolDesGroup)
            .set({ scaleX: 0, scaleY: 0 })
            .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut);
        AnimationFactory.getParticleEffect(AnimationType.HundredWarPoolDes, this.target.poolDesGroup, function (ptc) {
            _this._poolDesEffect = ptc;
        });
        this.showPoolAnim();
        qin.Tick.AddTimeoutInvoke(this.hidePoolDes, 2000, this);
    };
    /**
     * 隐藏爆奖池信息
    */
    HWPanelRoundOverSupport.prototype.hidePoolDes = function () {
        var _this = this;
        egret.Tween.get(this.target.poolDesGroup)
            .set({ scaleX: 1, scaleY: 1 })
            .to({ scaleX: 0, scaleY: 0 }, 200).call(function () { _this.target.poolDesGroup.visible = false; });
        this.hideWinEffect();
        this.showBankerWinAccountCoinAnim();
    };
    /**
     * 判断是否爆奖池
    */
    HWPanelRoundOverSupport.prototype.isShowPoolAnim = function () {
        if (this.hwResultsCardInfo && this.hwResultsCardInfo.length > 0) {
            for (var _i = 0, _a = this.hwResultsCardInfo; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.cardType == CardType.FourOfAKind || info.cardType == CardType.RoyalFlush || info.cardType == CardType.StraightFlush) {
                    if (info.pos != 0 && HundredWarManager.getIsHasBetByPos(info.pos)) {
                        return true;
                    }
                    else if (info.pos == 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 播放庄家结算金币动画
    */
    HWPanelRoundOverSupport.prototype.showBankerWinAccountCoinAnim = function () {
        if (HundredWarManager.hundredWarOverInfo && HundredWarManager.hundredWarOverInfo.betList) {
            var flag = true; //是否全是庄家赢
            for (var _i = 0, _a = HundredWarManager.hundredWarOverInfo.betList; _i < _a.length; _i++) {
                var betInfo = _a[_i];
                for (var _b = 0, _c = HundredWarManager.roomInfo.betList; _b < _c.length; _b++) {
                    var info = _c[_b];
                    if (betInfo.pos == info.pos && info.bet > 0) {
                        if ((betInfo.win == HundredWarResultType.Lose || betInfo.win == HundredWarResultType.Dogfall) && betInfo.pos != 0) {
                            this.target.hwAnim.setCoinBackByBet(betInfo.pos, this.target.pit0, -25, -35); //庄家赢
                        }
                        else if (flag) {
                            flag = false;
                        }
                    }
                }
            }
            if (flag) {
                this.showBankerLoseAccountAnim(flag); //庄家全赢
            }
            else {
                qin.Tick.AddTimeoutInvoke(this.showBankerLoseAccountAnim, 2000, this, flag); //庄家有输
            }
        }
    };
    HWPanelRoundOverSupport.prototype.showBankerLoseAccountAnim = function (flag) {
        if (flag) {
            this.showPlayerAccounfAnim(flag); //庄家全赢       
        }
        else {
            if (HundredWarManager.hundredWarOverInfo && HundredWarManager.hundredWarOverInfo.betList) {
                for (var _i = 0, _a = HundredWarManager.hundredWarOverInfo.betList; _i < _a.length; _i++) {
                    var betInfo = _a[_i];
                    if ((betInfo.win == HundredWarResultType.Win || betInfo.win == HundredWarResultType.Dogfall) && betInfo.pos != 0) {
                        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.betList) {
                            for (var _b = 0, _c = HundredWarManager.roomInfo.betList; _b < _c.length; _b++) {
                                var info = _c[_b];
                                if (info.pos == betInfo.pos && info.bet > 0) {
                                    this.target.hwAnim.setCoinToBet(this.target.pit0, betInfo.pos, 20, -25, -35); //庄家输                                    
                                    this.bankerEffect();
                                }
                            }
                        }
                    }
                }
            }
            qin.Tick.AddTimeoutInvoke(this.showPlayerAccounfAnim, 1000, this, flag); //闲家赢
        }
    };
    HWPanelRoundOverSupport.prototype.clearEffect = function () {
        if (this._poolEffect && this._poolEffect.parent) {
            this._poolEffect.stop();
            this._poolEffect.parent.removeChild(this._poolEffect);
        }
        if (this._playerEffect && this._playerEffect.parent) {
            this._playerEffect.stop();
            this._playerEffect.parent.removeChild(this._playerEffect);
        }
        if (this._bankerEffect && this._bankerEffect.parent) {
            this._bankerEffect.stop();
            this._bankerEffect.parent.removeChild(this._bankerEffect);
        }
    };
    /**
     * 奖池特效
     */
    HWPanelRoundOverSupport.prototype.poolEffect = function () {
        var _this = this;
        egret.Tween.get(this.target.potBg)
            .set({ alpha: 0 })
            .to({ alpha: 1 }, 1000)
            .wait(500)
            .to({ alpha: 0 }, 500);
        AnimationFactory.getParticleEffect(AnimationType.HundredWarPool, this.target.potGroup, function (ptc) {
            _this._poolEffect = ptc;
        });
    };
    /**
     * 闲家特效
     */
    HWPanelRoundOverSupport.prototype.playerEffect = function () {
        var _this = this;
        egret.Tween.get(this.target.playersBtnBg)
            .set({ alpha: 0 })
            .to({ alpha: 1 }, 1000)
            .wait(500)
            .to({ alpha: 0 }, 500);
        AnimationFactory.getParticleEffect(AnimationType.HundredWarPlayer, this.target.playersBtn, function (ptc) {
            _this._playerEffect = ptc;
        });
    };
    /**
     * 庄家特效
     */
    HWPanelRoundOverSupport.prototype.bankerEffect = function () {
        var _this = this;
        egret.Tween.get(this.target.bankerBg)
            .set({ alpha: 0 })
            .to({ alpha: 1 }, 300)
            .wait(300)
            .to({ alpha: 0 }, 300);
        AnimationFactory.getParticleEffect(AnimationType.HundredWarBanker, this.target.pit0, function (ptc) {
            _this._bankerEffect = ptc;
        });
    };
    /**
     * 播放闲家结算金币动画
    */
    HWPanelRoundOverSupport.prototype.showPlayerAccounfAnim = function (flag) {
        if (!flag) {
            this.target.hwAnim.setAllCoinBack(this.target.playersBtn, -20, -5); //无座
            this.playerEffect();
            this.showTaxAndSelfWinAnim(); //收税、自己和坐下玩家            
        }
        else {
            qin.Tick.AddTimeoutInvoke(this.hideCards, 3000, this);
            qin.Tick.AddTimeoutInvoke(this.onShowCardsOver, 2000, this);
        }
    };
    /**
     * 播放收税、自己和坐下玩家赢取金币的动画
    */
    HWPanelRoundOverSupport.prototype.showTaxAndSelfWinAnim = function () {
        if (HundredWarManager.hundredWarOverInfo && HundredWarManager.hundredWarOverInfo.betList && HundredWarManager.hundredWarOverInfo.betList.length > 0) {
            for (var _i = 0, _a = HundredWarManager.hundredWarOverInfo.betList; _i < _a.length; _i++) {
                var overBetInfo = _a[_i];
                if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.betList && HundredWarManager.roomInfo.betList.length > 0) {
                    for (var _b = 0, _c = HundredWarManager.roomInfo.betList; _b < _c.length; _b++) {
                        var betInfo = _c[_b];
                        if ((overBetInfo.pos == betInfo.pos) && betInfo.bet > 0 && (overBetInfo.win == HundredWarResultType.Win || overBetInfo.win == HundredWarResultType.Dogfall)) {
                            //收税
                            this.showTaxAnim(overBetInfo);
                            //坐下玩家
                            this.showSitDownPlayerWinAnim(betInfo);
                        }
                        // 自己
                        this.showSelfWinAnim(overBetInfo, betInfo);
                    }
                }
            }
        }
        qin.Tick.AddTimeoutInvoke(this.onShowCardsOver, 2000, this);
        qin.Tick.AddTimeoutInvoke(this.hideCards, 3000, this);
    };
    /**
     * 播放自己赢动画
    */
    HWPanelRoundOverSupport.prototype.showSelfWinAnim = function (overBetInfo, betInfo) {
        if ((overBetInfo.pos == betInfo.pos) && betInfo.myBet > 0 && (overBetInfo.win == HundredWarResultType.Win || overBetInfo.win == HundredWarResultType.Dogfall)) {
            var num = (Math.floor(Math.random() * 1000000000)) % 4 + 3;
            this.target.hwAnim.setCoinFromToByNum(this.target.betPotList[overBetInfo.pos - 1], this.target.selfGroup, num, 1000, 0, 0, 100, -15);
        }
    };
    /**
     * 播放收税动画
    */
    HWPanelRoundOverSupport.prototype.showTaxAnim = function (overBetInfo) {
        var num = (Math.floor(Math.random() * 1000000000)) % 3 + 2;
        //收税
        this.target.hwAnim.setCoinFromToByNum(this.target.betPotList[overBetInfo.pos - 1], this.target.potGroup, num, 1500, 100, 0, 0, 120, 15);
        this.poolEffect();
    };
    /**
     * 播放坐下玩家赢取金币动画
    */
    HWPanelRoundOverSupport.prototype.showSitDownPlayerWinAnim = function (betInfo) {
        if (this.target.betPotSupport.posBetList && this.target.betPotSupport.posBetList.length > 0) {
            var pitInfo = void 0;
            for (var _i = 0, _a = this.target.betPotSupport.posBetList; _i < _a.length; _i++) {
                var posBetInfo = _a[_i];
                if ((HundredWarManager.self && HundredWarManager.self.pos != posBetInfo.pos) || (!HundredWarManager.self)) {
                    pitInfo = this.target.getPitInfoByIndex(posBetInfo.pos); //要播放动画的座位
                    if (posBetInfo.bet[betInfo.pos - 1] > 0) {
                        var num1 = (Math.floor(Math.random() * 1000000000)) % 3 + 2;
                        this.target.hwAnim.setCoinFromToByNum(this.target.betPotList[betInfo.pos - 1], pitInfo.headComponent, num1, 1000, 100, 0, 0, -25, -35);
                    }
                }
            }
        }
    };
    /**
     * 结算动画播放完成
    */
    HWPanelRoundOverSupport.prototype.onShowCardsOver = function () {
        this.changeCardsAndCoinsIndex();
        HundredWarManager.onShowCardsAnimOverEvent.dispatch();
    };
    /**
     * 隐藏牌
    */
    HWPanelRoundOverSupport.prototype.hideCards = function () {
        this.target.cardsAnim.hideAllCards();
        this.clearCardsInfo();
        HundredWarManager.onHideCardsEvent.dispatch();
    };
    /**
     * 根据牌型获取牌型描述图片
    */
    HWPanelRoundOverSupport.prototype.getCardImgTypeByType = function (type, pos) {
        var str;
        if (pos == 0) {
            switch (type) {
                case CardType.HighCard:
                    str = HWPanelSetting.HighCard_banker;
                    break;
                case CardType.OnePair:
                    str = HWPanelSetting.OnePair_banker;
                    break;
                case CardType.TwoPairs:
                    str = HWPanelSetting.TwoPairs_banker;
                    break;
                case CardType.ThreeOfAKind:
                    str = HWPanelSetting.ThreeOfAKind_banker;
                    break;
                case CardType.Flush:
                    str = HWPanelSetting.Flush_banker;
                    break;
                case CardType.Fullhouse:
                    str = HWPanelSetting.Fullhouse_banker;
                    break;
                case CardType.FourOfAKind:
                    str = HWPanelSetting.FourOfAKind_banker;
                    break;
                case CardType.Straight:
                    str = HWPanelSetting.Straight_banker;
                    break;
                case CardType.StraightFlush:
                    str = HWPanelSetting.StraightFlush_banker;
                    break;
                case CardType.RoyalFlush:
                    str = HWPanelSetting.RoyalFlush;
                    break;
            }
        }
        else {
            if (HundredWarManager.getBetPotResultByPos(pos)) {
                switch (type) {
                    case CardType.HighCard:
                        str = HWPanelSetting.HighCard_Win;
                        break;
                    case CardType.OnePair:
                        str = HWPanelSetting.OnePair_Win;
                        break;
                    case CardType.TwoPairs:
                        str = HWPanelSetting.TwoPairs_Win;
                        break;
                    case CardType.ThreeOfAKind:
                        str = HWPanelSetting.ThreeOfAKind_Win;
                        break;
                    case CardType.Flush:
                        str = HWPanelSetting.Flush_Win;
                        break;
                    case CardType.Fullhouse:
                        str = HWPanelSetting.Fullhouse_Win;
                        break;
                    case CardType.FourOfAKind:
                        str = HWPanelSetting.FourOfAKind_Win;
                        break;
                    case CardType.Straight:
                        str = HWPanelSetting.Straight_Win;
                        break;
                    case CardType.StraightFlush:
                        str = HWPanelSetting.StraightFlush_Win;
                        break;
                    case CardType.RoyalFlush:
                        str = HWPanelSetting.RoyalFlush;
                        break;
                }
            }
            else {
                switch (type) {
                    case CardType.HighCard:
                        str = HWPanelSetting.HighCard;
                        break;
                    case CardType.OnePair:
                        str = HWPanelSetting.OnePair;
                        break;
                    case CardType.TwoPairs:
                        str = HWPanelSetting.TwoPairs;
                        break;
                    case CardType.ThreeOfAKind:
                        str = HWPanelSetting.ThreeOfAKind;
                        break;
                    case CardType.Flush:
                        str = HWPanelSetting.Flush;
                        break;
                    case CardType.Fullhouse:
                        str = HWPanelSetting.Fullhouse;
                        break;
                    case CardType.FourOfAKind:
                        str = HWPanelSetting.FourOfAKind;
                        break;
                    case CardType.Straight:
                        str = HWPanelSetting.Straight;
                        break;
                    case CardType.StraightFlush:
                        str = HWPanelSetting.StraightFlush;
                        break;
                    case CardType.RoyalFlush:
                        str = HWPanelSetting.RoyalFlush;
                        break;
                }
            }
        }
        return str;
    };
    /**
     * 清除牌型及描述
    */
    HWPanelRoundOverSupport.prototype.clearCardsInfo = function () {
        for (var _i = 0, _a = this.target.cardsComponentList; _i < _a.length; _i++) {
            var info = _a[_i];
            info.reset();
        }
    };
    /**
     * 离开房间清除数据
    */
    HWPanelRoundOverSupport.prototype.leaveClear = function () {
        this.target.cardsAnim.clear();
        this.target.hwAnim.clear();
        this.clearCardsInfo();
        this.clearEffect();
    };
    return HWPanelRoundOverSupport;
}(BaseHWPanelSupport));
__reflect(HWPanelRoundOverSupport.prototype, "HWPanelRoundOverSupport");
//# sourceMappingURL=HWPanelRoundOverSupport.js.map