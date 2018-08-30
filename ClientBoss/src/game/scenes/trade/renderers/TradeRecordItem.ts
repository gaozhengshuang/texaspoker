module game {
	/**
	 * 交易记录渲染项
	 */
	export class TradeRecordItem extends eui.ItemRenderer {

		buySuccessFlag: eui.Label; //购买成功
		sellSuccessFlag: eui.Label;// 出售成功
		sellFailedFlag: eui.Label; //出售失败
		dealDoneFlag: eui.Image; //已成交
		returnedFlag: eui.Image;//已退回

		typeTxt: eui.Label; //1室厅1厨1卫(50平)
		unitPrice: eui.Label; //单价
		baseIncomeTxt: eui.Label; //基础收益

		icon: TradeIcon;

		priceGroup: eui.Group; //出售价格组 Y坐标会变
		priceDesLabel: eui.Label; //出售价格描述 会变
		priceLabel: eui.Label; //价格 变色
		takeBtn: eui.Button; //领取按钮

		timeLabel: eui.Label; //时间

		constructor() {
			super();
			this.skinName = TradeRecordItemSkin;
		}
		protected dataChanged(): void {
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.takeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeBtnClick, this);
			NotificationCenter.addObserver(this, this.onTakeResult, "msg.GW2C_RetGetTradeHouseReward");
		}
		private onRemove() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.takeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTakeBtnClick, this);
			NotificationCenter.removeObserver(this, "msg.GW2C_RetGetTradeHouseReward");
		}
		private update() {
			let data: msg.TradeHouseHistory = this.data;
			let houseDef = TradeManager.getInstance().getHouseDefine(data.housebaseid);
			if (houseDef) {
				this.icon.show({ name: data.name, icon: houseDef.ImageId.toString(), star: data.houselevel, type: TradeIconType.House });
				this.typeTxt.text = houseDef.Des + "(" + data.area + "平)";
			}
			this.baseIncomeTxt.text = numAddSpace(data.income) + "金币";
			this.unitPrice.text = numAddSpace(Math.floor(data.price / data.area)) + "金币";

			let date = new Date(data.tradetime * 1000);
			let timeDes = DateTimeUtil.formatDate(date, DateTimeUtil.Format_Standard_Date);

			this.takeBtn.visible = this.dealDoneFlag.visible = this.returnedFlag.visible = false;
			this.buySuccessFlag.visible = this.sellSuccessFlag.visible = this.sellFailedFlag.visible = false;
			this.priceDesLabel.text = "出售价格";
			this.priceGroup.y = 75;
			let priceStr = numAddSpace(data.price);

			let colorStr = "#000000"
			let timeTail = " 成交时间"
			switch (data.state) {
				case TradeState.Tradeing:
					break;
				case TradeState.CanReward:
					this.takeBtn.visible = true;
					this.sellSuccessFlag.visible = true;
					this.priceGroup.y = 45;
					colorStr = '#07b45d'; //绿色
					break;
				case TradeState.SellOk:
					this.buySuccessFlag.visible = true;
					this.priceDesLabel.text = "购买价格";
					colorStr = '#f85959'; //红色
					break;
				case TradeState.BuyOk:
					colorStr = '#07b45d'; //绿色
					this.dealDoneFlag.visible = true;
					this.sellSuccessFlag.visible = true;
					break;
				case TradeState.TradeCancel:
					timeTail = " 退回时间";
					this.returnedFlag.visible = true;
					this.sellFailedFlag.visible = true;
					break;
			}
			timeDes += timeTail;
			this.timeLabel.text = timeDes;
			this.priceLabel.textFlow = TextUtil.parse('<font color="' + colorStr + '" size="24">' + priceStr + '</font>' + '<font color="#000000" size="24">金币</font>');
		}
		private onTakeBtnClick() {
			let data: msg.C2GW_GetTradeHouseReward = new msg.C2GW_GetTradeHouseReward();
			data.tradeuid = this.data.tradeuid;
			sendMessage("msg.C2GW_GetTradeHouseReward", msg.C2GW_GetTradeHouseReward.encode(data));
		}
		private onTakeResult(data: msg.GW2C_RetGetTradeHouseReward) {
			if (this.data.tradeuid == data.tradeuid) { //todo 已领取

			}
		}
	}
}