var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 监听特定类型的进度组
 */
var AchieveProcessInfoList = (function () {
    function AchieveProcessInfoList(type) {
        this.list = new Array();
        this.type = type;
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    }
    AchieveProcessInfoList.prototype.onProcessUpdate = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var processInfo = _a[_i];
            processInfo.onProcessUpdate();
        }
    };
    AchieveProcessInfoList.prototype.clear = function () {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
    };
    return AchieveProcessInfoList;
}());
__reflect(AchieveProcessInfoList.prototype, "AchieveProcessInfoList");
//# sourceMappingURL=AchieveProcessInfoList.js.map