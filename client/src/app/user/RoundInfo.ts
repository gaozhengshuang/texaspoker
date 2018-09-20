/**
 * 战绩信息拆分
 */
class RoundSplitInfo extends BaseServerValueInfo 
{
	/**
	 * 回放码
	 */
	public id: number;
	/**
	 * 局数
	 */
	public round: number;
	/**
	 * 游戏时间
	 */
	public time: number;
	/**
	 * 角色ID
	 */
	public roleId: number;
	/**
	 * 微信头像
	 */
	public head: string;
	/**
	 * 昵称
	 */
	public name: string;
	/**
	 * 性别
 	 */
	public sex: number;
	/**
	 * 是否是房主
	 */
	public isHost: boolean;
	/**
	 * 微信昵称2
	 */
	public name2: string;
	/**
	 * 微信昵称3
	 */
	public name3: string;
	/**
	 * 微信昵称4
	 */
	public name4: string;
	/**
	 * 积分1
	 */
	public score: number;
	/**
	 *积分2
	 */
	public score2: number;
	/**
	 *积分3
	 */
	public score3: number;
	/**
	 * 积分4
	 */
	public score4: number;
	/**
	 * 第几次开房间
	 */
	public roundIndex: number;
	public reset()
	{

	}
}
/**
 * 战绩信息
 */
class RoundInfo extends BaseServerValueInfo 
{
	/**
	 * 回放码
	 */
	public id: number;
	/**
	 * 局数
	 */
	public round: number;
	/**
	 * 游戏时间
	 */
	public time: number;
	/**
	 * 角色ID1
	 */
	public roleId1: number;
	/**
	 * 微信头像1
	 */
	public head1: string;
	/**
	 * 微信头像2
	 */
	public head2: string;
	/**
	 * 微信头像3
	 */
	public head3: string;
	/**
	 * 微信头像4
	 */
	public head4: string;
	/**
	 * 昵称1
	 */
	public name1: string;
	/**
	 * 昵称2
	 */
	public name2: string;
	/**
	 * 昵称3
	 */
	public name3: string;
	/**
	 * 昵称4
	 */
	public name4: string;
	/**
	 * 性别1
 	 */
	public sex1: number;
	/**
	 * 性别2
 	 */
	public sex2: number;
	/**
	 * 性别3
 	 */
	public sex3: number;
	/**
	 * 性别4
 	 */
	public sex4: number;
	/**
	 * 是否是房主
	 */
	public hostRoleId: number;
	/**
	 *积分1
	 */
	public score1: number;
	/**
	 *积分2
	 */
	public score2: number;
	/**
	 *积分3
	 */
	public score3: number;
	/**
	 * 积分4
	 */
	public score4: number;
	/**
	 * 玩的局数
	 */
	public index: number;
	/**
	 * 进行游戏的实际局数
	 */
	public roundNum:number;
	public reset()
	{

	}
}
/**
 * 房间结束
 */
enum RoomOverType
{
	/**
	 * 正常结算
	 */
	Usual = 1,
	/**
	 * 房间解散
	 */
	Disband = 2
}
/**
 * 一局详细信息
 */
class RoundDetialsInfo extends RoundInfo
{
	public type: RoomOverType;
}