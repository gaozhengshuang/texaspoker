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
 * 已经说过话的状态不包括弃牌 后继状态 ----> 等待说话|弃牌|比牌|站起
 */
var GamblingHeadActionedState = (function (_super) {
    __extends(GamblingHeadActionedState, _super);
    function GamblingHeadActionedState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadActionedState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            this.context.showBase();
            this.context.showMask(false);
            // if (this.context.bindData.state == PlayerState.Blind && this.context.bindData.userInfo)
            // {
            // 	this.context.infoLabel.text = this.context.bindData.userInfo.name;
            // }
            this.context.refreshState();
            this.context.showBankRoll();
            //qin.QinLog.log(this.context.bindData.userInfo.name + "已说话" + this.context.infoLabel.text);
        }
    };
    return GamblingHeadActionedState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadActionedState.prototype, "GamblingHeadActionedState");
//# sourceMappingURL=GamblingHeadActionedState.js.map