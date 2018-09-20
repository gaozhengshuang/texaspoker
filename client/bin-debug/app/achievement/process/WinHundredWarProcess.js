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
 * 赢得百人大战进度信息
 */
var WinHundredWarProcess = (function (_super) {
    __extends(WinHundredWarProcess, _super);
    function WinHundredWarProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WinHundredWarProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        HundredWarManager.onCardPushEvent.addListener(this.onProcessUpdate, this);
    };
    WinHundredWarProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        if (HundredWarManager.hundredWarOverInfo.isWin) {
            this.process++;
        }
    };
    WinHundredWarProcess.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return WinHundredWarProcess;
}(BaseAchieveProcessInfo));
__reflect(WinHundredWarProcess.prototype, "WinHundredWarProcess");
//# sourceMappingURL=WinHundredWarProcess.js.map