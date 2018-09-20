var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 进入锦标赛
 */
var EnterMttHandler = (function () {
    function EnterMttHandler() {
    }
    EnterMttHandler.prototype.onEnable = function () {
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
        GamblingManager.LeaveRoomEvent.addListener(this.onLeaveRoomHandler, this);
        GamblingManager.LeaveRoomErrorEvent.addListener(this.onLeaveRoomErrorHandler, this);
        HundredWarManager.onLeaveEvent.addListener(this.hundredWarLeaveHandler, this);
    };
    EnterMttHandler.prototype.onDisable = function () {
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
        GamblingManager.LeaveRoomEvent.removeListener(this.onLeaveRoomHandler, this);
        GamblingManager.LeaveRoomErrorEvent.removeListener(this.onLeaveRoomErrorHandler, this);
        HundredWarManager.onLeaveEvent.removeListener(this.hundredWarLeaveHandler, this);
    };
    /**
     * 立即进入
     */
    EnterMttHandler.prototype.enterMatch = function (info, panelName) {
        this.onEnable();
        this._uiPanelName = panelName;
        this._info = info;
        if (this._info) {
            var roomId = this._info.roomId;
            if (roomId > 0) {
                GamblingManager.reqEnterRoom(roomId);
                qin.Console.log("进入比赛房间enterMatch" + roomId);
            }
            else {
                if (SceneManager.sceneType == SceneType.HundredWar) {
                    HundredWarManager.reqLeave();
                }
                else if (SceneManager.sceneType == SceneType.Hall) {
                    this.jumpToGame();
                }
                else {
                    if (GamblingManager.roomInfo) {
                        GamblingManager.reqLeaveRoom(true);
                    }
                    else {
                        this.switchGameSceneInRoom();
                        this.closePanel();
                    }
                }
            }
        }
    };
    EnterMttHandler.prototype.hundredWarLeaveHandler = function () {
        this.jumpToGame();
    };
    EnterMttHandler.prototype.jumpToGame = function () {
        this._info.cloneTo(GamblingManager.matchRoomInfo);
        SceneManager.switcScene(SceneType.Game);
        this.closePanel();
    };
    /**
     * 直接进入房间
     */
    EnterMttHandler.prototype.onGetRoomInfoHandler = function () {
        if (SceneManager.sceneType != SceneType.Game) {
            SceneManager.switcScene(SceneType.Game);
        }
        else {
            this.switchGameSceneInRoom();
        }
        this.closePanel();
    };
    /**
     * 锦标赛离开房间，进入另外一个锦标赛房间
     */
    EnterMttHandler.prototype.onLeaveRoomHandler = function (data) {
        if (data.isInMtt) {
            this.switchGameSceneInRoom();
            this.closePanel();
        }
    };
    /**
     * 锦标赛离开房间，进入另外一个锦标赛房间(发生error的情况下也处理)
     */
    EnterMttHandler.prototype.onLeaveRoomErrorHandler = function (data) {
        if (this._info && data.isInMtt) {
            this.switchGameSceneInRoom();
            this.closePanel();
        }
    };
    /**
     * 房间中切换不同的比赛房间
     */
    EnterMttHandler.prototype.switchGameSceneInRoom = function () {
        this._info.cloneTo(GamblingManager.matchRoomInfo);
        if (!this._gamblingPanel) {
            this._gamblingPanel = UIManager.getPanel(UIModuleName.GamblingPanel);
        }
        if (this._gamblingPanel) {
            this._gamblingPanel.switchToGameSceneInRoom();
        }
        else {
            UIManager.showPanel(UIModuleName.GamblingPanel);
        }
    };
    EnterMttHandler.prototype.closePanel = function () {
        this.onDisable();
        if (this._uiPanelName) {
            UIManager.closePanel(this._uiPanelName);
        }
    };
    return EnterMttHandler;
}());
__reflect(EnterMttHandler.prototype, "EnterMttHandler");
//# sourceMappingURL=EnterMttHandler.js.map