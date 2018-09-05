/**
 * 设置事件图标点击回调
 */
declare function setEventsIconCallBackFun(func: Function, target: any);
/**
 * 添加地图事件ICON
 */
declare function addEventsIcon(data: game.MapIconInfo);
/**
 * 移除地图事件ICON
 */
declare function removeEventsIcon(id: number | Long);
/**
 * 清空地图事件ICON
 */
declare function emptyEventsIcon();
/**
 * 显示或隐藏地图事件ICON
 */
declare function showOrHideEventsIcon(flag: boolean);

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
			setEventsIconCallBackFun(this.onEventsIconClick, this);
			NotificationCenter.addObserver(this, this.GW2C_SendUserEvents, "msg.GW2C_SendUserEvents");
			NotificationCenter.addObserver(this, this.GW2C_RemoveEvent, "msg.GW2C_RemoveEvent");
			NotificationCenter.addObserver(this, this.onSelfCoordinste, CommandName.GET_SELF_COORDINSTE);
		}
		private onSelfCoordinste() {
			this.GW2C_SendUserEvents(this.eventsListInfo);
		}
		/**
		 * 用户事件推送
		 */
		private GW2C_SendUserEvents(msg: msg.GW2C_SendUserEvents) {
			this.eventsListInfo = msg;
			if (map) {
				//清空事件图标
				emptyEventsIcon();
				//重新添加事件图标
				if (msg.event && msg.event.events) {
					for (let info of msg.event.events) {
						let iconInfo: MapIconInfo = new MapIconInfo();
						iconInfo.id = info.id;
						let iconDef = table.TMapEventById[info.tid];
						if (iconDef) {
							iconInfo.imageUrl = 'resource/others/images/' + iconDef.Icon;
							iconInfo.latitude = info.latitude / 100000;
							iconInfo.longitude = info.longitude / 100000;
							iconInfo.tid = info.tid;
							console.log("纬度：", iconInfo.latitude, "经度：", iconInfo.longitude);
							addEventsIcon(iconInfo);
						}
					}
				}
				NotificationCenter.postNotification(MapEventsManager.OnMapEventsSend);
			}
		}
		private GW2C_RemoveEvent(msg: msg.GW2C_RemoveEvent) {
			this.removeData(msg.uid);
			removeEventsIcon(msg.uid);
		}
		// public removeEventsIcon(id:number)
		// {
		// 	removeEventsIcon(id);
		// }

		private onEventsIconClick(type: string, data: game.MapIconInfo) {
			let def = table.TMapEventById[data.tid];
			if (def.Type == msg.MapEventType.Bonus) {
				this.reqEnterEvent(data.id);
			}
			//todo sth 点击了地图上的事件图标
			console.log("点击了地图上的事件图标", "id", data.id, "tid:", data.tid);
			//addObserver
		}
		/**
		 * 请求进入事件
		 */
		public reqEnterEvent(uid: number | Long) {
			let data = this.getData(uid);
			let mapDef = table.TMapEventById[data.tid];
			if (mapDef) {
				if (DataManager.isAssetsEnough(mapDef.MoneyType, mapDef.Price, mapDef.MoneyType)) {
					let netData = new msg.C2GW_ReqEnterEvents();
					netData.uid = parseInt(uid.toString());
					sendMessage("msg.C2GW_ReqEnterEvents", msg.C2GW_ReqEnterEvents.encode(netData));
				}
			}
		}
		/**
		 * 请求完成事件
		 */
		public reqFinishEvent(uid: number | Long) {
			let netData = new msg.C2GW_ReqEnterEvents(); //todo
			netData.uid = parseInt(uid.toString());
			sendMessage("msg.C2GW_ReqEnterEvents", msg.C2GW_ReqEnterEvents.encode(netData));
		}

		/**
 		* 获取地图事件信息
 		*/
		public getData(id: number | Long): msg.MapEvent {
			if (this.eventsListInfo && this.eventsListInfo.event && this.eventsListInfo.event.events) {
				for (let info of this.eventsListInfo.event.events) {
					if (info.id == id) {
						return <msg.MapEvent>info;
					}
				}
			}
			Console.log("查找地图事件异常！id：", id);
			return null;
		}
		/**
		 * 移除地图事件
		 */
		public removeData(id: number | Long) {
			if (this.eventsListInfo && this.eventsListInfo.event && this.eventsListInfo.event.events) {
				for (let i: number = 0; i < this.eventsListInfo.event.events.length; i++) {
					let info = this.eventsListInfo.event.events[i];
					if(info.id == id)
					{
						this.eventsListInfo.event.events.splice(i, 1);
						break;
					}
				}
			}
		}

		private static _instance: MapEventsManager = null;
		public static getInstance(): MapEventsManager {
			if (!MapEventsManager._instance) {
				MapEventsManager._instance = new MapEventsManager();
			}
			return MapEventsManager._instance;
		}
	}
	/**
	 * 地图图标信息接口
	 */
	export class MapIconInfo {
		/**
		 * 唯一ID
		 */
		id: number | Long;
		/**
		 * 维度
		 */
		latitude: number;
		/**
		 * 经度
		 */
		longitude: number;
		/**
		 * icon图标路径
		 */
		imageUrl: string;
		/**
		 * 配置ID
		 */
		tid: number;
	}
}