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
 * 中级场对局成就进度信息
 */
var MiddlePatternProcess = (function (_super) {
    __extends(MiddlePatternProcess, _super);
    function MiddlePatternProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiddlePatternProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
    };
    MiddlePatternProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        AchieveProcessManager.onWinOfPlayField(this, AchieveShowPattern.MiddlePattern);
    };
    MiddlePatternProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return MiddlePatternProcess;
}(BaseAchieveProcessInfo));
__reflect(MiddlePatternProcess.prototype, "MiddlePatternProcess");
//# sourceMappingURL=MiddlePatternProcess.js.map