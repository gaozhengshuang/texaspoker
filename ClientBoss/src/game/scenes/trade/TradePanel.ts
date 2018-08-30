module game {
	/**
	 * 交易面板
	 */
	export class TradePanel extends PanelComponent {
		//ui元素
		view_bg: eui.Rect;
		titleRadioGroup: eui.Group;
		houseBarBtn: eui.RadioButton;
		carBarBtn: eui.RadioButton;
		itemBarBtn: eui.RadioButton;
		tradeRecordBtn: eui.Button;
		sellBtn: eui.Button;
		houseGroup: eui.Group;

		houseAreaBtn: FilterBtn;
		houseTypeBtn: FilterBtn;
		housePriceBtn: SortBtn;

		houseScroller: utils.VScrollerPanel;

		carGroup: eui.Group;
		carBrandBtn: FilterBtn;
		carPriceBtn: SortBtn;
		carIncomeBtn: SortBtn;
		carScroller: utils.VScrollerPanel;

		itemGroup: eui.Group;
		itemTypeBtn: FilterBtn;
		itemPartBtn: FilterBtn;
		itemPriceBtn: SortBtn;
		itemScroller: utils.VScrollerPanel;
		searchTxt: eui.TextInput;

		titlePanel: PageTitlePanel;


		//自声明变量元素
		private _panelFlag: TradePanelFlag;
		public get panelFlag(): TradePanelFlag {
			return this._panelFlag;
		}
		private _vstList: BaseTradeVst[];
		private _tradeHouseVst: TradeHouseVst;


		public constructor() {
			super();
		}
		protected init() {
			this._tradeHouseVst = new TradeHouseVst(this);
			this._vstList = [this._tradeHouseVst];

			this.titlePanel = new PageTitlePanel();
			this.addChild(this.titlePanel);

			this.titlePanel.returnBtnShow(false);

			this._vstList.forEach((item: BaseTradeVst) => {
				item.init();
			});
		}
		protected getSkinName() {
			return TradePanelSkin;
			// return "resource/eui_skins/trade/TradePanelSkin.exml";
		}

		protected beforeShow() {
			this.titlePanel.init();

			this._panelFlag = TradePanelFlag.House; //默认打开房屋交易标签

			this.changeBar(this._panelFlag);

			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
			NotificationCenter.addObserver(this, this.onGetRecord, "msg.GW2C_RetTradeHouseHistory");

			this._vstList.forEach((item) => {
				item.beforeShow();
			});
		}

		protected beforeRemove() {
			this.titlePanel.removePanel();
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
			this._vstList.forEach((item) => {
				item.beforeRemove();
			});
			NotificationCenter.removeObserver(this, "msg.GW2C_RetTradeHouseHistory");
		}

		private onClickHandler(event: egret.TouchEvent, outTarget: any) {
			let target;
			if (outTarget) {
				target = outTarget;
			}
			else {
				target = event.target;
			}
			switch (target) {
				case this.houseBarBtn:
					this.changeBar(TradePanelFlag.House);
					break;
				case this.carBarBtn:
					this.changeBar(TradePanelFlag.Car);
					break;
				case this.itemBarBtn:
					this.changeBar(TradePanelFlag.Item);
					break;
				case this.tradeRecordBtn:
					this.getRecord();
					break;
				default:
					this._vstList.forEach((item) => {
						item.onClickHandler(event);
					});
					break;
			}
		}

		private changeBar(flag: TradePanelFlag) {
			this.houseGroup.visible = this.carGroup.visible = this.itemGroup.visible = false;
			this._panelFlag = flag;
			switch (flag) {
				case TradePanelFlag.House:
					this.houseGroup.visible = true;
					this.houseBarBtn.selected = true;
					break;
				case TradePanelFlag.Car:
					this.carGroup.visible = true;
					this.carBarBtn.selected = true;
					break;
				case TradePanelFlag.Item:
					this.itemGroup.visible = true;
					this.itemBarBtn.selected = true;
					break;
				default:
					this.houseGroup.visible = true;
					this.houseBarBtn.selected = true;
					break;
			}
		}
		private getRecord() {
			let data: msg.C2GW_ReqTradeHouseHistory = new msg.C2GW_ReqTradeHouseHistory();
			sendMessage("msg.C2GW_ReqTradeHouseHistory", msg.C2GW_ReqTradeHouseHistory.encode(data));
		}
		private onGetRecord(data: msg.GW2C_RetTradeHouseHistory) {
			TradeManager.getInstance().tradeRecordInfo = data;
			openPanel(PanelType.TradeRecordPanel);
		}
		private static _instance: TradePanel = null;
		public static getInstance(): TradePanel {
			if (!TradePanel._instance) {
				TradePanel._instance = new TradePanel();
			}
			return TradePanel._instance;
		}
	}
	/**
	 * 交易面板标签栏
	 */
	export enum TradePanelFlag {
		None = 0,
		House = 1,
		Car = 2,
		Item = 3,
	}
}