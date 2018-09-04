module game {
	/**
	 * 交易记录面板
	 */
	export class TradeRecordPanel extends PanelComponent {

		recordScroller: utils.VScrollerPanel;
		titlePanel: PageTitlePanel;

		private _flag: TradePanelFlag;
		constructor()
		{
			super();
			this._isShowEffect = false;
		}
		protected init() {
			this.recordScroller.dataList.useVirtualLayout = true;
			this.recordScroller.initItemRenderer(TradeRecordItem);
			this.recordScroller.setViewPort();
			this.recordScroller.scrollPolicyH = 'off';
			this.titlePanel.init(this.remove, this);
		}
		protected getSkinName() {
			return TradeRecordPanelSkin;
		}
		public setData(flag: TradePanelFlag) {
			this._flag = flag;
			this.onRefresh();;
		}
		protected beforeShow() {
			//NotificationCenter.addObserver(this, this.onRefreshHouse, PlayerModel.HOUSE_UPDATE);
			// this.recordScroller.bindData(TradeManager.getInstance().tradeRecordInfo.list);
		}
		protected beforeRemove() {
			//NotificationCenter.removeObserver(this, PlayerModel.HOUSE_UPDATE);
		}
		private onRefresh() {
			if (this._flag == TradePanelFlag.House) {
				this.recordScroller.bindData(TradeManager.getInstance().tradeHouseRecordInfo.list);
			}
			else if (this._flag == TradePanelFlag.Car) {
				this.recordScroller.bindData(TradeManager.getInstance().tradeCarRecordInfo.list);
			}
			else if(this._flag == TradePanelFlag.Item)
			{
				this.recordScroller.bindData(TradeManager.getInstance().tradeItemRecordInfo.list);
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