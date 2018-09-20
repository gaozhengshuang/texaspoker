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
 *绑定手机奖励项面板
*/
var BindPhoneAwardItemRenderer = (function (_super) {
    __extends(BindPhoneAwardItemRenderer, _super);
    function BindPhoneAwardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.BindPhoneAwardItemRenderer;
        return _this;
    }
    BindPhoneAwardItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.comIcon.init(this.bindData.id, 120, null, false, true);
            var definition = ItemDefined.GetInstance().getDefinition(this.bindData.id);
            if (definition) {
                this.numDesLabel.text = this.bindData.count.toString();
                this.nameLabel.text = definition.name;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    };
    BindPhoneAwardItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    return BindPhoneAwardItemRenderer;
}(BaseItemRenderer));
__reflect(BindPhoneAwardItemRenderer.prototype, "BindPhoneAwardItemRenderer");
//# sourceMappingURL=BindPhoneAwardItemRenderer.js.map