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
 * 牌局新手引导状态
 */
var GamblingPanelGuideState = (function (_super) {
    __extends(GamblingPanelGuideState, _super);
    function GamblingPanelGuideState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelGuideState.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.createComponent(GamblingGuideComponent, UIComponentSkinName.GamblingGuideComponent, SlotLayerType.Up);
    };
    GamblingPanelGuideState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.anteGroup.verticalCenter = 86;
        this.context.usualBlindGroup.verticalCenter = 86;
        this.context.potChipsGroup.verticalCenter = -290;
        this.addChild(this.context.logoBg);
        this.addChild(this.context.currencyGroup);
        this.addChild(this.context.ordinaryRoomGroup);
        //
        this.addChild(this.context.actionGroup);
        this.context.tryAddChildActionGroup();
        this.removeChild(this.context.guessCardBtn);
        this.removeChild(this.context.guessCorrectlyGroup);
        this.removeChild(this.context.achieveBtn);
        this.removeChild(this.context.onlineAwardBtn);
        this.removeChild(this.context.chatBtn);
        this.removeChild(this.context.buyBtn);
        this.removeChild(this.context.reviewBtn);
        this.removeChild(this.context.cardTypeComp);
        this.removeChild(this.context.cardTypeGroup);
        this.removeChild(this.context.waitNextImg);
        this.removeChild(this.context.actionGroup.preActionGroup);
    };
    GamblingPanelGuideState.prototype.showElements = function () {
        _super.prototype.showElements.call(this);
        this.context.slotContainerDown.horizontalCenter = 0;
        this.context.slotContainerDown.top = 0;
        this.context.slotContainerUp.horizontalCenter = 0;
        this.context.slotContainerUp.top = 0;
    };
    return GamblingPanelGuideState;
}(BaseGamblingPanelState));
__reflect(GamblingPanelGuideState.prototype, "GamblingPanelGuideState");
//# sourceMappingURL=GamblingPanelGuideState.js.map