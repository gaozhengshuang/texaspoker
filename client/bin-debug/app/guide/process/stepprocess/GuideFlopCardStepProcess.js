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
 * 发牌
 */
var GuideFlopCardStepProcess = (function (_super) {
    __extends(GuideFlopCardStepProcess, _super);
    function GuideFlopCardStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideFlopCardStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        this.flopCard();
    };
    GuideFlopCardStepProcess.prototype.flopCard = function () {
        if (this.definition) {
            if (!GamblingManager.roomInfo.handCard) {
                GamblingManager.roomInfo.handCard = new Array();
            }
            GamblingManager.roomInfo.handCard.length = 0;
            GamblingUtil.cardArr2CardInfoList(this.definition.stepParams["card"], GamblingManager.roomInfo.handCard);
            var cardList = void 0;
            if (GamblingManager.roomInfo.handCard) {
                cardList = GamblingManager.roomInfo.handCard.concat();
            }
            GamblingManager.HandCardComeEvent.dispatch(cardList);
            GuideGamblingProcess.acitionPosChange(this.definition);
        }
        this.complete();
    };
    GuideFlopCardStepProcess.prototype.complete = function () {
        _super.prototype.complete.call(this);
    };
    return GuideFlopCardStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideFlopCardStepProcess.prototype, "GuideFlopCardStepProcess");
//# sourceMappingURL=GuideFlopCardStepProcess.js.map