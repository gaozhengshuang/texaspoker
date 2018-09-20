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
 *邀请活动分享id项面板
*/
var InviteItemRenderer = (function (_super) {
    __extends(InviteItemRenderer, _super);
    function InviteItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.InviteItemRenderer;
        return _this;
    }
    InviteItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.titleLabel.text = this.bindData.des;
            var itemDef = ItemDefined.GetInstance().getDefinition(this.bindData.rewardId);
            if (itemDef) {
                this.iconImg0.source = this.iconImg1.source = itemDef.icon + ResSuffixName.PNG;
                if (this.bindData.rewardId == ItemFixedId.gold) {
                    this.iconImg0.scaleX = this.iconImg0.scaleY = this.iconImg1.scaleX = this.iconImg1.scaleY = 0.7;
                }
                else {
                    this.iconImg0.scaleX = this.iconImg0.scaleY = this.iconImg1.scaleX = this.iconImg1.scaleY = 1;
                }
            }
            //自己的奖励信息
            this.selfAwardLabel.text = this.bindData.inviterAward.toString();
            //好友的奖励信息
            this.friendAwardLabel.text = this.bindData.inviteesAward.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    };
    InviteItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    return InviteItemRenderer;
}(BaseItemRenderer));
__reflect(InviteItemRenderer.prototype, "InviteItemRenderer");
//# sourceMappingURL=InviteItemRenderer.js.map