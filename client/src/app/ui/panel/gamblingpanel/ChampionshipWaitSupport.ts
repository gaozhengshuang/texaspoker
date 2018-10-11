/**
 * 锦标赛 牌局等待
 */
class ChampionshipWaitSupport extends BaseGamblingPanelSupport
{
    public initialize()
    {
        super.initialize();
    }
    public setWaitInfo()
    {
        let state: GamblingPanelMatchWaitState = <GamblingPanelMatchWaitState>this.target.panelState;
        let component: GamblingMatchWaitComponent = state.getCompoent<GamblingMatchWaitComponent>(GamblingMatchWaitComponent);
        component.waitNameLabel.text = UserManager.userInfo.name;
        component.waitHeadIcon.init(UserManager.userInfo, 90);
        game.Tick.RemoveSecondsInvoke(this.refreshTime, this);
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
        {
            component.waitChipsLabel.text = GamblingManager.matchRoomInfo.definition.InitialChips.toString();

            switch (GamblingManager.matchRoomInfo.definition.Type)
            {
                case MatchType.MTT:
                    game.Tick.AddSecondsInvoke(this.refreshTime, this);
                    this.refreshTime();
                    break;
                case MatchType.SNG:
                    component.showSngInfo();
                    break;
            }
            if (!ChampionshipManager.getMathInfoByRecordId(GamblingManager.matchRoomInfo.recordId))
            {
                this.onCancelMTTPushEvent(GamblingManager.matchRoomInfo);
            }
            component.refreshGroup();
            component.mttNameLabel.text = GamblingManager.matchRoomInfo.definition.Name;
        }
    }
    private refreshTime()
    {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
        {
            let state: GamblingPanelMatchWaitState = <GamblingPanelMatchWaitState>this.target.panelState;
            let component: GamblingMatchWaitComponent = state.getCompoent<GamblingMatchWaitComponent>(GamblingMatchWaitComponent);
            let leftTime: number = GamblingManager.matchRoomInfo.startTime - TimeManager.GetServerUtcTimestamp();
            if (leftTime > 0)
            {
                component.championshipWaitLabel.text = game.DateTimeUtil.countDownFormat(Math.floor(leftTime), false);
            }
            else
            {
                //进入比赛
                component.championshipWaitLabel.text = "00:00";
                //锦标赛开始是会推送房间Id,所以到锦标赛开始时可能取不到房间id
                if (GamblingManager.matchRoomInfo.roomId > 0)
                {
                    game.Tick.RemoveSecondsInvoke(this.refreshTime, this);
                    game.Tick.AddTimeoutInvoke(this.delayEnterRoom, 600, this);
                }
            }
        }
    }

    private delayEnterRoom()
    {
        ChampionshipManager.enterMttHandler.enterMatch(GamblingManager.matchRoomInfo, game.StringConstants.Empty);
        game.Console.log("锦标赛开始进入房间refreshTime" + GamblingManager.matchRoomInfo.roomId);
    }

    private onCancelMTTPushEvent(info: MatchRoomInfo)
    {
        if ((InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) && info && info.recordId == GamblingManager.matchRoomInfo.recordId)
        {
            this.onDisable();
            if (info.definition)
            {
                AlertManager.showAlert("您报名的" + info.definition.Name + "因为报名人数不足已经取消，您的所有报名费用/门票已经返还给您！", this.backHall);
            }
            else
            {
                AlertManager.showAlert("您报名的比赛因为报名人数不足已经取消，您的所有报名费用/门票已经返还给您！", this.backHall);
            }
        }
    }
    private backHall()
    {
        GamblingManager.reset();
        SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.ChampionshipPanel });
        //UIManager.closePanel(UIModuleName.GamblingPanel);
    }
    public onEnable()
    {
        super.onEnable();
        ChampionshipManager.OnCancelMTTPushEvent.addListener(this.onCancelMTTPushEvent, this);
        ChampionshipManager.onRefreshMTTListEvent.addListener(this.refreshMatchHandler, this);
    }
    public onDisable()
    {
        super.onDisable();
        game.Tick.RemoveSecondsInvoke(this.refreshTime, this);
        ChampionshipManager.OnCancelMTTPushEvent.removeListener(this.onCancelMTTPushEvent, this);
        ChampionshipManager.onRefreshMTTListEvent.removeListener(this.refreshMatchHandler, this);
        game.Tick.RemoveTimeoutInvoke(this.delayEnterRoom, this);
    }
    private refreshMatchHandler()
    {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
        {
            switch (GamblingManager.matchRoomInfo.definition.Type)
            {
                case MatchType.SNG:
                    let state: GamblingPanelMatchWaitState = <GamblingPanelMatchWaitState>this.target.panelState;
                    let component: GamblingMatchWaitComponent = state.getCompoent<GamblingMatchWaitComponent>(GamblingMatchWaitComponent);
                    component.showSngInfo();

                    if (GamblingManager.matchRoomInfo.join >= GamblingManager.matchRoomInfo.definition.BNum) //人满请求进入牌局
                    {
                        game.Tick.AddTimeoutInvoke(this.delayEnterRoom, 600, this);
                    }
                    break;
            }
        }
    }
}