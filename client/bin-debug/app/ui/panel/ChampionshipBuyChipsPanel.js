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
 * 重购/增购面板
 */
var ChampionshipBuyChipsPanel = (function (_super) {
    __extends(ChampionshipBuyChipsPanel, _super);
    function ChampionshipBuyChipsPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ChampionshipBuyChipsPanel);
        return _this;
    }
    ChampionshipBuyChipsPanel.prototype.onAwake = function (event) {
        this.isCloseButtonTween = false;
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    ChampionshipBuyChipsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (GamblingManager.roomInfo) {
            if (appendData && appendData.endTime) {
                this._starTime = ProjectDefined.GetInstance().MTTBuyTimeoutClient + appendData.endTime;
            }
            else {
                this._starTime = ProjectDefined.GetInstance().MTTBuyTimeoutClient + GamblingManager.roomInfo.endTime;
            }
        }
        this.setInfoUI();
    };
    ChampionshipBuyChipsPanel.prototype.setInfoUI = function () {
        if (GamblingManager.roomInfo) {
            this._blindLevel = GamblingManager.roomInfo.nowBlindLevel;
        }
        if (GamblingManager.matchRoomInfo && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.matchRoomInfo.definition) {
            if (this.panelData && this.panelData.isRebuy) {
                this.timesLabel.text = qin.StringUtil.format("剩余买入比赛次数:{0}", GamblingManager.matchRoomInfo.definition.rebuy - GamblingManager.roomInfo.rebuyTimes);
                this.rebuyGroup.visible = true;
                this.addonGroup.visible = false;
                if (this.panelData.isOver) {
                    this.desLabel.text = qin.StringUtil.format("比赛筹码输光了,是否花费{0}金币重新购买{1}比赛筹码?", GamblingManager.matchRoomInfo.definition.rebuyCost, GamblingManager.matchRoomInfo.definition.initialChips);
                    this._text = this.desLabel.text;
                    this.showDownCount();
                    return;
                }
                this.desLabel.text = qin.StringUtil.format("是否花费{0}金币重新购买{1}比赛筹码?", GamblingManager.matchRoomInfo.definition.rebuyCost, GamblingManager.matchRoomInfo.definition.initialChips);
            }
            else {
                this.timesLabel.text = qin.StringUtil.format("剩余买入比赛次数:{0}", GamblingManager.matchRoomInfo.definition.addon - GamblingManager.roomInfo.addonTimes);
                this.rebuyGroup.visible = false;
                this.addonGroup.visible = true;
                if (this.panelData && this.panelData.isOver) {
                    this.desLabel.text = qin.StringUtil.format("比赛筹码输光了,是否花费{0}金币重新购买{1}比赛筹码?", GamblingManager.matchRoomInfo.definition.addonCost, GamblingManager.matchRoomInfo.definition.addonChips);
                    this._text = this.desLabel.text;
                    this.showDownCount();
                    return;
                }
                this.desLabel.text = qin.StringUtil.format("是否花费{0}金币增购{1}比赛筹码?", GamblingManager.matchRoomInfo.definition.addonCost, GamblingManager.matchRoomInfo.definition.addonChips);
            }
        }
    };
    ChampionshipBuyChipsPanel.prototype.showDownCount = function () {
        if (GamblingManager.roomInfo) {
            var time = Math.floor(this._starTime - TimeManager.GetServerUtcTimestamp());
            qin.Tick.AddSecondsInvoke(this.refreshTime, this);
            if (time <= 0) {
                time = 0;
            }
            this.desLabel.text = this._text + qin.StringUtil.format("({0})", time);
        }
    };
    ChampionshipBuyChipsPanel.prototype.refreshTime = function () {
        var time = Math.floor(this._starTime - TimeManager.GetServerUtcTimestamp());
        if (time <= 0) {
            this.onCloseBtnClickHandler(null);
            this.outChampionship();
            return;
        }
        this.desLabel.text = this._text + qin.StringUtil.format("({0})", time);
    };
    ChampionshipBuyChipsPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isMatchOut) {
            AlertManager.showAlert("比赛已结束");
            this.onCloseBtnClickHandler(null);
        }
    };
    ChampionshipBuyChipsPanel.prototype.buyBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData && this.panelData.isRebuy) {
            if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, true)) {
                if (CostManager.verifyGold(GamblingManager.matchRoomInfo.definition.rebuyCost, true)) {
                    GamblingManager.championshipHandler.addShip(ChampionshipBuyType.Rebuy);
                }
            }
            else {
                this.outChampionship();
                this.onCloseBtnClickHandler(null);
            }
        }
        else {
            if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, true)) {
                if (CostManager.verifyGold(GamblingManager.matchRoomInfo.definition.addonCost, true)) {
                    GamblingManager.championshipHandler.addShip(ChampionshipBuyType.Addon);
                }
            }
            else {
                this.outChampionship();
                this.onCloseBtnClickHandler(null);
            }
        }
    };
    ChampionshipBuyChipsPanel.prototype.onRebuyORAddonEvent = function (data) {
        if (data && data.isSuccess) {
            this.onCloseBtnClickHandler(null);
        }
        else {
            if (this.panelData && this.panelData.isOver) {
                this.showDownCount();
            }
            else {
                this.onCloseBtnClickHandler(null);
            }
        }
    };
    ChampionshipBuyChipsPanel.prototype.outChampionship = function () {
        if (this.panelData && this.panelData.isOver) {
            GamblingManager.championshipHandler.addShip(ChampionshipBuyType.Out);
        }
    };
    ChampionshipBuyChipsPanel.prototype.onNextRoundStartEvent = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && this._blindLevel != GamblingManager.roomInfo.nowBlindLevel) {
            this._blindLevel = GamblingManager.roomInfo.nowBlindLevel;
            var canRebuy = GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, false);
            var canAddon = GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, false);
            if (this.panelData && this.panelData.isRebuy && !canRebuy && canAddon) {
                this.panelData.isRebuy = false;
                this.setInfoUI();
            }
            else if (canRebuy && !canAddon) {
                if (this.panelData) {
                    this.panelData.isRebuy = true;
                }
                else {
                    this.panelData = { isRebuy: true };
                }
                this.setInfoUI();
            }
            else if (this.panelData && this.panelData.isOver && !canRebuy && !canAddon) {
                AlertManager.showAlert("重购/增加购阶段已结束");
                this.outChampionship();
                this.onCloseBtnClickHandler(null);
            }
        }
    };
    ChampionshipBuyChipsPanel.prototype.outBtnClick = function (event) {
        this.outChampionship();
        this.onCloseBtnClickHandler(event);
    };
    ChampionshipBuyChipsPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyBtnClick, this);
        this.outButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.outBtnClick, this);
        GamblingManager.RebuyORAddonEvent.addListener(this.onRebuyORAddonEvent, this);
        GamblingManager.NextRoundStartEvent.addListener(this.onNextRoundStartEvent, this);
    };
    ChampionshipBuyChipsPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buyBtnClick, this);
        this.outButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.outBtnClick, this);
        GamblingManager.RebuyORAddonEvent.removeListener(this.onRebuyORAddonEvent, this);
        GamblingManager.NextRoundStartEvent.removeListener(this.onNextRoundStartEvent, this);
        qin.Tick.RemoveSecondsInvoke(this.refreshTime, this);
    };
    return ChampionshipBuyChipsPanel;
}(BasePanel));
__reflect(ChampionshipBuyChipsPanel.prototype, "ChampionshipBuyChipsPanel");
//# sourceMappingURL=ChampionshipBuyChipsPanel.js.map