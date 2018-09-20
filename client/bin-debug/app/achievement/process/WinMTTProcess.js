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
 * 赢得锦标赛冠军进度信息
 */
var WinMTTProcess = (function (_super) {
    __extends(WinMTTProcess, _super);
    function WinMTTProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WinMTTProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        ChampionshipManager.OnMTTOverPushEvent.addListener(this.onProcessUpdate, this);
    };
    WinMTTProcess.prototype.onProcessUpdate = function (record) {
        _super.prototype.onProcessUpdate.call(this, record);
        if (record.rank && record.rank == 1) {
            this.process++;
        }
    };
    WinMTTProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return WinMTTProcess;
}(BaseAchieveProcessInfo));
__reflect(WinMTTProcess.prototype, "WinMTTProcess");
//# sourceMappingURL=WinMTTProcess.js.map