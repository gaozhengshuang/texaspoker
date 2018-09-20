/**
 * 弹窗类型
 */
enum PopupType
{
	/**
	 * 创建角色
	 */
	CreateRole = 1,
	/**
	 * 引导
	 */
	Guide = 2,
	/**
 	* 文字公告
 	*/
	TextNotify = 3,
	/**
 	* 图片公告
 	*/
	ImageNotify = 4,
	/**
	 * 签到
	 */
	SignIn = 5,
	/**
	 * 首冲
	 */
	FirstPay = 6,
}
/**
 * 触发弹窗类型
 */
enum PopupTriggerType
{
	/**
	 * 打开面板触发
	 */
	OpenPanel = 1,
	/**
	 * 关闭面板触发
	 */
	ClosePanel = 2,
	/**
	 * 引导完毕触发
	 */
	GuideComplete = 3,
}