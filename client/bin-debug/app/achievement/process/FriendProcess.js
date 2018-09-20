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
 * 好友成就进度信息
 */
var FriendProcess = (function (_super) {
    __extends(FriendProcess, _super);
    function FriendProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendProcess.prototype.init = function (process) {
        _super.prototype.init.call(this, process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    };
    FriendProcess.prototype.onProcessUpdate = function () {
        _super.prototype.onProcessUpdate.call(this);
        if (FriendManager.friendList && FriendManager.friendList.length > this.process) {
            _super.prototype.init.call(this, UserManager.userInfo.friendNum);
        }
    };
    FriendProcess.prototype.destroy = function () {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        _super.prototype.destroy.call(this);
    };
    return FriendProcess;
}(BaseAchieveProcessInfo));
__reflect(FriendProcess.prototype, "FriendProcess");
//# sourceMappingURL=FriendProcess.js.map