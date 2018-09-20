namespace qin
{
	/**
	 * 对象工具
	 */
	export class ObjectUtil
	{
		/**
 		* 以树级形式获取对象的属性
 		*/
		public static getTreeProperty(target: any, props: Array<string>): any
		{
			if (target && props)
			{
				let property: any = target;
				for (let i: number = 0; i < props.length; i++)
				{
					if (property)
					{
						property = property[props[i]];
					}
					else
					{
						qin.Console.log("树级获取对象异常！" + props + "i：" + props[i]);
					}
				}
				return property;
			}
			return null;
		}
	}
}
