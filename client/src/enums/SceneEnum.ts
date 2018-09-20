/**
 * 场景层枚举
 * */
enum SceneLayer
{
	/*无*/
	None = 0,
	/*地图层*/
	Map = 1,
	/*模型层*/
	Model = 2,
	/*特效层*/
	Effect = 3,
	/*数字层*/
	Text = 4,
}
/**
 * 场景类型枚举
 * */
enum SceneType
{
	None = 0,
	/**
	 * 登录场景
	 */
	Login = 1,
	/**
	 * 大厅
	 */
	Hall = 2,
	/**
	 * 游戏场景
	 */
	Game = 3,
	/**
	 * 百人大战
	 */
	HundredWar = 4,
}
/**
 * 场景切换行为
 */
enum SceneSwitchAction
{
	None = 0,
	/**
	 * 基于场景面板 打开面板
	 */
	OpenPanel = 1,
	/**
	 * 替换场景面板显示
	 */
	RepleacePanel = 2,
}