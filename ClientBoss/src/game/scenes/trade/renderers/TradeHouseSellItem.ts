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
		timeDesLabel: eui.Label;
		constructor() {
			super();
			this.skinName = TradeHouseSellItemSkin;
			this.posTxt.touchEnabled = true;
		}
		protected dataChanged(): void {
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			this.posTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPosTxt, this);
			TickUtil.AddSecondsInvoke(this.onTimeCountDown, this);
			NotificationCenter.addObserver(this, this.onRefreshItem, PlayerModel.HOUSE_UPDATE);
			this.update();
		}
		private onRemove() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
			this.posTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPosTxt, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCountDown, this);
			NotificationCenter.removeObserver(this, PlayerModel.HOUSE_UPDATE);
		}
		private update() {
			let data: msg.HouseData = this.data;

			this.baseIncomeTxt.text = numAddSpace(data.income) + "金币";
			this.unitPrice.text = numAddSpace(Math.floor(data.sumvalue / data.area)) + "金币";


			let buildingDef = TradeManager.getInstance().getBuildingDefById(data.buildingid);
			if (buildingDef) {

				let houseDef = TradeManager.getInstance().getHouseDefine(data.tid);
				if (houseDef) {
					this.typeTxt.text = houseDef.Des + "(" + data.area + "平)";
					this.icon.show({ name: buildingDef.Community, icon: houseDef.ImageId.toString(), star: data.level, type: TradeIconType.House });
				}
				
				let posName = TradeManager.getInstance().getHouseName(buildingDef.Province, buildingDef.City);
				this.posTxt.textFlow = TextUtil.parse('<u>' + posName + '</u>');
			}

			this.onSellFlag.visible = false;
			if (data.issell) {
				this.priceLabel.text = numAddSpace(data.tradeprice) + "金币";
				this.showTakeBack();
			}
			else {
				this.priceLabel.text = numAddSpace(data.sumvalue) + "金币";
				this.hideTakeBack();
			}
		}
		private onBuyClick() {
			if (this.data.issell) { //收回
				let data: msg.C2GW_CancelTradeHouse = new msg.C2GW_CancelTradeHouse();
				data.houseuid = (this.data as msg.HouseData).id;
				sendMessage("msg.C2GW_CancelTradeHouse", msg.C2GW_CancelTradeHouse.encode(data));
			}
			else { //出售
				//打开出售界面
				openPanel(PanelType.TradeHouseSellPanel);
				TradeHouseSellPanel.getInstance().setData(this.data);
			}
		}
		private onPosTxt() {
			TradeManager.getInstance().switchToBuilding(this.data);
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
		private onRefreshItem(data: msg.GW2C_UpdateHouseDataOne) {
			if (data.houseuid == this.data.id) {
				this.update();
			}
		}
		private hideTakeBack() {
			this.buyBtn.label = "出 售";
			this.onSellFlag.visible = false;
			this.timeLabel.visible = this.timeDesLabel.visible = false;
		}
		private showTakeBack() {
			this.buyBtn.label = "收 回";
			this.onSellFlag.visible = true;
			this.timeLabel.visible = this.timeDesLabel.visible = true;
		}
	}
}