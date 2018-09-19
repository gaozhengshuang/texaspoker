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
		private _tradeItemVst: TradeItemVst;


		public constructor() {
			super();
			this._isShowEffect = false;
		}
		protected init() {
			this._tradeHouseVst = new TradeHouseVst(this);
			this._tradeCarVst = new TradeCarVst(this);
			this._tradeItemVst = new TradeItemVst(this);

			this._vstList = [this._tradeHouseVst, this._tradeCarVst, this._tradeItemVst];

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
			NotificationCenter.addObserver(this, this.onGetItemRecord, "msg.GW2C_RetTradeItemHistory");

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
			NotificationCenter.removeObserver(this, "msg.GW2C_RetTradeItemHistory");
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
			this.itemBarBtn.selected = this.carBarBtn.selected = this.houseBarBtn.selected = false;
			switch (flag) {
				case TradePanelFlag.House:
					this.barClickDefault();
					break;
				case TradePanelFlag.Car:
					this.carGroup.visible = true;
					this.carBarBtn.selected = true;
					this._tradeCarVst.startReqTradeList();
					break;
				case TradePanelFlag.Item:
					this.itemGroup.visible = true;
					this.itemBarBtn.selected = true;
					this._tradeItemVst.startReqTradeList();
					break;
				default:
					this.barClickDefault();
					break;
			}
		}
		private barClickDefault() {
			this.houseGroup.visible = true;
			this.houseBarBtn.selected = true;
			this._tradeHouseVst.startReqTradeList();
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
				case TradePanelFlag.Item:
					data = new msg.C2GW_ReqTradeItemHistory();
					sendMessage("msg.C2GW_ReqTradeItemHistory", msg.C2GW_ReqTradeItemHistory.encode(data));
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
		private onGetItemRecord(data: msg.GW2C_RetTradeItemHistory) {
			TradeManager.getInstance().tradeItemRecordInfo = data;
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
		/**
		 * 请求道具交易列表
		 */
		public startReqItemTradeList(userId: number | Long = 0, isClear: boolean) {
			this._tradeItemVst.startReqTradeList(userId, isClear);
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