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
 * 升级任务进度信息
 */
var LevelUpProcess = (function (_super) {
    __extends(LevelUpProcess, _super);
    function LevelUpProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelUpProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    };
    LevelUpProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        if (UserManager.userInfo.level > this.process) {
            this.process = UserManager.userInfo.level;
        }
    };
    LevelUpProcess.prototype.destroy = function () {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        _super.prototype.destroy.call(this);
    };
    return LevelUpProcess;
}(BaseAchieveProcessInfo));
__reflect(LevelUpProcess.prototype, "LevelUpProcess");
//# sourceMappingURL=LevelUpProcess.js.map