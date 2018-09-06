module game {
	/**
	 * 地图事件商店
	 */
	export class MapEventsShopPanel extends PanelComponent {
		titlePanel: PageTitlePanel;
		scroller: utils.VScrollerPanel;
		private _dp: eui.ArrayCollection;
		private _data: msg.GW2C_SendMapStoreInfo;

		protected getSkinName() {
			return MapEventsShopPanelSkin;
		}
		protected init() {
			this._dp = new eui.ArrayCollection();
			this.titlePanel.init(this.remove, this);
			this.scroller.initItemRenderer(MapEventsShopItem);
			this.scroller.setViewPort();
			this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
		}
		public setData(data: msg.GW2C_SendMapStoreInfo) {
			this._data = data;
			this._dp.source = data.products;
			this.scroller.refreshData(this._dp);
		}
		protected beforeShow() {
		}
		protected beforeRemove() {

		}
		public remove() {
			NotificationCenter.addObserver(this, this.onEventFinish, MapEventsManager.OnMapEventsRemove);
			MapEventsManager.getInstance().reqFinishEvent(this._data.uid);
		}
		private onEventFinish(msgData: msg.GW2C_RemoveEvent) {
			if (msgData.uid == this._data.uid) {
				NotificationCenter.removeObserver(this, MapEventsManager.OnMapEventsRemove);
				super.remove();
			}
		}

		private static _instance: MapEventsShopPanel = null;
		public static getInstance(): MapEventsShopPanel {
			if (!MapEventsShopPanel._instance) {
				MapEventsShopPanel._instance = new MapEventsShopPanel();
			}
			return MapEventsShopPanel._instance;
		}
	}
}