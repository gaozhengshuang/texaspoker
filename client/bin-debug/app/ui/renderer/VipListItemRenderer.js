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
 * 商城vip列表
*/
var VipListItemRenderer = (function (_super) {
    __extends(VipListItemRenderer, _super);
    function VipListItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.VipListItemRenderer;
        return _this;
    }
    VipListItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData) && this.vipImg != null) {
            var awardDef = AwardDefined.GetInstance().getDefinition(this.bindData.definition.awardId);
            this.vipImg.source = this.bindData.definition.iconName + ResSuffixName.PNG;
            if (awardDef) {
                if (this.bindData.definition.type == ShopType.Prop) {
                    this.desVip.text = awardDef.des;
                }
                else if (awardDef.rewardList) {
                    this.desVip.text = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id).des;
                }
                this.monthVip.text = awardDef.name;
                if (awardDef.costList) {
                    for (var _i = 0, _a = awardDef.costList; _i < _a.length; _i++) {
                        var def = _a[_i];
                        if (def.type == CostType.Diamond) {
                            this.vipCountBtn.label = def.count.toString();
                        }
                    }
                }
            }
        }
    };
    return VipListItemRenderer;
}(BaseItemRenderer));
__reflect(VipListItemRenderer.prototype, "VipListItemRenderer");
//# sourceMappingURL=VipListItemRenderer.js.map