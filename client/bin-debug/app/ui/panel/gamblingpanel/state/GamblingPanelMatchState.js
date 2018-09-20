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
 * 牌局比赛状态
 */
var GamblingPanelMatchState = (function (_super) {
    __extends(GamblingPanelMatchState, _super);
    function GamblingPanelMatchState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelMatchState.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.createComponent(GamblingMatchComponent, UIComponentSkinName.GamblingMatchComponent, SlotLayerType.Down);
        this.createComponent(GamblingMatchBlindComponent, UIComponentSkinName.GamblingMatchBlindComponent, SlotLayerType.Up);
    };
    GamblingPanelMatchState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.anteGroup.verticalCenter = 110;
        this.context.usualBlindGroup.verticalCenter = 110;
        this.context.potChipsGroup.verticalCenter = -290;
        this.addChild(this.context.chatBtn);
        this.addChild(this.context.buyBtn);
        this.addChild(this.context.currencyGroup);
        this.addChild(this.context.reviewBtn);
        this.addChild(this.context.cardTypeGroup);
        this.addChild(this.context.waitNextImg);
        //
        this.context.tryAddChildActionGroup();
        this.removeChild(this.context.logoBg);
        this.removeChild(this.context.guessCardBtn);
        this.removeChild(this.context.guessCorrectlyGroup);
        this.removeChild(this.context.achieveBtn);
        this.removeChild(this.context.onlineAwardBtn);
        this.removeChild(this.context.cardTypeComp);
    };
    GamblingPanelMatchState.prototype.showElements = function () {
        _super.prototype.showElements.call(this);
        this.context.slotContainerUp.horizontalCenter = this.context.slotContainerUp.verticalCenter = 0;
        this.context.slotContainerDown.horizontalCenter = this.context.slotContainerDown.verticalCenter = 0;
    };
    return GamblingPanelMatchState;
}(BaseGamblingPanelState));
__reflect(GamblingPanelMatchState.prototype, "GamblingPanelMatchState");
//# sourceMappingURL=GamblingPanelMatchState.js.map