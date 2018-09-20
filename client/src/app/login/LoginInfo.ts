/**
 * 登录信息
 */
class LoginInfo extends BaseServerValueInfo
{
	/// <summary>
	/// 是否是白名单用户
	/// </summary>
	public isWhitelist: boolean = false;
	/// <summary>
	/// 用户id 账号id
	/// </summary>
	public userid: number;
	public secret: string;
	public session: number;
	public ServerList: Array<ServerInfo>;
	/// <summary>
	/// 最后登录的服务器id
	/// </summary>
	public LastSId: number;
	/// <summary>
	/// 角色信息列表
	/// </summary>
	public RolesSId: Array<RoleInfo>;
	/// <summary>
	/// 渠道数据
	/// </summary>
	public channeldata: Object;
	/// <summary>
	/// 当前账号已经创建过角色
	/// </summary>
	public hasAlreadyCreateRole: boolean = false;
	/// <summary>
	/// 游戏服ip
	/// </summary>
	public ip: string;
	/// <summary>
	/// 游戏服端口
	/// </summary>
	public port: number;
	/// <summary>
	/// 游戏服域名
	/// </summary>
	public domain: string;

	public reset()
	{

	}
	/**
	 * 获取服务器信息，只有一个服
	 */
	public getServerInfo(): ServerInfo
    {
        if (this.ServerList != null && this.ServerList.length > 0)
        {
            return this.ServerList[0];
        }
        return null;
    }
	public static CreateFromProto(obj: any): LoginInfo
	{
		let info: LoginInfo = new LoginInfo(obj);
		if (obj["status"] != null)
		{
			info.isWhitelist = (parseInt(obj["status"]) < 0);//小于0为白名单
		}
		if (info.channeldata)
		{
			info.channeldata = JSON.parse(info.channeldata.toString());
		}
		return info;
	}
}
/**
 * 角色信息
 */
class RoleInfo
{
	public roleid: number;
	public serverid: number;

	public static CreateFromProto(data: any): RoleInfo
	{
		let info: RoleInfo = data;
		return info;
	}
}
