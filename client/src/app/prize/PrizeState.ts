/**
 * 奖品状态
*/
enum PrizeState
{
    /**
     * 处理中 （等待发货或充值中）
    */
    Underway = 0,
    /**
     * 处理完成 （已发货或已充值）
    */
    Complete = 1,
    /**
     * 信息有误，已返回
    */
    InfoError = 2
}