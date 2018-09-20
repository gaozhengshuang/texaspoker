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
 * 一局开始状态 后继状态-------->发牌|站起
 */
var GamblingHeadRoundStartState = (function (_super) {
    __extends(GamblingHeadRoundStartState, _super);
    function GamblingHeadRoundStartState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadRoundStartState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            // this.context.infoLabel.visible = true;
            // this.context.chipsLabel.visible = true;
            this.context.showMask(false);
            this.context.chipsSingleShowComponent.visible = false;
            this.context.chipsLabel.text = qin.MathUtil.formatNum(this.context.bindData.bankRoll);
            this.context.showCardTypeBgFilter(0);
            // if (this.context.bindData.userInfo)
            // {
            // 	this.context.infoLabel.text = this.context.bindData.userInfo.name;
            // }
            this.context.showBankRoll();
            // this.context.chipsLabel.text = qin.MathUtil.formatNum(this.context.bindData.bankRoll);
            // qin.QinLog.log("一局开始显示筹码：" + this.context.bindData.bankRoll + this.context.bindData.userInfo.name);
            //	qin.QinLog.log(this.context.bindData.userInfo.name + "一局开始");
        }
    };
    return GamblingHeadRoundStartState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadRoundStartState.prototype, "GamblingHeadRoundStartState");
//# sourceMappingURL=GamblingHeadRoundStartState.js.map