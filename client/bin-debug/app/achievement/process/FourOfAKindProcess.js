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
 * 四条成就进度信息
 */
var FourOfAKindProcess = (function (_super) {
    __extends(FourOfAKindProcess, _super);
    function FourOfAKindProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FourOfAKindProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
    };
    FourOfAKindProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        AchieveProcessManager.onWinOfCardType(this, CardType.FourOfAKind);
    };
    FourOfAKindProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return FourOfAKindProcess;
}(BaseAchieveProcessInfo));
__reflect(FourOfAKindProcess.prototype, "FourOfAKindProcess");
//# sourceMappingURL=FourOfAKindProcess.js.map