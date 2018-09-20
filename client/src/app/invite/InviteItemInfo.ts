/**
 * 邀请奖励信息
*/
class InviteItemInfo
{
    /**
     * rewardId
    */
    public rewardId: number;
    /**
     * 标题描述
    */
    public des: string;
    /**
     *好友获得的奖励
    */
    public inviteesAward: number;
    /**
     *自己可获得的奖励
    */
    public inviterAward: number;
    /**
     * 自己 充值返利
    */
    public inviterDes: string;
    /**
     * 好友 充值返利
    */
    public inviteesDes: string;
}