module game {
	/**
	 * 出售我的道具面板
	 */
	export class TradeMyItemPanel extends PanelComponent {

		desLabel: eui.Label;
		scroller: utils.VScrollerPanel;
		titlePanel: PageTitlePanel;
		canSellBtn: eui.RadioButton;
		sellingBtn: eui.RadioButton;

		private _dp: eui.ArrayCollection;
		private _flag: TradeMyItemPanelFlag;

		public constructor() {
			super();
			this._isShowEffect = false;
		}
		protected getSkinName() {
			return TradeMyItemPanelSkin;
		}
		protected init() {
			this._dp = new eui.ArrayCollection();
			this.scroller.setViewPort();
			this.titlePanel.init(this.remove, this);
			this.scroller.initItemRenderer(TradeItemSellItem);
			let ly = new eui.TileLayout();
			ly.requestedColumnCount = 5;
			ly.horizontalGap = 10;
			ly.verticalGap = 10;
			ly.paddingLeft = 15;
			this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			this.scroller.dataList.layout = ly;
		}
		protected beforeShow() {
			this._flag = TradeMyItemPanelFlag.CanSell;
			this.sellingBtn.selected = this.canSellBtn.selected = false;
			this.onClick(null, this.canSellBtn);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			NotificationCenter.addObserver(this, this.onRefreshHouse, "msg.GW2C_RetItemTradeList");
			NotificationCenter.addObserver(this, this.onRefreshHouse, "msg.GW2C_RetCancelTradeItem");
			NotificationCenter.addObserver(this, this.onRefreshHouse, "msg.GW2C_RetTradeItem");
			this.scroller.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelectItem, this);
		}
		protected beforeRemove() {
			NotificationCenter.removeObserver(this, "msg.GW2C_RetItemTradeList");
			NotificationCenter.removeObserver(this, "msg.GW2C_RetCancelTradeItem");
			NotificationCenter.removeObserver(this, "msg.GW2C_RetTradeItem");
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.scroller.dataList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelectItem, this);
		}
		private onClick(event: egret.TouchEvent, outTarget: any) {
			let target: any;
			if (outTarget) {
				target = outTarget;
			}
			else {
				target = event.target;
			}
			switch (target) {
				case this.sellingBtn:
					this._flag = TradeMyItemPanelFlag.Selling;
					this.sellingBtn.selected = true;
					this.getSellingList();
					break;
				case this.canSellBtn:
					this._flag = TradeMyItemPanelFlag.CanSell;
					this.canSellBtn.selected = true;
					this._dp.source = this.getCanSellList();
					this.scroller.refreshData(this._dp);
					break;
			}
		}
		private onRefreshHouse(data: msg.GW2C_RetItemTradeList | msg.GW2C_RetTradeItem | msg.GW2C_RetCancelTradeItem) {
			if (data instanceof msg.GW2C_RetItemTradeList) {
				if (data.ismine) {
					this._dp.source = data.list;
					this.scroller.refreshData(this._dp);
				}
			} else if (data instanceof msg.GW2C_RetTradeItem) {
				this._dp.source = this.getCanSellList();
				this.scroller.refreshData(this._dp);
			}
			else if (data instanceof msg.GW2C_RetCancelTradeItem) {
				this.getSellingList();
			}
		}
		private onSelectItem(event: eui.ItemTapEvent) {
			let data = <FilterComponentItemVo>event.itemRenderer.data;
			if (data instanceof msg.ItemData) { //打开出售面板
				openPanel(PanelType.TradeItemSellPanel);
				TradeItemSellPanel.getInstance().setData(data);
			}
			else if (data instanceof msg.SimpleItemTrade) { //打开收回面板
				openPanel(PanelType.TradeItemBackPanel);
				TradeItemBackPanel.getInstance().setData(data);
			}
		}
		private getSellingList() {
			let userId = DataManager.playerModel.getUserId();
			TradePanel.getInstance().startReqItemTradeList(userId, true);
		}
		private getCanSellList() {
			let list = DataManager.playerModel.getBag();
			let tmpList = [];
			for (let info of list) {
				let itemDef = TradeManager.getInstance().getItemDefine(info.id);
				if (itemDef.Tradable == 1) {
					tmpList.push(info);
				}
			}
			return tmpList;
		}
		private static _instance: TradeMyItemPanel = null;
		public static getInstance(): TradeMyItemPanel {
			if (!TradeMyItemPanel._instance) {
				TradeMyItemPanel._instance = new TradeMyItemPanel();
			}
			return TradeMyItemPanel._instance;
		}
	}
	/**
	 * 我的道具面板出售标签
	 */
	export enum TradeMyItemPanelFlag {
		None = 0,
		/**
		 * 可以出售
		 */
		CanSell = 1,
		/**
		 * 出售中
		 */
		Selling = 2,
	}
}