
/// <summary>
/// 服务器信息
/// </summary>
class ServerInfo extends BaseServerValueInfo
{
	private _id: number;
	public get id()
	{
		return this._id;
	}
	public set id(value: number)
	{
		this._id = value;
	}
	/// <summary>
	/// 当前服务器人数
	/// </summary>
	private _count: number;
	/// <summary>
	/// 是否是拥挤
	/// </summary>
	public get isCrowded(): boolean
	{
		return this._count > ProjectDefined.GetInstance().getValue(ProjectDefined.serverCrowded);
	}
	public set count(value: number)
	{
		this._count = value;
	}
	public status: number;
	/// <summary>
	/// 当前服务器角色id，没有为0
	/// </summary>
	public roleId: number = 0;

	public reset()
	{
		super.reset();
	}
}
