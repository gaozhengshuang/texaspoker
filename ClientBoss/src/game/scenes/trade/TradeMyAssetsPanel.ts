module game {
	/**
	 * 出售我的资产面板
	 */
	export class TradeMyAssetsPanel extends PanelComponent {

		desLabel: eui.Label;
		scroller: utils.VScrollerPanel;
		titlePanel: PageTitlePanel;

		private _dp: eui.ArrayCollection;

		public constructor() {
			super();
		}
		protected init() {
			this._dp = new eui.ArrayCollection();
		}
		protected beforeShow() {
		}
		protected beforeRemove() {
		}
		public setData(flag: TradePanelFlag) {
			switch (flag) {
				case TradePanelFlag.House:
					this.desLabel.text = '我的房产';
					this.scroller.initItemRenderer(TradeHouseSellItem);
					this._dp.source = DataManager.playerModel.getHouse();
					break;
				case TradePanelFlag.Car:
					this.desLabel.text = '我的车库';
					break;
			}
			this.scroller.refreshData(this._dp);
		}

		private static _instance: TradeMyAssetsPanel = null;
		public static getInstance(): TradeMyAssetsPanel {
			if (!TradeMyAssetsPanel._instance) {
				TradeMyAssetsPanel._instance = new TradeMyAssetsPanel();
			}
			return TradeMyAssetsPanel._instance;
		}
	}
}