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
 * 锦标赛最近赛况折叠项面板
*/
var OutsChildItemRenderer = (function (_super) {
    __extends(OutsChildItemRenderer, _super);
    function OutsChildItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.OutsChildItemRenderer;
        return _this;
    }
    OutsChildItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.rankLabel.text = RankManager.getRankDes(this.bindData.rank, true);
            this.userNameLabel.text = this.bindData.name;
            this.awardLabel.text = this.bindData.award;
        }
    };
    return OutsChildItemRenderer;
}(BaseItemRenderer));
__reflect(OutsChildItemRenderer.prototype, "OutsChildItemRenderer");
//# sourceMappingURL=OutsChildItemRenderer.js.map