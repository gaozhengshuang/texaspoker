enum AwardExchangeErrorType
{
    /**
     * 没有错误
     */
    NoError = 0,
    /**
     * id为空
     */
    NullAward = 1,
    /**
     * 超出次数
     */
    OverTimes = 2,
    /**
     * 超出结束时间
     */
    OverDate = 4,
    /**
     * 时间还没有来
     */
    NotComeDate = 8,
    /**
     * 等级不足
     */
    LevelNotEnough = 9,
    /**
     * 前置兑换未完成
     */
    PreNotComplete = 10,
    /**
     * 不满足时间
     */
    NotInTime = OverDate | NotComeDate
}