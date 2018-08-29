module game {
	/**
	 * 交易记录面板
	 */
	export class TradeRecordPanel extends PanelComponent{

		recordScroller: utils.VScrollerPanel;

		protected init() {

		}
		protected getSkinName() {
			return TradePanelSkin;
		}
		private static _instance: TradeRecordPanel = null;
		public static getInstance(): TradeRecordPanel {
			if (!TradeRecordPanel._instance) {
				TradeRecordPanel._instance = new TradeRecordPanel();
			}
			return TradeRecordPanel._instance;
		}
	}
}