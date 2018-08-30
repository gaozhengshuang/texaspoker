module game {
	/**
	 * 交易记录面板
	 */
	export class TradeRecordPanel extends PanelComponent {

		recordScroller: utils.VScrollerPanel;

		private _flag: TradePanelFlag;

		protected init() {
			this.recordScroller.dataList.useVirtualLayout = true;
			this.recordScroller.initItemRenderer(TradeRecordItem);
		}
		protected getSkinName() {
			return TradeRecordPanelSkin;
		}

		protected beforeShow() {
			//NotificationCenter.addObserver(this, this.onRefreshHouse, PlayerModel.HOUSE_UPDATE);
			this.recordScroller.bindData(TradeManager.getInstance().tradeRecordInfo.list);
		}
		protected beforeRemove() {
			//NotificationCenter.removeObserver(this, PlayerModel.HOUSE_UPDATE);
		}
		private onRefreshHouse() {
			if (this._flag == TradePanelFlag.House) {
				this.recordScroller.bindData(TradeManager.getInstance().tradeRecordInfo.list);
			}
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