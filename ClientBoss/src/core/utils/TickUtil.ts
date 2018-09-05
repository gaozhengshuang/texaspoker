module game {
	/**
	 * 时钟
	 */
	export class TickUtil {
		private static readonly _frameList: Array<CallBackHandler> = new Array<CallBackHandler>();//每帧更新
		private static readonly _secondsList: Array<CallBackHandler> = new Array<CallBackHandler>();//1秒更新
		private static readonly _timeoutList: Array<TickInfo> = new Array<TickInfo>();
		private static _secondsTime: number;
		private static _hashCode: number = 0;

		public static initialize(stage: egret.Stage) {
			TickUtil._secondsTime = egret.getTimer();
			stage.addEventListener(egret.Event.ENTER_FRAME, TickUtil.OnEnterFrame, this);
		}
		private static OnEnterFrame(event: egret.Event) {
			if (TickUtil._frameList.length > 0) {
				for (let item of TickUtil._frameList) {
					// item.invoke();
					runCallBackHandler(item);
				}
			}
			let delta: number = egret.getTimer() - TickUtil._secondsTime;
			if (delta >= 1000) {
				TickUtil._secondsTime = egret.getTimer();
				if (TickUtil._secondsList.length > 0) {
					for (let item of TickUtil._secondsList) {
						// item.invoke();
						runCallBackHandler(item);
					}
				}
			}
			if (TickUtil._timeoutList.length > 0) {
				let count = TickUtil._timeoutList.length;
				for (let i: number = count - 1; i >= 0; i--) {
					let info: TickInfo = TickUtil._timeoutList[i];
					if (egret.getTimer() >= info.time) {
						TickUtil._timeoutList.splice(i, 1);
						// info.invoke(info.params);
						runCallBackHandler(info);
						if (TickUtil._timeoutList.length < count) {
							i -= (count - TickUtil._timeoutList.length);
						}
					}
				}
			}
		}

		/**
		 * 添加帧调用
		 */
		public static addFrameInvoke(method: Function, thisObject: any) {
			if (method == null || TickUtil.isExists(TickUtil._frameList, method, thisObject)) {
				return;
			}
			TickUtil._frameList.push(new CallBackHandler(thisObject, method));
		}

		/**
		 * 移除帧调用
		 */
		public static removeFrameInvoke(method: Function, thisObject: any) {
			TickUtil.removeMethod(TickUtil._frameList, method, thisObject);
		}
		/**
		 * 添加秒调用
		 */
		public static AddSecondsInvoke(method: Function, thisObject: any) {
			if (method == null || TickUtil.isExists(TickUtil._secondsList, method, thisObject)) {
				return;
			}
			TickUtil._secondsList.push(new CallBackHandler(thisObject, method));
		}

		/**
		 * 移除秒调用
		 */
		public static RemoveSecondsInvoke(method: Function, thisObject: any) {
			TickUtil.removeMethod(TickUtil._secondsList, method, thisObject);
		}
		/**
		 * 添加超时触发 单位：毫秒
		 */
		public static AddTimeoutInvoke(method: Function, delay: number, thisObject: any, params?: any): number {
			if (method == null || TickUtil.isExists(TickUtil._timeoutList, method, thisObject)) {
				return 0;
			}
			let info: TickInfo = new TickInfo(method, thisObject, params);
			info.id = TickUtil._hashCode++;
			info.time = egret.getTimer() + delay;
			TickUtil._timeoutList.push(info);
			return info.id;
		}
		/**
		 * 移除超时触发
		 */
		public static RemoveTimeoutInvoke(method: Function, thisObject: any) {
			TickUtil.removeMethod(TickUtil._timeoutList, method, thisObject);
		}
		/**
		 * 移除指定id的超时触发
		 */
		public static RemoveTimeoutInvokeById(id: number) {
			for (let i: number = 0; i < TickUtil._timeoutList.length; i++) {
				if (TickUtil._timeoutList[i].id == id) {
					TickUtil._timeoutList.splice(i, 1);
					break;
				}
			}
		}
		private static isExists(list: Array<CallBackHandler>, method: Function, thisObject: any) {
			for (let item of list) {
				if (item.equals2(method, thisObject)) {
					return true;
				}
			}
			return false;
		}
		private static removeMethod(list: Array<CallBackHandler>, method: Function, thisObject: any): void {
			for (let i: number = 0; i < list.length; i++) {
				if (list[i].equals2(method, thisObject)) {
					list.splice(i, 1);
					break;
				}
			}
		}
	}
	/**
	 * 时间信息
	 */
	class TickInfo extends CallBackHandler {
		public id: number;
		public time: number;
		public constructor(method: Function, thisObj: any, params: any) {
			super(thisObj, method, params);
		}
	}
}