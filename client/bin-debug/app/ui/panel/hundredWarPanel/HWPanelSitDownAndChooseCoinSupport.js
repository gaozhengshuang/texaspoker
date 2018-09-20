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
 * 坐下/选择金币 逻辑支持
 */
var HWPanelSitDownAndChooseCoinSupport = (function (_super) {
    __extends(HWPanelSitDownAndChooseCoinSupport, _super);
    function HWPanelSitDownAndChooseCoinSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWPanelSitDownAndChooseCoinSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.target.doubleBtn["lightImg"].visible = false;
        this.target.doubleBtn["bgImg"].source = HWPanelSetting.Chip_db;
        this.target.repetBtn["lightImg"].visible = false;
        this.target.repetBtn["bgImg"].source = HWPanelSetting.Chip_rep;
        this.resetDbAndRepetBtn();
    };
    HWPanelSitDownAndChooseCoinSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            pit.headComponent.headIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
            pit.headComponent.emptyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
        }
        this.target.betList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBetListClick, this);
        this.target.repetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepetBtnClick, this);
        this.target.doubleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoubleBtnClick, this);
        HundredWarManager.onSeatEvent.addListener(this.onSeatSuccess, this);
        HundredWarManager.onBetEvent.addListener(this.refreshBetMask, this);
        HundredWarManager.onRoomStateChangeEvent.addListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.OnGetRoomInfoEvent.addListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.addListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.onPosChangeEvent.addListener(this.onPosChange, this);
    };
    HWPanelSitDownAndChooseCoinSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            pit.headComponent.headIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
            pit.headComponent.emptyGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
        }
        this.target.betList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBetListClick, this);
        this.target.repetBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepetBtnClick, this);
        this.target.doubleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoubleBtnClick, this);
        HundredWarManager.onSeatEvent.removeListener(this.onSeatSuccess, this);
        HundredWarManager.onBetEvent.removeListener(this.refreshBetMask, this);
        HundredWarManager.onRoomStateChangeEvent.removeListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.OnGetRoomInfoEvent.removeListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.removeListener(this.resetDbAndRepetBtn, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.onPosChange, this);
    };
    /**
     * 禁用重复下注按钮
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.forbidRepBtn = function () {
        this.target.repetBtn["maskImg"].visible = true;
        this.target.repetBtn.touchEnabled = false;
    };
    /**
     * 启用重复下注按钮
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.openRepBtn = function () {
        this.target.repetBtn["maskImg"].visible = false;
        this.target.repetBtn.touchEnabled = true;
    };
    /**
     * 禁用双倍下注按钮
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.forbidDbBtn = function () {
        this.target.doubleBtn["maskImg"].visible = true;
        this.target.doubleBtn.touchEnabled = false;
    };
    /**
     * 启用双倍下注按钮
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.openDbBtn = function () {
        this.target.doubleBtn["maskImg"].visible = false;
        this.target.doubleBtn.touchEnabled = true;
    };
    /**
     * 重置重复按钮
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.resetRepetBtn = function () {
        this.target.repetBtn.visible = true;
        if (this.repIsUseable()) {
            this.openRepBtn();
        }
        else {
            this.forbidRepBtn();
        }
    };
    /**
     * 重置双倍按钮
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.resetDbBtn = function () {
        this.target.doubleBtn.visible = false;
        this.openDbBtn();
    };
    /**
     * 重置重复双倍按钮和注数选择
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.resetDbAndRepetBtn = function () {
        if (HundredWarManager.roomInfo) {
            if (HundredWarManager.roomInfo.state == HWState.Bet && !HundredWarManager.isBanker(UserManager.userInfo.roleId)) {
                this.resetRepetBtn();
                this.resetDbBtn();
                this.reSetBetMask();
            }
            else if (HundredWarManager.roomInfo.state == HWState.WaitNext) {
                this.forbidBet();
                this.forbidBetChoose();
            }
        }
    };
    /**
     * 禁用重复合双倍按钮
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.forbidBet = function () {
        this.forbidRepBtn();
        this.forbidDbBtn();
    };
    /**
     * 判断重复或者双倍下注后金币是否会超出庄家上限
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.isOverBankerMost = function () {
        for (var _i = 0, _a = HundredWarManager.roomInfo.playerList; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            if (playerInfo.pos == 0 && !HundredWarManager.isSysBanker(playerInfo.roleId)) {
                if (HundredWarManager.getPlayerBetTotalNum() + this.target.getPreBetGold() > (playerInfo.gold / 5)) {
                    UIManager.showFloatTips("当前下注金币数已达庄家金币上限");
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 重复下注按钮点击执行事件
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.onRepetBtnClick = function (event) {
        if (this.repIsUseable() && !this.isOverBankerMost() && this.target.stateSupport.isOnBet) {
            SoundManager.playButtonEffect(event.target);
            this.target.repetBtn.visible = false;
            this.target.doubleBtn.visible = true;
            if (this.dbIsUseable(true)) {
                this.target.doubleBtn["maskImg"].visible = false;
            }
            else {
                this.target.doubleBtn["maskImg"].visible = true;
            }
            for (var _i = 0, _a = this.target.preBetList; _i < _a.length; _i++) {
                var betInfo = _a[_i];
                if (betInfo.myBet > 0) {
                    HundredWarManager.reqBet(betInfo.pos, betInfo.myBet);
                }
            }
        }
    };
    /**
     * 位置改变执行事件
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.onPosChange = function (data) {
        if (data.roleId && data.roleId == UserManager.userInfo.roleId) {
            if (HundredWarManager.isBanker(data.roleId)) {
                this.forbidBet();
                this.forbidBetChoose();
            }
            else {
                if (this.target.repetBtn.visible == true) {
                    this.resetRepetBtn();
                }
                this.reSetBetMask();
            }
        }
    };
    /**
     * 双倍按钮点击执行事件
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.onDoubleBtnClick = function (event) {
        if (this.dbIsUseable() && !this.isOverBankerMost() && this.target.stateSupport.isOnBet) {
            SoundManager.playButtonEffect(event.target);
            this.forbidDbBtn();
            for (var _i = 0, _a = this.target.preBetList; _i < _a.length; _i++) {
                var betInfo = _a[_i];
                if (betInfo.myBet > 0) {
                    HundredWarManager.reqBet(betInfo.pos, betInfo.myBet);
                }
            }
        }
    };
    /**
     * 判断重复按钮是否是可点击的
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.repIsUseable = function () {
        if (HundredWarManager.roomInfo.state == HWState.Bet) {
            var total = this.target.getPreBetGold() + HundredWarManager.getThisBetGold();
            if (this.target.getPreBetGold() && ((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= total) {
                return true;
            }
        }
        return false;
    };
    /**
     * 判断双倍按钮是否是可点击的
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.dbIsUseable = function (isRepClick) {
        if (isRepClick === void 0) { isRepClick = false; }
        if (HundredWarManager.roomInfo.state == HWState.Bet) {
            var total = void 0;
            if (isRepClick) {
                total = this.target.getPreBetGold() * 2 + HundredWarManager.getThisBetGold();
            }
            else {
                total = this.target.getPreBetGold() + HundredWarManager.getThisBetGold();
            }
            if (((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= total) {
                return true;
            }
        }
        return false;
    };
    /**
     * 点击注数执行事件
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.onBetListClick = function (event) {
        if (this.target.betList.selectedItem && this.target.betList.selectedItem.isBet) {
            SoundManager.playEffect(MusicAction.buttonClick);
            this.refreshBetColor(this.target.betList.selectedItem.id);
            HundredWarManager.oneBetGold = this.target.betList.selectedItem.bet; //设置数据
        }
    };
    HWPanelSitDownAndChooseCoinSupport.prototype.refreshBetColor = function (id) {
        var dp = this.target.betList.dataProvider; //设置显示状态
        for (var i = 0; i < this.target.betList.numChildren; i++) {
            if (dp.source[i].id == id) {
                var hwBetItem = this.target.betList.getChildAt(id);
                if (hwBetItem) {
                    hwBetItem.setActive();
                }
            }
            else {
                var hwBetItem = this.target.betList.getChildAt(dp.source[i].id);
                if (hwBetItem) {
                    hwBetItem.setNotActive();
                }
            }
        }
    };
    /**
     * 重置注数遮罩
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.reSetBetMask = function () {
        this.setBetMask();
    };
    /**
     * 更新遮罩
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.refreshBetMask = function () {
        this.setBetMask();
        if (this.target.repetBtn.visible == true) {
            if (this.repIsUseable()) {
                this.openRepBtn();
            }
            else {
                this.forbidRepBtn();
            }
        }
        if (this.target.doubleBtn["maskImg"].visible == false) {
            if (this.dbIsUseable()) {
                this.openDbBtn();
            }
            else {
                this.forbidDbBtn();
            }
        }
    };
    /**
     * 设置遮罩
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.setBetMask = function () {
        var dp = this.target.betList.dataProvider; //设置显示状态     
        var flag = true;
        for (var i = 0; i < this.target.betList.numChildren; i++) {
            var hwBetItem = this.target.betList.getChildAt(dp.source[i].id);
            if (HundredWarManager.roomInfo.state == HWState.Bet) {
                var total = void 0;
                total = dp.source[i].bet + HundredWarManager.getThisBetGold();
                if (((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= total) {
                    hwBetItem.bet["maskImg"].visible = false;
                    dp.source[i].isBet = true;
                }
                else {
                    if (flag) {
                        var total1 = void 0;
                        if (i > 0) {
                            total1 = dp.source[i - 1].bet + HundredWarManager.getThisBetGold();
                        }
                        else {
                            total1 = dp.source[0].bet + HundredWarManager.getThisBetGold();
                        }
                        if ((dp.source[i].bet <= HundredWarManager.oneBetGold) && (((UserManager.userInfo.gold + HundredWarManager.getThisBetGold()) / 5) >= total1)) {
                            if (i > 0) {
                                this.refreshBetColor(dp.source[i - 1].id);
                                HundredWarManager.oneBetGold = dp.source[i - 1].bet;
                            }
                            else if (i == 0) {
                                this.refreshBetColor(dp.source[i].id);
                                HundredWarManager.oneBetGold = dp.source[i].bet;
                            }
                            flag = false;
                        }
                    }
                    hwBetItem.bet["maskImg"].visible = true;
                    dp.source[i].isBet = false;
                }
            }
            else {
                hwBetItem.bet["maskImg"].visible = true;
                dp.source[i].isBet = false;
            }
        }
    };
    /**
     * 判断是否可下注  （剩余的钱是否满足已下注的五分之一）
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.isBetByOneFifth = function () {
        var flag = false;
        var dp = this.target.betList.dataProvider;
        for (var i = 0; i < this.target.betList.numChildren; i++) {
            if (dp.source[i].isBet == true) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    /**
    * 禁用筹码选择
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.forbidBetChoose = function () {
        var dp = this.target.betList.dataProvider; //设置显示状态     
        var flag = true;
        for (var i = 0; i < this.target.betList.numChildren; i++) {
            var hwBetItem = this.target.betList.getChildAt(dp.source[i].id);
            hwBetItem.bet["maskImg"].visible = true;
            dp.source[i].isBet = false;
        }
    };
    /**
    * 点击充值跳转到商城
   */
    HWPanelSitDownAndChooseCoinSupport.prototype.showShopping = function () {
        UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.HundredWarRoomPanel });
    };
    /**
     * 头像点击执行事件
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.pitTouchHandler = function (event) {
        if (this.target.moveTouchEnd(event)) {
            return;
        }
        var headComponent;
        if (event.currentTarget.parent instanceof HWHeadComponent) {
            headComponent = event.currentTarget.parent;
        }
        else if (event.currentTarget.parent.parent instanceof HWHeadComponent) {
            headComponent = event.currentTarget.parent.parent;
        }
        if (headComponent.bindData == null && InfoUtil.checkAvailable(HundredWarManager.roomInfo) && UserManager.userInfo.gold < HundredWarManager.roomInfo.definition.seatGold) {
            SoundManager.playEffect(MusicAction.buttonClick);
            AlertManager.showConfirm("坐下需要金币大于" + qin.MathUtil.formatNum(HundredWarManager.roomInfo.definition.seatGold) + "，您的余额不足！", null, this.showShopping, null, null, null, null, "充值");
            return;
        }
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            if (pit.headComponent == headComponent && HundredWarManager.roomInfo) {
                if (headComponent.bindData == null) {
                    var hwPlayerInfo = void 0;
                    hwPlayerInfo = HundredWarManager.getPlayerInfo(UserManager.userInfo.roleId);
                    if (hwPlayerInfo && hwPlayerInfo.pos != undefined) {
                        return;
                    }
                    //发送坐下请求 
                    SoundManager.playEffect(MusicAction.buttonClick);
                    HundredWarManager.reqSeat(pit.pos);
                }
                else {
                    if (!HundredWarManager.isSysBanker(headComponent.bindData.roleId)) {
                        SoundManager.playEffect(MusicAction.buttonClick);
                        UserManager.reqShowOtherUserInfoPanel(headComponent.bindData.roleId);
                    }
                }
                break;
            }
        }
    };
    /**
     * 坐下成功广播执行事件
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.onSeatSuccess = function (pos) {
        var hwHeadCom;
        hwHeadCom = this.target.getHeadComponent(pos);
        if (hwHeadCom) {
            var hwPlayerInfo = new HWHundredWarRoomPlayerInfo();
            hwPlayerInfo.copyValueFromThis(UserManager.userInfo);
            hwHeadCom.sitDownInit(hwPlayerInfo);
            // this.onSitOrStand();
        }
    };
    /**
     * 自己坐下成功时显示坐下特效
    */
    HWPanelSitDownAndChooseCoinSupport.prototype.onSitOrStand = function () {
        if (this.isDisabled) {
            qin.Console.log("异步不显示自己的手牌");
            return;
        }
        var com = this.target.getHeadComponentByRole(UserManager.userInfo.roleId);
        if (com) {
            this.target.showDownEffect(com.playerGroup);
        }
    };
    HWPanelSitDownAndChooseCoinSupport.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return HWPanelSitDownAndChooseCoinSupport;
}(BaseHWPanelSupport));
__reflect(HWPanelSitDownAndChooseCoinSupport.prototype, "HWPanelSitDownAndChooseCoinSupport");
//# sourceMappingURL=HWPanelSitDownAndChooseCoinSupport.js.map