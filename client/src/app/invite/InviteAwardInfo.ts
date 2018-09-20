/**
 *邀请奖励信息
 */
class InviteAwardInfo extends BaseServerValueInfo
{
    /**
     * 已获得金豆
    */
    public gotBean: number;
    /**
     * 未领取金豆
    */
    public getBean: number;
    /**
     * 已获得金币
    */
    public gotGold: number;
    /**
     * 未领取金币
    */
    public getGold: number;
    /**
     * 绑定玩家数目
    */
    public bind: number;
    /**
     * 完成新人礼人数
    */
    public finish: number;
    public reset()
    {
        this.gotBean = 0;
        this.getBean = 0;
        this.gotGold = 0;
        this.getGold = 0;
        this.bind = 0;
        this.finish = 0;
    }
}