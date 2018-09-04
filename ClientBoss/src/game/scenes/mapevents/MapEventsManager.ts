module game {
	/**
	 * 地图事件管理
	 */
	export class MapEventsManager {
		/**
		 * 地图事件推送
		 */
		public static OnMapEventsSend: string = "MapEventsManager_OnMapEventsSend";

		public eventsListInfo: msg.GW2C_SendUserEvents;

		public init() {
			NotificationCenter.addObserver(this, this.GW2C_SendUserEvents, "msg.GW2C_SendUserEvents");
		}

		/**
		 * 用户事件推送
		 */
		private GW2C_SendUserEvents(msg: msg.GW2C_SendUserEvents) {
			this.eventsListInfo = msg;
			NotificationCenter.postNotification(MapEventsManager.OnMapEventsSend);
		}

		private static _instance: MapEventsManager = null;
		public static getInstance(): MapEventsManager {
			if (!MapEventsManager._instance) {
				MapEventsManager._instance = new MapEventsManager();
			}
			return MapEventsManager._instance;
		}
	}

}