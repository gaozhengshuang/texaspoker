module qin
{
	/**
	 * 集合
	 */
	export class HashSet<T>
	{
		private _values: T[] = [];
		public get count(): number
		{
			return this._values.length;
		}
		public add(value: T): void
		{
			if(this._values.indexOf(value) == -1)
			{
				this._values.push(value);
			}
		}
		public remove(value: T):void
		{
			var index:number = this._values.indexOf(value);
			if(index >= 0)
			{
				this._values.splice(index, 1);
			}
		}
		public contains(value: T): boolean
		{
			return this._values.indexOf(value) >= 0;
		}
		public clear(): void
		{
			this._values.length = 0;
		}
		/**
		 * 循环每一项执行函数
		 */
		public foreach(callback:Function, thisObject:any):void
		{
			for(let i:number=0,length:number=this._values.length; i < length; i++)
			{
				callback.call(thisObject, this._values[i]);
			}
		}
		/**
		 * 循环每一项执行测试函数，直到获得返回true
		 */
		public some(callback:Function, thisObject:any):boolean
		{
			for(let i:number=0,length:number=this._values.length; i < length; i++)
			{
				if(callback.call(thisObject, this._values[i]))
				{
					return true;
				}
			}
			return false;
		}
		/**
		 * 循环每一项执行测试函数，直到获得返回false
		 */
		public every(callback:Function, thisObject:any):boolean
		{
			for(let i:number=0,length:number=this._values.length; i < length; i++)
			{
				if(!callback.call(thisObject, this._values[i]))
				{
					return true;
				}
			}
			return false;
		}
	}
}