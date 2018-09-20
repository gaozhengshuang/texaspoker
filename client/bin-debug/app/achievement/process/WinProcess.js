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
 * 胜利成就进度信息
 */
var WinProcess = (function (_super) {
    __extends(WinProcess, _super);
    function WinProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WinProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
    };
    WinProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        if (GamblingUtil.isWin(UserManager.userInfo.roleId) && InfoUtil.checkAvailable(GamblingManager.roomInfo) && PlayingFieldManager.isPatternRoom(GamblingManager.roomInfo.definition.type)) {
            this.process++;
        }
    };
    WinProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return WinProcess;
}(BaseAchieveProcessInfo));
__reflect(WinProcess.prototype, "WinProcess");
//# sourceMappingURL=WinProcess.js.map