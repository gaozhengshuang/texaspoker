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
 * 锦标赛 牌局等待
 */
var ChampionshipWaitSupport = (function (_super) {
    __extends(ChampionshipWaitSupport, _super);
    function ChampionshipWaitSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionshipWaitSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    ChampionshipWaitSupport.prototype.setWaitInfo = function () {
        var state = this.target.panelState;
        var component = state.getCompoent(GamblingMatchWaitComponent);
        component.waitNameLabel.text = UserManager.userInfo.name;
        component.waitHeadIcon.init(UserManager.userInfo, 90);
        qin.Tick.RemoveSecondsInvoke(this.refreshTime, this);
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
            component.waitChipsLabel.text = GamblingManager.matchRoomInfo.definition.initialChips.toString();
            switch (GamblingManager.matchRoomInfo.definition.type) {
                case MatchType.MTT:
                    qin.Tick.AddSecondsInvoke(this.refreshTime, this);
                    this.refreshTime();
                    break;
                case MatchType.SNG:
                    component.showSngInfo();
                    break;
            }
            if (!ChampionshipManager.getMathInfoByRecordId(GamblingManager.matchRoomInfo.recordId)) {
                this.onCancelMTTPushEvent(GamblingManager.matchRoomInfo);
            }
            component.refreshGroup();
            component.mttNameLabel.text = GamblingManager.matchRoomInfo.definition.name;
        }
    };
    ChampionshipWaitSupport.prototype.refreshTime = function () {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
            var state = this.target.panelState;
            var component = state.getCompoent(GamblingMatchWaitComponent);
            var leftTime = GamblingManager.matchRoomInfo.startTime - TimeManager.GetServerUtcTimestamp();
            if (leftTime > 0) {
                component.championshipWaitLabel.text = qin.DateTimeUtil.countDownFormat(Math.floor(leftTime), false);
            }
            else {
                //进入比赛
                component.championshipWaitLabel.text = "00:00";
                //锦标赛开始是会推送房间Id,所以到锦标赛开始时可能取不到房间id
                if (GamblingManager.matchRoomInfo.roomId > 0) {
                    qin.Tick.RemoveSecondsInvoke(this.refreshTime, this);
                    qin.Tick.AddTimeoutInvoke(this.delayEnterRoom, 600, this);
                }
            }
        }
    };
    ChampionshipWaitSupport.prototype.delayEnterRoom = function () {
        ChampionshipManager.enterMttHandler.enterMatch(GamblingManager.matchRoomInfo, qin.StringConstants.Empty);
        qin.Console.log("锦标赛开始进入房间refreshTime" + GamblingManager.matchRoomInfo.roomId);
    };
    ChampionshipWaitSupport.prototype.onCancelMTTPushEvent = function (info) {
        if ((InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) && info && info.recordId == GamblingManager.matchRoomInfo.recordId) {
            this.onDisable();
            if (info.definition) {
                AlertManager.showAlert("您报名的" + info.definition.name + "因为报名人数不足已经取消，您的所有报名费用/门票已经返还给您！", this.backHall);
            }
            else {
                AlertManager.showAlert("您报名的比赛因为报名人数不足已经取消，您的所有报名费用/门票已经返还给您！", this.backHall);
            }
        }
    };
    ChampionshipWaitSupport.prototype.backHall = function () {
        GamblingManager.reset();
        SceneManager.switcScene(SceneType.Hall, { action: SceneSwitchAction.RepleacePanel, panel: UIModuleName.ChampionshipPanel });
        //UIManager.closePanel(UIModuleName.GamblingPanel);
    };
    ChampionshipWaitSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        ChampionshipManager.OnCancelMTTPushEvent.addListener(this.onCancelMTTPushEvent, this);
        ChampionshipManager.onRefreshMTTListEvent.addListener(this.refreshMatchHandler, this);
    };
    ChampionshipWaitSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        qin.Tick.RemoveSecondsInvoke(this.refreshTime, this);
        ChampionshipManager.OnCancelMTTPushEvent.removeListener(this.onCancelMTTPushEvent, this);
        ChampionshipManager.onRefreshMTTListEvent.removeListener(this.refreshMatchHandler, this);
        qin.Tick.RemoveTimeoutInvoke(this.delayEnterRoom, this);
    };
    ChampionshipWaitSupport.prototype.refreshMatchHandler = function () {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
            switch (GamblingManager.matchRoomInfo.definition.type) {
                case MatchType.SNG:
                    var state = this.target.panelState;
                    var component = state.getCompoent(GamblingMatchWaitComponent);
                    component.showSngInfo();
                    if (GamblingManager.matchRoomInfo.join >= GamblingManager.matchRoomInfo.definition.bNum) {
                        qin.Tick.AddTimeoutInvoke(this.delayEnterRoom, 600, this);
                    }
                    break;
            }
        }
    };
    return ChampionshipWaitSupport;
}(BaseGamblingPanelSupport));
__reflect(ChampionshipWaitSupport.prototype, "ChampionshipWaitSupport");
//# sourceMappingURL=ChampionshipWaitSupport.js.map