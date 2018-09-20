/**
 * 排行榜类型
 */
var RankType;
(function (RankType) {
    /**
     * 财富
     */
    RankType[RankType["Gold"] = 1] = "Gold";
    /**
     * 好友财富
     */
    RankType[RankType["FriendGold"] = 2] = "FriendGold";
    /**
     * 等级
     */
    RankType[RankType["Level"] = 3] = "Level";
    /**
     * 好友等级
     */
    RankType[RankType["FriendLevel"] = 4] = "FriendLevel";
    /**
     * Vip
     */
    RankType[RankType["Vip"] = 5] = "Vip";
    /**
     * 活动排行榜
    */
    RankType[RankType["Activity"] = 100] = "Activity";
})(RankType || (RankType = {}));
/**
 * 欢乐豪礼排行子类型
 */
var HappyGiftRankSubType;
(function (HappyGiftRankSubType) {
    /**
     * 总榜
     */
    HappyGiftRankSubType[HappyGiftRankSubType["All"] = 1] = "All";
    /**
     * 好友榜
     */
    HappyGiftRankSubType[HappyGiftRankSubType["Friend"] = 2] = "Friend";
})(HappyGiftRankSubType || (HappyGiftRankSubType = {}));
/**
 * 德州转转转活动子类型
 */
var ShimTaeYoonRankType;
(function (ShimTaeYoonRankType) {
    /**
     * 今天
     */
    ShimTaeYoonRankType[ShimTaeYoonRankType["Today"] = 0] = "Today";
    /**
     * 昨天
     */
    ShimTaeYoonRankType[ShimTaeYoonRankType["Yesterday"] = 1] = "Yesterday";
})(ShimTaeYoonRankType || (ShimTaeYoonRankType = {}));
var RankName;
(function (RankName) {
    /**
     * 冠军
     */
    RankName[RankName["Champion"] = 1] = "Champion";
    /**
     * 亚军
     */
    RankName[RankName["Runnerup"] = 2] = "Runnerup";
    /**
     * 季军
     */
    RankName[RankName["Third"] = 3] = "Third";
})(RankName || (RankName = {}));
var RankChange;
(function (RankChange) {
    /**
     * 不变
     */
    RankChange[RankChange["NoChange"] = 1] = "NoChange";
    /**
     * 上升
     */
    RankChange[RankChange["Up"] = 2] = "Up";
    /**
     * 下降
     */
    RankChange[RankChange["Down"] = 3] = "Down";
})(RankChange || (RankChange = {}));
//# sourceMappingURL=RankEnum.js.map