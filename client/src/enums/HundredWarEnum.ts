/**
 * 百人大战类型
 */
enum HundredWarType
{
    /**
     * 欢乐场
     */
    FunPattern = 1,
    /**
     * 富豪场
     */
    RichPattern = 2
}

/**
 * 百人大战状态
*/
enum HWState
{
    /**
     * 等待下一局
    */
    WaitNext = 0,
    /**
     * 下注阶段
    */
    Bet = 1,
}