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
 * 兑换记录项
*/
var GoldenBeanRecordItemRenderer = (function (_super) {
    __extends(GoldenBeanRecordItemRenderer, _super);
    function GoldenBeanRecordItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GoldenBeanRecordItemRenderer;
        return _this;
    }
    GoldenBeanRecordItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.timeLabel.text = qin.DateTimeUtil.formatTimestamp(this.bindData.time, qin.DateTimeUtil.Format_Standard_NoSecondAndYear);
            var awardDef = AwardDefined.GetInstance().getDefinition(this.bindData.awardId);
            if (awardDef) {
                if (awardDef.rewardList && awardDef.rewardList.length > 0) {
                    var itemDef = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id);
                    if (itemDef) {
                        this.nameLabel.text = itemDef.name;
                    }
                }
                if (awardDef.costList && awardDef.costList.length > 0) {
                    this.goldenBeanLabel.text = awardDef.costList[0].count.toString();
                }
            }
        }
    };
    return GoldenBeanRecordItemRenderer;
}(BaseItemRenderer));
__reflect(GoldenBeanRecordItemRenderer.prototype, "GoldenBeanRecordItemRenderer");
//# sourceMappingURL=GoldenBeanRecordItemRenderer.js.map