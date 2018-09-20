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
 * 引导牌局结束处理
 */
var GuideGamblingOverStepProcess = (function (_super) {
    __extends(GuideGamblingOverStepProcess, _super);
    function GuideGamblingOverStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideGamblingOverStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        this.oneRoundOver();
    };
    /**
    * 推送一局结束
    */
    GuideGamblingOverStepProcess.prototype.oneRoundOver = function () {
        if (this.definition) {
            if (!GamblingManager.roundOverInfo) {
                GamblingManager.roundOverInfo = new RoundOverInfo();
            }
            var handCard = void 0;
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.handCard) {
                handCard = GamblingManager.roomInfo.handCard.concat();
            }
            GamblingManager.roundOverClear();
            GamblingManager.roundOverInfo.copyValueFrom(this.definition.stepParams);
            for (var _i = 0, _a = GamblingManager.roundOverInfo.potList; _i < _a.length; _i++) {
                var potInfo = _a[_i];
                for (var i = 0; i < potInfo.roleId.length; i++) {
                    if (potInfo.roleId[i] == GuideGamblingProcess.self) {
                        potInfo.roleId[i] = UserManager.userInfo.roleId; //引导奖励给自己
                        break;
                    }
                }
            }
            for (var _b = 0, _c = GamblingManager.roundOverInfo.handCardList; _b < _c.length; _b++) {
                var cardInfo = _c[_b];
                if (cardInfo.roleId == GuideGamblingProcess.self) {
                    cardInfo.roleId = UserManager.userInfo.roleId;
                    break;
                }
            }
            GamblingManager.RoundOverEvent.dispatch({ initbankRoll: 0, handCard: handCard });
            this.complete();
        }
    };
    GuideGamblingOverStepProcess.prototype.complete = function () {
        _super.prototype.complete.call(this);
    };
    return GuideGamblingOverStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideGamblingOverStepProcess.prototype, "GuideGamblingOverStepProcess");
//# sourceMappingURL=GuideGamblingOverStepProcess.js.map