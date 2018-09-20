var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 签到几天
 */
var SignInDay;
(function (SignInDay) {
    /**
     * 签到3天
    */
    SignInDay[SignInDay["SignInThree"] = 3] = "SignInThree";
    /**
     * 签到5天
    */
    SignInDay[SignInDay["SignInFive"] = 5] = "SignInFive";
    /**
     * 签到7天
    */
    SignInDay[SignInDay["SignInSeven"] = 7] = "SignInSeven";
})(SignInDay || (SignInDay = {}));
/**
 * 活动开启状态
 */
var ActivityOpenState;
(function (ActivityOpenState) {
    /**
     * 未知
     */
    ActivityOpenState[ActivityOpenState["None"] = 0] = "None";
    /**
     * 未开启
     */
    ActivityOpenState[ActivityOpenState["UnOpen"] = 1] = "UnOpen";
    /**
     * 已开启
     */
    ActivityOpenState[ActivityOpenState["Open"] = 2] = "Open";
    /**
     * 结束
     */
    ActivityOpenState[ActivityOpenState["End"] = 3] = "End";
})(ActivityOpenState || (ActivityOpenState = {}));
/**
 * 固定子类
 */
var ActivitySubType = (function () {
    function ActivitySubType() {
    }
    /**
     * 首充活动
     */
    ActivitySubType.firstPay = "firstPay";
    /**
     * 新人充值
     */
    ActivitySubType.newPayGift = "newPayGift";
    /**
     * 新人礼
     */
    ActivitySubType.NewGift = "newGift";
    return ActivitySubType;
}());
__reflect(ActivitySubType.prototype, "ActivitySubType");
/**
 * 活动类型
 */
var ActivityType = (function () {
    function ActivityType() {
    }
    /**
     * 纯图片活动
     */
    ActivityType.Img = "img";
    /**
     * 图片+文字获得
     */
    ActivityType.Des = "des";
    /**
     * 签到活动
     */
    ActivityType.Signin = "signin";
    /**
     * 充值活动
     */
    ActivityType.PayPrize = "payPrize";
    /**
     * 欢乐送好礼
     */
    ActivityType.HappyGift = "happyGift";
    /**
     * 拉霸
     */
    ActivityType.LaBa = "laBa";
    /**
     * 破产补助活动
     */
    ActivityType.BankruptSubsidy = "bankruptSubsidy";
    /**
     * 绑定大礼包
     */
    ActivityType.BindChannel = "bindChannel";
    /**
     * 累充活动
     */
    ActivityType.PilePrize = "pilePrize";
    /**
     * 分享活动
     */
    ActivityType.Share = "share";
    return ActivityType;
}());
__reflect(ActivityType.prototype, "ActivityType");
/**
 * 活动触发类型
 */
var ActivityTriggerType;
(function (ActivityTriggerType) {
    /**
     * 无
     */
    ActivityTriggerType[ActivityTriggerType["None"] = 0] = "None";
    /**
     * 点击组件触发
     */
    ActivityTriggerType[ActivityTriggerType["Click"] = 1] = "Click";
})(ActivityTriggerType || (ActivityTriggerType = {}));
/**
 * 德州转转转结果类型
*/
var ShimTaeYoonResultType;
(function (ShimTaeYoonResultType) {
    /**
     * 3个7
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["ThreeSev"] = 1] = "ThreeSev";
    /**
     * 3个BAR
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["ThreeBAR"] = 2] = "ThreeBAR";
    /**
     * 3个苹果
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["ThreeApple"] = 3] = "ThreeApple";
    /**
     * 3个铃铛
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["ThreeBell"] = 4] = "ThreeBell";
    /**
     * 3个葡萄
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["ThreeGrape"] = 5] = "ThreeGrape";
    /**
     * 3个柿子
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["ThreePersimmon"] = 6] = "ThreePersimmon";
    /**
     * 3个樱桃
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["ThreeCherry"] = 7] = "ThreeCherry";
    /**
     * 2个樱桃+任意其他除樱桃外1个
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["TwoCherry"] = 8] = "TwoCherry";
    /**
     * 1个樱桃+任意其他除樱桃外2个
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["OneCherry"] = 9] = "OneCherry";
    /**
     *没中奖
    */
    ShimTaeYoonResultType[ShimTaeYoonResultType["NoAward"] = 10] = "NoAward";
})(ShimTaeYoonResultType || (ShimTaeYoonResultType = {}));
/**
 * 德州转转转图片在滚动框的位置
*/
var ShimTaeYoonImgIndex;
(function (ShimTaeYoonImgIndex) {
    /**
     * 7
    */
    ShimTaeYoonImgIndex[ShimTaeYoonImgIndex["Sev"] = 0] = "Sev";
    /**
     * BAR
    */
    ShimTaeYoonImgIndex[ShimTaeYoonImgIndex["BAR"] = 1] = "BAR";
    /**
     * 苹果
    */
    ShimTaeYoonImgIndex[ShimTaeYoonImgIndex["Apple"] = 2] = "Apple";
    /**
     * 铃铛
    */
    ShimTaeYoonImgIndex[ShimTaeYoonImgIndex["Bell"] = 3] = "Bell";
    /**
     * 葡萄
    */
    ShimTaeYoonImgIndex[ShimTaeYoonImgIndex["Grape"] = 4] = "Grape";
    /**
     * 柿子
    */
    ShimTaeYoonImgIndex[ShimTaeYoonImgIndex["Persimmon"] = 5] = "Persimmon";
    /**
     * 樱桃
    */
    ShimTaeYoonImgIndex[ShimTaeYoonImgIndex["Cherry"] = 6] = "Cherry";
    /**
     * ?
    */
    ShimTaeYoonImgIndex[ShimTaeYoonImgIndex["Que"] = 7] = "Que";
})(ShimTaeYoonImgIndex || (ShimTaeYoonImgIndex = {}));
//# sourceMappingURL=ActivityEnum.js.map