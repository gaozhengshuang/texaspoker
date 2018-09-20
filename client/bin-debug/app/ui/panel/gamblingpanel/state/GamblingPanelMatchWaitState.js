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
 * 牌局比赛赛等待状态
 */
var GamblingPanelMatchWaitState = (function (_super) {
    __extends(GamblingPanelMatchWaitState, _super);
    function GamblingPanelMatchWaitState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelMatchWaitState.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.createComponent(GamblingMatchWaitComponent, UIComponentSkinName.GamblingMatchWaitComponent, SlotLayerType.Down);
    };
    GamblingPanelMatchWaitState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.anteGroup.verticalCenter = 110;
        this.context.usualBlindGroup.verticalCenter = 110;
        this.context.potChipsGroup.verticalCenter = -290;
        this.context.sptCreater.championshipWaitSpt.setWaitInfo();
        this.removeChild(this.context.cardTypeGroup);
        this.removeChild(this.context.waitNextImg);
        this.removeChild(this.context.chatBtn);
        this.removeChild(this.context.buyBtn);
        this.removeChild(this.context.currencyGroup);
        this.removeChild(this.context.logoBg);
        this.removeChild(this.context.guessCardBtn);
        this.removeChild(this.context.guessCorrectlyGroup);
        this.removeChild(this.context.achieveBtn);
        this.removeChild(this.context.onlineAwardBtn);
        this.removeChild(this.context.reviewBtn);
        this.removeChild(this.context.cardTypeComp);
    };
    GamblingPanelMatchWaitState.prototype.showElements = function () {
        _super.prototype.showElements.call(this);
        this.context.slotContainerUp.horizontalCenter = this.context.slotContainerUp.verticalCenter = 0;
        this.context.slotContainerDown.horizontalCenter = this.context.slotContainerDown.verticalCenter = 0;
    };
    return GamblingPanelMatchWaitState;
}(BaseGamblingPanelState));
__reflect(GamblingPanelMatchWaitState.prototype, "GamblingPanelMatchWaitState");
//# sourceMappingURL=GamblingPanelMatchWaitState.js.map