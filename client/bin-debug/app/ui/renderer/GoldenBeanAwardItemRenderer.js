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
 * 兑换奖品项
*/
var GoldenBeanAwardItemRenderer = (function (_super) {
    __extends(GoldenBeanAwardItemRenderer, _super);
    function GoldenBeanAwardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GoldenBeanAwardItemRenderer;
        return _this;
    }
    GoldenBeanAwardItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.awardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAward, this);
        if (this.bindData) {
            var awardDef = AwardDefined.GetInstance().getDefinition(this.bindData.awardId);
            if (awardDef) {
                this.icon.init(awardDef);
                if (awardDef.rewardList && awardDef.rewardList.length > 0) {
                    var itemDef = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id);
                    if (itemDef) {
                        this.nameLabel.text = itemDef.name;
                    }
                }
                if (awardDef.costList && awardDef.costList.length > 0) {
                    this._cost = awardDef.costList[0].count;
                    this.goldenBeanLabel.text = this._cost.toString();
                }
            }
        }
    };
    GoldenBeanAwardItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.awardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAward, this);
    };
    GoldenBeanAwardItemRenderer.prototype.onAward = function (event) {
        if (this.bindData) {
            if (ItemManager.getItemNumById(ItemFixedId.GoldenBean, ItemManager.itemList) >= this._cost) {
                AwardManager.Exchange(this.bindData.awardId);
            }
            else {
                AlertManager.showAlert("您的金豆不足，完成新人礼、邀请好友等活动可获得金豆。");
            }
        }
    };
    return GoldenBeanAwardItemRenderer;
}(BaseItemRenderer));
__reflect(GoldenBeanAwardItemRenderer.prototype, "GoldenBeanAwardItemRenderer");
//# sourceMappingURL=GoldenBeanAwardItemRenderer.js.map