module game {
	/**
	 * 我的房产渲染项
	 */
	export class TradeHouseSellItem extends eui.ItemRenderer {
		buyBtn: eui.Button;
		posTxt: eui.Label;
		timeLabel: eui.Label;
		typeTxt: eui.Label;
		priceLabel: eui.Label;
		unitPrice: eui.Label;
		baseIncomeTxt: eui.Label;
		icon: TradeIcon;
		onSellFlag: eui.Image;
		constructor() {
			super();
			this.skinName = TradeHouseSellItemSkin;
		}
		protected dataChanged(): void {
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			this.posTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPosTxt, this);
			TickUtil.AddSecondsInvoke(this.onTimeCountDown, this);
			NotificationCenter.addObserver(this, this.onRefreshItem, "TradeHouseSuccess");
			NotificationCenter.addObserver(this, this.onCancel, "msg.GW2C_RetCancelTradeHouse");
			this.update();
		}
		private onRemove() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			this.posTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPosTxt, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
			NotificationCenter.removeObserver(this, "TradeHouseSuccess");
			NotificationCenter.removeObserver(this, "msg.GW2C_RetCancelTradeHouse");
		}
		private update() {
			let data: msg.HouseData = this.data;

			let houseDef = TradeManager.getInstance().getHouseDefine(data.tid);
			this.icon.show({ name: data.ownername, icon: houseDef.ImageId.toString(), star: data.level, type: TradeIconType.House }); //todo

			// this.priceLabel.text = numAddSpace(data.price) + "金币";
			// this.baseIncomeTxt.text = numAddSpace(data.income) + "金币";
			// this.unitPrice.text = numAddSpace(Math.floor(data.price / data.area)) + "金币";
			// this.typeTxt.text = houseDef.Des + "(" + data.area + "平)";

			// let posName = '';

			// let province = TradeManager.getInstance().getCityDefine(data.location);
			// if (province) {
			// 	posName = province.Name;
			// }
			// let city = TradeManager.getInstance().getCityDefine(data.sublocation);
			// if (city) {
			// 	posName += city.Name;
			// }
			// this.posTxt.textFlow = TextUtil.parse('<u>' + posName + '</u>');

			// this.onSellFlag.visible = false;
			// if (data.state == TradeState.Tradeing) {
			// 	this.onSellFlag.visible = true;
			// 	this.buyBtn.label = "收回";
			// }
			// else {
			// 	this.buyBtn.label = "出售";
			// }
		}
		private onBuyClick() {
			if (this.data.state == TradeState.Tradeing) { //收回
				let data: msg.C2GW_CancelTradeHouse = new msg.C2GW_CancelTradeHouse();
				data.tradeuid = (this.data as msg.HouseData).id; //todo 实际上是交易ID 需要知道交易uID
				sendMessage("msg.C2GW_CancelTradeHouse", msg.C2GW_CancelTradeHouse.encode(data));
			}
			else { //出售
				//打开出售界面
				openPanel(PanelType.TradeHouseSellPanel);
				TradeHouseSellPanel.getInstance().setData(this.data);
			}
		}
		private onPosTxt() {
			//定位
		}
		private onTimeCountDown() {
			let data: msg.HouseData = this.data;
			let leftTime = data.tradeendtime - SysTimeEventManager.getInstance().systimeNum;
			if (leftTime >= 0) {
				this.timeLabel.text = s2hms(leftTime);
			}
			else {
				this.timeLabel.text = s2hms(0);
				TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
			}
		}
		private onRefreshItem(data: msg.HouseData) {
			if (data.id == this.data.id) {
				this.update();
			}
		}
		private onCancel(data: msg.GW2C_RetCancelTradeHouse) {
			//取消订单
			this.data.issell = false;//刷新数据
			this.buyBtn.label = "出 售"; //todo
		}
	}
}