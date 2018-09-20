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
 * 新手引导问答答案面板项
*/
var GuideQueItemRenderer = (function (_super) {
    __extends(GuideQueItemRenderer, _super);
    function GuideQueItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GuideQuestionItemRenderer;
        return _this;
    }
    GuideQueItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.answerRadioBtn.selected = false;
        if (this.bindData) {
            var des = CardTypeMatchUtil.getCardDes(this.bindData.id);
            if (des) {
                this.answerRadioBtn.label = des;
                this.answerRadioBtn.value = this.bindData.id;
            }
        }
    };
    return GuideQueItemRenderer;
}(BaseItemRenderer));
__reflect(GuideQueItemRenderer.prototype, "GuideQueItemRenderer");
//# sourceMappingURL=GuideQuestionItemRenderer.js.map