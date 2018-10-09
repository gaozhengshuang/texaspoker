//基础定义
interface IBaseDefintion 
{
	Id: number;
}
class BaseDefined<T extends IBaseDefintion>
{
	public dataList: Array<T>;
	public getDefinition(id: number): T
	{
		if (id == undefined)
		{
			return null;
		}
		if (this.dataList != null)
		{
			for (let i: number = 0; i < this.dataList.length; i++)
			{
				if (this.dataList[i].Id == id)
				{
					return this.dataList[i];
				}
			}
		}
		game.Console.log("获取配置信息失败！classname：" + egret.getQualifiedClassName(this) + " ID:" + id);
		return null;
	}
}


