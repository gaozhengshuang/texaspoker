/**
 * 功能类型
 */
enum FuncType
{
	/**
	 * 绑定手机
	 */
	Bind = 1,
	/**
	 * 邀请
	 */
	Invite = 2,
	/**
	 * 聊天
	 */
	Chat = 3,
	/**
	 * 手牌竞猜
	 */
	GuessCard = 4,
}
/**
 * 功能开启工具
 */
class FuncOpenUtils
{
	/**
	 * 暂未使用的功能列表
	 */
	private static _notOpenList: FuncType[] = [FuncType.Bind, FuncType.Invite];

	public static isOpened(type: FuncType, needAlert: boolean = true): boolean
	{
		if (FuncOpenUtils._notOpenList.indexOf(type) == -1)
		{
			return true;
		}
		if (needAlert)
		{
			AlertManager.showAlertByString("暂未开启");
		}
		return false;
	}
}
