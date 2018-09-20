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
 * 牌局信息刷新
 */
var GamblingPanelInfoRefreshSupport = (function (_super) {
    __extends(GamblingPanelInfoRefreshSupport, _super);
    function GamblingPanelInfoRefreshSupport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 3个显示组的间距
         */
        _this._gap1 = 50;
        /**
         * 2个显示组的间距
         */
        _this._gap2 = 80;
        return _this;
    }
    GamblingPanelInfoRefreshSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        if (GamblingManager.roomInfo) {
            this.refresh();
        }
    };
    GamblingPanelInfoRefreshSupport.prototype.refresh = function () {
        this.target.roomIdLabel.text = PlayingFieldManager.roomIdAddZero(GamblingManager.roomInfo.id);
        // this.target.usualBlindGroup.visible = false;
        // this.target.anteGroup.visible = false;
        // this.target.championshipBlindGroup.visible = false;
        this.target.guessCorrectlyGroup.visible = false;
        switch (GamblingManager.roomInfo.gamblingType) {
            case GamblingType.Common:
                // this.target.usualBlindGroup.visible = true;
                break;
            case GamblingType.Match:
                // this.target.championshipBlindGroup.visible = true;
                // this.target.anteGroup.visible = true;
                break;
            case GamblingType.PlayFieldPersonal:
            case GamblingType.OmahaPersonal:
                break;
        }
        this.refreshBlindLabel();
        this.refreshPotLabel();
    };
    GamblingPanelInfoRefreshSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.PlayerStateChangeEvent.addListener(this.playerStateChangeHandler, this);
        GamblingManager.BlindChangeEvent.addListener(this.blindChangeHandler, this);
        GamblingManager.NextRoundStartEvent.addListener(this.onNextRoundStartEvent, this);
        GamblingManager.OnGetRoomUserInfoEvent.addListener(this.getRoomUserInfoHandler, this);
        GamblingManager.guessHandler.onGuessCorrectlyEvent.addListener(this.showGuessCorrectlyRemind, this);
    };
    GamblingPanelInfoRefreshSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.PlayerStateChangeEvent.removeListener(this.playerStateChangeHandler, this);
        GamblingManager.BlindChangeEvent.removeListener(this.blindChangeHandler, this);
        GamblingManager.NextRoundStartEvent.removeListener(this.onNextRoundStartEvent, this);
        GamblingManager.OnGetRoomUserInfoEvent.removeListener(this.getRoomUserInfoHandler, this);
        GamblingManager.guessHandler.onGuessCorrectlyEvent.removeListener(this.showGuessCorrectlyRemind, this);
        qin.Tick.RemoveTimeoutInvoke(this.closeGuessCorrectlyRemind, this);
    };
    GamblingPanelInfoRefreshSupport.prototype.playerStateChangeHandler = function () {
        this.refreshPotLabel();
    };
    GamblingPanelInfoRefreshSupport.prototype.blindChangeHandler = function () {
        this.refreshBlindLabel();
    };
    GamblingPanelInfoRefreshSupport.prototype.onNextRoundStartEvent = function () {
        this.refreshBlindLabel();
    };
    GamblingPanelInfoRefreshSupport.prototype.getRoomUserInfoHandler = function (roleId) {
        var headComponent = this.target.getHeadComponentByRole(roleId);
        if (headComponent) {
            headComponent.showHead();
        }
        else {
            qin.Console.log("该玩家的头像组件未找到！" + roleId);
        }
    };
    GamblingPanelInfoRefreshSupport.prototype.refreshPotLabel = function () {
        this.target.potLabel.text = qin.MathUtil.formatNum(GamblingManager.showPotChips);
        // egret.callLater(this.refreshPotGroupPos, this);
    };
    GamblingPanelInfoRefreshSupport.prototype.refreshPotGroupPos = function () {
        // this.target.potGroup.x = (this.target.potGroup.parent.width - this.target.potGroup.width) / 2;
    };
    GamblingPanelInfoRefreshSupport.prototype.refreshBlindLabel = function () {
        this.target.usualblindLabel.text = qin.MathUtil.formatNum(GamblingManager.roomInfo.sBlind) + "/" + qin.MathUtil.formatNum(GamblingManager.roomInfo.bBlind);
        this.target.anteLabel.text = qin.MathUtil.formatNum(GamblingManager.roomInfo.ante);
        // this.target.anteLabel.text = qin.MathUtil.formatNum(100000);
        if (GamblingManager.roomInfo.ante > 0) 
        // if (100000 > 0)
        {
            this.target.anteGroup.visible = true;
            egret.callLater(this.refreshPos, this, true);
        }
        else {
            egret.callLater(this.refreshPos, this, false);
            this.target.anteGroup.visible = false;
        }
    };
    GamblingPanelInfoRefreshSupport.prototype.refreshPos = function (bool) {
        this.target.roomIdGroup.visible = true;
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.gamblingType == GamblingType.Match) {
            this.target.roomIdGroup.visible = false;
            if (bool) {
                var totalW = this.target.usualBlindGroup.width + this.target.anteGroup.width + this._gap2;
                var startPosX = (this.target.gameGroup.width - totalW) / 2;
                this.target.usualBlindGroup.x = startPosX;
                this.target.anteGroup.x = startPosX + this.target.usualBlindGroup.width + this._gap2;
            }
            else {
                var startPosX = (this.target.gameGroup.width - this.target.usualBlindGroup.width) / 2;
                this.target.usualBlindGroup.x = startPosX;
            }
        }
        else {
            if (bool) {
                var totalW = this.target.roomIdGroup.width + this.target.usualBlindGroup.width + this.target.anteGroup.width + this._gap1 * 2;
                var startPosX = (this.target.gameGroup.width - totalW) / 2;
                this.target.roomIdGroup.x = startPosX;
                this.target.usualBlindGroup.x = startPosX + this.target.roomIdGroup.width + this._gap1;
                this.target.anteGroup.x = this.target.usualBlindGroup.x + this.target.usualBlindGroup.width + this._gap1;
            }
            else {
                var totalW = this.target.roomIdGroup.width + this.target.usualBlindGroup.width + this._gap2;
                var startPosX = (this.target.gameGroup.width - totalW) / 2;
                this.target.roomIdGroup.x = startPosX;
                this.target.usualBlindGroup.x = startPosX + this.target.roomIdGroup.width + this._gap2;
            }
        }
    };
    /**
     * 显示中奖提示
    */
    GamblingPanelInfoRefreshSupport.prototype.showGuessCorrectlyRemind = function () {
        this.target.guessCorrectlyGroup.visible = true;
        qin.Tick.AddTimeoutInvoke(this.closeGuessCorrectlyRemind, 1500, this);
    };
    /**
     * 关闭中奖提示
    */
    GamblingPanelInfoRefreshSupport.prototype.closeGuessCorrectlyRemind = function () {
        qin.Tick.RemoveTimeoutInvoke(this.closeGuessCorrectlyRemind, this);
        this.target.guessCorrectlyGroup.visible = false;
    };
    return GamblingPanelInfoRefreshSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelInfoRefreshSupport.prototype, "GamblingPanelInfoRefreshSupport");
//# sourceMappingURL=GamblingPanelInfoRefreshSupport.js.map