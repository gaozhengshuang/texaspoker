namespace qin
{
	/**
	 * 字典
	 */
	export class Dictionary<KT, VT>
	{
		private _keys: KT[] = [];
		private _values: VT[] = [];

		public get count(): number
		{
			return this._keys.length;
		}

		/**
		 * 添加
		 */
		public add(key: KT, value: VT): void
		{
			var index:number = this._keys.indexOf(key, 0);
			if(index >= 0)
			{
				this._values[index] = value;
			}
			else
			{
				this._keys.push(key);
				this._values.push(value);
			}
		}
		/**
		 * 移除
		 */
		public remove(key: KT): void
		{
			var index:number = this._keys.indexOf(key, 0);
			if(index >= 0)
			{
				this._keys.splice(index, 1);
				this._values.splice(index, 1);
			}
		}
		/**
		 * 根据值获取KEY
		 */
		public getKey(value: VT): KT
		{
			let index: number = this._values.indexOf(value);
			if (index >= 0)
			{
				return this._keys[index];
			}
			return null;
		}
		/**
		 *开启"[]"访问的情况下，缓存与字典数据为同一份，引用数据会同时修改，
		*非引用数据不能被修改，只能访问
		*/
		public getValue(key: KT): VT
		{
			var index:number = this._keys.indexOf(key, 0);
			if (index != -1)
			{
				return this._values[index];
			}
			return null;
		}
		public containsKey(key: KT): boolean
		{
			return this._keys.indexOf(key) >= 0;
		}
		public containsValue(value: VT): boolean
		{
			return this._values.indexOf(value) >= 0;
		}
		public getKeys(): KT[]
		{
			return this._keys.concat();
		}

		public getValues(): VT[]
		{
			return this._values.concat();
		}
		public clear(): void
		{
			this._keys.length = 0;
			this._values.length = 0;
		}
		/**
		 * 循环每一项执行函数
		 */
		public foreach(callback:Function, thisObject:any):void
		{
			for(let i:number=0,length:number=this._keys.length; i < length; i++)
			{
				callback.call(thisObject, this._keys[i], this._values[i]);
			}
		}
		/**
		 * 循环每一项执行测试函数，直到获得返回true
		 */
		public some(callback:Function, thisObject:any):boolean
		{
			for(let i:number=0,length:number=this._keys.length; i < length; i++)
			{
				if(callback.call(thisObject, this._keys[i], this._values[i]))
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
			for(let i:number=0,length:number=this._keys.length; i < length; i++)
			{
				if(!callback.call(thisObject, this._keys[i], this._values[i]))
				{
					return true;
				}
			}
			return false;
		}
	}
}