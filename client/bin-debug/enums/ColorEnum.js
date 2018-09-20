var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 颜色
 */
var ColorEnum = (function () {
    function ColorEnum() {
    }
    /**
     * 绿色
     */
    ColorEnum.Green = 0x9AFF00;
    /**
     * 红色
     */
    ColorEnum.Red = 0xFF0000;
    /**
     * 金色
     */
    ColorEnum.Golden = 0xFECF13;
    /**
     * 黄色
     */
    ColorEnum.Yellow = 0xE6C21D;
    /**
     * 白色
     */
    ColorEnum.White = 0xFFFFFF;
    //---------------------好友------------------------	
    /**
     * 好友在线绿色
    */
    ColorEnum.OnlineGreen = 0x8efb88;
    /**
     * 邀请好友在线黄色
    */
    ColorEnum.InviteOnlineGreen = 0xFAD050;
    /**
     * 好友离线灰色
    */
    ColorEnum.OutlineGray = 0xdbd9dc;
    //---------------------锦标赛------------------------	
    /**
     * 锦标赛时间绿色
    */
    ColorEnum.MTT_time_Green = 0x4bc6b7;
    //---------------------拉霸------------------------
    ColorEnum.LaBa_Win_Com = 0xe29504;
    ColorEnum.LaBa_Win_Golden = 0xfdb900;
    //---------------------上局回顾--------------------
    /**
     * 玩家输了绿色
    */
    ColorEnum.Review_Lost_Green = 0x90f68e;
    /**
     * 玩家赢了橘黄色
    */
    ColorEnum.Review_Win_Orange = 0xff732e;
    //---------------------计时奖励------------------------
    /**
     * 已完成轮数奖励黄色
    */
    ColorEnum.TimeAward_Finish_Yellow = 0xFACA52;
    //---------------------月卡------------------------
    /**
     * 月卡未激活棕色
    */
    ColorEnum.MonthCard_Inactivite_Brown = 0x831f00;
    //---------------------邀请------------------------
    /**
     * 邀请已完成蓝色
    */
    ColorEnum.Invite_Finish_Blue = 0x0276d8;
    /**
     * 邀请未完成红色
    */
    ColorEnum.Invite_NotFinish_Red = 0xfd1604;
    return ColorEnum;
}());
__reflect(ColorEnum.prototype, "ColorEnum");
//# sourceMappingURL=ColorEnum.js.map