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
 * 创建房间
 */
var GuideCreateRoomStepProcess = (function (_super) {
    __extends(GuideCreateRoomStepProcess, _super);
    function GuideCreateRoomStepProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideCreateRoomStepProcess.prototype.run = function () {
        _super.prototype.run.call(this);
        this.createRoom();
    };
    GuideCreateRoomStepProcess.prototype.createRoom = function () {
        if (this.definition) {
            var roomDef = GuideRoomDefined.GetInstance().getDefinition(this.definition.stepParams.id);
            if (roomDef) {
                GamblingManager.reset();
                GamblingManager.roomInfo = new RoomInfo(roomDef);
                var pInfo = GamblingManager.getPlayerInfoByPos(GuideGamblingProcess.self);
                pInfo.roleId = UserManager.userInfo.roleId;
                pInfo.userInfo.head = UserManager.userInfo.head;
                pInfo.userInfo.sex = UserManager.userInfo.sex;
                pInfo.userInfo.name = UserManager.userInfo.name;
                for (var _i = 0, _a = GamblingManager.roomInfo.playerList; _i < _a.length; _i++) {
                    var childInfo = _a[_i];
                    if (childInfo.pos != GuideGamblingProcess.self) {
                        childInfo.userInfo.head = SheetSubName.getdefaultHead(childInfo.userInfo.sex);
                    }
                }
                SceneManager.onSwitchCompleteEvent.addListener(this.onSwitchSceneComplete, this);
                SceneManager.switcScene(SceneType.Game);
            }
            else {
                qin.Console.logError("新手引导创建房间数据异常！引导房间ID：" + this.definition.stepParams.id);
            }
        }
    };
    GuideCreateRoomStepProcess.prototype.onSwitchSceneComplete = function (data) {
        GuideGamblingProcess.nextRoundStart();
        this.complete();
    };
    GuideCreateRoomStepProcess.prototype.complete = function () {
        _super.prototype.complete.call(this);
    };
    GuideCreateRoomStepProcess.prototype.clear = function () {
        _super.prototype.clear.call(this);
        SceneManager.onSwitchCompleteEvent.removeListener(this.onSwitchSceneComplete, this);
    };
    return GuideCreateRoomStepProcess;
}(BaseGuideStepProcess));
__reflect(GuideCreateRoomStepProcess.prototype, "GuideCreateRoomStepProcess");
//# sourceMappingURL=GuideCreateRoomStepProcess.js.map