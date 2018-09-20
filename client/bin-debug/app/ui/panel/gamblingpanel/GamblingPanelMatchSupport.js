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
 * 比赛逻辑处理
 */
var GamblingPanelMatchSupport = (function (_super) {
    __extends(GamblingPanelMatchSupport, _super);
    function GamblingPanelMatchSupport(panel) {
        var _this = _super.call(this, panel) || this;
        _this._newsLogic = new MatchNewsLogic(panel);
        _this._mttLogic = new MttLogic(panel, _this._newsLogic);
        return _this;
    }
    GamblingPanelMatchSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._newsLogic.initialize();
        this._intervalMinTime = ProjectDefined.GetInstance().mTTIntervalTime / 2;
        this._numTime = undefined;
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
            if (GamblingManager.matchRoomInfo.definition.type == MatchType.MTT) {
                this._mttLogic.initialize();
            }
            this.showAddTime();
            this.showInfo();
            this.showBlind();
            if (this.isShowAlert) {
                this.checkFixedTimeAlert(); //0
            }
            else {
                qin.Tick.RemoveTimeoutInvoke(this.fixedTimeAlert, this);
            }
        }
    };
    GamblingPanelMatchSupport.prototype.checkFixedTimeAlert = function () {
        qin.Tick.RemoveTimeoutInvoke(this.fixedTimeAlert, this);
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
            var time = TimeManager.GetServerUtcTimestamp() - GamblingManager.matchRoomInfo.startTime;
            if (time >= 0) {
                var outTime = ProjectDefined.GetInstance().mTTIntervalTime - time % ProjectDefined.GetInstance().mTTIntervalTime;
                if (outTime < 1) {
                    outTime = 1;
                }
                qin.Tick.AddTimeoutInvoke(this.fixedTimeAlert, outTime * 1000, this);
            }
        }
    };
    GamblingPanelMatchSupport.prototype.fixedTimeAlert = function () {
        if (GamblingManager.matchRoomInfo) {
            this.checkFixedTimeAlert();
            if (GamblingManager.matchRoomInfo.leftJoin) {
                if (!this._numTime || TimeManager.GetServerUtcTimestamp() - this._numTime > this._intervalMinTime) {
                    this._numTime = TimeManager.GetServerUtcTimestamp();
                    this._newsLogic.showAlert(ChampionshipRoomUIAlertType.LeftNumChange);
                }
            }
        }
    };
    GamblingPanelMatchSupport.prototype.onChampionshipInfo = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo)) {
            UIManager.showPanel(UIModuleName.ChampionshipInfoPanel, { championshipInfo: GamblingManager.matchRoomInfo, isInRoom: true });
        }
    };
    GamblingPanelMatchSupport.prototype.onMTTOverPushEvent = function (data) {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && data.recordId == GamblingManager.matchRoomInfo.recordId) {
            UIManager.closePanel(UIModuleName.ChampionshipBuyChipsPanel);
            UIManager.closePanel(UIModuleName.ChatPanel);
            switch (GamblingManager.matchRoomInfo.definition.type) {
                case MatchType.MTT:
                    var state = this.target.panelState;
                    var component = state.getCompoent(GamblingMatchComponent);
                    component.rebuyButton.visible = false;
                    component.addonButton.visible = false;
                    UIManager.showPanel(UIModuleName.MTTOverPanel, data);
                    break;
                case MatchType.SNG://todo
                    UIManager.showPanel(UIModuleName.SitAndPlayOverPanel, data);
                    break;
            }
        }
    };
    GamblingPanelMatchSupport.prototype.onGetRoomInfoHandler = function () {
        //换房间
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.matchRoomInfo) {
            if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.roomInfo.definition.seat && GamblingManager.matchRoomInfo.definition) {
                if (GamblingUtil.isOutOfJoin(GamblingManager.matchRoomInfo) && this.isShowAlert) {
                    //进入决赛桌
                    this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InFinals);
                    return;
                }
            }
        }
        this._newsLogic.showAlert(ChampionshipRoomUIAlertType.ChangeRoom);
    };
    GamblingPanelMatchSupport.prototype.onMTTRankPushEvent = function (data) {
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.recordId == data.recordId) {
            this.showInfo();
            if (GamblingUtil.isOutOfJoin(GamblingManager.matchRoomInfo)) {
                if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.matchRoomInfo.maxAwardRank && data.leftJoin > GamblingManager.matchRoomInfo.maxAwardRank) {
                    //显示进入奖励圈面板
                    this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InAward);
                }
                if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && this.isShowAlert) {
                    if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.roomInfo.definition.seat && data.leftJoin > GamblingManager.roomInfo.definition.seat) {
                        this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InFinals);
                    }
                }
            }
        }
    };
    GamblingPanelMatchSupport.prototype.blindChangeEvent = function (data) {
        if (data && data.isAddLevel) {
            if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && InfoUtil.checkAvailable(GamblingManager.roomInfo)
                && GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
                this._mttLogic.onRebuyORAddonEvent();
                var def = ChampionshipBlindDefined.GetInstance().getBlindInfoByLevel(GamblingManager.roomInfo.blindLevel, GamblingManager.matchRoomInfo.definition.blindType);
                if (def) {
                    var text = "下局盲注将增长至:" + qin.MathUtil.formatNum(def.sBlind) + "/" + qin.MathUtil.formatNum(def.bBlind);
                    if (def.preBet) {
                        text += ",前注:" + qin.MathUtil.formatNum(def.preBet);
                    }
                    this._newsLogic.showAddBlind(text);
                }
                this.showBlind();
            }
        }
    };
    GamblingPanelMatchSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.definition.type == MatchType.MTT) {
            this._mttLogic.onEnable();
        }
        GamblingManager.BlindChangeEvent.addListener(this.blindChangeEvent, this);
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
        ChampionshipManager.OnMTTRankPushEvent.addListener(this.onMTTRankPushEvent, this);
        ChampionshipManager.OnMTTOverPushEvent.addListener(this.onMTTOverPushEvent, this);
        var state = this.target.panelState;
        var component = state.getCompoent(GamblingMatchComponent);
        component.championshipInfoBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChampionshipInfo, this);
    };
    GamblingPanelMatchSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        if (InfoUtil.checkAvailable(GamblingManager.matchRoomInfo) && GamblingManager.matchRoomInfo.definition.type == MatchType.MTT) {
            this._mttLogic.onDisable();
        }
        GamblingManager.BlindChangeEvent.removeListener(this.blindChangeEvent, this);
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
        ChampionshipManager.OnMTTRankPushEvent.removeListener(this.onMTTRankPushEvent, this);
        ChampionshipManager.OnMTTOverPushEvent.removeListener(this.onMTTOverPushEvent, this);
        qin.Tick.RemoveSecondsInvoke(this.refreshTime, this);
        var state = this.target.panelState;
        var component = state.getCompoent(GamblingMatchComponent);
        component.championshipInfoBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChampionshipInfo, this);
        this._newsLogic.onDisable();
    };
    GamblingPanelMatchSupport.prototype.refreshTime = function () {
        this.showAddTime();
    };
    GamblingPanelMatchSupport.prototype.showInfo = function () {
        var state = this.target.panelState;
        var component = state.getCompoent(GamblingMatchComponent);
        if (GamblingManager.matchRoomInfo.rank && GamblingManager.matchRoomInfo.leftJoin) {
            component.rankLabel.text = GamblingManager.matchRoomInfo.rank.toString() + "/" + GamblingManager.matchRoomInfo.leftJoin.toString();
        }
        else {
            component.rankLabel.text = "--/--";
        }
        if (GamblingManager.matchRoomInfo.avgChips) {
            component.avgChipsLabel.text = "均码:" + qin.MathUtil.formatNum(GamblingManager.matchRoomInfo.avgChips);
        }
        else {
            component.avgChipsLabel.text = "均码:---";
        }
        component.mttNameLabel.text = GamblingManager.matchRoomInfo.definition.name;
        component.refresh();
    };
    GamblingPanelMatchSupport.prototype.showBlind = function () {
        qin.Tick.RemoveSecondsInvoke(this.refreshTime, this);
        if (GamblingManager.roomInfo.blindTime != -1) {
            var time = GamblingManager.roomInfo.blindTime - TimeManager.GetServerUtcTimestamp();
            if (time > 0) {
                qin.Tick.AddSecondsInvoke(this.refreshTime, this);
            }
        }
    };
    GamblingPanelMatchSupport.prototype.showAddTime = function () {
        if (GamblingManager.roomInfo) {
            var state = this.target.panelState;
            var component = state.getCompoent(GamblingMatchComponent);
            if (GamblingManager.roomInfo.blindTime == -1) {
                component.blindAddNameLabel.text = "已达到最大盲注";
                component.blindAddTimeLabel.text = "";
            }
            else {
                var time = GamblingManager.roomInfo.blindTime - TimeManager.GetServerUtcTimestamp();
                if (time < 0) {
                    time = 0;
                }
                component.blindAddNameLabel.text = "下次涨盲:";
                component.blindAddTimeLabel.text = qin.DateTimeUtil.countDownFormat(Math.floor(time), false);
            }
        }
    };
    GamblingPanelMatchSupport.prototype.checkRebuyAddon = function () {
        this._mttLogic.checkRebuyAddon();
    };
    Object.defineProperty(GamblingPanelMatchSupport.prototype, "isShowAlert", {
        /**
         * 是否显示提示 如进入最终桌
         */
        get: function () {
            //锦标赛和多桌的淘汰赛
            return GamblingManager.matchRoomInfo.definition.type == MatchType.MTT || (GamblingManager.matchRoomInfo.definition.type == MatchType.SNG && !GamblingUtil.isSingleTable(GamblingManager.matchRoomInfo));
        },
        enumerable: true,
        configurable: true
    });
    return GamblingPanelMatchSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelMatchSupport.prototype, "GamblingPanelMatchSupport");
//# sourceMappingURL=GamblingPanelMatchSupport.js.map