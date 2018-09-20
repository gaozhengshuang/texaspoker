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
 * 引导房间行为处理器
 */
var GuideRoomActionStepProcess = (function (_super) {
    __extends(GuideRoomActionStepProcess, _super);
    function GuideRoomActionStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideRoomActionStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        if (this.definition.stepParams.cd > 0) {
            qin.Tick.AddTimeoutInvoke(this.cdOper, this.definition.stepParams.cd, this);
        }
        else {
            this.cdOper();
        }
    };
    GuideRoomActionStepProcess.prototype.cdOper = function () {
        qin.Tick.RemoveTimeoutInvoke(this.cdOper, this);
        if (this.definition) {
            //底池筹码变更
            GuideGamblingProcess.chipsChange(this.definition.target, this.definition);
            //状态变更
            GuideGamblingProcess.playerStateChange(this.definition.target, this.definition.stepParams.state, this.definition.stepParams.num);
            //位置变更
            GuideGamblingProcess.acitionPosChange(this.definition);
        }
        this.complete();
    };
    GuideRoomActionStepProcess.prototype.complete = function () {
        _super.prototype.complete.call(this);
    };
    GuideRoomActionStepProcess.prototype.clear = function () {
        _super.prototype.clear.call(this);
        qin.Tick.RemoveTimeoutInvoke(this.cdOper, this);
    };
    return GuideRoomActionStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideRoomActionStepProcess.prototype, "GuideRoomActionStepProcess");
//# sourceMappingURL=GuideRoomActionStepProcess.js.map