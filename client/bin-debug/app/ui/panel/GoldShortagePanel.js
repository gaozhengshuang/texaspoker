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
 * 金币不足面板
 */
var GoldShortagePanel = (function (_super) {
    __extends(GoldShortagePanel, _super);
    function GoldShortagePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GoldShortagePanel);
        return _this;
    }
    GoldShortagePanel.prototype.onAwake = function (event) {
        this.isCloseButtonTween = false;
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
        _super.prototype.onAwake.call(this, event);
    };
    GoldShortagePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (this.panelData && this.panelData.goldShortage > 0) {
            this.unEnoughGoldHandle();
            if (appendData.isBankruptcy) {
                this.bankruptcyImage.visible = true;
                this.insufficientImage.visible = false;
            }
            else {
                this.bankruptcyImage.visible = false;
                this.insufficientImage.visible = true;
            }
        }
    };
    GoldShortagePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GoldShortagePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.buyNowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buNow, this);
    };
    GoldShortagePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.buyNowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buNow, this);
        AwardManager.OnExchanged.removeListener(this.onExchanged, this);
    };
    GoldShortagePanel.prototype.buNow = function (event) {
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
    GoldShortagePanel.prototype.onExchanged = function (id) {
        if (this._shopInfo && this._shopInfo.definition && this._shopInfo.definition.awardId == id) {
            AwardManager.OnExchanged.removeListener(this.onExchanged, this);
            this.onCloseBtnClickHandler(null);
        }
    };
    GoldShortagePanel.prototype.buyInGameHandler = function () {
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 金币不足处理
    */
    GoldShortagePanel.prototype.unEnoughGoldHandle = function () {
        this._shopInfo = null;
        var awardDef;
        if (ShopManager.goldList.length > 0) {
            for (var i = 0; i < ShopManager.goldList.length; i++) {
                var info = ShopManager.goldList[i];
                if (info && info.definition) {
                    awardDef = AwardDefined.GetInstance().getDefinition(info.definition.awardId);
                    if (awardDef && this.panelData.goldShortage <= awardDef.rewardList[0].count || i == ShopManager.goldList.length - 1) {
                        this._shopInfo = info;
                        break;
                    }
                }
            }
            if (this._shopInfo && awardDef) {
                if (awardDef.costList && awardDef.costList.length > 0) {
                    this.priceLabel.text = "仅需" + awardDef.costList[0].count / 100 + "元";
                }
                this.goldLabel.text = awardDef.name;
            }
        }
    };
    return GoldShortagePanel;
}(BasePanel));
__reflect(GoldShortagePanel.prototype, "GoldShortagePanel");
//# sourceMappingURL=GoldShortagePanel.js.map