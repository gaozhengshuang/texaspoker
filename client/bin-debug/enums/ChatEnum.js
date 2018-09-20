var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 聊天消息类型
 */
var ChatMessageType;
(function (ChatMessageType) {
    /**
     * 房间聊天
     */
    ChatMessageType[ChatMessageType["InRoom"] = 1] = "InRoom";
    /**
     * 跑马灯
     */
    ChatMessageType[ChatMessageType["Maquee"] = 2] = "Maquee";
})(ChatMessageType || (ChatMessageType = {}));
/**
 * 聊天子类型
*/
var ChatSubType;
(function (ChatSubType) {
    /**
     * 正常消息
     */
    ChatSubType[ChatSubType["Normal"] = 1] = "Normal";
    /**
     * 表情
     */
    ChatSubType[ChatSubType["Emoji"] = 2] = "Emoji";
    /**
     * 语音
    */
    ChatSubType[ChatSubType["AudioRecordMessage"] = 3] = "AudioRecordMessage";
    /**
     * 小喇叭
    */
    ChatSubType[ChatSubType["Horn"] = 4] = "Horn";
})(ChatSubType || (ChatSubType = {}));
/**
 * 聊天特殊字符
 */
var ChatSpecialStrings = (function () {
    function ChatSpecialStrings() {
    }
    /**
     * 表情
     */
    ChatSpecialStrings.Emoji = "#Emoji#";
    /**
     * 录音消息
     */
    ChatSpecialStrings.AudioRecordMessage = "#AudioRecordMessage#";
    /**
     * 分享战斗视频
     */
    ChatSpecialStrings.ShareVcr = "#ShareVcr#";
    /**
     * 打开某个面板
     */
    ChatSpecialStrings.OpenModule = "#OpenModule#";
    return ChatSpecialStrings;
}());
__reflect(ChatSpecialStrings.prototype, "ChatSpecialStrings");
/**
 * 消息显示时机
*/
var MarqueeMsgShowTime;
(function (MarqueeMsgShowTime) {
    /**
     * 全部显示
    */
    MarqueeMsgShowTime[MarqueeMsgShowTime["All"] = 0] = "All";
    /**
     * 只在房间内显示
    */
    MarqueeMsgShowTime[MarqueeMsgShowTime["OnRoom"] = 1] = "OnRoom";
    /**
     * 只在锦标赛显示
    */
    MarqueeMsgShowTime[MarqueeMsgShowTime["OnMTT"] = 2] = "OnMTT";
    /**
     * 只在游戏局显示
    */
    MarqueeMsgShowTime[MarqueeMsgShowTime["OnGambling"] = 3] = "OnGambling";
    /**
     * 只在百人大战显示
    */
    MarqueeMsgShowTime[MarqueeMsgShowTime["OnHundredWar"] = 4] = "OnHundredWar";
})(MarqueeMsgShowTime || (MarqueeMsgShowTime = {}));
/**
 * 跑马灯内容类型
*/
var MarqueeMsgType;
(function (MarqueeMsgType) {
    /**
     * 系统后台
    */
    MarqueeMsgType[MarqueeMsgType["SystemMsg"] = 0] = "SystemMsg";
    /**
     * 锦标赛消息
    */
    MarqueeMsgType[MarqueeMsgType["MTTMsg"] = 1] = "MTTMsg";
    /**
     * 百人大战消息
    */
    MarqueeMsgType[MarqueeMsgType["HundredWarMsg"] = 2] = "HundredWarMsg";
    /**
     * 小喇叭消息
    */
    MarqueeMsgType[MarqueeMsgType["HornMag"] = 3] = "HornMag";
})(MarqueeMsgType || (MarqueeMsgType = {}));
//# sourceMappingURL=ChatEnum.js.map