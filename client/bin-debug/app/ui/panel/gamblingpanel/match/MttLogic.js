var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 锦标赛逻辑
 */
var MttLogic = (function () {
    function MttLogic(panel, news) {
        this._context = panel;
        this._newsLogic = news;
    }
    MttLogic.prototype.initialize = function () {
        this._endTime = undefined;
        this._roundOverData = undefined;
        var state = this._context.panelState;
        var component = state.getCompoent(GamblingMatchComponent);
        component.addonButton.visible = false;
        component.rebuyButton.visible = false;
        var leftTime = GamblingManager.matchRoomInfo.startTime + GamblingManager.matchRoomInfo.definition.delaySign - TimeManager.GetServerUtcTimestamp();
        if (leftTime > 0) {
            qin.Tick.AddTimeoutInvoke(this.delaySignOver, leftTime * 1000, this);
        }
        this.onRebuyORAddonEvent();
    };
    MttLogic.prototype.onEnable = function () {
        GamblingManager.ChipsChangeEvent.addListener(this.onChipsChangeEvent, this);
        GamblingManager.RebuyORAddonEvent.addListener(this.onRebuyORAddonEvent, this);
        GamblingManager.RoundOverEvent.addListener(this.onRoundOverEvent, this);
        var state = this._context.panelState;
        var component = state.getCompoent(GamblingMatchComponent);
        component.rebuyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRebuyChips, this);
        component.addonButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddonChips, this);
    };
    MttLogic.prototype.onDisable = function () {
        GamblingManager.ChipsChangeEvent.removeListener(this.onChipsChangeEvent, this);
        GamblingManager.RebuyORAddonEvent.removeListener(this.onRebuyORAddonEvent, this);
        GamblingManager.RoundOverEvent.removeListener(this.onRoundOverEvent, this);
        qin.Tick.RemoveTimeoutInvoke(this.delaySignOver, this);
        var state = this._context.panelState;
        var component = state.getCompoent(GamblingMatchComponent);
        component.rebuyButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRebuyChips, this);
        component.addonButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddonChips, this);
    };
    /**
    * 延迟报名结束
    */
    MttLogic.prototype.delaySignOver = function () {
        if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.definition) {
            var leftTime = GamblingManager.matchRoomInfo.startTime + GamblingManager.matchRoomInfo.definition.delaySign - TimeManager.GetServerUtcTimestamp();
            if (leftTime <= 0) {
                if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.matchRoomInfo.maxAwardRank) {
                    //显示进入奖励圈面板
                    this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InAward);
                }
                if (InfoUtil.checkAvailable(GamblingManager.roomInfo)) {
                    if (GamblingManager.matchRoomInfo.leftJoin <= GamblingManager.roomInfo.definition.seat) {
                        this._newsLogic.showAlert(ChampionshipRoomUIAlertType.InFinals);
                    }
                }
            }
            else {
                if (leftTime < 0.1) {
                    leftTime = 0.1;
                }
                qin.Tick.AddTimeoutInvoke(this.delaySignOver, leftTime * 1000, this);
            }
        }
    };
    MttLogic.prototype.onChipsChangeEvent = function (info) {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
            if (info && info.roleId == UserManager.userInfo.roleId) {
                this.onRebuyORAddonEvent();
            }
        }
    };
    MttLogic.prototype.onRebuyORAddonEvent = function () {
        var state = this._context.panelState;
        var component = state.getCompoent(GamblingMatchComponent);
        component.addonButton.visible = false;
        component.rebuyButton.visible = false;
        if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, false)) {
            component.rebuyButton.visible = true;
        }
        else if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, false)) {
            component.addonButton.visible = true;
        }
    };
    MttLogic.prototype.onRebuyChips = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, true)) {
            UIManager.showPanel(UIModuleName.ChampionshipBuyChipsPanel, { isRebuy: true });
        }
    };
    MttLogic.prototype.onAddonChips = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, true)) {
            UIManager.showPanel(UIModuleName.ChampionshipBuyChipsPanel, { isRebuy: false });
        }
    };
    MttLogic.prototype.onRoundOverEvent = function (data) {
        this._roundOverData = data;
        if (GamblingUtil.isMtt) {
            this._endTime = GamblingManager.roomInfo.endTime;
        }
    };
    /**
     * 检测rebuy和addon
     */
    MttLogic.prototype.checkRebuyAddon = function () {
        if (GamblingUtil.isMtt) {
            var pInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
            if (pInfo && this._roundOverData && this._roundOverData.initbankRoll) {
                //这里需要判断本局是否有重购/增购 未增加的筹码
                if ((pInfo.bankRoll <= 0 || !pInfo.bankRoll) && (!GamblingManager.roomInfo.addbuy || GamblingManager.roomInfo.addbuy <= 0)) {
                    this.checkRoundOver();
                }
            }
        }
    };
    MttLogic.prototype.checkRoundOver = function () {
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
            var pInfo = GamblingManager.getPlayerInfo(UserManager.userInfo.roleId);
            //这里需要判断本局是否有重购/增购 未增加的筹码
            if (pInfo && (pInfo.bankRoll <= 0 || !pInfo.bankRoll) && (!GamblingManager.roomInfo.addbuy || GamblingManager.roomInfo.addbuy <= 0)) {
                if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Rebuy, false)) {
                    UIManager.showPanel(UIModuleName.ChampionshipBuyChipsPanel, { isRebuy: true, isOver: true, endTime: this._endTime });
                }
                else if (GamblingManager.championshipHandler.isCanAddChips(ChampionshipBuyType.Addon, false)) {
                    UIManager.showPanel(UIModuleName.ChampionshipBuyChipsPanel, { isRebuy: false, isOver: true, endTime: this._endTime });
                }
            }
        }
    };
    return MttLogic;
}());
__reflect(MttLogic.prototype, "MttLogic");
//# sourceMappingURL=MttLogic.js.map