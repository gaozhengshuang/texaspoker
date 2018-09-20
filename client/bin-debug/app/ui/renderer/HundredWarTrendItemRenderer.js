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
 * 百人大战胜负走势项
*/
var HundredWarTrendItemRenderer = (function (_super) {
    __extends(HundredWarTrendItemRenderer, _super);
    function HundredWarTrendItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HundredWarTrendItemRenderer;
        return _this;
    }
    HundredWarTrendItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.refreshUI();
    };
    HundredWarTrendItemRenderer.prototype.refreshUI = function () {
        if (this.bindData) {
            for (var i = 0; i < this.bindData.length; i++) {
                this.setState(i, this.bindData[i]);
            }
            this.setNew();
        }
    };
    HundredWarTrendItemRenderer.prototype.setNew = function () {
        if (HundredWarManager.panelHandler.HundredWarTrendList.indexOf(this.bindData) == 0) {
            this.newLabel.visible = true;
        }
        else {
            this.newLabel.visible = false;
        }
    };
    HundredWarTrendItemRenderer.prototype.setState = function (index, isWin) {
        if (isWin == 1) {
            this["text" + index].text = "胜";
            this["bg" + index].source = SheetSubName.HundredWarTrend_Win;
        }
        if (isWin == 0) {
            this["text" + index].text = "负";
            this["bg" + index].source = SheetSubName.HundredWarTrend_Lose;
        }
        if (isWin == 2) {
            this["text" + index].text = "平";
            this["bg" + index].source = SheetSubName.HundredWarTrend_Tie;
        }
    };
    return HundredWarTrendItemRenderer;
}(BaseItemRenderer));
__reflect(HundredWarTrendItemRenderer.prototype, "HundredWarTrendItemRenderer");
//# sourceMappingURL=HundredWarTrendItemRenderer.js.map