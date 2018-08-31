module game {
	/**
	 * 房产交易渲染项
	 */
	export class TradeCarItem extends eui.ItemRenderer {
		buyBtn: eui.Button;
		timeLabel: eui.Label;
		priceLabel: eui.Label;
		baseIncomeTxt: eui.Label;
		icon: TradeIcon;

		constructor() {
			super();
			this.skinName = TradeCarItemSkin;
		}
		protected dataChanged(): void {
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			TickUtil.AddSecondsInvoke(this.onTimeCountDown, this);
			this.update();
		}
		private update() {
			let data: msg.SimpleCarTrade = this.data;

			let listLen = TradeManager.getInstance().tradeCarInfo.list.length;
			if (listLen > 5) {
				let signData: msg.SimpleCarTrade = TradeManager.getInstance().tradeCarInfo.list[listLen - 5] as msg.SimpleCarTrade;
				if (data.caruid == signData.caruid) {
					// TradePanel.getInstance().startReqCarTradeList(false); //todo
				}
			}
			let carDef = TradeManager.getInstance().getCarDefine(data.carbaseid);
			if (carDef) {
				this.icon.show({ name: data.name, icon: carDef.path.toString(), star: data.carlevel, type: TradeIconType.Car });
			}
			this.priceLabel.textFlow = TextUtil.parse(TradeManager.getInstance().getPriceStr(data.price));
			this.baseIncomeTxt.text = numAddSpace(data.income) + "金币/分钟";
		}
		private onBuyClick() {
			//购买
			NotificationCenter.addObserver(this, this.onGetCarData, "msg.GW2C_ResCarInfoById");
			sendMessage("msg.C2GW_ReqCarInfoById", msg.C2GW_ReqCarInfoById.encode({ carid: this.data.caruid }));
		}

		private onGetCarData(data: msg.GW2C_ResCarInfoById) {
			openPanel(PanelType.TradeCarBuyPanel);
			TradeCarBuyPanel.getInstance().setData(this.data, data);
			NotificationCenter.removeObserver(this, "msg.GW2C_ResCarInfoById");
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