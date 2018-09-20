/**
 * 聊天消息类型
 */
enum ChatMessageType
{
	/**
	 * 房间聊天
	 */
    InRoom = 1,
	/**
	 * 跑马灯
	 */
    Maquee = 2,
}
/**
 * 聊天子类型
*/
enum ChatSubType
{
    /**
     * 正常消息
     */
    Normal = 1,
    /**
     * 表情
     */
    Emoji = 2,
    /**
     * 语音
    */
    AudioRecordMessage = 3,
    /**
     * 小喇叭
    */
    Horn = 4,
}
/**
 * 聊天特殊字符
 */
class ChatSpecialStrings
{
    /**
     * 表情
     */
    public static Emoji:string = "#Emoji#"
	/**
	 * 录音消息
	 */
    public static AudioRecordMessage: string = "#AudioRecordMessage#";
	/**
	 * 分享战斗视频
	 */
    public static ShareVcr: string = "#ShareVcr#";
	/**
	 * 打开某个面板
	 */
    public static OpenModule: string = "#OpenModule#";
}
/**
 * 消息显示时机
*/
enum MarqueeMsgShowTime
{
    /**
     * 全部显示
    */
    All = 0,
    /**
     * 只在房间内显示
    */
    OnRoom = 1,
    /**
     * 只在锦标赛显示
    */
    OnMTT = 2,
    /**
     * 只在游戏局显示
    */
    OnGambling = 3,
    /**
     * 只在百人大战显示
    */
    OnHundredWar = 4,
}
/**
 * 跑马灯内容类型
*/
enum MarqueeMsgType
{
    /**
     * 系统后台
    */
    SystemMsg = 0,
    /**
     * 锦标赛消息
    */
    MTTMsg = 1,
    /**
     * 百人大战消息
    */
    HundredWarMsg = 2,
    /**
     * 小喇叭消息
    */
    HornMag = 3,
}