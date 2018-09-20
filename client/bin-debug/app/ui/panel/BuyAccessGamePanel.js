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
 * 买入游戏面板
 */
var BuyAccessGamePanel = (function (_super) {
    __extends(BuyAccessGamePanel, _super);
    function BuyAccessGamePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.BuyAccessGamePanel);
        return _this;
    }
    BuyAccessGamePanel.prototype.onAwake = function (event) {
        this.isCloseButtonTween = false;
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        _super.prototype.onAwake.call(this, event);
    };
    BuyAccessGamePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData.isGoldInsufficient) {
            this.buyAccessGp.visible = false;
            this.unEnoughGoldHandle(appendData.minNum);
            this.unEnoughGoldGp.visible = true;
            if (appendData.isBankruptcy) {
                this.bankruptcyImage.visible = true;
                this.insufficientImage.visible = false;
            }
            else {
                this.bankruptcyImage.visible = false;
                this.insufficientImage.visible = true;
            }
        }
        else {
            this.unEnoughGoldGp.visible = false;
            this.buyAccessGp.visible = true;
            this.smallestLabel.text = qin.MathUtil.formatNum(appendData.minNum);
            this.biggestLabel.text = qin.MathUtil.formatNum(appendData.maxNum);
            this.currentProperty.text = qin.MathUtil.formatNum(UserManager.userInfo.gold);
            this.buyAccessHs.minimum = appendData.minNum;
            this.buyAccessHs.maximum = appendData.maxNum;
            this.buyAccessHs.value = Math.min(UserManager.userInfo.gold, Math.max(appendData.minNum, Math.round(appendData.bbBuyIn / 2)));
            this.buyAccessHs.snapInterval = appendData.bBlind;
            if (this.buyAccessHs.minimum == this.buyAccessHs.maximum) {
                this.buyAccessHs.minimum = this.buyAccessHs.maximum - 1;
                this.buyAccessHs.value = this.buyAccessHs.maximum;
                this.buyAccessHs.thumb.touchEnabled = false;
            }
            else {
                this.buyAccessHs.thumb.touchEnabled = true;
            }
            this.countLable.text = "$" + qin.MathUtil.formatNum(this.buyAccessHs.value);
            if (GamblingManager.roomInfo) {
                if (GamblingManager.roomInfo.isAutoBuy != undefined) {
                    this.autoBuyCheck.selected = GamblingManager.roomInfo.isAutoBuy;
                }
                else {
                    this.autoBuyCheck.selected = true; //默认选中
                }
            }
            this.autoBuyCheck.visible = !this.panelData.isAddCoin;
            this.addCoinTitle.visible = this.buyTitle.visible = false;
            if (this.panelData.isAddCoin) {
                this.addCoinTitle.visible = true;
            }
            else {
                this.buyTitle.visible = true;
            }
        }
    };
    BuyAccessGamePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    BuyAccessGamePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.buyAccessHs.addEventListener(egret.Event.CHANGE, this.countBuyGold, this);
        this.buyNowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buNow, this);
        this.shoppingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
        this.buyAccessBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyAccessHandle, this);
        this.backButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        GamblingManager.SitOrStandEvent.addListener(this.sitOrStandHandler, this);
        GamblingManager.AddCoinEvent.addListener(this.buyInGameHandler, this);
        GamblingManager.BuyInGameEvent.addListener(this.buyInGameHandler, this);
    };
    BuyAccessGamePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.buyAccessHs.removeEventListener(egret.Event.CHANGE, this.countBuyGold, this);
        this.buyNowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buNow, this);
        this.shoppingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goShopping, this);
        this.buyAccessBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyAccessHandle, this);
        this.backButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        GamblingManager.SitOrStandEvent.removeListener(this.sitOrStandHandler, this);
        GamblingManager.AddCoinEvent.removeListener(this.buyInGameHandler, this);
        GamblingManager.BuyInGameEvent.removeListener(this.buyInGameHandler, this);
        AwardManager.OnExchanged.removeListener(this.onExchanged, this);
    };
    BuyAccessGamePanel.prototype.buNow = function (event) {
        if (this._shopInfo && this._shopInfo.definition) {
            var awardDef = AwardDefined.GetInstance().getDefinition(this._shopInfo.definition.awardId);
            if (awardDef) {
                var def = void 0;
                for (var _i = 0, _a = awardDef.costList; _i < _a.length; _i++) {
                    var cost = _a[_i];
                    if (cost.type == CostType.RMB) {
                        def = cost;
                    }
                }
                AwardManager.OnExchanged.removeListener(this.onExchanged, this);
                AwardManager.OnExchanged.addListener(this.onExchanged, this);
                ChannelManager.PaySend(this._shopInfo.id);
            }
        }
    };
    BuyAccessGamePanel.prototype.onExchanged = function (id) {
        if (this._shopInfo && this._shopInfo.definition && this._shopInfo.definition.awardId == id) {
            AwardManager.OnExchanged.removeListener(this.onExchanged, this);
            this.onCloseBtnClickHandler(null);
        }
    };
    BuyAccessGamePanel.prototype.onBack = function (event) {
        this.onCloseBtnClickHandler(event);
    };
    /**
     * 进入商城充值
     */
    BuyAccessGamePanel.prototype.goShopping = function (event) {
        this.onCloseBtnClickHandler(null);
        UIManager.showPanel(UIModuleName.ShoppingPanel, { prevPanelName: UIModuleName.GamblingPanel, toRight: false });
    };
    /**
     * 买入游戏处理
    */
    BuyAccessGamePanel.prototype.buyAccessHandle = function (event) {
        if (this.panelData.isAddCoin) {
            if (GamblingManager.self) {
                if (this.buyAccessHs.value > GamblingManager.self.bankRoll) {
                    GamblingManager.reqAddCoin(this.buyAccessHs.value - GamblingManager.self.bankRoll);
                }
                else {
                    UIManager.showFloatTips("已达最大买入！");
                }
            }
        }
        else {
            GamblingManager.reqBuyInGame(this.buyAccessHs.value, this.autoBuyCheck.selected, this.panelData.pos);
        }
    };
    BuyAccessGamePanel.prototype.sitOrStandHandler = function (obj) {
        if (obj.pInfo.roleId == UserManager.userInfo.roleId && (!this.panelData || !this.panelData.isGoldInsufficient)) {
            this.onCloseBtnClickHandler(null);
        }
    };
    BuyAccessGamePanel.prototype.buyInGameHandler = function () {
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 金币不足处理
    */
    BuyAccessGamePanel.prototype.unEnoughGoldHandle = function (smallestGold) {
        //当前资产与最小买入的差值
        var goldOffset = smallestGold - UserManager.userInfo.gold;
        // let awardDef = AwardDefined.GetInstance().(ShoppingManager.awardGoldList.id,ShoppingManager.awardGoldList)
        // let goldIndex=awardDef.costType.indexOf(CostType.RMB);
        this._shopInfo = null;
        var awardDef;
        if (ShopManager.goldList.length > 0) {
            for (var i = 0; i < ShopManager.goldList.length; i++) {
                var info = ShopManager.goldList[i];
                if (info && info.definition) {
                    awardDef = AwardDefined.GetInstance().getDefinition(info.definition.awardId);
                    if (awardDef && goldOffset <= awardDef.rewardList[0].count || i == ShopManager.goldList.length - 1) {
                        this._shopInfo = info;
                        break;
                    }
                }
            }
            if (this._shopInfo && awardDef) {
                if (awardDef.rewardList && awardDef.costList.length > 0) {
                    this.priceLabel.text = "仅需" + awardDef.costList[0].count / 100 + "元";
                }
                this.goldLabel.text = awardDef.name;
            }
        }
    };
    /**
     * 计算买入金币
    */
    BuyAccessGamePanel.prototype.countBuyGold = function (event) {
        this.countLable.text = "$" + qin.MathUtil.formatNum(this.buyAccessHs.value);
    };
    return BuyAccessGamePanel;
}(BasePanel));
__reflect(BuyAccessGamePanel.prototype, "BuyAccessGamePanel");
//# sourceMappingURL=BuyAccessGamePanel.js.map