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
 * 高级场对局成就进度信息
 */
var HighPatternProcess = (function (_super) {
    __extends(HighPatternProcess, _super);
    function HighPatternProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HighPatternProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
    };
    HighPatternProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        AchieveProcessManager.onWinOfPlayField(this, AchieveShowPattern.HighPattern);
    };
    HighPatternProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return HighPatternProcess;
}(BaseAchieveProcessInfo));
__reflect(HighPatternProcess.prototype, "HighPatternProcess");
//# sourceMappingURL=HighPatternProcess.js.map