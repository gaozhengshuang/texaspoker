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
 * 百人大战列表项面板
*/
var HundredWarItemRenderer = (function (_super) {
    __extends(HundredWarItemRenderer, _super);
    function HundredWarItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.HundredWarItemRenderer;
        return _this;
    }
    HundredWarItemRenderer.prototype.updateData = function () {
        this.dataChanged();
    };
    HundredWarItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refreshUI();
    };
    HundredWarItemRenderer.prototype.refreshUI = function () {
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.bgImage.source = ResPrefixPathName.Bg + this.bindData.definition.icon + ResSuffixName.PNG;
            this.titleImg.source = this.bindData.definition.titleImg + ResSuffixName.PNG;
            this.poolImg.source = this.bindData.definition.poolImg + ResSuffixName.PNG;
            this.numLabel.text = this.bindData.join + "/" + this.bindData.definition.maxRole;
            this.priceLabel.text = qin.MathUtil.formatNum(this.bindData.definition.minBuyin);
            this.numComp.init("$" + qin.MathUtil.numAddSpace(this.bindData.pool), NumResType.HundredWar2, 2);
            for (var i = 0; i < this.labelGroup.numChildren; i++) {
                var label = this.labelGroup.getChildAt(i);
                if (label) {
                    label.textColor = this.bindData.definition.fontColor;
                }
            }
        }
    };
    HundredWarItemRenderer.prototype.enterRoom = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (InfoUtil.checkAvailable(this.bindData)) {
            //判断金币是否足够
            if (UserManager.userInfo.gold >= this.bindData.definition.minBuyin) {
                HundredWarManager.reqEnterRoom(this.bindData.id);
            }
            else {
                AlertManager.showConfirm("您的金币不足，快去商城补充点金币吧！", JumpUtil.JumpToShopping, null, null, null, null, "前往商城");
            }
        }
    };
    HundredWarItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    return HundredWarItemRenderer;
}(BaseItemRenderer));
__reflect(HundredWarItemRenderer.prototype, "HundredWarItemRenderer");
//# sourceMappingURL=HundredWarItemRenderer.js.map