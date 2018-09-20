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
 * 葫芦成就进度信息
 */
var FullhouseProcess = (function (_super) {
    __extends(FullhouseProcess, _super);
    function FullhouseProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullhouseProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
    };
    FullhouseProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        AchieveProcessManager.onWinOfCardType(this, CardType.Fullhouse);
    };
    FullhouseProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return FullhouseProcess;
}(BaseAchieveProcessInfo));
__reflect(FullhouseProcess.prototype, "FullhouseProcess");
//# sourceMappingURL=FullhouseProcess.js.map