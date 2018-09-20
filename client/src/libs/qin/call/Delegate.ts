module qin
{
	/**
	 * 委托
	 */
	export class Delegate
	{
		private static _poolList:Array<Delegate> = new Array<Delegate>();
		/**
		 * 获取
		 */
		public static getOut(method: Function, target: any):Delegate
		{
			if(Delegate._poolList.length > 0)
			{
				let obj:Delegate = Delegate._poolList.pop();
				obj.reset(method, target);
				return obj;
			}
			else
			{
				return new Delegate(method, target);
			}
		}
		/**
		 * 存入
		 */
		public static putIn(obj:Delegate):void
		{
			if(obj != null && Delegate._poolList.length < 20)
			{
				obj.reset();
				Delegate._poolList.push(obj);
			}
		}

		//--------------------------------------------------------------
		// 
		//--------------------------------------------------------------

		private _method: Function;
		public get method(): Function
		{
			return this._method;
		}
		private _target: any;
		public get target(): any
		{
			return this._target;
		}

		public constructor(method: Function, target: any)
		{
			this._method = method;
			this._target = target;
		}
		public reset(method?: Function, target?: any)
		{
			this._method = method;
			this._target = target;
		}
		/**
		 * 是否相等
		 */
		public equals(obj:Delegate)
		{
			if(obj != null)
			{
				if(this._method == obj._method && this._target == obj._target)
				{
					return true;
				}
			}
			return false;
		}
		/**
		 * 是否相等
		 */
		public equals2(method: Function, target: any)
		{
			if(this._method == method && this._target == target)
			{
				return true;
			}
			return false;
		}
		public invoke(params?: any)
		{
			FuncUtil.invoke(this._method, this._target, params);
		}
	}
}