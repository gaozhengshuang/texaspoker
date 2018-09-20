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
 * 支付混合面板（appendData为ShopInfo）
 */
var PayModePanel = (function (_super) {
    __extends(PayModePanel, _super);
    function PayModePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.PayModePanel);
        return _this;
    }
    PayModePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0.3;
    };
    PayModePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        var awardDef = AwardDefined.GetInstance().getDefinition(appendData.awardId);
        if (awardDef) {
            this.goldLabel.text = awardDef.name;
            for (var _i = 0, _a = awardDef.costList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.type == CostType.RMB) {
                    this.moneyLabel.text = def.count / 100 + "元";
                }
            }
        }
    };
    PayModePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    PayModePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    PayModePanel.prototype.onClick = function (event) {
        switch (event.target) {
            case this.appStoreGroup:
                this.panelData["payState"] = PayState.Normal;
                ChannelManager.OnPayModelSelectEvent.dispatch(this.panelData);
                break;
            case this.weiXinGroup:
            case this.aliPayGroup:
                this.panelData["payState"] = PayState.Third;
                ChannelManager.OnPayModelSelectEvent.dispatch(this.panelData);
                break;
        }
    };
    return PayModePanel;
}(BasePanel));
__reflect(PayModePanel.prototype, "PayModePanel");
//# sourceMappingURL=PayModePanel.js.map