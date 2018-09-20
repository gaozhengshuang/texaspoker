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
 * 比牌状态 后继状态---->等待下一局|站起
 */
var GamblingHeadThanTheCardState = (function (_super) {
    __extends(GamblingHeadThanTheCardState, _super);
    function GamblingHeadThanTheCardState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingHeadThanTheCardState.prototype.run = function (parms) {
        _super.prototype.run.call(this, parms);
        if (this.context.bindData) {
            this.context.showMask(false);
            this.context.showBase();
            this.context.showHaveCardImg(false);
            this.context.showCardFace(true);
            qin.Console.log("比牌状态显示手牌");
            if (!this._point1) {
                this._point1 = new egret.Point(55, 72);
                this._point2 = new egret.Point(80, 72);
                this._point3 = new egret.Point(105, 72);
                this._point4 = new egret.Point(130, 72);
            }
            if (this.context.bindData) {
                //	qin.QinLog.log(this.context.bindData.userInfo.name + "在比牌！");
            }
            if (GamblingUtil.isOmaha) {
                this.context.cardAnimationSpt.runThanTheCardAnim(this._point1, this._point2, this._point3, this._point4);
            }
            else {
                this.context.cardAnimationSpt.runThanTheCardAnim(this._point1, this._point2);
            }
        }
    };
    return GamblingHeadThanTheCardState;
}(BaseGamblingHeadState));
__reflect(GamblingHeadThanTheCardState.prototype, "GamblingHeadThanTheCardState");
//# sourceMappingURL=GamblingHeadThanTheCardState.js.map