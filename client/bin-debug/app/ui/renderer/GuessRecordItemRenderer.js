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
 * 手牌竞猜购买记录项面板
*/
var GuessRecordItemRenderer = (function (_super) {
    __extends(GuessRecordItemRenderer, _super);
    function GuessRecordItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GuessRecordItemRenderer;
        return _this;
    }
    GuessRecordItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            var date = qin.DateTimeUtil.formatTimestamp(this.bindData.time, qin.DateTimeUtil.Format_Standard_NoSecond);
            this.timeLabel.text = date.split(" ")[1];
            this.recordLabel.text = this.bindData.record;
            this.anteLabel.text = this.bindData.ante.toString();
            this.goldLabel.text = this.bindData.gold.toString();
            this.card1.init(this.bindData.card1);
            this.card1.initElementsShow2();
            this.card2.init(this.bindData.card2);
            this.card2.initElementsShow2();
        }
    };
    return GuessRecordItemRenderer;
}(BaseItemRenderer));
__reflect(GuessRecordItemRenderer.prototype, "GuessRecordItemRenderer");
//# sourceMappingURL=GuessRecordItemRenderer.js.map