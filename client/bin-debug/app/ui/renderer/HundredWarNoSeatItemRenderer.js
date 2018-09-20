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
 * 百人大战无座玩家项面板
*/
var HundredWarNoSeatItemRenderer = (function (_super) {
    __extends(HundredWarNoSeatItemRenderer, _super);
    function HundredWarNoSeatItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HundredWarNoSeatItemRenderer;
        return _this;
    }
    HundredWarNoSeatItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    };
    HundredWarNoSeatItemRenderer.prototype.refreshUI = function () {
        if (this.bindData) {
            this.userHeadCom.init(this.bindData, 80);
            this.nameLabel.text = this.bindData.name;
            this.goldNumLabel.text = "$" + qin.MathUtil.formatNum(this.bindData.gold);
        }
    };
    HundredWarNoSeatItemRenderer.prototype.gotoUserInfo = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
    };
    HundredWarNoSeatItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    };
    return HundredWarNoSeatItemRenderer;
}(BaseItemRenderer));
__reflect(HundredWarNoSeatItemRenderer.prototype, "HundredWarNoSeatItemRenderer");
//# sourceMappingURL=HundredWarNoSeatItemRenderer.js.map