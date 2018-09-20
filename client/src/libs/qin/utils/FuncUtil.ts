namespace qin
{
	/**
	 * 函数调用工具
	 */
	export class FuncUtil
	{
		/**
		 * 调用函数
		 */
		public static invoke(func: Function, thisObject: any, params?: any)
		{
			if (func)
			{
				if (thisObject)
				{
					if (params === undefined)
					{
						func.call(thisObject);
					}
					else
					{
						func.call(thisObject, params);
					}
				}
				else
				{
					if (params === undefined)
					{
						func();
					}
					else
					{
						func(params);
					}
				}
			}
		}
	}
}