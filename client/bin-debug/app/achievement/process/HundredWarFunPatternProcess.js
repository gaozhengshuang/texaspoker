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
 * 百人大战欢乐场对局进度信息
 */
var HundredWarFunPatternProcess = (function (_super) {
    __extends(HundredWarFunPatternProcess, _super);
    function HundredWarFunPatternProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HundredWarFunPatternProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        HundredWarManager.onCardPushEvent.addListener(this.onProcessUpdate, this);
    };
    HundredWarFunPatternProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        AchieveProcessManager.onPlayHWField(this, HundredWarType.FunPattern);
    };
    HundredWarFunPatternProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return HundredWarFunPatternProcess;
}(BaseAchieveProcessInfo));
__reflect(HundredWarFunPatternProcess.prototype, "HundredWarFunPatternProcess");
//# sourceMappingURL=HundredWarFunPatternProcess.js.map