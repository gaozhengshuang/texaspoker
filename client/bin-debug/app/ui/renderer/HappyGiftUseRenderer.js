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
 * 欢乐豪礼兑换使用项
*/
var HappyGiftUseRenderer = (function (_super) {
    __extends(HappyGiftUseRenderer, _super);
    function HappyGiftUseRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HappyGiftUseRenderer;
        return _this;
    }
    HappyGiftUseRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.refreshUI();
    };
    HappyGiftUseRenderer.prototype.refreshUI = function () {
        if (this.bindData) {
            var awardDef = this.bindData.awardInfoDef;
            if (awardDef && awardDef.rewardList) {
                var itemDef = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id);
                if (itemDef) {
                    this.nameLabel.text = itemDef.name;
                }
            }
            this.countLabel.text = this.bindData.buyTime.toString();
        }
    };
    return HappyGiftUseRenderer;
}(BaseItemRenderer));
__reflect(HappyGiftUseRenderer.prototype, "HappyGiftUseRenderer");
//# sourceMappingURL=HappyGiftUseRenderer.js.map