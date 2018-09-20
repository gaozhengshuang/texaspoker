/**
 * 百人大战结算信息
*/
class HundredWarOverInfo extends BaseServerValueInfo 
{
    /**
     * 赢取最多排名
    */
    public rankList: Array<any>;
    /**
     * 注池信息
    */
    public betList: Array<HWBetPotInfo>;
    /**
     * 结算金币
    */
    public gold: number;
    /**
     * 奖池
    */
    public pool: number;
    /**
     * 是否胜利
     */
    public isWin:boolean;

    public reset()
    {
        super.reset();
    }
}