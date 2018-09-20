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
 * 手牌竞猜开奖信息项面板
*/
var GuessResultItemRenderer = (function (_super) {
    __extends(GuessResultItemRenderer, _super);
    function GuessResultItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GuessResultItemRenderer;
        return _this;
    }
    GuessResultItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            var date = qin.DateTimeUtil.formatTimestamp(this.bindData.time, qin.DateTimeUtil.Format_Standard_NoSecond);
            this.timeLabel.text = date.split(" ")[1];
            this.anteLabel.text = this.bindData.ante.toString();
            this.card1.init(this.bindData.card1);
            this.card1.initElementsShow2();
            this.card2.init(this.bindData.card2);
            this.card2.initElementsShow2();
        }
    };
    return GuessResultItemRenderer;
}(BaseItemRenderer));
__reflect(GuessResultItemRenderer.prototype, "GuessResultItemRenderer");
//# sourceMappingURL=GuessResultItemRenderer.js.map