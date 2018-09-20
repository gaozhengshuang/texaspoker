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
 * 计时奖励项面板
*/
var TimeAwardItemRenderer = (function (_super) {
    __extends(TimeAwardItemRenderer, _super);
    function TimeAwardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.TimeAwardItemRenderer;
        return _this;
    }
    TimeAwardItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.flagImg.visible = false;
            if (this.bindData.isBring == 1) {
                this.flagImg.visible = true;
                this.numLabel.textColor = ColorEnum.TimeAward_Finish_Yellow;
            }
            this.iconImg.source = this.bindData.icon;
            this.numLabel.text = qin.MathUtil.formatNum(this.bindData.num);
        }
    };
    return TimeAwardItemRenderer;
}(BaseItemRenderer));
__reflect(TimeAwardItemRenderer.prototype, "TimeAwardItemRenderer");
//# sourceMappingURL=TimeAwardItemRenderer.js.map