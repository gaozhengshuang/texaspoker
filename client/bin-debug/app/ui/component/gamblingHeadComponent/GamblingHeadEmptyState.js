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
 * 空状态 后继状态 --->坐下
 */
var GamblingHeadEmptyState = (function (_super) {
    __extends(GamblingHeadEmptyState, _super);
    function GamblingHeadEmptyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadEmptyState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            qin.Console.log(this.context.bindData.userInfo.name + "已站起");
        }
        this.context.showMask(true);
        this.context.setEmpty();
    };
    return GamblingHeadEmptyState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadEmptyState.prototype, "GamblingHeadEmptyState");
//# sourceMappingURL=GamblingHeadEmptyState.js.map