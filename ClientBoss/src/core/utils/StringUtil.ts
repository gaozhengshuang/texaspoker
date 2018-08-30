module game
{
	/**
	 * 字符串工具
	 */
	export class StringUtil 
	{
		/**
		 * 转为布尔值
		 */
		public static toBoolean(str:string):boolean
		{
			if(StringUtil.isNullOrEmpty(str))
			{
				return false;
			}
			if(str == '0' || str == 'false')
			{
				return false;
			}
			return true;
		}
		/**
		 * 是否是undefined null ""
		 */
		public static isNullOrEmpty(str: string): boolean
		{
			return (str === undefined || str === null || str === "");
		}
		/**
		 * 是否是undefined null(不包括空字符串)
		 */
		public static isNull(str: string): boolean
		{
			return (str === undefined || str === null);
		}
		/**
		 * 格式化
		 */
		public static format(str: string, ...args): string
		{
			if (args && str)
			{
				for (let i: number = 0; i < args.length; i++)
				{
					str = str.replace("{" + i.toString() + "}", args[i])
				}
			}
			return str;
		}
		/**
		 * 字符串转换成int数组
		 */
		public static toIntArray(content: string, separator: string = ','): Array<number>
		{
			let stringList: Array<string> = StringUtil.toStringArray(content, separator);
			if (stringList == null)
			{
				return null;
			}
			let list: Array<number> = new Array<number>(stringList.length);
			let str: string;
			for (let i: number = 0; i < stringList.length; i++)
			{
				str = stringList[i];
				list[i] = str ? parseInt(str) : 0;
			}
			return list;
		}
		/**
		 * 字符串转换成float数组
		 */
		public static toFloatArray(content: string, separator: string = ','): Array<number>
		{
			let stringList: Array<string> = StringUtil.toStringArray(content, separator);
			if (stringList == null)
			{
				return null;
			}
			let list: Array<number> = new Array<number>(stringList.length);
			let str: string;
			for (let i: number = 0; i < stringList.length; i++)
			{
				list[i] = str ? parseFloat(str) : 0;
			}
			return list;
		}
		/**
		 * 字符串转换成字符数组
		 */
		public static toStringArray(content: string, separator: string = ','): Array<string>
		{
			if (!content)
			{
				return null;
			}
			return content.split(separator);
		}
		/**
		 * 前面补零
		 */
		public static beforeZeroFill(value:string|number, count:number):string
		{
			return StringUtil._zeroFill(value, count, true);
		}
		/**
		 * 后补零
		 */
		public static afterZeroFill(value:string|number, count:number):string
		{
			return StringUtil._zeroFill(value, count, false);
		}
		private static _zeroFill(value:string|number, count:number, isLeading:boolean):string
		{
			if(value === undefined || value === null)
			{
				value = '';
			}
			let length:number = count - (value + '').length;
			if(length <= 0)
			{
				return value + '';
			}
			let s = '';
			for(let i=0; i < length; i++)
			{
				s += '0';
			}
			return isLeading ? s + value : value + s;
		}
	}
}