/**
 * 奖品信息
*/
class PrizeInfo
{
    /**
     * 物品id
    */
    public itemId: number;
    /**
     * 订单id
    */
    public id: number;
    /**
     * 奖品状态   0等待发货  1已发货   2信息有误
    */
    public state: number;
    /**
     * 领取状态 1未领取   2已领取
    */
    public isGet: number;
    /**
     * 是实物还是虚拟
    */
    public effectType: number;
}