/**
 * 奖品状态
*/
var PrizeState;
(function (PrizeState) {
    /**
     * 处理中 （等待发货或充值中）
    */
    PrizeState[PrizeState["Underway"] = 0] = "Underway";
    /**
     * 处理完成 （已发货或已充值）
    */
    PrizeState[PrizeState["Complete"] = 1] = "Complete";
    /**
     * 信息有误，已返回
    */
    PrizeState[PrizeState["InfoError"] = 2] = "InfoError";
})(PrizeState || (PrizeState = {}));
//# sourceMappingURL=PrizeState.js.map