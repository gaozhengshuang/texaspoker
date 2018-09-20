/**
 * 性别
 */
var Sex;
(function (Sex) {
    /**
     * 未知
     */
    Sex[Sex["Unknown"] = 0] = "Unknown";
    /**
     * 男性
     */
    Sex[Sex["Male"] = 1] = "Male";
    /**
     * 女性
     */
    Sex[Sex["Female"] = 2] = "Female";
})(Sex || (Sex = {}));
var VipType;
(function (VipType) {
    /**
     * 无会员
     */
    VipType[VipType["NoVip"] = 0] = "NoVip";
    /**
     * 普通会员
     */
    VipType[VipType["Vip"] = 1] = "Vip";
    /**
     * 年费会员
     */
    VipType[VipType["YearVip"] = 2] = "YearVip";
})(VipType || (VipType = {}));
/**
 * 玩家状态
 */
var UserState;
(function (UserState) {
    /**
     * 离线
     */
    UserState[UserState["Offline"] = 0] = "Offline";
    /**
     * 在大厅
     */
    UserState[UserState["InGamehall"] = 1] = "InGamehall";
    /**
     * 在游戏场
     */
    UserState[UserState["InGame"] = 2] = "InGame";
    /**
     * 在比赛场
     */
    UserState[UserState["InMatch"] = 3] = "InMatch";
    /**
     * 在百人大战
     */
    UserState[UserState["InHundredWar"] = 4] = "InHundredWar";
    /**
     * 在奥马哈
     */
    UserState[UserState["InOmaha"] = 5] = "InOmaha";
    /**
     * 在游戏场私人房
     */
    UserState[UserState["InGamePerson"] = 6] = "InGamePerson";
    /**
     * 在奥马哈私人房
     */
    UserState[UserState["InOmahaPerson"] = 7] = "InOmahaPerson";
})(UserState || (UserState = {}));
//# sourceMappingURL=UserEnum.js.map