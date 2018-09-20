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
 * 金币成就进度信息
 */
var GoldProcess = (function (_super) {
    __extends(GoldProcess, _super);
    function GoldProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoldProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        UserManager.propertyChangeEvent.addListener(this.onProcessUpdate, this);
    };
    GoldProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        if (UserManager.userInfo.gold > this.process) {
            _super.prototype.init.call(this, UserManager.userInfo.gold);
        }
    };
    GoldProcess.prototype.destroy = function () {
        UserManager.propertyChangeEvent.removeListener(this.onProcessUpdate, this);
        _super.prototype.destroy.call(this);
    };
    return GoldProcess;
}(BaseAchieveProcessInfo));
__reflect(GoldProcess.prototype, "GoldProcess");
//# sourceMappingURL=GoldProcess.js.map