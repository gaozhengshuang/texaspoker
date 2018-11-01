/**
 * 百人大战结算信息
*/
class HundredWarOverInfo extends BaseServerValueInfo 
{
    /**
     * 赢取最多排名
    */
    public rankList: Array<msg.ITFRankPlayer>;
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
     * 坐下玩家列表
     */
    public sitplayers:msg.ITFPlayer[];

    public reset()
    {
        super.reset();
    }
}