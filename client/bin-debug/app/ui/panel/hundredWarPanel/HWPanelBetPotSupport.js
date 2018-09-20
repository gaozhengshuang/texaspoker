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
 * 注池支持
 */
var HWPanelBetPotSupport = (function (_super) {
    __extends(HWPanelBetPotSupport, _super);
    function HWPanelBetPotSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWPanelBetPotSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.state == HWState.Bet) {
            this.setBetPotInfo();
        }
    };
    HWPanelBetPotSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        for (var _i = 0, _a = this.target.betPotList; _i < _a.length; _i++) {
            var betPot = _a[_i];
            betPot.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betPotHandler, this);
        }
        HundredWarManager.OnGetRoomInfoEvent.addListener(this.setBetPotInfo, this);
        HundredWarManager.onBetEvent.addListener(this.refreshBetPotInfo, this);
        HundredWarManager.onBetChangeEvent.addListener(this.showBetCoinAnim, this);
        HundredWarManager.onHideCardsEvent.addListener(this.resetPreRoundInfo, this);
        this.target.cardsComponentGroup.addEventListener(egret.Event.RESIZE, this.onResize, this);
    };
    HWPanelBetPotSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        for (var _i = 0, _a = this.target.betPotList; _i < _a.length; _i++) {
            var betPot = _a[_i];
            betPot.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.betPotHandler, this);
        }
        HundredWarManager.OnGetRoomInfoEvent.removeListener(this.setBetPotInfo, this);
        HundredWarManager.onBetEvent.removeListener(this.refreshBetPotInfo, this);
        HundredWarManager.onBetChangeEvent.removeListener(this.showBetCoinAnim, this);
        HundredWarManager.onHideCardsEvent.removeListener(this.resetPreRoundInfo, this);
        this.target.cardsComponentGroup.removeEventListener(egret.Event.RESIZE, this.onResize, this);
    };
    /**
     * 屏幕大小改变时
    */
    HWPanelBetPotSupport.prototype.onResize = function () {
        this.target.hwAnim.refreshPos(this.target.betPotList, 0, 38);
        this.target.cardsAnim.refreshPos(this.target.cardsComponentList, 48, 58);
    };
    /**
     * 清除上一轮信息
    */
    HWPanelBetPotSupport.prototype.resetPreRoundInfo = function () {
        HundredWarManager.roundOverClear();
        this.clearBetPot();
        qin.ArrayUtil.Clear(this.posBetList);
    };
    /**
     * 离开清除数据
    */
    HWPanelBetPotSupport.prototype.leaveClear = function () {
        this.clearBetPot();
        qin.ArrayUtil.Clear(this.posBetList);
    };
    /**
     * 清除注池组件信息
    */
    HWPanelBetPotSupport.prototype.clearBetPot = function () {
        for (var _i = 0, _a = this.target.betPotList; _i < _a.length; _i++) {
            var info = _a[_i];
            info.reset();
        }
    };
    /**
     * 设置注池数据
    */
    HWPanelBetPotSupport.prototype.setBetPotInfo = function () {
        if (HundredWarManager.roomInfo) {
            if (HundredWarManager.roomInfo.betList && HundredWarManager.roomInfo.betList.length > 0) {
                for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                    var betInfo = _a[_i];
                    var i = betInfo.pos - 1;
                    if (betInfo.bet) {
                        this.target.betPotList[i].allChipsLabel.text = qin.MathUtil.formatNum(betInfo.bet);
                    }
                    if (betInfo.myBet) {
                        this.target.betPotList[i].myChipsLabel.text = qin.MathUtil.formatNum(betInfo.myBet);
                        this.target.betPotList[i].myChipsImg.visible = true;
                    }
                }
            }
        }
    };
    /**
     * 写入位置下注信息
    */
    HWPanelBetPotSupport.prototype.setPosBetInfo = function (posBetInfo) {
        if (!this.posBetList) {
            this.posBetList = new Array();
        }
        var flag = true;
        for (var i = 0; i < this.posBetList.length; i++) {
            if (this.posBetList[i].pos == posBetInfo.pos) {
                for (var j = 0; j < posBetInfo.bet.length; j++) {
                    if (posBetInfo.bet[j] > 0) {
                        this.posBetList[i].bet[j] += posBetInfo.bet[j];
                    }
                }
                flag = false;
                break;
            }
        }
        if (flag) {
            this.posBetList.push(posBetInfo);
        }
    };
    /**
     * 玩家下注播放动画
    */
    HWPanelBetPotSupport.prototype.showBetCoinAnim = function (data) {
        var bet = data.bet;
        if (bet && bet.length > 0) {
            this.target.hwAnim.setCoinToBets(this.target.playersBtn, bet, -20, -5);
            this.setBetPotInfo();
        }
        if (data.posBetList && data.posBetList.length > 0) {
            var pitInfo = void 0;
            var posBetInfo = void 0;
            var posList = new Array();
            for (var i = 0; i < data.posBetList.length; i++) {
                posBetInfo = data.posBetList[i];
                this.setPosBetInfo(posBetInfo);
                if ((HundredWarManager.self && HundredWarManager.self.pos != posBetInfo.pos) || (!HundredWarManager.self)) {
                    pitInfo = this.target.getPitInfoByIndex(posBetInfo.pos); //要播放动画的座位
                    if (posBetInfo.bet && posBetInfo.bet.length > 0) {
                        for (var j = 0; j < posBetInfo.bet.length; j++) {
                            if (posBetInfo.bet[j] > 0) {
                                posList.push(j + 1);
                            }
                        }
                    }
                    this.target.hwAnim.setCoinToBets(pitInfo.headComponent, posList, -25, -35);
                }
            }
        }
    };
    /**
     * 自己下注播放动画
    */
    HWPanelBetPotSupport.prototype.showSelfBetCoinAnim = function (pos) {
        if (pos >= 0) {
            this.target.hwAnim.setCoinToBets(this.target.selfGroup, [pos]);
        }
    };
    /**
     * 刷新注池自己下注数据
    */
    HWPanelBetPotSupport.prototype.refreshBetPotInfo = function (data) {
        if (data) {
            this.showSelfBetCoinAnim(data.pos);
            var hwPoolInfo = void 0;
            hwPoolInfo = this.target.getPoolInfoByIndex(data.pos);
            if (hwPoolInfo) {
                hwPoolInfo.betPotComponent.myChipsLabel.text = qin.MathUtil.formatNum(HundredWarManager.getSelfPoolGoldByPos(data.pos));
                hwPoolInfo.betPotComponent.myChipsImg.visible = true;
            }
        }
    };
    /**
     * 注池点击事件处理
    */
    HWPanelBetPotSupport.prototype.betPotHandler = function (event) {
        if (HundredWarManager.roomInfo && this.target.stateSupport.isOnBet && HundredWarManager.roomInfo.state == HWState.Bet && !HundredWarManager.isBanker(UserManager.userInfo.roleId)) {
            if (!this.target.sitDownAndAddCoin.isBetByOneFifth()) {
                return;
            }
            if (this.isGtBankerOneFifth()) {
                return;
            }
            var betPotComponent = void 0;
            if (event.currentTarget instanceof HWBetPotComponent) {
                betPotComponent = event.currentTarget;
            }
            for (var _i = 0, _a = this.target.poolList; _i < _a.length; _i++) {
                var pool = _a[_i];
                if (pool.betPotComponent == betPotComponent && HundredWarManager.roomInfo) {
                    HundredWarManager.reqBet(pool.pos, HundredWarManager.oneBetGold);
                    break;
                }
            }
        }
    };
    /**
     * 判断所有玩家已下注的注数加上即将下注的注数是否大于庄家金币的五分之一
    */
    HWPanelBetPotSupport.prototype.isGtBankerOneFifth = function () {
        var flag = false;
        var a = 0;
        for (var _i = 0, _a = HundredWarManager.roomInfo.playerList; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            if (playerInfo.pos == 0 && !HundredWarManager.isSysBanker(playerInfo.roleId)) {
                a = playerInfo.gold / 5;
                if ((HundredWarManager.getPlayerBetTotalNum() + HundredWarManager.oneBetGold) > (playerInfo.gold / 5)) {
                    flag = true;
                    UIManager.showFloatTips("当前下注金币数已达庄家金币上限");
                    break;
                }
            }
        }
        return flag;
    };
    return HWPanelBetPotSupport;
}(BaseHWPanelSupport));
__reflect(HWPanelBetPotSupport.prototype, "HWPanelBetPotSupport");
/**
 * 位置下注信息
*/
var PosBetInfo = (function () {
    function PosBetInfo() {
    }
    return PosBetInfo;
}());
__reflect(PosBetInfo.prototype, "PosBetInfo");
//# sourceMappingURL=HWPanelBetPotSupport.js.map