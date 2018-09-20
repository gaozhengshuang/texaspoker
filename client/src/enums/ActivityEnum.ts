/**
 * 签到几天
 */
enum SignInDay
{
	/**
	 * 签到3天
	*/
	SignInThree = 3,
	/**
	 * 签到5天
	*/
	SignInFive = 5,
	/**
	 * 签到7天
	*/
	SignInSeven = 7,
}
/**
 * 活动开启状态
 */
enum ActivityOpenState
{
	/**
	 * 未知
	 */
	None = 0,
	/**
	 * 未开启
	 */
	UnOpen = 1,
	/**
	 * 已开启
	 */
	Open = 2,
	/**
	 * 结束
	 */
	End = 3,
}
/**
 * 固定子类
 */
class ActivitySubType
{
	/**
	 * 首充活动
	 */
	public static firstPay = "firstPay";
	/**
	 * 新人充值
	 */
	public static newPayGift = "newPayGift";
	/**
	 * 新人礼
	 */
	public static NewGift: string = "newGift";
}
/**
 * 活动类型
 */
class ActivityType
{
    /**
     * 纯图片活动
     */
	public static Img: string = "img";
    /**
     * 图片+文字获得
     */
	public static Des: string = "des";
    /**
     * 签到活动
     */
	public static Signin: string = "signin";
    /**
     * 充值活动
     */
	public static PayPrize: string = "payPrize";
    /**
     * 欢乐送好礼
     */
	public static HappyGift: string = "happyGift";
    /**
     * 拉霸
     */
	public static LaBa: string = "laBa";
	/**
	 * 破产补助活动
	 */
	public static BankruptSubsidy: string = "bankruptSubsidy";
	/**
	 * 绑定大礼包
	 */
	public static BindChannel: string = "bindChannel";
	/**
	 * 累充活动
	 */
	public static PilePrize: string = "pilePrize";
	/**
	 * 分享活动
	 */
	public static Share: string = "share";
}
/**
 * 活动触发类型
 */
enum ActivityTriggerType
{
	/**
	 * 无
	 */
	None = 0,
	/**
	 * 点击组件触发
	 */
	Click = 1,
}
/**
 * 德州转转转结果类型
*/
enum ShimTaeYoonResultType
{
	/**
	 * 3个7
	*/
	ThreeSev = 1,
	/**
	 * 3个BAR
	*/
	ThreeBAR = 2,
	/**
	 * 3个苹果
	*/
	ThreeApple = 3,
	/**
	 * 3个铃铛
	*/
	ThreeBell = 4,
	/**
	 * 3个葡萄
	*/
	ThreeGrape = 5,
	/**
	 * 3个柿子
	*/
	ThreePersimmon = 6,
	/**
	 * 3个樱桃
	*/
	ThreeCherry = 7,
	/**
	 * 2个樱桃+任意其他除樱桃外1个
	*/
	TwoCherry = 8,
	/**
	 * 1个樱桃+任意其他除樱桃外2个
	*/
	OneCherry = 9,
	/**
	 *没中奖
	*/
	NoAward = 10,
}
/**
 * 德州转转转图片在滚动框的位置
*/
enum ShimTaeYoonImgIndex
{
	/**
	 * 7
	*/
	Sev = 0,
	/**
	 * BAR
	*/
	BAR = 1,
	/**
	 * 苹果
	*/
	Apple = 2,
	/**
	 * 铃铛
	*/
	Bell = 3,
	/**
	 * 葡萄
	*/
	Grape = 4,
	/**
	 * 柿子
	*/
	Persimmon = 5,
	/**
	 * 樱桃
	*/
	Cherry = 6,
	/**
	 * ?
	*/
	Que = 7,
}