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
 * 坐下状态  后继状态------->发牌|等待下一局|等待操作|说话|站起
 */
var GamblingHeadSitDownState = (function (_super) {
    __extends(GamblingHeadSitDownState, _super);
    function GamblingHeadSitDownState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadSitDownState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            this.context.showMask(true);
            this.context.showBase();
            this.context.chipsSingleShowComponent.visible = false;
            // if (this.context.bindData.userInfo)
            // {
            // 	this.context.infoLabel.text = this.context.bindData.userInfo.name;
            // }
            // this.context.chipsLabel.text = qin.MathUtil.formatNum(this.context.bindData.bankRoll);
            this.context.chipsLabel.text = PlayerInfo.getStateDes(this.context.bindData.state); //坐下等待
            this.context.showStateGroup(false);
            //qin.QinLog.log(this.context.bindData.userInfo.name + "刚坐下");
            //	qin.QinLog.log("坐下显示筹码：" + this.context.bindData.bankRoll + this.context.bindData.userInfo.name);
        }
    };
    return GamblingHeadSitDownState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadSitDownState.prototype, "GamblingHeadSitDownState");
//# sourceMappingURL=GamblingHeadSitDownState.js.map