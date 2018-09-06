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
		/**
		 * 地图事件移除
		 */
		public static OnMapEventsRemove: string = "MapEventsManager_OnMapEventsRemove";
		/**
		 * 地图商店系统更新
		 */
		public static OnMapStoreUpdate: string = "MapEventsManager_OnMapStoreUpdate";
		/**
		 * 商店数据
		 */
		public storeMap: Map<number, msg.GW2C_SendMapStoreInfo>;
		/**
		 * 事件数据
		 */
		public eventsListInfo: msg.GW2C_SendUserEvents;

		public init() {
			this.storeMap = new Map<number, msg.GW2C_SendMapStoreInfo>();
			setEventsIconCallBackFun(this.onEventsIconClick, this);
			NotificationCenter.addObserver(this, this.GW2C_SendUserEvents, "msg.GW2C_SendUserEvents");
			NotificationCenter.addObserver(this, this.GW2C_RemoveEvent, "msg.GW2C_RemoveEvent");
			NotificationCenter.addObserver(this, this.GW2C_SendMapStoreInfo, "msg.GW2C_SendMapStoreInfo");
			NotificationCenter.addObserver(this, this.GW2C_UpdateMapStoreProduct, "msg.GW2C_UpdateMapStoreProduct");
			NotificationCenter.addObserver(this, this.onSelfCoordinste, CommandName.GET_SELF_COORDINSTE);
		}
		private onSelfCoordinste() {
			this.GW2C_SendUserEvents(this.eventsListInfo);
		}

		/**
		 * 用户事件推送
		 */
		private GW2C_SendUserEvents(msgData: msg.GW2C_SendUserEvents) {
			this.eventsListInfo = msgData;
			if (map) {
				//清空事件图标
				emptyEventsIcon();
				//重新添加事件图标
				if (msgData.event && msgData.event.events) {
					for (let info of msgData.event.events) {
						let iconInfo: MapIconInfo = new MapIconInfo();
						iconInfo.id = info.id;
						let iconDef = table.TMapEventById[info.tid];
						if (iconDef) {
							if (iconDef.Id > 2000 && iconDef.Id < 3000) { //TODO 测试奖励
								iconInfo.imageUrl = 'resource/others/images/eventsicon/3001.png';
							}
							else {

								iconInfo.imageUrl = 'resource/others/images/' + iconDef.Icon;
							}
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
		private GW2C_RemoveEvent(msgData: msg.GW2C_RemoveEvent) {
			let meData = this.getData(msgData.uid);
			if (meData) {
				let mapEventDef = table.TMapEventById[meData.tid];
				if (mapEventDef.Reward.length > 0) { //推送有奖励的事件删除 提示事件获得物品  临时先这样处理
					ItemGetTips.getInstance().show();
				}
			}
			this.removeData(msgData.uid);
			removeEventsIcon(msgData.uid);
			NotificationCenter.postNotification(MapEventsManager.OnMapEventsRemove, msgData);
		}
		/**
		 * 推送商店信息
		 */
		private GW2C_SendMapStoreInfo(msgData: msg.GW2C_SendMapStoreInfo) {
			this.storeMap.add(msgData.shopid, msgData);
			openPanel(PanelType.MapEventsShopPanel);
			MapEventsShopPanel.getInstance().setData(msgData);
			GameConfig.setEventsReply(true);
			GameConfig.showDownBtnFun(false);
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: false });
		}
		/**
		 * 更新商品信息
		 */
		private GW2C_UpdateMapStoreProduct(msgData: msg.GW2C_UpdateMapStoreProduct) {
			let mapStoreData = this.storeMap.getValue(msgData.shopid);
			if (mapStoreData) {
				for (let info of mapStoreData.products) {
					if (info.pid == msgData.product.pid) {
						copyFromTarget(info, msgData.product);
						break;
					}
				}
			}
			NotificationCenter.postNotification(MapEventsManager.OnMapStoreUpdate, msgData);
		}
		private onEventsIconClick(type: string, data: game.MapIconInfo) {
			let def = table.TMapEventById[data.tid];
			// if (def.Id > 3000) { //todo
				ItemGetTips.getInstance().startCollect();
				this.reqEnterEvent(data.id);
			// }
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
			let netData = new msg.C2GW_LeaveEvent();
			netData.uid = parseInt(uid.toString());
			sendMessage("msg.C2GW_LeaveEvent", msg.C2GW_LeaveEvent.encode(netData));
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
					if (info.id == id) {
						this.eventsListInfo.event.events.splice(i, 1);
						break;
					}
				}
			}
		}

		/**
		 * 获取商店数据
		 */
		public getStoreData(shopId: number, pid: number): msg.StoreProductData {
			let data = this.storeMap.getValue(shopId);
			if (data) {
				for (let info of data.products) {
					if (info.pid == pid) {
						return <msg.StoreProductData>info;
					}
				}
			}
			return null;
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