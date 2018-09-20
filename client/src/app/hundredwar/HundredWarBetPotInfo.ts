/**
 * 百人大战注池信息
 */
class HWBetPotInfo extends BaseServerValueInfo 
{
    /**
     * 总下注筹码
    */
    public bet: number;
    /**
     * 牌
    */
    public cards: Array<CardInfo>;
    /**
     * 注池位置  0是庄家  其他从左向右1-4
    */
    public pos: number;
    /**
     * 自己下注的数量
    */
    public myBet: number;
    /**
     * 是否赢了   0输  1赢  2平
    */
    public win: HundredWarResultType;

    public reset()
    {
        super.reset();
    }
}
/**
 * 百人大战结果类型
*/
enum HundredWarResultType
{
    /**
     * 输
    */
    Lose = 0,
    /**
     * 赢
    */
    Win = 1,
    /**
     * 平
    */
    Dogfall = 2,
}
