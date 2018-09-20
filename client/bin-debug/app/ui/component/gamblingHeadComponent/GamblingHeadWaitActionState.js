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
 * 等待说话状态 后继状态------>站起|说话
 */
var GamblingHeadWaitActionState = (function (_super) {
    __extends(GamblingHeadWaitActionState, _super);
    function GamblingHeadWaitActionState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadWaitActionState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            this.context.showMask(false);
            this.context.showBase();
            this.context.showStateGroupAuto();
            // this.context.showHaveCardImg(false);
            //	qin.QinLog.log(this.context.bindData.userInfo.name + "等待说话！");
        }
        // if (this.context.bindData && this.context.bindData.userInfo)
        // {
        // 	this.context.infoLabel.text = this.context.bindData.userInfo.name;
        // }
        this.context.showBankRoll();
    };
    return GamblingHeadWaitActionState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadWaitActionState.prototype, "GamblingHeadWaitActionState");
//# sourceMappingURL=GamblingHeadWaitActionState.js.map