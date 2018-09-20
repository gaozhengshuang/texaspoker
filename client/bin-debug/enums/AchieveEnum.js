/**
 * 成就/任务组
 */
var AchieveGroup;
(function (AchieveGroup) {
    /**
     * 金币达人
     */
    AchieveGroup[AchieveGroup["GoldGroup"] = 101] = "GoldGroup";
    /**
     * 好友达人
     */
    AchieveGroup[AchieveGroup["FriendGroup"] = 121] = "FriendGroup";
    /**
     * 等级达人
     */
    AchieveGroup[AchieveGroup["LevelGroup"] = 141] = "LevelGroup";
    /**
     * 对子达人
     */
    AchieveGroup[AchieveGroup["OnePairGroup"] = 161] = "OnePairGroup";
    /**
     * 两对达人
     */
    AchieveGroup[AchieveGroup["TwoPairsGroup"] = 181] = "TwoPairsGroup";
    /**
     * 三条达人
     */
    AchieveGroup[AchieveGroup["ThreeOfAKindGroup"] = 201] = "ThreeOfAKindGroup";
    /**
     * 顺子达人
     */
    AchieveGroup[AchieveGroup["StraightGroup"] = 221] = "StraightGroup";
    /**
     * 同花达人
     */
    AchieveGroup[AchieveGroup["FlushGroup"] = 241] = "FlushGroup";
    /**
     * 葫芦达人
     */
    AchieveGroup[AchieveGroup["FullhouseGroup"] = 261] = "FullhouseGroup";
    /**
     * 四条达人
     */
    AchieveGroup[AchieveGroup["FourOfAKindGroup"] = 281] = "FourOfAKindGroup";
    /**
     * 同花顺达人
     */
    AchieveGroup[AchieveGroup["StraightFlushGroup"] = 301] = "StraightFlushGroup";
    /**
     * 皇家同花顺达人
     */
    AchieveGroup[AchieveGroup["RoyalFlushGroup"] = 321] = "RoyalFlushGroup";
    /**
     * 初级场对局
     */
    AchieveGroup[AchieveGroup["PrimaryPatternGroup"] = 1001] = "PrimaryPatternGroup";
    /**
     * 中级场对局
    */
    AchieveGroup[AchieveGroup["MiddlePatternGroup"] = 1021] = "MiddlePatternGroup";
    /**
     * 高级场对局
    */
    AchieveGroup[AchieveGroup["HighPatternGroup"] = 1041] = "HighPatternGroup";
    /**
     * 成功参与MTT锦标赛
     */
    AchieveGroup[AchieveGroup["JoinMTTGroup"] = 1061] = "JoinMTTGroup";
    /**
     * 胜利
     */
    AchieveGroup[AchieveGroup["WinGroup"] = 2001] = "WinGroup";
    /**
     * 在MTT锦标赛内赢次冠军
     */
    AchieveGroup[AchieveGroup["WinMTTGroup"] = 2021] = "WinMTTGroup";
    /**
     * 等级提升
     */
    AchieveGroup[AchieveGroup["LevelUpGroup"] = 3001] = "LevelUpGroup";
    /**
     * 百人大战欢乐场对局
     */
    AchieveGroup[AchieveGroup["HWFunPatternGroup"] = 1081] = "HWFunPatternGroup";
    /**
     * 百人大战富豪场对局
     */
    AchieveGroup[AchieveGroup["HWRichPatternGroup"] = 1101] = "HWRichPatternGroup";
    /**
     * 百人大战胜利
     */
    AchieveGroup[AchieveGroup["WinHWGroup"] = 2041] = "WinHWGroup";
})(AchieveGroup || (AchieveGroup = {}));
/**
 * 成就类型
 */
var AchieveType;
(function (AchieveType) {
    /**
     * 牌局结束
     */
    AchieveType[AchieveType["PlayOver"] = 0] = "PlayOver";
    /**
     * 金币
     */
    AchieveType[AchieveType["Gold"] = 1] = "Gold";
    /**
     * 好友
     */
    AchieveType[AchieveType["Friend"] = 2] = "Friend";
    /**
     * 等级
     */
    AchieveType[AchieveType["Level"] = 3] = "Level";
    /**
     * 牌型
     */
    AchieveType[AchieveType["CardType"] = 4] = "CardType";
    /**
     * 注册并登录游戏
     */
    AchieveType[AchieveType["Register"] = 5] = "Register";
    /**
     * 下载手机APP（使用APP登录）
     */
    AchieveType[AchieveType["DownLoadApp"] = 6] = "DownLoadApp";
    /**
     * 绑定邀请码额外获得，参数1：进度（前置任务数）参数2：前置任务
     */
    AchieveType[AchieveType["BindInviteExtra"] = 7] = "BindInviteExtra";
    /**
     *  游戏场（初级场，中级场，高级场）
     */
    AchieveType[AchieveType["PlayPattern"] = 101] = "PlayPattern";
    /**
     * mtt锦标赛成功参与
     */
    AchieveType[AchieveType["PlayMtt"] = 102] = "PlayMtt";
    /**
     * 胜利
     */
    AchieveType[AchieveType["Win"] = 201] = "Win";
    /**
     * mtt锦标赛获得冠军
     */
    AchieveType[AchieveType["WinMtt"] = 202] = "WinMtt";
    /**
     * 参与百人大战
     */
    AchieveType[AchieveType["PlayHundredWar"] = 301] = "PlayHundredWar";
    /**
     * 百人大战胜利
     */
    AchieveType[AchieveType["WinHundredWar"] = 303] = "WinHundredWar";
})(AchieveType || (AchieveType = {}));
/**
 * 星期枚举
 */
var WeekDay;
(function (WeekDay) {
    WeekDay[WeekDay["Sunday"] = 0] = "Sunday";
    WeekDay[WeekDay["Monday"] = 1] = "Monday";
    WeekDay[WeekDay["Tuesday"] = 2] = "Tuesday";
    WeekDay[WeekDay["Wednesday"] = 3] = "Wednesday";
    WeekDay[WeekDay["Thursday"] = 4] = "Thursday";
    WeekDay[WeekDay["Friday"] = 5] = "Friday";
    WeekDay[WeekDay["Saturday"] = 6] = "Saturday";
})(WeekDay || (WeekDay = {}));
/**
 * 任务显示场次
 */
var AchieveShowPattern;
(function (AchieveShowPattern) {
    /**
     * 全部
     */
    AchieveShowPattern[AchieveShowPattern["All"] = 0] = "All";
    /**
     * 初级场
    */
    AchieveShowPattern[AchieveShowPattern["PrimaryPattern"] = 1] = "PrimaryPattern";
    /**
     * 中级场
    */
    AchieveShowPattern[AchieveShowPattern["MiddlePattern"] = 2] = "MiddlePattern";
    /**
     * 高级场
    */
    AchieveShowPattern[AchieveShowPattern["HighPattern"] = 3] = "HighPattern";
    /**
     * 全部场
     */
    AchieveShowPattern[AchieveShowPattern["AllPattern"] = 4] = "AllPattern";
    /**
     * 比赛场
     */
    AchieveShowPattern[AchieveShowPattern["Match"] = 21] = "Match";
    /**
     * 百人大战全部场
     */
    AchieveShowPattern[AchieveShowPattern["HundredWarAll"] = 40] = "HundredWarAll";
    /**
     * 百人大战欢乐场
     */
    AchieveShowPattern[AchieveShowPattern["HundredWarFun"] = 41] = "HundredWarFun";
    /**
     * 百人大战富豪场
     */
    AchieveShowPattern[AchieveShowPattern["HundredWarRich"] = 42] = "HundredWarRich";
})(AchieveShowPattern || (AchieveShowPattern = {}));
var AchieveTag;
(function (AchieveTag) {
    /**
     * 成就
     */
    AchieveTag[AchieveTag["Achievement"] = 0] = "Achievement";
    /**
     * 任务
     */
    AchieveTag[AchieveTag["Quest"] = 1] = "Quest";
})(AchieveTag || (AchieveTag = {}));
var AchieveDailyType;
(function (AchieveDailyType) {
    /**
     * 每日任务
     */
    AchieveDailyType[AchieveDailyType["Daily"] = 1] = "Daily";
    /**
     * 每周任务
     */
    AchieveDailyType[AchieveDailyType["Weekly"] = 2] = "Weekly";
    /**
     * 成长任务
     */
    AchieveDailyType[AchieveDailyType["GrowUp"] = 3] = "GrowUp";
})(AchieveDailyType || (AchieveDailyType = {}));
//# sourceMappingURL=AchieveEnum.js.map