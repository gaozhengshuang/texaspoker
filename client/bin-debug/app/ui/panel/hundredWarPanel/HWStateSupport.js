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
 * 百人大战状态支持
 */
var HWStateSupport = (function (_super) {
    __extends(HWStateSupport, _super);
    function HWStateSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWStateSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.target.alertLabel.visible = false;
        HundredWarManager.panelHandler.reqHundredWarNoSeatInfo(0, 12);
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.state != undefined) {
            if (HundredWarManager.roomInfo.state == HWState.Bet) {
                this.isOnBet = true;
                this.setCountDownTime();
                this.stateHandler(HundredWarManager.roomInfo.state);
            }
        }
    };
    HWStateSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        HundredWarManager.onRoomStateChangeEvent.addListener(this.onStateChange, this);
        HundredWarManager.onHideCardsEvent.addListener(this.showRestCountDown, this);
        HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.addListener(this.reqStartImm, this);
    };
    HWStateSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        HundredWarManager.onRoomStateChangeEvent.removeListener(this.onStateChange, this);
        HundredWarManager.onHideCardsEvent.removeListener(this.showRestCountDown, this);
        qin.Tick.RemoveSecondsInvoke(this.betCountDown, this);
        qin.Tick.RemoveSecondsInvoke(this.restCountDown, this);
        qin.Tick.RemoveTimeoutInvoke(this.reqNextRoundStart, this);
    };
    /**
     * 立即请求开始
    */
    HWStateSupport.prototype.reqStartImm = function (data) {
        HundredWarManager.panelHandler.OnGetHundredWarNoSeatInfoEvent.removeListener(this.reqStartImm, this);
        if (!data.playerNum) {
            data.playerNum = 0;
        }
        if (HundredWarManager.roomInfo.state == HWState.WaitNext) {
            if ((data.playerNum == 1 && HundredWarManager.isBanker(HundredWarManager.sysBanker.roleId) && HundredWarManager.roomInfo.playerList.length == 1) || (data.playerNum == 0 && HundredWarManager.isBanker(UserManager.userInfo.roleId) && HundredWarManager.roomInfo.playerList.length == 1)) {
                HundredWarManager.reqNextRoundStart();
            }
            else {
                this.target.alertLabel.visible = true;
                this.target.alertLabel.text = "请稍等";
            }
        }
    };
    /**
     * 百人大战状态变更推送
    */
    HWStateSupport.prototype.onStateChange = function () {
        this.setCountDownTime();
        this.stateHandler(HundredWarManager.roomInfo.state);
    };
    /**
     * 百人大战状态处理
    */
    HWStateSupport.prototype.stateHandler = function (state) {
        if (state == HWState.Bet) {
            this.target.alertLabel.visible = true;
            this.showBetCountDown();
        }
    };
    /**
     * 设置化倒计时时间
    */
    HWStateSupport.prototype.setCountDownTime = function () {
        if (HundredWarManager.roomInfo.definition) {
            if (HundredWarManager.roomInfo.state == HWState.Bet) {
                if (HundredWarManager.roomInfo.stateTime) {
                    this._betCountDownTime = HundredWarManager.roomInfo.definition.betTime - (Math.ceil(TimeManager.GetServerUtcTimestamp() - HundredWarManager.roomInfo.stateTime));
                }
                else {
                    this._betCountDownTime = HundredWarManager.roomInfo.definition.betTime;
                }
            }
            else {
                if (HundredWarManager.roomInfo.stateTime) {
                    this._restCountDownTime = HundredWarManager.roomInfo.definition.waitTime - (Math.ceil(TimeManager.GetServerUtcTimestamp() - HundredWarManager.roomInfo.stateTime));
                }
                else {
                    this._restCountDownTime = HundredWarManager.roomInfo.definition.waitTime;
                }
            }
        }
    };
    /**
     * 显示下注倒计时
    */
    HWStateSupport.prototype.showBetCountDown = function () {
        qin.Tick.RemoveSecondsInvoke(this.restCountDown, this);
        this.betCountDown();
        this.isOnBet = true;
        qin.Tick.AddSecondsInvoke(this.betCountDown, this);
    };
    /**
     * 下注倒计时
    */
    HWStateSupport.prototype.betCountDown = function () {
        if (this._betCountDownTime >= 0) {
            var headCom = this.target.getHeadComponent(0);
            if (headCom && headCom.bindData && headCom.bindData.roleId == UserManager.userInfo.roleId) {
                this.target.alertLabel.text = "等待其他玩家下注..." + this._betCountDownTime;
            }
            else {
                this.target.alertLabel.text = "开始下注..." + this._betCountDownTime;
            }
        }
        this._betCountDownTime--;
        if (this._betCountDownTime < 0) {
            this.target.alertLabel.visible = false;
            this.isOnBet = false;
            qin.Tick.RemoveSecondsInvoke(this.betCountDown, this);
        }
    };
    /**
     * 进行休息倒计时
    */
    HWStateSupport.prototype.proceedRestCountDown = function () {
        qin.Tick.RemoveSecondsInvoke(this.betCountDown, this);
        this.restCountDown();
        qin.Tick.AddSecondsInvoke(this.restCountDown, this);
    };
    /**
     * 显示休息倒计时
    */
    HWStateSupport.prototype.showRestCountDown = function () {
        this.target.alertLabel.visible = true;
        this.proceedRestCountDown();
    };
    /**
     * 休息倒计时
    */
    HWStateSupport.prototype.restCountDown = function () {
        if (this._restCountDownTime >= 0) {
            this.target.alertLabel.text = "等候中..." + this._restCountDownTime;
        }
        this._restCountDownTime--;
        if (this._restCountDownTime < 0) {
            this.target.alertLabel.visible = false;
            qin.Tick.AddTimeoutInvoke(this.reqNextRoundStart, 1000, this);
            qin.Tick.RemoveSecondsInvoke(this.restCountDown, this);
        }
    };
    /**
     * 请求下一局开始
    */
    HWStateSupport.prototype.reqNextRoundStart = function () {
        HundredWarManager.reqNextRoundStart();
    };
    return HWStateSupport;
}(BaseHWPanelSupport));
__reflect(HWStateSupport.prototype, "HWStateSupport");
//# sourceMappingURL=HWStateSupport.js.map