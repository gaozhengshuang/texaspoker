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
 * 德州转转转排行榜渲染项
 */
var ShimTaeYoonRankItemRenderer = (function (_super) {
    __extends(ShimTaeYoonRankItemRenderer, _super);
    function ShimTaeYoonRankItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ShimTaeYoonRankItemRenderer;
        return _this;
    }
    ShimTaeYoonRankItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    };
    ShimTaeYoonRankItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
            this.head.init(this.bindData, 50);
            if (this.bindData.rank <= 3) {
                this.rankImg.visible = true;
                this.rankLabel.visible = false;
                this.rankImg.source = ResPrefixName.LaBaRankImage + this.bindData.rank + ResSuffixName.PNG;
            }
            else {
                this.rankImg.visible = false;
                this.rankLabel.visible = true;
                this.rankLabel.text = this.bindData.rank.toString();
            }
            this.nameLabel.text = this.bindData.name;
            this.numLabel.text = qin.MathUtil.formatNum(this.bindData.score);
        }
    };
    ShimTaeYoonRankItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    return ShimTaeYoonRankItemRenderer;
}(BaseItemRenderer));
__reflect(ShimTaeYoonRankItemRenderer.prototype, "ShimTaeYoonRankItemRenderer");
//# sourceMappingURL=ShimTaeYoonRankItemRenderer.js.map