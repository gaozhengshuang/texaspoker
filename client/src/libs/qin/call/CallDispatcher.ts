module game
{
	export class CallDispatcher<T>
	{
		private _map: Map<string, Array<Delegate>> = new Map<string, Array<Delegate>>();
		/**
		 * 销毁
		 */
		public dispose()
		{
			this._map = null;
		}
		public clear()
		{
			this._map.clear();
		}
		/**
		 * 已添加回调侦听的呼叫类型数量
		 */
		public get count(): number
		{
			return this._map.count;
		}
		/**
		 * 添加呼叫回调侦听(自动过滤重复的方法)
		 */
		public addListener(callId: string, listener: Function, thisObject: any)
		{
			let list: Array<Delegate> = this._map.getValue(callId);
			if (list)
			{
				for (let item of list)
				{
					if (item.equals2(listener, thisObject))
					{
						return;
					}
				}
			}
			else
			{
				list = new Array<Delegate>();
				this._map.add(callId, list);
			}
			list.push(new Delegate(listener, thisObject));
		}
		/**
		 * 移除呼叫回调
		 */
		public removeListener(callId: string, listener: Function, thisObject: any)
		{
			let list: Array<Delegate> = this._map.getValue(callId);
			if (list)
			{
				for (let i: number = 0; i < list.length; i++)
				{
					if (list[i].equals2(listener, thisObject))
					{
						list.splice(i, 1);
						break;
					}
				}
			}
		}
		/**
		 * 广播呼叫回调
		 */
		public dispatch(callId: string, data?: T)
		{
			let list: Array<Delegate> = this._map.getValue(callId);
			if (list)
			{
				list = list.concat();//要拷贝
				for (let i: number = 0, length = list.length; i < length; i++)
				{
					list[i].invoke(data);
				}
			}
		}
	}
}