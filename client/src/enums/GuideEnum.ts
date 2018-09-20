/**
 * 引导类型
 */
enum GuideType
{
	None = 0,
	/**
	 * 新手引导
	 */
	NewUser = 1,
}
/**
 * 引导触发类型
 */
enum GuideTriggerType
{
	None = 0,
	/**
	 * 登录到大厅触发
	 */
	Login_Hall = 1,
}
/**
 * 引导步骤类型
 */
enum GuideStepType
{
	None = 0,
	/**
	 * 创建房间
	 */
	CreateRoom = 1,
	/**
	 * 发牌
	 */
	FlopCard = 2,
	/**
	 * 发公共牌
	 */
	BoardCard = 3,
	/**
	 * 需要玩家手动操作的行为 (加注，跟注，allin，弃牌)
	 */
	Action = 5,
	/**
	 * 引导提示
	 */
	Tips = 6,
	/**
	 * 打开面板
	 */
	OpenPanel = 7,
	/**
	 * 牌局结算
	 */
	GamblingOver = 8,
	/**
	 * 点击
	 */
	Click = 9,
	/**
	 * 滑动
	 */
	Slide = 10,
	/**
	 * 场景切换
	 */
	SwitchScene = 11,
	/**
	 * 指示
	 */
	Prompt = 12,
	/**
	 * 隐藏组件
	 */
	HideComponent = 13,
	/**
	 * 执行面板函数
	 */
	RunPanelFunc = 14,
}
/**
 * 引导tips or 指示方向
 */
enum GuideTipsOrientation
{
	None = 0,
	/**
	 * 上
	 */
	Up = 1,
	/**
	 * 下
	 */
	Down = 2,
	/**
	 * 左
	 */
	Left = 3,
	/**
	 * 右
	 */
	Right = 4
}
/**
 * 新手引导选择面板类型
*/
enum GuideChooseType
{
    /**
     * 进入新手引导选择
    */
	IsEnterGuide = 1,
    /**
     * 进入训练营选择
    */
	IsEnterTrainingCamp = 2
}