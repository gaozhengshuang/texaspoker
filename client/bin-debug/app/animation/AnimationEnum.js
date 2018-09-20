var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 动画类型
 */
var AnimationType;
(function (AnimationType) {
    /**
     * 公共牌出现
     */
    AnimationType[AnimationType["CardFaceBoardAppear"] = 1] = "CardFaceBoardAppear";
    /**
     * 卡牌亮牌
     */
    AnimationType[AnimationType["CardFaceBright"] = 2] = "CardFaceBright";
    /**
     * 卡牌移动到某点
     */
    AnimationType[AnimationType["CardFaceMoveToPoint"] = 3] = "CardFaceMoveToPoint";
    /**
     * 卡牌翻牌
     */
    AnimationType[AnimationType["CardFaceTurnToFace"] = 4] = "CardFaceTurnToFace";
    /**
     * 本家手牌动画1
     */
    AnimationType[AnimationType["SelfCard1Appear"] = 5] = "SelfCard1Appear";
    /**
     * 本家手牌动画2
     */
    AnimationType[AnimationType["SelfCard2Appear"] = 6] = "SelfCard2Appear";
    /**
     * 奥马哈本家手牌动画1
     */
    AnimationType[AnimationType["OmahaSelfCard1Appear"] = 7] = "OmahaSelfCard1Appear";
    /**
     * 奥马哈本家手牌动画2
     */
    AnimationType[AnimationType["OmahaSelfCard2Appear"] = 8] = "OmahaSelfCard2Appear";
    /**
     * 奥马哈本家手牌动画3
     */
    AnimationType[AnimationType["OmahaSelfCard3Appear"] = 9] = "OmahaSelfCard3Appear";
    /**
     * 奥马哈本家手牌动画4
     */
    AnimationType[AnimationType["OmahaSelfCard4Appear"] = 10] = "OmahaSelfCard4Appear";
    /**
     * 发牌/弃牌 动画
     */
    AnimationType[AnimationType["FlopCard"] = 50] = "FlopCard";
    /**
     * 牌局面板移动
     */
    AnimationType[AnimationType["GamblingGameGroupMove"] = 100] = "GamblingGameGroupMove";
    /**
     * 通用基于当前位置移动到某点
     */
    AnimationType[AnimationType["CommonMoveToPointByNowPos"] = 101] = "CommonMoveToPointByNowPos";
    /**
     * 通用基于相对位置移动
     */
    AnimationType[AnimationType["CommonMoveToRelativelyPos"] = 102] = "CommonMoveToRelativelyPos";
    /**
     * 赢取筹码
     */
    AnimationType[AnimationType["WinChips"] = 103] = "WinChips";
    /**
     * 弃牌动画
     */
    AnimationType[AnimationType["FoldCard"] = 104] = "FoldCard";
    /**
     * 透明度渐变
     */
    AnimationType[AnimationType["Alpha"] = 105] = "Alpha";
    /**********粒子特效**********/
    /**
     * 获得金币
     */
    AnimationType[AnimationType["GetCoin"] = 301] = "GetCoin";
    /**
     * 赢牌
     */
    AnimationType[AnimationType["WinCard"] = 302] = "WinCard";
    /**
     * allin
     */
    AnimationType[AnimationType["Allin0"] = 303] = "Allin0";
    AnimationType[AnimationType["Allin1"] = 304] = "Allin1";
    /**
     * 百人大战玩家结算
     */
    AnimationType[AnimationType["HundredWarPlayer"] = 305] = "HundredWarPlayer";
    /**
     * 百人大战庄家结算
     */
    AnimationType[AnimationType["HundredWarBanker"] = 306] = "HundredWarBanker";
    /**
     * 百人大战奖池
     */
    AnimationType[AnimationType["HundredWarPool"] = 307] = "HundredWarPool";
    /**
     * 百人大战爆奖池
     */
    AnimationType[AnimationType["HundredWarPoolDes"] = 308] = "HundredWarPoolDes";
    /**
     * 赢牌2
     */
    AnimationType[AnimationType["WinCard2"] = 309] = "WinCard2";
    AnimationType[AnimationType["WinCard3"] = 310] = "WinCard3";
    AnimationType[AnimationType["WinCard4"] = 311] = "WinCard4";
})(AnimationType || (AnimationType = {}));
/**
 * 极速动画名
 */
var BoneAnimeName = (function () {
    function BoneAnimeName() {
    }
    /**
     * 流光
     */
    BoneAnimeName.HallLiuGuang = "liuguang";
    return BoneAnimeName;
}());
__reflect(BoneAnimeName.prototype, "BoneAnimeName");
//# sourceMappingURL=AnimationEnum.js.map