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
 * 我的礼物渲染项
 */
var MyAwardPanelItemRenderer = (function (_super) {
    __extends(MyAwardPanelItemRenderer, _super);
    function MyAwardPanelItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.MyAwardPanelItemRenderer;
        return _this;
    }
    MyAwardPanelItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this._itemDef = ItemDefined.GetInstance().getDefinition(this.bindData.itemId);
            if (this._itemDef) {
                this.bindData.effectType = this._itemDef.effectType;
                this.takePrizeBtn.visible = this.takeDesLabel.visible = this.itemDesLabel.visible = false;
                this.comItemIcon.init(this._itemDef.icon + ResSuffixName.PNG, 88);
                this.itemTitleLabel.text = this._itemDef.name;
                this.takeErrorLabel.visible = false;
                if (this.bindData.isGet == 1) {
                    this.takePrizeBtn.visible = this.itemDesLabel.visible = true;
                    this.itemDesLabel.text = this._itemDef.des;
                }
                else if (this.bindData.isGet == 2) {
                    this.takeDesLabel.visible = this.itemDesLabel.visible = true;
                    this.itemDesLabel.text = this._itemDef.des;
                    if (this.bindData.state == PrizeState.Complete) {
                        if (this._itemDef.effectType == PrizeEffectType.Kind) {
                            this.takeDesLabel.text = "已发货";
                        }
                        else if (this._itemDef.effectType == PrizeEffectType.Cost) {
                            this.takeDesLabel.text = "已充值";
                        }
                    }
                    else if (this.bindData.state == PrizeState.Underway) {
                        if (this._itemDef.effectType == PrizeEffectType.Kind) {
                            this.takeDesLabel.text = "等待发货";
                        }
                        else if (this._itemDef.effectType == PrizeEffectType.Cost) {
                            this.takeDesLabel.text = "充值中";
                        }
                    }
                    else if (this.bindData.state == PrizeState.InfoError) {
                        this.takeDesLabel.text = "信息错误";
                        this.takeErrorLabel.visible = true;
                    }
                }
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
            this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeAward, this);
        }
    };
    MyAwardPanelItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelBubble, this);
        this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeAward, this);
    };
    //领取礼物
    MyAwardPanelItemRenderer.prototype.onTakeAward = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (!UserManager.userInfo.addressName) {
            AlertManager.showAlert("您尚未填写领奖信息，请填写后再领取奖品", this.skipToInfo);
        }
        else {
            if (this._itemDef.effectType == PrizeEffectType.Kind) {
                //实物订单确认界面
                UIManager.showPanel(UIModuleName.PrizeOrderSurePanel, { id: this.bindData.itemId, type: PrizeEffectType.Kind, awardName: this._itemDef.name });
            }
            else {
                //话费订单确认界面
                UIManager.showPanel(UIModuleName.PrizeOrderSurePanel, { id: this.bindData.itemId, type: PrizeEffectType.Cost, awardName: this._itemDef.name });
            }
        }
    };
    /**
     * 调到领奖信息选项
    */
    MyAwardPanelItemRenderer.prototype.skipToInfo = function () {
        PrizeManager.onSkipEvent.dispatch();
    };
    MyAwardPanelItemRenderer.prototype.cancelBubble = function (event) {
        event.stopImmediatePropagation();
    };
    return MyAwardPanelItemRenderer;
}(BaseItemRenderer));
__reflect(MyAwardPanelItemRenderer.prototype, "MyAwardPanelItemRenderer");
//# sourceMappingURL=MyAwardPanelItemRenderer.js.map