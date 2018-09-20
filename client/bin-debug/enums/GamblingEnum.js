var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌局模式
*/
var GamblingPattern;
(function (GamblingPattern) {
    /**
     * 快速出牌模式
    */
    GamblingPattern[GamblingPattern["Fast"] = 1] = "Fast";
    /**
     * 前注模式
    */
    GamblingPattern[GamblingPattern["Ante"] = 2] = "Ante";
    /**
     * 无上限模式
    */
    GamblingPattern[GamblingPattern["NoUpperLimit"] = 3] = "NoUpperLimit";
    /**
     * 私人房模式
    */
    GamblingPattern[GamblingPattern["Personal"] = 4] = "Personal";
    /**
     * 全下/弃牌模式
    */
    GamblingPattern[GamblingPattern["AllIn"] = 5] = "AllIn";
})(GamblingPattern || (GamblingPattern = {}));
/**
 * 房间场次类型 对应room.json里面的type
 */
var PlayingFieldType;
(function (PlayingFieldType) {
    /**
     * 初级场
    */
    PlayingFieldType[PlayingFieldType["Primary"] = 1] = "Primary";
    /**
     * 中级场
    */
    PlayingFieldType[PlayingFieldType["Middle"] = 2] = "Middle";
    /**
     * 高级场
    */
    PlayingFieldType[PlayingFieldType["High"] = 3] = "High";
    /**
     * 奥马哈初级场
    */
    PlayingFieldType[PlayingFieldType["OmahaPrimary"] = 4] = "OmahaPrimary";
    /**
     * 奥马哈中级场
    */
    PlayingFieldType[PlayingFieldType["OmahaMiddle"] = 5] = "OmahaMiddle";
    /**
     * 奥马哈高级场
    */
    PlayingFieldType[PlayingFieldType["OmahaHigh"] = 6] = "OmahaHigh";
    /**
     * 游戏场私人房
     */
    PlayingFieldType[PlayingFieldType["PlayFieldPersonal"] = 11] = "PlayFieldPersonal";
    /**
     * 奥马哈私人房
     */
    PlayingFieldType[PlayingFieldType["OmahaPersonal"] = 12] = "OmahaPersonal";
    /**
     * 锦标赛
     */
    PlayingFieldType[PlayingFieldType["Mtt"] = 21] = "Mtt";
    /**
     * 坐满即玩
     */
    PlayingFieldType[PlayingFieldType["Sng"] = 22] = "Sng";
    /**
     * 新手引导
     */
    PlayingFieldType[PlayingFieldType["Guide"] = 31] = "Guide";
    /**
     * 新手引导玩法
     */
    PlayingFieldType[PlayingFieldType["GuidePlayWay"] = 32] = "GuidePlayWay";
})(PlayingFieldType || (PlayingFieldType = {}));
/**
 * 牌型
 */
var CardType;
(function (CardType) {
    /**
     * 无
     */
    CardType[CardType["None"] = 0] = "None";
    /**
     * 高牌
     */
    CardType[CardType["HighCard"] = 1] = "HighCard";
    /**
     * 一对
     */
    CardType[CardType["OnePair"] = 2] = "OnePair";
    /**
     * 两对
     */
    CardType[CardType["TwoPairs"] = 3] = "TwoPairs";
    /**
     * 3条
     */
    CardType[CardType["ThreeOfAKind"] = 4] = "ThreeOfAKind";
    /**
     * 顺子
     */
    CardType[CardType["Straight"] = 5] = "Straight";
    /**
     * 同花
     */
    CardType[CardType["Flush"] = 6] = "Flush";
    /**
     * 葫芦
     */
    CardType[CardType["Fullhouse"] = 7] = "Fullhouse";
    /**
     * 4条(金刚)
     */
    CardType[CardType["FourOfAKind"] = 8] = "FourOfAKind";
    /**
     * 同花顺
     */
    CardType[CardType["StraightFlush"] = 9] = "StraightFlush";
    /**
     * 皇家同花顺
     */
    CardType[CardType["RoyalFlush"] = 10] = "RoyalFlush";
})(CardType || (CardType = {}));
/**
 * 花色枚举
 */
var FlushType;
(function (FlushType) {
    /**
     * 方块
     */
    FlushType[FlushType["Diamonds"] = 1] = "Diamonds";
    /**
     * 红桃
     */
    FlushType[FlushType["Hearts"] = 2] = "Hearts";
    /**
     * 黑桃
     */
    FlushType[FlushType["Spades"] = 3] = "Spades";
    /**
     * 草花
     */
    FlushType[FlushType["Clubs"] = 4] = "Clubs";
})(FlushType || (FlushType = {}));
/**
 * 破产购买枚举
*/
var GoBrokeBuyType;
(function (GoBrokeBuyType) {
    /**
     * 20万金币
    */
    GoBrokeBuyType[GoBrokeBuyType["GoldScale"] = 2] = "GoldScale";
})(GoBrokeBuyType || (GoBrokeBuyType = {}));
/**
 * 牌局面板显示状态
 */
var GamblingPanelStateIndex;
(function (GamblingPanelStateIndex) {
    /**
     * 无
     */
    GamblingPanelStateIndex[GamblingPanelStateIndex["Null"] = 0] = "Null";
    /**
     * 常规
     */
    GamblingPanelStateIndex[GamblingPanelStateIndex["Normal"] = 1] = "Normal";
    /**
     * 比赛等待
     */
    GamblingPanelStateIndex[GamblingPanelStateIndex["MatchWait"] = 2] = "MatchWait";
    /**
     * 比赛
     */
    GamblingPanelStateIndex[GamblingPanelStateIndex["Match"] = 3] = "Match";
    /**
     * 引导
     */
    GamblingPanelStateIndex[GamblingPanelStateIndex["Guide"] = 4] = "Guide";
    /**
     * 引导玩法
     */
    GamblingPanelStateIndex[GamblingPanelStateIndex["GuidePlayWay"] = 5] = "GuidePlayWay";
    /**
     * 奥马哈
     */
    GamblingPanelStateIndex[GamblingPanelStateIndex["Omaha"] = 8] = "Omaha";
})(GamblingPanelStateIndex || (GamblingPanelStateIndex = {}));
/**
 * 买入游戏状态
 */
var BuyInGameState;
(function (BuyInGameState) {
    /**
     * 坐下
     */
    BuyInGameState[BuyInGameState["Sit"] = 1] = "Sit";
    /**
     * 站起
     */
    BuyInGameState[BuyInGameState["Stand"] = 2] = "Stand";
})(BuyInGameState || (BuyInGameState = {}));
/**
 * 座位模式
 */
var SeatMode;
(function (SeatMode) {
    /**
     * 3人模式
     */
    SeatMode[SeatMode["Three"] = 3] = "Three";
    /**
     * 5人模式
     */
    SeatMode[SeatMode["Five"] = 5] = "Five";
    /**
     * 6人模式
    */
    SeatMode[SeatMode["Six"] = 6] = "Six";
    /**
     * 9人模式
     */
    SeatMode[SeatMode["Nine"] = 9] = "Nine";
})(SeatMode || (SeatMode = {}));
/**
 * 筹码显示状态
 */
var ChipsShowState;
(function (ChipsShowState) {
    /**
     * 左
     */
    ChipsShowState[ChipsShowState["Left"] = 1] = "Left";
    /**
     * 右
     */
    ChipsShowState[ChipsShowState["Right"] = 2] = "Right";
    /**
     * 左下
     */
    ChipsShowState[ChipsShowState["LeftDown"] = 3] = "LeftDown";
    /**
     * 右下
     */
    ChipsShowState[ChipsShowState["RightDown"] = 4] = "RightDown";
    /**
     * 上
     */
    ChipsShowState[ChipsShowState["Top"] = 5] = "Top";
})(ChipsShowState || (ChipsShowState = {}));
/**
 * 插槽层级类型
 */
var SlotLayerType;
(function (SlotLayerType) {
    SlotLayerType[SlotLayerType["None"] = 0] = "None";
    /**
     * 正常牌局组下面
     */
    SlotLayerType[SlotLayerType["Down"] = 1] = "Down";
    /**
     * 正常牌局组上面
     */
    SlotLayerType[SlotLayerType["Up"] = 2] = "Up";
})(SlotLayerType || (SlotLayerType = {}));
/**
 * 玩家状态
 */
var PlayerState;
(function (PlayerState) {
    /**
     * 等待下一局
     */
    PlayerState[PlayerState["WaitNext"] = 0] = "WaitNext";
    /**
     * 弃牌
     */
    PlayerState[PlayerState["Fold"] = 1] = "Fold";
    /**
     * 过牌
     */
    PlayerState[PlayerState["Check"] = 2] = "Check";
    /**
     * 加注
     */
    PlayerState[PlayerState["Raise"] = 3] = "Raise";
    /**
     * allin
     */
    PlayerState[PlayerState["AllIn"] = 4] = "AllIn";
    /**
     * 跟注
     */
    PlayerState[PlayerState["Call"] = 5] = "Call";
    /**
     * 盲注
     */
    PlayerState[PlayerState["Blind"] = 6] = "Blind";
    /**
     * 等待说话
     */
    PlayerState[PlayerState["WaitAction"] = 7] = "WaitAction";
    /**
     * 取消托管
     */
    PlayerState[PlayerState["Trusteeship"] = 8] = "Trusteeship";
    /**
     * 房间ID
    */
    PlayerState[PlayerState["RoomId"] = 20] = "RoomId";
    /**
     *  玩家和POS
    */
    PlayerState[PlayerState["ThePos"] = 21] = "ThePos";
    /**
     * 庄家POS
    */
    PlayerState[PlayerState["ButtonPos"] = 22] = "ButtonPos";
    /**
     * 手牌
    */
    PlayerState[PlayerState["HandCard"] = 23] = "HandCard";
    /**
     * 操作POS
    */
    PlayerState[PlayerState["SetPos"] = 24] = "SetPos";
    /**
     * 公共牌
    */
    PlayerState[PlayerState["PubCard"] = 25] = "PubCard";
    /**
     * 池赢得 num1 为池，num2 赢得
    */
    PlayerState[PlayerState["PoolWon"] = 26] = "PoolWon";
    /**
     * 亮牌
    */
    PlayerState[PlayerState["ShowCard"] = 27] = "ShowCard";
    /**
     * 站起
    */
    PlayerState[PlayerState["StandUp"] = 28] = "StandUp";
    /**
     * 正在说话 仅限客户端
     */
    PlayerState[PlayerState["Action"] = 100] = "Action";
    /**
     * 空状态 仅限客户端
     */
    PlayerState[PlayerState["Empty"] = 104] = "Empty";
})(PlayerState || (PlayerState = {}));
/**
 * 上局回顾玩家位置类型
*/
var PlayerPosType;
(function (PlayerPosType) {
    /**
     * 小盲位
    */
    PlayerPosType[PlayerPosType["Sblind"] = 1] = "Sblind";
    /**
     * 大盲位
    */
    PlayerPosType[PlayerPosType["Bblind"] = 2] = "Bblind";
    /**
     * 庄家位
    */
    PlayerPosType[PlayerPosType["Banker"] = 3] = "Banker";
})(PlayerPosType || (PlayerPosType = {}));
/**
 * 牌局类型
 */
var GamblingType = (function () {
    function GamblingType() {
    }
    /**
     * 根据room表 类型获取房间类型
     */
    GamblingType.getType = function (t) {
        switch (t) {
            case PlayingFieldType.Primary:
            case PlayingFieldType.Middle:
            case PlayingFieldType.High:
                return GamblingType.Common;
            case PlayingFieldType.PlayFieldPersonal:
                return GamblingType.PlayFieldPersonal;
            case PlayingFieldType.OmahaPersonal:
                return GamblingType.OmahaPersonal;
            case PlayingFieldType.Mtt:
            case PlayingFieldType.Sng:
                return GamblingType.Match;
            case PlayingFieldType.Guide:
                return GamblingType.Guide;
            case PlayingFieldType.GuidePlayWay:
                return GamblingType.GuidePlayWay;
            case PlayingFieldType.OmahaPrimary:
            case PlayingFieldType.OmahaMiddle:
            case PlayingFieldType.OmahaHigh:
                return GamblingType.Omaha;
        }
        return GamblingType.Common;
    };
    /**
     * 普通房间
     */
    GamblingType.Common = 1;
    /**
     * 比赛房间
     */
    GamblingType.Match = 2;
    /**
     * 游戏场私人房间
     */
    GamblingType.PlayFieldPersonal = 3;
    /**
     * 奥马哈私人房间
     */
    GamblingType.OmahaPersonal = 4;
    /**
     * 引导
     */
    GamblingType.Guide = 5;
    /**
     * 引导玩法
     */
    GamblingType.GuidePlayWay = 6;
    /**
     * 奥马哈
     */
    GamblingType.Omaha = 7;
    return GamblingType;
}());
__reflect(GamblingType.prototype, "GamblingType");
/**
 * 玩法类型枚举
*/
var PlayWayType;
(function (PlayWayType) {
    /**
     * 游戏场
    */
    PlayWayType[PlayWayType["PlayField"] = 1] = "PlayField";
    /**
     * 奥马哈
    */
    PlayWayType[PlayWayType["Omaha"] = 2] = "Omaha";
})(PlayWayType || (PlayWayType = {}));
//# sourceMappingURL=GamblingEnum.js.map