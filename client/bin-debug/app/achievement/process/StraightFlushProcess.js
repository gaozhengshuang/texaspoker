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
 * 同花顺成就进度信息
 */
var StraightFlushProcess = (function (_super) {
    __extends(StraightFlushProcess, _super);
    function StraightFlushProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StraightFlushProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
    };
    StraightFlushProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        AchieveProcessManager.onWinOfCardType(this, CardType.StraightFlush);
    };
    StraightFlushProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return StraightFlushProcess;
}(BaseAchieveProcessInfo));
__reflect(StraightFlushProcess.prototype, "StraightFlushProcess");
//# sourceMappingURL=StraightFlushProcess.js.map