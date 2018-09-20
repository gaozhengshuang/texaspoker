class FriendInfo extends BaseFriendInfo 
{
    /**
     * 金币数量
    */
    public gold: number;
    /**
     * 是否在线  不在线发送最后离线时间 在线为null
    */
    public offlineTime: number;
    /**
     * 是否已经赠送过金币  0未赠送  1已赠送
    */
    public giveGold: number;
    /**
     * 是否可以领取金币  0不可领取  1可领取   2已领取
    */
    public getGold: number;
}