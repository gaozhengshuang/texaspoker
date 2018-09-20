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
 * 签到渲染项
*/
var SignInGoldItemRenderer = (function (_super) {
    __extends(SignInGoldItemRenderer, _super);
    function SignInGoldItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.SignInGoldItemRenderer;
        return _this;
    }
    SignInGoldItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            var info = ActivityManager.getActivityInfo(this.bindData.id);
            if (info && info.step < this.bindData.definition.day) {
                this.signInCheck.visible = false;
                this.signInBg.visible = false;
            }
            else {
                this.signInCheck.visible = true;
                this.signInBg.visible = true;
            }
            var awardDef = AwardDefined.GetInstance().getDefinition(this.bindData.definition.awardId);
            if (awardDef && awardDef.rewardList) {
                this.signInGoldLabel.text = ActivityManager.signInHandler.getAwardDes(awardDef);
                var itemDef = ItemDefined.GetInstance().getDefinition(awardDef.rewardList[0].id);
                if (itemDef) {
                    this.prizeImg.source = itemDef.icon + ResSuffixName.PNG;
                }
            }
            this.signInDayLabel.text = "第" + this.bindData.definition.day.toString() + "天";
        }
    };
    return SignInGoldItemRenderer;
}(BaseItemRenderer));
__reflect(SignInGoldItemRenderer.prototype, "SignInGoldItemRenderer");
//# sourceMappingURL=SignInGoldItemRenderer.js.map