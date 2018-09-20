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
 * 参加锦标赛进度信息
 */
var JoinMTTProcess = (function (_super) {
    __extends(JoinMTTProcess, _super);
    function JoinMTTProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JoinMTTProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        ChampionshipManager.OnMTTOverPushEvent.addListener(this.onProcessUpdate, this);
    };
    JoinMTTProcess.prototype.onProcessUpdate = function (record) {
        _super.prototype.onProcessUpdate.call(this, record);
        if (record.rank) {
            this.process++;
        }
    };
    JoinMTTProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return JoinMTTProcess;
}(BaseAchieveProcessInfo));
__reflect(JoinMTTProcess.prototype, "JoinMTTProcess");
//# sourceMappingURL=JoinMTTProcess.js.map