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
 * 百人大战奖池中奖列表项
*/
var HundredWarPoolPrizeItemRenderer = (function (_super) {
    __extends(HundredWarPoolPrizeItemRenderer, _super);
    function HundredWarPoolPrizeItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HundredWarPoolPrizeItemRenderer;
        return _this;
    }
    HundredWarPoolPrizeItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    };
    HundredWarPoolPrizeItemRenderer.prototype.refreshUI = function () {
        if (this.bindData) {
            var rank = HundredWarManager.panelHandler.lastPoolInfo.prizeList.indexOf(this.bindData) + 1;
            if (rank < 4) {
                this.rankBgImg.visible = true;
                this.rankBgImg.source = ResPrefixName.MTTRankImage + rank + ResSuffixName.PNG;
            }
            else {
                this.rankBgImg.visible = true;
            }
            this.rankLabel.text = rank.toString();
            this.userHeadCom.init(this.bindData, 60);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = "$" + qin.MathUtil.formatNum(this.bindData.gold);
        }
    };
    HundredWarPoolPrizeItemRenderer.prototype.gotoUserInfo = function () {
        if (!HundredWarManager.isSysBanker(this.bindData.roleId)) {
            UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
        }
    };
    HundredWarPoolPrizeItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    };
    return HundredWarPoolPrizeItemRenderer;
}(BaseItemRenderer));
__reflect(HundredWarPoolPrizeItemRenderer.prototype, "HundredWarPoolPrizeItemRenderer");
//# sourceMappingURL=HundredWarPoolPrizeItemRenderer.js.map