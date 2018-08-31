module game {
	/**
	 * 车辆出售
	 */
	export class TradeCarSellPanel extends BaseSlidePanel {
		baseIncomeTxt: eui.Label; //基础收益
		guidePriceTxt: eui.Label; //目前估值
		parkingTxt: eui.Label; //停车 100金币/收益
		speedTxt: eui.Label; // 1公里/分钟
		dockTxt: eui.Label; //停靠： 10分钟
		areaTxt: eui.Label; //区域 2公里
		capacityTxt: eui.Label; // 容量： 200金币/次
		priceLabel: eui.Label; //价格
		nameLabel: eui.Label; //名称
		timeLabel: eui.Label; //交易结束时间
		taxRateTxt: eui.Label; //税率
		totalTimeLabel: eui.Label; //交易总时间
		afterPriceLabel: eui.Label; //扣税后价格
		sellBtn: eui.Button; //购买
		tradeStar: TradeStar; //星级（等级）


		// cellGroup: eui.Group;
		// cell1: eui.Group;
		// cell2: eui.Group;
		// cell3: eui.Group;
		// cell4: eui.Group;
		// cell5: eui.Group;
		// cell6: eui.Group;
		// cell7: eui.Group;

		// lvlTxt1: eui.Label;
		// lvlTxt2: eui.Label;
		// lvlTxt3: eui.Label;
		// lvlTxt4: eui.Label;
		// lvlTxt5: eui.Label;
		// lvlTxt6: eui.Label;
		// lvlTxt7: eui.Label;

		numController: NumController; //数字变更组件
		private _data: msg.CarData;

		public constructor() {
			super();
		}
		protected init() {
			this.numController.setCallBack(new CallBackHandler(this, this.onNumChange));
		}
		protected getSkinName() {
			return TradeCarSellPanelSkin;
		}
		public setData(data: msg.CarData) {

			this._data = data;
			this.numController.show(data.price);
			this.onNumChange();
			this.tradeStar.show(data.star);
			this.guidePriceTxt.text = numAddSpace(data.price) + "金币";
			this.baseIncomeTxt.text = numAddSpace(data.attr.reward) + "金币";
			this.taxRateTxt.text = "扣税（" + gameConfig.tradeTaxRate * 100 + "%）";

			let carDef = TradeManager.getInstance().getCarDefine(data.tid);
			if (carDef) {
				let brandDef = TradeManager.getInstance().getCarBrandDefine(carDef.Brand);
				let modelDef = TradeManager.getInstance().getCarModelDefine(carDef.Model);
				let name = '';
				if (brandDef && modelDef) {
					name = brandDef.Brand + '-' + modelDef.Model;
				}
				this.nameLabel.text = name;
			}
			else {
				this.nameLabel.text = '';
			}
			this.totalTimeLabel.text = "保留" + gameConfig.tradeTime / 3600 + "小时交易时间";
			//其他信息
			//其他信息显示
			this.parkingTxt.text = numAddSpace(this._data.attr.reward) + "金币/分钟";
			this.speedTxt.text = numAddSpace(this._data.attr.speed) + "公里/分钟";
			this.dockTxt.text = numAddSpace(this._data.attr.stoptime) + "分钟";
			this.areaTxt.text = numAddSpace(this._data.attr.range) + "公里";
			this.capacityTxt.text = numAddSpace(this._data.attr.moneylimit) + "金币/次";
		}
		protected beforeShow() {
			super.beforeShow();
			this.sellBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSellBtnClick, this);
			NotificationCenter.addObserver(this, this.onSellResult, PlayerModel.CAR_UPDATE);
		}
		protected beforeRemove() {
			super.beforeRemove();
			this.sellBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSellBtnClick, this);
			NotificationCenter.removeObserver(this, PlayerModel.CAR_UPDATE);
		}
		private onNumChange() {
			this.afterPriceLabel.text = numAddSpace(this.numController.nowNum * (1 - gameConfig.tradeTaxRate)) + "金币";
		}
		private onSellBtnClick() {
			//出售
			let data: msg.C2GW_TradeCar = new msg.C2GW_TradeCar();
			data.caruid = this._data.id;
			let price: number = this.numController.nowNum;
			if (price <= 0) {
				//价格不合法 提示
				showTips("价格必须大于0!");
				return;
			}
			data.price = price;
			sendMessage("msg.C2GW_TradeCar", msg.C2GW_TradeCar.encode(data));
		}
		private onSellResult(data: msg.GW2C_UpdateCar) { //刷新我的房产
			this.remove();
		}

		private static _instance: TradeCarSellPanel = null;
		public static getInstance(): TradeCarSellPanel {
			if (!TradeCarSellPanel._instance) {
				TradeCarSellPanel._instance = new TradeCarSellPanel();
			}
			return TradeCarSellPanel._instance;
		}
	}
}