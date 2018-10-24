/**
 * 比赛逻辑处理
 */
class GamblingPanelMatchSupport extends BaseGamblingPanelSupport
{
    private _mttLogic: MttLogic;

    private _numTime: number;
    private _intervalMinTime: number;

    private _newsLogic: MatchNewsLogic;

    constructor(panel: GamblingPanel)
    {
        super(panel);
        this._newsLogic = new MatchNewsLogic(panel);
        this._mttLogic = new MttLogic(panel, this._newsLogic);
    }
    public initialize()
    {
        super.initialize();
        this._newsLogic.initialize();

        this._intervalMinTime = ProjectDefined.mTTIntervalTime / 2;
        this._numTime = undefined;

        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && InfoUtil.checkAvailable(GamblingManager.roomInfo))
        {
            if (GamblingManager.matchRoomInfo.definition.Type == MatchType.MTT)
            {
                this._mttLogic.initialize();
            }
            this.showAddTime();
            this.showInfo();
            this.showBlind();

            if (this.isShowAlert)
            {
                this.checkFixedTimeAlert(); //0
            }
            else
            {
                game.Tick.RemoveTimeoutInvoke(this.fixedTimeAlert, this)
            }
        }
    }
    private checkFixedTimeAlert()
    {
        game.Tick.RemoveTimeoutInvoke(this.fixedTimeAlert, this)
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
        {
            let time: number = TimeManager.GetServerUtcTimestamp() - GamblingManager.matchRoomInfo.startTime;
            if (time >= 0)
            {
                let outTime: number = ProjectDefined.mTTIntervalTime - time % ProjectDefined.mTTIntervalTime;
                if (outTime < 1)
                {
                    outTime = 1;
                }
                game.Tick.AddTimeoutInvoke(this.fixedTimeAlert, outTime * 1000, this)
            }
        }
    }
    private fixedTimeAlert()
    {
        if (GamblingManager.matchRoomInfo)
        {
            this.checkFixedTimeAlert();
            if (GamblingManager.matchRoomInfo.leftJoin)
            {
                if (!this._numTime || TimeManager.GetServerUtcTimestamp() - this._numTime > this._intervalMinTime)
                {
                    this._numTime = TimeManager.GetServerUtcTimestamp();
                    this._newsLogic.showAlert(ChampionshipRoomUIAlertType.LeftNumChange);
                }
            }
        }
    }
    private onChampionshipInfo()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo))
        {
            UIManager.showPanel(UIModuleName.ChampionshipInfoPanel, { championshipInfo: GamblingManager.matchRoomInfo, isInRoom: true });   
        }
    }
    private onMTTOverPushEvent(data: msg.RS2C_PushMTTWeedOut)
    {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && data.recordid == GamblingManager.matchRoomInfo.recordId)
        {
            UIManager.closePanel(UIModuleName.ChampionshipBuyChipsPanel);
            UIManager.closePanel(UIModuleName.ChatPanel);
            switch (GamblingManager.matchRoomInfo.definition.Type)
            {
                case MatchType.MTT:
                    let state: GamblingPanelMatchState = this.target.panelState;
                    let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
                    component.rebuyButton.visible = false;
                    component.addonButton.visible = false;
                    UIManager.showPanel(UIModuleName.MTTOverPanel, data);
                    break;
                case MatchType.SNG: //todo
                    UIManager.showPanel(UIModuleName.SitAndPlayOverPanel, data);
                    break;
            }
        }
    }
    private onGetRoomInfoHandler()
    {
        //换房间
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.matchRoomInfo)
        {
            if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.roomInfo.definition.Seat && GamblingManager.matchRoomInfo.definition)
            {
                if (GamblingUtil.isOutOfJoin(GamblingManager.matchRoomInfo) && this.isShowAlert)
                {
                    //进入决赛桌
                    this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InFinals);
                    return;
                }
            }
        }
        this._newsLogic.showAlert(ChampionshipRoomUIAlertType.ChangeRoom);
    }

    private onMTTRankPushEvent(data: any)
    {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.recordId == data.recordId)
        {
            this.showInfo();
            if (GamblingUtil.isOutOfJoin(GamblingManager.matchRoomInfo))
            {
                if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.matchRoomInfo.maxAwardRank && data.leftJoin > GamblingManager.matchRoomInfo.maxAwardRank)
                {
                    //显示进入奖励圈面板
                    this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InAward);
                }
                if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && this.isShowAlert) //最终桌提示
                {
                    if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.roomInfo.definition.Seat && data.leftJoin > GamblingManager.roomInfo.definition.Seat)
                    {
                        this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InFinals);
                    }
                }
            }
        }
    }
    private blindChangeEvent(data: any)
    {
        if (data && data.isAddLevel)
        {
            if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && InfoUtil.checkAvailable(GamblingManager.roomInfo)
                && GamblingManager.roomInfo.gamblingType == GamblingType.Match)
            {
                this._mttLogic.onRebuyORAddonEvent();

                let def: table.IChampionshipBlindDefine = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.blindLevel, GamblingManager.matchRoomInfo.definition.BlindType);
                if (def)
                {
                    let text: string = "下局盲注将增长至:" + game.MathUtil.formatNum(def.SBlind) + "/" + game.MathUtil.formatNum(def.BBlind)
                    if (def.PreBet)
                    {
                        text += ",前注:" + game.MathUtil.formatNum(def.PreBet);
                    }
                    this._newsLogic.showAddBlind(text);
                }
                this.showBlind();
            }
        }
    }
    public onEnable()
    {
        super.onEnable();

        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.definition.Type == MatchType.MTT)
        {
            this._mttLogic.onEnable();
        }
        GamblingManager.BlindChangeEvent.addListener(this.blindChangeEvent, this);
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
        ChampionshipManager.OnMTTRankPushEvent.addListener(this.onMTTRankPushEvent, this);
        ChampionshipManager.OnMTTOverPushEvent.addListener(this.onMTTOverPushEvent, this);

        let state: GamblingPanelMatchState = this.target.panelState;
        let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
        component.championshipInfoBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChampionshipInfo, this);
    }
    public onDisable()
    {
        super.onDisable();
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.definition.Type == MatchType.MTT)
        {
            this._mttLogic.onDisable();
        }
        GamblingManager.BlindChangeEvent.removeListener(this.blindChangeEvent, this);
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
        ChampionshipManager.OnMTTRankPushEvent.removeListener(this.onMTTRankPushEvent, this);
        ChampionshipManager.OnMTTOverPushEvent.removeListener(this.onMTTOverPushEvent, this);
        game.Tick.RemoveSecondsInvoke(this.refreshTime, this);

        let state: GamblingPanelMatchState = this.target.panelState;
        let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
        component.championshipInfoBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChampionshipInfo, this);
        this._newsLogic.onDisable();
    }
    private refreshTime()
    {
        this.showAddTime();
    }
    private showInfo()
    {
        let state: GamblingPanelMatchState = this.target.panelState;
        let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
        if (GamblingManager.matchRoomInfo.rank && GamblingManager.matchRoomInfo.leftJoin)
        {
            component.rankLabel.text = GamblingManager.matchRoomInfo.rank.toString() + "/" + GamblingManager.matchRoomInfo.leftJoin.toString();
        }
        else
        {
            component.rankLabel.text = "--/--";
        }
        if (GamblingManager.matchRoomInfo.avgChips)
        {
            component.avgChipsLabel.text = "均码:" + game.MathUtil.formatNum(GamblingManager.matchRoomInfo.avgChips);
        }
        else
        {
            component.avgChipsLabel.text = "均码:---";
        }
        component.mttNameLabel.text = GamblingManager.matchRoomInfo.definition.Name;
        component.refresh();
    }
    private showBlind()
    {
        game.Tick.RemoveSecondsInvoke(this.refreshTime, this);
        if (GamblingManager.roomInfo.blindTime != -1)
        {
            let time: number = GamblingManager.roomInfo.blindTime - TimeManager.GetServerUtcTimestamp();
            if (time > 0)
            {
                game.Tick.AddSecondsInvoke(this.refreshTime, this);
            }
        }
    }
    private showAddTime()
    {
        if (GamblingManager.roomInfo)
        {
            let state: GamblingPanelMatchState = this.target.panelState;
            let component: GamblingMatchComponent = state.getCompoent<GamblingMatchComponent>(GamblingMatchComponent);
            if (GamblingManager.roomInfo.blindTime == -1)
            {
                component.blindAddNameLabel.text = "已达到最大盲注";
                component.blindAddTimeLabel.text = "";
            }
            else
            {
                let time: number = GamblingManager.roomInfo.blindTime - TimeManager.GetServerUtcTimestamp();
                if (time < 0)
                {
                    time = 0;
                }
                component.blindAddNameLabel.text = "下次涨盲:";
                component.blindAddTimeLabel.text = game.DateTimeUtil.countDownFormat(Math.floor(time), false);
            }
        }
    }
    public checkRebuyAddon()
    {
        this._mttLogic.checkRebuyAddon();
    }
    /**
     * 是否显示提示 如进入最终桌
     */
    private get isShowAlert(): boolean
    {
        //锦标赛和多桌的淘汰赛
        return GamblingManager.matchRoomInfo.definition.Type == MatchType.MTT || (GamblingManager.matchRoomInfo.definition.Type == MatchType.SNG && !GamblingUtil.isSingleTable(GamblingManager.matchRoomInfo))
    }
}