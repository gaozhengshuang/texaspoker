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
 * 欢乐豪礼排行项
*/
var HappyGiftRankRenderer = (function (_super) {
    __extends(HappyGiftRankRenderer, _super);
    function HappyGiftRankRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HappyGiftRankRenderer;
        return _this;
    }
    HappyGiftRankRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.refreshUI();
    };
    HappyGiftRankRenderer.prototype.refreshUI = function () {
        if (this.bindData) {
            this.rankLabel.text = this.bindData.rank.toString();
            this.head.init(this.bindData, 40);
            this.userNameLabel.text = this.bindData.name;
            this.goldLabel.text = qin.MathUtil.numAddSpace(this.bindData.score);
            this.setColor();
        }
    };
    HappyGiftRankRenderer.prototype.setColor = function () {
        if (this.bindData.roleId == UserManager.userInfo.roleId) {
            this.rankLabel.textColor = ColorEnum.Golden;
            this.userNameLabel.textColor = ColorEnum.Golden;
            this.goldLabel.textColor = ColorEnum.Golden;
        }
        else {
            this.rankLabel.textColor = ColorEnum.White;
            this.userNameLabel.textColor = ColorEnum.White;
            this.goldLabel.textColor = ColorEnum.White;
        }
    };
    return HappyGiftRankRenderer;
}(BaseItemRenderer));
__reflect(HappyGiftRankRenderer.prototype, "HappyGiftRankRenderer");
//# sourceMappingURL=HappyGiftRankRenderer.js.map