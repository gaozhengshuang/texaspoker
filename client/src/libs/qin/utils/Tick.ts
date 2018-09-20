namespace qin
{
	/**
	 * 时钟
	 */
	export class Tick
	{
		private static readonly _frameList: Array<Delegate> = new Array<Delegate>();//每帧更新
		private static readonly _secondsList: Array<Delegate> = new Array<Delegate>();//1秒更新
		private static readonly _timeoutList: Array<TickInfo> = new Array<TickInfo>();
		private static _secondsTime: number;
		private static _hashCode: number = 0;

		public static initialize(stage: egret.Stage)
		{
			Tick._secondsTime = egret.getTimer();
			stage.addEventListener(egret.Event.ENTER_FRAME, Tick.OnEnterFrame, this);
		}
		private static OnEnterFrame(event: egret.Event)
		{
			if (Tick._frameList.length > 0)
			{
				for (let item of Tick._frameList)
				{
					item.invoke();
				}
			}
			let delta: number = egret.getTimer() - Tick._secondsTime;
			if (delta >= 1000)
			{
				Tick._secondsTime = egret.getTimer();
				if (Tick._secondsList.length > 0)
				{
					for (let item of Tick._secondsList)
					{
						item.invoke();
					}
				}
			}
			if (Tick._timeoutList.length > 0)
			{
				let count = Tick._timeoutList.length;
				for (let i: number = count - 1; i >= 0; i--)
				{
					let info: TickInfo = Tick._timeoutList[i];
					if (egret.getTimer() >= info.time)
					{
						Tick._timeoutList.splice(i, 1);
						info.invoke(info.params);
						if (Tick._timeoutList.length < count)
						{
							i -= (count - Tick._timeoutList.length);
						}
					}
				}
			}
		}

		/**
		 * 添加帧调用
		 */
		public static addFrameInvoke(method: Function, thisObject: any)
		{
			if (method == null || Tick.isExists(Tick._frameList, method, thisObject))
			{
				return;
			}
			Tick._frameList.push(new Delegate(method, thisObject));
		}

		/**
		 * 移除帧调用
		 */
		public static removeFrameInvoke(method: Function, thisObject: any)
		{
			Tick.removeMethod(Tick._frameList, method, thisObject);
		}
		/**
		 * 添加秒调用
		 */
		public static AddSecondsInvoke(method: Function, thisObject: any)
		{
			if (method == null || Tick.isExists(Tick._secondsList, method, thisObject))
			{
				return;
			}
			Tick._secondsList.push(new Delegate(method, thisObject));
		}

		/**
		 * 移除秒调用
		 */
		public static RemoveSecondsInvoke(method: Function, thisObject: any)
		{
			Tick.removeMethod(Tick._secondsList, method, thisObject);
		}
		/**
		 * 添加超时触发 单位：毫秒
		 */
		public static AddTimeoutInvoke(method: Function, delay: number, thisObject: any, params?: any): number
		{
			if (delay <= 0 || method == null || Tick.isExists(Tick._timeoutList, method, thisObject))
			{
				return 0;
			}
			let info: TickInfo = new TickInfo(method, thisObject, params);
			info.id = Tick._hashCode++;
			info.time = egret.getTimer() + delay;
			Tick._timeoutList.push(info);
			return info.id;
		}
		/**
		 * 移除超时触发
		 */
		public static RemoveTimeoutInvoke(method: Function, thisObject: any)
		{
			Tick.removeMethod(Tick._timeoutList, method, thisObject);
		}
		/**
		 * 移除指定id的超时触发
		 */
		public static RemoveTimeoutInvokeById(id: number)
		{
			for (let i: number = 0; i < Tick._timeoutList.length; i++)
			{
				if (Tick._timeoutList[i].id == id)
				{
					Tick._timeoutList.splice(i, 1);
					break;
				}
			}
		}
		private static isExists(list: Array<Delegate>, method: Function, thisObject: any)
		{
			for (let item of list)
			{
				if (item.equals2(method, thisObject))
				{
					return true;
				}
			}
			return false;
		}
		private static removeMethod(list: Array<Delegate>, method: Function, thisObject: any): void
		{
			for (let i: number = 0; i < list.length; i++)
			{
				if (list[i].equals2(method, thisObject))
				{
					list.splice(i, 1);
					break;
				}
			}
		}
	}
	/**
	 * 时间信息
	 */
	class TickInfo extends Delegate
	{
		public id: number;
		public time: number;
		public params: any;
		public constructor(method: Function, time: number, params: any)
		{
			super(method, time);
			this.params = params;
		}
	}
}