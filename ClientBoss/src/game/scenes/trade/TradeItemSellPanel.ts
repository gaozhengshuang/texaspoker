module game {
	//交易道具出售面板
	export class TradeItemSellPanel extends BaseSlidePanel {
		priceLabel: eui.Label; //价格
		nameLabel: eui.Label; //名称
		timeLabel: eui.Label; //交易结束时间
		taxRateTxt: eui.Label; //税率
		totalTimeLabel: eui.Label; //交易总时间
		afterPriceLabel: eui.Label; //扣税后价格
		sellBtn: eui.Button; //购买
		numTxt: eui.Label; //数量
		icon: TradeIcon; //图标

		numController: NumController; //数字变更组件
		priceController: NumController; //价格变更组件

		private _data: msg.ItemData;

		public constructor() {
			super();
		}
		protected init() {
			this.numController.setCallBack(new CallBackHandler(this, this.refreshPrice));
			this.priceController.setCallBack(new CallBackHandler(this, this.refreshPrice));
		}
		protected getSkinName() {
			return TradeItemSellPanelSkin;
		}
		public setData(data: msg.ItemData) {

			this._data = data;
			this.numController.show(1, 1, 1, data.num);
			this.priceController.show(0, 100);
			this.refreshPrice();

			let itemDef = TradeManager.getInstance().getItemDefine(data.id);
			if (itemDef) {
				this.icon.show({ name: itemDef.Name, icon: itemDef.ImageId.toString(), star: itemDef.Color, type: TradeIconType.Item });
			}

			this.taxRateTxt.text = "扣税（" + gameConfig.tradeTaxRate * 100 + "%）";
			this.nameLabel.text = itemDef.Name;
			this.numTxt.text = data.num.toString();
			this.totalTimeLabel.text = "保留" + gameConfig.tradeTime / 3600 + "小时交易时间";
		}
		protected beforeShow() {
			super.beforeShow();
			this.sellBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSellBtnClick, this);
			NotificationCenter.addObserver(this, this.onSellResult, "msg.GW2C_RetTradeItem");
		}
		protected beforeRemove() {
			super.beforeRemove();
			this.sellBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSellBtnClick, this);
			NotificationCenter.removeObserver(this, "msg.GW2C_RetTradeItem");
		}
		private refreshPrice() {
			this.priceLabel.text = numAddSpace(this.numController.nowNum * this.priceController.nowNum) + "金币";
			this.afterPriceLabel.text = numAddSpace(this.numController.nowNum * this.priceController.nowNum * (1 - gameConfig.tradeTaxRate)) + "金币";
		}
		private onSellBtnClick() {
			//出售
			let data: msg.C2GW_TradeItem = new msg.C2GW_TradeItem();
			data.itemid = this._data.id;
			let num: number = this.numController.nowNum;
			if (num <= 0) {
				showTips("未设置数量，无法出售!");//数量不合法 提示
				return;
			}
			let price: number = this.priceController.nowNum;
			if (price <= 0) {
				showTips("未设置价格，无法出售!");//价格不合法 提示
				return;
			}
			data.itemnum = num;
			data.price = price * num;
			sendMessage("msg.C2GW_TradeItem", msg.C2GW_TradeItem.encode(data));
		}
		private onSellResult(data: msg.GW2C_RetTradeItem) { //刷新我的房产
			this.remove();
		}

		private static _instance: TradeItemSellPanel = null;
		public static getInstance(): TradeItemSellPanel {
			if (!TradeItemSellPanel._instance) {
				TradeItemSellPanel._instance = new TradeItemSellPanel();
			}
			return TradeItemSellPanel._instance;
		}
	}
}