module game
{
	/**
	 * 拷贝工具
	 */
	export class CopyUtil
	{
		/**
		 * 拷贝子列表对象
		 */
		public static supCopyList<T extends BaseServerValueInfo>(targetData: any, sourceData: any, propertyName: string, classType: any)
		{
			if (sourceData && targetData && sourceData[propertyName])
			{
				targetData[propertyName] = new Array<T>();
				let content: T;
				for (let i: number = 0; i < sourceData[propertyName].length; i++) //子对象的二级copy
				{
					content = new classType();
					content.copyValueFrom(sourceData[propertyName][i]);
					targetData[propertyName].push(content);
				}
			}
		}
		/**
		 * 拷贝二级对象
		 */
		public static subCopy<T extends BaseServerValueInfo>(targetData: any, sourceData: any, propertyName: string, classType: any)
		{
			if (sourceData && targetData && sourceData[propertyName])
			{
				targetData[propertyName] = new classType();
				(targetData[propertyName] as T).copyValueFrom(sourceData[propertyName]);
			}
		}
		/**
		 * 浅复制 一维拷贝
		 */
		public static copy(source: any, target: any)
		{
			if (source && target)
			{
				for (let key in source)
				{
					target[key] = source[key];
				}
			}
			else
			{
				Console.log("copy参数异常：source", source, "target:", target);
			}
		}
	}
}