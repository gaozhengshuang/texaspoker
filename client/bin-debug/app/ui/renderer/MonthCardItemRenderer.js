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
 * 月卡项面板
*/
var MonthCardItemRenderer = (function (_super) {
    __extends(MonthCardItemRenderer, _super);
    function MonthCardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.MonthCardItemRenderer;
        return _this;
    }
    MonthCardItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.iconImg.source = this.bindData.definition.iconName + ResSuffixName.PNG;
            this._monthCardDefinition = AwardDefined.GetInstance().getDefinition(this.bindData.definition.awardId);
            if (this._monthCardDefinition) {
                if (this._monthCardDefinition.costList) {
                    this.costLabel.text = this._monthCardDefinition.costList[0].count / 100 + this.getDesByCostType(this._monthCardDefinition.costList[0].type);
                }
                this._bringAwardDef = AwardDefined.GetInstance().getAwardInfoByPreId(this._monthCardDefinition.id);
                if (this._bringAwardDef) {
                    if (this._bringAwardDef.rewardList) {
                        this.goldNumDesLabel.text = this._bringAwardDef.rewardList[0].count + "金币";
                        this.goldNumLabel.text = this._bringAwardDef.rewardList[0].count.toString();
                    }
                }
            }
            this.setRendererInfo();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
            this.bringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBringBtnClick, this);
            AwardManager.OnExchanged.addListener(this.bringSuccess, this);
            AwardManager.OnAwardValueChanged.addListener(this.buySuccess, this);
        }
    };
    MonthCardItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
        this.bringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBringBtnClick, this);
        AwardManager.OnExchanged.removeListener(this.bringSuccess, this);
        AwardManager.OnAwardValueChanged.removeListener(this.buySuccess, this);
    };
    /**
     * 写入激活或者未激活两种状态的数据
    */
    MonthCardItemRenderer.prototype.setRendererInfo = function () {
        var surplusTime = this.getSurplusTime();
        if (surplusTime > 0) {
            this.openGroup.visible = true;
            this.closeGroup.visible = false;
            this.surplusDayLabel.text = "剩余:" + qin.DateTimeUtil.GetLefttimeText(surplusTime, false, true);
            this.surplusDayLabel.textColor = ColorEnum.White;
            if (AwardManager.isToLimit(this._bringAwardDef)) {
                this.forbidBringBtn();
            }
            else {
                this.bringBtn.enabled = true;
            }
        }
        else {
            this.openGroup.visible = false;
            this.closeGroup.visible = true;
            this.surplusDayLabel.textColor = ColorEnum.MonthCard_Inactivite_Brown;
            this.surplusDayLabel.text = "未激活";
        }
    };
    /**
     * 禁用领取按钮
    */
    MonthCardItemRenderer.prototype.forbidBringBtn = function () {
        this.bringBtn.enabled = false;
    };
    /**
     * 领取成功
    */
    MonthCardItemRenderer.prototype.bringSuccess = function (id) {
        if (this._bringAwardDef.id == id) {
            this.forbidBringBtn();
        }
    };
    /**
     * 购买成功
    */
    MonthCardItemRenderer.prototype.buySuccess = function (id) {
        if (id == this._monthCardDefinition.id) {
            this.setRendererInfo();
        }
    };
    /**
     * 购买按钮点击事件
    */
    MonthCardItemRenderer.prototype.onBuyBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        this.tryPay();
    };
    /**
     * 领取按钮点击事件
    */
    MonthCardItemRenderer.prototype.onBringBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this._bringAwardDef) {
            AwardManager.Exchange(this._bringAwardDef.id);
        }
    };
    /**
     * 获得月卡剩余时间
    */
    MonthCardItemRenderer.prototype.getSurplusTime = function () {
        var info = AwardManager.GetExchangeInfo(this.bindData.definition.awardId);
        if (info) {
            return info.lastTime - TimeManager.GetServerUtcTimestamp();
        }
        return 0;
    };
    /**
     * 购买
    */
    MonthCardItemRenderer.prototype.tryPay = function () {
        if (this.bindData) {
            ChannelManager.PaySend(this.bindData.id);
        }
    };
    /**
     * 根据消耗类型获得类型描述
    */
    MonthCardItemRenderer.prototype.getDesByCostType = function (costType) {
        var str;
        switch (costType) {
            case CostType.Gold:
                str = "金币";
                break;
            case CostType.Diamond:
                str = "钻石";
                break;
            case CostType.RMB:
                str = "元";
                break;
        }
        return str;
    };
    return MonthCardItemRenderer;
}(BaseItemRenderer));
__reflect(MonthCardItemRenderer.prototype, "MonthCardItemRenderer");
//# sourceMappingURL=MonthCardItemRenderer.js.map