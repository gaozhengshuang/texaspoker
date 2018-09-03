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
			this.posTxt.touchEnabled = true;
			TickUtil.AddSecondsInvoke(this.onTimeCountDown, this);
			this.update();
		}
		private update() {
			let data: msg.SimpleHouseTrade = this.data;

			let idx = TradeManager.getInstance().tradeHouseInfo.list.indexOf(data);
			let len = TradeManager.getInstance().tradeHouseInfo.list.length;
			if (len > 9 && idx == len - 1) {
				TradePanel.getInstance().startReqHouseTradeList(false);
			}
			// let signData = TradeManager.getInstance().tradeHouseInfo.list[listLen - 5];
			// if (data.houseuid == signData.houseuid) {
			// 	TradePanel.getInstance().startReqHouseTradeList(false);
			// }
			let houseDef = TradeManager.getInstance().getHouseDefine(data.housebaseid);
			if (houseDef) {
				this.icon.show({ name: data.name, icon: houseDef.ImageId.toString(), star: data.houselevel, type: TradeIconType.House });
				this.typeTxt.text = houseDef.Des + "(" + data.area + "平)";
			}
			this.priceLabel.textFlow = TextUtil.parse(TradeManager.getInstance().getPriceStr(data.price));
			this.baseIncomeTxt.text = numAddSpace(data.income) + "金币";
			this.unitPrice.text = numAddSpace(Math.floor(data.price / data.area)) + "金币";

			let posName = TradeManager.getInstance().getHouseName(data.location, data.sublocation);
			this.posTxt.textFlow = TextUtil.parse('<u>' + posName + '</u>');
		}
		private onBuyClick() {
			//购买
			NotificationCenter.addObserver(this, this.onGetHouseData, "msg.GW2C_AckHouseDataByHouseId");
			sendMessage("msg.C2GW_ReqHouseDataByHouseId", msg.C2GW_ReqHouseDataByHouseId.encode({ houseid: this.data.houseuid }));
		}

		private onGetHouseData(data: msg.GW2C_AckHouseDataByHouseId) {
			openPanel(PanelType.TradeHouseBuyPanel);
			TradeHouseBuyPanel.getInstance().setData(this.data, data);
			NotificationCenter.removeObserver(this, "msg.GW2C_AckHouseDataByHouseId");
		}

		private onRemove() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			this.posTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
		}
		private onPosTxt() {
			// dataList && dataList.length > 0) {
			// 	for (let i: number = 0; i < dataList.length; i++) {
			// 		let data: any = dataList[i];
			// 		let bId = data.Id;
			// 		let bName = data.Community;
			// 		let imageUrl = 'resource/others/images/build_'+data.CommunityId + '_m.png';
			// 		let position = [data.PosX, data.PosY];
			// 		let isHas: boolean = false;
			// 		addBuilding({ bId: bId, bName: bName, imageUrl: imageUrl, position: position, isHas: isHas });
			// 	}
			TradeManager.getInstance().switchToBuilding(this.data);
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