module game
{
	/**
	 * 数组工具
	 */
	export class ArrayUtil
	{
		public static RemoveItem<T>(item: T, list: Array<T>, count: number = 1): number
		{
			if(count == 0)
			{
				return 0;
			}
			let rc:number = 0;
			for (let i: number = list.length - 1; i >= 0; i--)
			{
				if (list[i] == item)
				{
					list.splice(i, 1);
					rc++;
					if(count != -1 && rc >= count)
					{
						break;
					}
				}
			}
			return rc;
		}
		/**
		 * 清空索引数组，关联数组不可使用
		 */
		public static Clear(list: Array<any>)
		{
			if (list)
			{
				list.length = 0;
			}
		}
		/**
		 * 根据某一个值，获取这个值的索引相等的对象的索引
		 */
		public static getIndex(value: any, list: Array<any>, field: string)
		{
			if (list && field)
			{
				for (let i: number = 0; i < list.length; i++)
				{
					if (list[i][field] == value)
					{
						return i;
					}
				}
			}
			return -1;
		}
		/// <summary>
		/// 打乱顺序
		/// </summary>
		/// <param name="array"></param>
		/// <param name="startIndex"></param>
		/// <param name="length"></param>
		public static moveSomeElementsToTheEnd(array: Array<any>, startIndex: number, len: number)
		{
			if (startIndex < 0 || startIndex >= array.length - 1)
			{
				//throw new Exception("startIndex must be greater than 0 and less than " + (array.length - 1).ToString());
			}

			if (startIndex + len + 1 > array.length)
			{
				//throw new Exception("Please provide a valid length");
			}

			let temp: Array<any> = new Array<any>(len);
			for (let i: number = 0; i < temp.length; i++)
			{
				temp[i] = array[startIndex + i];
			}

			//Move forward the other element
			for (let i: number = startIndex; i < array.length - len; i++)
			{
				array[i] = array[i + len];
			}

			//Move the first part back to the end of array
			let k: number = 0;
			for (let i: number = array.length - len; i < array.length; i++)
			{
				array[i] = temp[k];
				k++;
			}
		}
	}
}