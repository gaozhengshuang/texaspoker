module game {
	/**
	 * 车辆购买
	 */
	export class TradeCarBuyPanel extends BaseSlidePanel {
		baseInconmeTxt: eui.Label; //基础收益
		guidePriceTxt: eui.Label; //目前估值

		parkingTxt: eui.Label; //停车 100金币/收益
		speedTxt: eui.Label; // 1公里/分钟
		dockTxt: eui.Label; //停靠： 10分钟
		areaTxt: eui.Label; //区域 2公里
		capacityTxt: eui.Label; // 容量： 200金币/次

		priceLabel: eui.Label; //价格
		nameLabel: eui.Label; //名称
		timeLabel: eui.Label; //交易结束时间
		buyBtn: eui.Button; //购买
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

		private _data: msg.SimpleCarTrade;

		public constructor() {
			super();
		}
		protected init() {
		}
		protected getSkinName() {
			return TradeCarBuyPanelSkin;
		}
		public setData(data: msg.SimpleCarTrade, carDetailData: msg.GW2C_ResCarInfoById) {
			this._data = data;
			this.priceLabel.text = numAddSpace(data.price) + "金币";
			this.tradeStar.show(data.carlevel);
			this.guidePriceTxt.textFlow = TextUtil.parse(TradeManager.getInstance().getPriceStr(data.price));
			this.baseInconmeTxt.text = numAddSpace(data.income) + "金币";
			this.nameLabel.text = data.name;
			//其他信息显示
			this.parkingTxt.text = numAddSpace(carDetailData.cardata.attr.reward) + "金币/分钟";
			this.speedTxt.text = numAddSpace(carDetailData.cardata.attr.speed) + "公里/分钟";
			this.dockTxt.text = numAddSpace(carDetailData.cardata.attr.stoptime) + "分钟";
			this.areaTxt.text = numAddSpace(carDetailData.cardata.attr.range) + "公里";
			this.capacityTxt.text = numAddSpace(carDetailData.cardata.attr.moneylimit) + "金币/次";
		}
		protected beforeShow() {
			super.beforeShow();
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
			TickUtil.AddSecondsInvoke(this.onTimeCd, this);
			NotificationCenter.addObserver(this, this.onSellResult, PlayerModel.CAR_UPDATE);
		}
		protected beforeRemove() {
			super.beforeRemove();
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCd, this);
			NotificationCenter.removeObserver(this, PlayerModel.CAR_UPDATE);
		}
		private onBuyBtnClick() {
			let userinfo = DataManager.playerModel.getUserInfo();
			if (userinfo.gold >= this._data.price) {
				let data: msg.C2GW_BuyTradeCar = new msg.C2GW_BuyTradeCar();
				data.tradeuid = this._data.tradeuid;
				data.caruid = this._data.caruid;
				sendMessage("msg.C2GW_BuyTradeCar", msg.C2GW_BuyTradeCar.encode(data));
			}
			else {
				//提示金币不足
				showTips('金币不足！')
			}
		}
		private onSellResult(data: msg.GW2C_RetBuyTradeHouse) {
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

		private static _instance: TradeCarBuyPanel = null;
		public static getInstance(): TradeCarBuyPanel {
			if (!TradeCarBuyPanel._instance) {
				TradeCarBuyPanel._instance = new TradeCarBuyPanel();
			}
			return TradeCarBuyPanel._instance;
		}
	}
}