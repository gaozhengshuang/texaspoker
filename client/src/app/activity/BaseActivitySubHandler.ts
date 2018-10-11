/**
 * 活动处理交互基类
 */
abstract class BaseActivitySubHandler<T extends BaseActivitySubInfo<IBaseActivitySubDefnition>>
{
	/**
	 * 活动类型
	 */
	public type: ActivityType;
	/**
	 * 活动列表
	 */
	protected _list: Array<ActivityInfo> = new Array<ActivityInfo>();

	constructor(type: ActivityType)
	{
		this.type = type;
	}

	public get list(): Array<ActivityInfo>
	{
		return this._list;
	}
	/**
	 * 初始化
	 */
	public initialize(info: ActivityInfo)
	{
		let isExist: boolean = false;
		for (let childInfo of this._list)
		{
			if (info.id == childInfo.id) //已存在重新写入信息
			{
				isExist = true;
				childInfo.copyValueFrom(info);
			}
		}
		if (isExist == false) // 不存在则添加
		{
			this._list.push(info);
		}
	}
	/**
	 * 创建子信息
	 */
	protected addSubInfo(info: ActivityInfo, cls: { new (): T; }, def: IBaseActivitySubDefnition): T
	{
		if (def.ActivityId == info.id)
		{
			let instance = new cls();
			instance.id = def.ActivityId;
			instance.subId = def.SubId;

			if (!info.subList)
			{
				info.subList = new Array<T>();
			}
			if (ActivityUtil.isExistSubInfo(info, def.SubId) == false)
			{
				info.subList.push(instance);
			}
			return instance;
		}
		return null;
	}
	/**
	 * 设置所有json数据
	 */
	public setJson(info: ActivityInfo)
	{

	}

	/**
	 *领取奖励完成回调
	 */
	public onGetAwardComplete(id: number, subId: number)
	{

	}
	/**
	 * 清理数据
	 */
	public clear()
	{
		game.ArrayUtil.Clear(this._list);
	}
	protected getInfo(id: number): ActivityInfo
	{
		if (this.list)
		{
			let info: ActivityInfo;
			for (let i: number = 0; i < this.list.length; i++)
			{
				info = this.list[i];
				if (info.id == id)
				{
					return info;
				}
			}
		}
		return null;
	}
	/**
	 * 获取活动子信息,活动ID，活动子ID
	 */
	protected getSubInfo(id: number, subId: number): T
	{
		if (this.list)
		{
			let info: ActivityInfo;
			for (let i: number = 0; i < this.list.length; i++)
			{
				info = this.list[i];
				if (info.id == id && info.subList)
				{
					for (let subInfo of info.subList)
					{
						if (subInfo.subId == subId)
						{
							return <T>subInfo;
						}
					}
				}
			}
		}
		return null;
	}
	/**
	 * 拉取单个活动信息后，刷新操作
	 */
	public refreshActivityInfo(id: number)
	{

	}
}