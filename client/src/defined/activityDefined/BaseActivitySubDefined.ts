/**
 * 子活动定义
 */
abstract class BaseActivitySubDefined<T extends BaseActivitySubDefnition> extends BaseDefined<T>
{
	/**
	 * 获取
	 */
	public getSubDefinition(id: number, subId: number): T
	{
		if (this.dataList)
		{
			for (let def of this.dataList)
			{
				if (def.id == id && def.subId == subId)
				{
					return def;
				}
			}
		}
		game.Console.log("获取活动子表定义异常！Id:" + id + " " + "subId:" + subId);
		return null;
	}
}