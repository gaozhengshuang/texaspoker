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
 * 新人充值礼面板
 */
var NewPayGiftPanel = (function (_super) {
    __extends(NewPayGiftPanel, _super);
    function NewPayGiftPanel() {
        var _this = _super.call(this) || this;
        _this._isOpen = false;
        _this.setSkinName(UIModuleName.NewPayGiftPanel);
        return _this;
    }
    NewPayGiftPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    NewPayGiftPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (InfoUtil.checkAvailable(this.activityInfo) && !this._isOpen) {
            this._isOpen = true;
            this.desLabel.text = this.activityInfo.definition.des;
            var subInfo = this.activityInfo.subList[0];
            if (InfoUtil.checkAvailable(subInfo)) {
                this._subInfo = subInfo;
                var awardDef = AwardDefined.GetInstance().getDefinition(subInfo.definition.awardId);
                if (awardDef && awardDef.rewardList) {
                    this.firstPayComp.init(awardDef.rewardList[0]);
                }
            }
        }
        this.refresh();
    };
    NewPayGiftPanel.prototype.refresh = function () {
        if (this.activityInfo.step > 0) {
            this.payBtn.label = "领取";
        }
        else {
            if (this._subInfo) {
                this.payBtn.label = qin.StringUtil.format("充值{0}元领取", this._subInfo.definition.payNum / 100);
            }
        }
    };
    NewPayGiftPanel.prototype.onPayBtnClick = function (event) {
        if (this.activityInfo.step > 0) {
            ActivityManager.ReqGetActivityAward(this.activityInfo.id, 1);
        }
        else {
            JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.GameHallPanel);
            UIManager.closePanel(this);
            UIManager.closePanel(UIModuleName.GameHallPanel);
        }
    };
    NewPayGiftPanel.prototype.onTakePrize = function (id) {
        if (id == this.activityInfo.id) {
            this.onCloseBtnClickHandler(null);
        }
    };
    NewPayGiftPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPayBtnClick, this);
        ActivityManager.payPrizeHandler.onGetAwardCompleteEvent.addListener(this.onTakePrize, this);
    };
    NewPayGiftPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.payBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPayBtnClick, this);
        ActivityManager.payPrizeHandler.onGetAwardCompleteEvent.removeListener(this.onTakePrize, this);
    };
    return NewPayGiftPanel;
}(BaseActivityPanel));
__reflect(NewPayGiftPanel.prototype, "NewPayGiftPanel");
//# sourceMappingURL=NewPayGiftPanel.js.map