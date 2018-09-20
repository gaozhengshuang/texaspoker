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
 * 锦标赛赛事信息奖励项
 */
var AwardItemRenderer = (function (_super) {
    __extends(AwardItemRenderer, _super);
    function AwardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.AwardItemRenderer;
        return _this;
    }
    AwardItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.rankLabel.text = this.bindData.rank.toString();
            this.awardDesLabel.text = this.bindData.des;
        }
    };
    return AwardItemRenderer;
}(BaseItemRenderer));
__reflect(AwardItemRenderer.prototype, "AwardItemRenderer");
//# sourceMappingURL=AwardItemRenderer.js.map