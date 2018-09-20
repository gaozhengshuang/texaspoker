var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 音效枚举
 */
var MusicAction = (function () {
    function MusicAction() {
    }
    /**
     * 发牌
     */
    MusicAction.fapai = "fapai";
    /**
    * 全下
    */
    MusicAction.allin = "allin";
    /**
    * 跟注
    */
    MusicAction.call = "call";
    /**
    * 过牌
    */
    MusicAction.check = "check";
    /**
    * 弃牌
    */
    MusicAction.fold = "fold";
    /**
    * 加注
    */
    MusicAction.raise = "raise";
    /**
    * 全下下注
    */
    MusicAction.bet_allin = "bet_allin";
    /**
    * 非全下下注
    */
    MusicAction.bet_no_allin = "bet_no_allin";
    /**
    * 加注滑动
    */
    MusicAction.bet_slider = "bet_slider";
    /**
    * 大胜利（葫芦及以上）
    */
    MusicAction.bigWin = "bigWin";
    /**
    * 下盲注
    */
    MusicAction.blind = "blind";
    /**
    * 按钮点击
    */
    MusicAction.buttonClick = "buttonClick";
    /**
    * 皇家同花顺
    */
    MusicAction.cardtype_huangjiatonghua = "cardtype_huangjiatonghua";
    /**
    * 葫芦
    */
    MusicAction.cardtype_hulu = "cardtype_hulu";
    /**
    * 四条
    */
    MusicAction.cardtype_sitiao = "cardtype_sitiao";
    /**
    * 同花顺
    */
    MusicAction.cardtype_tonghuashun = "cardtype_tonghuashun";
    /**
    * 筹码落下（一轮下注结束）
    */
    MusicAction.chip_fall = "chip_fall";
    /**
    * 筹码结算飞行
    */
    MusicAction.chipfly = "chipfly";
    /**
    * 结束筹码
    */
    MusicAction.chips_move_to_seat = "chips_move_to_seat";
    /**
    * 界面关闭
    */
    MusicAction.close = "close";
    /**
    * 弃牌音效
    */
    MusicAction.foldpai = "foldpai";
    /**
    * 收取礼物
    */
    MusicAction.gift_recv = "gift_recv";
    /**
    * 发送礼物
    */
    MusicAction.gift_send = "gift_send";
    /**
    * 获得金币
    */
    MusicAction.gold_fall = "gold_fall";
    /**
    * 大厅背景音乐
    */
    MusicAction.hallBgm = "hallBgm";
    /**
    * 升级
    */
    MusicAction.levelup = "levelup";
    /**
    * 亮牌
    */
    MusicAction.light_card = "light_card";
    /**
    * 失败
    */
    MusicAction.lose = "lose";
    /**
    * 有提示（加好友、邀请入座）
    */
    MusicAction.notice = "notice";
    /**
    * 轮到自己出牌
    */
    MusicAction.on_turn = "on_turn";
    /**
    * 游戏中背景音乐
    */
    MusicAction.playingBgm = "playingBgm";
    /**
    * 界面打开
    */
    MusicAction.popup = "popup";
    /**
    * 发送信息
    */
    MusicAction.sentMessage = "sentMessage";
    /**
    * 入座
    */
    MusicAction.sit = "sit";
    /**
    * 站起
    */
    MusicAction.sit_out = "sit_out";
    /**
    * 点击座位
    */
    MusicAction.sitClick = "sitClick";
    /**
    * 胜利
    */
    MusicAction.win = "win";
    /**
    * 获得道具
    */
    MusicAction.item_fall = "item_fall";
    return MusicAction;
}());
__reflect(MusicAction.prototype, "MusicAction");
/**
 * 音乐，音效名枚举
 */
var MusicResEnum = (function () {
    function MusicResEnum() {
    }
    /**
     * 获取背景音乐音效资源
     */
    MusicResEnum.getBgSoundRes = function (type) {
        switch (type) {
            case SceneType.Login:
            case SceneType.Hall:
                return MusicResEnum.Login_Hall;
            case SceneType.Game:
                return MusicResEnum.Game;
        }
        return qin.StringConstants.Empty;
    };
    /**
     * 登录&大厅
     */
    MusicResEnum.Login_Hall = "hallBgm";
    /**
     * 游戏
     */
    MusicResEnum.Game = "playingBgm";
    return MusicResEnum;
}());
__reflect(MusicResEnum.prototype, "MusicResEnum");
//# sourceMappingURL=SoundEnum.js.map