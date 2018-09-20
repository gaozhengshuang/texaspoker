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
 * 锦标赛赛事信息盲注项
 */
var BlindItemRenderer = (function (_super) {
    __extends(BlindItemRenderer, _super);
    function BlindItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.BlindItemRenderer;
        return _this;
    }
    BlindItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.rebuyImg.visible = this.addonImg.visible = false;
            this.rankLabel.text = this.bindData.level.toString();
            this.blindLabel.text = qin.MathUtil.formatNum(this.bindData.sBlind) + "/" + qin.MathUtil.formatNum(this.bindData.bBlind);
            if (ChampionshipManager.nowBlindRank && this.bindData.level == ChampionshipManager.nowBlindRank) {
                this.rankLabel.textColor = ColorEnum.Golden;
                this.blindLabel.textColor = ColorEnum.Golden;
                this.anteLabel.textColor = ColorEnum.Golden;
                this.timeLabel.textColor = ColorEnum.Golden;
                ChampionshipManager.nowBlindItem = this;
            }
            else {
                this.rankLabel.textColor = ColorEnum.White;
                this.blindLabel.textColor = ColorEnum.White;
                this.anteLabel.textColor = ColorEnum.White;
                this.timeLabel.textColor = ColorEnum.White;
            }
            if (!this.bindData.preBet) {
                this.anteLabel.text = "0";
            }
            else {
                this.anteLabel.text = qin.MathUtil.formatNum(this.bindData.preBet);
            }
            this.timeLabel.text = this.bindData.upTime + "秒";
            if (this.bindData.addon) {
                this.addonImg.visible = true;
            }
            if (this.bindData.rebuy) {
                this.rebuyImg.visible = true;
            }
        }
    };
    return BlindItemRenderer;
}(BaseItemRenderer));
__reflect(BlindItemRenderer.prototype, "BlindItemRenderer");
//# sourceMappingURL=BlindItemRenderer.js.map