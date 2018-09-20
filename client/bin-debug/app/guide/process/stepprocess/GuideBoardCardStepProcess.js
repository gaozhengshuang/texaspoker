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
 * 公共牌步骤处理器
 */
var GuideBoardCardStepProcess = (function (_super) {
    __extends(GuideBoardCardStepProcess, _super);
    function GuideBoardCardStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideBoardCardStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        if (this.definition) {
            GuideGamblingProcess.oneLoopOver(this.definition); //一轮圈注结束
            var pInfo = void 0;
            for (var i = 0; i < GamblingManager.roomInfo.playerList.length; i++) {
                pInfo = GamblingManager.roomInfo.playerList[i];
                GuideGamblingProcess.playerStateChange(pInfo.pos, PlayerState.WaitAction, 0);
            }
            //位置变更
            GuideGamblingProcess.acitionPosChange(this.definition);
        }
        this.complete();
    };
    GuideBoardCardStepProcess.prototype.complete = function () {
        _super.prototype.complete.call(this);
    };
    return GuideBoardCardStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideBoardCardStepProcess.prototype, "GuideBoardCardStepProcess");
//# sourceMappingURL=GuideBoardCardStepProcess.js.map