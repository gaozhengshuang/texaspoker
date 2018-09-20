var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 百人大战牌局面板设置
 */
var HWPanelSetting = (function () {
    function HWPanelSetting() {
    }
    /**
     * 最小坑位索引
     */
    HWPanelSetting.MinPitIndex = 0;
    /**
     * 最大座位数量
     */
    HWPanelSetting.MaxPitNum = 9;
    /**
     * 筹码图片
    */
    HWPanelSetting.Chip_100 = "br_button_3_png";
    HWPanelSetting.Chip_1000 = "br_button_4_png";
    HWPanelSetting.Chip_1w = "br_button_5_png";
    HWPanelSetting.Chip_10w = "br_button_6_png";
    HWPanelSetting.Chip_100w = "br_button_7_png";
    HWPanelSetting.Chip_1000w = "br_button_12_png";
    HWPanelSetting.Chip_rep = "br_button_8_png"; //重复下注
    HWPanelSetting.Chip_db = "br_button_11_png"; //双倍
    /**
     * 注池背景图片
    */
    HWPanelSetting.BetPot1 = "br_fk_png";
    HWPanelSetting.BetPot2 = "br_mh_png";
    HWPanelSetting.BetPot3 = "br_ht_png";
    HWPanelSetting.BetPot4 = "br_hx_png";
    /**
     * 牌型描述
    */
    HWPanelSetting.HighCard_banker = "br_px_18_png";
    HWPanelSetting.OnePair_banker = "br_px_16_png";
    HWPanelSetting.TwoPairs_banker = "br_px_14_png";
    HWPanelSetting.ThreeOfAKind_banker = "br_px_12_png";
    HWPanelSetting.Straight_banker = "br_px_10_png"; //顺子
    HWPanelSetting.Flush_banker = "br_px_8_png"; //同花
    HWPanelSetting.Fullhouse_banker = "br_px_6_png"; //葫芦
    HWPanelSetting.FourOfAKind_banker = "br_px_4_png"; //四条
    HWPanelSetting.StraightFlush_banker = "br_px_2_png"; //同花顺
    HWPanelSetting.HighCard = "br_px_19_png";
    HWPanelSetting.OnePair = "br_px_17_png";
    HWPanelSetting.TwoPairs = "br_px_15_png";
    HWPanelSetting.ThreeOfAKind = "br_px_13_png";
    HWPanelSetting.Straight = "br_px_11_png"; //顺子
    HWPanelSetting.Flush = "br_px_9_png"; //同花
    HWPanelSetting.Fullhouse = "br_px_7_png"; //葫芦
    HWPanelSetting.FourOfAKind = "br_px_5_png"; //四条
    HWPanelSetting.StraightFlush = "br_px_3_png"; //同花顺
    HWPanelSetting.RoyalFlush = "br_px_1_png"; //皇家同花顺
    HWPanelSetting.HighCard_Win = "br_px_28_png";
    HWPanelSetting.OnePair_Win = "br_px_27_png";
    HWPanelSetting.TwoPairs_Win = "br_px_26_png";
    HWPanelSetting.ThreeOfAKind_Win = "br_px_25_png";
    HWPanelSetting.Straight_Win = "br_px_24_png"; //顺子
    HWPanelSetting.Flush_Win = "br_px_23_png"; //同花
    HWPanelSetting.Fullhouse_Win = "br_px_22_png"; //葫芦
    HWPanelSetting.FourOfAKind_Win = "br_px_21_png"; //四条
    HWPanelSetting.StraightFlush_Win = "br_px_20_png"; //同花顺
    return HWPanelSetting;
}());
__reflect(HWPanelSetting.prototype, "HWPanelSetting");
//# sourceMappingURL=HWPanelSetting.js.map