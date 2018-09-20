var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 头像组件状态执行接口 大部分的状态都可以直接切换到站起状态
 */
var BaseGamblingHeadState = (function () {
    function BaseGamblingHeadState(context) {
        this.context = context;
    }
    BaseGamblingHeadState.prototype.run = function (parms) {
        this.context.hideAll();
    };
    return BaseGamblingHeadState;
}());
__reflect(BaseGamblingHeadState.prototype, "BaseGamblingHeadState");
/**
 * 行牌流程头像状态枚举
 */
var GamblingHeadStateType;
(function (GamblingHeadStateType) {
    /**
     * 空状态 无人的
     */
    GamblingHeadStateType[GamblingHeadStateType["Empty"] = 0] = "Empty";
    /**
     * 坐下
     */
    GamblingHeadStateType[GamblingHeadStateType["SitDown"] = 1] = "SitDown";
    /**
     * 等待下一局
     */
    GamblingHeadStateType[GamblingHeadStateType["WaitNext"] = 2] = "WaitNext";
    /**
     * 牌局开始
     */
    GamblingHeadStateType[GamblingHeadStateType["RoundStart"] = 3] = "RoundStart";
    /**
     * 等待说话
     */
    GamblingHeadStateType[GamblingHeadStateType["WaitAction"] = 4] = "WaitAction";
    /**
     * 说话中
     */
    GamblingHeadStateType[GamblingHeadStateType["OnAction"] = 5] = "OnAction";
    /**
     * 已说话(不包括弃牌)
     */
    GamblingHeadStateType[GamblingHeadStateType["Actioned"] = 6] = "Actioned";
    /**
     * 弃牌
     */
    GamblingHeadStateType[GamblingHeadStateType["FoldCard"] = 7] = "FoldCard";
    /**
     * 比牌
     */
    GamblingHeadStateType[GamblingHeadStateType["ThanTheCard"] = 8] = "ThanTheCard";
})(GamblingHeadStateType || (GamblingHeadStateType = {}));
//# sourceMappingURL=BaseGamblingHeadState.js.map