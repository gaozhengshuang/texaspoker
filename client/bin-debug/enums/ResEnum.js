var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 图集子资源名
 * */
var SheetSubName = (function () {
    function SheetSubName() {
    }
    /**
     * 设置默认头像
    */
    SheetSubName.getdefaultHead = function (sex) {
        switch (sex) {
            case Sex.Male:
                return SheetSubName.Default_Head_Male;
            case Sex.Unknown:
                return SheetSubName.Default_Head_Secret;
            case Sex.Female:
                return SheetSubName.Default_Head_Female;
        }
    };
    /**
     * 灰色背景
     */
    SheetSubName.GrayBg = "pub_bg_png";
    /**
     * 男性图片
     */
    SheetSubName.MaleImg = "m_png";
    /**
     * 女性图片
     */
    SheetSubName.FemaleImg = "f_png";
    /**
     * 保密图片
     */
    SheetSubName.SecretImg = "b_png";
    /**
     * 女性默认头像
     */
    SheetSubName.Default_Head_Female = "mrtx_png";
    /**
     * 男性默认头像
     */
    SheetSubName.Default_Head_Male = "mrtx_nan_png";
    /**
     * 保密默认头像
     */
    SheetSubName.Default_Head_Secret = "mrtx_bm_png";
    /**
     * 红点图片
     */
    SheetSubName.RedPointImg = "icon_infor_png";
    /**
     * all模式图片
    */
    SheetSubName.AllInImg = "all_png";
    /**
     * 快速模式图片
    */
    SheetSubName.FastImg = "shandian_png";
    /**
     * 前注模式图片
    */
    SheetSubName.AnteImg = "qianzhu_png";
    /**
     * 私人房模式图片
    */
    SheetSubName.PersonalImg = "shirenfang_png";
    /**
     * 万
     */
    SheetSubName.Achieve_Million = "wan_png";
    /**
     * 亿
     */
    SheetSubName.Achieve_Billion = "yi_png";
    /**
     * 冒号
     */
    SheetSubName.CountDown_Colon = "maohao_png";
    /**
     * 计时奖励金币图片1
    */
    SheetSubName.TimeAwardGold1 = "js_1_png";
    /**
     * 计时奖励金币图片2
    */
    SheetSubName.TimeAwardGold2 = "js_2_png";
    /**
     * 计时奖励金币图片3
    */
    SheetSubName.TimeAwardGold3 = "js_3_png";
    /**
     * 计时奖励金币图片4
    */
    SheetSubName.TimeAwardGold4 = "js_4_png";
    /**
     * 计时奖励金币图片5
    */
    SheetSubName.TimeAwardGold5 = "js_5_png";
    /**
     * 计时奖励金币图片6
    */
    SheetSubName.TimeAwardGold6 = "js_6_png";
    /**
     * 锦标赛结算金杯
     */
    SheetSubName.MTTOverJB = "jbs_jb_png";
    /**
     * 锦标赛结算金杯
     */
    SheetSubName.MTTOverGoldenCup = "jbs_jb_png";
    /**
     * 锦标赛结算银杯
     */
    SheetSubName.MTTOverSilverCup = "jbs_jb_yin_png";
    /**
     * 锦标赛托管中
    */
    SheetSubName.MTTTrusteeship = "tuoguan_png";
    /**
     * 坐满即玩
    */
    SheetSubName.SitAndPlay = "zuoman_png";
    /**
     * 加注状态
     */
    SheetSubName.RaiseState = "n_game_12_png";
    /**
     * allin 状态
     */
    SheetSubName.AllInState = "n_game_16_png";
    /**
     * 过牌状态
     */
    SheetSubName.CheckState = "n_game_8_png";
    /**
     * 跟注状态
     */
    SheetSubName.CallState = "n_game_10_png";
    /**
     * 弃牌状态
     */
    SheetSubName.FoldState = "n_game_14_png";
    /**
     * 通用物品背景
     */
    SheetSubName.CommonItemBg = "bg_pub_2_png";
    /**
     * 获得物品背景
     */
    SheetSubName.GetItemBg = "gongxi_bg_png";
    /**
     * 默认邮件图标
     */
    SheetSubName.DefaultMail = "yj_moren_png";
    /**
     * 百人大战胜利
     */
    SheetSubName.HundredWar_Win = "br_ying_png";
    /**
     * 百人大战失败
     */
    SheetSubName.HundredWar_Lose = "br_shu_png";
    /**
     * 百人大战胜利背景
     */
    SheetSubName.HundredWar_WinBg = "br_ying_bg_png";
    /**
     * 百人大战失败背景
     */
    SheetSubName.HundredWar_LoseBg = "br_shu_bg_png";
    /**
     * 百人大战走势胜
     */
    SheetSubName.HundredWarTrend_Win = "br_sheng_png";
    /**
     * 百人大战走势负
     */
    SheetSubName.HundredWarTrend_Lose = "br_fu_png";
    /**
     * 百人大战走势平
     */
    SheetSubName.HundredWarTrend_Tie = "br_pingju_png";
    /**
     * 百人大战系统庄家头像
     */
    SheetSubName.HundredWarSysBanker_Head = "xttx_png";
    /**
     * 拉霸win图片
     */
    SheetSubName.LaBa_Win = "laBa_text_1_png";
    /**
     * 拉霸winningStreak图片
     */
    SheetSubName.LaBa_WinningStreak = "laBa_text_2_png";
    /**
     * 拉霸topPrize图片
     */
    SheetSubName.LaBa_TopPrize = "laBa_text_3_png";
    /**
     * 拉霸lost图片
     */
    SheetSubName.LaBa_Lost = "laBa_text_4_png";
    /**
     * 拉霸自动开始可用图片
     */
    SheetSubName.LaBa_AutoStartOpen = "zidong_1_png";
    /**
     * 拉霸自动开始不可用图片
     */
    SheetSubName.LaBa_AutoStartClose = "zidong_2_png";
    /**
     * 显示牌型未赢牌/亮牌
     */
    SheetSubName.Gambling_Head_BgType_Normal = "n_game_20_png";
    /**
     * 赢牌
     */
    SheetSubName.Gambline_Head_BgType_Win = "n_game_20_1_png";
    /**
     * 显示筹码
     */
    SheetSubName.Gambline_Head_BgType_Chips = "n_game_20_2_png";
    /**
     * 上局回顾庄家位标识图
     */
    SheetSubName.Review_Banker = "dongjia_png";
    /**
     * 上局回顾盲注位标识图
     */
    SheetSubName.Review_Blind = "daxiaomang_png";
    /**
     * 游戏场景texas poker背景
    */
    SheetSubName.Gambling_Bg_TexasPoker = "game_sy_1_png";
    /**
     * 游戏场景omaha背景
    */
    SheetSubName.Gambling_Bg_Omaha = "game_sy_3_png";
    /**
     * 游戏场标题
    */
    SheetSubName.PlayFieldTitle = "game_yxc_png";
    /**
     * 奥马哈标题
    */
    SheetSubName.OmahaTitle = "text_aomaha_png";
    /**
     * 新人礼领取
     */
    SheetSubName.NewGiftTake = "text_linqu_1_png";
    /**
     * 新人礼前往
     */
    SheetSubName.NewGiftGoto = "text_qianwang_png";
    /**
     * 新人礼下载
     */
    SheetSubName.NewGiftDownload = "text_xiazai_png";
    /**
     * 礼物商店物品背景
     */
    SheetSubName.GiftShopItemBg = "bg_pub_2_1_png";
    return SheetSubName;
}());
__reflect(SheetSubName.prototype, "SheetSubName");
/**
 * 资源组名
 */
var ResGroupName = (function () {
    function ResGroupName() {
    }
    /**
     * 文本资源
     */
    ResGroupName.Text = "text";
    /**
     * 登录资源
     */
    ResGroupName.Login = "login";
    /**
     * 通用资源
     */
    ResGroupName.Common = "common";
    /**
     * 牌局场景资源
     */
    ResGroupName.Gambling = "gambling";
    /**
     * 百人大战
     */
    ResGroupName.HundredWar = "hundredwar";
    /**
     * 活动通用资源组
     */
    ResGroupName.ActivityCommon = "activity_common";
    /**
     * 邀请
     */
    ResGroupName.Invite = "invite";
    return ResGroupName;
}());
__reflect(ResGroupName.prototype, "ResGroupName");
/**
 * 资源前缀
 * */
var ResPrefixName = (function () {
    function ResPrefixName() {
    }
    /**
     * 红色数字资源前缀
     */
    ResPrefixName.NumRed = "red_";
    /**
     * 绿色资源数字前缀
     */
    ResPrefixName.NumGreen = "greed_";
    /**
     * 黄色数字资源前缀
     */
    ResPrefixName.NumYellow = "yellow_";
    /**
     * 花色
     */
    ResPrefixName.Flush = "flush_";
    /**
     * 牌
     */
    ResPrefixName.card = "pai_";
    /**
     * 花色黑
     */
    ResPrefixName.FlushBlack = "hei_";
    /**
     * 花色红
     */
    ResPrefixName.FlushRed = "hong_";
    /**
     * 成就数字前缀
     */
    ResPrefixName.Achieve_Num = "achieve_num_";
    /**
     * 倒计时
     */
    ResPrefixName.CountDown_Num = "djs_";
    /**
     * 排名图片
     */
    ResPrefixName.RankImage = "icon_";
    /**
     * 拉霸排名图片
     */
    ResPrefixName.LaBaRankImage = "laBa_paiming_";
    /**
     * MTT赛况排名图片
     */
    ResPrefixName.MTTRankImage = "paiming_";
    /**
     * 百人大战数字前缀
     */
    ResPrefixName.HundredWarNum = "br_";
    /**
     * 百人大战数字前缀2
     */
    ResPrefixName.HundredWarNum2 = "br2_";
    /**
     * 拉霸结果类型图片前缀
     */
    ResPrefixName.LaBaResult = "laBa_item_";
    /**
     * 拉霸结果类型背景图片前缀
     */
    ResPrefixName.LaBaResultBg = "laBa_quan_";
    /**
     * 锦标赛我的比赛中已结束列表名次图片前缀
    */
    ResPrefixName.MTTListRankImage = "pm_";
    /**
     * 坐满即玩名次图片前缀
    */
    ResPrefixName.SNGRankImage = "tts_";
    return ResPrefixName;
}());
__reflect(ResPrefixName.prototype, "ResPrefixName");
/**
 * 资源功能前缀路径名
 */
var ResPrefixPathName = (function () {
    function ResPrefixPathName() {
    }
    //config
    ResPrefixPathName.Config = 'config/';
    //assets
    ResPrefixPathName.Bg = 'assets/bg/';
    ResPrefixPathName.Bone = 'assets/bone/';
    ResPrefixPathName.Emoji = 'assets/emoji/';
    ResPrefixPathName.Icon = 'assets/icon/';
    ResPrefixPathName.Lang = 'assets/lang/';
    ResPrefixPathName.Particle = 'assets/particle/';
    ResPrefixPathName.Sheet = 'assets/sheet/';
    ResPrefixPathName.Sound = 'assets/sound/';
    ResPrefixPathName.Bundle = 'assets/bundle/';
    //assets sub
    ResPrefixPathName.LangSheet = 'assets/lang/sheet/';
    return ResPrefixPathName;
}());
__reflect(ResPrefixPathName.prototype, "ResPrefixPathName");
/**
 * 资源后缀名，有版本管理(在default.res.json里的)
 * */
var ResSuffixName = (function () {
    function ResSuffixName() {
    }
    ResSuffixName.JSON = "_json";
    ResSuffixName.PNG = "_png";
    ResSuffixName.MP3 = "_mp3";
    ResSuffixName.JPG = "_jpg";
    ResSuffixName.ZIP = "_zip";
    return ResSuffixName;
}());
__reflect(ResSuffixName.prototype, "ResSuffixName");
/**
 * 固定的资源名, 不包含前缀路径, default.res.json里的name
 */
var ResFixedFileName = (function () {
    function ResFixedFileName() {
    }
    /**
     * 获得金币图片
     */
    ResFixedFileName.GetCoin_Img = "icon_jinbi_png";
    /**
     * 百人大战筹码金币图片
     */
    ResFixedFileName.ChipCoin_Img = "br_chouma_png";
    /**
     * 获得金币配置
     */
    ResFixedFileName.GetCoin_Json = "getcoin_json";
    /**
     * allin配置
     */
    ResFixedFileName.Allin_Json = "allin_json";
    /**
     * 百人大战爆奖池配置
     */
    ResFixedFileName.HundredWarPoolBoom_Json = "hundred_war_pool_boom_json";
    /**
     * 赢牌
     */
    ResFixedFileName.Win_Img = "win_1_png";
    /**
     * 赢牌
     */
    ResFixedFileName.Win_Json = "win_1_json";
    ResFixedFileName.Win_2_Json = "win_2_json";
    /**
     * 大厅流光
     */
    ResFixedFileName.LiuGuang_Img = "liuguang_png";
    /**
     * 大厅流光配置
     */
    ResFixedFileName.LiuGuang_Config = "liuguang_dbmv";
    /**
     * 文本图集
     */
    ResFixedFileName.Text_Json = 'text_json';
    /**
     * 配置表
     */
    ResFixedFileName.Config_Zip = 'config_zip';
    /**
     * 协议文件
     */
    ResFixedFileName.Proto_Zip = 'proto_zip';
    /**
    * vip说明背景图
    */
    ResFixedFileName.vipBg = "vip_neirong_png";
    /**
     * 大厅背景
     */
    ResFixedFileName.Hall_Bg_1 = "hall_bg_1_png";
    /**
     * 大厅人物
     */
    ResFixedFileName.Hall_Bg_2 = "hall_bg_2_png";
    /**
     * 百人大战帮助背景图
     */
    ResFixedFileName.HundredWar_Help = "hundredwar_help_png";
    /**
     * 引导背景
     */
    ResFixedFileName.Guide_Bg_1 = "yd_bg_1_png";
    /**
     * 百人大战场景背景
     */
    ResFixedFileName.HundredWar_Bg_1 = "hundredwar_1_png";
    /**
     * 头像擦除
     */
    ResFixedFileName.HeadEarser = "touxiang_4_png";
    /**
     * 拉霸背景
    */
    ResFixedFileName.LaBa_Bg = "activity_laBa_bg_png";
    /**
     * 欢乐豪礼背景
     */
    ResFixedFileName.HappyGift_Bg = "activity_happyGift_bg_png";
    /**
    * logo
    */
    ResFixedFileName.Logo_png = "logo_png";
    /**
     * 荷官
     */
    ResFixedFileName.Dealer_Png = "dealer_png";
    return ResFixedFileName;
}());
__reflect(ResFixedFileName.prototype, "ResFixedFileName");
/**
 * 数字资源类型
 */
var NumResType;
(function (NumResType) {
    /**
     * 红
     */
    NumResType[NumResType["Red"] = 1] = "Red";
    /**
     * 绿
     */
    NumResType[NumResType["Green"] = 2] = "Green";
    /**
     * 黄
     */
    NumResType[NumResType["Yellow"] = 3] = "Yellow";
    /**
     * 百人大战
     */
    NumResType[NumResType["HundredWar"] = 4] = "HundredWar";
    /**
     * 百人大战2
     */
    NumResType[NumResType["HundredWar2"] = 5] = "HundredWar2";
})(NumResType || (NumResType = {}));
//# sourceMappingURL=ResEnum.js.map