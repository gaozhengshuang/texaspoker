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
 * 坐下/增加金币 逻辑支持
 */
var GamblingPanelSitDownAndAddCoinSupport = (function (_super) {
    __extends(GamblingPanelSitDownAndAddCoinSupport, _super);
    function GamblingPanelSitDownAndAddCoinSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelSitDownAndAddCoinSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            pit.headComponent.headIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
            pit.headComponent.emptyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
        }
        this.target.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyTapHandler, this);
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            pit.headComponent.headIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
            pit.headComponent.emptyGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pitTouchHandler, this);
        }
        this.target.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyTapHandler, this);
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.pitTouchHandler = function (event) {
        if (this.target.moveTouchEnd(event)) {
            return;
        }
        SoundManager.playEffect(MusicAction.buttonClick);
        var headComponent;
        if (event.currentTarget.parent instanceof GamblingHeadComponent) {
            headComponent = event.currentTarget.parent;
        }
        else if (event.currentTarget.parent.parent instanceof GamblingHeadComponent) {
            headComponent = event.currentTarget.parent.parent;
        }
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pit = _a[_i];
            if (pit.headComponent == headComponent && GamblingManager.roomInfo) {
                if (headComponent.bindData == null) {
                    if (GamblingManager.self) {
                        if (GamblingManager.roomInfo.gamblingType != GamblingType.Match) {
                            UIManager.showPanel(UIModuleName.InviteFriendPanel);
                        }
                    }
                    else {
                        var pos = this.target.getPlayerPos(pit);
                        var bBuy = 0;
                        if (GamblingManager.roomInfo.definition.bBuyin == undefined) {
                            bBuy = Number.MAX_VALUE;
                        }
                        else {
                            bBuy = GamblingManager.roomInfo.definition.bBuyin;
                        }
                        var maxNum = Math.min(bBuy, UserManager.userInfo.gold);
                        var minNum = GamblingManager.roomInfo.definition.sBuyin;
                        var bBlind = GamblingManager.roomInfo.bBlind;
                        maxNum = Math.max(maxNum, minNum);
                        var isGoldInsufficient = UserManager.userInfo.gold < minNum;
                        UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { isGoldInsufficient: isGoldInsufficient, bbBuyIn: bBuy, isAddCoin: false, maxNum: maxNum, minNum: minNum, bBlind: bBlind, pos: pos });
                    }
                }
                else {
                    UserManager.reqShowOtherUserInfoPanel(headComponent.bindData.roleId);
                }
                break;
            }
        }
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.buyTapHandler = function (event) {
        var type = GamblingType.Common;
        if (GamblingManager.roomInfo) {
            type = GamblingManager.roomInfo.gamblingType;
        }
        if (GamblingManager.self && type != GamblingType.Match) {
            var maxNum = GamblingManager.self.bankRoll + UserManager.userInfo.gold;
            maxNum = Math.min(GamblingManager.roomInfo.definition.bBuyin, maxNum);
            var minNum = GamblingManager.self.bankRoll;
            var bBlind = GamblingManager.roomInfo.bBlind;
            if (maxNum == 0) {
                maxNum = GamblingManager.roomInfo.definition.bBuyin;
            }
            if (minNum == 0) {
                minNum = GamblingManager.roomInfo.definition.sBuyin;
            }
            if (minNum >= maxNum) {
                //UIManager.showFloatTips("金币已达上限！");
                //return;
                minNum = maxNum;
            }
            UIManager.showPanel(UIModuleName.BuyAccessGamePanel, { isAddCoin: true, bbBuyIn: GamblingManager.roomInfo.definition.bBuyin, maxNum: maxNum, minNum: minNum, bBlind: bBlind });
        }
        else {
            UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.GamblingPanel });
        }
    };
    GamblingPanelSitDownAndAddCoinSupport.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return GamblingPanelSitDownAndAddCoinSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelSitDownAndAddCoinSupport.prototype, "GamblingPanelSitDownAndAddCoinSupport");
//# sourceMappingURL=GamblingPanelSitDownAndAddCoinSupport.js.map