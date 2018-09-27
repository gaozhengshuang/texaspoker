/**
 * 子活动定义
 */
abstract class BaseActivitySubDefined<T extends IBaseActivitySubDefnition>
{
	/**
	 * 获取
	 */
	public getSubDefinition(id: number, subId: number, targetList: IBaseActivitySubDefnition[]): IBaseActivitySubDefnition
	{
		if (targetList)
		{
			for (let def of targetList)
			{
				if (def.Id == id && def.SubId == subId)
				{
					return def;
				}
			}
		}
		game.Console.log("获取活动子表定义异常！Id:" + id + " " + "subId:" + subId);
		return null;
	}
}