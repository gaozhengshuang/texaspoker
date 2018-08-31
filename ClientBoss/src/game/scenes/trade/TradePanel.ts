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
		searchTxt: eui.EditableText;

		titlePanel: PageTitlePanel;


		//自声明变量元素
		private _panelFlag: TradePanelFlag;
		public get panelFlag(): TradePanelFlag {
			return this._panelFlag;
		}
		private _vstList: BaseTradeVst[];
		private _tradeHouseVst: TradeHouseVst;
		private _tradeCarVst: TradeCarVst;


		public constructor() {
			super();
		}
		protected init() {
			this._isShowEffect = false;
			this._tradeHouseVst = new TradeHouseVst(this);
			this._tradeCarVst = new TradeCarVst(this);

			this._vstList = [this._tradeHouseVst, this._tradeCarVst];

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
			NotificationCenter.addObserver(this, this.onGetHouseRecord, "msg.GW2C_RetTradeHouseHistory");
			NotificationCenter.addObserver(this, this.onGetCarRecord, "msg.GW2C_RetTradeCarHistory");

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
			NotificationCenter.removeObserver(this, "msg.GW2C_RetTradeCarHistory");
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
					this._tradeHouseVst.startReqTradeList();
					break;
				case TradePanelFlag.Car:
					this.carGroup.visible = true;
					this.carBarBtn.selected = true;
					this._tradeCarVst.startReqTradeList();
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
			switch (this._panelFlag) {
				case TradePanelFlag.House:
					let data: msg.C2GW_ReqTradeHouseHistory = new msg.C2GW_ReqTradeHouseHistory();
					sendMessage("msg.C2GW_ReqTradeHouseHistory", msg.C2GW_ReqTradeHouseHistory.encode(data));
					break;
				case TradePanelFlag.Car:
					data = new msg.C2GW_ReqTradeCarHistory();
					sendMessage("msg.C2GW_ReqTradeCarHistory", msg.C2GW_ReqTradeCarHistory.encode(data));
					break;
			}
		}
		private onGetHouseRecord(data: msg.GW2C_RetTradeHouseHistory) {
			TradeManager.getInstance().tradeHouseRecordInfo = data;
			openPanel(PanelType.TradeRecordPanel);
			TradeRecordPanel.getInstance().setData(this._panelFlag);
		}
		private onGetCarRecord(data: msg.GW2C_RetTradeHouseHistory) {
			TradeManager.getInstance().tradeCarRecordInfo = data;
			openPanel(PanelType.TradeRecordPanel);
			TradeRecordPanel.getInstance().setData(this._panelFlag);
		}
		/**
		 * 请求交易列表
		 */
		public startReqHouseTradeList(isClear: boolean) {
			this._tradeHouseVst.startReqTradeList(isClear);
		}
		/**
		 * 请求交易车辆列表
		 */
		public startReqCarTradeList(isClear: boolean) {
			this._tradeCarVst.startReqTradeList(isClear);
		}

		public getDefaultFilteItemVo(des?: string) {
			let itemVo = new FilterComponentItemVo();
			if (!des) {
				itemVo.des = "全部";
			}
			else {
				itemVo.des = des;
			}
			itemVo.id = 0;
			itemVo.type = FilterComponentType.First;
			return itemVo;
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