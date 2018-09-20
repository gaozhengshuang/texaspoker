module qin
{
	/**
	 * 委托派发器
	 */
	export class DelegateDispatcher
	{
		private _list: Array<Delegate> = new Array<Delegate>();
		/**
		 * 销毁
		 */
		public destroy()
		{
			this._list = null;
		}
		/**
		 * 清空
		 */
		public clear()
		{
			this._list.length = 0;
		}
		/**
		 * 已添加回调侦听的数量
		 */
		public get count(): number
		{
			return this._list.length;
		}
		/**
		 * 添加呼叫回调侦听(自动过滤重复的方法)
		 */
		public addListener(listener: Function, thisObject: any)
		{
			for (let item of this._list)
			{
				if (item.equals2(listener, thisObject))
				{
					return;
				}
			}
			this._list.push(new Delegate(listener, thisObject));
		}
		/**
		 * 移除呼叫回调
		 */
		public removeListener(listener: Function, thisObject: any)
		{
			let length:number = this._list.length;
			for (let i: number = 0; i < length; i++)
			{
				if (this._list[i].equals2(listener, thisObject))
				{
					this._list.splice(i, 1);
					break;
				}
			}
		}
		/**
		 * 广播呼叫回调
		 */
		public dispatch(data?:any)
		{
			if(this._list.length > 0)
			{
				let list:Array<Delegate> = this._list.concat();//要拷贝
				for (let i: number = 0, length = list.length; i < length; i++)
				{
					list[i].invoke(data);
				}
			}
		}
	}
}