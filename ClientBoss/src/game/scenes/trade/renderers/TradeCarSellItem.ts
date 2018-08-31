module game {
	/**
	 * 我的车辆交易渲染项
	 */
	export class TradeCarSellItem extends eui.ItemRenderer {
		sellBtn: eui.Button;
		timeLabel: eui.Label;
		priceLabel: eui.Label;
		baseIncomeTxt: eui.Label;
		icon: TradeIcon;
		onSellFlag: eui.Image;
		timeDesLabel: eui.Label;
		constructor() {
			super();
			this.skinName = TradeCarSellItemSkin;
		}
		protected dataChanged(): void {
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.sellBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			TickUtil.AddSecondsInvoke(this.onTimeCountDown, this);
			NotificationCenter.addObserver(this, this.onRefreshItem, PlayerModel.CAR_UPDATE);
			this.update();
		}
		private onRemove() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.sellBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
			NotificationCenter.removeObserver(this, PlayerModel.CAR_UPDATE);
		}
		private update() {
			let data: msg.CarData = this.data;

			this.baseIncomeTxt.text = numAddSpace(data.attr.reward) + "金币/分钟";

			let carDef = TradeManager.getInstance().getCarDefine(data.tid);
			if (carDef) {
				let carName = TradeManager.getInstance().getCarName(data.tid);
				this.icon.show({ name: carName, icon: carDef.path.toString(), star: data.star, type: TradeIconType.Car }); 
			}
			this.onSellFlag.visible = false;
			if (data.tradeuid > 0) {
				this.priceLabel.text = numAddSpace(data.tradeprice) + "金币";
				this.showTakeBack();
			}
			else {
				this.priceLabel.text = numAddSpace(data.price) + "金币";
				this.hideTakeBack();
			}
		}
		private onBuyClick() {
			if (this.data.tradeuid > 0) { //收回
				let data: msg.C2GW_CancelTradeCar = new msg.C2GW_CancelTradeCar();
				data.caruid = (this.data as msg.CarData).id;
				sendMessage("msg.C2GW_CancelTradeCar", msg.C2GW_CancelTradeCar.encode(data));
			}
			else { //出售
				//打开出售界面
				openPanel(PanelType.TradeCarSellPanel);
				TradeCarSellPanel.getInstance().setData(this.data);
			}
		}
		private onTimeCountDown() {
			let data: msg.CarData = this.data;
			let leftTime = data.tradeendtime - SysTimeEventManager.getInstance().systimeNum;
			if (leftTime >= 0) {
				this.timeLabel.text = s2hms(leftTime);
			}
			else {
				this.timeLabel.text = s2hms(0);
				TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
			}
		}
		private onRefreshItem(data: msg.GW2C_UpdateCar) {
			if (data.carid == this.data.id) {
				// this.data.tradeuid = data.data.tradeuid;
				// this.data.tradeendtime = data.data.tradeendtime;
				// for (let key in data.data) { //更新属性
				// 	if (data.data.hasOwnProperty(key)) {
				// 		data.data[key] = data.data[key];
				// 	}
				// }
				TickUtil.AddSecondsInvoke(this.onTimeCountDown, this);
				this.update();
			}
		}
		private hideTakeBack() {
			this.sellBtn.label = "出 售";
			this.onSellFlag.visible = false;
			this.timeLabel.visible = this.timeDesLabel.visible = false;
		}
		private showTakeBack() {
			this.sellBtn.label = "收 回";
			this.onSellFlag.visible = true;
			this.timeLabel.visible = this.timeDesLabel.visible = true;
		}
	}
}