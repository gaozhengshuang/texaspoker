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
 * 正在说话状态 后继状态 -----> 已说话|弃牌|站起
 */
var GamblingHeadOnActionState = (function (_super) {
    __extends(GamblingHeadOnActionState, _super);
    function GamblingHeadOnActionState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadOnActionState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            this.context.showMask(false);
            this.context.showStateGroup(false);
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.pos == this.context.bindData.pos) {
                // if (GamblingManager.roomInfo.posTime > 0)
                // {
                // 	let offsetTime: number = TimeManager.GetServerUtcTimestamp() - GamblingManager.roomInfo.posTime;
                // 	this._timeId = egret.setTimeout(this.actionTimeOut, this, offsetTime * 1000000);
                // 	// qin.Tick.getInstance().AddTimeoutInvoke(this.actionTimeOut, offsetTime * 10000, this);
                // }
                // else
                // {
                // 	// qin.Tick.getInstance().AddTimeoutInvoke(this.actionTimeOut, GamblingManager.roomInfo.definition.cd * 10000, this);
                // 	this._timeId = egret.setTimeout(this.actionTimeOut, this, GamblingManager.roomInfo.definition.cd * 1000000);
                // }
                var index = this.context.playerGroup.getChildIndex(this.context.haveCard1.parent);
                this.context.playerGroup.addChildAt(this.context.cdComponent, index);
                this.context.cdComponent.init(GamblingManager.roomInfo.definition.clientCd);
                this.context.cdComponent.start(GamblingManager.roomInfo.posTime, parms);
                this.context.showBase();
                if (this.context.bindData) {
                    // this.context.infoLabel.text = PlayerInfo.getStateDes(PlayerState.Action);
                    this.context.chipsLabel.text = qin.MathUtil.formatNum(this.context.bindData.bankRoll);
                    if (this.context.bindData.userInfo) {
                        qin.Console.log("说话状态显示筹码：" + this.context.bindData.bankRoll + this.context.bindData.userInfo.name);
                    }
                }
            }
            if (this.context.bindData && this.context.bindData.roleId == UserManager.userInfo.roleId) {
                if (this.context.cardFace1.visible == false || this.context.cardFace2.visible == false) {
                    qin.Console.log("异常处理说话状态自己还看不到手牌");
                    //this.context.showCardFace(true);
                }
            }
            //	qin.QinLog.log(this.context.bindData.userInfo.name + "在说话");
        }
    };
    return GamblingHeadOnActionState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadOnActionState.prototype, "GamblingHeadOnActionState");
//# sourceMappingURL=GamblingHeadOnActionState.js.map