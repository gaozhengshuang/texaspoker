/**
 * 音效枚举
 */
class MusicAction
{
	/**
	 * 发牌
	 */
	public static fapai: string = "fapai";
	/**
	* 全下
	*/
	public static allin: string = "allin";
	/**
	* 跟注
	*/
	public static call: string = "call";
	/**
	* 过牌
	*/
	public static check: string = "check";
	/**
	* 弃牌
	*/
	public static fold: string = "fold";
	/**
	* 加注
	*/
	public static raise: string = "raise";
	/**
	* 全下下注
	*/
	public static bet_allin: string = "bet_allin";
	/**
	* 非全下下注
	*/
	public static bet_no_allin: string = "bet_no_allin";
	/**
	* 加注滑动
	*/
	public static bet_slider: string = "bet_slider";
	/**
	* 大胜利（葫芦及以上）
	*/
	public static bigWin: string = "bigWin";
	/**
	* 下盲注
	*/
	public static blind: string = "blind";
	/**
	* 按钮点击
	*/
	public static buttonClick: string = "buttonClick";
	/**
	* 皇家同花顺
	*/
	public static cardtype_huangjiatonghua: string = "cardtype_huangjiatonghua";
	/**
	* 葫芦
	*/
	public static cardtype_hulu: string = "cardtype_hulu";
	/**
	* 四条
	*/
	public static cardtype_sitiao: string = "cardtype_sitiao";
	/**
	* 同花顺
	*/
	public static cardtype_tonghuashun: string = "cardtype_tonghuashun";
	/**
	* 筹码落下（一轮下注结束）
	*/
	public static chip_fall: string = "chip_fall";
	/**
	* 筹码结算飞行
	*/
	public static chipfly: string = "chipfly";
	/**
	* 结束筹码
	*/
	public static chips_move_to_seat: string = "chips_move_to_seat";
	/**
	* 界面关闭
	*/
	public static close: string = "close";
	/**
	* 弃牌音效
	*/
	public static foldpai: string = "foldpai";
	/**
	* 收取礼物
	*/
	public static gift_recv: string = "gift_recv";
	/**
	* 发送礼物
	*/
	public static gift_send: string = "gift_send";
	/**
	* 获得金币
	*/
	public static gold_fall: string = "gold_fall";
	/**
	* 大厅背景音乐
	*/
	public static hallBgm: string = "hallBgm";
	/**
	* 升级
	*/
	public static levelup: string = "levelup";
	/**
	* 亮牌
	*/
	public static light_card: string = "light_card";
	/**
	* 失败
	*/
	public static lose: string = "lose";
	/**
	* 有提示（加好友、邀请入座）
	*/
	public static notice: string = "notice";
	/**
	* 轮到自己出牌
	*/
	public static on_turn: string = "on_turn";
	/**
	* 游戏中背景音乐
	*/
	public static playingBgm: string = "playingBgm";
	/**
	* 界面打开
	*/
	public static popup: string = "popup";
	/**
	* 发送信息
	*/
	public static sentMessage: string = "sentMessage";
	/**
	* 入座
	*/
	public static sit: string = "sit";
	/**
	* 站起
	*/
	public static sit_out: string = "sit_out";
	/**
	* 点击座位
	*/
	public static sitClick: string = "sitClick";
	/**
	* 胜利
	*/
	public static win: string = "win";
	/**
	* 获得道具
	*/
	public static item_fall: string = "item_fall";

}
/**
 * 音乐，音效名枚举
 */
class MusicResEnum
{
	/**
	 * 登录&大厅
	 */
	public static Login_Hall: string = "hallBgm";
	/**
	 * 游戏
	 */
	public static Game: string = "playingBgm";
	/**
	 * 获取背景音乐音效资源
	 */
	public static getBgSoundRes(type: SceneType): string
	{
		switch (type)
		{
			case SceneType.Login:
			case SceneType.Hall:
				return MusicResEnum.Login_Hall;
			case SceneType.Game:
				return MusicResEnum.Game;
		}
		return game.StringConstants.Empty;
	}
}