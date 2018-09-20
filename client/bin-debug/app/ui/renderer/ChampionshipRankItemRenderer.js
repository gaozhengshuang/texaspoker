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
 * 锦标赛赛事信息排名项
 */
var ChampionshipRankItemRenderer = (function (_super) {
    __extends(ChampionshipRankItemRenderer, _super);
    function ChampionshipRankItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ChampionshipRankItemRenderer;
        return _this;
    }
    ChampionshipRankItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.rankLabel.text = this.bindData.rank.toString();
            if (this.bindData.rank <= 3) {
                this.rankBgImg.visible = true;
                this.rankBgImg.source = ResPrefixName.MTTRankImage + this.bindData.rank + ResSuffixName.PNG;
            }
            else {
                this.rankBgImg.visible = false;
            }
            this.headComponent.init(this.bindData, 50);
            this.nameLabel.text = this.bindData.name;
            this.numLabel.text = qin.MathUtil.formatNum(this.bindData.chips);
            if (this.bindData.roleId == UserManager.userInfo.roleId) {
                if (this.bindData.rank > 3) {
                    this.rankLabel.textColor = ColorEnum.Golden;
                }
                this.nameLabel.textColor = this.numLabel.textColor = ColorEnum.Golden;
            }
            else {
                this.rankLabel.textColor = this.nameLabel.textColor = this.numLabel.textColor = ColorEnum.White;
            }
        }
    };
    return ChampionshipRankItemRenderer;
}(BaseItemRenderer));
__reflect(ChampionshipRankItemRenderer.prototype, "ChampionshipRankItemRenderer");
//# sourceMappingURL=ChampionshipRankItemRenderer.js.map