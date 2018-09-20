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
 * 邀请活动领取金币渲染项
 */
var InviteGoldItemRenderer = (function (_super) {
    __extends(InviteGoldItemRenderer, _super);
    function InviteGoldItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.InviteGoldItemRenderer;
        return _this;
    }
    InviteGoldItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.bindData) {
            var date = new Date(this.bindData.time * 1000);
            this.timeLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
            this.nameLabel.text = this.bindData.name;
            this.payNumLabel.text = qin.MathUtil.formatNum(this.bindData.gold);
            this.getNumLabel.text = qin.MathUtil.formatNum(this.bindData.gold * 0.1);
        }
    };
    InviteGoldItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    return InviteGoldItemRenderer;
}(BaseItemRenderer));
__reflect(InviteGoldItemRenderer.prototype, "InviteGoldItemRenderer");
//# sourceMappingURL=InviteGoldItemRenderer.js.map