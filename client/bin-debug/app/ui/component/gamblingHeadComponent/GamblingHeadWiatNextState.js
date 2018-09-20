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
 * 等待下一局 后继状态 -------> 一局开始状态|站起
 */
var GamblingHeadWiatNextState = (function (_super) {
    __extends(GamblingHeadWiatNextState, _super);
    function GamblingHeadWiatNextState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadWiatNextState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            this.context.infoLabel.visible = true;
            //等待状态
            this.context.chipsLabel.text = PlayerInfo.getStateDes(this.context.bindData.state);
            this.context.showMask(true);
            this.context.chipsSingleShowComponent.visible = false;
            // this.context.showCardFace(false);
            // if (this.context.bindData.userInfo)
            // {
            // this.context.infoLabel.text = this.context.bindData.userInfo.name;
            //	qin.QinLog.log("等待下一局显示筹码：" + this.context.bindData.bankRoll + this.context.bindData.userInfo.name);
            // }
            this.context.showStateGroup(false);
            this.context.showBankRoll();
            // this.context.chipsLabel.text = qin.MathUtil.formatNum(this.context.bindData.bankRoll);
            //qin.QinLog.log(this.context.bindData.userInfo.name + "等待下一局");
        }
    };
    return GamblingHeadWiatNextState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadWiatNextState.prototype, "GamblingHeadWiatNextState");
//# sourceMappingURL=GamblingHeadWiatNextState.js.map