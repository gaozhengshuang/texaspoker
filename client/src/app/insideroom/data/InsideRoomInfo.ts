/**
 * 自己在里面的房间信息（包括游戏场房间，百人大战房间，锦标赛房间）
 */
class InsideRoomInfo extends BaseServerValueInfo
{
	/**
	 * 赛事recordID
	 */
	public mttId: number;
	/**
	 * 房间唯一ID,有一定的规则，
	 * 100000-200000为游戏场的ID,
	 * 10001-19999是游戏场私人房ID,
	 * 20001-29999是Omaha私人房ID,
	 * 400000-499999为百人大战的ID,
	 * 500000-599999为锦标赛的ID,
	 * 600000-∞为Omaha
	 */
	public id: number;
	/**
	 * 房间的配置ID
	 */
	public tid:number;
	/**
	 * 房间的密码
	 */
	public passwd:string;
}