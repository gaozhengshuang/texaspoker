module game {
	/**
	 * 地图事件商店
	 */
	export class MapEventsShopPanel extends PanelComponent {
		titlePanel: PageTitlePanel;
		scroller: utils.VScrollerPanel;
		private _dp: eui.ArrayCollection;
		private _data: msg.MapEvent;

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
		public setData(data: msg.MapEvent) {
			this._data = data;
		}
		protected beforeShow() {
			this._dp.source = [];
			this.scroller.refreshData(this._dp);
		}
		protected beforeRemove() {

		}
		public remove() {
			//请求完成。。。 addobserver todo
			NotificationCenter.addObserver(this, this.onEventFinish, "");
			MapEventsManager.getInstance().reqFinishEvent(this._data.id);
		}
		private onEventFinish() {
			NotificationCenter.removeObserver(this, "");
			super.remove();
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