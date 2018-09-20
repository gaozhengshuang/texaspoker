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
 * 手牌竞猜本周榜单项面板
*/
var GuessWeekItemRenderer = (function (_super) {
    __extends(GuessWeekItemRenderer, _super);
    function GuessWeekItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GuessWeekItemRenderer;
        return _this;
    }
    GuessWeekItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.rankLabel.text = this.bindData.rank.toString();
            this.nameLabel.text = this.bindData.name;
            this.anteLabel.text = this.bindData.ante.toString();
            this.numLabel.text = this.bindData.gold.toString();
        }
    };
    return GuessWeekItemRenderer;
}(BaseItemRenderer));
__reflect(GuessWeekItemRenderer.prototype, "GuessWeekItemRenderer");
//# sourceMappingURL=GuessWeekItemRenderer.js.map