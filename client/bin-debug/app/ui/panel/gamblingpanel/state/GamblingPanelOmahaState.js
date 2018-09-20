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
 * 牌局奥马哈状态
 */
var GamblingPanelOmahaState = (function (_super) {
    __extends(GamblingPanelOmahaState, _super);
    function GamblingPanelOmahaState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelOmahaState.prototype.initialize = function () {
        var len = this.supportList.length;
        var spt;
        for (var i = 0; i < len; i++) {
            spt = this.supportList[i];
            spt.initialize();
            if (this.context.panelData && spt instanceof GamblingPanelMoveSupport) {
                spt.toRight(false);
            }
        }
        this.context.logoBg.source = SheetSubName.Gambling_Bg_Omaha;
    };
    GamblingPanelOmahaState.prototype.run = function () {
        _super.prototype.run.call(this);
        this.context.anteGroup.verticalCenter = 86;
        this.context.usualBlindGroup.verticalCenter = 86;
        this.context.potChipsGroup.verticalCenter = -290;
        this.removeChild(this.context.guessCardBtn);
        this.removeChild(this.context.guessCorrectlyGroup);
        this.removeChild(this.context.onlineAwardBtn);
        this.removeChild(this.context.reviewBtn);
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.definition.type == PlayingFieldType.OmahaPersonal) {
            this.removeChild(this.context.achieveBtn);
        }
        else {
            this.addChild(this.context.achieveBtn);
        }
        this.addChild(this.context.logoBg);
        this.addChild(this.context.chatBtn);
        this.addChild(this.context.buyBtn);
        this.addChild(this.context.currencyGroup);
        this.addChild(this.context.ordinaryRoomGroup);
        this.addChild(this.context.cardTypeGroup);
        this.addChild(this.context.waitNextImg);
        this.addChild(this.context.cardTypeComp);
        //
        this.context.tryAddChildActionGroup();
    };
    return GamblingPanelOmahaState;
}(BaseGamblingPanelState));
__reflect(GamblingPanelOmahaState.prototype, "GamblingPanelOmahaState");
//# sourceMappingURL=GamblingPanelOmahaState.js.map