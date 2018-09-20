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
 * 牌面显示组件
 */
var CardFaceComponent = (function (_super) {
    __extends(CardFaceComponent, _super);
    function CardFaceComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardFaceComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.initMatrix = this.matrix.clone();
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.touchChildren = false;
    };
    CardFaceComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
    };
    CardFaceComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        this.backFace.visible = true;
        this.cardGroup.visible = false;
        this.showMask(false);
        this.showMaxFlag(false);
        if (this.bindData) {
            var numRes = qin.StringConstants.Empty;
            var bigRes = qin.StringConstants.Empty;
            if (this.bindData.card[0] > 2) {
                numRes = ResPrefixName.card + ResPrefixName.FlushBlack + this.bindData.card[1] + ResSuffixName.PNG;
            }
            else {
                numRes = ResPrefixName.card + ResPrefixName.FlushRed + this.bindData.card[1] + ResSuffixName.PNG;
            }
            this.numImg.source = numRes;
            this.flushSmallImg.source = ResPrefixName.Flush + this.bindData.card[0] + ResSuffixName.PNG;
            this.flushBigImg1.visible = false;
            this.flushBigImg.visible = false;
            //大于10，小于A
            if (this.bindData.card[1] > GamblingManager.FlushSplitIndex && this.bindData.card[1] < CardTypeMatchUtil.maxIndex) {
                bigRes = ResPrefixName.card + this.bindData.card[0] + "_" + this.bindData.card[1] + ResSuffixName.PNG;
                this.flushBigImg1.source = bigRes;
                this.flushBigImg1.visible = true;
            }
            else {
                bigRes = ResPrefixName.Flush + this.bindData.card[0] + ResSuffixName.PNG;
                this.flushBigImg.source = bigRes;
                this.flushBigImg.visible = true;
            }
        }
        else {
            this.numImg.source = qin.StringConstants.Empty;
            this.flushBigImg.source = qin.StringConstants.Empty;
            this.flushBigImg1.source = qin.StringConstants.Empty;
            this.flushSmallImg.source = qin.StringConstants.Empty;
        }
    };
    CardFaceComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
    };
    CardFaceComponent.prototype.showMask = function (flag) {
        this.maskImg.visible = flag;
    };
    CardFaceComponent.prototype.showMaxFlag = function (flag) {
        this.maxFlagImg.visible = flag;
    };
    CardFaceComponent.prototype.initElementsShow = function () {
        this.backFace.visible = true;
        this.cardGroup.visible = false;
        this.frontFaceImg.visible = false;
    };
    CardFaceComponent.prototype.initElementsShow2 = function () {
        this.backFace.visible = false;
        this.frontFaceImg.visible = false;
        this.cardGroup.visible = true;
    };
    return CardFaceComponent;
}(BaseComponent));
__reflect(CardFaceComponent.prototype, "CardFaceComponent");
//# sourceMappingURL=CardFaceComponent.js.map