var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginMode;
(function (LoginMode) {
    /// <summary>
    /// 游客登录
    /// </summary>
    LoginMode[LoginMode["Guest"] = 0] = "Guest";
    /// <summary>
    /// 账号登录
    /// </summary>
    LoginMode[LoginMode["Account"] = 1] = "Account";
    /// <summary>
    /// token登录
    /// </summary>
    LoginMode[LoginMode["Token"] = 2] = "Token";
    /// <summary>
    /// token调试登录
    /// </summary>
    LoginMode[LoginMode["TokenDebug"] = 3] = "TokenDebug";
})(LoginMode || (LoginMode = {}));
/**
 * 文本信息ID
 */
var TextFixedId;
(function (TextFixedId) {
    TextFixedId[TextFixedId["None"] = 0] = "None";
    /**
     * 用户协议
     */
    TextFixedId[TextFixedId["UserAngreement"] = 1] = "UserAngreement";
    /**
     * 手牌竞猜帮助
    */
    TextFixedId[TextFixedId["GuessHelp"] = 3] = "GuessHelp";
    /**
     * 百人大战规则
     */
    TextFixedId[TextFixedId["HundredWarRule"] = 4] = "HundredWarRule";
    /**
     * 百人大战奖池说明
     */
    TextFixedId[TextFixedId["HundredWarPrize"] = 5] = "HundredWarPrize";
    /**
     * 引导玩法
     */
    TextFixedId[TextFixedId["GuidePlayWay"] = 7] = "GuidePlayWay";
    /**
    * 玩法
    */
    TextFixedId[TextFixedId["PlayWay"] = 2] = "PlayWay";
    /**
     * 版本信息
     */
    TextFixedId[TextFixedId["Version"] = 201] = "Version";
    /**
     * 信息
     */
    TextFixedId[TextFixedId["Info"] = 301] = "Info";
    /**
     * 论坛
     */
    TextFixedId[TextFixedId["Forum"] = 302] = "Forum";
    /**
     * QQ群
     */
    TextFixedId[TextFixedId["QQ"] = 303] = "QQ";
    /**
     * 客服电话
     */
    TextFixedId[TextFixedId["CustomerService"] = 304] = "CustomerService";
    /**
     * 欢乐豪礼说明
     */
    TextFixedId[TextFixedId["HappyGiftHelp"] = 8] = "HappyGiftHelp";
})(TextFixedId || (TextFixedId = {}));
var FriendReceiveType;
(function (FriendReceiveType) {
    /**
    * 拒绝
    */
    FriendReceiveType[FriendReceiveType["Reject"] = 0] = "Reject";
    /**
     * 接受
    */
    FriendReceiveType[FriendReceiveType["Receive"] = 1] = "Receive";
})(FriendReceiveType || (FriendReceiveType = {}));
/**
 * 道具固定id
 */
var ItemFixedId;
(function (ItemFixedId) {
    /**
     * 金币
     */
    ItemFixedId[ItemFixedId["gold"] = 1] = "gold";
    /**
     * 钻石
     */
    ItemFixedId[ItemFixedId["diamond"] = 2] = "diamond";
    /**
     * vip经验
     */
    ItemFixedId[ItemFixedId["vipExp"] = 3] = "vipExp";
    /**
     * 经验
     */
    ItemFixedId[ItemFixedId["exp"] = 4] = "exp";
    /**
     * vip
     */
    ItemFixedId[ItemFixedId["vip"] = 5] = "vip";
    /**
     * 年vip
     */
    ItemFixedId[ItemFixedId["yearVip"] = 6] = "yearVip";
    /**
     * 金豆
     */
    ItemFixedId[ItemFixedId["GoldenBean"] = 402] = "GoldenBean";
})(ItemFixedId || (ItemFixedId = {}));
var FriendInfoType;
(function (FriendInfoType) {
    /**
     * 接收好友申请
     */
    FriendInfoType[FriendInfoType["Receive"] = 1] = "Receive";
    /**
     * 发送好友申请
     */
    FriendInfoType[FriendInfoType["Send"] = 2] = "Send";
})(FriendInfoType || (FriendInfoType = {}));
var CostType;
(function (CostType) {
    /**
     * 消耗类型为金币
    */
    CostType[CostType["Gold"] = 1] = "Gold";
    /**
     * 消耗类型为钻石
    */
    CostType[CostType["Diamond"] = 3] = "Diamond";
    /**
     * 消耗类型为人民币
    */
    CostType[CostType["RMB"] = 10] = "RMB";
})(CostType || (CostType = {}));
var SafeBoxOperateType;
(function (SafeBoxOperateType) {
    /**
     * 保险箱存入
    */
    SafeBoxOperateType[SafeBoxOperateType["Save"] = 1] = "Save";
    /**
     * 保险箱取出
    */
    SafeBoxOperateType[SafeBoxOperateType["Withdraw"] = 2] = "Withdraw";
})(SafeBoxOperateType || (SafeBoxOperateType = {}));
/**
 * 头像上传的系统类型
 */
var HeadUploadSystemType = (function () {
    function HeadUploadSystemType() {
    }
    /**
     * 浏览器
     */
    HeadUploadSystemType.web = "web";
    /**
     * 原生系统
     */
    HeadUploadSystemType.native = "native";
    return HeadUploadSystemType;
}());
__reflect(HeadUploadSystemType.prototype, "HeadUploadSystemType");
/**
 * 自己在的房间类型枚举
*/
var InsideRoomType;
(function (InsideRoomType) {
    /**
     * 无
     */
    InsideRoomType[InsideRoomType["None"] = 0] = "None";
    /**
     * 游戏场
    */
    InsideRoomType[InsideRoomType["Game"] = 1] = "Game";
    /**
     * 百人大战
     */
    InsideRoomType[InsideRoomType["HundredWar"] = 2] = "HundredWar";
    /**
     * 锦标赛
     */
    InsideRoomType[InsideRoomType["Match"] = 3] = "Match";
    /**
     * 奥马哈
     */
    InsideRoomType[InsideRoomType["Omaha"] = 4] = "Omaha";
    /**
     * 游戏场私人房
     */
    InsideRoomType[InsideRoomType["GamePerson"] = 5] = "GamePerson";
    /**
     * 奥马哈私人房
     */
    InsideRoomType[InsideRoomType["OmahaPerson"] = 6] = "OmahaPerson";
})(InsideRoomType || (InsideRoomType = {}));
/**
 * 系统时间类型
 */
var SystemTimeType;
(function (SystemTimeType) {
    /**
     * 一大块的时间跨度
    */
    SystemTimeType[SystemTimeType["Normal"] = 1] = "Normal";
    /**
     * 每天
    */
    SystemTimeType[SystemTimeType["EveryDay"] = 2] = "EveryDay";
    /**
     * 星期的表现方式
    */
    SystemTimeType[SystemTimeType["Week"] = 3] = "Week";
})(SystemTimeType || (SystemTimeType = {}));
/**
 * 比赛类型
*/
var MatchType;
(function (MatchType) {
    /**
     * 锦标赛
    */
    MatchType[MatchType["MTT"] = 1] = "MTT";
    /**
     * 坐满即玩
    */
    MatchType[MatchType["SNG"] = 2] = "SNG";
})(MatchType || (MatchType = {}));
/**
 * 支付状态
 */
var PayState = (function () {
    function PayState() {
    }
    /**
     * 正常处理
     */
    PayState.Normal = 0;
    /**
     * 全部混合使用
     */
    PayState.Mixed = 1;
    /**
     * 只用第三方的
     */
    PayState.Third = 2;
    /**
     * 关闭
     */
    PayState.Close = 3;
    return PayState;
}());
__reflect(PayState.prototype, "PayState");
/**
 * 更多玩法
 */
var MorePlay;
(function (MorePlay) {
    /**
     * 奥马哈
     */
    MorePlay[MorePlay["Omaha"] = 1] = "Omaha";
    /**
     * 百人大战
     */
    MorePlay[MorePlay["HundredWar"] = 2] = "HundredWar";
})(MorePlay || (MorePlay = {}));
//# sourceMappingURL=GameEnums.js.map