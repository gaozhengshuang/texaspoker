module game {
	/**
	 * 交易道具渲染项
	 */
	export class TradeItemItem extends eui.ItemRenderer {
		buyBtn: eui.Button;
		timeLabel: eui.Label;
		priceLabel: eui.Label;
		numTxt: eui.Label;
		nameLabel: eui.Label;
		icon: TradeIcon;

		constructor() {
			super();
			this.skinName = TradeItemItemSkin;
		}
		protected dataChanged(): void {
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			TickUtil.AddSecondsInvoke(this.onTimeCountDown, this);
			this.update();
		}
		private update() {
			let data: msg.SimpleItemTrade = this.data;
			let idx = TradeManager.getInstance().tradeItemInfo.list.indexOf(data);
			let len = TradeManager.getInstance().tradeItemInfo.list.length;
			if (len > 9 && len - 1 == idx) {
				TradePanel.getInstance().startReqItemTradeList(0, false);
			}
			let itemDef = TradeManager.getInstance().getItemDefine(data.itemid);
			if (itemDef) {
				this.nameLabel.text = itemDef.Name;
				this.icon.show({ name: data.name, icon: itemDef.ImageId.toString(), star: itemDef.Color, type: TradeIconType.Item });
			}
			this.priceLabel.textFlow = TextUtil.parse(TradeManager.getInstance().getPriceStr(data.price));
			this.numTxt.text = numAddSpace(data.itemnum);
		}
		private onBuyClick() {
			//购买
			openPanel(PanelType.TradeItemBuyPanel);
			TradeItemBuyPanel.getInstance().setData(this.data);
		}

		private onRemove() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
		}
		private onTimeCountDown() {
			let data: msg.SimpleHouseTrade = this.data;
			let leftTime = data.endtime - SysTimeEventManager.getInstance().systimeNum;
			if (leftTime >= 0) {
				this.timeLabel.text = s2hms(leftTime);
			}
			else {
				this.timeLabel.text = s2hms(0);
				TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
			}
		}
	}
}