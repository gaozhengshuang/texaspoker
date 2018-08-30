module game {
	/**
	 * 房产交易渲染项
	 */
	export class TradeHouseItem extends eui.ItemRenderer {
		buyBtn: eui.Button;
		posTxt: eui.Label;
		timeLabel: eui.Label;
		typeTxt: eui.Label;
		priceLabel: eui.Label;
		unitPrice: eui.Label;
		baseIncomeTxt: eui.Label;
		icon: TradeIcon;

		constructor() {
			super();
			this.skinName = TradeHouseItemSkin;
		}
		protected dataChanged(): void {
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			this.posTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPosTxt, this);
			TickUtil.AddSecondsInvoke(this.onTimeCountDown, this);
			this.update();
		}
		private update() {
			let data: msg.SimpleHouseTrade = this.data;

			let listLen = TradeManager.getInstance().tradeHouseInfo.list.length;
			if (listLen > 5) {
				let signData = TradeManager.getInstance().tradeHouseInfo.list[listLen - 5];
				if (data.houseuid == signData.houseuid) {
					TradePanel.getInstance().startReqTradeList();
				}

				let houseDef = TradeManager.getInstance().getHouseDefine(data.housebaseid);
				if (houseDef) {
					this.icon.show({ name: data.name, icon: houseDef.ImageId.toString(), star: data.houselevel, type: TradeIconType.House });
					this.typeTxt.text = houseDef.Des + "(" + data.area + "平)";
				}
				this.priceLabel.textFlow = TextUtil.parse(TradeManager.getInstance().getPriceStr(data.price));
				this.baseIncomeTxt.text = numAddSpace(data.income) + "金币";
				this.unitPrice.text = numAddSpace(Math.floor(data.price / data.area)) + "金币";

				let posName = '';

				let province = TradeManager.getInstance().getCityDefine(data.location);
				if (province) {
					posName = province.Name;
				}
				let city = TradeManager.getInstance().getCityDefine(data.sublocation);
				if (city) {
					posName += city.Name;
				}
				this.posTxt.textFlow = TextUtil.parse('<u>' + posName + '</u>');

			}
		private onBuyClick() {
			//购买
			NotificationCenter.addObserver(this, this.onGetHouseData, PlayerModel.HOUSE_UPDATE);
			sendMessage("msg.C2GW_ReqHouseDataByHouseId", msg.C2GW_ReqHouseDataByHouseId.encode({ houseid: this.data.houseuid }));
		}

		private onGetHouseData(data: msg.GW2C_UpdateHouseDataOne) {
			openPanel(PanelType.TradeHouseBuyPanel);
			TradeHouseBuyPanel.getInstance().setData(this.data, data);
			NotificationCenter.removeObserver(this, PlayerModel.HOUSE_UPDATE);
		}

		private onRemove() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			this.posTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
		}
		private onPosTxt() {
			//定位
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