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
 * 牌局新手引导玩法状态
 */
var GamblingPanelGuidePlayWayState = (function (_super) {
    __extends(GamblingPanelGuidePlayWayState, _super);
    function GamblingPanelGuidePlayWayState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelGuidePlayWayState.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.createComponent(GamblingGuidePlayWayComponent, UIComponentSkinName.GamblingGuidePlayWayComponent, SlotLayerType.Up);
    };
    GamblingPanelGuidePlayWayState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.anteGroup.verticalCenter = 86;
        this.context.usualBlindGroup.verticalCenter = 86;
        this.context.potChipsGroup.verticalCenter = -350;
        this.addChild(this.context.guessCardBtn);
        this.addChild(this.context.guessCorrectlyGroup);
        this.addChild(this.context.achieveBtn);
        this.addChild(this.context.onlineAwardBtn);
        this.addChild(this.context.logoBg);
        this.addChild(this.context.chatBtn);
        this.addChild(this.context.buyBtn);
        this.addChild(this.context.currencyGroup);
        this.addChild(this.context.ordinaryRoomGroup);
        this.addChild(this.context.reviewBtn);
        this.removeChild(this.context.cardTypeGroup);
        this.removeChild(this.context.waitNextImg);
        this.removeChild(this.context.actionGroup);
        this.removeChild(this.context.cardTypeComp);
    };
    GamblingPanelGuidePlayWayState.prototype.showElements = function () {
        _super.prototype.showElements.call(this);
        this.context.slotContainerDown.horizontalCenter = this.context.slotContainerDown.verticalCenter = 0;
        this.context.slotContainerUp.horizontalCenter = this.context.slotContainerUp.verticalCenter = 0;
    };
    return GamblingPanelGuidePlayWayState;
}(BaseGamblingPanelState));
__reflect(GamblingPanelGuidePlayWayState.prototype, "GamblingPanelGuidePlayWayState");
//# sourceMappingURL=GamblingPanelGuidePlayWayState.js.map