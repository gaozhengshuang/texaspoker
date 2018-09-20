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
 * 欢乐豪礼商品项
*/
var HappyGiftItemRenderer = (function (_super) {
    __extends(HappyGiftItemRenderer, _super);
    function HappyGiftItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HappyGiftItemRenderer;
        return _this;
    }
    HappyGiftItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.getPrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    };
    HappyGiftItemRenderer.prototype.refreshUI = function () {
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.costLabel.text = qin.MathUtil.numAddSpace(this.bindData.definition.cost) + "欢乐券";
            if (this.bindData.awardInfoDef) {
                var rewardList = this.bindData.awardInfoDef.rewardList;
                if (rewardList.length > 0) {
                    var itemDef = ItemDefined.GetInstance().getDefinition(rewardList[0].id);
                    if (itemDef) {
                        if (itemDef.id == ItemFixedId.gold) {
                            this.nameLabel.text = itemDef.name + " * " + qin.MathUtil.formatNum(rewardList[0].count);
                        }
                        else {
                            this.nameLabel.text = itemDef.name;
                        }
                        this.itemComp.init(itemDef.icon + ResSuffixName.PNG, 130, null, false, true);
                    }
                }
            }
            if (this.bindData.definition.limit > this.bindData.buyTime) {
                this.getPrizeBtn.visible = true;
            }
            else {
                this.getPrizeBtn.visible = false;
            }
        }
    };
    HappyGiftItemRenderer.prototype.getPrize = function () {
        var info = ActivityManager.getActivityInfo(this.bindData.id);
        if (info) {
            if (info.step > this.bindData.definition.cost) {
                ActivityManager.ReqGetActivityAward(this.bindData.id, this.bindData.subId);
            }
            else {
                UIManager.showFloatTips("欢乐券不足！");
            }
        }
    };
    HappyGiftItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.getPrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
    };
    return HappyGiftItemRenderer;
}(BaseItemRenderer));
__reflect(HappyGiftItemRenderer.prototype, "HappyGiftItemRenderer");
//# sourceMappingURL=HappyGiftItemRenderer.js.map