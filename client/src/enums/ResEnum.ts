/**
 * 图集子资源名
 * */
class SheetSubName
{
	/**
	 * 灰色背景
	 */
	public static GrayBg: string = "pub_bg_png";
	/**
	 * 男性图片
	 */
	public static MaleImg: string = "m_png";
	/**
	 * 女性图片
	 */
	public static FemaleImg: string = "f_png";
	/**
	 * 保密图片
	 */
	public static SecretImg: string = "b_png";
	/**
	 * 女性默认头像
	 */
	public static Default_Head_Female: string = "mrtx_png";
	/**
	 * 男性默认头像
	 */
	public static Default_Head_Male: string = "mrtx_nan_png";
	/**
	 * 保密默认头像
	 */
	public static Default_Head_Secret: string = "mrtx_bm_png";
	/**
	 * 设置默认头像
 	*/
	public static getdefaultHead(sex: Sex): string
	{
		if(sex == undefined)
		{
			sex = Sex.Male;
		}
		switch (sex)
		{
			case Sex.Male:
				return SheetSubName.Default_Head_Male;
			case Sex.Unknown:
				return SheetSubName.Default_Head_Secret;
			case Sex.Female:
				return SheetSubName.Default_Head_Female;
		}
	}
	/**
	 * 红点图片
	 */
	public static RedPointImg: string = "icon_infor_png";
	/**
	 * all模式图片
	*/
	public static AllInImg: string = "all_png";
	/**
	 * 快速模式图片
	*/
	public static FastImg: string = "shandian_png";
	/**
	 * 前注模式图片
	*/
	public static AnteImg: string = "qianzhu_png";
	/**
	 * 私人房模式图片
	*/
	public static PersonalImg: string = "shirenfang_png";
	/**
	 * 万
	 */
	public static Achieve_Million: string = "wan_png";
	/**
	 * 亿
	 */
	public static Achieve_Billion: string = "yi_png";
	/**
	 * 冒号
	 */
	public static CountDown_Colon: string = "maohao_png";
	/**
	 * 计时奖励金币图片1
	*/
	public static TimeAwardGold1: string = "js_1_png";
	/**
	 * 计时奖励金币图片2
	*/
	public static TimeAwardGold2: string = "js_2_png";
	/**
	 * 计时奖励金币图片3
	*/
	public static TimeAwardGold3: string = "js_3_png";
	/**
	 * 计时奖励金币图片4
	*/
	public static TimeAwardGold4: string = "js_4_png";
	/**
	 * 计时奖励金币图片5
	*/
	public static TimeAwardGold5: string = "js_5_png";
	/**
	 * 计时奖励金币图片6
	*/
	public static TimeAwardGold6: string = "js_6_png";
	/**
	 * 锦标赛结算金杯
	 */
	public static MTTOverJB: string = "jbs_jb_png";
	/**
	 * 锦标赛结算金杯
	 */
	public static MTTOverGoldenCup: string = "jbs_jb_png";
	/**
	 * 锦标赛结算银杯
	 */
	public static MTTOverSilverCup: string = "jbs_jb_yin_png";
	/**
	 * 锦标赛托管中
	*/
	public static MTTTrusteeship: string = "tuoguan_png";
	/**
	 * 坐满即玩
	*/
	public static SitAndPlay: string = "zuoman_png";

	/**
	 * 加注状态
	 */
	public static RaiseState = "n_game_12_png";
	/**
	 * allin 状态
	 */
	public static AllInState = "n_game_16_png";
	/**
	 * 过牌状态
	 */
	public static CheckState = "n_game_8_png";
	/**
	 * 跟注状态
	 */
	public static CallState = "n_game_10_png";
	/**
	 * 弃牌状态
	 */
	public static FoldState = "n_game_14_png";
	/**
	 * 通用物品背景
	 */
	public static CommonItemBg: string = "bg_pub_2_png";
	/**
	 * 获得物品背景
	 */
	public static GetItemBg: string = "gongxi_bg_png";
	/**
	 * 默认邮件图标
	 */
	public static DefaultMail: string = "yj_moren_png";
	/**
	 * 百人大战胜利
	 */
	public static HundredWar_Win: string = "br_ying_png";
	/**
	 * 百人大战失败
	 */
	public static HundredWar_Lose: string = "br_shu_png";
	/**
	 * 百人大战胜利背景
	 */
	public static HundredWar_WinBg: string = "br_ying_bg_png";
	/**
	 * 百人大战失败背景
	 */
	public static HundredWar_LoseBg: string = "br_shu_bg_png";
	/**
	 * 百人大战走势胜
	 */
	public static HundredWarTrend_Win: string = "br_sheng_png";
	/**
	 * 百人大战走势负
	 */
	public static HundredWarTrend_Lose: string = "br_fu_png";
	/**
	 * 百人大战走势平
	 */
	public static HundredWarTrend_Tie: string = "br_pingju_png";
	/**
	 * 百人大战系统庄家头像
	 */
	public static HundredWarSysBanker_Head: string = "xttx_png";
	/**
	 * 拉霸win图片
	 */
	public static LaBa_Win: string = "laBa_text_1_png";
	/**
	 * 拉霸winningStreak图片
	 */
	public static LaBa_WinningStreak: string = "laBa_text_2_png";
	/**
	 * 拉霸topPrize图片
	 */
	public static LaBa_TopPrize: string = "laBa_text_3_png";
	/**
	 * 拉霸lost图片
	 */
	public static LaBa_Lost: string = "laBa_text_4_png";
	/**
	 * 拉霸自动开始可用图片
	 */
	public static LaBa_AutoStartOpen: string = "zidong_1_png";
	/**
	 * 拉霸自动开始不可用图片
	 */
	public static LaBa_AutoStartClose: string = "zidong_2_png";
	/**
	 * 显示牌型未赢牌/亮牌
	 */
	public static Gambling_Head_BgType_Normal: string = "n_game_20_png";
	/**
	 * 赢牌
	 */
	public static Gambline_Head_BgType_Win: string = "n_game_20_1_png";
	/**
	 * 显示筹码
	 */
	public static Gambline_Head_BgType_Chips: string = "n_game_20_2_png";
	/**
	 * 上局回顾庄家位标识图
	 */
	public static Review_Banker: string = "dongjia_png";
	/**
	 * 上局回顾盲注位标识图
	 */
	public static Review_Blind: string = "daxiaomang_png";
	/**
	 * 游戏场景texas poker背景
	*/
	public static Gambling_Bg_TexasPoker: string = "game_sy_1_png";
	/**
	 * 游戏场景omaha背景
	*/
	public static Gambling_Bg_Omaha: string = "game_sy_3_png";
	/**
	 * 游戏场标题
	*/
	public static PlayFieldTitle: string = "game_yxc_png";
	/**
	 * 奥马哈标题
	*/
	public static OmahaTitle: string = "text_aomaha_png";
	/**
	 * 新人礼领取
	 */
	public static NewGiftTake: string = "text_linqu_1_png";
	/**
	 * 新人礼前往
	 */
	public static NewGiftGoto: string = "text_qianwang_png";
	/**
	 * 新人礼下载
	 */
	public static NewGiftDownload: string = "text_xiazai_png";
	/**
	 * 礼物商店物品背景
	 */
	public static GiftShopItemBg: string = "bg_pub_2_1_png";
}
/**
 * 资源组名
 */
class ResGroupName
{
	/**
	 * 文本资源
	 */
	public static Text: string = "text";
	/**
	 * 登录资源
	 */
	public static Login: string = "login";
	/**
	 * 登录的文字图集
	 */
	public static Login_Text:string = "login_text";
	/**
	 * 通用资源
	 */
	public static Common: string = "common";
	/**
	 * 牌局场景资源
	 */
	public static Gambling: string = "gambling";
	/**
	 * 百人大战
	 */
	public static HundredWar: string = "hundredwar";
	/**
	 * 活动通用资源组
	 */
	public static ActivityCommon: string = "activity_common";
	/**
	 * 邀请
	 */
	public static Invite: string = "invite";
}
/**
 * 资源前缀
 * */
class ResPrefixName
{
	/**
	 * 红色数字资源前缀
	 */
	public static NumRed: string = "red_";
	/**
	 * 绿色资源数字前缀
	 */
	public static NumGreen: string = "greed_";
	/**
	 * 黄色数字资源前缀
	 */
	public static NumYellow: string = "yellow_";
	/**
	 * 花色
	 */
	public static Flush: string = "flush_";
	/**
	 * 牌
	 */
	public static card: string = "pai_";
	/**
	 * 花色黑
	 */
	public static FlushBlack: string = "hei_";
	/**
	 * 花色红
	 */
	public static FlushRed: string = "hong_";
	/**
	 * 成就数字前缀
	 */
	public static Achieve_Num: string = "achieve_num_";
	/**
	 * 倒计时
	 */
	public static CountDown_Num: string = "djs_";
	/**
	 * 排名图片
	 */
	public static RankImage: string = "icon_";
	/**
	 * 拉霸排名图片
	 */
	public static LaBaRankImage: string = "laBa_paiming_";
	/**
	 * MTT赛况排名图片
	 */
	public static MTTRankImage: string = "paiming_";
	/**
	 * 百人大战数字前缀
	 */
	public static HundredWarNum: string = "br_";
	/**
	 * 百人大战数字前缀2
	 */
	public static HundredWarNum2: string = "br2_";
	/**
	 * 拉霸结果类型图片前缀
	 */
	public static LaBaResult: string = "laBa_item_";
	/**
	 * 拉霸结果类型背景图片前缀
	 */
	public static LaBaResultBg: string = "laBa_quan_";
	/**
	 * 锦标赛我的比赛中已结束列表名次图片前缀
	*/
	public static MTTListRankImage: string = "pm_";
	/**
	 * 坐满即玩名次图片前缀
	*/
	public static SNGRankImage: string = "tts_";
}
/**
 * 资源功能前缀路径名
 */
class ResPrefixPathName
{
	//config
	public static readonly Config: string = 'config/';
	//assets
	public static readonly Bg: string = 'assets/bg/';
	public static readonly Bone: string = 'assets/bone/';
	// public static readonly Emoji: string = 'assets/emoji/';
	public static readonly Icon: string = 'assets/icon/';
	public static readonly Lang: string = 'assets/lang/';
	public static readonly Particle: string = 'assets/particle/';
	public static readonly Sheet: string = 'assets/sheet/';
	public static readonly Sound: string = 'assets/sound/';
	public static readonly Bundle: string = 'assets/bundle/'
	//assets sub
	public static readonly LangSheet: string = 'assets/lang/sheet/';
}
/**
 * 资源后缀名，有版本管理(在default.res.json里的)
 * */
class ResSuffixName
{
	public static JSON: string = "_json";
	public static PNG: string = "_png";
	public static MP3: string = "_mp3";
	public static JPG: string = "_jpg";
	public static ZIP: string = "_zip";
}

/**
 * 固定的资源名, 不包含前缀路径, default.res.json里的name
 */
class ResFixedFileName
{
	/**
	 * 获得金币图片
	 */
	public static GetCoin_Img = "icon_jinbi_png";
	/**
	 * 百人大战筹码金币图片
	 */
	public static ChipCoin_Img = "br_chouma_png";
	/**
	 * 获得金币配置
	 */
	public static GetCoin_Json = "getcoin_json";
	/**
	 * allin配置
	 */
	public static Allin_Json = "allin_json";
	/**
	 * 百人大战爆奖池配置
	 */
	public static HundredWarPoolBoom_Json = "hundred_war_pool_boom_json";
	/**
	 * 赢牌
	 */
	public static Win_Img = "win_1_png";
	/**
	 * 赢牌
	 */
	public static Win_Json = "win_1_json";
	public static Win_2_Json = "win_2_json";
	/**
	 * 大厅流光
	 */
	public static LiuGuang_Img = "liuguang_png";
	/**
	 * 大厅流光配置
	 */
	public static LiuGuang_Config = "liuguang_dbmv";
	/**
	 * 大厅荷官龙骨动画png
	 */
	public static Dealer_db_png = "poker_ani_tex_png";
		/**
	 * 大厅荷官龙骨动画 纹理配置文件
	 */
	public static Dealer_db_texturedata = "poker_ani_tex_json";
		/**
	 * 大厅荷官龙骨动画 数据配置文件
	 */
	public static Dealer_db_ske = "poker_ani_ske_dbbin";
	/**
	 * 文本图集
	 */
	public static Text_Json = 'text_json';
	/**
	 * 配置表
	 */
	public static Config_Zip = 'config_zip';
	/**
	 * 协议文件
	 */
	public static Proto_Zip = 'proto_zip';
	/**
  	* vip说明背景图
  	*/
	public static vipBg: string = "vip_neirong_png";
	/**
	 * 大厅背景
	 */
	public static Hall_Bg_1: string = "hall_bg_1_png";
	/**
	 * 大厅人物
	 */
	public static Hall_Bg_2: string = "hall_bg_2_png";
	/**
	 * 百人大战帮助背景图
	 */
	public static HundredWar_Help: string = "hundredwar_help_png";
	/**
	 * 引导背景
	 */
	public static Guide_Bg_1: string = "yd_bg_1_png";
	/**
	 * 百人大战场景背景
	 */
	public static HundredWar_Bg_1: string = "hundredwar_1_png";
	/**
	 * 头像擦除
	 */
	public static HeadEarser: string = "touxiang_4_png";
	/**
	 * 拉霸背景
	*/
	public static LaBa_Bg: string = "activity_laBa_bg_png";
	/**
	 * 欢乐豪礼背景
	 */
	public static HappyGift_Bg: string = "activity_happyGift_bg_png";
	/**
 	* logo
 	*/
	public static Logo_png: string = "logo_png";
	/**
	 * 荷官
	 */
	public static Dealer_Png: string = "dealer_png";
}
/**
 * 数字资源类型
 */
enum NumResType
{
	/**
	 * 红
	 */
	Red = 1,
	/**
	 * 绿
	 */
	Green = 2,
	/**
	 * 黄
	 */
	Yellow = 3,
	/**
	 * 百人大战
	 */
	HundredWar = 4,
	/**
	 * 百人大战2
	 */
	HundredWar2 = 5,
}
