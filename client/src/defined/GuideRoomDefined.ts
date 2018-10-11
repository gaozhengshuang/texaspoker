/**
 * 引导房间配置
 */
class GuideRoomDefined extends BaseDefined<GuideRoomDefinition>
{
	private static readonly config: string = "guideRoom";
	private static _instance: GuideRoomDefined;
	public static GetInstance(): GuideRoomDefined
	{
		if (!GuideRoomDefined._instance)
		{
			GuideRoomDefined._instance = new GuideRoomDefined();
		}
		if (DefinedManager.IsParsed(GuideRoomDefined.config) == false)
		{
			GuideRoomDefined._instance.initialize();
		}
		return GuideRoomDefined._instance;
	}

	private initialize()
	{
		this.dataList = DefinedManager.GetData(GuideRoomDefined.config) as Array<GuideRoomDefinition>;
	}
}
/**
 * 引导房间配置 
 */
class GuideRoomDefinition implements IBaseDefintion
{
	public Id: number;
	/**
	 * 房间ID
	 */
	public roomId: number;
	/**
	 * 玩家列表
	 */
	public playerList: Array<GuideRoomPlayerDefinition>;
	/**
	 * 庄家位置
	 */
	public buttonPos: number;
}
/**
 * 引导房间中玩家配置
 */
class GuideRoomPlayerDefinition
{
	/**
	 * 玩家Roleid
	 */
	public roleId: number;
	/**
	 * 身上的筹码数
	 */
	public bankRoll: number;
	/**
	 * 位置
	 */
	public pos: number;
	/**
	 * 头像
	 */
	public head: string;
	/**
	 * 用户信息
	 */
	public userInfo: any;
}