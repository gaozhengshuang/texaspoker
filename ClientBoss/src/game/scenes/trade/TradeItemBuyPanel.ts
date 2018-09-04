module game {
	/**
	 * 道具购买界面
	 */
	export class TradeItemBuyPanel extends BaseSlidePanel {
		nameTxt: eui.Label;
		numTxt: eui.Label;
		icon: TradeIcon;
		buyBtn: eui.Button; //购买
		priceLabel: eui.Label; //价格
		timeLabel: eui.Label; //交易结束时间

		private _data: msg.SimpleItemTrade;

		public constructor() {
			super();
		}
		protected init() {
		}
		protected getSkinName() {
			return TradeItemBuyPanelSkin;
		}
		public setData(data: msg.SimpleItemTrade) {
			this._data = data;
			this.priceLabel.text = numAddSpace(data.price) + "金币";
			let itemDef = TradeManager.getInstance().getItemDefine(data.itemid);
			if (itemDef) {
				this.icon.show({ name: itemDef.Name, icon: itemDef.ImageId.toString(), star: itemDef.Color, type: TradeIconType.Item });
				this.nameTxt.text = itemDef.Name;
			}
			this.numTxt.text = this._data.itemnum.toString();
		}
		protected beforeShow() {
			super.beforeShow();
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
			TickUtil.AddSecondsInvoke(this.onTimeCd, this);
			NotificationCenter.addObserver(this, this.onSellResult, "msg.GW2C_RetBuyTradeItem");
		}
		protected beforeRemove() {
			super.beforeRemove();
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCd, this);
			NotificationCenter.removeObserver(this, "msg.GW2C_RetBuyTradeItem");
		}
		private onBuyBtnClick() {
			let userinfo = DataManager.playerModel.getUserInfo();
			if (userinfo.gold >= this._data.price) {
				let data: msg.C2GW_BuyTradeItem = new msg.C2GW_BuyTradeItem();
				data.tradeuid = this._data.tradeuid;
				data.userid = this._data.ownerid;
				sendMessage("msg.C2GW_BuyTradeItem", msg.C2GW_BuyTradeItem.encode(data));
			}
			else {
				//提示金币不足
				showTips('金币不足！')
			}
		}
		private onSellResult(data: msg.GW2C_RetBuyTradeItem) {
			this.remove();
		}
		private onTimeCd() {
			let leftTime = this._data.endtime - SysTimeEventManager.getInstance().systimeNum;
			if (leftTime >= 0) {
				this.timeLabel.text = s2hms(leftTime);
			}
			else {
				this.timeLabel.text = s2hms(0);
				TickUtil.RemoveSecondsInvoke(this.onTimeCd, this);
			}
		}

		private static _instance: TradeItemBuyPanel = null;
		public static getInstance(): TradeItemBuyPanel {
			if (!TradeItemBuyPanel._instance) {
				TradeItemBuyPanel._instance = new TradeItemBuyPanel();
			}
			return TradeItemBuyPanel._instance;
		}
	}
}