/**
 * 红点通知类型
 */
var NotifyType;
(function (NotifyType) {
    NotifyType[NotifyType["Null"] = 0] = "Null";
    /**
     * 有已报名的锦标赛
     */
    NotifyType[NotifyType["Mtt_HaveJoinedList"] = 1] = "Mtt_HaveJoinedList";
    /**
     * 有新邮件/有未领取邮件
     */
    NotifyType[NotifyType["Mail_HaveNew"] = 2] = "Mail_HaveNew";
    /**
     * 系统邮件
     */
    NotifyType[NotifyType["Mail_HaveNewSystem"] = 3] = "Mail_HaveNewSystem";
    /**
     * 玩家邮件
     */
    NotifyType[NotifyType["Mail_HaveNewPlayer"] = 4] = "Mail_HaveNewPlayer";
    /**
     * 有未领取的每日任务
     */
    NotifyType[NotifyType["Achieve_HaveDaily"] = 5] = "Achieve_HaveDaily";
    /**
     * 有未领取的每周任务
     */
    NotifyType[NotifyType["Achieve_HaveWeekly"] = 6] = "Achieve_HaveWeekly";
    /**
     * 有未领取的成长任务
     */
    NotifyType[NotifyType["Achieve_HaveGrowUp"] = 7] = "Achieve_HaveGrowUp";
    /**
     * 有未领取的任务
     */
    NotifyType[NotifyType["Achieve_HaveNoTake"] = 8] = "Achieve_HaveNoTake";
    /**
     * 收到好友礼物
     */
    NotifyType[NotifyType["Friend_ReceivePrize"] = 9] = "Friend_ReceivePrize";
    /**
     * 有好友请求
     */
    NotifyType[NotifyType["Friend_HaveNew"] = 10] = "Friend_HaveNew";
    /**
     * 大厅好友按钮
     */
    NotifyType[NotifyType["Friend_Hall"] = 11] = "Friend_Hall";
    /**
     * 计时奖励按钮
    */
    NotifyType[NotifyType["Gambling_TimeAward"] = 12] = "Gambling_TimeAward";
    /**
     * 有初级场未领取任务
     */
    NotifyType[NotifyType["Achieve_PrimaryPattern"] = 13] = "Achieve_PrimaryPattern";
    /**
     * 有中级场未领取任务
     */
    NotifyType[NotifyType["Achieve_MiddlePattern"] = 14] = "Achieve_MiddlePattern";
    /**
     * 有高级场未领取任务
     */
    NotifyType[NotifyType["Achieve_HighPattern"] = 15] = "Achieve_HighPattern";
    /**
     * 百人大战聊天按钮
    */
    NotifyType[NotifyType["HundredWar_Chat"] = 16] = "HundredWar_Chat";
    /**
     * 月卡按钮
    */
    NotifyType[NotifyType["MonthCard"] = 17] = "MonthCard";
    /**
     * 签到
     */
    NotifyType[NotifyType["Signin"] = 18] = "Signin";
    /**
     * 有可领取的破产补助
     */
    NotifyType[NotifyType["BankruptSubsidy"] = 19] = "BankruptSubsidy";
    /**
     * 活动红点
     */
    NotifyType[NotifyType["ActivityRedPoint"] = 20] = "ActivityRedPoint";
    /**
     * 有可领取的邀请活动的奖励
     */
    NotifyType[NotifyType["Invite"] = 21] = "Invite";
    /**
     * 有可领取的新人礼
     */
    NotifyType[NotifyType["NewGift"] = 22] = "NewGift";
    /**
     * 有可用的分享抽奖次数
     */
    NotifyType[NotifyType["Share"] = 23] = "Share";
})(NotifyType || (NotifyType = {}));
//# sourceMappingURL=NotifyType.js.map