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
 * 弃牌状态 后继状态----->亮牌|等待下一局|站起
 */
var GamblingHeadFoldState = (function (_super) {
    __extends(GamblingHeadFoldState, _super);
    function GamblingHeadFoldState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadFoldState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            this.context.showMask(true);
            this.context.showBase();
            this.context.showHaveCardImg(false);
            this.context.showBankRoll();
            this.context.refreshState();
            //qin.QinLog.log(this.context.bindData.userInfo.name + "已弃牌");
        }
    };
    return GamblingHeadFoldState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadFoldState.prototype, "GamblingHeadFoldState");
//# sourceMappingURL=GamblingHeadFoldState.js.map