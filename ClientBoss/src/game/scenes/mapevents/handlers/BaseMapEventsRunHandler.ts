module game {
	/**
	 * 地图事件执行基类
	 */
	export abstract class BaseMapEventsRunHandler {
		private _data: msg.MapEvent;
		/**
		 * 执行事件
		 */
		public run(msg: msg.MapEvent, params: any[]) {
			this._data = msg;
			NotificationCenter.addObserver(this, this.onEventFinish, MapEventsManager.OnMapEventsRemove);
			this.runOnce(msg, params);
		}
		protected runOnce(msg: msg.MapEvent, params: any[]) {

		}
		protected onEventFinish(msgData: msg.GW2C_RemoveEvent) {
			if (msgData.uid == this._data.id) {
				MapEventsManager.getInstance().activieMap(true);
				NotificationCenter.removeObserver(this, MapEventsManager.OnMapEventsRemove);
			}
		}
		protected finish() {
			if (this._data) {
				MapEventsManager.getInstance().reqFinishEvent(this._data.id);
			}
			else {
				Console.log("结束事件error");
			}
		}
	}
}