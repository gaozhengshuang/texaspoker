/**
 * 进入锦标赛
 */
class EnterMttHandler
{
    public _uiPanelName: string;
    private _info: MatchRoomInfo;
    private _gamblingPanel: GamblingPanel;
    private onEnable()
    {
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
        GamblingManager.LeaveRoomEvent.addListener(this.onLeaveRoomHandler, this);
        GamblingManager.LeaveRoomErrorEvent.addListener(this.onLeaveRoomErrorHandler, this);
        HundredWarManager.onLeaveEvent.addListener(this.hundredWarLeaveHandler, this);
    }
    private onDisable()
    {
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
        GamblingManager.LeaveRoomEvent.removeListener(this.onLeaveRoomHandler, this);
        GamblingManager.LeaveRoomErrorEvent.removeListener(this.onLeaveRoomErrorHandler, this);
        HundredWarManager.onLeaveEvent.removeListener(this.hundredWarLeaveHandler, this);
    }
    /**
     * 立即进入
     */
    public enterMatch(info: MatchRoomInfo, panelName: string)
    {
        this.onEnable();

        this._uiPanelName = panelName;
        this._info = info;
        if (this._info)
        {
            let roomId: number = this._info.roomId;
            if (roomId > 0) //有房间ID的比赛，直接进入
            {
                GamblingManager.reqEnterRoom(roomId);
                qin.Console.log("进入比赛房间enterMatch" + roomId);
            }
            else
            {   //等待状态处理
                if (SceneManager.sceneType == SceneType.HundredWar) //百人大战场景处理
                {
                    HundredWarManager.reqLeave();
                }
                else if (SceneManager.sceneType == SceneType.Hall) //大厅场景直接跳转
                {
                    this.jumpToGame();
                }
                else
                {
                    if (GamblingManager.roomInfo) //在游戏中 则请求离开房间
                    {
                        GamblingManager.reqLeaveRoom(true);
                    }
                    else //在游戏房间处于等待状态
                    {
                        this.switchGameSceneInRoom();
                        this.closePanel();
                    }
                }
            }
        }
    }
    private hundredWarLeaveHandler()
    {
        this.jumpToGame();
    }
    private jumpToGame()
    {
        this._info.cloneTo(GamblingManager.matchRoomInfo);
        SceneManager.switcScene(SceneType.Game);
        this.closePanel();
    }
    /**
     * 直接进入房间
     */
    private onGetRoomInfoHandler()
    {
        if (SceneManager.sceneType != SceneType.Game) //非游戏场景 尝试跳转到游戏场景
        {
            SceneManager.switcScene(SceneType.Game);
        }
        else
        {
            this.switchGameSceneInRoom();
        }
        this.closePanel();
    }
    /**
     * 锦标赛离开房间，进入另外一个锦标赛房间
     */
    private onLeaveRoomHandler(data: any)
    {
        if (data.isInMtt)
        {
            this.switchGameSceneInRoom();
            this.closePanel();
        }
    }
    /**
     * 锦标赛离开房间，进入另外一个锦标赛房间(发生error的情况下也处理)
     */
    private onLeaveRoomErrorHandler(data: any)
    {
        if (this._info && data.isInMtt)
        {
            this.switchGameSceneInRoom();
            this.closePanel();
        }
    }
    /**
     * 房间中切换不同的比赛房间
     */
    private switchGameSceneInRoom()
    {
        this._info.cloneTo(GamblingManager.matchRoomInfo);
        if (!this._gamblingPanel)
        {
            this._gamblingPanel = <GamblingPanel>UIManager.getPanel(UIModuleName.GamblingPanel);
        }
        if (this._gamblingPanel)
        {
            this._gamblingPanel.switchToGameSceneInRoom();
        }
        else
        {
            UIManager.showPanel(UIModuleName.GamblingPanel);
        }
    }
    private closePanel()
    {
        this.onDisable();
        if (this._uiPanelName)
        {
            UIManager.closePanel(this._uiPanelName);
        }
    }
}