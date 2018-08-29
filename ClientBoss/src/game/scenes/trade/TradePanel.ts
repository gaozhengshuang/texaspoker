module game {
	/**
	 * 交易面板
	 */
	export class TradePanel extends PanelComponent {
		view_bg: eui.Rect;
		mainGroup: eui.Group;
		titleRadioGroup: eui.Group;
		houseBarBtn: eui.RadioButton;
		carBarBtn: eui.RadioButton;
		itemBarBtn: eui.RadioButton;
		tradeRecordBtn: eui.Button;
		sellBtn: eui.Button;
		houseGroup: eui.Group;

		houseAreaBtn: FilterBtn;
		houseTypeBtn: FilterBtn;
		SortBtn: SortBtn;

		houseScroller: utils.VScrollerPanel;

		carGroup: eui.Group;
		carBrandBtn: FilterBtn;
		carPriceBtn: SortBtn;
		carIncomeBtn: SortBtn;
		carScroller: utils.VScrollerPanel;

		itemGroup: eui.Group;
		itemTypeBtn:FilterBtn;
		itemPartBtn:FilterBtn;
		itemPriceBtn:SortBtn;
		itemScroller:utils.VScrollerPanel;
		searchTxt:eui.TextInput;

		titlePanel:PageTitlePanel;

		private _vstList:BaseTradeVst[];


		public constructor() {
			super();
		}
		protected init()
		{
			this._vstList = [];
		}
		protected getSkinName() {
			return TradePanelSkin;
		}

		private static _instance: TradePanel = null;
		public static getInstance(): TradePanel {
			if (!TradePanel._instance) {
				TradePanel._instance = new TradePanel();
			}
			return TradePanel._instance;
		}
	}
}