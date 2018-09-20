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
 * 奥马哈牌型按钮组件
 */
var OmahaCardTypeBtnComponent = (function (_super) {
    __extends(OmahaCardTypeBtnComponent, _super);
    function OmahaCardTypeBtnComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OmahaCardTypeBtnComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        this.refresh(this.bindData);
    };
    OmahaCardTypeBtnComponent.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.refresh(this.bindData);
    };
    OmahaCardTypeBtnComponent.prototype.onEnable = function (event) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    OmahaCardTypeBtnComponent.prototype.onDisable = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    OmahaCardTypeBtnComponent.prototype.refresh = function (cardType) {
        if (this.bindData && this.bindData != 0) {
            this.typeNumGroup.visible = true;
            this.cardTypeLabel.visible = true;
            this.cardTypeLabel.text = CardTypeMatchUtil.getCardDes(this.bindData);
            this.typeNumLabel.text = this.bindData.toString();
        }
        else {
            this.typeNumGroup.visible = false;
            this.cardTypeLabel.visible = false;
        }
    };
    OmahaCardTypeBtnComponent.prototype.onTap = function (event) {
        if (GamblingManager.isInSeat && GamblingManager.roomInfo && GamblingManager.roomInfo.publicCard && GamblingManager.roomInfo.publicCard.length > 0) {
            JumpUtil.JumpToOmahaCardTypePanel(CardTypeMatchUtil.cardType);
        }
        else {
            JumpUtil.JumpToOmahaCardTypePanel(CardType.None);
        }
    };
    return OmahaCardTypeBtnComponent;
}(BaseComponent));
__reflect(OmahaCardTypeBtnComponent.prototype, "OmahaCardTypeBtnComponent");
//# sourceMappingURL=OmahaCardTypeBtnComponent.js.map