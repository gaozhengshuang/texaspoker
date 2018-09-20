var AwardExchangeErrorType;
(function (AwardExchangeErrorType) {
    /**
     * 没有错误
     */
    AwardExchangeErrorType[AwardExchangeErrorType["NoError"] = 0] = "NoError";
    /**
     * id为空
     */
    AwardExchangeErrorType[AwardExchangeErrorType["NullAward"] = 1] = "NullAward";
    /**
     * 超出次数
     */
    AwardExchangeErrorType[AwardExchangeErrorType["OverTimes"] = 2] = "OverTimes";
    /**
     * 超出结束时间
     */
    AwardExchangeErrorType[AwardExchangeErrorType["OverDate"] = 4] = "OverDate";
    /**
     * 时间还没有来
     */
    AwardExchangeErrorType[AwardExchangeErrorType["NotComeDate"] = 8] = "NotComeDate";
    /**
     * 等级不足
     */
    AwardExchangeErrorType[AwardExchangeErrorType["LevelNotEnough"] = 9] = "LevelNotEnough";
    /**
     * 前置兑换未完成
     */
    AwardExchangeErrorType[AwardExchangeErrorType["PreNotComplete"] = 10] = "PreNotComplete";
    /**
     * 不满足时间
     */
    AwardExchangeErrorType[AwardExchangeErrorType["NotInTime"] = 12] = "NotInTime";
})(AwardExchangeErrorType || (AwardExchangeErrorType = {}));
//# sourceMappingURL=AwardExchangeErrorType.js.map