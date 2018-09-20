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
 * 百人大战牌局结果组件
 */
var HWCardsComponent = (function (_super) {
    __extends(HWCardsComponent, _super);
    function HWCardsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWCardsComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._pointList = new Array();
        for (var i = 0; i < 5; i++) {
            this._pointList.push(new egret.Point(45 + i * 15, 50));
        }
        this.cardsGroup.touchChildren = this.cardsGroup.touchEnabled = false;
    };
    /**
     * 默认初始化
     */
    HWCardsComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        if (data) {
            this.showFront(data);
        }
        else {
            this.showReverse();
        }
    };
    HWCardsComponent.prototype.waitNext = function () {
    };
    HWCardsComponent.prototype.dealCards = function (thisObj, cardList, pos, wait, flag) {
        thisObj.cardsAnim.createCardGroup(cardList, thisObj.potGroup, pos, wait, flag);
    };
    /**
     * 隐藏
    */
    HWCardsComponent.prototype.showReverse = function () {
        this.reset();
    };
    /**
     * 显示牌型和赔率
     */
    HWCardsComponent.prototype.showFront = function (data, pos) {
        if (data) {
            if (data.cardTypeDes) {
                this.cardTypeBg.visible = true;
                this.typeImg.source = data.cardTypeDes;
            }
            if (HundredWarManager.getBetPotResultByPos(pos)) {
                this.resultDesLabel.textColor = ColorEnum.Yellow;
                ;
            }
            else {
                if (data.cardType == CardType.RoyalFlush || data.cardType == CardType.StraightFlush || data.cardType == CardType.FourOfAKind) {
                    this.resultDesLabel.textColor = ColorEnum.Yellow;
                    ;
                }
                else {
                    this.resultDesLabel.textColor = ColorEnum.White;
                }
            }
            this.resultDesLabel.text = data.resultDes;
        }
    };
    /**
     * 重置
    */
    HWCardsComponent.prototype.reset = function () {
        this.resultDesLabel.text = "";
        this.typeImg.source = "";
        this.cardTypeBg.visible = false;
    };
    return HWCardsComponent;
}(BaseComponent));
__reflect(HWCardsComponent.prototype, "HWCardsComponent");
//# sourceMappingURL=HWCardsComponent.js.map