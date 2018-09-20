/**
 * 邀请活动绑定列表信息
*/
class InviteBindInfo extends BaseServerValueInfo
{
    /**
     * id
    */
    public id: number;
    /**
     * 时间
    */
    public time: number;
    /**
     * 用户昵称
    */
    public name: string;
    /**
     * 用户id
    */
    public roleId: number;
    /**
     * 是否完成新人礼 0未完成  1完成
    */
    public done: number;
    /**
     * 获得金币
    */
    public gold: number;
}