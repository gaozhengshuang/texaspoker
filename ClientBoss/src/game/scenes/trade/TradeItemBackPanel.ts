module game {
	//交易道具收回面板
	export class TradeItemBackPanel extends BaseSlidePanel {
		priceLabel: eui.Label; //价格
		nameLabel: eui.Label; //名称
		timeLabel: eui.Label; //交易结束时间
		taxRateTxt: eui.Label; //税率
		totalTimeLabel: eui.Label; //交易总时间
		afterPriceLabel: eui.Label; //扣税后价格
		backBtn: eui.Button; //收回
		numTxt: eui.Label; //数量
		icon: TradeIcon; //图标
		ownTxt: eui.Label; //拥有数量

		private _data: msg.SimpleItemTrade;

		public constructor() {
			super();
		}

		protected getSkinName() {
			return TradeItemBackPanelSkin;
		}
		public setData(data: msg.SimpleItemTrade) {
			this._data = data;

			let itemDef = TradeManager.getInstance().getItemDefine(data.itemid);
			if (itemDef) {
				this.icon.show({ name: itemDef.Name, icon: itemDef.ImageId.toString(), star:itemDef.Color, type: TradeIconType.Item });
				this.nameLabel.text = itemDef.Name;
			}
			this.taxRateTxt.text = "扣税（" + gameConfig.tradeTaxRate * 100 + "%）";
			this.numTxt.text = numAddSpace(data.itemnum);
			this.priceLabel.text = numAddSpace(data.price);
			this.totalTimeLabel.text = "保留" + gameConfig.tradeTime / 3600 + "小时交易时间";
			this.afterPriceLabel.text = numAddSpace(data.price * (1 - gameConfig.tradeTaxRate)) + "金币";
			let itemData: msg.ItemData = TradeManager.getInstance().getItemData(data.itemid);
			if (itemData) {
				this.ownTxt.text = numAddSpace(itemData.num);
			}
		}
		protected beforeShow() {
			super.beforeShow();
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
			NotificationCenter.addObserver(this, this.onSellResult, "msg.GW2C_RetCancelTradeItem");
		}
		protected beforeRemove() {
			super.beforeRemove();
			this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
			NotificationCenter.removeObserver(this, "msg.GW2C_RetCancelTradeItem");
		}

		private onBackBtnClick() {
			let data: msg.C2GW_CancelTradeItem = new msg.C2GW_CancelTradeItem();
			data.tradeuid = this._data.tradeuid;
			sendMessage("msg.C2GW_CancelTradeItem", msg.C2GW_CancelTradeItem.encode(data));
		}
		private onSellResult(data: msg.GW2C_RetCancelTradeItem) { //刷新我的房产
			this.remove();
		}

		private static _instance: TradeItemBackPanel = null;
		public static getInstance(): TradeItemBackPanel {
			if (!TradeItemBackPanel._instance) {
				TradeItemBackPanel._instance = new TradeItemBackPanel();
			}
			return TradeItemBackPanel._instance;
		}
	}
}